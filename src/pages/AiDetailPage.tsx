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
// Router — maps slug → platform page
// ---------------------------------------------------------------------------

const platformMap: Record<string, React.ComponentType> = {
  "claude-design": ClaudeDesignPage,
  "lovable": LovablePage,
  "stitch": StitchPage,
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
