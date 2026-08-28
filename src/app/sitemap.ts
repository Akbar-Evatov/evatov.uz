import type { MetadataRoute } from "next";
import { site } from "@/data/site";

/** Required by `output: "export"`: emit this route as a build-time file. */
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
