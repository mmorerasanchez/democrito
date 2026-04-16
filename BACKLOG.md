# democrito — Production Backlog

> **Generated:** 2026-04-16 (Cowork session)
> **Updated:** 2026-04-17 (manual commit of Cowork files)
> **Source of truth:** changes @democrito in Notion
> **Execution tool:** Claude Code (unless noted otherwise)

---

## Priority 1 — Quick Wins (do first)

Remaining quick wins after the manual commit. No blockers.

| # | Task | Owner | Notion ID |
|---|------|-------|-----------|
| 1 | **Replace getting-started.md with v2** — swap docs/getting-started.md with the dual-audience v2 version, delete v2 file | Claude Code | [Link](https://www.notion.so/344887eb6e4e81ae808ec9218cec3d11) |
| 2 | **P1.5 — Delete bun.lockb and gitignore it** — removes package manager ambiguity | Claude Code | [Link](https://www.notion.so/341887eb6e4e81c4b8cfde26aa44983d) |
| 3 | **Update all URLs from lovable.app → democrito.design** — grep and replace across all docs (do after Vercel deploy) | Claude Code | [Link](https://www.notion.so/344887eb6e4e8145a72de7abc279980d) |

---

## Priority 2 — Production Infrastructure

These set up the production deployment pipeline. Tasks 4-5 are prerequisites
for the Astro migration and public launch.

| # | Task | Owner | Notion ID |
|---|------|-------|-----------|
| 4 | **Create vercel.json** — SPA fallback rewrite + security headers + cache config | Claude Code | [Link](https://www.notion.so/344887eb6e4e819f919dfaf3e118e45c) |
| 5 | **Domain + DNS setup for democrito.design** — A record + CNAME, verify HTTPS | Terminal (manual) | [Link](https://www.notion.so/344887eb6e4e813d8cf5cc85fd7cdb09) |
| 6 | **Structured data + metadata infrastructure** — OG tags, Twitter Card, JSON-LD, favicon | Claude Code | [Link](https://www.notion.so/344887eb6e4e8131acabe2258dc0ca40) |
| 7 | **AI bot strategy files** — robots.txt, llms.txt, llms-full.txt in public/ | Claude Code | [Link](https://www.notion.so/344887eb6e4e81fa88daedea95b0e473) |

---

## Priority 3 — New Features

| # | Task | Owner | Notion ID |
|---|------|-------|-----------|
| 8 | **/ai page — spec and implementation** — dedicated page for AI agent integration story | Claude Code | [Link](https://www.notion.so/344887eb6e4e815494d1ec5a329619d8) |
| 9 | **Submit democrito to awesome-design-md** — use getdesign.md/request (primary) or GitHub issue (backup) | Cowork | [Link](https://www.notion.so/344887eb6e4e81edb0b9d863f3064da8) |

---

## Priority 4 — Astro Migration (blocked by P2)

| # | Task | Owner | Blocked by | Notion ID |
|---|------|-------|------------|-----------|
| 10 | **Astro 5 migration — Phase 1 foundation** — prompts 1-4 from ASTRO-MIGRATION-PLAN.md | Claude Code | #4, #5 | [Link](https://www.notion.so/344887eb6e4e816d87e6f0b0e0ef693b) |

---

## Priority 5 — Public Distribution (Phase 3)

| # | Task | Owner | Notion ID |
|---|------|-------|-----------|
| 11 | **P3.1 — Plan public Claude Skill** — structure, triggers, knowledge files | Cowork | [Link](https://www.notion.so/341887eb6e4e81dea1daf375ea4f120f) |
| 12 | **P3.2 — Build public Claude Skill folder** — skill/ directory with SKILL.md + knowledge | Claude Code | [Link](https://www.notion.so/341887eb6e4e81c886bde220dfbfaff2) |
| 13 | **P3.3a — Author shadcn registry manifest** — registry.json at repo root | Claude Code | [Link](https://www.notion.so/341887eb6e4e81e0ae00f947e818275b) |
| 14 | **P3.3b — Verify shadcn registry install** — test in fresh project | Claude Code | [Link](https://www.notion.so/341887eb6e4e8136a9fcdeed94f86c81) |
| 15 | **P3.4 — Tag v3.1.0** — mark registry + skill release | Terminal | [Link](https://www.notion.so/341887eb6e4e817287fbc6c27cfe6637) |

---

## Priority 6 — Hardening (Phase 4)

| # | Task | Owner | Notion ID |
|---|------|-------|-----------|
| 16 | **P4.1 — Visual regression tests** — Playwright snapshots × 3 themes × all routes | Claude Code | [Link](https://www.notion.so/341887eb6e4e81d7adefdf4e6ac58af9) |

---

## Remaining Cowork Tasks

| # | Task | Owner | Status | Notion ID |
|---|------|-------|--------|-----------|
| 17 | **P2.3 — Mirror templates doc to Notion** — blocked on P1.1 which is now Done | Cowork | Ready-to-develop | [Link](https://www.notion.so/341887eb6e4e81599612f03053c81cfa) |

---

## Completed (for reference)

| Task | Owner | Status |
|------|-------|--------|
| Commit all new Cowork session files to repo | Terminal | Done (2026-04-17) |
| Commit DESIGN.md to repo root | Terminal | Done (2026-04-17) |
| Commit VERCEL-DEPLOYMENT.md to repo | Terminal | Done (2026-04-17) |
| P1.1 — Author docs/components/templates.md | Lovable | Done |
| P1.2 — Move principles to docs/principles.md | Lovable | Done |
| P1.3 — Slim CLAUDE.md tokens section | Lovable | Done |
| P1.4 — Fix live URL inconsistency in README | Lovable | Done |
| P1.6 — Generate GitHub social preview image | Lovable | Done |
| P1.7 — Tag v3.0.0 | Terminal | Done |
| P1.8 — Write token contract test | Lovable | Done |
| P2.1 — Mirror 8 repo docs into Notion | Cowork | Done |
| P2.2 — Mirror principles to Notion | Cowork | Done |
| P2.4 — Verify the four authored meta-docs | Cowork | Done |
| P2.5 — Finalize Cowork project instructions | Cowork | Done |
| Getting Started v2 — draft | Cowork | Done |
| SEO/GEO Implementation Plan — authored | Cowork | Done |
| Astro Migration Plan — authored | Cowork | Done |
| Vercel Deployment Guide — authored | Cowork | Done |
| DESIGN.md — authored | Cowork | Done |
| awesome-design-md submission — prepared | Cowork | Done |

---

## Suggested Claude Code Session Order

**Session 1 — Quick wins:**
Tasks 1-2 (replace getting-started, bun.lockb). Task 3 (URL updates) after Vercel deploy.

**Session 2 — Production infra:**
Tasks 4, 6, 7 (vercel.json, metadata, AI bot files)

**Session 3 — /ai page:**
Task 8 (design and implement the /ai route)

**Session 4 — Astro migration:**
Task 10 (after DNS is live — task 5 is manual)

**Session 5 — Distribution:**
Tasks 12-14 (Claude Skill build, shadcn registry)

**Session 6 — Hardening:**
Task 16 (Playwright visual regression)
