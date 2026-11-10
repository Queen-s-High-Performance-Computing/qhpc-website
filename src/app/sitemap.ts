import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { newsItems } from "@/content/news";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/about",
    "/team",
    "/workshops",
    "/projects",
    "/news",
    "/competitions",
    "/resources",
    "/faq",
    "/contact",
    "/join",
    "/sponsors",
  ].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  return [...routes, ...newsItems.map((item) => ({
    url: `${siteConfig.url}/news/${item.slug}`,
    lastModified: item.date,
    changeFrequency: "monthly" as const,
    priority: 0.65,
  }))];
}
