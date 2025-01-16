import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/requests.js');
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '172.16.9.17',
      },
      {
        protocol: 'https',
        hostname: 'monitoringapi.track.uz',
      },
    ],
  },
};

export default withNextIntl(nextConfig);
