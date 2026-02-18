import Link from 'next/link';
import Image from 'next/image';
import type { FriendWithLatestBook } from '@/(bookshelf)/yours/actions';

type Props = { friend: FriendWithLatestBook };

export default function FriendBookshelfCard({ friend }: Props) {
  return (
    <Link href={`/yours/${friend.id}`}>
      <div className="py-3 flex items-center gap-3">
        {friend.avatar ? (
          <Image
            src={friend.avatar}
            alt={friend.name}
            width={48}
            height={48}
            className="size-12 rounded-full object-cover"
          />
        ) : (
          <div className="size-12 bg-gray-100 rounded-full" />
        )}
        <div className="flex flex-col min-w-0">
          <span className="font-semibold">{friend.name}</span>
          {friend.latestBookTitle ? (
            <span className="text-sm text-neutral-500 truncate">최근에 추가한 책: {friend.latestBookTitle}</span>
          ) : (
            <span className="text-sm text-neutral-400">아직 등록된 책이 없습니다</span>
          )}
        </div>
      </div>
    </Link>
  );
}
