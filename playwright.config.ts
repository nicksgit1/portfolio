import { defineConfig, devices } from "@playwright/test";

const PORT = 4173;

/**
 * One env var drives the whole basePath story: NEXT_PUBLIC_BASE_PATH is
 * read by next.config.ts at build, forwarded to serve-static.mjs as
 * BASE_PATH, and prefixed onto navigations by e2e/base-path.ts. CI runs
 * the suite twice — once at the root and once at /portfolio, the value
 * the deploy workflow actually builds with — so the artifact that ships
 * is the artifact that was tested.
 */
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * E2e tests run against the static export in `out/` — the same artifact
 * GitHub Pages serves — via scripts/serve-static.mjs, which mirrors Pages'
 * routing semantics (trailing-slash index files, 404.html fallback). This
 * catches the class of bug unit tests can't see: export/routing breakage.
 *
 * Run with `yarn e2e` (builds first). These run in CI on pull requests,
 * not in git hooks — they're too slow for the push loop.
 */
export default defineConfig({
  testDir: "e2e",
  fullyParallel: true,
  // Guard against an accidentally committed `test.only` starving CI.
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : "list",
  use: {
    baseURL: `http://127.0.0.1:${PORT}`,
    trace: "on-first-retry",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: "node scripts/serve-static.mjs",
    env: { PORT: String(PORT), BASE_PATH },
    // The readiness probe must hit a 200, which lives under the base path.
    url: `http://127.0.0.1:${PORT}${BASE_PATH}/`,
    reuseExistingServer: !process.env.CI,
  },
});
