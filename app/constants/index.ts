const IS_DEV_MODE = process.env.NODE_ENV === 'development';
export const APP_BASE_URL = IS_DEV_MODE ? 'http://localhost:3000' : 'https://what-are-you-reading.vercel.app';
