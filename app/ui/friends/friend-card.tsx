'use client';

import { useState } from 'react';
import Image from 'next/image';
import DefaultAvatar from '@/ui/default-avatar';
import type { FriendInfo } from '@/types/friends';
import { acceptFriendRequest, rejectFriendRequest } from '@/friends/actions';

type Props = { friend: FriendInfo };

export default function FriendCard({ friend }: Props) {
  const isPending = friend.status === 'PENDING';
  const [loading, setLoading] = useState(false);

  const handleAccept = async () => {
    setLoading(true);
    const result = await acceptFriendRequest(friend.friendshipId);
    if (result.error) alert(result.error);
    setLoading(false);
  };

  const handleReject = async () => {
    setLoading(true);
    const result = await rejectFriendRequest(friend.friendshipId);
    if (result.error) alert(result.error);
    setLoading(false);
  };

  const formattedDate = new Date(friend.createdAt).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  return (
    <div className="py-1 flex items-center gap-2">
      {friend.avatar ? (
        <Image
          src={friend.avatar}
          alt={friend.name}
          width={56}
          height={56}
          className="size-12 rounded-full object-cover"
        />
      ) : (
        <DefaultAvatar className="size-12" />
      )}
      <div className="flex flex-col">
        <span className="font-semibold">{friend.name}</span>
        <span className="text-xs">
          {friend.username.slice(0, 5)} {friend.username.slice(5)}
        </span>
        {isPending && <span className="text-xs text-neutral-500">신청일 | {formattedDate}</span>}
      </div>
      {isPending && (
        <div className="ml-auto flex gap-2">
          <button
            onClick={handleReject}
            disabled={loading}
            className="px-3 rounded-full border border-main-theme-color dark:border-blue-500 text-main-theme-color dark:text-blue-500 disabled:opacity-50"
          >
            거절
          </button>
          <button
            onClick={handleAccept}
            disabled={loading}
            className="px-3 rounded-full bg-main-theme-color dark:bg-blue-500 text-white disabled:opacity-50"
          >
            수락
          </button>
        </div>
      )}
    </div>
  );
}
