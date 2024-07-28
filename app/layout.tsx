import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { MAX_WIDTH } from '@/constants/style';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '요즘뭐보니',
  description: '',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="dark">
      <body
        className={`mx-auto ${MAX_WIDTH} shadow-xl bg-gray-100 text-neutral-900 dark:bg-zinc-900 dark:text-gray-100 ${inter.className}`}
      >
        <main className="min-h-screen bg-white dark:bg-zinc-950">{children}</main>
      </body>
    </html>
  );
}
