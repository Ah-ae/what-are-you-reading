import Link from 'next/link';
import { unstable_cache as nextCache } from 'next/cache';
import { getUser } from '@/lib/data';
import { getBooks } from '@/(bookshelf)/mine/actions';
import HeaderLayout from '@/layout/header';
import { ActionButtons, ToggleButtons } from '@/ui/bookshelf/mine/header-items';
import BookThumbnail from '@/ui/bookshelf/book-thumbnail';
import { PlusIcon } from '@heroicons/react/24/outline';

const getCachedBooks = nextCache(getBooks, ['my-book-list'], {
  tags: ['my-book-list'],
});

export default async function Mine() {
  const user = await getUser();
  if (!user) {
    return (
      <>
        <HeaderLayout leftItem={<ActionButtons />} title="내 책장" rightItem={<ToggleButtons />} />
        <section>
          <div className="flex justify-center pt-10 px-6">
            <p>사용자를 찾을 수 없습니다.</p>
          </div>
        </section>
      </>
    );
  }

  const books = await getCachedBooks(user.id);
  const hasBooks = books.length > 0;

  return (
    <>
      <HeaderLayout leftItem={<ActionButtons />} title="내 책장" rightItem={hasBooks ? <ToggleButtons /> : null} />
      <div className="flex justify-center p-6 md:p-10">
        <div className="grid grid-cols-3 gap-x-8 gap-y-5 md:gap-x-14 md:gap-y-14">
          <>
            {books.map((book) => (
              <BookThumbnail key={book.id} id={book.id} thumbnail={book.thumbnail} title={book.title} />
            ))}
            <Link
              href="/books/add"
              scroll={false}
              className="w-[80px] h-[116px] flex-center bg-gray-100 shadow-lg md:scale-125"
            >
              <PlusIcon className="size-8 stroke-1 text-gray-700 border border-1 border-gray-700 rounded-full" />
            </Link>
          </>
        </div>
      </div>
    </>
  );
}
