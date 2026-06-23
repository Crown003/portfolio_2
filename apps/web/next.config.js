/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@repo/ui"],
  allowedDevOrigins: ['172.16.70.158'],
};

export default nextConfig;
