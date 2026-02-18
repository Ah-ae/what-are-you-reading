import { notFound } from 'next/navigation';
import HeaderLayout from '@/layout/header';
import ReadOnlyBookThumbnail from '@/ui/bookshelf/readonly-book-thumbnail';
import { getBooks } from '@/(bookshelf)/mine/actions';
import { verifyFriendship } from '@/(bookshelf)/yours/actions';
import db from '@/lib/db';

type Props = { params: { userId: string } };

export default async function FriendBookshelf({ params }: Props) {
  const userId = Number(params.userId);
  if (Number.isNaN(userId)) return notFound();

  const isFriend = await verifyFriendship(userId);
  if (!isFriend) return notFound();

  const friend = await db.user.findUnique({
    where: { id: userId },
    select: { name: true },
  });
  if (!friend) return notFound();

  const books = await getBooks(userId);

  return (
    <>
      <HeaderLayout title={`${friend.name}의 책장`} />
      <div className="flex justify-center p-6 md:p-10">
        {books.length > 0 ? (
          <div className="grid grid-cols-3 gap-x-8 gap-y-5 md:gap-x-14 md:gap-y-14">
            {books.map((book) => (
              <ReadOnlyBookThumbnail
                key={book.id}
                id={book.id}
                thumbnail={book.thumbnail}
                title={book.title}
                basePath={`/yours/${userId}`}
              />
            ))}
          </div>
        ) : (
          <p className="pt-10 text-neutral-500">아직 등록된 책이 없습니다.</p>
        )}
      </div>
    </>
  );
}
