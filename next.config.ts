import type { NextConfig } from "next";

// Cloudflare Pages builds a static site; Vercel keeps the standard Next.js output.
const isCloudflare = process.env.CF_PAGES === "1";

const nextConfig: NextConfig = {
  output: isCloudflare ? "export" : undefined,
  images: { unoptimized: isCloudflare },
};

export default nextConfig;
