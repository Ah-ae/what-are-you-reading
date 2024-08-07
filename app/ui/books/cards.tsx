'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { formatKoreanDate } from '@/utils/date';
import { getMoreBooks, type KaKaoBookResponse } from '@/books/add/list/actions';

type Props = {
  initialBooks: KaKaoBookResponse[];
  query: string;
  target: string;
};

export default function BookList({ initialBooks, query, target }: Props) {
  const [books, setBooks] = useState(initialBooks);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [isLastPage, setIsLastPage] = useState(false);
  const trigger = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      async (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
        const element = entries[0];
        if (element.isIntersecting && trigger.current) {
          observer.unobserve(trigger.current);
          setIsLoading(true);
          const newData = await getMoreBooks(page + 1, query, target);
          const isEnd = newData.meta.is_end;

          if (isEnd) {
            setIsLastPage(true);
          } else {
            setPage((prev) => prev + 1);
            setBooks((prev) => [...prev, ...newData.documents]);
          }

          setIsLoading(false);
        }
      },
    );

    if (trigger.current !== null) {
      observer.observe(trigger.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [page, query, target]);

  return (
    <ul className="py-5 flex flex-col gap-3">
      {books.map((book) => (
        <BookCard key={book.isbn + book.title} {...book} />
      ))}
      {!isLastPage && (
        <span
          ref={trigger}
          className="w-fit mx-auto px-3 py-2 text-sm font-semibold bg-main-theme-color dark:bg-blue-500 text-white rounded-md hover:opacity-90 active:scale-95"
        >
          {isLoading ? '로딩 중...' : '더 보기'}
        </span>
      )}
    </ul>
  );
}

function BookCard({ title, thumbnail, publisher, authors, translators, datetime }: KaKaoBookResponse) {
  return (
    <li className="pb-3 flex gap-5 border-b last:border-b-0 border-neutral-200 dark:border-zinc-700">
      <div className="relative w-20 shadow-lg">
        <Image src={thumbnail} alt={title} fill className="object-top" />
      </div>
      <div className="w-96 flex flex-col justify-between gap-2 *:rounded-md">
        <span className="font-semibold">{title}</span>
        <div className="flex flex-col *:text-neutral-500">
          <span>
            {/* Daum 도서 API 응답 결과 중 간혹 authors 배열이 빈 배열로 들어오는 값이 있음 */}
            {authors.length > 0 && `${authors.join(', ')} 지음`}
            {authors.length > 0 && translators.length > 0 && ', '}
            {translators.length > 0 && `${translators.join(', ')} 옮김`}
          </span>
          <span>{publisher}</span>
          <span className="">{formatKoreanDate(datetime)}</span>
        </div>
      </div>
    </li>
  );
}
