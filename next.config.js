/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverActions: true,
    esmExternals: 'loose',
  },
};

module.exports = nextConfig;
