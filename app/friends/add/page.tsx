'use client';

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import DefaultAvatar from '@/ui/default-avatar';
import HeaderLayout from '@/layout/header';
import SearchForm from '@/ui/books/search-form';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui';
import { searchUsers, sendFriendRequest } from '@/friends/actions';
import type { FriendInfo } from '@/types/friends';

export default function AddFriend() {
  return (
    <Suspense>
      <AddFriendContent />
    </Suspense>
  );
}

function AddFriendContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [results, setResults] = useState<FriendInfo[]>([]);
  const [searched, setSearched] = useState(false);
  const [sendingTo, setSendingTo] = useState<number | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (query.length < 2) {
      setShowAlertDialog(true);
      return;
    }

    const users = await searchUsers(query);
    setResults(users);
    setSearched(true);
  };

  const handleSendRequest = async (receiverId: number) => {
    setSendingTo(receiverId);
    const result = await sendFriendRequest(receiverId);
    if (result.error) {
      alert(result.error);
      setSendingTo(null);
      return;
    }
    // 요청 성공 후 결과 목록 갱신
    const users = await searchUsers(query);
    setResults(users);
    setSendingTo(null);
  };

  const getStatusLabel = (friend: FriendInfo) => {
    if (friend.status === 'ACCEPTED') return '친구';
    if (friend.status === 'PENDING') return '신청됨';
    return null;
  };

  return (
    <>
      <HeaderLayout title="친구 추가" />

      {/* Note: `pt-12` - header height만큼 공간 확보 + page section의 자체 패딩 */}
      <section className="pt-16 px-3 pb-4">
        <SearchForm onSubmit={handleSubmit} placeholder="친구 이름을 입력하세요" />

        {searched && results.length > 0 ? (
          <ul className="mt-3">
            {results.map((user) => {
              const statusLabel = getStatusLabel(user);
              return (
                <li key={user.id} className="py-2 flex items-center gap-2">
                  {user.avatar ? (
                    <Image
                      src={user.avatar}
                      alt={user.name}
                      width={56}
                      height={56}
                      className="size-14 rounded-full object-cover"
                    />
                  ) : (
                    <DefaultAvatar className="size-14" />
                  )}
                  <div className="flex flex-col">
                    <span className="font-semibold">{user.name}</span>
                    <span className="text-sm">
                      {user.username.slice(0, 5)} {user.username.slice(5)}
                    </span>
                  </div>
                  <div className="ml-auto">
                    {statusLabel ? (
                      <span className="px-3 text-sm text-neutral-500">{statusLabel}</span>
                    ) : (
                      <button
                        onClick={() => handleSendRequest(user.id)}
                        disabled={sendingTo === user.id}
                        className="px-3 py-1 rounded-full bg-main-theme-color dark:bg-blue-500 text-white text-sm disabled:opacity-50"
                      >
                        친구 신청
                      </button>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        ) : searched && results.length === 0 ? (
          <div className="h-40 flex-center">
            <p>검색 결과가 없습니다.</p>
          </div>
        ) : (
          <div className="h-40 flex-center">
            <p>친구의 이름을 검색하여 친구로 추가해 보세요.</p>
          </div>
        )}
      </section>

      {showAlertDialog && (
        <AlertDialog open={showAlertDialog} onOpenChange={(open) => !open && setShowAlertDialog(false)}>
          <AlertDialogContent className="w-64 rounded-lg bg-white dark:bg-zinc-900 dark:text-gray-100">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-gray-900 dark:text-inherit">알림</AlertDialogTitle>
              <AlertDialogDescription>이름을 최소 2자 이상 입력해 주세요.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction className="text-white bg-main-theme-color hover:bg-green-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-md">
                확인
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
}
