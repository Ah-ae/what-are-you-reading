import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { MAX_WIDTH } from '@/constants/style';

const inter = Inter({ subsets: ['latin'] });

const SPLASH_DEVICES: [number, number, number][] = [
  [1290, 2796, 3],
  [1179, 2556, 3],
  [1170, 2532, 3],
  [1284, 2778, 3],
  [1125, 2436, 3],
  [1242, 2688, 3],
  [1242, 2208, 3],
  [828, 1792, 2],
  [750, 1334, 2],
  [640, 1136, 2],
  [2048, 2732, 2],
  [1668, 2388, 2],
  [1668, 2224, 2],
  [1620, 2160, 2],
  [1536, 2048, 2],
];

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
    statusBarStyle: 'default',
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
