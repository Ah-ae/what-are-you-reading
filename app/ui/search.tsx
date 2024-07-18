import type { InputHTMLAttributes } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

type Props = {
  width?: string;
};

export default function Search({ width, ...args }: Props & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="relative">
      <MagnifyingGlassIcon className="absolute top-2 left-2 size-6 text-neutral-700 dark:text-neutral-400" />
      <input
        type="search"
        className={`${
          width ? width : 'w-full'
        } h-10 pl-10 pr-2 bg-transparent rounded-md border-none focus:outline-none appearance-none bg-zinc-200 dark:bg-zinc-800 transition placeholder:text-neutral-400`}
        {...args}
      />
    </div>
  );
}
