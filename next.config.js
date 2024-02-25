const { withPlausibleProxy } = require('next-plausible');

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    esmExternals: 'loose',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        pathname: '/',
        port: '',
        hostname: 'source.boringavatars.com',
      },
    ],
  },
};

module.exports = withPlausibleProxy()(nextConfig);
