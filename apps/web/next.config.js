/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@repo/ui"],
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "iixqdshupmxxsthioyso.supabase.co",
      },
    ],
  },
};

export default nextConfig;
