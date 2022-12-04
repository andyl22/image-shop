/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['yosemite.org', 'localhost'],
  },
};

// eslint-disable-next-line no-undef
module.exports = nextConfig;
