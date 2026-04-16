# Deploying democrito to Vercel

**Status:** Ready to execute  
**Domain:** democrito.design  
**Current Stack:** Vite 5 + React 18 SPA  
**Future Stack:** Astro 5 + React Islands (after migration — same Vercel setup applies)  
**Last Updated:** 2026-04-16

---

## What This Guide Covers

This is a step-by-step, first-timer-friendly guide to:

1. Creating a Vercel account and connecting it to GitHub
2. Deploying the democrito repository
3. Connecting the democrito.design custom domain
4. Setting up environment variables
5. Configuring preview deployments for pull requests
6. Setting up the 301 redirect from the old Lovable URL
7. Post-deploy verification checklist

No prior Vercel experience needed. Screenshots descriptions are included where the UI isn't self-explanatory.

---

## Prerequisites

Before starting, make sure you have:

- A **GitHub account** with access to the `mmorerasanchez/democrito` repository
- The **democrito.design** domain registered (or ready to register — Namecheap, Porkbun, Cloudflare, and Google Domains all work)
- Access to your domain registrar's DNS settings
- About **30 minutes** of uninterrupted time

---

## Step 1: Create Your Vercel Account

1. Go to [vercel.com](https://vercel.com) and click **Sign Up**
2. Choose **Continue with GitHub** — this is the easiest path since your repo is on GitHub
3. Authorize the Vercel GitHub App when prompted
4. You'll land on the Vercel dashboard — an empty project list

**What just happened:** Vercel created an account linked to your GitHub identity. This means it can read your repositories and set up automatic deployments.

---

## Step 2: Import the democrito Repository

1. From the Vercel dashboard, click **Add New… → Project**
2. You'll see a list of your GitHub repositories. Find **democrito** (or search for it)
3. Click **Import** next to the democrito repository

### Configure the Project

Vercel auto-detects Vite projects, but verify these settings:

| Setting | Value |
|---------|-------|
| **Framework Preset** | Vite |
| **Root Directory** | `app-democrito` |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |
| **Install Command** | `npm install` |
| **Node.js Version** | 18.x (or 20.x) |

**Important — Root Directory:** The democrito repo has its app code inside `app-democrito/`, not at the root. You must set the Root Directory to `app-democrito` or the build will fail because Vercel won't find package.json.

To set the Root Directory:

1. In the project configuration screen, look for **Root Directory**
2. Click **Edit** (pencil icon)
3. Type `app-democrito`
4. Confirm

### Add Environment Variables (Before First Deploy)

Scroll down to the **Environment Variables** section. Add these:

| Key | Value | Environment |
|-----|-------|-------------|
| `VITE_SITE_URL` | `https://democrito.design` | Production |
| `VITE_SITE_URL` | `https://democrito-preview.vercel.app` | Preview |

You can add more later (analytics IDs, API keys for the /app section), but these are sufficient for the first deploy.

### Deploy

Click **Deploy**. Vercel will:

1. Clone the repository
2. Run `npm install` inside `app-democrito/`
3. Run `npm run build` (which runs `vite build`)
4. Upload the `dist/` folder to Vercel's CDN

**First deploy typically takes 1–2 minutes.** You'll see a real-time build log. If it succeeds, you'll see a "Congratulations!" screen with a preview URL like `democrito-xxxx.vercel.app`.

**If the build fails:** The most common causes are:

- Root Directory not set to `app-democrito` → fix in Project Settings → General → Root Directory
- TypeScript errors → check the build log for specific errors, fix in the repo, push again
- Missing dependencies → run `npm install` locally first to make sure package-lock.json is up to date, then push

---

## Step 3: Connect Your Custom Domain

### 3a: Add the Domain in Vercel

1. From your project dashboard, go to **Settings → Domains**
2. Type `democrito.design` in the input field and click **Add**
3. Vercel will ask how you want to configure it. Choose:
   - **democrito.design** (apex/root domain) → recommended as primary
   - Vercel will also suggest adding **www.democrito.design** with a redirect to the apex — accept this

### 3b: Configure DNS at Your Registrar

Vercel will show you the DNS records you need to add. Go to your domain registrar's DNS settings panel and add them.

**Option A — If your registrar supports CNAME flattening (Cloudflare, Porkbun):**

| Type | Name | Value | TTL |
|------|------|-------|-----|
| CNAME | `@` | `cname.vercel-dns.com` | Auto |
| CNAME | `www` | `cname.vercel-dns.com` | Auto |

**Option B — Standard registrar (Namecheap, GoDaddy, Google Domains):**

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | `@` | `76.76.21.21` | 300 (5 min) |
| AAAA | `@` | `2606:4700:20::681a:1521` | 300 |
| CNAME | `www` | `cname.vercel-dns.com` | 300 |

**Note:** The exact IP addresses Vercel shows you in their UI are the ones to use — the ones above are Vercel's standard IPs as of April 2026, but always copy from the Vercel dashboard to be sure.

**How to add DNS records (general process):**

1. Log in to your domain registrar
2. Find the DNS management or "DNS Records" section for democrito.design
3. Delete any existing A records pointing to old hosting (if any)
4. Add the records from the table above
5. Save changes

**DNS propagation takes 5–30 minutes** (sometimes up to 48 hours, but usually much faster). Vercel will show a "pending verification" status until it detects the records.

### 3c: SSL Certificate

Vercel automatically provisions a free SSL certificate (Let's Encrypt) once DNS is verified. No action needed — HTTPS just works.

### 3d: Verify It Works

Once DNS propagates:

1. Visit `https://democrito.design` — you should see the showcase
2. Visit `https://www.democrito.design` — should redirect to the apex domain
3. Check the padlock icon in the browser — SSL should be active

---

## Step 4: Configure Automatic Deployments

Vercel's GitHub integration means deployments happen automatically. Here's how it works out of the box:

| Event | What Happens |
|-------|--------------|
| Push to `main` | Triggers a **Production deployment** → goes live on democrito.design |
| Open a Pull Request | Triggers a **Preview deployment** → unique URL per PR |
| Push to any branch | Triggers a **Preview deployment** |

### Recommended Settings

Go to **Settings → Git** in your Vercel project:

1. **Production Branch:** `main` (should already be set)
2. **Ignored Build Step:** Leave empty for now (useful later if you have a monorepo)

Go to **Settings → General**:

1. **Build & Development Settings:** Verify the settings from Step 2 are correct
2. **Framework Preset:** Vite

### Preview Deployments

Every time you (or Lovable, or Claude Code) open a pull request, Vercel creates a unique preview URL. This is extremely useful for:

- Checking visual changes before merging
- Testing theme behavior on a deployed environment
- Sharing work-in-progress with others

Preview URLs look like: `democrito-git-branch-name-mariano.vercel.app`

---

## Step 5: Set Up 301 Redirect from Lovable

The old URL `democrito-design-system.lovable.app` should redirect to `democrito.design` so any existing links or bookmarks still work.

### Option A: Vercel Redirects (Recommended)

Create a `vercel.json` file in the `app-democrito/` directory:

```json
{
  "redirects": [
    {
      "source": "/(.*)",
      "has": [
        {
          "type": "host",
          "value": "democrito-design-system.lovable.app"
        }
      ],
      "destination": "https://democrito.design/$1",
      "permanent": true
    }
  ]
}
```

**Note:** This only works if you also point the Lovable subdomain to Vercel, which may not be possible. See Option B.

### Option B: Lovable Redirect (More Likely)

Since Lovable controls the `*.lovable.app` subdomain:

1. Check Lovable's project settings for a "Custom Domain" or "Redirect" option
2. If available, set it to redirect to `https://democrito.design`
3. If not available, add a meta refresh tag to the Lovable project's `index.html` as a fallback:

```html
<meta http-equiv="refresh" content="0;url=https://democrito.design" />
```

### Option C: DNS Redirect (If You Control the Lovable Subdomain)

This is unlikely since Lovable controls their subdomains, but if you have a way to add a CNAME for it, you could point it at Vercel and handle the redirect with `vercel.json`.

**Practical recommendation:** Option B is most realistic. Check Lovable's settings first.

---

## Step 6: Configure vercel.json (Full Configuration)

Even if you don't need redirects from Lovable, a `vercel.json` file is useful for headers, routing, and future configuration.

Create `app-democrito/vercel.json`:

```json
{
  "framework": "vite",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        }
      ]
    },
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ],
  "rewrites": [
    {
      "source": "/((?!assets/).*)",
      "destination": "/index.html"
    }
  ]
}
```

**What each section does:**

- **headers** → Security headers (recommended by the SEO/GEO plan, CR-6) and caching for static assets
- **rewrites** → SPA fallback: any URL that isn't a static asset gets sent to `index.html`, which lets React Router handle client-side routing. Without this, refreshing any page other than `/` would show a 404.

**Commit and push** this file. Vercel will redeploy automatically.

---

## Step 7: Post-Deploy Verification

Once democrito.design is live, run through this checklist:

### Functionality

- [ ] Homepage (`/`) loads and displays the overview page
- [ ] Token page (`/tokens`) loads with all color swatches
- [ ] Atoms page (`/atoms`) shows all 7 atom components
- [ ] Molecules page (`/molecules`) shows all 18 molecule components
- [ ] Organisms page (`/organisms`) shows all 15 organism components
- [ ] Templates page (`/templates`) shows all 7 template components
- [ ] Pages page (`/pages`) loads without errors
- [ ] Theme switcher works: toggle between Dark, Light, and Warm
- [ ] Theme persists after page reload
- [ ] Direct URL navigation works (paste `democrito.design/tokens` in a new tab)
- [ ] Browser back/forward buttons work correctly

### Performance

- [ ] Run Lighthouse audit: target 90+ on all scores
  - Open Chrome DevTools → Lighthouse tab → Analyze page load
- [ ] Page loads in under 3 seconds on a standard connection
- [ ] No JavaScript console errors

### Domain & SSL

- [ ] `https://democrito.design` shows the site (not a Vercel default page)
- [ ] `https://www.democrito.design` redirects to `https://democrito.design`
- [ ] `http://democrito.design` redirects to HTTPS
- [ ] SSL certificate is valid (padlock icon in browser)
- [ ] No mixed content warnings (all resources load over HTTPS)

### Vercel Dashboard

- [ ] Build succeeded (green status in Vercel)
- [ ] Production deployment is assigned to democrito.design domain
- [ ] Environment variables are set for Production
- [ ] GitHub integration is active (check Settings → Git)

---

## Ongoing: How Vercel Works Day-to-Day

### Your Deployment Workflow

```
Make changes (Claude Code, Lovable, or manual edit)
  ↓
Push to a branch / Open a Pull Request
  ↓
Vercel creates a Preview Deployment (automatic)
  ↓
Review the preview URL
  ↓
Merge to main
  ↓
Vercel creates a Production Deployment → live on democrito.design
```

### Vercel Dashboard Orientation

Your Vercel project dashboard (`vercel.com/your-username/democrito`) shows:

- **Deployments tab** — List of all deployments with status (success/error), preview URLs, and timestamps
- **Analytics tab** — Web analytics if you enable Vercel Analytics (optional, free tier available)
- **Logs tab** — Real-time function logs (useful after Astro migration when you have SSR)
- **Settings tab** — Domain configuration, environment variables, build settings

### Useful Commands

```bash
# Install Vercel CLI (optional but useful)
npm i -g vercel

# Login to Vercel from terminal
vercel login

# Manual deploy from local machine (useful for testing)
cd app-democrito
vercel

# Deploy to production from terminal
vercel --prod

# Check deployment status
vercel ls
```

The CLI is optional — everything works through GitHub push → auto-deploy. But it's handy for quick tests or debugging build issues locally.

---

## When You Migrate to Astro

After completing the Astro migration (see ASTRO-MIGRATION-PLAN.md), the Vercel setup changes slightly:

| Setting | Current (Vite) | After Migration (Astro) |
|---------|----------------|-------------------------|
| Framework Preset | Vite | Astro |
| Build Command | `npm run build` | `npm run build` (same) |
| Output Directory | `dist` | `dist` (same) |
| Rendering | Static SPA (client-side) | Static pages + SSR islands |
| vercel.json rewrites | SPA fallback to index.html | Not needed (Astro handles routing) |

**What to update after Astro migration:**

1. Change the **Framework Preset** to **Astro** in Vercel Settings → General
2. Remove the `rewrites` section from `vercel.json` (Astro generates individual HTML files per route)
3. Add the `@astrojs/vercel` adapter to `astro.config.mjs`:

```js
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/static';  // or /serverless for SSR

export default defineConfig({
  integrations: [react(), tailwind()],
  output: 'static',       // 'hybrid' if you need SSR for /app/*
  adapter: vercel(),
  site: 'https://democrito.design',
});
```

4. Push the changes — Vercel auto-detects the framework change

---

## Troubleshooting

### Build fails with "Cannot find module"

- Make sure `Root Directory` is set to `app-democrito` in Vercel Settings
- Verify `package-lock.json` is committed to the repo (Vercel uses it for `npm ci`)

### 404 on page refresh

- The SPA fallback rewrite in `vercel.json` isn't working
- Check that the `rewrites` section is present and correctly formatted
- Verify `vercel.json` is in the `app-democrito/` directory (same level as `package.json`)

### Domain shows "DNS_PROBE_FINISHED_NXDOMAIN"

- DNS hasn't propagated yet — wait 15–30 minutes
- Double-check the DNS records at your registrar match what Vercel shows
- Use [dnschecker.org](https://dnschecker.org) to check propagation status

### SSL certificate not provisioning

- DNS must be correctly pointing to Vercel first
- Remove any CAA records at your registrar that might block Let's Encrypt
- Wait up to 1 hour — certificate provisioning can take time

### Lovable and Vercel deploying the same repo

- Lovable may still try to deploy when you push. This is fine — Lovable deploys to its own URL
- Once democrito.design is live on Vercel, the Lovable deployment becomes irrelevant
- You can disconnect the repo from Lovable later if you want to stop duplicate builds

### Environment variable not available in browser

- Vite environment variables must be prefixed with `VITE_` to be available in client-side code
- After adding or changing env vars in Vercel, you need to trigger a redeploy: go to Deployments → click the three dots on the latest deployment → Redeploy

---

## Cost

Vercel's **Hobby plan** (free) includes:

- Unlimited static deployments
- 100 GB bandwidth per month
- Custom domains with SSL
- Preview deployments for PRs
- Vercel Analytics (basic, free tier)
- Serverless Functions (limited, sufficient for Astro SSR)

This is more than enough for democrito.design. You'd only need a paid plan if you exceed 100 GB/month bandwidth or need team collaboration features.

---

## Quick Reference

| What | Where |
|------|-------|
| Vercel Dashboard | `vercel.com/your-username/democrito` |
| Production URL | `https://democrito.design` |
| Old Lovable URL | `https://democrito-design-system.lovable.app` |
| GitHub Repo | `https://github.com/mmorerasanchez/democrito` |
| Build Logs | Vercel Dashboard → Deployments → click any deployment |
| Domain Settings | Vercel Dashboard → Settings → Domains |
| Env Variables | Vercel Dashboard → Settings → Environment Variables |
| vercel.json | `app-democrito/vercel.json` |

---

**Related documents:**

- [SEO-GEO-PLAN.md](../SEO-GEO-PLAN.md) — Full SEO/GEO strategy (deployment architecture section)
- [ASTRO-MIGRATION-PLAN.md](./ASTRO-MIGRATION-PLAN.md) — Astro migration (Prompt 11 covers deployment)
- [docs/getting-started.md](./docs/getting-started.md) — Developer-facing getting started guide
