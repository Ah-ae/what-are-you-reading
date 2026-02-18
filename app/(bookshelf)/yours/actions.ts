'use server';

import db from '@/lib/db';
import getSession from '@/lib/session';
import type { FriendInfo } from '@/types/friends';

export type FriendWithLatestBook = FriendInfo & {
  latestBookTitle: string | null;
  latestBookCreatedAt: Date | null;
};

export async function getFriendsWithLatestBook(): Promise<FriendWithLatestBook[]> {
  const session = await getSession();
  if (!session.id) throw new Error('로그인이 필요합니다.');
  const userId = session.id;

  const friendships = await db.friendship.findMany({
    where: {
      status: 'ACCEPTED',
      OR: [{ requesterId: userId }, { receiverId: userId }],
    },
    include: {
      requester: {
        select: {
          id: true,
          username: true,
          name: true,
          avatar: true,
          bookshelf: {
            select: {
              books: {
                orderBy: { created_at: 'desc' },
                take: 1,
                select: { title: true, created_at: true },
              },
            },
          },
        },
      },
      receiver: {
        select: {
          id: true,
          username: true,
          name: true,
          avatar: true,
          bookshelf: {
            select: {
              books: {
                orderBy: { created_at: 'desc' },
                take: 1,
                select: { title: true, created_at: true },
              },
            },
          },
        },
      },
    },
  });

  const friends = friendships.map((f) => {
    const friend = f.requesterId === userId ? f.receiver : f.requester;
    const latestBook = friend.bookshelf?.books[0] ?? null;

    return {
      friendshipId: f.id,
      id: friend.id,
      username: friend.username,
      name: friend.name,
      avatar: friend.avatar,
      status: f.status,
      createdAt: f.created_at,
      latestBookTitle: latestBook?.title ?? null,
      latestBookCreatedAt: latestBook?.created_at ?? null,
    };
  });

  friends.sort((a, b) => {
    if (!a.latestBookCreatedAt && !b.latestBookCreatedAt) return 0;
    if (!a.latestBookCreatedAt) return 1;
    if (!b.latestBookCreatedAt) return -1;
    return b.latestBookCreatedAt.getTime() - a.latestBookCreatedAt.getTime();
  });

  return friends;
}

export async function verifyFriendship(friendUserId: number): Promise<boolean> {
  const session = await getSession();
  if (!session.id) return false;

  const friendship = await db.friendship.findFirst({
    where: {
      status: 'ACCEPTED',
      OR: [
        { requesterId: session.id, receiverId: friendUserId },
        { requesterId: friendUserId, receiverId: session.id },
      ],
    },
  });

  return !!friendship;
}

export async function verifyBookOwnership(userId: number, bookId: number): Promise<boolean> {
  const bookshelf = await db.bookshelf.findUnique({
    where: { ownerId: userId },
    select: { id: true },
  });
  if (!bookshelf) return false;

  const book = await db.book.findFirst({
    where: { id: bookId, bookshelfId: bookshelf.id },
  });
  return !!book;
}
