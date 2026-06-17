/**
 * scripts/build-registry.mjs
 * Generates registry.json and public/r/democrito.json from registry/ source files.
 * Run: node scripts/build-registry.mjs
 */
import { readFileSync, readdirSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { resolve, join, dirname, basename } from "node:path";

const root = resolve(".");

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function toKebabCase(str) {
  return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

function readFile(path) {
  return readFileSync(join(root, path), "utf8");
}

function fileExists(path) {
  return existsSync(join(root, path));
}

/** Resolve a relative import path to a registry/ file path (without extension).
 *  Uses Node's path.resolve to handle ".." correctly, then makes it relative to root. */
function resolveRelative(fromPath, importPath) {
  // fromPath: "registry/atoms/CodeBlock.tsx" (relative to root)
  // importPath: "../lib/tokenizeBrackets"
  const absFrom = join(root, fromPath);
  const absResolved = resolve(dirname(absFrom), importPath);
  // Return path relative to root
  return absResolved.slice(root.length + 1).replace(/\\/g, "/");
}

/** Find the actual file on disk given a path-without-extension. */
function resolveExtension(pathNoExt) {
  for (const ext of [".tsx", ".ts", ".jsx", ".js"]) {
    if (fileExists(pathNoExt + ext)) return pathNoExt + ext;
  }
  return null;
}

/**
 * Rewrite embedded content so all imports resolve correctly after shadcn install.
 *
 * shadcn installs files based on path prefix matching:
 *   registry/ui/<X>  → src/components/ui/<X>   (ui alias)
 *   registry/<tier>/<X> → src/components/<X>    (components alias, tier dir stripped)
 *   registry/lib/<X> → src/lib/<X>             (lib alias)
 *   registry/hooks/<X> → src/hooks/<X>         (hooks alias)
 *
 * So all cross-tier refs need @/ aliases to resolve at the consumer install path.
 */
function rewriteContent(content, tier) {
  const isUi = tier === "ui";

  // 1. @/components/<non-ui-tier>/<name> → @/components/<name>  (flat install)
  content = content.replace(
    /from\s+(['"])@\/components\/(?:atoms|molecules|organisms|templates)\/([^'"]+)\1/g,
    (_, q, name) => `from ${q}@/components/${name}${q}`,
  );

  // 2. Relative imports
  content = content.replace(
    /from\s+(['"])(\.[^'"]+)\1/g,
    (match, q, spec) => {
      if (spec.startsWith("./")) {
        const name = spec.slice(2);
        const target = isUi ? `@/components/ui/${name}` : `@/components/${name}`;
        return `from ${q}${target}${q}`;
      }
      if (spec.startsWith("../")) {
        const rest = spec.slice(3);
        const slashIdx = rest.indexOf("/");
        if (slashIdx === -1) return match;
        const dir = rest.slice(0, slashIdx);
        const name = rest.slice(slashIdx + 1);
        switch (dir) {
          case "ui":        return `from ${q}@/components/ui/${name}${q}`;
          case "lib":       return `from ${q}@/lib/${name}${q}`;
          case "hooks":     return `from ${q}@/hooks/${name}${q}`;
          case "atoms":
          case "molecules":
          case "organisms":
          case "templates": return `from ${q}@/components/${name}${q}`;
          default:          return match;
        }
      }
      return match;
    },
  );

  return content;
}

/** Parse all `from "..."` specifiers in a file. */
function parseImports(content) {
  const sources = new Set();
  const re = /from\s+['"]([^'"]+)['"]/g;
  let m;
  while ((m = re.exec(content)) !== null) sources.add(m[1]);
  return [...sources];
}

/** Check if a specifier is an npm package (not a relative or @/ alias path). */
function isNpmPackage(spec) {
  return !spec.startsWith(".") && !spec.startsWith("@/");
}

const SKIP_NPM = new Set(["react", "react-dom"]);

/** Convert a component file path to a registry item name. */
function pathToName(filePath) {
  return toKebabCase(basename(filePath).replace(/\.(tsx?|jsx?)$/, ""));
}

// ---------------------------------------------------------------------------
// Tier config
// ---------------------------------------------------------------------------

const TIERS = [
  { dir: "atoms",     type: "registry:component" },
  { dir: "molecules", type: "registry:component" },
  { dir: "organisms", type: "registry:component" },
  { dir: "templates", type: "registry:component" },
  { dir: "ui",        type: "registry:ui" },
];

// Files we track as embeddable lib/hook entries (utils is covered by the base item)
const REGISTRY_LIB_FILES = new Set([
  "registry/lib/tokenizeBrackets.tsx",
]);
const REGISTRY_HOOK_FILES = new Set([
  "registry/hooks/use-theme.tsx",
  "registry/hooks/use-toast.ts",
  "registry/hooks/use-mobile.tsx",
]);

// Cache for embedded lib/hook content to avoid re-reading
const contentCache = new Map();
function cachedContent(path) {
  if (!contentCache.has(path)) contentCache.set(path, readFile(path));
  return contentCache.get(path);
}

function makeLibEntry(filePath, type) {
  return { path: filePath, type, content: cachedContent(filePath) };
}

// ---------------------------------------------------------------------------
// Process one component file → registry item
// ---------------------------------------------------------------------------

function processFile(filePath, type, tier) {
  const rawContent = readFile(filePath);
  const content = rewriteContent(rawContent, tier);
  const name = pathToName(filePath);
  const componentName = basename(filePath).replace(/\.(tsx?|jsx?)$/, "");

  const dependencies = new Set();
  const registryDependencies = new Set();
  const libFiles = new Map(); // path → file entry (deduped)

  // Always include the component itself (rewritten content for consumer)
  const files = [{ path: filePath, type, content }];

  // Parse raw content for dependency analysis (import paths pre-rewrite)
  for (const spec of parseImports(rawContent)) {
    // -- npm package --
    if (isNpmPackage(spec)) {
      if (!SKIP_NPM.has(spec)) dependencies.add(spec);
      continue;
    }

    // -- @/ alias (untouched files) --
    if (spec.startsWith("@/")) {
      const inner = spec.slice(2); // "lib/utils", "components/ui/button", etc.

      if (inner === "lib/utils") continue; // covered by democrito base

      if (inner.startsWith("components/ui/")) {
        registryDependencies.add(inner.replace("components/ui/", ""));
        continue;
      }
      if (inner.startsWith("components/atoms/") || inner.startsWith("components/molecules/") ||
          inner.startsWith("components/organisms/") || inner.startsWith("components/templates/")) {
        const compName = inner.split("/").pop();
        registryDependencies.add(toKebabCase(compName));
        continue;
      }
      // @/hooks/* — shouldn't appear in edited files but handle gracefully
      if (inner.startsWith("hooks/")) {
        const hookBase = "registry/" + inner;
        const hookFile = resolveExtension(hookBase);
        if (hookFile && REGISTRY_HOOK_FILES.has(hookFile)) {
          libFiles.set(hookFile, makeLibEntry(hookFile, "registry:hook"));
        } else {
          dependencies.add(spec); // treat as unknown npm-like dep
        }
        continue;
      }
      continue; // other @/ paths — skip
    }

    // -- relative import --
    const resolvedBase = resolveRelative(filePath, spec);
    const resolvedFile = resolveExtension(resolvedBase);

    if (!resolvedFile) continue; // can't resolve

    // Is it a lib file?
    if (REGISTRY_LIB_FILES.has(resolvedFile)) {
      libFiles.set(resolvedFile, makeLibEntry(resolvedFile, "registry:lib"));
      continue;
    }
    // Is it a hooks file?
    if (REGISTRY_HOOK_FILES.has(resolvedFile)) {
      libFiles.set(resolvedFile, makeLibEntry(resolvedFile, "registry:hook"));
      continue;
    }
    // Is it utils? Skip (base dep)
    if (resolvedFile === "registry/lib/utils.ts") continue;

    // Otherwise it's another registry component → registryDependency
    registryDependencies.add(pathToName(resolvedFile));
  }

  files.push(...libFiles.values());

  const deps = [...dependencies].sort();
  const regDeps = [...registryDependencies].sort();

  if (deps.length === 0 && regDeps.length === 0) {
    console.warn(`  ⚠ ${name}: no dependencies or registryDependencies (check parse)`);
  }

  return {
    name,
    type: "registry:ui",
    title: componentName,
    description: `${componentName} component`,
    author: "mmorerasanchez",
    files,
    ...(deps.length > 0 && { dependencies: deps }),
    ...(regDeps.length > 0 && { registryDependencies: regDeps }),
  };
}

// ---------------------------------------------------------------------------
// Build component items
// ---------------------------------------------------------------------------

const componentItems = [];
const tierComponentNames = {}; // tier → [name, ...]

for (const { dir, type } of TIERS) {
  const dirPath = join(root, "registry", dir);
  const files = readdirSync(dirPath)
    .filter(f => f.endsWith(".tsx") || f.endsWith(".ts"))
    .sort();

  tierComponentNames[dir] = [];

  for (const file of files) {
    const filePath = `registry/${dir}/${file}`;
    const item = processFile(filePath, type, dir);
    componentItems.push(item);
    tierComponentNames[dir].push(item.name);
  }
}

// ---------------------------------------------------------------------------
// Tier bundle items
// ---------------------------------------------------------------------------

const TIER_BUNDLE_DISPLAY = {
  atoms:     { title: "All Atoms",     description: "All atomic components from democrito" },
  molecules: { title: "All Molecules", description: "All molecule components from democrito" },
  organisms: { title: "All Organisms", description: "All organism components from democrito" },
  templates: { title: "All Templates", description: "All template components from democrito" },
  ui:        { title: "All UI",        description: "All UI primitive components from democrito" },
};

const tierBundleItems = Object.entries(tierComponentNames).map(([tier, names]) => ({
  name: `democrito-${tier}`,
  type: "registry:ui",
  title: TIER_BUNDLE_DISPLAY[tier].title,
  description: TIER_BUNDLE_DISPLAY[tier].description,
  author: "mmorerasanchez",
  registryDependencies: names,
}));

// ---------------------------------------------------------------------------
// Prefix custom component registryDependencies with registry URL
// ---------------------------------------------------------------------------
// shadcn resolves registryDependencies by name from the official registry.
// Any custom (non-shadcn) component must be referenced by full URL so shadcn
// knows where to fetch it.  Set REGISTRY_URL to the served base URL, e.g.:
//   REGISTRY_URL=http://localhost:3333 node scripts/build-registry.mjs
// ---------------------------------------------------------------------------

const REGISTRY_URL = process.env.REGISTRY_URL || "";

const customComponentNames = new Set([
  ...tierComponentNames["atoms"],
  ...tierComponentNames["molecules"],
  ...tierComponentNames["organisms"],
  ...tierComponentNames["templates"],
  ...tierComponentNames["ui"],
]);

if (REGISTRY_URL) {
  const addUrl = (dep) =>
    customComponentNames.has(dep) ? `${REGISTRY_URL}/${dep}.json` : dep;

  // Tier bundles: ALL deps are democrito-served — always URL-ify
  const addBundleUrl = (dep) => `${REGISTRY_URL}/${dep}.json`;

  for (const item of componentItems) {
    if (item.registryDependencies) {
      item.registryDependencies = item.registryDependencies.map(addUrl);
    }
  }
  for (const item of tierBundleItems) {
    if (item.registryDependencies) {
      item.registryDependencies = item.registryDependencies.map(addBundleUrl);
    }
  }
  console.log(`\nRegistry URL: ${REGISTRY_URL}`);
} else {
  console.log(`\n⚠ No REGISTRY_URL set — custom registryDependencies will use name-only (may break shadcn add).`);
  console.log(`  Set via: REGISTRY_URL=http://localhost:3333 node scripts/build-registry.mjs`);
}

// ---------------------------------------------------------------------------
// Base items (preserve from existing registry.json, update 3 fields)
// ---------------------------------------------------------------------------

const existingRegistry = JSON.parse(readFile("registry.json"));
const [baseItem, warmItem] = existingRegistry.items;

// Update: baseColor stone → slate; meta.version 3.2.1 → 3.5.0; file path src/ → registry/
const updatedBaseItem = {
  ...baseItem,
  baseColor: "slate",
  description: baseItem.description.replace("stone grays", "stone grays"), // unchanged
  files: [
    {
      path: "registry/lib/utils.ts",
      type: "registry:lib",
      content: cachedContent("registry/lib/utils.ts"),
    },
  ],
  meta: {
    ...baseItem.meta,
    version: "3.5.0",
  },
};

// ---------------------------------------------------------------------------
// Assemble final items array
// ---------------------------------------------------------------------------

const allItems = [
  updatedBaseItem,
  warmItem,
  ...componentItems,
  ...tierBundleItems,
];

// ---------------------------------------------------------------------------
// Build output objects
// ---------------------------------------------------------------------------

const manifest = {
  $schema: existingRegistry.$schema,
  name: existingRegistry.name,
  homepage: existingRegistry.homepage,
  items: allItems,
};

// ---------------------------------------------------------------------------
// Write files
// ---------------------------------------------------------------------------

mkdirSync(join(root, "public/r"), { recursive: true });

// registry.json = full source manifest
writeFileSync(join(root, "registry.json"), JSON.stringify(manifest, null, 2));

// public/r/<name>.json = individual served files (one per item, shadcn install format)
for (const item of allItems) {
  writeFileSync(
    join(root, "public/r", `${item.name}.json`),
    JSON.stringify(item, null, 2),
  );
}

// ---------------------------------------------------------------------------
// Report
// ---------------------------------------------------------------------------

const compCount = componentItems.length;
const bundleCount = tierBundleItems.length;
const baseCount = 2; // democrito + democrito-warm
const total = allItems.length;

console.log(`\n✓ registry.json written, ${total} files written to public/r/`);
console.log(`\nItem counts:`);
console.log(`  ${baseCount} base items (democrito, democrito-warm)`);
for (const [tier, names] of Object.entries(tierComponentNames)) {
  console.log(`  ${names.length.toString().padStart(3)} ${tier}`);
}
console.log(`  --- `);
console.log(`  ${compCount} components total`);
console.log(`  ${bundleCount} tier bundles`);
console.log(`  ${total} total items (expected 110)`);

if (total !== 110) {
  console.warn(`\n⚠ Expected 110 items, got ${total}. Investigate.`);
}
