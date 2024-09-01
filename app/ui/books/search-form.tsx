'use client';

import { useRouter } from 'next/navigation';
import { useSetAtom } from 'jotai';
import Search from '@/ui/search';
import { keywordListAtom } from '@/store/atoms';

type Props = {
  query: string;
  target: string;
};

export default function SearchForm({ query, target }: Props) {
  const router = useRouter();
  const setKeywordList = useSetAtom(keywordListAtom);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const params = { query, target };
    const formattedParams = new URLSearchParams(params).toString();

    router.push(`/books/add/list?${formattedParams}`);
    setKeywordList((prev) => {
      if (!prev.includes(query)) {
        return [...prev, query];
      }
      return prev;
    });
  };

  return (
    <form onSubmit={onSubmit} className="flex gap-2">
      <Search wrapperClassName="flex-grow basis-4/5" />
      <button className="flex-grow basis-1/5 primary-btn px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-500">
        검색
      </button>
    </form>
  );
}
