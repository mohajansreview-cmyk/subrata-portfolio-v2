import type { MetadataRoute } from "next";
import { site } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: site.url, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/about`, lastModified: now, changeFrequency: "yearly", priority: 0.8 },
    { url: `${site.url}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.8 },
    { url: `${site.url}/case-studies/carvendors-led-billboard`, lastModified: now, changeFrequency: "yearly", priority: 0.9 },
    { url: `${site.url}/case-studies/biqolpo-brand-identity`, lastModified: now, changeFrequency: "yearly", priority: 0.9 },
  ];
}
