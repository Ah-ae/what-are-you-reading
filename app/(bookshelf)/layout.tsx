import BottomNav from '@/ui/nav/bottom-nav';

export default function SharedLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <section className="pt-[60px] pb-[64px]">{children}</section>
      <BottomNav />
    </>
  );
}
