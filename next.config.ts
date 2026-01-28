import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Sadece TypeScript hatalarını görmezden geliyoruz
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;