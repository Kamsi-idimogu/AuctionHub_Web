/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["auctionhub-images.s3.amazonaws.com"],
  },
};

module.exports = nextConfig;
