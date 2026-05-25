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
      {/* Section 1 — What to attach as context                               */}
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
