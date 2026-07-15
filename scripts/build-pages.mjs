/**
 * Builds a static export for GitHub Pages.
 * API routes are not supported in static export, so app/api is
 * temporarily moved aside during the build and always restored.
 */
import { renameSync, writeFileSync, existsSync, rmSync } from "node:fs";
import { execSync } from "node:child_process";

const API_DIR = "app/api";
const HOLD_DIR = ".api-hold";

// Clear stale generated route types that still reference app/api
rmSync(".next", { recursive: true, force: true });

const hasApi = existsSync(API_DIR);
if (hasApi) renameSync(API_DIR, HOLD_DIR);

try {
  execSync("npx next build", {
    stdio: "inherit",
    env: { ...process.env, GITHUB_PAGES: "true" },
  });
  // Stop GitHub Pages' Jekyll from ignoring the _next/ folder
  writeFileSync("out/.nojekyll", "");
  console.log("\nStatic export ready in ./out");
} finally {
  if (hasApi) renameSync(HOLD_DIR, API_DIR);
}
