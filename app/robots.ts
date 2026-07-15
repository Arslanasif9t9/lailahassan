import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://arslanasif9t9.github.io/lailahassan/sitemap.xml", // TODO: replace with custom domain later
  };
}
