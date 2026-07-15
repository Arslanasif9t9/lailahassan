import type { NextConfig } from "next";

/**
 * GITHUB_PAGES=true → static export for GitHub Pages
 * (site served at https://<user>.github.io/lailahassan/)
 */
const isPages = process.env.GITHUB_PAGES === "true";
const repo = "lailahassan";

const nextConfig: NextConfig = {
  // Pin the workspace root (a stray lockfile exists in F:\Work\React)
  turbopack: { root: __dirname },
  ...(isPages
    ? {
        output: "export" as const,
        basePath: `/${repo}`,
        assetPrefix: `/${repo}/`,
      }
    : {}),
  env: {
    NEXT_PUBLIC_BASE_PATH: isPages ? `/${repo}` : "",
  },
  images: {
    // GitHub Pages has no image optimizer — serve images as-is there
    unoptimized: isPages,
    // YouTube thumbnails (facade pattern — only the thumbnail loads, never the video)
    remotePatterns: [
      { protocol: "https", hostname: "i.ytimg.com" },
      { protocol: "https", hostname: "img.youtube.com" },
    ],
  },
};

export default nextConfig;
