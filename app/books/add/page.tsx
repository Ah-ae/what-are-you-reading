import HeaderLayout from '@/layout/header';
import Search from '@/ui/search';
import Tab from '@/ui/tab';

const tabs = [
  { key: 'title', label: '제목' },
  { key: 'person', label: '지은이' },
  { key: 'publisher', label: '출판사' },
];

export default function AddBook() {
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

      <section>
        <div className="p-4">
          <Search />
          <Tab tabs={tabs} />
        </div>
      </section>
    </>
  );
}
