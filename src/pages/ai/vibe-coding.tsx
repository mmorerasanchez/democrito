import { PageMeta } from "@/components/PageMeta";
import { Badge } from "@/components/ui/badge";
import { Heading, Code } from "@/components/atoms";
import { Section, P, StepCode } from "./_shared";

export default function VibeCodingPage() {
  return (
    <div className="space-y-10">
      <PageMeta
        title="Use democrito with Lovable, Replit & Google Stitch"
        description="Declarative theming — fork the repo in your vibe-coding tool of choice and prompt your visual direction. No repository setup required."
        path="/ai/vibe-coding"
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
      {/* Section 2 — Replit system prompt snippet                            */}
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
      {/* Section 3 — The reference-by-URL pattern                            */}
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
    </div>
  );
}
