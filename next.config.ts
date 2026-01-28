import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    // TypeScript hatalarını görmezden gel (Bu hala geçerli)
    ignoreBuildErrors: true,
  },
};

export default nextConfig;