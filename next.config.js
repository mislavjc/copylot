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
  webpack: function (config) {
    config.experiments = { asyncWebAssembly: true, layers: true };

    return config;
  },
};

module.exports = withPlausibleProxy()(nextConfig);
