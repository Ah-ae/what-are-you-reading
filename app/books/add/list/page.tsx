import HeaderLayout from '@/layout/header';
import BookList from '@/ui/books/cards';
import { searchBooks } from '@/books/add/list/actions';

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
  const bookList = await searchBooks(query, target);

  return (
    <>
      {/* //TODO: Header 버튼 스타일링 및 액션 입히기 */}
      <HeaderLayout>
        <button>검색 목록</button>
      </HeaderLayout>

      <section className="p-4">
        <p className="text-center">책을 선택하면 현재 책장에 바로 배치됩니다.</p>
        {bookList.documents.length > 0 ? (
          <BookList initialBooks={bookList.documents} query={query} target={target} />
        ) : (
          'Loading...'
        )}
      </section>
    </>
  );
}
