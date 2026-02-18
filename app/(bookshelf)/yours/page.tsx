import Link from 'next/link';
import { PlusIcon } from '@heroicons/react/24/outline';
import HeaderLayout from '@/layout/header';

export default function Yours() {
  return (
    <>
      <HeaderLayout title="친구 책장" leftItem={<AddFriend />} />
      <div className="pt-10 flex-col flex-center gap-2">
        <p>준비 중인 기능입니다.</p>
        <p>조금만 기다려 주세요 👀</p>
      </div>
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
