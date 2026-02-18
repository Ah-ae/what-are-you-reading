import Link from 'next/link';
import { PlusIcon } from '@heroicons/react/24/outline';
import HeaderLayout from '@/layout/header';
import FriendBookshelfCard from '@/ui/bookshelf/yours/friend-bookshelf-card';
import { getFriendsWithLatestBook } from '@/(bookshelf)/yours/actions';

export default async function Yours() {
  const friends = await getFriendsWithLatestBook();

  return (
    <>
      <HeaderLayout title="친구 책장" leftItem={<AddFriend />} />
      {friends.length > 0 ? (
        <ul className="px-4">
          {friends.map((friend) => (
            <li key={friend.friendshipId}>
              <FriendBookshelfCard friend={friend} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="pt-20 flex-col flex-center gap-4">
          <div className="flex-col flex-center *:text-neutral-500">
            <p>아직 친구가 없습니다.</p>
            <p>친구를 추가하고 친구의 책장을 구경해보세요!</p>
          </div>
          <Link
            href="/friends/add"
            className="px-3 rounded-full border border-main-theme-color dark:border-blue-500 text-main-theme-color dark:text-blue-500"
          >
            친구 추가하기
          </Link>
        </div>
      )}
    </>
  );
}

function AddFriend() {
  return (
    <Link href="/friends/add" scroll={false}>
      <PlusIcon className="size-6 stroke-2 text-main-theme-color dark:text-blue-500" />
    </Link>
  );
}
