import { useState } from 'react';
import { useResetAtom } from 'jotai/utils';
import clsx from 'clsx';
import { PlusIcon, TrashIcon, Bars3BottomLeftIcon } from '@heroicons/react/24/outline';
import { deleteBooks } from '@/lib/actions';
import { selectedItemsAtom } from '@/store/atoms';

export function DeleteBooks({ ids }: { ids: number[] }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const disabled = ids.length === 0 || isDeleting;
  const resetSelectedItems = useResetAtom(selectedItemsAtom);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteBooks(ids);
      resetSelectedItems();
    } catch (error) {
      console.error('Error deleting books:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button onClick={handleDelete} disabled={disabled}>
      <TrashIcon
        className={clsx('size-6 font-bold', {
          'text-main-theme-color dark:text-blue-500': ids.length > 0,
          'text-neutral-400': disabled,
        })}
      />
    </button>
  );
}
