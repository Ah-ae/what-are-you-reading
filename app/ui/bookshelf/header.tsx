'use client';

import Link from 'next/link';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { PlusIcon, Bars3BottomLeftIcon } from '@heroicons/react/24/outline';
import HeaderLayout from '@/layout/header';
import { DeleteBooks } from '@/ui/bookshelf/buttons';
import { SELECTED_ITEMS_KEY } from '@/constants';

type Props = { title: string };

export default function Header({ title }: Props) {
  return (
    <HeaderLayout>
      <ActionButtons />
      <div>
        <h2 className="text-xl font-medium dark:text-neutral-200">{title}</h2>
      </div>
      <ToggleButtons />
    </HeaderLayout>
  );
}

function ToggleButtons() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const currentMode = searchParams.get('mode') || 'view';

  const handleClick = () => {
    const newMode = currentMode === 'view' ? 'edit' : 'view';
    const params = new URLSearchParams(searchParams);
    params.set('mode', newMode);
    replace(`${pathname}?${params}`);
  };

  return (
    <button onClick={handleClick} className="text-lg font-medium text-main-theme-color">
      {currentMode === 'view' ? '편집' : '완료'}
    </button>
  );
}

function ActionButtons() {
  const searchParams = useSearchParams();
  const currentMode = searchParams.get('mode') || 'view';
  const selectedItemsParam = searchParams.get(SELECTED_ITEMS_KEY);
  const selectedItems = selectedItemsParam ? selectedItemsParam.split(',').map(Number) : [];

  return (
    <div className="w-[28px] flex gap-3">
      {currentMode === 'view' ? (
        <Link href="/books/add">
          <PlusIcon className="size-6 font-bold text-main-theme-color dark:text-blue-500" />
        </Link>
      ) : (
        <>
          <DeleteBooks ids={selectedItems} />
          <button>
            <Bars3BottomLeftIcon className="size-6 font-bold text-main-theme-color dark:text-blue-500" />
          </button>
        </>
      )}
    </div>
  );
}
