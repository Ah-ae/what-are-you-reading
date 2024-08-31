/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'what-are-you-reading.vercel.app',
      },
      {
        protocol: 'http',
        hostname: 'k.kakaocdn.net',
      },
      {
        protocol: 'https',
        hostname: 'search1.kakaocdn.net',
        pathname: '/thumb/**',
      },
    ],
  },
};

export default nextConfig;
