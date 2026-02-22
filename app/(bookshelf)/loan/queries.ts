import db from '@/lib/db';

export async function getActiveLoan(bookId: number) {
  return db.loan.findFirst({
    where: { bookId, returned_at: null },
    include: {
      borrower: { select: { id: true, name: true } },
      lender: { select: { id: true, name: true } },
    },
  });
}

export async function getBorrowedBooks(userId: number) {
  const loans = await db.loan.findMany({
    where: { borrowerId: userId, returned_at: null },
    orderBy: { lent_at: 'desc' },
    include: {
      book: true,
      lender: { select: { id: true, name: true } },
    },
  });

  return loans;
}

export async function getLentBookIds(userId: number) {
  const loans = await db.loan.findMany({
    where: { lenderId: userId, returned_at: null },
    select: { bookId: true },
  });

  return loans.map((loan) => loan.bookId);
}
