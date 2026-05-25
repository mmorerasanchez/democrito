import { PageMeta } from "@/components/PageMeta";
import { Badge } from "@/components/ui/badge";
import { Heading, Code } from "@/components/atoms";
import { Section, Note, P, StepCode } from "./_shared";

export default function GithubPage() {
  return (
    <div className="space-y-10">
      <PageMeta
        title="Use democrito with Terminal & IDEs"
        description="Repository-native workflow — CLAUDE.md is auto-read by Claude Code and Cursor, giving every agent session full design system context without any manual setup."
        path="/ai/github"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "TechArticle",
          "name": "Use democrito with Terminal & IDEs",
          "description": "Repository-native workflow — CLAUDE.md is auto-read by Claude Code and Cursor, giving every agent session full design system context without any manual setup.",
          "url": "https://democrito.design/ai/github",
          "isPartOf": { "@type": "SoftwareApplication", "name": "democrito" },
        }}
      />

      <div className="space-y-3">
        <Badge variant="outline" className="font-mono text-xs">Terminal &amp; IDEs</Badge>
        <Heading level="h1">Use democrito with Terminal &amp; IDEs</Heading>
        <P>
          Clone the repo and every agent session starts with full design system context
          already loaded. <Code>CLAUDE.md</Code> is auto-read by Claude Code and Cursor
          — no manual setup, no context pasting.
        </P>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Section 2 — The instruction file ecosystem                          */}
      {/* ------------------------------------------------------------------ */}
      <Section label="The instruction file ecosystem">
        <P>
          The AI tooling landscape has consolidated around a small set of instruction
          file formats. A repository built for AI-native development should ship the
          right file for each tool — or at minimum document which ones to add.
        </P>
        <div className="rounded-md border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-surface">
                <th className="px-4 py-2 text-left font-mono text-xs text-muted-foreground uppercase tracking-widest">File</th>
                <th className="px-4 py-2 text-left font-mono text-xs text-muted-foreground uppercase tracking-widest">Tool(s)</th>
                <th className="px-4 py-2 text-left font-mono text-xs text-muted-foreground uppercase tracking-widest">Location</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-border">
                <td className="px-4 py-2"><Code>CLAUDE.md</Code></td>
                <td className="px-4 py-2 font-body text-sm text-foreground">Claude Code (primary)</td>
                <td className="px-4 py-2 font-body text-sm text-muted-foreground">Project root, ~/.claude/, any subdirectory</td>
              </tr>
              <tr className="border-t border-border">
                <td className="px-4 py-2"><Code>AGENTS.md</Code></td>
                <td className="px-4 py-2 font-body text-sm text-foreground">Codex CLI, Cursor, Gemini CLI, Windsurf, Aider, goose, Devin, Jules, Junie, and 20+ more</td>
                <td className="px-4 py-2 font-body text-sm text-muted-foreground">Project root + subdirectories (nearest wins)</td>
              </tr>
              <tr className="border-t border-border">
                <td className="px-4 py-2"><Code>DESIGN.md</Code></td>
                <td className="px-4 py-2 font-body text-sm text-foreground">Google Stitch (native), any DESIGN.md-compatible tool</td>
                <td className="px-4 py-2 font-body text-sm text-muted-foreground">Project root</td>
              </tr>
              <tr className="border-t border-border">
                <td className="px-4 py-2"><Code>docs/design-system.md</Code></td>
                <td className="px-4 py-2 font-body text-sm text-foreground">Any agent — full component inventory and usage rules</td>
                <td className="px-4 py-2 font-body text-sm text-muted-foreground">docs/ directory</td>
              </tr>
            </tbody>
          </table>
        </div>
        <P>
          <Code>AGENTS.md</Code> is the closest thing to a universal standard —
          originated by OpenAI Codex and now stewarded by the Linux Foundation's
          Agentic AI Foundation alongside Anthropic's MCP. It's in 60,000+
          open-source repositories and natively supported by every tool listed above.
        </P>
        <P>
          Claude Code reads <Code>CLAUDE.md</Code> as its primary file and falls back
          to <Code>AGENTS.md</Code> if no <Code>CLAUDE.md</Code> exists in the
          directory. The practical approach: <Code>CLAUDE.md</Code> for
          Claude-specific additions, <Code>AGENTS.md</Code> as the single source of
          truth for the shared core rules every other tool needs.
        </P>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* Section 3 — AGENTS.md template                                      */}
      {/* ------------------------------------------------------------------ */}
      <Section label="AGENTS.md">
        <P>
          If you use tools beyond Claude Code, add <Code>AGENTS.md</Code> at the repo
          root. Copy the template below, add it to your fork, and every tool in the
          ecosystem above will pick up democrito's core rules automatically.
        </P>
        <StepCode language="markdown">{`# AGENTS.md — democrito
Design system reference: https://democrito.design

## Setup
- Install: \`cd app-democrito && npm install\`
- Dev server: \`npm run dev\` (localhost:5173)
- Lint + test: \`npm run lint && npm run test\`

## Architecture
Atomic Design — 5 levels:
- atoms: src/components/atoms/
- molecules: src/components/molecules/
- organisms: src/components/organisms/
- templates: src/components/templates/
- ui primitives: src/components/ui/ (shadcn — extend via CVA, never modify directly)
Before creating any component, check all 5 directories for existing implementations.

## Token rules
- Surfaces: bg-background → bg-surface → bg-card (never a 4th level)
- Fonts: font-display (headings/buttons), font-body (prose/labels),
  font-mono (ALL data values, inputs, identifiers, user-editable content)
- Colors: semantic tokens only — never bg-gray-*, text-white, dark: overrides,
  or hardcoded hex/rgb
- Every new token must be defined in all 3 themes: :root (warm), .dark, .light

## Conventions
- PascalCase filenames, one component per file
- Named exports only, barrel index.ts at each atomic level
- TypeScript strict mode, explicit props interface with JSDoc on every component
- Never commit directly to main — feature branches (feat/, fix/, chore/) + PR

## Verification
Run after every change: \`npm run lint && npm run test\``}</StepCode>
        <P>
          For local-only overrides you don't want committed — personal tool paths,
          experiment flags, machine-specific settings — use{" "}
          <Code>AGENTS.override.md</Code> in the same directory and add it to{" "}
          <Code>.gitignore</Code>:{" "}
          <Code>echo 'AGENTS.override.md' &gt;&gt; .gitignore</Code>
        </P>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* Section 4 — The three-file context bundle                           */}
      {/* ------------------------------------------------------------------ */}
      <Section label="The three-file context bundle">
        <div className="space-y-4">
          <div className="space-y-1">
            <p className="font-display text-sm font-semibold">
              <Code>src/index.css</Code>
            </p>
            <P>
              Tailwind v4 CSS-first config and design token source. The{" "}
              <Code>@theme</Code> block inside this file replaces{" "}
              <Code>tailwind.config.ts</Code> — it is both the build config and the
              single source of truth for every color, font, spacing, and radius value
              across all three themes.
            </P>
          </div>
          <div className="space-y-1">
            <p className="font-display text-sm font-semibold">
              <Code>design-tokens.json</Code>
            </p>
            <P>
              Machine-readable W3C DTCG export. Use this when asking an agent to reason
              about or generate token values without reading CSS — it exposes the full
              token tree in a format most tools can parse directly.
            </P>
          </div>
          <div className="space-y-1">
            <p className="font-display text-sm font-semibold">
              <Code>CLAUDE.md</Code>
            </p>
            <P>
              The agent-layer. Tells every AI tool the architecture rules, naming
              conventions, what not to touch, and how to verify changes. Auto-read on
              session start — no manual inclusion required.
            </P>
          </div>
        </div>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* Section 3 — Cursor @-reference pattern                              */}
      {/* ------------------------------------------------------------------ */}
      <Section label="Cursor @-reference pattern">
        <P>
          In Cursor, prefix a file path with <Code>@</Code> to inject its contents
          into the context window for that message. Use <Code>@src/index.css</Code> for
          token questions and component generation — it carries the complete{" "}
          <Code>@theme</Code> block and all three theme overrides.
        </P>
        <StepCode language="cursor">{`@src/index.css
Build a new component following the democrito design system.
Use CSS custom properties (--background, --surface, --card, --foreground).
All user-editable content must use font-mono (JetBrains Mono).
Button labels use font-display (Plus Jakarta Sans).`}</StepCode>
        <P>
          For component-level work, @-reference the specific docs file alongside the
          component file:
        </P>
        <StepCode language="cursor">{`@docs/tokens.md @src/components/atoms/Heading.tsx
Add a new size variant "4xl" following the existing pattern.`}</StepCode>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* Section 4 — Using docs/ as agent context                            */}
      {/* ------------------------------------------------------------------ */}
      <Section label="Docs">
        <P>
          The <Code>docs/</Code> folder contains the complete reference documentation
          for the system. Reference specific files rather than the whole folder —
          agents work better with focused context.
        </P>
        <Note label="Key files in docs/">
          <div className="space-y-3">
            <div className="space-y-1">
              <p className="font-display text-sm font-semibold">
                <Code>docs/design-system.md</Code>
              </p>
              <P>
                Full component inventory across all atomic layers — atoms, molecules,
                organisms, and templates — with usage rules and composition patterns.
                Use this when an agent needs to find an existing component or understand
                what's available before creating something new.
              </P>
            </div>
            <div className="space-y-1">
              <p className="font-display text-sm font-semibold">
                <Code>docs/theming.md</Code>
              </p>
              <P>
                Full theming walkthrough — palette swaps, font changes, spacing
                overrides, with before/after examples. Use this when working on brand
                customization.
              </P>
            </div>
            <div className="space-y-1">
              <p className="font-display text-sm font-semibold">
                <Code>docs/tokens.md</Code>
              </p>
              <P>
                Complete token reference — colors, typography, spacing, radii, motion.
                Use this when an agent needs to look up a specific token name or
                understand the token hierarchy.
              </P>
            </div>
          </div>
        </Note>
      </Section>
    </div>
  );
}
