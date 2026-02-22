'use server';

import db from '@/lib/db';
import getSession from '@/lib/session';
import { revalidateTag } from 'next/cache';

async function getSessionUserId() {
  const session = await getSession();
  if (!session.id) throw new Error('로그인이 필요합니다.');
  return session.id;
}

export async function createLoan(
  bookId: number,
  borrowerId?: number,
  borrowerName?: string,
) {
  const userId = await getSessionUserId();

  // 소유권 검증
  const book = await db.book.findFirst({
    where: {
      id: bookId,
      Bookshelf: { ownerId: userId },
    },
  });
  if (!book) throw new Error('본인 소유의 책만 대출할 수 있습니다.');

  // 중복 대출 방지
  const activeLoan = await db.loan.findFirst({
    where: { bookId, returned_at: null },
  });
  if (activeLoan) throw new Error('이미 대출 중인 책입니다.');

  // 등록된 친구인 경우 친구 관계 검증
  if (borrowerId) {
    const friendship = await db.friendship.findFirst({
      where: {
        status: 'ACCEPTED',
        OR: [
          { requesterId: userId, receiverId: borrowerId },
          { requesterId: borrowerId, receiverId: userId },
        ],
      },
    });
    if (!friendship) throw new Error('친구 관계가 아닙니다.');
  }

  await db.loan.create({
    data: {
      bookId,
      lenderId: userId,
      borrowerId: borrowerId ?? null,
      borrowerName: borrowerName ?? null,
    },
  });

  revalidateTag(`book-${bookId}`);
  revalidateTag('my-book-list');
}

export async function returnLoan(loanId: number) {
  const userId = await getSessionUserId();

  const loan = await db.loan.findUnique({
    where: { id: loanId },
  });

  if (!loan) throw new Error('대출 정보를 찾을 수 없습니다.');
  if (loan.returned_at) throw new Error('이미 반납된 책입니다.');
  if (loan.lenderId !== userId && loan.borrowerId !== userId) {
    throw new Error('반납 권한이 없습니다.');
  }

  await db.loan.update({
    where: { id: loanId },
    data: { returned_at: new Date() },
  });

  revalidateTag(`book-${loan.bookId}`);
  revalidateTag('my-book-list');
}

