'use client';

import { useAtom, useAtomValue } from 'jotai';
import { useResetAtom } from 'jotai/utils';
import { AddBook, DeleteBooks, RearrangeBooks } from '@/ui/bookshelf/buttons';
import { currentModeAtom, selectedItemsAtom } from '@/store/atoms';

export function ToggleButtons() {
  const [currentMode, setCurrentMode] = useAtom(currentModeAtom);
  const resetSelectedItems = useResetAtom(selectedItemsAtom);

  const handleClick = () => {
    // toggle current mode
    setCurrentMode((prev) => (prev === 'view' ? 'edit' : 'view'));

    // '완료' 클릭시, selectedItems 초기화
    if (currentMode === 'edit') resetSelectedItems();
  };

  return (
    <button onClick={handleClick} className="font-medium text-main-theme-color">
      {currentMode === 'view' ? '편집' : '완료'}
    </button>
  );
}

export function ActionButtons() {
  const currentMode = useAtomValue(currentModeAtom);
  const selectedItems = useAtomValue(selectedItemsAtom);

  return (
    <div className="w-[28px] flex gap-3">
      {currentMode === 'view' ? (
        <AddBook />
      ) : (
        <>
          <DeleteBooks ids={selectedItems} />
          {/* <RearrangeBooks /> */}
        </>
      )}
    </div>
  );
}
