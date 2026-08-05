import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SPLASH_DEVICES } from '../app/constants/splash-devices.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const source = join(root, 'public', 'hero_256x256.png');
const outDir = join(root, 'public', 'splash');

const themes = {
  light: { bg: '#ffffff' },
  dark: { bg: '#0a0a0a' },
};

await mkdir(outDir, { recursive: true });

const iconBuf = await sharp(source).png().toBuffer();

for (const [theme, { bg }] of Object.entries(themes)) {
  for (const [w, h] of SPLASH_DEVICES) {
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
