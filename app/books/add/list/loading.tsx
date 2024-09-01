import HeaderLayout from '@/layout/header';

export default function Loading() {
  return (
    <>
      <HeaderLayout backButtonText="검색 목록" />

      <div className="pt-20 px-5 flex flex-col gap-5 animate-pulse">
        {[...Array(12)].map((_, index) => (
          <div key={index} className="flex gap-5 *:rounded-md">
            <div className="w-20 h-24 bg-neutral-600" />
            <div className="flex flex-col gap-2 *:rounded-md">
              <div className="h-5 w-52 bg-neutral-600" />
              <div className="flex flex-col gap-1 *:rounded-md">
                <div className="h-5 w-28 bg-neutral-600" />
                <div className="h-5 w-10 bg-neutral-600" />
                <div className="h-5 w-20 bg-neutral-600" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
