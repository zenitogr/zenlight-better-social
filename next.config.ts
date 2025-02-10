import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [],
    unoptimized: true, // This will disable the image optimization for all images
  },
};

export default nextConfig;
