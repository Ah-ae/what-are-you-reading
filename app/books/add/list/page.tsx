import HeaderLayout from '@/layout/header';
import BookCard from '@/ui/books/cards';

interface KaKaoBookApiResponse {
  documents: KaKaoBookResponse[];
  meta: { is_end: boolean; pageable_count: number; total_count: number };
}

export interface KaKaoBookResponse {
  authors: string[];
  contents: string;
  datetime: string;
  isbn: string;
  price: number;
  publisher: string;
  sale_price: number;
  status: string;
  thumbnail: string;
  title: string;
  translators: string[];
  url: string;
}

async function searchBooks(query: string, target: string): Promise<KaKaoBookApiResponse> {
  'use server';
  const baseURL = 'https://dapi.kakao.com/v3/search/book';
  const params = {
    query,
    target,
  };
  const formattedParams = new URLSearchParams(params).toString();
  const finalURL = `${baseURL}?${formattedParams}`;

  const response = await fetch(finalURL, {
    headers: {
      Authorization: `KakaoAK ${process.env.KAKAO_REST_API_KEY}`,
    },
  });
  const data = await response.json();

  return data;
}

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
  console.log(bookList);
  //   console.log(bookList.documents.length); // 10

  return (
    <>
      {/* //TODO: Header 버튼 스타일링 및 액션 입히기 */}
      <HeaderLayout>
        <button>검색 목록</button>
      </HeaderLayout>

      <section className="p-4">
        <p className="text-center">책을 선택하면 현재 책장에 바로 배치됩니다.</p>

        {bookList.documents && bookList.documents.length > 0 ? (
          <ul className="py-5 flex flex-col gap-3">
            {bookList.documents.map((book) => (
              <BookCard key={book.isbn} book={book} />
            ))}
          </ul>
        ) : (
          'Loading...'
        )}
      </section>
    </>
  );
}
