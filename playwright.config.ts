import { defineConfig, devices } from "@playwright/test";

const PORT = 4173;

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
    env: { PORT: String(PORT) },
    url: `http://127.0.0.1:${PORT}/`,
    reuseExistingServer: !process.env.CI,
  },
});
