import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/visual",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",

  expect: {
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.01,
      animations: "disabled",
    },
  },

  use: {
    baseURL: "http://localhost:4173",
    screenshot: "only-on-failure",
    trace: "on-first-retry",
  },

  webServer: {
    command: "npm run build && npm run preview -- --port 4173",
    port: 4173,
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },

  projects: [
    {
      name: "desktop-chrome",
      use: {
        browserName: "chromium",
        viewport: { width: 1280, height: 720 },
      },
    },
  ],
});
