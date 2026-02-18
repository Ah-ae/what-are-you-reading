'use server';

import db from '@/lib/db';
import getSession from '@/lib/session';
import { revalidatePath } from 'next/cache';
import type { FriendInfo } from '@/types/friends';

async function getSessionUserId() {
  const session = await getSession();
  if (!session.id) throw new Error('로그인이 필요합니다.');
  return session.id;
}

export async function searchUsers(query: string): Promise<FriendInfo[]> {
  const userId = await getSessionUserId();

  const users = await db.user.findMany({
    where: {
      name: { contains: query, mode: 'insensitive' },
      id: { not: userId },
    },
    select: {
      id: true,
      username: true,
      name: true,
      avatar: true,
    },
  });

  // 현재 유저와의 친구 관계 조회
  const friendships = await db.friendship.findMany({
    where: {
      OR: [
        { requesterId: userId, receiverId: { in: users.map((u) => u.id) } },
        { receiverId: userId, requesterId: { in: users.map((u) => u.id) } },
      ],
    },
  });

  const friendshipMap = new Map(
    friendships.map((f) => {
      const otherId = f.requesterId === userId ? f.receiverId : f.requesterId;
      return [otherId, f];
    }),
  );

  return users.map((user) => {
    const friendship = friendshipMap.get(user.id);
    return {
      friendshipId: friendship?.id ?? 0,
      id: user.id,
      username: user.username,
      name: user.name,
      avatar: user.avatar,
      status: friendship?.status ?? 'NONE',
      createdAt: friendship?.created_at ?? new Date(),
    };
  });
}

export async function sendFriendRequest(receiverId: number) {
  const userId = await getSessionUserId();

  if (userId === receiverId) {
    return { error: '자기 자신에게 친구 요청을 보낼 수 없습니다.' };
  }

  // 이미 존재하는 관계 확인
  const existing = await db.friendship.findFirst({
    where: {
      OR: [
        { requesterId: userId, receiverId },
        { requesterId: receiverId, receiverId: userId },
      ],
    },
  });

  if (existing) {
    return { error: '이미 친구 요청이 존재합니다.' };
  }

  await db.friendship.create({
    data: {
      requesterId: userId,
      receiverId,
    },
  });

  revalidatePath('/friends/add');
  revalidatePath('/settings/friends');
  return { success: true };
}

export async function acceptFriendRequest(friendshipId: number) {
  const userId = await getSessionUserId();

  const friendship = await db.friendship.findUnique({
    where: { id: friendshipId },
  });

  if (!friendship || friendship.receiverId !== userId) {
    return { error: '유효하지 않은 요청입니다.' };
  }

  if (friendship.status !== 'PENDING') {
    return { error: '이미 처리된 요청입니다.' };
  }

  await db.friendship.update({
    where: { id: friendshipId },
    data: { status: 'ACCEPTED' },
  });

  revalidatePath('/settings/friends');
  return { success: true };
}

export async function rejectFriendRequest(friendshipId: number) {
  const userId = await getSessionUserId();

  const friendship = await db.friendship.findUnique({
    where: { id: friendshipId },
  });

  if (!friendship || friendship.receiverId !== userId) {
    return { error: '유효하지 않은 요청입니다.' };
  }

  await db.friendship.delete({
    where: { id: friendshipId },
  });

  revalidatePath('/settings/friends');
  return { success: true };
}

export async function getFriendsList(): Promise<FriendInfo[]> {
  const userId = await getSessionUserId();

  const friendships = await db.friendship.findMany({
    where: {
      status: 'ACCEPTED',
      OR: [{ requesterId: userId }, { receiverId: userId }],
    },
    include: {
      requester: { select: { id: true, username: true, name: true, avatar: true } },
      receiver: { select: { id: true, username: true, name: true, avatar: true } },
    },
  });

  return friendships.map((f) => {
    const friend = f.requesterId === userId ? f.receiver : f.requester;
    return {
      friendshipId: f.id,
      id: friend.id,
      username: friend.username,
      name: friend.name,
      avatar: friend.avatar,
      status: f.status,
      createdAt: f.created_at,
    };
  });
}

export async function getPendingRequests(): Promise<FriendInfo[]> {
  const userId = await getSessionUserId();

  const friendships = await db.friendship.findMany({
    where: {
      receiverId: userId,
      status: 'PENDING',
    },
    include: {
      requester: { select: { id: true, username: true, name: true, avatar: true } },
    },
  });

  return friendships.map((f) => ({
    friendshipId: f.id,
    id: f.requester.id,
    username: f.requester.username,
    name: f.requester.name,
    avatar: f.requester.avatar,
    status: f.status,
    createdAt: f.created_at,
  }));
}
