import { PageMeta } from "@/components/app/PageMeta";
import { Badge } from "@/components/ui/badge";
import { Heading, Code } from "@/components/atoms";
import { Section, Step, StepCode, P } from "./_shared";

// ---------------------------------------------------------------------------
// Comparison table for "The pattern" section
// ---------------------------------------------------------------------------

function PatternTable() {
  const rows: { step: string; what: string; stays: string }[] = [
    {
      step: "1  Install",
      what: "Adds all tokens, components, and config to your project",
      stays: "Zero component files are modified after this step",
    },
    {
      step: "2  Token overrides",
      what: "CSS custom properties in src/index.css (`--accent`, surfaces, radius)",
      stays: "Component markup, class names, and Tailwind config",
    },
    {
      step: "3  Font swap",
      what: "`--font-display`, `--font-body`, `--font-mono` in `@theme`",
      stays: "All `font-display` / `font-body` / `font-mono` utility usage",
    },
    {
      step: "4  Update CLAUDE.md",
      what: "Product name, accent, and AI coding rules for the new context",
      stays: "Architecture rules, naming conventions, verification commands",
    },
    {
      step: "5  Update DESIGN.md",
      what: "Brand direction, mood, and visual language for AI agents",
      stays: "Surface hierarchy, 3-font system, monochromatic principle",
    },
  ];

  return (
    <div className="rounded-md border border-border overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-surface">
            <th className="px-4 py-2.5 text-left font-mono text-2xs text-muted-foreground uppercase tracking-widest w-40">
              Step
            </th>
            <th className="px-4 py-2.5 text-left font-mono text-2xs text-muted-foreground uppercase tracking-widest">
              What changes
            </th>
            <th className="px-4 py-2.5 text-left font-mono text-2xs text-muted-foreground uppercase tracking-widest">
              What stays the same
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className="border-b border-border last:border-0 odd:bg-muted/30"
            >
              <td className="px-4 py-3 font-mono text-xs text-foreground whitespace-nowrap align-top">
                {row.step}
              </td>
              <td className="px-4 py-3 font-body text-xs text-muted-foreground align-top">
                {row.what}
              </td>
              <td className="px-4 py-3 font-body text-xs text-muted-foreground align-top">
                {row.stays}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function ExamplesPage() {
  return (
    <div className="space-y-10">
      <PageMeta
        title="democrito examples — three worked customizations"
        description="Three worked examples customizing democrito: a violet dark prompt library, a blue observability dashboard, and an amber AI-ops review tool. Token overrides only, no component files touched."
        path="/ai/examples"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "TechArticle",
          "name": "democrito examples — three worked customizations",
          "description":
            "Three worked examples customizing democrito: a violet dark prompt library, a blue observability dashboard, and an amber AI-ops review tool. Token overrides only, no component files touched.",
          "url": "https://democrito.design/ai/examples",
          "isPartOf": { "@type": "SoftwareApplication", "name": "democrito" },
        }}
      />

      {/* ------------------------------------------------------------------ */}
      {/* Hero                                                                 */}
      {/* ------------------------------------------------------------------ */}
      <div className="space-y-3">
        <Badge variant="outline" className="font-mono text-xs">Examples</Badge>
        <Heading level="h1">Build your own system with democrito</Heading>
        <P>
          democrito is a baseline, not a constraint. The token layer is the only branding
          surface — override CSS custom properties in <Code>src/index.css</Code> and every
          component in the system inherits the new identity. No component files touched. Three
          worked examples below, each starting from{" "}
          <Code>npx shadcn@latest add https://democrito.design/r/democrito.json</Code>.
        </P>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Section — The pattern                                                */}
      {/* ------------------------------------------------------------------ */}
      <Section label="The pattern">
        <P>
          Every customization follows the same five-step sequence. Steps 1–3 are CSS-only.
          Steps 4–5 update the AI context files so agents that read{" "}
          <Code>CLAUDE.md</Code> and <Code>DESIGN.md</Code> generate on-brand code from the
          first prompt.
        </P>
        <PatternTable />
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* Section — Example 1: AI prompt library                              */}
      {/* ------------------------------------------------------------------ */}
      <Section label="Example 1 — AI prompt library">
        <P>
          <strong className="font-semibold text-foreground">Profile:</strong>{" "}
          Prompt engineering workspace. Dark-first. Accent: deep violet. Typography:
          display mono to signal precision. No light theme needed — this tool lives in
          the terminal mindset.
        </P>

        <Step
          number={1}
          title="Install"
          caption="Pull the full system into a fresh Vite + React project."
          language="bash"
          code={`npx shadcn@latest add https://democrito.design/r/democrito.json`}
        />

        <Step
          number={2}
          title="Token overrides — violet dark"
          caption={
            <>
              All overrides live in one <Code>.dark</Code> block inside{" "}
              <Code>src/index.css</Code>. No component files touched.
            </>
          }
        >
          <StepCode language="css">{`/* src/index.css — add inside .dark { ... } */
--accent:             263 70% 58%;
--accent-foreground:  0 0% 98%;

/* surfaces — deeper than default to push violet forward */
--background:         263 15% 6%;
--surface:            263 12% 9%;
--card:               263 10% 12%;

/* borders — slightly violet-tinted */
--border:             263 20% 18%;
--input:              263 20% 18%;

/* muted — desaturated violet */
--muted:              263 10% 14%;
--muted-foreground:   263 15% 55%;`}</StepCode>
        </Step>

        <Step
          number={3}
          title="Font swap — display mono"
          caption="Override the three font-family tokens in the @theme block."
        >
          <StepCode language="css">{`/* src/index.css — inside @theme { ... } */
--font-display: "JetBrains Mono", ui-monospace, monospace;
--font-body:    "Inter", system-ui, sans-serif;
--font-mono:    "JetBrains Mono", ui-monospace, monospace;`}</StepCode>
        </Step>

        <Step
          number={4}
          title="Update CLAUDE.md"
          caption="Replace the product context block so AI agents generate on-brand code."
        >
          <StepCode language="markdown">{`## Product context
This is [prompt-library-name], an AI prompt engineering workspace.

**Theme:** Dark-first. No light toggle needed.
**Accent:** Deep violet — \`--accent: 263 70% 58%\` in \`.dark\`.
**Typography:** display + mono both use JetBrains Mono. Body uses Inter.
**Use case:** Dense, keyboard-driven UI. Prompt lists, version diffs,
  token counters, model selector. Everything mono-spaced and precise.

Apply the 3-surface hierarchy: background → surface → card.
Accent appears only on interactive primary actions and active states.`}</StepCode>
        </Step>

        <Step
          number={5}
          title="Update DESIGN.md"
          caption="Give the AI the visual language and taste layer."
        >
          <StepCode language="markdown">{`## Brand direction
Violet + dark-first. The UI should feel like a well-configured IDE:
capable, precise, and slightly opaque. Nothing decorative.

**Mood:** latent space, precision, depth. Not playful.
**Color role:** Violet accent surfaces hierarchy — it marks the thing
  you're acting on, not the surrounding system.
**Density:** tight. 4px base unit, compact card padding, no hero sections.
**Motion:** minimal. Transitions only on interactive state changes.
  No entrance animations.

The tool is invisible. The prompts are the product.`}</StepCode>
        </Step>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* Section — Example 2: Developer observability dashboard             */}
      {/* ------------------------------------------------------------------ */}
      <Section label="Example 2 — Developer observability dashboard">
        <P>
          <strong className="font-semibold text-foreground">Profile:</strong>{" "}
          Real-time metrics and trace viewer. Supports dark and light mode — the
          on-call engineer switches to light during war-room standups. Accent: electric
          blue. Dense data tables, sparklines, status badges.
        </P>

        <Step
          number={1}
          title="Install"
          language="bash"
          code={`npx shadcn@latest add https://democrito.design/r/democrito.json`}
        />

        <Step
          number={2}
          title="Token overrides — electric blue, both themes"
          caption={
            <>
              Define the accent in both <Code>.dark</Code> and <Code>.light</Code>.
              Surfaces stay near-neutral so charts read cleanly.
            </>
          }
        >
          <StepCode language="css">{`/* src/index.css — .dark { ... } */
--accent:             217 91% 60%;
--accent-foreground:  0 0% 98%;
--background:         220 14% 6%;
--surface:            220 12% 9%;
--card:               220 10% 12%;
--border:             220 18% 16%;
--muted:              220 10% 13%;
--muted-foreground:   220 12% 52%;

/* src/index.css — .light { ... } */
--accent:             217 91% 50%;
--accent-foreground:  0 0% 100%;
--background:         220 20% 97%;
--surface:            220 15% 94%;
--card:               0 0% 100%;
--border:             220 14% 86%;
--muted:              220 14% 91%;
--muted-foreground:   220 10% 44%;`}</StepCode>
        </Step>

        <Step
          number={3}
          title="Font swap — tabular numerics"
          caption="IBM Plex Mono renders tabular-nums by default — critical for aligned metric columns."
        >
          <StepCode language="css">{`/* src/index.css — @theme { ... } */
--font-display: "Inter", system-ui, sans-serif;
--font-body:    "Inter", system-ui, sans-serif;
--font-mono:    "IBM Plex Mono", ui-monospace, monospace;`}</StepCode>
        </Step>

        <Step
          number={4}
          title="Update CLAUDE.md"
        >
          <StepCode language="markdown">{`## Product context
This is [dashboard-name], a developer observability dashboard.

**Theme:** Dark + light. User-toggleable. Default: dark.
**Accent:** Electric blue — \`--accent: 217 91% 60%\` (dark) / \`217 91% 50%\` (light).
**Typography:** Inter for display/body. IBM Plex Mono for all metrics, traces,
  timestamps, and code values — tabular-nums critical.
**Use case:** High-density metric grids, trace waterfalls, error rate sparklines,
  status badges, and filterable log tables.

Surface hierarchy is strict: background → surface (sidebar, panels) → card
  (metric tiles, trace rows). Never skip a surface level.
Accent only on primary CTA and active filter chips.
Status colors (\`--destructive\`, \`--warning\`, custom \`--success\`) supplement
  accent — never replace it.`}</StepCode>
        </Step>

        <Step
          number={5}
          title="Theme toggle component"
          caption="Wire the existing dark/light class toggle — no new tokens needed."
        >
          <StepCode language="tsx">{`import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {isDark ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </Button>
  );
}`}</StepCode>
        </Step>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* Section — Example 3: Internal AI ops review platform               */}
      {/* ------------------------------------------------------------------ */}
      <Section label="Example 3 — Internal AI ops review platform">
        <P>
          <strong className="font-semibold text-foreground">Profile:</strong>{" "}
          Internal tooling for reviewing AI outputs, labeling responses, and managing
          evaluation queues. Warm dark — amber accent creates urgency without
          aggression. Used in long review sessions so the warm tones reduce eye strain.
        </P>

        <Step
          number={1}
          title="Install"
          language="bash"
          code={`npx shadcn@latest add https://democrito.design/r/democrito.json`}
        />

        <Step
          number={2}
          title="Token overrides — amber warm dark"
          caption={
            <>
              The warm default theme (<Code>:root</Code>) already leans amber — you
              only need to reinforce and deepen it.
            </>
          }
        >
          <StepCode language="css">{`/* src/index.css — override :root (warm default) */
--accent:             38 92% 50%;
--accent-foreground:  20 14% 8%;

/* warm-tinted darks */
--background:         25 12% 6%;
--surface:            25 10% 9%;
--card:               25 8% 12%;

/* borders — warm-tinted */
--border:             30 16% 18%;
--input:              30 16% 18%;

/* muted — desaturated amber */
--muted:              28 8% 13%;
--muted-foreground:   28 12% 52%;

/* radius — slightly softer for review context */
--radius: 0.5rem;`}</StepCode>
        </Step>

        <Step
          number={3}
          title="Font swap — editorial feel"
          caption="Freight Text for display headings softens the data density. Mono stays technical."
        >
          <StepCode language="css">{`/* src/index.css — @theme { ... } */
--font-display: "DM Sans", system-ui, sans-serif;
--font-body:    "DM Sans", system-ui, sans-serif;
--font-mono:    "Fira Code", ui-monospace, monospace;`}</StepCode>
        </Step>

        <Step
          number={4}
          title="Update CLAUDE.md"
        >
          <StepCode language="markdown">{`## Product context
This is [ops-review-name], an internal AI operations review platform.

**Theme:** Warm dark (\`:root\` override). No light mode.
**Accent:** Amber — \`--accent: 38 92% 50%\`. Use for label actions,
  approval buttons, and active queue items.
**Typography:** DM Sans (display + body) for editorial warmth.
  Fira Code (mono) for model output, eval scores, and JSON payloads.
**Use case:** Queue-driven review flows. Long-form AI output reading,
  side-by-side comparisons, label assignment, escalation routing.

Design for long sessions: generous line height on body text (\`leading-relaxed\`),
  card surfaces clearly separated from background.
Destructive actions (\`--destructive\`) for reject/flag. Amber accent for approve/pass.
Never use accent for passive information — only for the primary action in context.`}</StepCode>
        </Step>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* Section — What's next                                               */}
      {/* ------------------------------------------------------------------ */}
      <Section label="What's next">
        <P>
          The three examples above cover the full range of customization: a dark-only
          tool, a togglable dark/light dashboard, and a warm-tinted internal platform.
          Every change was CSS custom properties in <Code>src/index.css</Code> and
          updates to the two AI context files. No component source was modified.
        </P>
        <P>
          Go deeper with the reference docs and AI workflow guides:
        </P>
        <div className="rounded-md border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-surface">
                <th className="px-4 py-2.5 text-left font-mono text-2xs text-muted-foreground uppercase tracking-widest">
                  Resource
                </th>
                <th className="px-4 py-2.5 text-left font-mono text-2xs text-muted-foreground uppercase tracking-widest">
                  What you'll find
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border odd:bg-muted/30">
                <td className="px-4 py-3 font-mono text-xs align-top">
                  <Code>docs/theming.md</Code>
                </td>
                <td className="px-4 py-3 font-body text-xs text-muted-foreground align-top">
                  Full theming guide — surface hierarchy, accent rules, three-theme compliance,
                  and step-by-step token override patterns.
                </td>
              </tr>
              <tr className="border-b border-border odd:bg-muted/30">
                <td className="px-4 py-3 font-mono text-xs align-top">
                  <Code>docs/tokens.md</Code>
                </td>
                <td className="px-4 py-3 font-body text-xs text-muted-foreground align-top">
                  Complete token reference — every CSS custom property, its default value
                  across all three themes, and its semantic role.
                </td>
              </tr>
              <tr className="border-b border-border odd:bg-muted/30">
                <td className="px-4 py-3 font-mono text-xs align-top">
                  <Code>CLAUDE.md</Code> + <Code>AGENTS.md</Code>
                </td>
                <td className="px-4 py-3 font-body text-xs text-muted-foreground align-top">
                  AI + terminal workflow — how to configure coding agents to stay on-system,
                  generate compliant components, and run verification after every change.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>
    </div>
  );
}
