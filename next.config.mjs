/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "vipumrahtaxi.com",
      },
    ],
  },
};

export default nextConfig;
