import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Heading, Text, Code } from "@/components/atoms";

// ---------------------------------------------------------------------------
// Internal: code block renderer — uses design-system tokens only
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

// ---------------------------------------------------------------------------
// Internal: info card (situation / what changes / real value)
// ---------------------------------------------------------------------------
function InfoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-border bg-card p-5 space-y-2">
      <p className="font-display text-xs font-semibold uppercase tracking-widest text-accent">{title}</p>
      <Text size="sm" variant="muted" className="leading-relaxed">{children}</Text>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Internal: challenge card — slightly elevated, full-width
// ---------------------------------------------------------------------------
function ChallengeCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-border bg-surface p-5 space-y-2">
      <p className="font-display text-xs font-semibold uppercase tracking-widest text-muted-foreground">The Challenge</p>
      <Text size="sm" variant="muted" className="leading-relaxed">{children}</Text>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Internal: implementation step
// ---------------------------------------------------------------------------
function Step({
  number,
  title,
  caption,
  language,
  code,
}: {
  number: number;
  title: string;
  caption?: string;
  language: string;
  code: string;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-start gap-3">
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/10 font-mono text-2xs font-bold text-accent mt-0.5">
          {number}
        </span>
        <div>
          <p className="font-display text-sm font-semibold">{title}</p>
          {caption && <Text size="xs" variant="muted" className="mt-0.5">{caption}</Text>}
        </div>
      </div>
      <div className="pl-9">
        <StepCode language={language}>{code}</StepCode>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function UseCasesPage() {
  return (
    <div className="space-y-20">
      {/* Page header */}
      <div className="space-y-2">
        <Heading level="h1">Use Cases</Heading>
        <Text size="lg" variant="muted" className="max-w-prose">
          Real projects. Real implementation decisions. Each guide covers the full journey — from the
          problem through the token overrides.
        </Text>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Persona 1 — Solo developer                                          */}
      {/* ------------------------------------------------------------------ */}
      <section id="solo-developer" className="space-y-8 scroll-mt-20">
        <div className="space-y-2">
          <Badge variant="outline" className="font-mono text-xs">Persona 1</Badge>
          <Heading level="h2">Solo developer building an AI tool</Heading>
          <Text variant="muted">Lovable + Claude Code · Violet accent · Dark-first · Mono-heavy</Text>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <InfoCard title="The Situation">
            A developer builds a prompt library app — users save, tag, and run prompts. Three weeks
            in: buttons look different between screens, the sidebar uses a different gray than the
            cards, fonts are inconsistent. Nothing is broken. Everything is slightly off. Fixing it
            means auditing every component manually.
          </InfoCard>
          <InfoCard title="What democrito Changes">
            Install via shadcn CLI. Every Lovable prompt and Claude Code generation reads{" "}
            <Code>CLAUDE.md</Code> and <Code>DESIGN.md</Code> first. The agent knows: use{" "}
            <Code>bg-surface</Code> not <Code>bg-gray-800</Code>, use <Code>font-mono</Code> for all
            user content, never add a fourth surface level. New generations land on-system by
            default. Existing inconsistencies resolve in a single Claude Code pass.
          </InfoCard>
          <InfoCard title="The Real Value">
            Visual consistency becomes a property of the toolchain, not a discipline the developer
            maintains manually. For a solo builder, that's the difference between a product that
            looks considered and one that looks AI-generated.
          </InfoCard>
        </div>

        <ChallengeCard>
          This only works if the developer installs democrito before significant UI is built — or is
          willing to do a token migration pass after. With three weeks of hardcoded values, the
          install doesn't fix anything retroactively. democrito requires buy-in at the start, or a
          refactor cost upfront. The value is real, but the adoption window is narrow.
        </ChallengeCard>

        <div className="space-y-6">
          <Heading level="h3">Implementation Guide</Heading>

          <Step
            number={1}
            title="Install democrito"
            caption="Drops 70+ CSS custom properties into your project and wires up Tailwind v4's @theme block. Root is warm by default — you'll override it in Step 2."
            language="bash"
            code={`npx shadcn@latest add https://raw.githubusercontent.com/mmorerasanchez/democrito/main/registry.json democrito`}
          />

          <Step
            number={2}
            title="Override tokens in src/index.css"
            caption="Replace :root entirely. You're overriding variables only — no component files touched. Violet (262 70% 62%) replaces terracotta. Wider right panel (26rem) for prompt preview context."
            language="css"
            code={`:root {
  --background: 240 12% 5%;
  --surface:    240  8% 9%;
  --card:       240  6% 14%;

  --foreground:        240 15% 96%;
  --muted-foreground:  240  6% 58%;
  --foreground-subtle: 240  4% 42%;

  --accent:            262 70% 62%;
  --accent-foreground: 0 0% 100%;
  --accent-muted:      262 45% 38%;
  --accent-subtle:     262 20% 12%;

  --primary:            240 15% 88%;
  --primary-foreground: 240 12% 5%;

  --secondary:            240 8% 18%;
  --secondary-foreground: 240 15% 96%;

  --muted:            240 8% 13%;
  --muted-foreground: 240 6% 58%;

  --border: 240 8% 22%;
  --input:  240 8% 18%;
  --ring:   262 70% 62%;

  --radius: 0.375rem;
  --sidebar-width: 13rem;
  --right-panel:   26rem;
}`}
          />

          <Step
            number={3}
            title="Update fonts"
            caption="Collapse display and body to Inter — maximises density for a code-editor feel. Keep JetBrains Mono for all prompt content."
            language="css"
            code={`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;700&display=swap');

@theme {
  --font-display: "Inter", system-ui, sans-serif;
  --font-body:    "Inter", system-ui, sans-serif;
  --font-mono:    "JetBrains Mono", Consolas, monospace;
}`}
          />

          <Step
            number={4}
            title="Update CLAUDE.md and DESIGN.md"
            caption="The step most developers skip and later regret. Without it, AI agents revert to terracotta and warm stone on the next generation."
            language="markdown"
            code={`## Design Tokens (this project's overrides)
- Accent: violet (\`--accent: 262 70% 62%\`) — not terracotta
- Theme: dark-first (\`:root\` is dark, no warm default)
- Radius: tight (\`--radius: 0.375rem\`)
- Font-display and font-body: Inter
- Font-mono: JetBrains Mono — ALL prompt content, variables, inputs
- Right panel: 26rem (wider than default — prompt preview context)`}
          />

          <Step
            number={5}
            title="Install shadcn components on top"
            caption="Components pick up your token overrides automatically. No additional configuration."
            language="bash"
            code={`npx shadcn@latest add button card input textarea badge separator`}
          />
        </div>
      </section>

      <Separator />

      {/* ------------------------------------------------------------------ */}
      {/* Persona 2 — Two-person startup                                      */}
      {/* ------------------------------------------------------------------ */}
      <section id="startup" className="space-y-8 scroll-mt-20">
        <div className="space-y-2">
          <Badge variant="outline" className="font-mono text-xs">Persona 2</Badge>
          <Heading level="h2">Two-person startup building a developer dashboard</Heading>
          <Text variant="muted">Blue accent · Professional dual-theme · Dark default + light opt-in</Text>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <InfoCard title="The Situation">
            Two engineers building an observability platform — logs, traces, metrics, query
            interface. No designer. Using shadcn/ui defaults: default theme, default radius, default
            slate grays. The product works. It also looks identical to fifty other dev tools built
            on shadcn defaults. A potential enterprise customer says during a demo: "looks like a
            prototype." They're not wrong.
          </InfoCard>
          <InfoCard title="What democrito Changes">
            Warm stone replaces slate grays. Terracotta replaces the default blue accent. The
            three-surface hierarchy gives dense data views genuine depth without visual complexity.
            The font stack — display for nav and headings, mono for all data values and table cells
            — immediately makes the product feel designed for reading data, not adapted from a
            generic template.
          </InfoCard>
          <InfoCard title="The Real Value">
            Visual differentiation at zero design headcount. For a two-person team in a crowded
            space, looking deliberate is a signal — to users, to investors, to the enterprise buyer
            comparing three tools. One CLI command and one theme pass.
          </InfoCard>
        </div>

        <ChallengeCard>
          The warm-industrial aesthetic is a bet. An enterprise buyer in financial services or
          healthcare might read "warm stone and terracotta" as quirky rather than professional.
          democrito is high-conviction on one aesthetic direction. If that direction doesn't match
          the product's context, the theming system helps, but it doesn't fully escape the
          warm-industrial bias.
        </ChallengeCard>

        <div className="space-y-6">
          <Heading level="h3">Implementation Guide</Heading>

          <Step
            number={1}
            title="Install democrito"
            caption="After install, your existing shadcn components shift to the warm default. You're about to override it — don't panic at the terracotta."
            language="bash"
            code={`npx shadcn@latest add https://raw.githubusercontent.com/mmorerasanchez/democrito/main/registry.json democrito`}
          />

          <Step
            number={2}
            title="Override tokens for dark default + light opt-in"
            caption="Cascade order in @layer base matters: :root first, .dark second, .light third."
            language="css"
            code={`/* :root — dark default */
:root {
  --background: 222 16% 6%;
  --surface:    222 12% 10%;
  --card:       222 10% 15%;

  --foreground:        210 20% 94%;
  --muted-foreground:  215 8% 55%;
  --foreground-subtle: 215 6% 40%;

  --accent:            217 91% 60%;
  --accent-foreground: 0 0% 100%;
  --accent-muted:      217 60% 35%;
  --accent-subtle:     217 20% 12%;

  --primary:            210 20% 88%;
  --primary-foreground: 222 16% 6%;

  --secondary:            222 10% 18%;
  --secondary-foreground: 210 20% 94%;

  --muted:            222 10% 13%;
  --muted-foreground: 215 8% 55%;

  --border: 222 10% 22%;
  --input:  222 10% 15%;
  --ring:   217 91% 60%;

  --radius: 0.5rem;
  --sidebar-width:      12.5rem;
  --sidebar-collapsed:  3.5rem;
}

/* .light — for enterprise customers preferring light mode */
.light {
  --background: 210 20% 98%;
  --surface:    210 15% 97%;
  --card:       0 0% 100%;

  --foreground:        222 20% 12%;
  --muted-foreground:  215 8% 45%;
  --foreground-subtle: 215 6% 60%;

  --accent:            217 85% 50%;
  --accent-foreground: 0 0% 100%;
  --accent-muted:      217 50% 70%;
  --accent-subtle:     217 30% 94%;

  --primary:            222 20% 12%;
  --primary-foreground: 210 20% 98%;

  --secondary:            210 12% 93%;
  --secondary-foreground: 222 20% 12%;

  --muted:            210 12% 93%;
  --muted-foreground: 215 8% 45%;

  --border: 215 10% 88%;
  --input:  215 10% 88%;
  --ring:   217 85% 50%;

  --radius: 0.5rem;
  --sidebar-width: 12.5rem;
}`}
          />

          <Step
            number={3}
            title="Update fonts"
            caption="Inter for everything structural. IBM Plex Mono for all data values — log lines, trace IDs, metrics, table cells, timestamps."
            language="css"
            code={`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;700&display=swap');

@theme {
  --font-display: "Inter", system-ui, sans-serif;
  --font-body:    "Inter", system-ui, sans-serif;
  --font-mono:    "IBM Plex Mono", Consolas, monospace;
}`}
          />

          <Step
            number={4}
            title="Update CLAUDE.md"
            caption="The mono font rule is the one AI agents violate most often. Being explicit prevents generated components from using font-body on metric values."
            language="markdown"
            code={`## Design Tokens (this project's overrides)
- Theme: dark default (\`:root\`), light opt-in (\`.light\` class on \`<html>\`)
- Accent: electric blue (\`--accent: 217 91% 60%\`) — not terracotta
- Radius: 0.5rem
- Font-display / font-body: Inter
- Font-mono: IBM Plex Mono — ALL data values, log output, trace IDs,
  metric numbers, table cells, timestamps
- Sidebar: 12.5rem (narrower — more canvas space for data)`}
          />

          <Step
            number={5}
            title="Theme toggle wiring"
            caption="democrito's cascade handles the rest. No additional CSS needed."
            language="tsx"
            code={`// Add to TopBar or settings panel
const toggleTheme = () => {
  document.documentElement.classList.toggle('light')
}`}
          />
        </div>
      </section>

      <Separator />

      {/* ------------------------------------------------------------------ */}
      {/* Persona 3 — Growth engineer                                         */}
      {/* ------------------------------------------------------------------ */}
      <section id="growth-engineer" className="space-y-8 scroll-mt-20">
        <div className="space-y-2">
          <Badge variant="outline" className="font-mono text-xs">Persona 3</Badge>
          <Heading level="h2">Growth engineer building an internal AI ops platform</Heading>
          <Text variant="muted">Amber accent · Dark warm · Optimised for sustained use</Text>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <InfoCard title="The Situation">
            A growth engineer at a 20-person company builds an internal tool: a dashboard where the
            team monitors AI-generated content, flags low-quality outputs, and manually reviews edge
            cases. Used eight hours a day by five people. The tool works but nobody enjoys using it.
            Sessions are tiring. Everything is the same visual weight — no hierarchy, no depth.
          </InfoCard>
          <InfoCard title="What democrito Changes">
            The 3-surface hierarchy gives reviewers a clear spatial map: sidebar is{" "}
            <Code>bg-surface</Code>, content area is <Code>bg-background</Code>, flagged items
            appear on <Code>bg-card</Code>. The <Code>font-mono</Code> for all AI-generated content
            creates immediate visual distinction from structural UI — the thing you're looking{" "}
            <em>at</em> versus the thing you're looking <em>through</em>.
          </InfoCard>
          <InfoCard title="The Real Value">
            Reduced cognitive load in sustained, high-density work sessions. This is the use case
            democrito is most specifically designed for — where the "IDE-inspired, not
            consumer-grade" principle cashes out in practice. The value is ergonomic, not aesthetic.
          </InfoCard>
        </div>

        <ChallengeCard>
          This value is hard to measure and harder to attribute. The engineer who builds this tool
          won't write "democrito reduced review fatigue" in a success metric — they'll just notice
          fewer complaints from the team. democrito currently has no evidence base beyond
          first-principles reasoning. For the positioning to be defensible at scale, this use case
          needs testimonials or measured outcomes.
        </ChallengeCard>

        <div className="space-y-6">
          <Heading level="h3">Implementation Guide</Heading>

          <Step
            number={1}
            title="Install democrito"
            caption="Out of the box, warm theme is already close to what you need. You're making targeted adjustments rather than a full override."
            language="bash"
            code={`npx shadcn@latest add https://raw.githubusercontent.com/mmorerasanchez/democrito/main/registry.json democrito`}
          />

          <Step
            number={2}
            title="Tune the warm theme for sustained reading"
            caption="Shifting warm default from light (cream) to darker warm is the single most impactful change for reducing review fatigue. The aesthetic stays warm-industrial; the surfaces become workstation-grade."
            language="css"
            code={`:root {
  /* Darker than default warm — reduces eye strain over long sessions */
  --background: 25 10% 12%;
  --surface:    25  8% 16%;
  --card:       25  6% 21%;

  --foreground:        30 12% 92%;
  --muted-foreground:  25  5% 58%;
  --foreground-subtle: 25  3% 42%;

  /* Amber — less aggressive than terracotta, better for attention states */
  --accent:            38 80% 55%;
  --accent-foreground: 25 10% 8%;
  --accent-muted:      38 50% 35%;
  --accent-subtle:     35 20% 16%;

  --primary:            30 12% 86%;
  --primary-foreground: 25 10% 8%;

  --secondary:            25 8% 22%;
  --secondary-foreground: 30 12% 92%;

  --muted:            25 8% 18%;
  --muted-foreground: 25 5% 58%;

  --border: 28 8% 28%;
  --input:  28 8% 22%;
  --ring:   38 80% 55%;

  --radius: 0.5rem;
  --sidebar-width: 13.5rem;
  --right-panel:   28rem;
}`}
          />

          <Step
            number={3}
            title="Update fonts"
            caption="Plus Jakarta Sans for structural labels. IBM Plex Sans for descriptions — slightly more readable at sustained reading distances. JetBrains Mono for all AI-generated content under review."
            language="css"
            code={`@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600&family=IBM+Plex+Sans:wght@400;500&family=JetBrains+Mono:wght@400;500;700&display=swap');

@theme {
  --font-display: "Plus Jakarta Sans", system-ui, sans-serif;
  --font-body:    "IBM Plex Sans", system-ui, sans-serif;
  --font-mono:    "JetBrains Mono", Consolas, monospace;
}`}
          />

          <Step
            number={4}
            title="Update CLAUDE.md"
            caption="The font-mono rule for reviewed content is specific to this tool's purpose — an AI agent won't infer it without explicit instruction."
            language="markdown"
            code={`## Design Tokens (this project's overrides)
- Theme: dark warm (\`:root\` overridden — darker surfaces than democrito default)
- Accent: amber (\`--accent: 38 80% 55%\`) — used for flagged/attention states
- Radius: 0.5rem
- Font-display: Plus Jakarta Sans (nav, headings, structural labels)
- Font-body: IBM Plex Sans (descriptions, filter labels, non-data text)
- Font-mono: JetBrains Mono — CRITICAL: all AI-generated content being
  reviewed MUST use font-mono. This creates visual separation between
  the tool's UI (which reviewers look through) and the content
  (which reviewers look at). Never use font-body for content under review.
- Right panel: 28rem (wider — review metadata lives here)`}
          />
        </div>
      </section>
    </div>
  );
}
