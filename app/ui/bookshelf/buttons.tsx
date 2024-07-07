import { useState } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import clsx from 'clsx';
import { PlusIcon, TrashIcon, Bars3BottomLeftIcon } from '@heroicons/react/24/outline';
import { deleteBooks } from '@/lib/actions';
import { SELECTED_ITEMS_KEY } from '@/constants';

export function DeleteBooks({ ids }: { ids: number[] }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const disabled = ids.length === 0 || isDeleting;

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteBooks(ids);
      const params = new URLSearchParams(searchParams);
      params.delete(SELECTED_ITEMS_KEY);
      replace(`${pathname}?${params.toString()}`);
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
          'text-main-theme-color': ids.length > 0,
          'text-neutral-400': disabled,
        })}
      />
    </button>
  );
}
