import type { NextConfig } from "next";

const isHostingerStaticExport = process.env.NEXT_OUTPUT === "export";

const nextConfig: NextConfig = {
  output: isHostingerStaticExport ? "export" : undefined,
  trailingSlash: isHostingerStaticExport,
  images: {
    deviceSizes: [390, 640, 750, 828, 1080, 1200, 1440, 1920],
    formats: ["image/avif", "image/webp"],
    imageSizes: [48, 64, 96, 128, 256, 384, 512],
    minimumCacheTTL: 31536000,
    unoptimized: isHostingerStaticExport,
    qualities: [75, 80, 82, 85, 90, 95],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
