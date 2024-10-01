import Link from 'next/link';
import { PlusIcon } from '@heroicons/react/24/outline';
import HeaderLayout from '@/layout/header';

export default function Yours() {
  return (
    <>
      <HeaderLayout title="친구 책장" leftItem={<AddFriend />} />
      <div className="flex justify-center p-6 md:p-10"></div>
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
