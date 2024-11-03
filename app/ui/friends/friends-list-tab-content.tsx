'use client';

import Link from 'next/link';
import FriendCard from '@/ui/friends/friend-card';

const friends: any[] = [
  //   { id: 1, username: '120101482953', name: '산코', avatar: null },
  //   { id: 2, username: '120101258432', name: '호두감자모카키코', avatar: null },
  //   { id: 1, username: '120101482953', name: '산코', avatar: null },
  //   { id: 2, username: '120101258432', name: '호두감자모카키코', avatar: null },
  //   { id: 1, username: '120101482953', name: '산코', avatar: null },
  //   { id: 2, username: '120101258432', name: '호두감자모카키코', avatar: null },
  //   { id: 1, username: '120101482953', name: '산코', avatar: null },
  //   { id: 2, username: '120101258432', name: '호두감자모카키코', avatar: null },
  //   { id: 1, username: '120101482953', name: '산코', avatar: null },
  //   { id: 2, username: '120101258432', name: '호두감자모카키코', avatar: null },
];

type Props = {
  // friends: User
};

export default function FriendsListTabContent({}: Props) {
  return (
    <>
      {friends.length > 0 ? (
        <>
          <h3 className="my-1 font-semibold">친구 ({friends.length}명)</h3>
          <ul className="max-h-[calc(100dvh-10rem)] pb-12 overflow-y-scroll">
            {friends.map((friend) => (
              <li key={friend.id}>
                {/* // TODO: ts-ignore 제거 */}
                {/* @ts-ignore */}
                <FriendCard friend={friend} />
              </li>
            ))}
          </ul>
        </>
      ) : (
        <div className="pt-20 pb-10 flex flex-col gap-4">
          <div className="flex-col flex-center *:text-natural-500">
            <p>등록된 친구가 없습니다.</p>
            <p>친구를 등록하고 친구의 책장을 구경해보세요!</p>
          </div>
          <div className="flex-center">
            <Link
              href="/friends/add"
              className="px-3 rounded-full border border-main-theme-color dark:border-blue-500 text-main-theme-color dark:text-blue-500"
            >
              친구 추가하기
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
