import { test, expect } from "@playwright/test";
import { BASE } from "./base-path";
import { projects } from "../src/content/projects";

test.describe("home page", () => {
  test("renders the intro from the static export", async ({ page }) => {
    await page.goto(`${BASE}/`);
    await expect(page).toHaveTitle(/Nicholas Summers/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Nicholas Summers",
    );
  });

  test("featured project links through to its case study", async ({ page }) => {
    await page.goto(`${BASE}/`);
    await page.getByRole("link", { name: "CMS MDCT reporting suite" }).click();
    await expect(page).toHaveURL(/\/projects\/cms-mdct-suite\/$/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "CMS MDCT reporting suite",
    );
  });
});

test("header navigation reaches every page", async ({ page }) => {
  await page.goto(`${BASE}/`);
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
  await page.goto(`${BASE}/projects/`);
  // Exact count from the content source: a project silently missing
  // from the page is precisely the regression this should catch.
  await expect(page.getByRole("article")).toHaveCount(projects.length);
  await expect(
    page.getByRole("link", { name: "CMS MDCT reporting suite" }),
  ).toBeVisible();
});

test("skip link is the first tab stop and becomes visible on focus", async ({
  page,
}) => {
  await page.goto(`${BASE}/`);
  await page.keyboard.press("Tab");
  const skipLink = page.getByRole("link", { name: "Skip to main content" });
  await expect(skipLink).toBeFocused();
  await expect(skipLink).toBeVisible();
});
