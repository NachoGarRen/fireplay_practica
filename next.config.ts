import type { NextConfig } from "next";

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    domains: ['media.rawg.io'],
  },
  experimental: {
    serverActions: true,
  },
};

export default nextConfig;
