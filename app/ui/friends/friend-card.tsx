'use client';

import Image from 'next/image';
import type { FriendInfo } from '@/types/friends';
import { acceptFriendRequest, rejectFriendRequest } from '@/friends/actions';

type Props = { friend: FriendInfo };

export default function FriendCard({ friend }: Props) {
  const isPending = friend.status === 'PENDING';

  const handleAccept = async () => {
    const result = await acceptFriendRequest(friend.friendshipId);
    if (result.error) alert(result.error);
  };

  const handleReject = async () => {
    const result = await rejectFriendRequest(friend.friendshipId);
    if (result.error) alert(result.error);
  };

  const formattedDate = new Date(friend.createdAt).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="py-1 flex items-center gap-2">
      {friend.avatar ? (
        <Image
          src={friend.avatar}
          alt={friend.name}
          width={56}
          height={56}
          className="size-14 rounded-full object-cover"
        />
      ) : (
        <div className="size-14 bg-gray-100 rounded-full" />
      )}
      <div className="flex flex-col">
        <span className="font-semibold">{friend.name}</span>
        <span className="text-sm">
          {friend.username.slice(0, 5)} {friend.username.slice(5)}
        </span>
        {isPending && <span className="text-sm text-neutral-500">신청일 | {formattedDate}</span>}
      </div>
      {isPending && (
        <div className="ml-auto flex gap-1">
          <button
            onClick={handleReject}
            className="px-3 rounded-full border border-main-theme-color dark:border-blue-500 text-main-theme-color dark:text-blue-500"
          >
            거절
          </button>
          <button onClick={handleAccept} className="px-3 rounded-full bg-main-theme-color dark:bg-blue-500 text-white">
            수락
          </button>
        </div>
      )}
    </div>
  );
}
