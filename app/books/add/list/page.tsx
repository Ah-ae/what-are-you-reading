async function findBooks(query: string, target: string) {
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

  const bookList = await findBooks(query, target);
  console.log(bookList);
  //   console.log(bookList.documents.length); // 10

  return <div>List page</div>;
}
