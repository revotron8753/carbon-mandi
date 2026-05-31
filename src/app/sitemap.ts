import type { MetadataRoute } from "next";

import { blogPath, getAllBlogs } from "@/lib/blogs";
import { SITE } from "@/lib/constants";

/**
 * sitemap.xml — emitted at /sitemap.xml during build.
 * Includes every public route + all 325 migrated blog URLs so Google
 * can reindex the new origin fast after DNS cutover.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url.replace(/\/$/, "");
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "monthly", priority: 1.0 },
    { url: `${base}/blogs/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/projects`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/team`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: `${base}/right-to-climate`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: `${base}/mandi`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
  ];

  const blogRoutes: MetadataRoute.Sitemap = getAllBlogs().map((b) => ({
    url: `${base}${blogPath(b.handle)}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...blogRoutes];
}
