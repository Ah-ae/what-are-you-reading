import StoreProvider from '@/store/store-provider';

export default function MineLayout({ children }: { children: React.ReactNode }) {
  return <StoreProvider>{children}</StoreProvider>;
}
