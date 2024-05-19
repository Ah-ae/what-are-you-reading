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
    <html lang="en">
      <body className={`mx-auto ${MAX_WIDTH} shadow-xl bg-gray-100 text-neutral-900 ${inter.className}`}>
        <main className="h-screen bg-white">{children}</main>
      </body>
    </html>
  );
}
