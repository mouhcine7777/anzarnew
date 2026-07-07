import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['10.10.8.60'],
  output: "export", 
  images: {
    unoptimized: true, 
  },
  trailingSlash: true,
  reactStrictMode: true,
};

export default nextConfig;