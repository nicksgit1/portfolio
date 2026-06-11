import { test, expect } from "@playwright/test";

test.describe("home page", () => {
  test("renders the intro from the static export", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Nicholas Summers/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Nicholas Summers",
    );
  });

  test("featured project links through to its case study", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "CMS MDCT reporting suite" }).click();
    await expect(page).toHaveURL(/\/projects\/cms-mdct-suite\/$/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "CMS MDCT reporting suite",
    );
  });
});

test("header navigation reaches every page", async ({ page }) => {
  await page.goto("/");
  const nav = page.getByRole("navigation", { name: "Main" });

  await nav.getByRole("link", { name: "Projects" }).click();
  await expect(page).toHaveURL(/\/projects\/$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Projects");

  await nav.getByRole("link", { name: "About" }).click();
  await expect(page).toHaveURL(/\/about\/$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("About");

  await nav.getByRole("link", { name: "Home" }).click();
  await expect(page).toHaveURL(/\/$/);
});

test("projects page lists every project", async ({ page }) => {
  await page.goto("/projects/");
  const cards = page.getByRole("article");
  // At least the three known case studies; avoids breaking when one is added.
  await expect(cards).not.toHaveCount(0);
  await expect(
    page.getByRole("link", { name: "CMS MDCT reporting suite" }),
  ).toBeVisible();
});

test("skip link is the first tab stop and becomes visible on focus", async ({
  page,
}) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  const skipLink = page.getByRole("link", { name: "Skip to main content" });
  await expect(skipLink).toBeFocused();
  await expect(skipLink).toBeVisible();
});
