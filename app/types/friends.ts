import { FriendshipStatus } from '@prisma/client';

export type FriendInfo = {
  friendshipId: number;
  id: number;
  username: string;
  name: string;
  avatar: string | null;
  status: FriendshipStatus | 'NONE';
  createdAt: Date;
};
