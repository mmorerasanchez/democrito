# Deploy-Spec — First Production Deploy (democrito.design)

> **Meta**
> - Product: democrito
> - Feature: First production deployment to Vercel + custom domain
> - Version: 1.0
> - SDD reference: N/A — infrastructure task
> - Prompt-Spec reference: docs/specs/vercel-config.md · v1.0
> - QA-Spec reference: N/A — manual verification
> - Stack: React 18 + Vite 5 + Tailwind 3.4 + Vercel
> - Deploy type: First production deploy
> - Created: 2026-04-17
> - Status: Draft
> - Deployed by: Mariano
> - Deploy date: TBD

## Summary

First production deployment of the democrito design system showcase to
`democrito.design` via Vercel, replacing the Lovable-hosted prototype at
`democrito-design-system.lovable.app`. This involves Vercel project setup,
DNS configuration, SPA routing, and security headers. No database, no
authentication, no server-side logic — static SPA only.

**Risk level:** Low (static site, no data layer, no auth)
**Requires downtime:** No (new domain, old site stays live)
**Requires migration:** No
**Reversible:** Yes — DNS revert to Lovable within minutes
**Estimated deploy duration:** 20 minutes (excluding DNS propagation)
**Estimated rollback duration:** 5 minutes (revert DNS records)

## Pre-Deploy Checklist

- [ ] `vercel.json` committed to `app-democrito/` with SPA fallback and security headers
- [ ] `npm run build` succeeds locally with zero errors
- [ ] `npm run lint` passes
- [ ] All three themes render correctly in local preview (dark, light, warm)
- [ ] Domain `democrito.design` registered and registrar accessible
- [ ] VERCEL-DEPLOYMENT.md reviewed for current accuracy

**Documentation to update before deploying:**
- [ ] README.md — update live demo URL after DNS is live
- [ ] CLAUDE.md — no changes needed (URLs updated in separate task)
- [ ] CHANGELOG.md — add deployment entry

## Environment Configuration

No new environment variables introduced by this feature.

Vercel requires no env vars for a static Vite SPA. If analytics are
added later (Plausible, etc.), those will be separate change requests.

## Infrastructure Changes

| Change | Type | Purpose | Failure mode | Fallback |
|--------|------|---------|-------------|---------|
| Vercel project | Hosting | Serve the built SPA | Site unavailable | Old Lovable site still accessible at lovable.app URL |
| Custom domain DNS | DNS | Point democrito.design to Vercel | DNS resolution failure | Lovable URL still works as fallback |
| SSL certificate | Security | HTTPS for custom domain | Auto-provisioned by Vercel — no manual action | Vercel handles retry |

No new npm dependencies introduced.

## First Deploy Preparation

**Domain and DNS:**
- [ ] Domain `democrito.design` registered
- [ ] A record: `@` → `76.76.21.21`
- [ ] CNAME record: `www` → `cname.vercel-dns.com`
- [ ] SSL certificate auto-provisioned by Vercel (verify in dashboard)
- [ ] Redirect: `www.democrito.design` → `democrito.design` (configured in Vercel)

**No database** — democrito is a static showcase with no data layer.

**No authentication** — public site, no user accounts.

**Environment:**
- [ ] Vercel project created and linked to GitHub repo
- [ ] Root Directory set to `app-democrito` in Vercel project settings
- [ ] Framework Preset: Vite
- [ ] Build Command: `npm run build`
- [ ] Output Directory: `dist`

**[DECISION REQUIRED — confirm before first deploy:]**
- [ ] Analytics provider selected (Plausible recommended per SEO-GEO plan) — can be added post-launch
- [ ] Social preview image uploaded to GitHub repo settings

## Deployment Steps

**Phase 1 — Pre-deployment (Claude Code)**
1. [ ] Create `app-democrito/vercel.json` with SPA fallback + security headers
2. [ ] Verify `npm run build` succeeds
3. [ ] Commit and push to main
   *Estimated duration: 10 minutes*

**Phase 2 — Vercel setup (manual, Vercel dashboard)**
4. [ ] Import repo in Vercel: "Add New Project" → select `mmorerasanchez/democrito`
5. [ ] Set Root Directory to `app-democrito`
6. [ ] Set Framework to Vite, Build Command to `npm run build`, Output to `dist`
7. [ ] Click Deploy — wait for build to succeed
8. [ ] Verify the `.vercel.app` preview URL loads correctly
   *Estimated duration: 5 minutes*

**Phase 3 — DNS (manual, domain registrar)**
9. [ ] Add A record: `@` → `76.76.21.21`
10. [ ] Add CNAME record: `www` → `cname.vercel-dns.com`
11. [ ] In Vercel: Domains → Add `democrito.design` + `www.democrito.design`
12. [ ] Wait for DNS propagation (check via `dig democrito.design`)
13. [ ] Verify SSL certificate is issued (Vercel dashboard → Domains → green lock)
    *Estimated duration: 5 minutes active + up to 48h propagation*

**Phase 4 — Post-deployment verification**
14. [ ] Load `https://democrito.design` — verify homepage renders
15. [ ] Test SPA routing: navigate to `/tokens`, `/atoms`, `/molecules` directly via URL bar
16. [ ] Test all three themes (dark, light, warm) via theme switcher
17. [ ] Verify security headers: `curl -I https://democrito.design` — check X-Content-Type-Options, X-Frame-Options
18. [ ] Verify `www.democrito.design` redirects to `democrito.design`
19. [ ] Check mobile rendering (375px viewport)
    *Estimated duration: 10 minutes*

**Total estimated duration: 30 minutes active + DNS propagation wait**

## Rollback Plan

**Estimated rollback time:** 5 minutes

**Trigger conditions** — initiate rollback if any of these occur:
- Site returns 404 or blank page on `democrito.design`
- SPA routing broken (direct URL access returns 404)
- SSL certificate not issued after 24 hours
- Build fails on Vercel after push to main

**Rollback steps:**
1. [ ] In domain registrar: remove the A and CNAME records pointing to Vercel
2. [ ] The old Lovable-hosted site at `democrito-design-system.lovable.app` remains live — no action needed
3. [ ] In Vercel: remove custom domain from project settings
4. [ ] Investigate and fix the issue before re-attempting

**Data rollback risk:** None — static site with no data layer.

## Security Checklist

### Authentication
- [x] N/A — public static site, no authentication required
- [x] No authenticated routes or API endpoints

### Authorisation
- [x] N/A — no user data, no access control

### Data exposure
- [x] No API responses — static HTML/CSS/JS only
- [x] No sensitive data in the build output
- [x] No environment variables exposed to the client

### Input validation
- [x] No user inputs — showcase site only (no forms that submit data)

### Secrets and configuration
- [x] No secrets required — static site
- [x] No API keys in the codebase
- [x] Verified: no `.env` files committed to repo

### HTTP Security Headers (via vercel.json)
- [ ] `X-Content-Type-Options: nosniff`
- [ ] `X-Frame-Options: DENY`
- [ ] `Referrer-Policy: strict-origin-when-cross-origin`
- [ ] `Permissions-Policy: camera=(), microphone=()`

### Dependencies
- [ ] No new runtime dependencies introduced by this deploy
- [ ] All existing dependencies reviewed via `npm audit`

## Monitoring and Alerts

No formal monitoring infrastructure for v1.0 launch. Post-launch monitoring
to be added as part of the SEO-GEO plan (analytics, uptime).

**Manual monitoring for first 48 hours:**
- Check `democrito.design` loads correctly daily
- Verify Vercel build succeeds on each push to main
- Monitor GitHub Actions (if CI is configured)

**Success baseline:**
| Metric | Target | First check |
|--------|--------|-------------|
| Site loads at democrito.design | Yes | Immediately after DNS propagation |
| All routes accessible via direct URL | Yes | Post-deploy verification (step 15) |
| Lighthouse performance score | > 90 | Within 1 week of launch |
| SSL certificate valid | Yes | Post-deploy verification (step 13) |

## Maintenance Notes

**Scheduled jobs:** None — static site.

**Known limitations:**
- DNS propagation can take up to 48 hours. During this window, `democrito.design`
  may not resolve for all users. The Lovable URL remains accessible as fallback.
- Vercel free tier has bandwidth limits (100GB/month). Unlikely to be hit for a
  design system showcase, but monitor if traffic spikes after launch announcements.

**Deprecation and cleanup:**
- [ ] After `democrito.design` is confirmed stable for 1 week, run the URL migration
      task (docs/specs/url-migration.md) to replace all `lovable.app` references.
- [ ] After Astro migration (task 10), the current Vite build config will be replaced.
      Keep vercel.json minimal to ease the transition.
