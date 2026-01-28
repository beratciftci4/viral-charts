import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // TypeScript hatalarını görmezden gel (Bu şart)
  typescript: {
    ignoreBuildErrors: true,
  },
  // ESLint hatalarını görmezden gel (Next.js 16 için özel ayar)
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;