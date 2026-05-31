import type { MetadataRoute } from "next";

import { SITE } from "@/lib/constants";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Keep the Sanity Studio and contact endpoint out of search results.
        disallow: ["/api/", "/studio/"],
      },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
