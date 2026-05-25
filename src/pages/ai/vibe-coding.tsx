import { PageMeta } from "@/components/PageMeta";
import { Badge } from "@/components/ui/badge";
import { Heading, Code } from "@/components/atoms";
import { Section, Note, P, StepCode } from "./_shared";

export default function VibeCodingPage() {
  return (
    <div className="space-y-10">
      <PageMeta
        title="Use democrito with Lovable, Replit & Google Stitch"
        description="Declarative theming — fork the repo in your vibe-coding tool of choice and prompt your visual direction. No repository setup required."
        path="/ai/vibe-coding"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "TechArticle",
          "name": "Use democrito with Lovable, Replit & Google Stitch",
          "description": "Declarative theming — fork the repo in your vibe-coding tool of choice and prompt your visual direction. No repository setup required.",
          "url": "https://democrito.design/ai/vibe-coding",
          "isPartOf": { "@type": "SoftwareApplication", "name": "democrito" },
        }}
      />

      <div className="space-y-3">
        <Badge variant="outline" className="font-mono text-xs">Vibe Coding</Badge>
        <Heading level="h1">Use democrito with Lovable, Replit &amp; Google Stitch</Heading>
        <P>
          Fork the repo in your vibe-coding tool of choice, paste the relevant prompt
          block, and describe your visual direction. No repository setup required.
        </P>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Section 1 — The Lovable prompt block                                */}
      {/* ------------------------------------------------------------------ */}
      <Section label="The Lovable prompt block">
        <P>
          Point your Lovable project to the live design system URL and paste this block
          into Workspace Knowledge or your project prompt. It carries the visual rules
          without requiring file attachments.
        </P>
        <StepCode language="prompt">{`Use democrito (the design system at https://democrito.design)
for all visual decisions. Key rules:
- 3 fonts: Plus Jakarta Sans (font-display) for titles, Satoshi (font-body)
  for body text, JetBrains Mono (font-mono) for ALL data and code content
- Colors: 95% neutral grays, single accent hue, semantic feedback colors
- 3-surface hierarchy: Background → Surface → Card
- Radix UI / shadcn/ui for all component primitives
- Warm theme is default (\`:root\`). Support Dark (\`.dark\`) and Light (\`.light\`) themes.`}</StepCode>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* Section 2 — Google Stitch                                           */}
      {/* ------------------------------------------------------------------ */}
      <Section label="Google Stitch">
        <Note label="What it is">
          <P>
            Stitch is Google Labs' AI-native UI design tool, powered by Gemini. It
            generates screens and components from natural-language prompts with
            Figma-compatible output and exported Tailwind/React code.
          </P>
        </Note>
        <Note label="What to know before starting">
          <P>
            <Code>DESIGN.md</Code> is Google's open-source format for encoding design
            systems as agent-readable plain text — democrito's{" "}
            <Code>DESIGN.md</Code> follows this format exactly. Stitch reads it
            natively as project context: import it once and every screen Stitch
            generates applies democrito's visual rules without you specifying them per
            prompt. Important: Stitch's export uses generic Tailwind classes. The
            visual output will be correct; the code always needs a token mapping pass.
          </P>
        </Note>
        <div className="space-y-4">
          <div className="space-y-1">
            <p className="font-display text-sm font-semibold">Step 1 — Import DESIGN.md</p>
            <P>
              Point Stitch at the raw GitHub URL for <Code>DESIGN.md</Code>. If
              you've customized democrito for a brand, use your fork's URL — not the
              upstream default.
            </P>
            <StepCode language="bash">{`https://raw.githubusercontent.com/mmorerasanchez/democrito/main/DESIGN.md`}</StepCode>
            <P>If you've forked and customized:</P>
            <StepCode language="bash">{`https://raw.githubusercontent.com/[your-username]/democrito/main/DESIGN.md`}</StepCode>
          </div>
          <div className="space-y-1">
            <p className="font-display text-sm font-semibold">Step 2 — Verify the import</p>
            <P>
              Before generating anything, confirm Stitch loaded the reasoning layer:
            </P>
            <StepCode language="prompt">{`What is the accent color in this design system, its HSL value, and its usage rule?`}</StepCode>
            <P>
              Expected: terracotta, approximately HSL(18° 65% 55%), reserved for
              primary CTAs and interactive links, 1 instance per screen maximum. If
              Stitch returns a generic color or omits the scarcity rule, re-paste the
              full <Code>DESIGN.md</Code> contents directly rather than using the URL
              — some configurations fetch at generation time rather than on import.
            </P>
          </div>
          <div className="space-y-1">
            <p className="font-display text-sm font-semibold">Step 3 — Generate with token language</p>
            <P>
              Use token names in your prompts, not visual descriptions. Reference list
              descriptions resolve aesthetic ambiguity that token language doesn't
              cover — include both.
            </P>
            <StepCode language="prompt">{`Design a data table layout for a log viewer.
IDE-grade, not consumer-grade. Dense and purposeful.
Closer to Linear or Raycast than to Stripe or Notion.

- Table container: bg-surface
- Table headers: font-mono text-xs uppercase tracking-widest text-muted-foreground
- Table cells: font-mono text-sm text-foreground
- Row hover: bg-accent-subtle
- Horizontal dividers only — no vertical column lines
- Selected row: bg-accent-subtle border-l-2 border-accent`}</StepCode>
          </div>
        </div>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* Section 3 — Replit system prompt snippet                            */}
      {/* ------------------------------------------------------------------ */}
      <Section label="Replit system prompt snippet">
        <P>
          Distilled for Replit's shorter prompt format. Paste into{" "}
          <Code>replit.md</Code> under a Design system section or include directly in
          your first prompt.
        </P>
        <StepCode language="prompt">{`Design system: monochromatic neutral grays with a single accent color.
3-surface hierarchy: Background → Surface → Card (never a 4th level).
Font roles: font-display for headings and buttons, font-body for prose,
font-mono for ALL data values, inputs, and user-editable content.
Copy uses sentence case throughout.
No decorative colors. Every color has a specific semantic function.`}</StepCode>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* Section 4 — The reference-by-URL pattern                            */}
      {/* ------------------------------------------------------------------ */}
      <Section label="The reference-by-URL pattern">
        <P>
          Any vibe-coding tool can use the live{" "}
          <Code>democrito.design</Code> showcase as a visual reference without file
          attachments. Include the URL directly in your prompt — most tools will fetch
          and parse the page on their own.
        </P>
        <StepCode language="prompt">{`Match the visual style at https://democrito.design — clean,
data-dense, monochromatic with a single accent color.`}</StepCode>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* Section 5 — Token mapping pass                                      */}
      {/* ------------------------------------------------------------------ */}
      <Section label="Token mapping pass — required after every generation">
        <P>
          Lovable, Stitch, and Replit all generate code with generic Tailwind utility
          classes — <Code>bg-neutral-900</Code>, <Code>text-orange-500</Code> — not
          democrito's semantic tokens. The visual output will look correct in the
          preview. The code always needs a mapping pass before it enters your project.
        </P>
        <P>
          Skip it and every component that gets edited or regenerated later will
          revert to generic values, breaking the semantic layer progressively. Apply
          this find/replace to every generation before committing:
        </P>
        <StepCode language="bash">{`Replace in generated code:

bg-neutral-*      → bg-background / bg-surface / bg-card  (match by visual depth)
border-neutral-*  → border-border
text-neutral-*    → text-foreground / text-muted-foreground
text-white        → text-foreground
text-orange-*     → text-accent
bg-orange-*       → bg-accent or bg-accent/10
font-sans         → font-display (headings) or font-body (prose)
font-mono         → font-mono (keep — already correct)

Flag any remaining hardcoded hex or rgb values.`}</StepCode>
      </Section>
    </div>
  );
}
