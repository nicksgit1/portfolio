import { test, expect } from "@playwright/test";
import { BASE } from "./base-path";

/**
 * GitHub Pages serves `404.html` (exported from src/app/not-found.tsx) for
 * any path that doesn't match a file. scripts/serve-static.mjs mirrors that
 * behavior, so this verifies both the page and the fallback wiring.
 */
test("unknown routes serve the 404 page with a 404 status", async ({
  page,
}) => {
  const response = await page.goto(`${BASE}/this-page-does-not-exist/`);

  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Page not found",
  );
});

test("404 page links back to home", async ({ page }) => {
  await page.goto(`${BASE}/this-page-does-not-exist/`);
  await page.getByRole("link", { name: "Back to home" }).click();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Nicholas Summers",
  );
});
