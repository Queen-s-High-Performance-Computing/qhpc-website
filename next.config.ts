
import type { NextConfig } from "next";

const isCloudflare = process.env.CF_PAGES === "1";

const nextConfig: NextConfig = {
  output: isCloudflare ? "export" : undefined,
  images: {
    unoptimized: isCloudflare,
  },
};

export default nextConfig;
