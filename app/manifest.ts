import type { MetadataRoute } from "next";

/** PWA manifest — makes the site installable like a native app on mobile. */
export const dynamic = "force-static";

const bp = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Laila Hassan — Video Editing Studio",
    short_name: "Laila Hassan",
    description:
      "Premium video editing for brands, creators and agencies. Turning raw footage into high-converting content.",
    start_url: `${bp}/`,
    display: "standalone",
    background_color: "#0F172A",
    theme_color: "#0F172A",
    icons: [
      {
        src: `${bp}/icon.svg`,
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
