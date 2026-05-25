import { PageMeta } from "@/components/PageMeta";
import { Badge } from "@/components/ui/badge";
import { Heading, Code } from "@/components/atoms";
import { Section, Note, P, StepCode } from "./_shared";

export default function ClaudePage() {
  return (
    <div className="space-y-10">
      <PageMeta
        title="Use democrito with Claude"
        description="Natural language theming workflow — attach design-tokens.json as context, describe your brand, and let Claude generate a new theme. No terminal needed."
        path="/ai/claude"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "TechArticle",
          "name": "Use democrito with Claude",
          "description": "Natural language theming workflow — attach design-tokens.json as context, describe your brand, and let Claude generate a new theme. No terminal needed.",
          "url": "https://democrito.design/ai/claude",
          "isPartOf": { "@type": "SoftwareApplication", "name": "democrito" },
        }}
      />

      <div className="space-y-3">
        <Badge variant="outline" className="font-mono text-xs">Anthropic</Badge>
        <Heading level="h1">Use democrito with Claude</Heading>
        <P>
          Attach three files, describe your brand, and let Claude generate a new theme.
          No terminal, no local setup — the entire workflow runs in the browser.
        </P>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Section 1 — Read the file, not the page                             */}
      {/* ------------------------------------------------------------------ */}
      <Section label="Read the file, not the page">
        <P>
          Claude can fetch the content of any public URL — but the GitHub page at{" "}
          <Code>github.com/mmorerasanchez/democrito</Code> returns HTML, not file
          contents. Claude can parse it, but it won't extract the files you need.
          The raw content URLs at <Code>raw.githubusercontent.com</Code> return plain
          text that Claude reads immediately and completely.
        </P>
        <P>
          For democrito, these are the three raw URLs that carry everything Claude
          needs:
        </P>
        <StepCode language="bash">{`https://raw.githubusercontent.com/mmorerasanchez/democrito/main/CLAUDE.md
https://raw.githubusercontent.com/mmorerasanchez/democrito/main/DESIGN.md
https://raw.githubusercontent.com/mmorerasanchez/democrito/main/src/index.css`}</StepCode>
        <P>
          Paste these URLs (not the GitHub page URL) when sharing context with
          Claude.ai or Claude Design. If you've forked the repo, replace{" "}
          <Code>mmorerasanchez</Code> with your GitHub username.
        </P>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* Section 2 — Verify the reasoning, not just the values               */}
      {/* ------------------------------------------------------------------ */}
      <Section label="Verify the reasoning, not just the values">
        <P>
          Before customizing anything, confirm Claude loaded the reasoning layer —
          not just the token values. Ask it to explain why the rules exist. A Claude
          that can explain why <Code>font-mono</Code> is required on data values will
          apply that rule correctly when generating code. A Claude that only knows
          the value won't.
        </P>
        <P>
          Paste this calibration prompt immediately after sharing the three files:
        </P>
        <StepCode language="prompt">{`From the files you just read:
- Why does font-mono appear on inputs, badges, table data, and KPI values —
  but not on button labels or nav items?
- What is the design philosophy behind using exactly 1 accent color per screen?
- Why does the surface hierarchy stop at 3 levels? What would a 4th surface create?`}</StepCode>
        <P>
          These questions have specific answers in <Code>DESIGN.md</Code>. The{" "}
          <Code>font-mono</Code> answer is the mono contract: everything a user can
          edit, copy, or reference carries mono — it's a semantic signal, not a style
          choice.
        </P>
        <P>
          The accent answer is scarcity as meaning: one accent per screen means the
          accent always marks the single most important action.
        </P>
        <P>
          The 3-surface answer is depth without complexity: background → surface →
          card covers every real layout need, and a 4th level creates ambiguity about
          hierarchy.
        </P>
        <P>
          If Claude's answers mention those concepts, it loaded correctly and will
          reason correctly for the rest of the session. If it returns generic answers,
          re-send the raw URLs — it likely fetched the HTML page instead.
        </P>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* Section 3 — What to attach as context                               */}
      {/* ------------------------------------------------------------------ */}
      <Section label="What to attach as context">
        <div className="space-y-4">
          <div className="space-y-1">
            <p className="font-display text-sm font-semibold">
              <Code>design-tokens.json</Code>
            </p>
            <P>
              W3C DTCG format. Gives Claude every token name, its value in all three
              themes, and the hierarchical structure so it can reason about changes
              without reading CSS.
            </P>
          </div>
          <div className="space-y-1">
            <p className="font-display text-sm font-semibold">
              <Code>src/index.css</Code>
            </p>
            <P>
              The live token source. Contains the <Code>@theme</Code> block, all three
              theme overrides, and keyframe definitions — needed when Claude is asked to
              write or verify CSS output.
            </P>
          </div>
          <div className="space-y-1">
            <p className="font-display text-sm font-semibold">
              <Code>CLAUDE.md</Code>
            </p>
            <P>
              Agent coding rules, atomic design architecture, naming conventions, and
              verification commands. Scopes Claude to on-system patterns from the first
              message.
            </P>
          </div>
        </div>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* Section 2 — System prompt pattern for theming                       */}
      {/* ------------------------------------------------------------------ */}
      <Section label="System prompt pattern for theming">
        <P>
          Use this pattern when asking Claude to generate a new theme. Attach the two
          CSS files first, then describe your brand direction.
        </P>
        <StepCode language="prompt">{`I'm building [product]. Attach design-tokens.json and src/index.css.
Please generate a new theme with [brand direction].
Preserve the 3-surface hierarchy and the monochromatic principle.
Output only the changed CSS custom property values.`}</StepCode>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* Section 3 — Claude Projects setup                                   */}
      {/* ------------------------------------------------------------------ */}
      <Section label="Claude Projects setup">
        <P>
          Create a Claude Project at claude.ai/projects and add the democrito context
          files as Project knowledge. Every conversation in that project starts with
          the full design system context already loaded — no re-attaching files, no
          re-explaining the surface hierarchy.
        </P>
        <Note label="Files to add to Project knowledge">
          <P>
            Add <Code>CLAUDE.md</Code>, <Code>DESIGN.md</Code>, and{" "}
            <Code>design-tokens.json</Code> to the Project files. For the deepest
            context, also add the <Code>docs/</Code> folder — it contains the theming
            guide, token reference, and component rules as separate readable documents.
          </P>
        </Note>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* Section 4 — Example prompt                                          */}
      {/* ------------------------------------------------------------------ */}
      <Section label="Example prompt">
        <P>
          Concrete, specific prompts produce precise output. Name the token you want
          to change, give the direction, and constrain what must stay the same.
        </P>
        <StepCode language="prompt">{`Change the accent to electric blue, keep the warm theme earth tones,
increase border radius to 0.75rem`}</StepCode>
      </Section>
    </div>
  );
}
