import { getUser } from '@/utils/getUser';
import { fetchBooks } from '@/lib/data';
import Header from '@/components/bookshelf/header';
import BookThumbnail from '@/components/bookshelf/book-thumbnail';

export default async function Mine() {
  const user = await getUser();
  const books = await fetchBooks(user.id);

  return (
    <>
      <Header title="내 책장" />
      <section>
        <div className="flex justify-center pt-10">
          <div className="px-6">
            <div className="grid grid-cols-3 gap-10">
              {books.map((book) => (
                <BookThumbnail key={book.id} id={book.id} thumbnail={book.thumbnail} title={book.title} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
