import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/checkout", "/thank-you", "/ads"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
