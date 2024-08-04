import { getUser, fetchBooks } from '@/lib/data';
import Header from '@/ui/bookshelf/header';
import BookThumbnail from '@/ui/bookshelf/book-thumbnail';

export default async function Mine() {
  const user = await getUser();
  if (!user) {
    return (
      <>
        <Header title="내 책장" />
        <section>
          <div className="flex justify-center pt-10 px-6">
            <p>사용자를 찾을 수 없습니다.</p>
          </div>
        </section>
      </>
    );
  }

  const books = await fetchBooks(user.id);

  return (
    <>
      <Header title="내 책장" />
      <div className="flex justify-center py-10 px-6">
        <div className="grid grid-cols-3 gap-10">
          {books.map((book) => (
            <BookThumbnail key={book.id} id={book.id} thumbnail={book.thumbnail} title={book.title} />
          ))}
        </div>
      </div>
    </>
  );
}
