import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { MAX_WIDTH } from '@/constants/style';
import { SPLASH_DEVICES } from '@/constants/splash-devices.mjs';

const inter = Inter({ subsets: ['latin'] });

const startupImage = SPLASH_DEVICES.flatMap(([w, h, dpr]) => {
  const cssW = Math.round(w / dpr);
  const cssH = Math.round(h / dpr);
  const base = `(device-width: ${cssW}px) and (device-height: ${cssH}px) and (-webkit-device-pixel-ratio: ${dpr}) and (orientation: portrait)`;
  return [
    { url: `/splash/apple-splash-${w}-${h}-light.png`, media: `(prefers-color-scheme: light) and ${base}` },
    { url: `/splash/apple-splash-${w}-${h}-dark.png`, media: `(prefers-color-scheme: dark) and ${base}` },
  ];
});

export const metadata: Metadata = {
  title: '요즘뭐보니',
  description: '',
  appleWebApp: {
    capable: true,
    title: '요즘뭐보니',
    statusBarStyle: 'black-translucent',
    startupImage,
  },
};

export const viewport: Viewport = {
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="dark">
      <body className={`bg-gray-100 text-neutral-900 dark:bg-zinc-950 dark:text-gray-100 ${inter.className}`}>
        <div className={`mx-auto ${MAX_WIDTH} overflow-hidden shadow-xl`}>
          <main className="min-h-screen bg-white dark:bg-zinc-900">{children}</main>
        </div>
        <div id="portal" />
      </body>
    </html>
  );
}
