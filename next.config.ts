import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  output: isProd ? "export" : undefined,
  basePath: basePath,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  async rewrites() {
    if (isProd) {
      return [];
    }
    return [
    ];
  },
};

export default nextConfig;
