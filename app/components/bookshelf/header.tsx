'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { PlusIcon, TrashIcon, Bars3BottomLeftIcon } from '@heroicons/react/24/outline';

type Props = { title: string };

export default function Header({ title }: Props) {
  return (
    <header className="p-4 flex justify-between items-center bg-gray-50 dark:bg-zinc-700 border-b border-gray-200 dark:border-zinc-600">
      <ActionButtons />
      <h2 className="text-2xl font-medium dark:text-neutral-200">{title}</h2>
      <ToggleButtons />
    </header>
  );
}

function ToggleButtons() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentMode = searchParams.get('mode') || 'view';

  const toggleMode = () => {
    const newMode = currentMode === 'view' ? 'edit' : 'view';
    const params = new URLSearchParams(searchParams);
    params.set('mode', newMode);
    return `${pathname}?${params}`;
  };

  return (
    <Link href={toggleMode()} className="text-lg font-medium text-main-theme-color">
      {currentMode === 'view' ? '편집' : '완료'}
    </Link>
  );
}

function ActionButtons() {
  const searchParams = useSearchParams();
  const currentMode = searchParams.get('mode') || 'view';

  return (
    <div className="w-[28px] flex gap-3">
      {currentMode === 'view' ? (
        <Link href={``}>
          <PlusIcon className="size-6 font-bold" />
        </Link>
      ) : (
        <>
          <button>
            <TrashIcon className="size-6 font-bold text-main-theme-color" />
          </button>
          <button>
            <Bars3BottomLeftIcon className="size-6 font-bold text-main-theme-color" />
          </button>
        </>
      )}
    </div>
  );
}