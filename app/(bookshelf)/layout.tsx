import BottomNav from '@/ui/nav/bottom-nav';

export default function SharedLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <section className="pt-14 pb-[64px]">{children}</section>
      <BottomNav />
    </>
  );
}
