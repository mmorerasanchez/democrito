import { writeFileSync } from "node:fs";
import { resolve } from "node:path";

const SITE_URL = "https://democrito.design";
const today = new Date().toISOString().split("T")[0];

const routes = [
  { path: "/",               priority: "1.0", changefreq: "weekly"  },
  { path: "/manifesto",      priority: "0.8", changefreq: "monthly" },
  { path: "/tokens",         priority: "0.9", changefreq: "weekly"  },
  { path: "/atoms",          priority: "0.9", changefreq: "weekly"  },
  { path: "/molecules",      priority: "0.9", changefreq: "weekly"  },
  { path: "/organisms",      priority: "0.9", changefreq: "weekly"  },
  { path: "/templates",      priority: "0.9", changefreq: "weekly"  },
  { path: "/ai",             priority: "0.9", changefreq: "weekly"  },
  { path: "/ai/claude",      priority: "0.8", changefreq: "monthly" },
  { path: "/ai/vibe-coding", priority: "0.8", changefreq: "monthly" },
  { path: "/ai/github",      priority: "0.8", changefreq: "monthly" },
  { path: "/ai/examples",   priority: "0.8", changefreq: "monthly" },
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (r) => `  <url>
    <loc>${SITE_URL}${r.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>
`;

writeFileSync(resolve("public/sitemap.xml"), xml);
console.log(`✓ sitemap.xml written with ${routes.length} routes`);
