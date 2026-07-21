/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['yosemite.org', 'localhost'],
    qualities: [25, 75],
  }
};

// eslint-disable-next-line no-undef
module.exports = nextConfig;
