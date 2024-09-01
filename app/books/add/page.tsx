import HeaderLayout from '@/layout/header';
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
      <HeaderLayout title="검색 목록" rightItem={<DeleteKeywordsButton />} />

      {/* Note: `pt-14` - header height만큼 공간 확보 + page section의 자체 패딩 */}
      <section className="pt-20 px-3 pb-4">
        <SearchForm query={query} target={target} />
        <Tab tabs={tabs} />
        <KeywordList />
      </section>
    </>
  );
}
