import NavLinks from '@/ui/nav/nav-links';

export default function BottomNav({ pendingRequestCount }: { pendingRequestCount: number }) {
  return (
    <nav>
      <NavLinks pendingRequestCount={pendingRequestCount} />
    </nav>
  );
}
