import HeaderLayout from '@/layout/header';
import BackButton from '@/ui/back-button';

export default function FriendsSettings() {
  return (
    <>
      <HeaderLayout>
        <BackButton>설정</BackButton>
        <div>
          <h2 className="text-xl font-medium dark:text-neutral-200">친구 관리</h2>
        </div>
        <div />
        <div />
      </HeaderLayout>

      <div className="py-4 text-center">
        <p>준비 중인 기능입니다.</p>
        <p>조금만 기다려 주세요 👀</p>
      </div>
    </>
  );
}
