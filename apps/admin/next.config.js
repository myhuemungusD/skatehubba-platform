/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  transpilePackages: [
    '@skatehubba/types',
    '@skatehubba/ui',
    '@skatehubba/skate-engine',
    '@skatehubba/api'
  ],
};
