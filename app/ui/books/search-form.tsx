'use client';

import { useRouter } from 'next/navigation';
import Search from '@/ui/search';

type Props = {
  query: string;
  target: string;
};

export default function SearchForm({ query, target }: Props) {
  const router = useRouter();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const params = { query, target };
    const formattedParams = new URLSearchParams(params).toString();

    router.push(`/books/add/list?${formattedParams}`);
  };

  return (
    <form onSubmit={onSubmit} className="flex gap-2">
      <Search wrapperClassName="flex-grow basis-5/6" />
      <button className="flex-grow basis-1/6 primary-btn px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-500">
        검색
      </button>
    </form>
  );
}
