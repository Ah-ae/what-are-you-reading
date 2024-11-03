enum FriendshipStatus {
  PENDING,
  ACCEPTED,
  REJECTED,
}

interface User {
  id: number;
  username: string;
  name: string;
  password: string | null;
  kakao_id: string | null;
  google_id: string | null;
  avatar: string | null;
  description: string | null;
  created_at: Date;
  updated_at: Date;
  status: FriendshipStatus;
}

type Props = { friend: User };

export default function FriendCard({ friend }: Props) {
  const isPending = friend.status === FriendshipStatus.PENDING;

  return (
    <div className="py-1 flex items-center gap-2">
      <div className="size-14 bg-yellow-200 rounded-full"></div>
      <div className="flex flex-col">
        <span className="font-semibold">{friend.name}</span>
        <span className="text-sm">
          {friend.username.slice(0, 5)} {friend.username.slice(5)}
        </span>
        {isPending && <span className="text-sm text-neutral-500">신청일 | 2024-10-27 19:16</span>}
      </div>
      {isPending && (
        <div className="ml-auto flex gap-1">
          <button className="px-3 rounded-full border border-main-theme-color dark:border-blue-500 text-main-theme-color dark:text-blue-500">
            거절
          </button>
          <button className="px-3 rounded-full bg-main-theme-color dark:bg-blue-500 text-white">수락</button>
        </div>
      )}
    </div>
  );
}
