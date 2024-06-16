/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
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
