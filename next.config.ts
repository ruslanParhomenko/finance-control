import type { NextConfig } from "next/dist/server/config";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  reactCompiler:true,
  cacheComponents: true,
};

export default nextConfig;
