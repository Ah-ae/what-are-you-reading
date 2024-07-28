'use client';

import { Suspense, type InputHTMLAttributes } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

type Props = {
  wrapperClassName?: string;
};

function Search({ wrapperClassName = '', ...args }: Props & InputHTMLAttributes<HTMLInputElement>) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className={`relative w-full ${wrapperClassName}`}>
      <MagnifyingGlassIcon className="absolute top-2 left-2 size-6 text-neutral-700 dark:text-neutral-400" />
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        type="search"
        inputMode="search"
        className="w-full h-10 pl-10 pr-2 bg-transparent rounded-md border-none focus:outline-none appearance-none bg-zinc-200 dark:bg-zinc-800 transition placeholder:text-neutral-400"
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get('query')?.toString()}
        {...args}
      />
    </div>
  );
}

export default function SearchBar({ wrapperClassName, ...args }: Props & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <Suspense>
      <Search wrapperClassName={wrapperClassName} {...args} />
    </Suspense>
  );
}
