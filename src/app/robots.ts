import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        // Explicitly allow AI Answer Engines to crawl for better AEO
        userAgent: ["GPTBot", "ChatGPT-User", "Claude-bot", "CCBot", "Applebot"],
        allow: "/",
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}

