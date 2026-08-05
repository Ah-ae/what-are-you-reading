import BottomNav from '@/ui/nav/bottom-nav';
import { getPendingRequestCount } from '@/friends/actions';
import { HEADER_TOP_OFFSET } from '@/constants/style';
import { cn } from '@/lib/utils';

export default async function SharedLayout({ children }: { children: React.ReactNode }) {
  const pendingCount = await getPendingRequestCount();

  return (
    <>
      <section className={cn(HEADER_TOP_OFFSET, 'pb-12')}>{children}</section>
      <BottomNav pendingRequestCount={pendingCount} />
    </>
  );
}
