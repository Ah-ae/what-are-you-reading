import HeaderLayout from '@/layout/header';
import SearchForm from '@/ui/books/search-form';

export default function AddFriend({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    target?: string;
  };
}) {
  const query = searchParams?.query || '';
  const target = searchParams?.target || '';

  return (
    <>
      <HeaderLayout title="친구 추가" />

      {/* Note: `pt-12` - header height만큼 공간 확보 + page section의 자체 패딩 */}
      <section className="pt-16 px-3 pb-4">
        <SearchForm query={query} target={target} />
        <div className="h-40 flex-center">
          <p>친구의 이름을 검색하여 친구로 추가해 보세요.</p>
        </div>
      </section>
    </>
  );
}
