/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@skatehubba/ui', '@skatehubba/auth', '@skatehubba/db'],
  experimental: {
    turbo: {
      resolveAlias: {
        '@skatehubba/ui': '../packages/ui/src',
        '@skatehubba/auth': '../packages/auth/src',
        '@skatehubba/db': '../packages/db/src',
      },
    },
  },
};

module.exports = nextConfig;
