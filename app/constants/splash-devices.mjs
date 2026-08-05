// [physicalWidth, physicalHeight, devicePixelRatio]
// Used by scripts/generate-splash.mjs to produce PNGs and by app/layout.tsx
// to emit apple-touch-startup-image link tags with matching media queries.
/** @type {ReadonlyArray<readonly [number, number, number]>} */
export const SPLASH_DEVICES = [
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
