import BottomNav from '@/ui/nav/bottom-nav';

export default function SharedLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <section className="pt-12 pb-12">{children}</section>
      <BottomNav />
    </>
  );
}
