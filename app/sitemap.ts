import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://arslanasif9t9.github.io/lailahassan", // TODO: replace with custom domain later
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
