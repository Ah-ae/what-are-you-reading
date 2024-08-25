import HeaderLayout from '@/layout/three-items-header';
import BookList from '@/ui/books/cards';
import BackButton from '@/ui/back-button';
import { searchBooks, checkOwnedBooks } from '@/books/add/list/actions';
import getSession from '@/lib/session';

export default async function List({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    target?: string;
  };
}) {
  const query = searchParams?.query || '';
  const target = searchParams?.target || '';
  const rawBookList = await searchBooks(query, target);
  const session = await getSession();

  if (!session || !session.id) {
    // If session is not available, return null
    return null;
  }

  const ownedBookList = await checkOwnedBooks(rawBookList.documents, session.id);

  return (
    <>
      <HeaderLayout>
        <BackButton>검색 목록</BackButton>
      </HeaderLayout>

      {/* Note: `pt-14` - header height만큼 공간 확보 + page section의 자체 패딩 */}
      <section className="pt-16 px-4 pb-4">
        {ownedBookList.length > 0 ? (
          <>
            <p className="text-center">책을 선택하면 현재 책장에 바로 배치됩니다.</p>
            <BookList initialBooks={ownedBookList} query={query} target={target} />
          </>
        ) : (
          <p className="text-center">검색 결과가 없습니다.</p>
        )}
      </section>
    </>
  );
}
