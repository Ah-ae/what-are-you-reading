'use client';

import Link from 'next/link';
import { useAtom, useAtomValue } from 'jotai';
import { useResetAtom } from 'jotai/utils';
import { PlusIcon, Bars3BottomLeftIcon } from '@heroicons/react/24/outline';
import HeaderLayout from '@/layout/header';
import { DeleteBooks } from '@/ui/bookshelf/buttons';
import { currentModeAtom, selectedItemsAtom } from '@/store/atoms';

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
  const [currentMode, setCurrentMode] = useAtom(currentModeAtom);
  const resetSelectedItems = useResetAtom(selectedItemsAtom);

  const handleClick = () => {
    // toggle current mode
    setCurrentMode((prev) => (prev === 'view' ? 'edit' : 'view'));

    // '완료' 클릭시, selectedItems 초기화
    if (currentMode === 'edit') resetSelectedItems();
  };

  return (
    <button onClick={handleClick} className="text-lg font-medium text-main-theme-color">
      {currentMode === 'view' ? '편집' : '완료'}
    </button>
  );
}

function ActionButtons() {
  const currentMode = useAtomValue(currentModeAtom);
  const selectedItems = useAtomValue(selectedItemsAtom);

  return (
    <div className="w-[28px] flex gap-3">
      {currentMode === 'view' ? (
        <Link href="/books/add">
          <PlusIcon className="size-6 stroke-2 text-main-theme-color dark:text-blue-500" />
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
