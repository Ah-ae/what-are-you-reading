import HeaderLayout from '@/layout/three-items-header';
import BackButton from '@/ui/back-button';
import DeleteKeywordsButton from '@/ui/books/delete-keywords-button';
import KeywordList from '@/ui/books/keyword-list';
import SearchForm from '@/ui/books/search-form';
import Tab from '@/ui/books/tab';

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
      <HeaderLayout>
        <BackButton />
        <div>
          <h2 className="text-xl font-medium dark:text-neutral-200">검색 목록</h2>
        </div>
        <DeleteKeywordsButton />
      </HeaderLayout>

      {/* Note: `pt-14` - header height만큼 공간 확보 + page section의 자체 패딩 */}
      <section className="pt-20 px-4 pb-4">
        <SearchForm query={query} target={target} />
        <Tab tabs={tabs} />
        <KeywordList />
      </section>
    </>
  );
}
