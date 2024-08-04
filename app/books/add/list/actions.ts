'use server';

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

export async function searchBooks(
  query: string,
  target: string = 'title',
  page: number = 1,
): Promise<KaKaoBookApiResponse> {
  const baseURL = 'https://dapi.kakao.com/v3/search/book';
  const params = {
    query,
    target,
    page: page.toString(),
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

export async function getMoreBooks(page: number, query: string, target: string) {
  const data = await searchBooks(query, target, page);
  return data;
}
