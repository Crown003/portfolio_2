/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@repo/ui"],
  allowedDevOrigins: ['192.168.31.225'],
};

export default nextConfig;
