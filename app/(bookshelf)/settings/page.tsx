import Link from 'next/link';
import { redirect } from 'next/navigation';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import getSession from '@/lib/session';
import HeaderLayout from '@/layout/header';
import { getPendingRequestCount } from '@/friends/actions';

const containerStyles = 'px-4 py-3 flex justify-between';
const beforePseudoElementStyles =
  'before:content-[attr(data-before)] before:absolute before:-translate-y-10 before:text-neutral-500';

export default async function Settings() {
  const pendingCount = await getPendingRequestCount();

  const logout = async () => {
    'use server';
    const session = await getSession();
    session.destroy();
    redirect('/');
  };

  return (
    <>
      <HeaderLayout title="설정" />

      <div className="flex flex-col gap-12 *:bg-white *:dark:bg-zinc-800">
        <div>
          <Link
            href="/settings/profile"
            className={`${containerStyles} border-b-[1px] border-zinc-200 dark:border-neutral-700`}
            scroll={false}
          >
            <span>계정</span>
            <ChevronRightIcon className="size-5 text-zinc-400" />
          </Link>
          <Link href="/settings/friends" className={containerStyles} scroll={false}>
            <span className="relative">
              친구 관리
              {pendingCount > 0 && <span className="absolute top-0 -right-3 w-2 h-2 rounded-full bg-red-500" />}
            </span>
            <ChevronRightIcon className="size-5 text-zinc-400" />
          </Link>
        </div>

        <div data-before="앱 관리" className={`${beforePseudoElementStyles} ${containerStyles}`}>
          <span>버전</span>
          <span className="text-main-theme-color dark:text-blue-500">0.0.0</span>
        </div>

        <form action={logout} className={`${containerStyles} cursor-pointer`}>
          <button className="text-zinc-400">로그아웃</button>
        </form>
      </div>
    </>
  );
}
