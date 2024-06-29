import BottomNav from '@/components/nav/bottom-nav';

export default function SharedLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <BottomNav />
    </>
  );
}
