import Search from '@/ui/search';

export default function FindBooks({ query, target }: { query: string; target: string }) {
  async function findBooks() {
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
    console.log(data);
    console.log(data.documents[0].authors);
    console.log(data.documents[0].translators);
  }

  return (
    <form action={findBooks} className="flex gap-2">
      <Search wrapperClassName="flex-grow basis-5/6" />
      <button className="flex-grow basis-1/6 primary-btn px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-500">
        검색
      </button>
    </form>
  );
}
