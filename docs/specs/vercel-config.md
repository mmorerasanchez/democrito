# Vercel Configuration — Prompt-Spec

> **Meta**
> - Project: democrito
> - Target IDE: Claude Code
> - Stage: Execution
> - Complexity: Standard
> - Version: 1.0
> - Status: Ready
> - Source SDD: N/A — infrastructure task
> - Prompt chain: standalone
> - Created: 2026-04-17

## Role

Act as a senior frontend developer configuring a Vite SPA for production
deployment on Vercel. You understand SPA routing fallbacks, security headers,
and static asset caching strategies.

## Context

democrito is a React + Vite SPA deployed to Vercel. Without a `vercel.json`
config, direct URL access to any route other than `/` returns a 404 because
Vercel tries to resolve the path as a static file. The config must handle
SPA fallback routing and add production security headers.

## Codebase Orientation

- Build tool: @vite.config.ts
- Output: `dist/` directory after `npm run build`
- Routes: client-side via React Router — `/`, `/tokens`, `/atoms`, `/molecules`, `/organisms`, `/templates`, `/pages`
- Existing config: no `vercel.json` exists yet

## Task

Create `vercel.json` in the `app-democrito/` root with SPA fallback rewrites
and security headers.

## Steps

1. Create `app-democrito/vercel.json`
2. Add SPA fallback rewrite rule
3. Add security headers
4. Add cache headers for static assets (JS, CSS, images, fonts)
5. Verify build still succeeds with the new config

## Instructions

1. SPA fallback: rewrite all non-file requests to `/index.html`
   ```json
   "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
   ```
2. Security headers on all routes:
   - `X-Content-Type-Options: nosniff`
   - `X-Frame-Options: DENY`
   - `Referrer-Policy: strict-origin-when-cross-origin`
   - `Permissions-Policy: camera=(), microphone=()`
3. Cache headers for `/_assets/**` (Vite's hashed output):
   - `Cache-Control: public, max-age=31536000, immutable`
4. No custom build command or output override — Vercel auto-detects Vite

## Constraints

- DO NOT add environment variable configuration — there are none for this project
- DO NOT add redirects for the old lovable.app domain — that's a separate task
- DO NOT add serverless functions or API routes — this is a static SPA
- If any requirement is unclear, ask before writing code

## Notion Status Sync

- Change request: https://www.notion.so/344887eb6e4e819f919dfaf3e118e45c
- Set Status → **In progress** before starting work
- Set Status → **Review** after creating the PR
