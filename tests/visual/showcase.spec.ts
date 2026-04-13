import { test, expect, type Page } from "@playwright/test";

const SHOWCASE_ROUTES = [
  { name: "overview", path: "/" },
  { name: "tokens", path: "/tokens" },
  { name: "atoms", path: "/atoms" },
  { name: "molecules", path: "/molecules" },
  { name: "organisms", path: "/organisms" },
  { name: "templates", path: "/templates" },
  { name: "pages", path: "/pages" },
] as const;

const THEMES = ["dark", "light", "warm"] as const;

/**
 * Set the active theme by manipulating the <html> class list.
 * Dark = no class (default :root), Light = .light, Warm = .warm.
 */
async function setTheme(page: Page, theme: (typeof THEMES)[number]) {
  await page.evaluate((t) => {
    const html = document.documentElement;
    html.classList.remove("light", "warm");
    if (t !== "dark") {
      html.classList.add(t);
    }
  }, theme);
  // Allow CSS transitions to settle
  await page.waitForTimeout(300);
}

for (const route of SHOWCASE_ROUTES) {
  for (const theme of THEMES) {
    test(`${route.name} — ${theme} theme`, async ({ page }) => {
      await page.goto(route.path, { waitUntil: "networkidle" });
      await setTheme(page, theme);

      await expect(page).toHaveScreenshot(
        `${route.name}-${theme}.png`,
        { fullPage: true }
      );
    });
  }
}
