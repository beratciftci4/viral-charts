import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // SADECE TypeScript hatalarını yoksayıyoruz.
  typescript: {
    ignoreBuildErrors: true,
  },
  // BURAYA ASLA 'eslint' BLOĞU EKLEME! NEXT.JS 16 KIZIYOR.
};

export default nextConfig;