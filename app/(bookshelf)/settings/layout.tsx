import SharedLayout from '@/components/shared-layout';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <SharedLayout>{children}</SharedLayout>;
}
