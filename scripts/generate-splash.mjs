import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const source = join(root, 'public', 'hero_256x256.png');
const outDir = join(root, 'public', 'splash');

const themes = {
  light: { bg: '#ffffff' },
  dark: { bg: '#0a0a0a' },
};

// [physicalW, physicalH, dpr] — dpr is critical for iOS to match the correct image via media query
const devices = [
  [1290, 2796, 3], // iPhone 15/14 Pro Max, 15 Plus
  [1179, 2556, 3], // iPhone 15/14 Pro, 15
  [1170, 2532, 3], // iPhone 14/13/12
  [1284, 2778, 3], // iPhone 14 Plus, 13/12 Pro Max
  [1125, 2436, 3], // iPhone 11 Pro, XS, X
  [1242, 2688, 3], // iPhone 11 Pro Max, XS Max
  [1242, 2208, 3], // iPhone 8 Plus
  [828, 1792, 2], // iPhone 11, XR
  [750, 1334, 2], // iPhone SE 2/3, 8, 7, 6s, 6
  [640, 1136, 2], // iPhone SE 1st, 5s
  [2048, 2732, 2], // iPad Pro 12.9"
  [1668, 2388, 2], // iPad Pro 11"
  [1668, 2224, 2], // iPad Pro 10.5"
  [1620, 2160, 2], // iPad 10.2"
  [1536, 2048, 2], // iPad 9.7"/mini
];

await mkdir(outDir, { recursive: true });

const iconBuf = await sharp(source).png().toBuffer();

for (const [theme, { bg }] of Object.entries(themes)) {
  for (const [w, h] of devices) {
    const iconSize = Math.round(Math.min(w, h) * 0.35);
    const resizedIcon = await sharp(iconBuf).resize(iconSize, iconSize, { fit: 'contain' }).toBuffer();

    const out = join(outDir, `apple-splash-${w}-${h}-${theme}.png`);
    await sharp({
      create: { width: w, height: h, channels: 4, background: bg },
    })
      .composite([{ input: resizedIcon, gravity: 'center' }])
      .png()
      .toFile(out);
    console.log('wrote', out);
  }
}

console.log('\nHTML link tags:\n');
for (const [w, h, dpr] of devices) {
  const cssW = Math.round(w / dpr);
  const cssH = Math.round(h / dpr);
  const media = (theme) =>
    `(prefers-color-scheme: ${theme}) and (device-width: ${cssW}px) and (device-height: ${cssH}px) and (-webkit-device-pixel-ratio: ${dpr}) and (orientation: portrait)`;
  console.log(
    `<link rel="apple-touch-startup-image" href="/splash/apple-splash-${w}-${h}-light.png" media="${media('light')}" />`,
  );
  console.log(
    `<link rel="apple-touch-startup-image" href="/splash/apple-splash-${w}-${h}-dark.png" media="${media('dark')}" />`,
  );
}
