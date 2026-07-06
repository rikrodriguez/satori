import type { MetadataRoute } from "next";
import { absoluteUrl, routes } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(({ path, priority }) => ({
    url: absoluteUrl(path),
    lastModified: new Date(),
    changeFrequency: path === "/" || path.includes("products") ? "weekly" : "monthly",
    priority,
  }));
}
