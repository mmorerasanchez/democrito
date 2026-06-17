# Phases 3–6 — Claude Code prompts (ready to paste)

Companion to `PHASE-2-PRODUCT-SEAM.md` and the Phase-1 inventory. Run from the public product clone
unless a prompt says otherwise. Git stays in Claude Code; each prompt starts with `cd` so `CLAUDE.md`
auto-loads. **Gates are non-negotiable** — do not start a phase until the prior phase's exit criteria
are met and verified.

> **Git workflow (ALL repos, ALWAYS):** branch → commit → push → **open a PR for Mariano to review in GitHub**. `main` is protected; never push to it directly, never self-merge. Each phase = one branch + one PR (e.g. `chore/phase-3-strip-product`). Where a prompt says "push to … main," read it as "push the phase branch and open a PR."
>
> **The one carve-out is Phase 4** — it is a `git push --force` that *replaces* `main`'s history, which by definition cannot be a PR onto the branch being rewritten. Phase 4 stays a reviewed force-push with an explicit pre-push checkpoint (P4.2/P4.3): Claude Code stops and shows the clean tree + single-commit log, Mariano approves, then the force-push runs.

## Decisions locked for these phases (2026-06-16)

- **scripts/ split:** product keeps `generate-counts.mjs`, `generate-tokens.mjs`, `stamp-design-date.mjs` (drift-proofing); site-only `generate-sitemap.mjs` + `prerender.mjs` are deleted in Phase 3. *(Divergence from spec text that called all of `scripts/` site-only.)*
- **package.json:** product repo is minimal — only build-tooling deps. Component npm peers (Radix/lucide/cva) live in `registry.json` per-item, not in product `package.json`. *(Product is not an app and not an npm package — registry+clone only.)*
- **MCP/llms endpoints:** site serves `democrito.design/.well-known/mcp.json` + `llms.txt`; the raw-GitHub paths inside are rewritten to drop `/app-democrito/` (→ `.../democrito/main/CLAUDE.md`, `.../main/registry.json`). Content fix in Phase 3, rides to site in Phase 5.

## ⚠️ Migration-wide correctness item (don't lose this)

`public/.well-known/mcp.json` and `public/llms.txt` currently reference
`raw.githubusercontent.com/mmorerasanchez/democrito/main/**app-democrito/**CLAUDE.md` and
`.../app-democrito/registry.json`. **After Phase 4, the product is the repo root — there is no
`app-democrito/` subfolder**, so every one of those paths 404s. These files must be rewritten
(Phase 3, task 3.6a below) and the endpoints must ride to the site repo (Phase 5), not be lost
in the strip. The `.well-known/mcp.json` content-type header in `vercel.json` must also survive.

---

# PHASE 3 — Strip public repo to product-only

**Gate:** Phase 2 exit met — a component from each tier proven to install standalone (2.5 passed).
First destructive phase. Everything deleted here already exists in `democrito-site` (Phase 1).

## P3.1 — Pre-flight (stop-if-fail)

```
cd ~/Desktop/apps/democrito/democrito-site

Phase 3 pre-flight. Report PASS/FAIL for each; if any FAIL, STOP and tell me — do not proceed.
1. Site builds standalone: npm install && npm run build && npm test  (expect 125 tests pass, 12 routes prerender)
2. Site contains every SITE-bucket path from the Phase-1 inventory (src/pages, src/components/app,
   src/components/sections, src/examples, src/hooks, src/lib, src/assets, App.tsx, AppRoutes.tsx,
   main.tsx, entry-server.tsx, index.html, scripts/, tests/visual, public/ chrome). List any missing.
Then, in the public product repo:
   cd ~/Desktop/apps/democrito/app-democrito
3. Confirm the Phase-2 branch exists and tokens/ + registry/ are present and were proven by 2.5.
   git branch --list phase-2-product-seam ; ls tokens registry
Report the combined table. Proceed only on all-PASS.
```

## P3.2 — Promote Phase-2 structure to a release branch

```
cd ~/Desktop/apps/democrito/app-democrito

Do NOT touch main yet. Create the phase-3 branch from the phase-2 work so tokens/ + registry/ are canonical:
   git checkout phase-2-product-seam && git pull --ff-only 2>/dev/null; git checkout -b phase-3-product-only
Confirm tokens/ and registry/ are present and the registry manifest (registry.json) lists 110 items
(103 components incl. relocated ThemeToggle + 5 tier bundles + base + theme). Report the tree. Commit nothing yet.
```

## P3.3a — Repoint the product test suite FIRST (do this BEFORE any deletion)

```
cd ~/Desktop/apps/democrito/app-democrito   # on phase-3-product-only

⚠️ BLOCKER if skipped: the kept tests import paths that P3.3b deletes, so the suite must be
repointed at registry/ + tokens/ BEFORE deleting src/. vitest.config.ts currently has
setupFiles ["./src/test-setup.ts"] and include ["src/**/*.{test,spec}.{ts,tsx}"].

1. Move tests + setup into the product layout:
   - move src/__tests__/  → tests/  (or keep under a path that survives the strip)
   - move src/test-setup.ts → tests/test-setup.ts
   - update vitest.config.ts: setupFiles → the new test-setup path; include → cover tests/ AND
     registry/ (e.g. ["{tests,registry}/**/*.{test,spec}.{ts,tsx}"]).
2. Repoint the two component/lib tests to the registry copies:
   - CopyButton test:    @/components/atoms/CopyButton  → the registry path (e.g. @/registry/atoms/CopyButton or relative)
   - tokenizeBrackets test: @/lib/tokenizeBrackets       → registry/lib/tokenizeBrackets
   Add a tsconfig path alias for @/registry → registry/ if you use the alias form. The two token
   tests (tokens.test, tokens.contract) read tokens/index.css via fs — repoint that path to
   tokens/index.css (they may currently read src/index.css).
3. Run npm test — all 4 suites must pass while src/ still exists (proves the repoint, not deletion).
Commit: test(product): repoint suite at registry/ and tokens/ for product layout
```

## P3.3b — Delete SITE-bucket paths (working-tree only; history is Phase 4)

```
cd ~/Desktop/apps/democrito/app-democrito   # on phase-3-product-only

Delete ONLY paths the site repo already owns (cross-checked against Phase-1 inventory). Use git rm.
Before deleting, confirm registry/ and tokens/ already hold the migrated product source so nothing
unique is lost, AND that P3.3a passed (tests no longer import src/).

DELETE (site-only):
  src/pages/  src/components/app/  src/components/sections/  src/examples/
  src/hooks/  src/assets/  src/App.tsx src/App.css src/AppRoutes.tsx src/main.tsx
  src/entry-server.tsx src/vite-env.d.ts src/generated/  index.html
  scripts/generate-sitemap.mjs  scripts/prerender.mjs
  tests/visual/  (and tests/ if it holds only visual)
  src/lib/prototype-auth.ts  src/lib/tokenizeBrackets.tsx (migrated to registry/lib)
  src/lib/utils.ts (migrated to registry/lib)  src/lib/ if now empty
  src/components/{atoms,molecules,organisms,templates,ui}/  (migrated to registry/)
  src/index.css  (migrated to tokens/index.css)
  public/favicon*.png public/favicon.ico public/og-image.png public/placeholder.svg
  public/robots.txt public/sitemap.xml   (site chrome)

KEEP (product) — do NOT delete:
  tokens/  registry/  docs/  skill/  CLAUDE.md AGENTS.md DESIGN.md
  registry.json components.json
  scripts/generate-counts.mjs scripts/generate-tokens.mjs scripts/stamp-design-date.mjs scripts/build-registry.mjs
  tests/  (the repointed suite from P3.3a — NOT src/__tests__, which moved)
  public/r/democrito.json          (served registry — canonical build artifact, see 3.4)
  public/.well-known/mcp.json      (MCP endpoint — content fixed in 3.6a)
  public/llms.txt public/llms-full.txt  (AI context endpoints — content fixed in 3.6a)
  README LICENSE CHANGELOG CONTRIBUTING CODE_OF_CONDUCT SECURITY USAGE

Note: after P3.3a, src/ should contain ONLY the old site source (all kept tests + setup have moved
to tests/). Deleting src/ wholesale is then safe — but confirm `git ls-files src/` shows nothing
you intend to keep before removing it.

After deletion, grep for dangling imports to ANY deleted path — cover src component/lib aliases too,
not just site chrome (this is what would otherwise miss the test-import breakage):
  grep -rnE "@/(pages|components|examples|assets|lib|hooks)|src/(components|lib|hooks|index\.css)" . \
    --include=*.ts --include=*.tsx --include=*.mjs --include=*.json
Must return zero hits outside vendor/node_modules. (registry/ files reference each other by relative
path or @/registry, NOT @/components or @/lib.) Then run npm test — all 4 suites pass.
Commit: chore(product): remove showcase paths, product-only working tree
Don't push.
```

## P3.4 — Resolve the registry-serving file

```
cd ~/Desktop/apps/democrito/app-democrito   # on phase-3-product-only

The product repo is the SOURCE of public/r/democrito.json. Keep its copy.
1. The Phase-2 generator scripts/build-registry.mjs writes public/r/democrito.json (there is no
   `shadcn build`). Confirm it's wired into the package.json "registry" script.
2. Regenerate public/r/democrito.json from the 110-item registry.json and confirm it's current.
The SITE will pull this via submodule and serve it at the URL (Phase 5). Product keeps it as source.
Commit: build(registry): emit served public/r/democrito.json from manifest
```

## P3.5 — Strip package.json to product-only (minimal)

```
cd ~/Desktop/apps/democrito/app-democrito   # on phase-3-product-only

Product repo is NOT an app and NOT an npm package — registry + clone only. Strip package.json:
- Keep "name": "democrito", "version": "3.5.0", "license": "MIT".
- scripts: keep only product build/drift-proofing — e.g.
    "build": "node scripts/generate-counts.mjs && node scripts/generate-tokens.mjs && node scripts/stamp-design-date.mjs && <registry build emitting public/r/democrito.json>"
    "test": "vitest run"   (token/contract tests)
  Remove: dev (vite), build:dev, preview, prerender, sitemap, test:visual*, lint-if-site-only.
- dependencies: REMOVE site-app runtime (react-router-dom, recharts, react-helmet-async,
  @tanstack/react-query, @vercel/analytics, @vercel/speed-insights, embla-carousel-react, vaul,
  next-themes, sonner, cmdk, input-otp, react-day-picker, date-fns, etc.).
  Component npm peers (Radix, lucide-react, cva, clsx, tailwind-merge) are declared per-item in
  registry.json — they do NOT belong in the product package.json.
- KEEP (devDeps the kept suite genuinely needs — verify by running, don't strip blind):
  vitest AND its peer `vite` (vitest won't run without it), jsdom, @types/node, typescript, and
  — because the repointed component tests render — @testing-library/react + @testing-library/jest-dom
  + react + react-dom (as devDeps). Strip everything else (lovable-tagger, playwright/@playwright,
  vite plugins, @tailwindcss/vite, tailwindcss, eslint*, react-router-dom, recharts, etc.).
After editing, run npm install && npm run build && npm test; confirm counts emit 11/17/19/7/48 and
all 4 test suites pass. If a removed dep turns out to be required, add it back (don't leave tests red).
Commit: chore(deps): strip package.json to product build tooling only
Report the final dependency list.
```

## P3.6 — README rewrite + endpoint path fix

```
cd ~/Desktop/apps/democrito/app-democrito   # on phase-3-product-only

3.6a (correctness — REQUIRED): fix raw-GitHub paths that will 404 after the root becomes product.
  In public/.well-known/mcp.json and public/llms.txt + llms-full.txt, replace every
  ".../mmorerasanchez/democrito/main/app-democrito/CLAUDE.md"  → ".../democrito/main/CLAUDE.md"
  ".../mmorerasanchez/democrito/main/app-democrito/registry.json" → ".../democrito/main/registry.json"
  ".../app-democrito/skill/..." → ".../skill/..."
  i.e. drop the "app-democrito/" segment everywhere (the product is the repo root now).
  Grep to confirm zero "app-democrito" strings remain in any served/committed file.

3.6b: rewrite README.md for the PRODUCT audience (remove all showcase-site framing):
  - What Democrito is (atomic design system; warm/dark/light; 3 fonts; 3 surfaces).
  - Install: the exact published command — npx shadcn@latest add https://democrito.design/r/democrito.json
    plus per-component/bundle examples (shadcn add democrito-atoms, etc.).
  - How to customize tokens on-brand (edit tokens/index.css theme blocks; Sanzo Wada note).
  - How agents read CLAUDE.md / AGENTS.md / DESIGN.md.
  - Note: history reset at v3.5.0 relaunch (for forkers) — placeholder; finalized in Phase 4.
Commit: docs(readme): rewrite for product audience; fix endpoint paths for root layout
Don't push — Phase 4 rewrites history before anything reaches origin.
```

## P3.7 — Verify stripped product builds

```
cd ~/Desktop/apps/democrito/app-democrito   # on phase-3-product-only
Run the product build + tests and report:
  npm install && npm run build && npm test
PASS = token JSON regenerates, registry public/r/democrito.json emits, counts read 11/17/19/7/48,
vitest passes, and NO import references a deleted site path (re-run the dangling-import grep).
This is the Phase 3 exit gate. Report the result table.

Then push the phase-3-product-only branch and open a PR titled
"chore: strip public repo to product-only (Phase 3)" for review.
Do NOT force/replace main here — that is Phase 4. Do NOT self-merge.
```

---

# PHASE 4 — Reset public history to clean v3.5.0

**Gate:** Phase 3 verified building, product-only. **Archive confirmed intact.** Destructive + irreversible-on-origin.

## P4.1 — Re-confirm the safety net (HARD STOP)

```
Verify the archive BEFORE any history operation. Report PASS/FAIL; STOP on any FAIL.
1. gh repo view mmorerasanchez/democrito-archive --json visibility,isPrivate,pushedAt,url
   (must exist, be private). If no gh, I'll confirm in browser.
2. Confirm democrito-archive contains full pre-split history (commit count >> 1).
3. Restore-test the local bundle into a temp dir:
   git clone /path/to/democrito-archive.bundle /tmp/archive-restore-test && cd /tmp/archive-restore-test && git log --oneline | wc -l
   (must restore with full history). Tell me the bundle path if you know it; else I'll locate it.
Do not proceed to P4.2 until all three PASS.
```

## P4.2 — Snapshot + reset to a single clean root commit

```
cd ~/Desktop/apps/democrito/app-democrito

Confirm you are on phase-3-product-only and the working tree is the exact product-only tree that
should become commit #1 (run the product build once more; tree clean). Then reset history via
orphan branch (deliberate single-commit start — NOT filter-repo, which is for path scrubs):

   git checkout --orphan clean-main
   git add -A
   git commit -m "chore: democrito v3.5.0 — clean public product release"
   # sanity: this commit must contain ONLY product (no src/pages, no app/, no examples)
   git ls-files | grep -E "pages/|components/app|examples/|entry-server|prerender" && echo "LEAK — STOP" || echo "clean"
   git branch -D main
   git branch -m clean-main main

Report git log --oneline (should be 1 commit) and the top-level tree. Do NOT push yet.
```

## P4.3 — Tag + force-push (point of no return on origin)

```
cd ~/Desktop/apps/democrito/app-democrito

Only after P4.1 PASSED and P4.2's tree is confirmed product-only.
1. Tag the new root: git tag -a v3.5.0 -m "democrito v3.5.0 — clean public product relaunch"
   (Old tags v3.0.0/v3.2.2/v3.4.0 point at orphaned commits — leave them; they live in the archive.
    Do not graft old tags onto new history.)
2. Confirm branch: git rev-parse --abbrev-ref HEAD  (must be main)
3. Force-push:  git push --force origin main
   then:        git push origin v3.5.0
Report the push result. If anything looks off BEFORE pushing, stop and ask me.
```

## P4.4 — Post-push verification (browser)

```
Confirm on github.com/mmorerasanchez/democrito:
- exactly one commit on main, message "democrito v3.5.0 — clean public product release"
- stars intact (count unchanged), repo URL unchanged
- file tree is product-only (tokens/ registry/ docs/ skill/ + AI context + community files; no src/pages etc.)
- README renders for the product audience
- v3.5.0 tag present under Releases/Tags
Report a checklist. Add a one-line release note that history was reset at the v3.5.0 relaunch (for forkers).
```

---

# PHASE 5 — Reconnect the seam (submodule + registry + Vercel)

**Gate:** Phase 4 done; public `main` is the clean v3.5.0 product. **Highest care — the registry URL must never visibly break.**

## P5.1 — Add product as a pinned submodule of the site

```
cd ~/Desktop/apps/democrito/democrito-site

Per docs/SUBMODULE-SEAM.md (written in Phase 2). Implement now.
1. Add the public product as a submodule, pinned to v3.5.0:
   git submodule add https://github.com/mmorerasanchez/democrito vendor/democrito
   cd vendor/democrito && git checkout v3.5.0 && cd ../..
   git add .gitmodules vendor/democrito
2. Repoint the site's component/token imports to the submodule path (vite alias + tsconfig paths):
   map @/registry → vendor/democrito/registry, tokens → vendor/democrito/tokens/index.css.
   Remove the Phase-1 provisional in-place copies of components/tokens ONLY after imports resolve
   to the submodule and the build is green.
3. Verify: npm install && npm run build && npm test  (125 tests, 12 routes). Report PASS/FAIL.
Commit: feat(seam): consume product via pinned submodule at v3.5.0
Branch (feat/phase-5-submodule), push, open a PR in democrito-site. Do not push to main.
```

## P5.2 — Site serves the registry URL (byte-for-byte)

```
cd ~/Desktop/apps/democrito/democrito-site

The site build must emit /r/democrito.json sourced from the submodule's registry output,
so https://democrito.design/r/democrito.json resolves exactly as before.

0. REGENERATE THE MANIFEST WITH THE REAL URL FIRST (Phase-2 follow-up, required).
   The Phase-2 generator (scripts/build-registry.mjs in the product repo) embeds registryDependencies
   as resolvable URLs ONLY when REGISTRY_URL is set; otherwise they are name-only and multi-dependency
   installs (e.g. AppShell → SidebarNav/TopBar/ThemeToggle, or `shadcn add democrito-organisms`) will
   NOT resolve. Now that the URL exists, regenerate in the product repo (or its submodule checkout):
     REGISTRY_URL=https://democrito.design/r node scripts/build-registry.mjs
   and bake REGISTRY_URL into the product's "registry" npm script / CI so future builds are correct.
   Confirm a multi-dep item (app-shell) lists its registryDependencies as full .json URLs.
1. Wire the site build to copy vendor/democrito/public/r/democrito.json → site public/r/democrito.json
   (or symlink/import). Confirm the served bytes equal the (URL-baked) submodule registry output.
2. Confirm .well-known/mcp.json and llms.txt + llms-full.txt are served by the site too — copy the
   (path-fixed, Phase-3) versions from the submodule into the site's public/, and confirm the
   vercel.json header that sets .well-known/mcp.json content-type is present in the SITE vercel.json.
3. Build and diff: the new /r/democrito.json must match what npx shadcn add expects (110 items,
   registryDependencies as resolvable URLs).
Commit: feat(seam): serve registry + MCP/llms endpoints from submodule output
Add to the same Phase-5 PR (or its own), push the branch — do not push to main. Do NOT touch
Vercel project settings yet.
```

## P5.3 — Vercel cutover (ORDERING IS NON-NEGOTIABLE)

```
This is the single riskiest step. Manual Vercel dashboard actions — I'll guide, you click.
SAFE ORDER (never reverse):
1. Create/identify the Vercel project linked to democrito-site. Deploy it (preview) and confirm it
   builds and serves the showcase + /r/democrito.json on the *.vercel.app preview URL.
2. ADD the domain democrito.design to the NEW site-repo project. Verify it serves correctly
   (showcase loads, /r/democrito.json returns 110-item registry) WHILE still attached to old project
   if Vercel allows, or immediately after DNS propagates.
3. ONLY AFTER the new project serves democrito.design correctly: REMOVE the domain from the OLD
   (public-repo) Vercel project.
4. Confirm vercel.json lives in democrito-site (SPA rewrite + security headers + .well-known/mcp.json
   content-type) — it was copied in Phase 1; verify it's the correct/current version.
Never remove the domain from the old project before the new one is confirmed serving it.
Report each step as you complete it.
```

## P5.4 — End-to-end contract verification

```
After cutover, verify the published contracts (I'll run the shadcn add in a throwaway project):
- https://democrito.design loads the full showcase
- https://democrito.design/r/democrito.json returns the registry (110 items, same shape)
- npx shadcn@latest add https://democrito.design/r/democrito.json installs into a fresh Vite project
- A MULTI-DEPENDENCY install resolves end-to-end (this exercises the REGISTRY_URL fix from P5.2 step 0):
  `npx shadcn@latest add https://democrito.design/r/app-shell.json` must pull SidebarNav, TopBar,
  ThemeToggle and all transitive deps with no name-only/404 failures. Also try a bundle:
  `... add https://democrito.design/r/democrito-organisms.json`.
- https://democrito.design/.well-known/mcp.json serves with correct content-type, paths resolve (no app-democrito 404s)
- https://democrito.design/llms.txt and /llms-full.txt serve
Report a pass/fail table. The install command STRING must be unchanged — infra matches it.
```

## P5.5 — Confirm public repo is deploy-free

```
cd ~/Desktop/apps/democrito/app-democrito

The product repo no longer deploys. Confirm/remove deploy coupling:
- It should not contain a vercel.json (was it deleted in Phase 3? if present and unused, remove it).
- No @vercel/* deps (removed in P3.5).
- Confirm no Vercel project still auto-deploys from this repo (check dashboard; disconnect if so).
Commit (if any change): chore(repo): remove residual deploy config from product repo
Branch (chore/phase-5-deploy-free), push, open a PR. Do not push to main.
```

---

# PHASE 6 — Carry over surviving fixes

**Gate:** Phase 5 done; site deploys from site repo, registry URL live.

## P6.1 — Re-verify drift-proofing in the product repo

```
cd ~/Desktop/apps/democrito/app-democrito

Confirm the generators work against the NEW paths:
1. generate-counts.mjs scans registry/ (not src/components/) → still yields 11/17/19/7/48.
   (Note the ThemeToggle relocation from Phase 2 — confirm the documented count is consistent.)
2. generate-tokens.mjs reads tokens/index.css → design-tokens.json regenerates; confirm it's
   generated, not hand-edited (regenerate and git diff should be empty if already current).
3. stamp-design-date.mjs still stamps DESIGN.md.
Run npm run build; report each generator's output line.
```

## P6.2 — Stale path/URL grep across BOTH repos

```
Grep both repos and report every hit (these are stale references to fix):
  PRODUCT (app-democrito):  grep -rnE "src/index\.css|src/components/|app-democrito" . --include=*.md --include=*.json --include=*.ts --include=*.tsx --exclude-dir=node_modules --exclude-dir=vendor
  SITE (democrito-site):    same grep
Expected: zero "app-democrito" anywhere committed; src/ refs in docs/AI pages repointed to tokens/ + registry/.
Also confirm site AI pages (ai/github, ai/vibe-coding, ai/examples) describe the product repo's REAL
structure (tokens/ + registry/, submodule consumption), not the old single-repo layout.
Report the hit list; I'll decide fixes.
```

## P6.3 — Outstanding audit content items

```
cd ~/Desktop/apps/democrito/app-democrito

From the original v3.5.0 audit, confirm these doc-content items are present (skip any already shipped):
  - breakpoint table, theme-map, type-scale in px, contrast fencing, and a contrast contract test.
Check docs/ and DESIGN.md; for the contrast contract test, confirm it's in src/__tests__/ (or wherever
the product tests live) and passes. Report present/missing per item; draft the missing ones for my review.
```

## P6.4 — Finalize CHANGELOG + cross-repo consistency

```
cd ~/Desktop/apps/democrito/app-democrito

1. Ensure CHANGELOG [3.5.0] reads as one coherent relaunch: repo split, tokens/+registry/ structure,
   history reset, registry contract built out (110 items). One entry, product-framed.
2. Cross-repo consistency pass — confirm all three agree:
   - site's submodule pin (vendor/democrito @ v3.5.0)
   - product's registry output (public/r/democrito.json, 110 items)
   - published counts/claims (11/17/19/7/48 in counts.ts, README, docs, llms.txt)
Report any mismatch. Commit: docs(changelog): consolidate v3.5.0 relaunch entry
Branch (docs/phase-6-carryover), push, open a PR for review. Do not push to main.
```

---

## Routing notes
- **Branch + PR for every phase** (all repos). Phase 3 ends in a PR. Phases 5–6 end in PRs. Phase 4 is the sole carve-out: a reviewed `--force` history reset (can't be PR'd onto the branch it rewrites) — it stops at P4.2/P4.3 for explicit approval before the force-push.
- Phases 3–4 happen on branches of the **public** repo and are not on `origin/main` until P4.3's force-push.
- Phase 4 P4.1 (archive verify) is a HARD STOP — never run P4.2/P4.3 without it.
- Phase 5 P5.3 (Vercel) is manual dashboard work; the add-before-detach ordering is non-negotiable.
- The `app-democrito/` path-fix (P3.6a) and the `.well-known/mcp.json` content-type carry-over (P5.2)
  are the two easiest things to lose in the shuffle — both are called out explicitly.
