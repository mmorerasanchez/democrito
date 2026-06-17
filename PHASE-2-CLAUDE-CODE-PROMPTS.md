# Phase 2 — Claude Code prompts (ready to paste)

> **Git workflow (ALL repos, ALWAYS):** branch → commit → push → **open a PR for Mariano to review in GitHub**. `main` is protected; never push to it directly, never self-merge. The Phase-2 work below already lives on `phase-2-product-seam` — when the phase is complete and reviewed locally, push that branch and open ONE PR covering Prompts 1–4. Prompt 6 (site docs) gets its own branch + PR in `democrito-site`.

Run from the **public product** clone. Phase 2 is **additive/branching only** — work happens on a `phase-2-product-seam` branch, never `main`. Nothing is deleted from `src/` (that's Phase 3). Read `PHASE-2-PRODUCT-SEAM.md` first — these prompts assume its audit.

**Decisions locked (2026-06-16):**
1. **Logo** → `src` as prop with a sensible default; `useTheme` picks which. No `@/assets` import.
2. **ThemeToggle** → relocate into `registry/molecules/ThemeToggle.tsx`; `AppShell` imports it from there. (Intentional +1 to the registry molecule set — flag it.)
3. **Registry granularity** → **both**: one item per component **plus** curated tier bundles (`democrito-atoms`, `democrito-molecules`, `democrito-organisms`, `democrito-templates`, `democrito-ui`).

**⚠️ Corrections from plan review (2026-06-17) — baked into the prompts below:**
- **AppShell imports `react-router-dom`** (`Outlet, useNavigate, useLocation, useSearchParams`) — the only component of the 102 that does. The original audit missed this; it must be declared as an npm `dependency` on the AppShell registry item or the consumer proof fails. Handled in Prompt 2 §3 and Prompt 3.
- **No registry build step exists.** Nothing in `package.json`/`scripts/` produces `public/r/democrito.json` today (the file is orphaned). The generator in Prompt 3 must write **both** `registry.json` and `public/r/democrito.json` directly — there is no `shadcn build` to call.
- **Item count is 110, not 109.** ThemeToggle becomes a 103rd per-component item → 103 + 5 bundles + 2 (base, theme) = **110**.
- **`src/hooks/use-typing-animation.ts` is unused by components** (like `prototype-auth.ts`) — do NOT copy it into `registry/hooks/`. Only the three named hooks move.

---

## Prompt 1 — Create the branch + scaffold tokens/ and registry/ (additive)

```
cd ~/Desktop/apps/democrito/app-democrito

Phase 2, additive only. Do NOT touch main, do NOT delete anything from src/, do NOT change
vercel.json or the registry URL. Confirm you're not on main before writing.

1. Verify branch state, then create and switch to a working branch:
   git checkout main && git pull
   git checkout -b phase-2-product-seam

2. Create the clean product structure ALONGSIDE the existing src/ (copy, don't move):
   - tokens/index.css            ← copy of src/index.css (verbatim for now)
   - tokens/design-tokens.json   ← copy of root design-tokens.json
   - registry/atoms/ molecules/ organisms/ templates/ ui/   ← copy each src/components/<tier>/*.tsx
   - registry/lib/utils.ts           ← copy src/lib/utils.ts
   - registry/lib/tokenizeBrackets.tsx ← copy src/lib/tokenizeBrackets.tsx
   - registry/hooks/use-theme.tsx    ← copy src/hooks/use-theme.tsx
   - registry/hooks/use-toast.ts     ← copy src/hooks/use-toast.ts
   - registry/hooks/use-mobile.tsx   ← copy src/hooks/use-mobile.tsx
   Do NOT copy src/lib/prototype-auth.ts NOR src/hooks/use-typing-animation.ts
   (both showcase-only, imported by zero components). Copy ONLY the three hooks listed above.

3. Report a tree of tokens/ and registry/ and confirm counts: registry should hold
   11 atoms, 17 molecules, 19 organisms, 7 templates, 48 ui.

Commit: chore(product): scaffold tokens/ and registry/ alongside src (additive)
Do not push yet — I'll review the tree first.
```

---

## Prompt 2 — Decouple the 5 flagged components + de-barrel imports

```
cd ~/Desktop/apps/democrito/app-democrito   # on phase-2-product-seam

Decouple ONLY the copies under registry/ — leave src/ untouched. Per PHASE-2-PRODUCT-SEAM.md
Task 2.2. After each edit, the file must import only: cn from registry/lib, Radix/lucide npm
packages, registry/hooks, and other registry components by relative path.

1. registry/atoms/CodeBlock.tsx — repoint tokenizeBrackets import to ./../lib/tokenizeBrackets
   (or the registry alias), CopyButton to ./CopyButton.

2. registry/atoms/Logo.tsx — remove the bundled-asset coupling:
   make logo sources props: `logoSrc?: string; logoDarkSrc?: string` and keep useTheme from
   registry/hooks/use-theme to pick which. No @/assets import. IMPORTANT: provide a real default
   so the component never renders a broken/empty <img> — use an inline minimal SVG data-URI
   wordmark as the default for both props (NOT undefined). Document that consumers pass their own.

3. registry/templates/AppShell.tsx — TWO changes:
   (a) relocate ThemeToggle into registry/molecules/ThemeToggle.tsx (it only needs useTheme +
       ui/button + lucide — fully portable) and import it from there. This makes the registry
       molecule set 18 (vs 17 in src) — intentional divergence, flag it.
   (b) AppShell imports react-router-dom (Outlet, useNavigate, useLocation, useSearchParams) —
       this is legitimate (it's a router-aware shell). Do NOT try to strip it. Just ensure it
       resolves cleanly; it gets declared as an npm dependency on AppShell's registry item in
       Prompt 3. Note AppShell is the ONLY component that imports the router.

4. De-barrel: in registry copies of SearchBar, TokenReferenceCard, ActivityFeed, AuthForm,
   SidebarNav, TopBar — replace `from "@/components/atoms"` (barrel) with explicit imports of the
   specific atoms by relative path, so registry files resolve concretely.

5. registry/ui/sidebar.tsx and toaster.tsx — repoint use-mobile / use-toast to registry/hooks.

Run the existing vitest suite to confirm nothing in src/ broke (registry/ isn't wired into the
app yet, so tests cover src/): npm test
Commit: refactor(registry): decouple Logo, AppShell, CodeBlock, sidebar, toaster; de-barrel imports
Report each file's final import list. Don't push yet.
```

---

## Prompt 3 — Build the per-component registry manifest (2.3)

```
cd ~/Desktop/apps/democrito/app-democrito   # on phase-2-product-seam

Build out registry.json so every component is installable. Don't hand-author 102 entries —
write a generator.

1. Create scripts/build-registry.mjs that:
   - walks registry/{atoms,molecules,organisms,templates,ui}/*.tsx
   - parses each file's imports to derive:
       dependencies        = npm packages (@radix-ui/*, lucide-react, class-variance-authority,
                             cmdk, react-hook-form, react-router-dom, etc. — whatever is imported;
                             AppShell will get react-router-dom here, which is correct)
       registryDependencies = other registry components imported (ui/* and cross-tier), by their
                             registry item name (kebab-case of the component)
       files               = [{ path: "registry/<tier>/<File>.tsx", type: "registry:ui" }]
                             plus registry/lib or registry/hooks files the component needs and
                             that aren't covered by a registryDependency
   - keeps the existing democrito (base) and democrito-warm (theme) items
   - emits one registry item per component (103 items — 102 src components + relocated ThemeToggle)
   - ALSO emits 5 curated tier-bundle items — democrito-atoms, democrito-molecules,
     democrito-organisms, democrito-templates, democrito-ui — each a registry item whose
     registryDependencies list every component in that tier (so `shadcn add democrito-atoms`
     pulls all atoms). Bundles reference the per-component items; don't duplicate file bodies.
   - writes BOTH registry.json AND public/r/democrito.json in one pass (see step 4 — there is
     no shadcn build step to call; this generator is the build).

2. Reconcile metadata while you're there: set meta.version to 3.5.0, and resolve the
   baseColor mismatch (registry text says "stone", components.json says "slate" — pick one,
   align both, tell me which).

3. Run it, then sanity-check: item count = 103 components + 5 tier bundles + 2 (base, theme) = 110.
   (If you get 109, ThemeToggle wasn't counted as its own item — investigate.) Print any component
   whose dependencies/registryDependencies came up empty (likely a parse miss to eyeball).

4. Served output: the generator itself writes public/r/democrito.json (there is NO `npx shadcn
   build` or other registry build in package.json today — public/r/democrito.json is currently
   orphaned). Add a script: "registry": "node scripts/build-registry.mjs". Confirm both
   registry.json and public/r/democrito.json are written and identical in item set.

Commit: feat(registry): generate per-component manifest, reconcile version to 3.5.0
Report the item count and any empty-deps warnings. Don't push yet.
```

---

## Prompt 4 — Repoint generators at the new paths (additive)

```
cd ~/Desktop/apps/democrito/app-democrito   # on phase-2-product-seam

The build generators currently read src/. Add registry/ + tokens/ awareness WITHOUT breaking the
src-based site build (both must work during the transition).

- scripts/generate-counts.mjs reads src/components/<tier> and src/index.css.
- scripts/generate-tokens.mjs reads src/index.css.
Make them read from tokens/index.css and registry/<tier> when those exist, falling back to src/
if not — so this branch and main both build. Confirm counts still emit 11/17/19/7/48 (note the
intentional ThemeToggle relocation if it shifts the molecule count).

Also repoint components.json tailwind.css from src/index.css to tokens/index.css ONLY if the
site build still passes with that change; otherwise leave components.json and note it for Phase 3.

Commit: chore(build): make generators read tokens/ and registry/ with src fallback
Run npm run build and npm test; report results. Don't push yet.
```

---

## Prompt 5 — Throwaway-consumer proof (EXIT GATE, 2.5)

```
cd ~/Desktop/apps   # OUTSIDE the democrito repos

Prove the registry installs into a bare project with zero Democrito-site baggage. This is the
Phase 2 exit gate.

1. Scaffold a blank app: npm create vite@latest democrito-consumer-test -- --template react-ts
   cd democrito-consumer-test && npm install
   Install Tailwind v4 + the democrito token setup per registry.json's docs field
   (@tailwindcss/vite, @import "tailwindcss"; @import "tw-animate-css"; import tokens/index.css).

2. Serve the local registry build and point shadcn at it. Either:
   - run the product repo's served output locally (a static server over public/r/), OR
   - use the local registry.json path that `npx shadcn add` accepts.
   Then add ONE component from each tier:
       a ui (button), an atom (Tag), a molecule (StatCard), an organism (EmptyState or
       DashboardStats), a template (DashboardLayout).

3. Render all five on a page wrapped in the warm theme. Run npm run build and npm run dev.
   PASS = each renders correctly on Democrito tokens, build is clean, and NO import resolves to
   anything outside the consumer project / installed registry files (no @/components/app,
   no @/components/sections, no src/ paths, no missing modules).

4. If ANY component drags in a missing import or site path, that component is still coupled →
   report it; it goes back to Prompt 2's decoupling list. Do not mark the gate passed.

Report: per-component pass/fail table + the consumer project's final dependency tree for the
installed files. This test project is throwaway — don't commit it into either repo.
```

---

## Prompt 6 — Document the submodule sync seam (2.6, doc only)

```
cd ~/Desktop/apps/democrito/democrito-site

Phase 2 specifies the seam; Phase 5 implements it. Write docs only — do NOT add the submodule now.

Create docs/SUBMODULE-SEAM.md describing how democrito-site will consume the public product:
- The public democrito product repo is added as a git submodule at a pinned commit, e.g. at
  vendor/democrito (decide and document the path).
- The site imports components and tokens from that submodule path (show the vite alias /
  tsconfig path mapping that will point @/registry or @democrito at the submodule).
- Workflows:
    add:    git submodule add https://github.com/mmorerasanchez/democrito vendor/democrito
    update: git submodule update --remote, then commit the new pinned SHA (explain why pinning
            is intentional — reproducible site builds, explicit upgrades)
    init on clone: git clone --recurse-submodules / git submodule update --init
- Note this replaces the Phase-1 provisional in-place copy of components/tokens in the site repo:
  in Phase 5 those provisional copies are removed and imports repoint to the submodule.

Commit: docs(seam): specify git-submodule sync between site and product
Branch this in democrito-site (e.g. docs/submodule-seam), push, and open a PR for review.
Do NOT push to main directly.
```

---

## Notes
- Prompts 1–4 commit to the `phase-2-product-seam` branch of the **public** repo (Prompt 5 is a throwaway consumer test that commits nothing). The branch is **not pushed** until you've reviewed locally; then push it and open ONE PR covering Prompts 1–4. Keeps `main` pristine for Phase 3/4.
- Prompt 6 is **site-side** documentation — its own branch + PR in `democrito-site`.
- The exit gate is Prompt 5. Don't proceed to Phase 3 (deletion) until every tier passes it.

## End-of-Phase-2 verification checklist
- [ ] `main` untouched in both repos
- [ ] `phase-2-product-seam` has 4 commits (Prompts 1–4)
- [ ] `registry/molecules/` has 18 files (ThemeToggle relocated — flagged)
- [ ] `registry/hooks/` has exactly 3 files (use-theme, use-toast, use-mobile — NOT use-typing-animation)
- [ ] `registry.json` + `public/r/democrito.json` both have **110** items, identical sets
- [ ] AppShell's registry item lists `react-router-dom` in `dependencies`
- [ ] Logo renders with a default (no broken `<img>`) when no props passed
- [ ] Consumer proof: all 5 tiers PASS, no `@/components/app`/`src/` leakage
- [ ] `npm run build && npm test` green on the branch
- [ ] `democrito-site` `docs/SUBMODULE-SEAM.md` on its own branch + PR
