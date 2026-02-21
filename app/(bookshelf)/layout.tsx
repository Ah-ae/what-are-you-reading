import BottomNav from '@/ui/nav/bottom-nav';
import { getPendingRequestCount } from '@/friends/actions';

export default async function SharedLayout({ children }: { children: React.ReactNode }) {
  const pendingCount = await getPendingRequestCount();

  return (
    <>
      <section className="pt-12 pb-12">{children}</section>
      <BottomNav pendingRequestCount={pendingCount} />
    </>
  );
}
