const { withPlausibleProxy } = require('next-plausible');

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
    esmExternals: 'loose',
  },
  images: {
    domains: ['source.boringavatars.com'],
  },
};

module.exports = withPlausibleProxy()(nextConfig);
