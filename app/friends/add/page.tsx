'use client';

import { useState } from 'react';
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

export default function AddFriend({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) {
  const query = searchParams?.query || '';
  const [showAlertDialog, setShowAlertDialog] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log(query);

    if (query.length < 2) {
      setShowAlertDialog(true);
      return;
    }

    // TODO: DB query 해서 사용자 목록 보여주기
  };

  return (
    <>
      <HeaderLayout title="친구 추가" />

      {/* Note: `pt-12` - header height만큼 공간 확보 + page section의 자체 패딩 */}
      <section className="pt-16 px-3 pb-4">
        <SearchForm onSubmit={handleSubmit} />
        <div className="h-40 flex-center">
          <p>친구의 이름을 검색하여 친구로 추가해 보세요.</p>
        </div>
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
