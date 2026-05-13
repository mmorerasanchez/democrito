import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Heading, Text, Code } from "@/components/atoms";

// ---------------------------------------------------------------------------
// Shared sub-components (mirrors UseCaseDetailPage pattern)
// ---------------------------------------------------------------------------

function StepCode({ language, children }: { language: string; children: string }) {
  return (
    <div className="rounded-md border border-border overflow-hidden">
      <div className="flex items-center gap-2 border-b border-border bg-surface px-4 py-1.5">
        <span className="font-mono text-2xs text-muted-foreground">{language}</span>
      </div>
      <pre className="overflow-x-auto bg-muted p-4">
        <code className="font-mono text-xs text-foreground whitespace-pre">{children}</code>
      </pre>
    </div>
  );
}

function InfoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-border bg-card p-5 space-y-2">
      <p className="font-display text-xs font-semibold uppercase tracking-widest text-accent">
        {title}
      </p>
      <Text size="sm" variant="muted" className="leading-relaxed">
        {children}
      </Text>
    </div>
  );
}

function ChallengeCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-border bg-surface p-5 space-y-2">
      <p className="font-display text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        The Challenge
      </p>
      <Text size="sm" variant="muted" className="leading-relaxed">
        {children}
      </Text>
    </div>
  );
}

function Step({
  number,
  title,
  caption,
  language,
  code,
  children,
}: {
  number: number;
  title: string;
  caption?: string;
  language?: string;
  code?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-start gap-3">
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/10 font-mono text-2xs font-bold text-accent mt-0.5">
          {number}
        </span>
        <div>
          <p className="font-display text-sm font-semibold">{title}</p>
          {caption && (
            <Text size="xs" variant="muted" className="mt-0.5">
              {caption}
            </Text>
          )}
        </div>
      </div>
      {(code || children) && (
        <div className="pl-9">
          {code && language ? (
            <StepCode language={language}>{code}</StepCode>
          ) : (
            children
          )}
        </div>
      )}
    </div>
  );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <span className="font-mono text-2xs text-muted-foreground uppercase tracking-widest shrink-0">
          {label}
        </span>
        <div className="flex-1 border-t border-border" />
      </div>
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Claude Design
// ---------------------------------------------------------------------------

function ClaudeDesignPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <Badge variant="outline" className="font-mono text-xs">Anthropic Labs</Badge>
        <Heading level="h1">Using democrito with Claude Design</Heading>
        <Text variant="muted">
          Visual generation, on-brand from the first prompt. Set up once — applied to every project.
        </Text>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <InfoCard title="What it does">
          Claude Design generates visual artifacts from natural language — designs, prototypes,
          React components, HTML layouts. During onboarding it reads your codebase and design files
          to build a team design system, then applies it automatically to every generation.
        </InfoCard>
        <InfoCard title="Why democrito fits">
          democrito ships exactly what Claude Design needs:{" "}
          <Code>DESIGN.md</Code> (the taste layer), <Code>src/index.css</Code> (every CSS custom
          property), and <Code>src/DESIGN_SYSTEM.md</Code> (the component inventory). After
          onboarding, Claude Design knows your surface hierarchy, font rules, and accent
          constraints without being reminded each session.
        </InfoCard>
        <InfoCard title="The handoff">
          Once a design is validated, Claude Design packages it into a bundle. Pass it to Claude
          Code — which already reads <Code>CLAUDE.md</Code> on startup — with one prompt to
          classify it atomically and replace any generic colors with democrito token classes.
        </InfoCard>
      </div>

      <ChallengeCard>
        Claude Design generates visual artifacts, not live React components. It learns
        democrito's rules — surface hierarchy, font system, accent constraints — but the
        component library itself (<Code>StatCard</Code>, <Code>DataTable</Code>,{" "}
        <Code>FilterBar</Code>) doesn't run inside Claude Design. Wiring to those components
        happens in the Claude Code handoff. Also: the theme import is static. If you update
        your token overrides in <Code>src/index.css</Code>, re-run the design system import.
      </ChallengeCard>

      <Separator />

      <div className="space-y-6">
        <Heading level="h2">Implementation Guide</Heading>

        <Step
          number={1}
          title="Import your design system during Claude Design onboarding"
          caption="Point Claude Design at these three files. It extracts color roles, typography rules, surface hierarchy, and the do/don't list — then stores them for every project."
          language="text"
          code={`Import: DESIGN.md
Import: src/index.css   (the @theme block — all CSS custom properties)
Import: src/DESIGN_SYSTEM.md   (component inventory + usage rules)`}
        />

        <Step
          number={2}
          title="Verify the import with a test prompt"
          caption="If the answer mentions terracotta and one-per-screen, the import worked. If it says blue or generic accent, re-import src/index.css."
          language="text"
          code={`What is the accent color in this design system, and what is its role?`}
        />

        <Step
          number={3}
          title="Generate with token language, not visual descriptions"
          caption="Reference semantic roles, not hex values. Claude Design maps them to the correct HSL values it extracted during onboarding."
          language="text"
          code={`Create a dashboard card for a SaaS metrics screen.
- Container: bg-card, border-border, rounded-lg
- Metric value: font-mono text-2xl font-bold text-foreground
- Label: font-display text-sm font-medium text-muted-foreground
- Trend badge: font-mono text-xs. text-success positive, text-error negative.
- One accent element maximum. No shadows on the card itself.`}
        />

        <Step
          number={4}
          title="Hand off to Claude Code"
          caption="Claude Code auto-reads CLAUDE.md — it already knows the atomic levels, token rules, and coding conventions. The handoff prompt just bridges the two contexts."
          language="text"
          code={`Convert this Claude Design artifact to a democrito React component.
Classify it: atom, molecule, organism, or template?
Use existing atoms from src/components/atoms/ where possible.
Replace any generic colors with democrito token classes (bg-surface, text-accent, etc.).
Ensure font-mono is applied to all data values.
Rules are in CLAUDE.md.`}
        />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Lovable
// ---------------------------------------------------------------------------

function LovablePage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <Badge variant="outline" className="font-mono text-xs">Primary build environment</Badge>
        <Heading level="h1">Using democrito with Lovable</Heading>
        <Text variant="muted">
          Direct codebase access via GitHub. Two-tier knowledge wired for the right content at
          the right scope.
        </Text>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <InfoCard title="GitHub sync">
          When Lovable is connected to your repo, it reads <Code>CLAUDE.md</Code> directly —
          architecture reference, coding rules, key file locations. Every session starts with the
          full project context without pasting anything.
        </InfoCard>
        <InfoCard title="Two-tier knowledge">
          Workspace Knowledge applies across every project in your workspace. Project Knowledge
          applies to one. Use Workspace for democrito's universal rules. Use Project for your
          product's overrides — accent color, font substitutions, radius. When both exist,
          Project wins.
        </InfoCard>
        <InfoCard title="Cross-project referencing">
          Lovable's <Code>@</Code> mention lets you reference components from another project.
          If you've built democrito atoms in one project, you can pull them into a new one by
          name — the closest thing Lovable has to a shared component library across projects.
        </InfoCard>
      </div>

      <ChallengeCard>
        When GitHub is connected, <Code>CLAUDE.md</Code> and Workspace Knowledge can overlap.
        Without a clear split, you duplicate rules and waste context budget. The rule: put coding
        conventions and file structure in <Code>CLAUDE.md</Code>; put the token quick-reference
        and the three non-negotiables in Workspace Knowledge; put product-specific overrides in
        Project Knowledge. Never put the same content in two places.
      </ChallengeCard>

      <Separator />

      <div className="space-y-6">
        <Heading level="h2">Implementation Guide</Heading>

        <Step
          number={1}
          title="Connect your GitHub repo"
          caption="Settings → GitHub → Connect. Lovable gets read access to CLAUDE.md and all source files. Every prompt can now reference existing components by their actual file path."
        />

        <Step
          number={2}
          title="Add Workspace Knowledge — democrito's global rules"
          caption="Settings → Workspace → Knowledge. This block applies to every project you build on democrito. Paste it once and forget it."
          language="text"
          code={`democrito design system — global rules (apply to all projects):

ARCHITECTURE: Atomic Design (atoms → molecules → organisms → templates → pages)
Before creating any component, check src/components/atoms/, molecules/, ui/.
Name the atomic level in every prompt: "create a molecule", "extend this organism".

TOKENS: Never hardcode colors, spacing, or radii.
- Surfaces: bg-background → bg-surface → bg-card. Three levels, never four.
- Accent: text-accent (terracotta). At most one accent button per screen.
- Borders: border-border. Inputs: bg-input border-border.

FONTS — non-negotiable:
- font-display (Plus Jakarta Sans): headings, buttons, nav labels
- font-body (Satoshi): descriptions, body copy
- font-mono (JetBrains Mono): ALL data values, inputs, badges, code, user-editable content

RULES:
- Never use bg-gray-800, text-white, or any hardcoded color
- No gradients, no decorative colors, no fourth surface level
- Extend shadcn/ui primitives from src/components/ui/ — never rebuild them
- TypeScript with explicit prop interfaces`}
        />

        <Step
          number={3}
          title="Add Project Knowledge — product-specific overrides only"
          caption="Project settings → Knowledge. Only what changes for this product. Leave out everything that's already in Workspace Knowledge."
          language="text"
          code={`This project overrides democrito's warm default:
- Accent: [your color] instead of terracotta
- Theme: [dark-first / light-first / warm default]
- Font-mono: [override if different from JetBrains Mono]
- Radius: [override if different from 12px]

All other democrito rules from Workspace Knowledge apply unchanged.`}
        />

        <Step
          number={4}
          title="Reference existing components in prompts"
          caption="Lovable reads your source files — use file paths to anchor generations to existing patterns rather than describing them from scratch."
          language="text"
          code={`Create a molecule called RunHistoryItem.
Follow the existing pattern in src/components/molecules/StatCard.tsx.
Props: label (string), value (string), status ("running" | "done" | "error").
- label: font-display text-sm font-medium
- value: font-mono text-base text-foreground
- status badge: font-mono text-xs using --status-* tokens
Export from the molecules index.`}
        />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Google Stitch
// ---------------------------------------------------------------------------

function StitchPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <Badge variant="outline" className="font-mono text-xs">Google Labs</Badge>
        <Heading level="h1">Using democrito with Google Stitch</Heading>
        <Text variant="muted">
          DESIGN.md speaks Stitch's language natively. Import it and generated screens follow
          your system.
        </Text>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <InfoCard title="Shared format">
          Google open-sourced the DESIGN.md spec on April 21, 2026 — a plain-text design brief
          that AI agents read to generate consistent UI. democrito ships <Code>DESIGN.md</Code>{" "}
          following this convention. The two were designed for the same problem from different
          sides.
        </InfoCard>
        <InfoCard title="democrito-first">
          You already have <Code>DESIGN.md</Code>. Import it into Stitch and every screen
          Stitch generates will follow your surface hierarchy, font rules, and accent
          constraints. No configuration — just point and paste.
        </InfoCard>
        <InfoCard title="Stitch-first">
          Designing in Stitch before adopting democrito? Export DESIGN.md from Stitch, then
          reconcile: take the system from democrito, take the theme from Stitch. Map Stitch's
          color values to democrito token names in <Code>src/index.css</Code>.
        </InfoCard>
      </div>

      <ChallengeCard>
        Stitch's Tailwind CSS export uses generic class names —{" "}
        <Code>bg-neutral-900</Code>, <Code>text-orange-500</Code> — not democrito's semantic
        tokens (<Code>bg-card</Code>, <Code>text-accent</Code>). The visual output from Stitch
        will be on-system. The code output always needs a token mapping pass. This isn't
        optional: skip it and AI-generated components will revert to hardcoded values on the
        next edit.
      </ChallengeCard>

      <Separator />

      <div className="space-y-6">
        <Heading level="h2">Implementation Guide</Heading>

        <Step
          number={1}
          title="Import DESIGN.md into your Stitch project"
          caption="Paste the file contents directly, or point Stitch at the raw GitHub URL. If you've customized democrito's tokens, use your fork's URL — not the upstream default."
          language="url"
          code={`https://raw.githubusercontent.com/mmorerasanchez/democrito/main/DESIGN.md`}
        />

        <Step
          number={2}
          title="Verify the import with a test prompt"
          caption="Expected answer: terracotta (hsl 18°), used for primary CTAs and links. One per screen maximum. If Stitch says blue or generic accent, the import didn't take — re-paste DESIGN.md."
          language="text"
          code={`What is the accent color in this design system, and what is its role?`}
        />

        <Step
          number={3}
          title="Generate screens with token language"
          caption="Use surface names and font roles rather than visual descriptions. Stitch maps them to the values it extracted from DESIGN.md."
          language="text"
          code={`Design a data table layout for a log viewer.
IDE-grade, not consumer-grade. Dense and purposeful.
- Table headers: font-mono uppercase tracking-widest text-muted-foreground, bg-surface
- Table cells: font-mono text-sm text-foreground
- Row hover: bg-accent-subtle
- Horizontal dividers only. No vertical column lines.
- Timestamp column: text-foreground-subtle`}
        />

        <Step
          number={4}
          title="Token mapping pass after export"
          caption="Replace Stitch's generic Tailwind classes with democrito semantic tokens. This step is always required — the visual intent is right, the class names are not."
          language="text"
          code={`Replace in exported code:

bg-neutral-*    → bg-background / bg-surface / bg-card  (match by visual role)
border-neutral-* → border-border
text-neutral-*  → text-foreground / text-muted-foreground / text-foreground-subtle
text-white      → text-foreground
text-orange-*   → text-accent
bg-orange-*     → bg-accent / bg-accent-muted / bg-accent-subtle
font-sans       → font-display (headings) or font-body (prose)`}
        />

        <Step
          number={5}
          title="Optional: connect the Stitch MCP to Claude Code"
          caption="The Stitch MCP server lets Claude Code read your designs directly — color tokens, component structure, layout rules — without copying anything. Add to .mcp.json in your project root."
          language="json"
          code={`{
  "mcpServers": {
    "stitch": {
      "command": "npx",
      "args": ["-y", "@google/stitch-mcp"],
      "env": {
        "STITCH_API_KEY": "your-stitch-api-key"
      }
    }
  }
}`}
        />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Claude (all tools)
// ---------------------------------------------------------------------------

function ClaudePage() {
  return (
    <div className="space-y-10">
      {/* Page header */}
      <div className="space-y-2">
        <Badge variant="outline" className="font-mono text-xs">Anthropic</Badge>
        <Heading level="h1">Using democrito with Claude</Heading>
        <Text variant="muted">
          Four tools, one context layer. From a quick prompt in Claude.ai to a full
          component build in the terminal — CLAUDE.md, DESIGN.md, and the compact
          token block make every Claude surface produce on-brand output.
        </Text>
      </div>

      {/* Page-level InfoCards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <InfoCard title="One context layer">
          democrito ships three files that Claude tools read natively:{" "}
          <Code>CLAUDE.md</Code> (rules and architecture),{" "}
          <Code>DESIGN.md</Code> (taste layer and visual language), and{" "}
          <Code>src/index.css</Code> (every CSS custom property across three themes).
          Set them up once — every Claude tool draws from the same source.
        </InfoCard>
        <InfoCard title="Right tool, right task">
          Claude.ai chat excels at design specs and one-off components. Claude Design
          adds visual generation with codebase import. Cowork brings project memory
          and file access. Claude Code handles multi-file builds and fork customization
          from the terminal. The four complement each other — they don't compete.
        </InfoCard>
        <InfoCard title="The two rules that always break">
          Across all four tools, two violations appear most often: hardcoded Tailwind
          colors (<Code>text-green-600</Code> instead of <Code>text-success</Code>)
          and <Code>dark:</Code> overrides at the component level. Both are covered
          by debug prompts in the sections below.
        </InfoCard>
      </div>

      {/* Section 1 — Claude.ai Chat */}
      <Section label="Claude.ai Chat">
        <Text variant="muted">
          No filesystem access — but one context paste is enough. Paste the compact
          token block at the start of any session, or into a Claude Project for
          permanence, and Claude.ai produces on-brand components, design specs, and
          behaviour specs.
        </Text>

        <ChallengeCard>
          Claude.ai defaults to Tailwind's built-in palette the moment context is
          missing. <Code>text-green-600</Code> instead of <Code>text-success</Code>,{" "}
          <Code>dark:bg-gray-800</Code> instead of letting the semantic token handle
          theming. Without the context block, every new conversation starts from
          scratch. Paste first — then prompt.
        </ChallengeCard>

        <div className="space-y-6">
          <Step
            number={1}
            title="Paste the compact token block at the start of every session"
            caption="Or add it to a Claude Project's instructions — then it persists across every conversation without re-pasting."
            language="text"
            code={`democrito design system — compact reference

SURFACES (3 only): bg-background → bg-surface → bg-card
FONTS:
  font-display  — headings, button labels, nav labels
  font-body     — paragraphs, descriptions, helper text
  font-mono     — ALL data, IDs, code, user-editable content
SEMANTIC COLORS (never text-green-*, bg-gray-*, etc.):
  text-foreground · text-muted-foreground · text-accent
  text-success · text-warning · text-error · text-info
  bg-success/10 · bg-warning/10 · bg-error/10 · bg-info/10
  border-border · bg-card · bg-surface · bg-background
RULES:
  Never hardcode colors. Never add dark: overrides.
  Never introduce a fourth surface.`}
          />

          <Step
            number={2}
            title="Generate a component or design spec"
            caption="Name the atomic level (atom / molecule / organism) before describing the component. For specs, ask for token mapping and accessibility notes."
            language="text"
            code={`Create a molecule called StatCard.
Props: label (string), value (string), trend ("up" | "down" | "neutral").
- Container: bg-card border-border rounded-lg p-4
- label: font-display text-xs font-semibold uppercase tracking-widest text-muted-foreground
- value: font-mono text-2xl font-bold text-foreground
- trend: font-mono text-xs — text-success / text-error / text-muted-foreground
No dark: prefixes. No hardcoded colors.`}
          />

          <Step
            number={3}
            title="Debug hardcoded colors or dark: overrides"
            language="text"
            code={`You used a hardcoded color. Replace with the correct semantic token:
Status: text-success, text-error, text-warning, text-info
Surfaces: bg-background, bg-surface, bg-card, bg-muted
Text: text-foreground, text-muted-foreground, text-foreground-subtle
Accent: text-accent, bg-accent, bg-accent/10

——

Remove all dark: prefixes. democrito's semantic tokens adapt automatically
across warm, dark, and light themes — dark: overrides break theme switching.`}
          />
        </div>
      </Section>

      {/* Section 2 — Claude Design */}
      <Section label="Claude Design">
        <Text variant="muted">
          Visual generation, on-brand from the first prompt. Import democrito's
          three context files during Claude Design onboarding — every artifact it
          generates follows your surface hierarchy, font rules, and accent constraints
          automatically.
        </Text>

        <ChallengeCard>
          Claude Design generates visual artifacts, not live React components. The
          component library (<Code>StatCard</Code>, <Code>DataTable</Code>,{" "}
          <Code>FilterBar</Code>) doesn't run inside Claude Design — wiring to those
          components happens in the Claude Code handoff. Also: the theme import is
          static. If you update token overrides in <Code>src/index.css</Code>,
          re-run the design system import.
        </ChallengeCard>

        <div className="space-y-6">
          <Step
            number={1}
            title="Import your design system during Claude Design onboarding"
            caption="These three files give Claude Design color roles, typography rules, surface hierarchy, and the do/don't list — stored for every project in your workspace."
            language="text"
            code={`Import: DESIGN.md
Import: src/index.css   (the @theme block — all CSS custom properties)
Import: src/DESIGN_SYSTEM.md   (component inventory + usage rules)`}
          />

          <Step
            number={2}
            title="Verify the import"
            caption="If the answer mentions terracotta and one-per-screen, the import worked. If it says blue or generic accent, re-import src/index.css."
            language="text"
            code={`What is the accent color in this design system, and what is its role?`}
          />

          <Step
            number={3}
            title="Generate with token language, not visual descriptions"
            language="text"
            code={`Create a dashboard metric card.
- Container: bg-card, border-border, rounded-lg
- Metric value: font-mono text-2xl font-bold text-foreground
- Label: font-display text-sm font-medium text-muted-foreground
- Trend badge: font-mono text-xs — text-success / text-error
One accent element maximum. No shadows.`}
          />

          <Step
            number={4}
            title="Hand off to Claude Code"
            caption="Claude Code auto-reads CLAUDE.md — it already knows the atomic levels, token rules, and coding conventions."
            language="text"
            code={`Convert this Claude Design artifact to a democrito React component.
Classify it: atom, molecule, organism, or template?
Use existing atoms from src/components/atoms/ where possible.
Replace any generic colors with democrito token classes.
Ensure font-mono is applied to all data values.
Rules are in CLAUDE.md.`}
          />
        </div>
      </Section>

      {/* Section 3 — Cowork */}
      <Section label="Cowork">
        <Text variant="muted">
          Structured prompts, file access, and project memory across sessions. The
          democrito skill loads the full context once — every conversation has the
          token reference, atomic rules, and debug prompts without any setup.
        </Text>

        <ChallengeCard>
          Two violations appear in almost every AI-generated democrito component:{" "}
          <Code>bg-card</Code> inside a <Code>bg-card</Code> modal (same surface stacks
          instead of receding — use <Code>bg-surface</Code> inside{" "}
          <Code>bg-card</Code>) and data fields rendered in <Code>font-body</Code>{" "}
          instead of <Code>font-mono</Code>. Prompt 3 of the four-prompt workflow
          catches both before code reaches the codebase.
        </ChallengeCard>

        <div className="space-y-6">
          <Step
            number={1}
            title="Load the democrito skill"
            caption="Skills persist across sessions — once loaded, every new conversation starts with the full democrito context."
            language="text"
            code={`Load the democrito skill.`}
          />

          <Step
            number={2}
            title="Prompt 1: token lookup (verify context)"
            language="text"
            code={`democrito token lookup:
- What is the accent color and which five tokens share its hue?
- What are the three surface levels?
- What content must always use font-mono?`}
          />

          <Step
            number={3}
            title="Prompt 2: generate — then immediately audit"
            caption="Run the audit in the same prompt turn. Don't accept output without checking surface and font violations first."
            language="text"
            code={`Create a [atom/molecule/organism] called [Name].
[props and token assignments]
No dark: prefixes. No hardcoded colors. No fourth surface.

——— then immediately ———

Audit for surface violations: flag any bg-card inside a bg-card container.
Fix: use bg-surface inside bg-card.
Audit for font violations: flag any data value, ID, or timestamp not
using font-mono — including masked portions.`}
          />
        </div>
      </Section>

      {/* Section 4 — Claude Code */}
      <Section label="Claude Code">
        <Text variant="muted">
          Direct filesystem access. <Code>CLAUDE.md</Code> auto-reads on launch from
          the project root — zero context pasting required. Best for building
          components on democrito itself, and for fork customization across multiple
          files in one session.
        </Text>

        <ChallengeCard>
          Claude Code reads <Code>CLAUDE.md</Code> from whichever directory it was
          launched from. Launch from a different project already open in your terminal
          and it loads the wrong rules — all token constraints come from the wrong
          codebase. Always <Code>cd</Code> into the project root before typing{" "}
          <Code>claude</Code>. If Claude Code is already running elsewhere, open a
          new terminal tab.
        </ChallengeCard>

        <div className="space-y-6">
          <Step
            number={1}
            title="Launch from the project root"
            caption="The launch directory is what Claude Code auto-reads. This step is the most common failure point — do not skip the cd."
            language="bash"
            code={`cd your-democrito-project
claude    # auto-reads CLAUDE.md from this directory`}
          />

          <Step
            number={2}
            title="Verify context, then build"
            language="text"
            code={`[verify] What is the accent color and the three surface levels?

[build] Create an atom called StatusBadge.
Props: status ("draft" | "testing" | "production" | "archived").
- Container: font-mono text-xs rounded-full px-2 py-0.5
- draft: bg-status-draft/10 text-status-draft
- testing: bg-status-testing/10 text-status-testing
- production: bg-status-production/10 text-status-production
- archived: bg-status-archived/10 text-status-archived
Export from src/components/atoms/index.ts. Run lint after.`}
          />

          <Step
            number={3}
            title="Customize a fork for your brand"
            caption="When forking, Claude Code can update all context files in one session. Start with the token layer — context files follow."
            language="text"
            code={`I am customizing this fork for a brand called [Name].
Accent: HSL [H S% L%].

A — Update src/index.css :root. Replace the five accent tokens in sync:
    --accent, --accent-muted, --ring, --sidebar-primary, --sidebar-ring.

B — Update fonts in src/index.css: replace @import URLs at the top,
    update --font-display and --font-body in the @theme block.
    System fonts (e.g. Inter) need no @import line.

C — Update CLAUDE.md, DESIGN_SYSTEM.md, and DESIGN.md with the new
    accent name, font names, and brand name throughout.

Run lint after each step.`}
          />
        </div>
      </Section>
    </div>
  );
}

// ---------------------------------------------------------------------------
// GitHub
// ---------------------------------------------------------------------------

function GithubPage() {
  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="space-y-2">
        <Badge variant="outline" className="font-mono text-xs">Open Source</Badge>
        <Heading level="h1">democrito on GitHub</Heading>
        <Text variant="muted">
          Fork it, star it, contribute back. The repo ships with structured context
          files for every AI tool — browse the source, customize your setup, or
          extend the system.
        </Text>
      </div>

      {/* InfoCards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <InfoCard title="The context files">
          Four files make every AI tool produce on-brand output:{" "}
          <Code>CLAUDE.md</Code> (agent rules and architecture),{" "}
          <Code>DESIGN.md</Code> (taste layer and visual language),{" "}
          <Code>DESIGN_SYSTEM.md</Code> (component inventory), and{" "}
          <Code>src/index.css</Code> (all CSS custom properties across three themes).
          Fork the repo and these files come with it — already wired for Claude Code,
          Lovable, Stitch, and Replit.
        </InfoCard>
        <InfoCard title="Fork and customize">
          democrito is built for zero-effort theming. Fork on GitHub, clone locally,
          and override any token in <Code>src/index.css</Code> — no component code
          changes needed. For a full rebrand (accent, fonts, brand name), update the
          five accent tokens in sync and edit the <Code>@theme</Code> block for
          fonts. <Code>CLAUDE.md</Code>, <Code>DESIGN.md</Code>, and{" "}
          <Code>DESIGN_SYSTEM.md</Code> carry the updated values to every AI tool
          automatically.
        </InfoCard>
        <InfoCard title="Contribute">
          democrito accepts contributions across four layers: atoms, molecules,
          organisms, and tokens. Every new component needs an atomic classification
          before it's written, a TypeScript props interface, semantic token usage
          only, and an entry in <Code>DESIGN_SYSTEM.md</Code>. The{" "}
          <Code>CONTRIBUTING.md</Code> walks through the full checklist.
        </InfoCard>
      </div>

      {/* ChallengeCard */}
      <ChallengeCard>
        Token changes require updating all three theme blocks —{" "}
        <Code>:root</Code> (warm), <Code>.dark</Code>, and <Code>.light</Code> —
        in <Code>src/index.css</Code>. Skip one and theme switching partially
        breaks. The most common contributor error is updating only the warm theme.
        The <Code>CONTRIBUTING.md</Code> walks through this, and Claude Code can
        run the update across all three blocks in one prompt if you specify which
        token to change.
      </ChallengeCard>

      <Separator />

      {/* Implementation Guide */}
      <div className="space-y-6">
        <Heading level="h2">Implementation Guide</Heading>

        <Step
          number={1}
          title="Star the repo"
          caption="Starring notifies you of new releases. democrito follows semantic versioning — patch releases are safe, minor versions may add tokens, major versions signal breaking changes."
          language="url"
          code={`https://github.com/mmorerasanchez/democrito`}
        />

        <Step
          number={2}
          title="Fork and clone"
          caption="Fork first on GitHub (your own copy), then clone your fork. This is the starting point for both customization and contributions."
          language="bash"
          code={`# Fork on GitHub first, then:
git clone https://github.com/your-username/democrito.git
cd democrito
npm install
npm run dev     # opens showcase at localhost:5173`}
        />

        <Step
          number={3}
          title="Explore the context files"
          caption="These four files are what AI tools read. Understanding them is the fastest way to understand the whole system."
          language="text"
          code={`CLAUDE.md            — agent rules, atomic levels, token rules, verification
DESIGN.md            — visual language, taste layer, do/don't list
src/DESIGN_SYSTEM.md — full component inventory and usage rules
src/index.css        — CSS custom properties, @theme block, all three themes`}
        />

        <Step
          number={4}
          title="Customize for your brand"
          caption="Five accent tokens must update in sync. Fonts require three changes in src/index.css (not just CLAUDE.md). See the Theming guide for full examples."
          language="bash"
          code={`# In src/index.css, update the five accent tokens in :root:
# --accent, --accent-muted, --ring, --sidebar-primary, --sidebar-ring
#
# For fonts: replace @import URLs at top + update @theme block values.
# Then propagate brand name and values to CLAUDE.md, DESIGN.md,
# and src/DESIGN_SYSTEM.md.`}
        />

        <Step
          number={5}
          title="Contribute a component or token"
          caption="Open an issue first to align on the atomic level and token scope. Then follow the checklist in CONTRIBUTING.md."
          language="text"
          code={`Contribution checklist:
1. Classify atomic level: atom / molecule / organism / template
2. Create file: src/components/<level>/YourComponent.tsx
3. Define TypeScript props interface with JSDoc
4. Use semantic tokens only — no hardcoded colors
5. Follow three-font rule (display / body / mono)
6. Export from layer's index.ts barrel
7. Update src/DESIGN_SYSTEM.md with the new entry
8. Submit PR: feat(<level>): add YourComponent`}
        />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Vibe Coding Tools (Lovable + Stitch + Replit)
// ---------------------------------------------------------------------------

function VibeCodingPage() {
  return (
    <div className="space-y-10">
      {/* Page header */}
      <div className="space-y-2">
        <Badge variant="outline" className="font-mono text-xs">Vibe Coding</Badge>
        <Heading level="h1">Using democrito with Vibe Coding Tools</Heading>
        <Text variant="muted">
          Lovable, Google Stitch, and Replit. Visual-first builders that generate
          full apps from prompts — democrito's context files keep every generation
          on-system.
        </Text>
      </div>

      {/* Page-level InfoCards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <InfoCard title="DESIGN.md as the common layer">
          democrito ships <Code>DESIGN.md</Code> following Google's open-source
          format — a plain-text design brief that all three tools read natively. It
          carries the visual language: surface hierarchy, font roles, accent
          constraints, and the do/don't list. Import it once per tool and every
          generation follows the same rules.
        </InfoCard>
        <InfoCard title="Token mapping is always required">
          Lovable, Stitch, and Replit generate code with generic Tailwind classes
          (<Code>bg-neutral-900</Code>, <Code>text-orange-500</Code>) — not
          democrito's semantic tokens. Visual output will be on-system. Code output
          always needs a token mapping pass. Skip it and AI-generated components
          revert to hardcoded values on the next edit.
        </InfoCard>
        <InfoCard title="Workspace vs project knowledge">
          Each tool has a way to set rules once for all projects: Lovable uses
          Workspace Knowledge, Stitch uses project-level <Code>DESIGN.md</Code>,
          Replit uses <Code>replit.md</Code> in a template. Put democrito's universal
          rules there. Put product-specific overrides in the per-project layer. Never
          duplicate content across both layers.
        </InfoCard>
      </div>

      {/* Section 1 — Lovable */}
      <Section label="Lovable">
        <Text variant="muted">
          Direct GitHub sync. <Code>CLAUDE.md</Code> reads automatically when
          connected — no pasting needed. Two-tier knowledge separates global
          democrito rules from per-product overrides.
        </Text>

        <ChallengeCard>
          When GitHub is connected, <Code>CLAUDE.md</Code> and Workspace Knowledge
          can overlap. Without a clear split, rules duplicate and waste context
          budget. The rule: coding conventions and file structure in{" "}
          <Code>CLAUDE.md</Code>; token quick-reference and three non-negotiables
          in Workspace Knowledge; product-specific overrides in Project Knowledge.
          Never put the same content in two places.
        </ChallengeCard>

        <div className="space-y-6">
          <Step
            number={1}
            title="Connect GitHub"
            caption="Settings → GitHub → Connect. Every prompt can now reference existing components by their actual file path."
          />

          <Step
            number={2}
            title="Add Workspace Knowledge — democrito's global rules"
            caption="Settings → Workspace → Knowledge. Paste once and forget it — applies to every project you build on democrito."
            language="text"
            code={`democrito design system — global rules:

ARCHITECTURE: Atomic Design. Before any new component, check
src/components/atoms/, molecules/, ui/.

SURFACES: bg-background → bg-surface → bg-card. Never four.
FONTS: font-display (headings/buttons), font-body (descriptions),
font-mono (ALL data values, inputs, IDs, user-editable content).
Never hardcode colors. Never dark: overrides.`}
          />

          <Step
            number={3}
            title="Add Project Knowledge — product overrides only"
            caption="Project settings → Knowledge. Only what changes for this product."
            language="text"
            code={`Accent: [hsl value] instead of terracotta.
Theme: [dark-first / warm default].
All other democrito rules apply unchanged.`}
          />

          <Step
            number={4}
            title="Reference components by file path"
            caption="Lovable reads your source files — use file paths to anchor generations to existing patterns rather than describing them from scratch."
            language="text"
            code={`Create a molecule called RunRow.
Follow the pattern in src/components/molecules/StatCard.tsx.
Props: label (string), value (string), status ("running"|"done"|"error").
status badge: font-mono text-xs using --status-* tokens.
Export from the molecules index.`}
          />
        </div>
      </Section>

      {/* Section 2 — Google Stitch */}
      <Section label="Google Stitch">
        <Text variant="muted">
          <Code>DESIGN.md</Code> speaks Stitch's language natively — it follows
          Google's open-source format. Import it and every screen Stitch generates
          follows democrito's visual rules. A token mapping pass is always required
          after export.
        </Text>

        <ChallengeCard>
          Stitch's Tailwind CSS export uses generic class names —{" "}
          <Code>bg-neutral-900</Code>, <Code>text-orange-500</Code> — not
          democrito's semantic tokens (<Code>bg-card</Code>,{" "}
          <Code>text-accent</Code>). The visual output from Stitch will be
          on-system. The code output always needs a token mapping pass. Skip it and
          AI-generated components revert to hardcoded values on the next edit.
        </ChallengeCard>

        <div className="space-y-6">
          <Step
            number={1}
            title="Import DESIGN.md into your Stitch project"
            caption="Paste the file contents directly, or point Stitch at the raw GitHub URL. If you've customized tokens, use your fork's URL — not the upstream default."
            language="url"
            code={`https://raw.githubusercontent.com/mmorerasanchez/democrito/main/DESIGN.md`}
          />

          <Step
            number={2}
            title="Verify the import"
            caption="Expected: terracotta (hsl 18°), used for primary CTAs and links, one per screen maximum. If Stitch says blue or generic, re-paste DESIGN.md."
            language="text"
            code={`What is the accent color in this design system, and what is its role?`}
          />

          <Step
            number={3}
            title="Generate screens with token language"
            language="text"
            code={`Design a data table layout for a log viewer.
IDE-grade, not consumer-grade. Dense and purposeful.
- Table headers: font-mono uppercase tracking-widest text-muted-foreground, bg-surface
- Table cells: font-mono text-sm text-foreground
- Row hover: bg-accent-subtle
- Horizontal dividers only. No vertical column lines.
- Timestamp column: text-foreground-subtle`}
          />

          <Step
            number={4}
            title="Token mapping pass after export"
            caption="Replace Stitch's generic Tailwind classes with democrito semantic tokens. This step is always required — the visual intent is right, the class names are not."
            language="text"
            code={`Replace in exported code:
bg-neutral-*    → bg-background / bg-surface / bg-card  (match by visual role)
border-neutral-* → border-border
text-neutral-*  → text-foreground / text-muted-foreground / text-foreground-subtle
text-white      → text-foreground
text-orange-*   → text-accent
bg-orange-*     → bg-accent / bg-accent/10
font-sans       → font-display (headings) or font-body (prose)`}
          />
        </div>
      </Section>

      {/* Section 3 — Replit */}
      <Section label="Replit">
        <Text variant="muted">
          Replit Agent reads <Code>replit.md</Code> in the project root —
          democrito's equivalent of <Code>CLAUDE.md</Code>. Point the Agent at{" "}
          <Code>DESIGN.md</Code> by URL in plan mode and it ingests democrito's
          visual language before writing a single line of code.
        </Text>

        <ChallengeCard>
          Replit Agent won't automatically detect files outside the project root or
          in subdirectories — <Code>replit.md</Code> must be at root. For design
          system context, the most reliable method across all Replit plans is
          pointing Agent at the public <Code>DESIGN.md</Code> URL in plan mode.
          Full design system integration (tokens pre-installed, component library
          wired) is available on the Enterprise plan only.
        </ChallengeCard>

        <div className="space-y-6">
          <Step
            number={1}
            title="Add replit.md to your project root"
            caption="This is Replit's equivalent of CLAUDE.md. Agent reads it automatically at the start of every session. Must be at root — not in a subdirectory."
            language="text"
            code={`# democrito design system

Design system reference: https://democrito.design
DESIGN.md: https://raw.githubusercontent.com/mmorerasanchez/democrito/main/DESIGN.md

SURFACES: bg-background → bg-surface → bg-card (never a fourth level)
FONTS: font-display (headings), font-body (prose), font-mono (all data values)
COLORS: semantic tokens only — never text-green-*, bg-gray-*, or dark: overrides`}
          />

          <Step
            number={2}
            title="Point Agent at DESIGN.md in plan mode"
            caption="Before building anything, tell Agent to read the design system. Works on all plans — no Enterprise required."
            language="text"
            code={`Before you build anything, read the design system at this URL and confirm
you understand the surface hierarchy, font rules, and accent constraints:
https://raw.githubusercontent.com/mmorerasanchez/democrito/main/DESIGN.md`}
          />

          <Step
            number={3}
            title="Generate with token language"
            language="text"
            code={`Create a card component for a SaaS metrics dashboard.
- Container: bg-card border border-border rounded-lg p-4
- Metric value: font-mono text-2xl font-bold text-foreground
- Label: font-display text-sm font-medium text-muted-foreground
- No hardcoded colors. No dark: prefixes.`}
          />

          <Step
            number={4}
            title="Token mapping pass after generation"
            caption="Replit Agent may output generic Tailwind classes even after reading DESIGN.md. Apply the same mapping pass as Stitch."
            language="text"
            code={`Review all className values. Replace generic Tailwind colors:
bg-neutral-*  → bg-surface or bg-card
text-neutral-* → text-foreground or text-muted-foreground
text-green-*  → text-success
text-red-*    → text-error
text-orange-* → text-accent`}
          />
        </div>
      </Section>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Router — maps slug → platform page
// ---------------------------------------------------------------------------

const platformMap: Record<string, React.ComponentType> = {
  "claude-design": ClaudeDesignPage,
  "lovable": LovablePage,
  "stitch": StitchPage,
  "claude": ClaudePage,
  "github": GithubPage,
  "vibe-coding": VibeCodingPage,
};

export default function AiDetailPage() {
  const { platform } = useParams<{ platform: string }>();

  if (!platform || !platformMap[platform]) {
    return <Navigate to="/ai" replace />;
  }

  const PlatformContent = platformMap[platform];

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Link
        to="/ai"
        className="inline-flex items-center gap-1.5 font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        AI Integration
      </Link>

      <PlatformContent />
    </div>
  );
}
