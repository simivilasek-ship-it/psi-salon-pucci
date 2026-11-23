import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date("2026-11-22"),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/ochrana-osobnich-udaju/`,
      lastModified: new Date("2026-11-23"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
