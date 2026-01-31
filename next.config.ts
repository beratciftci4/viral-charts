import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // TypeScript hatalarını görmezden gel (Zorunlu)
    ignoreBuildErrors: true,
  },
  eslint: {
    // ESLint hatalarını görmezden gel (Zorunlu)
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;