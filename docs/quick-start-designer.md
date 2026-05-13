# democrito quick start — Designer's Guide

> **Who this is for:** Designers who are new to code and want to use democrito's design tokens in a real project. You'll work with two tools: the **Terminal** (a text window where you type commands) and **Claude Code** (an AI assistant in the terminal that writes code for you). No programming experience required.

---

## Before you begin

You need three things installed on your computer before starting. If you're not sure whether you have them, open Terminal and run each check command — if it shows a version number, you're good.

### 1. Node.js (version 18 or higher)

Node.js is the engine that runs JavaScript on your computer. It's required for everything else.

**Check if you have it:**
```bash
node --version
```

If you see something like `v22.0.0`, you're good. If you get an error, download Node.js from [nodejs.org](https://nodejs.org) and install the LTS version.

### 2. npm (comes with Node.js)

npm is the package manager — it installs code libraries for you.

**Check if you have it:**
```bash
npm --version
```

Should show something like `10.x.x`. It installs automatically with Node.js.

### 3. Claude Code

Claude Code is an AI assistant that lives in the Terminal and writes code on your behalf. This guide uses it for all the code-writing steps so you don't have to type code manually.

**Check if you have it:**
```bash
claude --version
```

If not installed, follow the setup guide at [claude.ai/code](https://claude.ai/code).

---

## How to open Terminal

- On Mac: press `Cmd + Space`, type "Terminal", press Enter
- On Windows: press `Win + R`, type "cmd", press Enter

You'll see a window with a blinking cursor. This is where you'll type all the commands in this guide.

> **Tip:** Commands that start with `$` are things you type in Terminal. Don't include the `$` itself — it just means "this is a command".

---

## Part 1 — Create a new project

This creates a fresh web project pre-configured with React and TypeScript (the technology democrito is built with).

```bash
npm create vite@latest my-app -- --template react-ts
```

**What this does:** Creates a folder called `my-app` with a starter web project. You'll be asked to confirm a few things — just press Enter to accept the defaults.

When it finishes, move into the project folder:

```bash
cd my-app
```

Then install the project's default packages:

```bash
npm install
```

> **Important:** Vite (the build tool) will offer to start a preview server automatically. If it does, press `q` then Enter to stop it — you'll start it manually later.

---

## Part 2 — Add Tailwind CSS

Tailwind CSS is the styling system democrito is built on. The default Vite project doesn't include it, so you need to add it.

```bash
npm install tailwindcss @tailwindcss/vite @types/node
```

**What this does:** Installs Tailwind CSS version 4 and a connector that makes it work with Vite.

Now you need to tell Vite to use Tailwind. This is where Claude Code helps — instead of editing the file manually, give Claude Code this instruction:

**Open Claude Code:**
```bash
claude
```

Then paste this prompt:

```
Update vite.config.ts to add Tailwind CSS. The file should import tailwindcss from '@tailwindcss/vite' and path from 'path', then add tailwindcss() to the plugins array, and add a resolve.alias so that '@' maps to './src'. Show me the complete file when done.
```

Claude Code will rewrite `vite.config.ts` for you. Once it's done, type `/exit` or press `Ctrl+C` to close Claude Code (you'll reopen it when needed).

---

## Part 3 — Fix path aliases

Path aliases let components find each other using `@/` shortcuts instead of long file paths. The project needs one configuration file updated.

Open Claude Code again:
```bash
claude
```

Paste this prompt:

```
Update tsconfig.json (the root one, not tsconfig.app.json) to add compilerOptions with baseUrl "." and paths mapping "@/*" to ["./src/*"]. Keep the existing files and references arrays. Show me the complete updated file.
```

After Claude Code updates it, exit with `/exit`.

---

## Part 4 — Initialize shadcn

shadcn is the component library that democrito builds on. This step connects it to your project.

```bash
npx shadcn@latest init
```

You'll be asked a few questions. Answer them like this:
- **Which style would you like to use?** → press Enter (accept default)
- **Which color would you like to use as the base color?** → press Enter
- **Would you like to use CSS variables for theming?** → `yes`
- **Are you using React Server Components?** → `no`

---

## Part 5 — Install democrito tokens

This is the main event. One command installs democrito's entire design token system — 70+ color variables, the three-font system, the three-theme definitions, and all spacing tokens — directly into your project.

```bash
npx shadcn@latest add https://democrito.design/r/democrito.json
```

**What this does:**
- Adds CSS custom properties (the design tokens) to your `src/index.css`
- Sets up the warm theme as default, with dark and light themes ready to activate
- Creates `src/lib/utils.ts` with a helper function for combining styles
- Imports the three democrito fonts from Google Fonts

When it asks about overwriting existing files, type `y` and press Enter.

---

## Part 6 — Build the quick start card

Now you'll build a small test page to confirm everything is working. This shows the warm background, the card surface, the three-font system, and the terracotta accent color all at once.

Open Claude Code:
```bash
claude
```

Paste this prompt:

```
Replace the entire contents of src/App.tsx with this:

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

function App() {
  const [theme, setTheme] = useState<'warm' | 'dark' | 'light'>('warm')

  const applyTheme = (t: 'warm' | 'dark' | 'light') => {
    document.documentElement.classList.remove('dark', 'light')
    if (t === 'dark') document.documentElement.classList.add('dark')
    if (t === 'light') document.documentElement.classList.add('light')
    setTheme(t)
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8">
      <Card className="w-80">
        <CardHeader>
          <CardTitle className="font-display">democrito quick start</CardTitle>
          <CardDescription className="font-body">
            Tokens, surface hierarchy, and typography confirmed.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="font-mono text-sm text-accent">--card → bg-card ✓</p>
          <p className="font-mono text-sm text-muted-foreground">--surface → bg-surface ✓</p>
          <div className="flex gap-2 pt-2">
            <button onClick={() => applyTheme('warm')} className={`px-3 py-1 rounded text-xs font-mono border ${theme === 'warm' ? 'bg-accent text-accent-foreground' : 'bg-muted text-foreground'}`}>warm</button>
            <button onClick={() => applyTheme('dark')} className={`px-3 py-1 rounded text-xs font-mono border ${theme === 'dark' ? 'bg-accent text-accent-foreground' : 'bg-muted text-foreground'}`}>dark</button>
            <button onClick={() => applyTheme('light')} className={`px-3 py-1 rounded text-xs font-mono border ${theme === 'light' ? 'bg-accent text-accent-foreground' : 'bg-muted text-foreground'}`}>light</button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default App

Also install the card component by running: npx shadcn@latest add card
```

Exit Claude Code after it's done, then start the preview server:

```bash
npm run dev
```

Open your browser and go to **http://localhost:5173**

**What you should see:**
- A warm stone-tan background (not white — it has warmth to it)
- A slightly lighter card in the center
- "democrito quick start" as the card title (in Plus Jakarta Sans)
- A description in Satoshi body font
- Two monospace token labels in terracotta and gray
- Three buttons: **warm**, **dark**, **light**

If the background looks white, do a hard reload: `Cmd + Shift + R` on Mac.

---

## Part 7 — Test theme switching

Click the **dark** button — the background should go near-black with the card turning dark gray and the terracotta accent staying visible.

Click **light** — a cool, very light background replaces the warm stone.

Click **warm** — returns to the default earth-tone.

This confirms democrito's three-theme system is working. All three are built into your CSS already; you switch them by adding a class to the `<html>` element, which the buttons do automatically.

---

## Part 8 — Customize tokens

democrito is designed to be remapped to any brand. Here's how to override the three most common tokens.

### Swap the accent color

The terracotta accent (`--accent`) is democrito's default. To replace it with your brand color, open Claude Code and paste:

```
In my-app/src/index.css, after the closing } of the @layer base block at the end of the file, add:

@layer base {
  :root, .warm {
    --accent: 217 91% 60%;
    --accent-foreground: 0 0% 100%;
    --ring: 217 91% 60%;
  }
}

Save the file.
```

The token labels and active button should instantly switch from terracotta to blue in the browser.

> **How colors work:** democrito uses HSL format — three numbers for Hue, Saturation, Lightness. To use your brand color, convert it to HSL at [hslpicker.com](https://hslpicker.com) and replace the three numbers.

To revert, ask Claude Code to remove the block you added.

### Change the corner radius

To make everything sharper or rounder, override `--radius`:

```
In my-app/src/index.css, after the closing } of the @layer base block, add:

@layer base {
  :root, .warm {
    --radius: 0rem;
  }
}

Save the file.
```

`0rem` = perfectly square corners. `0.75rem` = democrito's default. `1.5rem` = very rounded. Check a div with `rounded-lg` to see the effect (note: the card component uses `rounded-xl` which isn't wired to this token yet — this is a known limitation in v3.x).

### Change the background and surface colors

To replace the warm stone with any palette:

```
In my-app/src/index.css, after the closing } of the @layer base block, add:

@layer base {
  :root, .warm {
    --background: 220 60% 12%;
    --foreground: 220 20% 95%;
    --card: 220 50% 18%;
    --card-foreground: 220 20% 95%;
  }
}

Save the file.
```

This remaps to a deep navy palette. Adjust the HSL values for any color.

> **What you can't override this way — fonts.** democrito's font tokens (`--font-display`, `--font-body`, `--font-mono`) are baked into Tailwind's build and can't be overridden via `@layer base`. To swap fonts, open `src/index.css` and find the `@theme` block at the top — edit the `--font-display`, `--font-body`, or `--font-mono` values there directly, then add your font's `@import` URL above it.

---

## What you've just learned

| Concept | What it means for designers |
|---|---|
| **CSS custom properties** | Variables like `--accent` that hold color values. Change one, everything updates. |
| **Design tokens** | The named variables democrito gives you — `--background`, `--card`, `--accent`, `--radius`, etc. |
| **3-surface hierarchy** | Background → Surface → Card. Depth without shadows or heavy borders. |
| **3-font system** | Display (headings) / Body (copy) / Mono (data and user-editable content) |
| **3-theme system** | Warm (default) / Dark / Light — switched by class on `<html>` |
| **`@layer base`** | Where you put overrides. These win over democrito's defaults for color/spacing tokens. |
| **`@theme`** | Where font and spacing utilities are compiled. Edit directly for font overrides. |

---

## Troubleshooting

**Browser shows white background, not warm stone**
→ Check that `src/index.css` doesn't have duplicate CSS blocks. If shadcn added extra content, ask Claude Code: *"In src/index.css, remove everything after line 244."*

**`@` path alias not found error during shadcn init**
→ The root `tsconfig.json` is missing path aliases. Run Part 3 again.

**`font-display` class not changing the font**
→ Font tokens can't be overridden via `:root`. Edit the `--font-display` value directly inside the `@theme { }` block in `src/index.css`.

**Terminal says "command not found: claude"**
→ Claude Code isn't installed. See [claude.ai/code](https://claude.ai/code).

---

## Next steps

| Resource | What it covers |
|---|---|
| [Token reference](./tokens.md) | Full list of all 70+ CSS custom properties |
| [Theming guide](./theming.md) | Brand customization with real palette examples |
| [Architecture](./architecture.md) | Atomic Design — how atoms combine into components |
| [Live demo](https://democrito.design/) | Browse all components with the theme switcher |
| [AI usage guide](./ai-usage.md) | How to use democrito with Claude Code, Cursor, Lovable |

---

*democrito quick start — Designer's Guide v1.0 | Part of the [democrito](https://democrito.design/) documentation*
