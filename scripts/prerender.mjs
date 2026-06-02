/**
 * Prerender script — runs after `vite build` to generate per-route HTML files.
 * Uses Vite's SSR build mode + react-dom/server renderToString.
 * No browser required.
 */
import { build } from "vite";
import { readFileSync, writeFileSync, mkdirSync, rmSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const ROUTES = [
  "/",
  "/manifesto",
  "/tokens",
  "/atoms",
  "/molecules",
  "/organisms",
  "/templates",
  "/ai",
  "/ai/claude",
  "/ai/vibe-coding",
  "/ai/github",
  "/ai/examples",
];

// 1 — Build the SSR bundle
await build({
  root,
  logLevel: "warn",
  build: {
    ssr: "src/entry-server.tsx",
    outDir: "dist-ssr",
    emptyOutDir: true,
  },
});

// 2 — Import the SSR render function
const { render } = await import(join(root, "dist-ssr/entry-server.js"));

// 3 — Read the client HTML template
const template = readFileSync(join(root, "dist/index.html"), "utf-8");

// 4 — Render each route and write to dist/
let rendered = 0;
let skipped = 0;

for (const route of ROUTES) {
  const outDir =
    route === "/" ? join(root, "dist") : join(root, "dist", route);
  mkdirSync(outDir, { recursive: true });

  try {
    const { html: appHtml, helmet } = render(route);

    let pageHtml = template.replace(
      '<div id="root"></div>',
      `<div id="root">${appHtml}</div>`
    );

    // Inject per-route title and meta tags from react-helmet-async
    if (helmet) {
      pageHtml = pageHtml.replace(
        "<title>democrito</title>",
        helmet.title?.toString() ?? "<title>democrito</title>"
      );
      const helmetMeta = [helmet.meta?.toString(), helmet.link?.toString(), helmet.script?.toString()]
        .filter(Boolean)
        .join("\n    ");
      if (helmetMeta) {
        pageHtml = pageHtml.replace("</head>", `    ${helmetMeta}\n  </head>`);
      }
    }

    writeFileSync(join(outDir, "index.html"), pageHtml);
    rendered++;
  } catch {
    // Page uses browser-only APIs (getComputedStyle, etc.) — write SPA shell
    writeFileSync(join(outDir, "index.html"), template);
    skipped++;
    console.warn(`  ⚠ ${route} — browser-only page, using SPA shell`);
  }
}

// 5 — Clean up SSR bundle
rmSync(join(root, "dist-ssr"), { recursive: true });

console.log(`✓ Prerendered ${rendered} routes (${skipped} used SPA shell)`);
