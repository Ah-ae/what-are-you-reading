import { redirect } from 'next/navigation';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import getSession from '@/lib/session';
import HeaderLayout from '@/layout/header';
import BackButton from '@/ui/back-button';

const containerStyles = 'px-4 py-3 flex justify-between border-y-[1px] dark:border-neutral-700';
const beforePseudoElementStyles =
  'before:content-[attr(data-before)] before:absolute before:-translate-y-10 before:text-neutral-500';

export default async function Settings() {
  const logout = async () => {
    'use server';
    const session = await getSession();
    session.destroy();
    redirect('/');
  };

  return (
    <>
      <HeaderLayout>
        <BackButton />
        <div>
          <h2 className="text-xl font-medium dark:text-neutral-200">설정</h2>
        </div>
        <div />
        <div />
      </HeaderLayout>

      <div className="flex flex-col gap-12 bg-zinc-100 dark:bg-zinc-900  *:bg-white *:dark:bg-zinc-800">
        <div>
          <div className={containerStyles}>
            <span>계정</span>
            <ChevronRightIcon className="size-5 text-zinc-400" />
          </div>
          <div className={containerStyles}>
            <span>친구</span>
            <ChevronRightIcon className="size-5 text-zinc-400" />
          </div>
        </div>

        <div data-before="앱 관리" className={`${beforePseudoElementStyles} ${containerStyles}`}>
          <span>버전</span>
          <span className="text-main-theme-color dark:text-blue-500">0.0.0</span>
        </div>

        <form action={logout} className={containerStyles}>
          <button className="text-zinc-400">로그아웃</button>
        </form>
      </div>
    </>
  );
}
