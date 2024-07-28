import HeaderLayout from '@/layout/header';
import SearchForm from '@/ui/books/search-form';
import Tab from '@/books/add/tab';

const tabs = [
  { key: 'title', label: '제목' },
  { key: 'person', label: '지은이' },
  { key: 'publisher', label: '출판사' },
];

export default function AddBook({
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
      {/* //TODO: Header 버튼 스타일링 및 액션 입히기 */}
      <HeaderLayout>
        <button>뒤로</button>
        <div>
          <h2 className="text-xl font-medium dark:text-neutral-200">검색 목록</h2>
        </div>
        <button>목록 삭제</button>
      </HeaderLayout>

      <section className="p-4">
        <SearchForm query={query} target={target} />
        <Tab tabs={tabs} />
      </section>
    </>
  );
}
