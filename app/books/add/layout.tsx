import StoreProvider from '@/store/store-provider';

export default function AddBooksLayout({ children }: { children: React.ReactNode }) {
  return <StoreProvider>{children}</StoreProvider>;
}
