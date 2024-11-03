'use client';

import Link from 'next/link';
import FriendCard from '@/ui/friends/friend-card';

const friends: any[] = [
  //   { id: 1, username: '120101482953', name: '산코', avatar: null, status: 0 },
  //   { id: 2, username: '120101258432', name: '호두감자모카키코', avatar: null, status: 0 },
  //   { id: 1, username: '120101482953', name: '산코', avatar: null, status: 0 },
  //   { id: 2, username: '120101258432', name: '호두감자모카키코', avatar: null, status: 0 },
  //   { id: 1, username: '120101482953', name: '산코', avatar: null, status: 0 },
  //   { id: 2, username: '120101258432', name: '호두감자모카키코', avatar: null, status: 0 },
  //   { id: 1, username: '120101482953', name: '산코', avatar: null, status: 0 },
  //   { id: 2, username: '120101258432', name: '호두감자모카키코', avatar: null, status: 0 },
  //   { id: 1, username: '120101482953', name: '산코', avatar: null, status: 0 },
  //   { id: 2, username: '120101258432', name: '호두감자모카키코', avatar: null, status: 0 },
];

type Props = {};

export default function FriendsRequestTabContent({}: Props) {
  return (
    <>
      {friends.length > 0 ? (
        <ul className="max-h-[calc(100dvh-8rem)] pb-12 overflow-y-scroll">
          {friends.map((friend) => (
            //@ts-ignore
            <FriendCard key={friend.id} friend={friend} />
          ))}
        </ul>
      ) : (
        <div className="pt-20 pb-10 flex flex-col gap-4">
          <div className="flex-col flex-center *:text-natural-500">
            <p>아직 받은 친구 신청이 없습니다.</p>
            <p>책장을 살펴보고 싶은 친구를 먼저 추가해 볼까요?</p>
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
