'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { CheckIcon } from '@heroicons/react/24/outline';
import { formatKoreanDate } from '@/utils/date';
import { createBook, getMoreBooks, type KaKaoBookResponse } from '@/books/add/list/actions';
import { IMAGE_ASPECT_RATIO } from '@/constants/style';

const SCALE_FACTOR = 5;

type Props = {
  initialBooks: (KaKaoBookResponse & { isOwned?: boolean })[];
  query: string;
  target: string;
};

export default function BookList({ initialBooks, query, target }: Props) {
  const [books, setBooks] = useState(initialBooks);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [isLastPage, setIsLastPage] = useState(false);
  const trigger = useRef<HTMLSpanElement>(null);

  const handleAddBook = (bookToAdd: Pick<KaKaoBookResponse, 'isbn'> & { isOwned?: boolean }) => {
    setBooks((prev) => prev.map((book) => (book.isbn === bookToAdd.isbn ? { ...book, isOwned: true } : book)));
  };

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
    <ul className="py-3 flex flex-col gap-3">
      {books.map((book) => (
        <BookCard key={book.isbn + book.title} onAdd={handleAddBook} {...book} />
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

function BookCard({
  title,
  thumbnail,
  publisher,
  authors,
  translators,
  datetime,
  price,
  url,
  isbn,
  isOwned,
  onAdd,
}: KaKaoBookResponse & {
  isOwned?: boolean;
  onAdd: (bookToAdd: Pick<KaKaoBookResponse, 'isbn'> & { isOwned?: boolean }) => void;
}) {
  const addBook = () => {
    if (isOwned) return;

    onAdd({ isbn }); // 클라이언트 업데이트
    createBook({ title, datetime, authors, translators, price, publisher, thumbnail, url, isbn }); // 서버 업데이트
  };

  return (
    <li
      onClick={addBook}
      className="relative pb-3 flex gap-5 border-b last:border-b-0 border-neutral-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
    >
      <div className="flex items-center">
        <Image
          src={thumbnail}
          alt={title}
          className="object-top shadow-lg"
          width={IMAGE_ASPECT_RATIO.WIDTH * SCALE_FACTOR}
          height={IMAGE_ASPECT_RATIO.HEIGHT * SCALE_FACTOR}
        />
      </div>
      <div className="w-[28rem] flex flex-col justify-between gap-2 *:rounded-md">
        <span className="font-semibold">{title}</span>
        <div className="flex flex-col *:text-neutral-500 *:text-sm">
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
      <div
        className={`absolute right-0 top-1/2 transform -translate-y-1/2 flex items-center ${
          isOwned ? 'block' : 'invisible'
        }`}
      >
        <CheckIcon className="size-7 text-main-theme-color dark:text-blue-500" />
      </div>
    </li>
  );
}
