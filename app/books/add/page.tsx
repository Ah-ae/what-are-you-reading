import HeaderLayout from '@/layout/header';
import Search from '@/ui/search';

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
        </div>
      </section>
    </>
  );
}
