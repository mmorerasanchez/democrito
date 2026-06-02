import { test, expect } from "@playwright/test";

test("scroll resets to top when navigating between routes", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });

  // Scroll #main-scroll halfway down
  await page.evaluate(() => {
    const el = document.getElementById("main-scroll");
    if (el) el.scrollTop = el.scrollHeight / 2;
  });

  // Confirm we actually scrolled
  const scrolledPos = await page.evaluate(() => document.getElementById("main-scroll")?.scrollTop ?? 0);
  expect(scrolledPos).toBeGreaterThan(0);

  // Navigate to /atoms via the router (click a link so React Router fires)
  await page.goto("/atoms", { waitUntil: "networkidle" });

  const scrollTop = await page.evaluate(() => document.getElementById("main-scroll")?.scrollTop ?? 0);
  expect(scrollTop).toBe(0);
});
