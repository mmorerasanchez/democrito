# Visual Regression Testing Setup — Prompt-Spec

> **Meta**
> - Project: democrito
> - Target IDE: Claude Code
> - Stage: Execution
> - Complexity: Standard
> - Version: 1.0
> - Status: Draft
> - Source: P4.1 — Set up visual regression tests (changes @democrito)
> - Prompt chain: standalone
> - Created: 2026-04-17

## Role

Act as a senior test engineer experienced with Playwright visual regression
testing, React component libraries, and CSS custom property theming systems.
You understand how to capture screenshot baselines across multiple themes
and viewport sizes without modifying source code.

## Context

democrito is a design system with three themes (dark, light, warm) and seven
showcase routes. Visual regression testing is critical because external
consumers depend on the visual stability of tokens and components via the
shadcn registry. A single unintentional token change can break downstream
projects. Playwright captures 21 baseline screenshots (7 routes × 3 themes)
that act as the contract.

## Codebase Orientation

- Showcase routes: `/`, `/tokens`, `/atoms`, `/molecules`, `/organisms`,
  `/templates`, `/pages` — all in @src/pages/
- Theme mechanism: check the theme toggle component — likely uses a class on
  `<html>` or `<body>` and localStorage for persistence
- Existing test setup: @vitest.config.ts or @vite.config.ts for current test config
- Package scripts: @package.json for existing `test` script
- CSS tokens: @src/index.css (three theme blocks: `:root` / `.light` / `.warm`)

## Task

Set up Playwright for visual regression testing of all showcase routes across
all three themes. Generate 21 baseline screenshots and a `test:visual` npm
script. Do not modify any source code.

## Steps

1. Install `@playwright/test` as a dev dependency
2. Create `playwright.config.ts` with visual snapshot settings
3. Create `tests/visual/showcase.spec.ts` with the test matrix
4. Add `test:visual` script to `package.json`
5. Run the suite once to generate baseline snapshots
6. Verify all 21 snapshots are generated and reasonable

## Instructions

### Playwright configuration

1. Install: `npm install -D @playwright/test && npx playwright install chromium`
2. Create `playwright.config.ts`:
   - Single `chromium` project
   - Viewport: `1280 × 800`
   - Screenshot comparison threshold: `0.2` (20% pixel difference tolerance)
   - Snapshot directory: `tests/visual/__screenshots__/`
   - Base URL: `http://localhost:5173` (or whatever `npm run dev` serves on)
   - Web server: start dev server automatically before tests
   - Timeout: 30 seconds per test (pages are static, should be fast)

### Test file structure

3. Create `tests/visual/showcase.spec.ts` with:
   ```typescript
   const routes = ['/', '/tokens', '/atoms', '/molecules', '/organisms', '/templates', '/pages'];
   const themes = ['dark', 'light', 'warm'];
   ```
4. For each route × theme combination:
   - Navigate to the route
   - Apply the theme (determine mechanism from codebase — likely:
     `document.documentElement.className = theme` or clicking the theme
     toggle). Use `page.evaluate()` to set the theme directly rather than
     UI interaction, for reliability
   - Wait for fonts and images to load (`page.waitForLoadState('networkidle')`)
   - Take a full-page screenshot
   - Name format: `[route-slug]-[theme].png` (e.g., `atoms-dark.png`,
     `tokens-warm.png`, `home-light.png`)

### Theme switching

5. Investigate the theme mechanism before writing tests. Look for:
   - A `data-theme` attribute on `<html>` or `<body>`
   - A CSS class (`.light`, `.warm`) on `<html>`
   - localStorage key (e.g., `theme`, `democrito-theme`)
   - A React context provider
6. Use the most direct mechanism (class/attribute, not UI clicks) for test
   reliability. Document the mechanism found in a comment at the top of the
   test file.

### Package.json script

7. Add to `package.json` scripts:
   ```json
   "test:visual": "playwright test --config playwright.config.ts"
   ```
8. DO NOT add Playwright to the existing `test` script. Visual tests are a
   separate, slower suite that runs on demand, not on every `npm test`.

### Baseline generation

9. Run `npm run test:visual -- --update-snapshots` to generate baseline
   screenshots
10. Verify all 21 screenshots exist in `tests/visual/__screenshots__/`
11. Visually inspect a sample (at minimum: `home-dark.png`, `atoms-light.png`,
    `tokens-warm.png`) to confirm they look correct — pages rendered, themes
    applied, no broken layouts

### Gitignore and commit

12. Ensure `tests/visual/__screenshots__/` is NOT in `.gitignore` — baselines
    must be committed to the repo
13. Ensure `test-results/` (Playwright's failure output) IS in `.gitignore`

## Constraints

- DO NOT modify any source files in `src/` to make testing easier
- DO NOT add Playwright to the regular `npm run test` script
- DO NOT install Firefox or WebKit — chromium only, to keep CI fast
- DO NOT use UI interaction for theme switching — use direct DOM manipulation
  for reliability
- DO NOT set screenshot threshold below 0.1 — token changes are subtle and
  font rendering varies across environments
- DO NOT create tests for /app/* routes — only showcase routes
- If any requirement is unclear, ask before making changes

## Notion Status Sync

- Change request: P4.1 — `341887eb-6e4e-81d7-adef-df4e6ac58af9`
- Set Status → **In progress** before installing Playwright
- Set Status → **Review** after baselines are committed
