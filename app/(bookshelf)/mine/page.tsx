import BookThumbnail from '@/components/book-thumbnail';
import { fetchBooks } from '@/lib/data';
import { getUser } from '@/utils/getUser';

export default async function Mine() {
  const user = await getUser();
  const books = await fetchBooks(user.id);

  return (
    <div className="pt-12">
      <div className="flex justify-center pt-10">
        <div className="px-6">
          <div className="grid grid-cols-3 gap-10">
            {books.map((book, index) => (
              <BookThumbnail key={index} thumbnail={book.thumbnail} title={book.title} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
