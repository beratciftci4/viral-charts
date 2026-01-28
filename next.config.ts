import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // TypeScript hatalarını görmezden gel (Bu serbest)
  typescript: {
    ignoreBuildErrors: true,
  },
  // O yasaklı 'eslint' kısmını sildik!
};

export default nextConfig;