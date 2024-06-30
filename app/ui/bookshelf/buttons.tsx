import clsx from 'clsx';
import { PlusIcon, TrashIcon, Bars3BottomLeftIcon } from '@heroicons/react/24/outline';
import { deleteBooks } from '@/lib/actions';

export function DeleteBooks({ ids }: { ids: number[] }) {
  const disabled = ids.length === 0;
  const deleteBooksWithIds = deleteBooks.bind(null, ids);

  return (
    <form action={deleteBooksWithIds}>
      <button disabled={disabled}>
        <TrashIcon
          className={clsx('size-6 font-bold', {
            'text-main-theme-color': ids.length > 0,
            'text-neutral-400': disabled,
          })}
        />
      </button>
    </form>
  );
}
