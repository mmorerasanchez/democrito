import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Heading, Text, Code } from "@/components/atoms";
import { CopyButton } from "@/components/atoms/CopyButton";

// ---------------------------------------------------------------------------
// Shared sub-components
// ---------------------------------------------------------------------------

function StepCode({ language, children }: { language: string; children: string }) {
  return (
    <div className="rounded-md border border-border overflow-hidden">
      <div className="flex items-center justify-between border-b border-border bg-surface px-4 py-1.5">
        <span className="font-mono text-2xs text-muted-foreground">{language}</span>
        <CopyButton
          variant="ghost"
          value={children}
          label="code"
          className="h-7 w-7 min-h-0 min-w-0 -mr-1 opacity-50 hover:opacity-100 transition-opacity"
        />
      </div>
      <pre className="overflow-x-auto bg-muted p-4">
        <code className="font-mono text-xs text-foreground whitespace-pre">{children}</code>
      </pre>
    </div>
  );
}

/** Labeled note block — used for "What it is" and "What to know before starting" */
function Note({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <p className="font-mono text-2xs uppercase tracking-widest text-muted-foreground">
        {label}
      </p>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

/** Inline paragraph inside a Note or Step explanation. */
function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-body text-sm leading-relaxed text-muted-foreground">{children}</p>
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
  caption?: React.ReactNode;
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
            <div className="mt-1 font-body text-xs leading-relaxed text-muted-foreground">
              {caption}
            </div>
          )}
        </div>
      </div>
      {(code || children) && (
        <div className="pl-9 space-y-3">
          {code && language && <StepCode language={language}>{code}</StepCode>}
          {children}
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
// Claude (all tools)
// ---------------------------------------------------------------------------

function ClaudePage() {
  return (
    <div className="space-y-10">
      {/* Page header */}
      <div className="space-y-3">
        <Badge variant="outline" className="font-mono text-xs">Anthropic</Badge>
        <Heading level="h1">Using democrito with Claude</Heading>
        <P>
          democrito ships 3 files that carry the system to any AI tool:{" "}
          <Code>CLAUDE.md</Code> (agent coding rules), <Code>DESIGN.md</Code> (the
          taste layer — visual philosophy and the why behind every decision), and{" "}
          <Code>src/index.css</Code> (the token layer — every color, spacing value,
          and font assignment as CSS custom properties). The instructions below are
          organized by Claude product. Each section starts with what the tool actually
          is, what it can and can't do, and then walks through the workflow in the
          correct order.
        </P>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Section 1 — Claude.ai                                               */}
      {/* ------------------------------------------------------------------ */}
      <Section label="Claude.ai">

        <Note label="What it is">
          <P>
            The web interface at claude.ai — no install, no local setup required.
            Claude can fetch the content of any public URL using its built-in tools.
            You can explore the system, ask questions about design decisions, generate
            components, and adapt the system for a new brand — all in the browser,
            before cloning anything.
          </P>
        </Note>

        <Note label="What to know before starting">
          <P>
            Claude does not automatically read every file in a repository from a
            single GitHub URL. It fetches what it's directed to. The GitHub web page
            at <Code>github.com/mmorerasanchez/democrito</Code> returns HTML — Claude
            can parse it, but it won't get file contents from it. The raw content
            URLs (<Code>raw.githubusercontent.com</Code>) return plain text that
            Claude reads immediately and completely.
          </P>
          <P>
            For democrito, 3 files carry everything Claude needs. Give it those 3,
            in that format.
          </P>
        </Note>

        <div className="space-y-6">
          <Step
            number={1}
            title="Share the core files"
            caption="Paste the following prompt exactly. It gives Claude the raw content URLs for all 3 files and asks it to confirm the 3 things you'll need it to know for every step after this."
            language="text"
            code={`I want to work with the democrito design system. Please fetch and read these 3 files:

- https://raw.githubusercontent.com/mmorerasanchez/democrito/main/CLAUDE.md
- https://raw.githubusercontent.com/mmorerasanchez/democrito/main/DESIGN.md
- https://raw.githubusercontent.com/mmorerasanchez/democrito/main/src/index.css

Once you've read them, confirm:
- What is the accent color, its HSL value, and its usage constraint?
- What are the 3 surface levels and when does each apply?
- What content must always use font-mono, and why?`}
          >
            <P>
              The 3 confirmation questions are not optional. They verify that Claude
              loaded the taste layer — the reasoning in <Code>DESIGN.md</Code> — not
              just the token values in <Code>src/index.css</Code>. A Claude that can
              explain why font-mono is required on data values will apply that rule
              correctly when it generates code. A Claude that only knows the value
              won't.
            </P>
            <P>
              If Claude's answer mentions terracotta, the 3-surface rule, and the mono
              contract, it loaded correctly. If it returns generic answers or describes
              a different accent color, re-send the raw URLs — Claude may have fetched
              the GitHub HTML page instead of the file contents.
            </P>
          </Step>

          <Step
            number={2}
            title="Extract the reasoning before you customize anything"
            caption="Before modifying the system, use Claude to surface the why behind each rule. This is a calibration step — it establishes that Claude is reasoning from the design philosophy, not just pattern-matching from the tokens."
            language="text"
            code={`From the files you just read:

- Why does font-mono appear on inputs, badges, table data, and KPI values — but not
  on button labels or nav items?
- What is the design philosophy behind using exactly 1 accent color per screen?
- Why does the surface hierarchy stop at 3 levels? What would a 4th surface create?`}
          >
            <P>
              These questions have specific answers in <Code>DESIGN.md</Code>. The
              font-mono answer is the mono contract: everything a user can edit, copy,
              or reference carries mono — it's a semantic signal, not a style choice.
              The accent answer is scarcity as meaning: one accent per screen means the
              accent always marks the single most important action. The 3-surface answer
              is depth without complexity: background → surface → card covers every real
              layout need, and a 4th surface creates ambiguity about hierarchy.
            </P>
            <P>
              If Claude can reconstruct that reasoning from the files it read, proceed.
              You're working with a model that understood the system.
            </P>
          </Step>

          <Step
            number={3}
            title="Customize the system for your brand"
            caption="Describe your brand in specific, measurable terms: an HSL value for the accent, a font name, one sentence of aesthetic intent. Vague descriptions produce vague mappings. Specific descriptions produce specific file changes."
            language="text"
            code={`I want to adapt democrito for a brand called [BrandName].

- Accent color: [your HSL value, e.g. hsl(220 70% 45%)]
- Body font: replace Satoshi with [your font name]
- Brand aesthetic: [one sentence — e.g. "precise, institutional, no warmth"]

Using the democrito system you just read:
1. Which exact lines in src/index.css need to change, and what are the updated values?
2. Which sections of DESIGN.md reference the accent color by name or value?
   Show me those sections with the changes applied.`}
          >
            <P>
              Ask for both files. <Code>src/index.css</Code> is the token layer — the
              values your components will actually render. <Code>DESIGN.md</Code> is
              the taste layer — the reasoning your future AI sessions will use to make
              decisions. If you update the tokens but not the taste layer, you'll get a
              system where the colors are right but the reasoning is wrong. Every
              subsequent generation will drift.
            </P>
          </Step>

          <Step
            number={4}
            title="Generate a component"
            caption={
              <>
                Use token names, not visual descriptions. "A blue button" gives Claude
                no system information.{" "}
                <Code>bg-accent text-accent-foreground font-display font-medium</Code>{" "}
                maps directly to the values Claude already loaded from{" "}
                <Code>src/index.css</Code> and carries the semantic layer — accent means
                primary action, font-display means structural label.
              </>
            }
            language="text"
            code={`Using the democrito design system you have loaded, create a React component called MetricCard.

Props: label (string), value (string), trend ("up" | "down" | "neutral").

Token assignments:
- Card container: bg-card border-border rounded-lg p-5
- label: font-display text-xs font-semibold uppercase tracking-widest text-muted-foreground
- value: font-mono text-2xl font-bold text-foreground
- trend up: font-mono text-xs text-success
- trend down: font-mono text-xs text-error
- trend neutral: font-mono text-xs text-muted-foreground

Rules: no dark: prefixes. No hardcoded colors. Maximum 3 surfaces.`}
          >
            <P>
              The <Code>value</Code> prop uses <Code>font-mono</Code> because a metric
              value is data — a number the user will read, copy, or reference. The{" "}
              <Code>label</Code> uses <Code>font-display</Code> because it's structural
              navigation. These are not style preferences; they're the mono contract. If
              you swap them, you've broken the system's semantic layer. Claude knows this
              from <Code>DESIGN.md</Code> — if it generates the component correctly, it
              applied the contract without being told.
            </P>
          </Step>

          <Step
            number={5}
            title="Save context to a Claude Project"
            caption={
              <>
                Create a Claude Project at claude.ai/projects. Paste the full contents
                of <Code>CLAUDE.md</Code> into the project instructions, then append the
                full contents of <Code>DESIGN.md</Code> below it.
              </>
            }
          >
            <P>
              Every future conversation in that project starts with the complete
              democrito context already loaded. No re-sharing URLs. No re-explaining the
              surface hierarchy. No re-stating the mono contract. The project
              instructions are the persistent context layer.
            </P>
            <P>
              Steps 1–4 are for exploration and one-off tasks. The Project is the
              correct long-term setup for any team building on democrito.
            </P>
          </Step>
        </div>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* Section 2 — Claude Design                                           */}
      {/* ------------------------------------------------------------------ */}
      <Section label="Claude Design">

        <Note label="What it is">
          <P>
            Claude Design generates visual artifacts — layouts, components, prototypes
            — from natural language, rendered directly in your workspace. The difference
            from Claude.ai is the output format and the context model: Claude.ai
            produces code; Claude Design produces rendered visuals. Claude Design also
            has a dedicated import mechanism for design system files — once imported,
            the system's constraints apply to every generation in your workspace
            without re-stating them.
          </P>
        </Note>

        <Note label="What to know before starting">
          <P>
            Claude Design needs 3 files for different reasons.{" "}
            <Code>src/index.css</Code> gives it the token values — the actual HSL
            numbers it needs to resolve <Code>text-accent</Code>,{" "}
            <Code>bg-card</Code>, and <Code>border-border</Code> to real colors.{" "}
            <Code>DESIGN.md</Code> gives it the taste layer — the philosophy it uses
            to resolve ambiguity when your prompt doesn't specify every detail.{" "}
            <Code>src/DESIGN_SYSTEM.md</Code> gives it the vocabulary — the component
            inventory, type scale, and usage rules. Import all 3. The token layer alone
            produces output with the right colors but wrong judgment. The taste layer
            alone produces thoughtful output in the wrong colors. Both are wrong.
          </P>
        </Note>

        <div className="space-y-6">
          <Step
            number={1}
            title="Import the design system"
            caption="During Claude Design onboarding, import these 3 files. The order matters: token layer first, then taste, then vocabulary."
            language="text"
            code={`Import: src/index.css         — the @theme block, all CSS custom properties
Import: DESIGN.md             — visual philosophy, the taste layer
Import: src/DESIGN_SYSTEM.md  — component inventory and usage rules`}
          />

          <Step
            number={2}
            title="Verify the import"
            caption="Before generating anything, confirm the import succeeded. The expected answer is specific."
            language="text"
            code={`What is the accent color in this design system — its name, its HSL value, and its usage rule?`}
          >
            <P>
              Expected: terracotta, approximately HSL(18° 65% 55%), reserved for
              primary CTAs and interactive links, 1 instance per screen maximum.
            </P>
            <P>
              If you get blue, generic orange, or an answer that omits the scarcity
              rule ("1 per screen maximum"), re-import <Code>src/index.css</Code>.
              Claude Design may have parsed the <Code>DESIGN.md</Code> description of
              the accent without extracting the actual CSS variable value. The{" "}
              <Code>@theme</Code> block in <Code>src/index.css</Code> is the
              authoritative source — if the import didn't reach it, the rendering will
              be wrong.
            </P>
          </Step>

          <Step
            number={3}
            title="Customize DESIGN.md for your brand"
            caption={
              <>
                <Code>DESIGN.md</Code> is the taste layer. Before generating components
                for a new brand, update it — otherwise every generation applies
                democrito's reasoning, not yours. The structural rules (3-surface
                hierarchy, mono contract, single accent) stay intact. The aesthetic
                choices (accent color, font names, atmospheric description) change.
              </>
            }
            language="text"
            code={`I want to adapt this design system for a brand called [BrandName].
Update DESIGN.md with these changes:

- Brand name: [BrandName]
- Accent: replace terracotta with [your color] — update the name, HSL value,
  and every reference to terracotta throughout the file
- Primary display font: replace Plus Jakarta Sans with [your font]
- Brand aesthetic: [one sentence]

Keep these rules unchanged: 3-surface hierarchy, font-mono for all data values
and user-editable content, single accent per screen.

Show me only the sections that change — not the full file.`}
          >
            <P>
              3 things must survive any brand customization unchanged: the 3-surface
              hierarchy, the mono contract, and the single-accent rule. These are
              structural, not aesthetic. They define how the system reasons about depth,
              data, and emphasis — they have nothing to do with which specific colors or
              fonts you use.
            </P>
          </Step>

          <Step
            number={4}
            title="Generate a visual component"
            caption={
              <>
                Use token language, not visual descriptions. "A clean card with a
                number" is ambiguous.{" "}
                <Code>bg-card border-border font-mono text-2xl text-foreground</Code>{" "}
                maps directly to what Claude Design extracted from your imported files
                — it knows exactly which surface, which weight, which font. The
                reference list in your prompt is not optional decoration — it's taste
                triangulation. Naming what the system is not ("closer to Linear or
                Raycast, not Stripe or Notion") gives Claude Design a vector to resolve
                aesthetic ambiguity that tokens don't cover.
              </>
            }
            language="text"
            code={`Design a dashboard metric card for a SaaS analytics product.

Layout: compact, data-dense. IDE-grade aesthetic — closer to Linear or Raycast
than to Stripe or Notion.

Token assignments:
- Card container: bg-card, border-border, rounded-lg
- Metric value: font-mono, text-2xl, text-foreground
- Label below value: font-display, text-sm, text-muted-foreground
- Trend indicator: font-mono text-xs — text-success for positive, text-error for negative
- 1 accent element: a small indicator badge using text-accent

Rules: no decorative colors. No gradients. Maximum 3 surfaces.`}
          />
        </div>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* Section 3 — Cowork                                                  */}
      {/* ------------------------------------------------------------------ */}
      <Section label="Cowork">

        <Note label="What it is">
          <P>
            Cowork is Anthropic's desktop tool for non-developers. It has persistent
            file access to a connected folder on your machine, session memory across
            conversations, and can read, edit, and write files without touching the
            terminal. The democrito customization workflow — reading context files,
            customizing them for a brand, generating a derived{" "}
            <Code>DESIGN_SYSTEM.md</Code> — maps exactly to what Cowork does well.
          </P>
        </Note>

        <Note label="What to know before starting">
          <P>
            Connect Cowork to the root of your democrito clone as the working folder.
            The 3 files Cowork needs to read at the start of every session are{" "}
            <Code>CLAUDE.md</Code>, <Code>DESIGN.md</Code>, and{" "}
            <Code>src/index.css</Code>. The 2 files it may write back are{" "}
            <Code>CLAUDE.md</Code> (product overrides) and{" "}
            <Code>DESIGN_SYSTEM.md</Code> (generated from the customized context).
            Never ask Cowork to edit <Code>src/index.css</Code> directly — token
            changes belong in a code editor or Claude Code, where lint and
            type-checking can catch errors.
          </P>
        </Note>

        <div className="space-y-6">
          <Step
            number={1}
            title="Connect and verify"
            caption="Start every session by asking Cowork to read the context files and confirm the system. Don't skip this. File access is persistent, but session context is not — Cowork does not remember the previous session's answers."
            language="text"
            code={`I'm working with the democrito design system.

Read CLAUDE.md and DESIGN.md from the connected folder, then confirm:
- What are the 3 surface levels and when does each apply?
- What is the accent color and its usage rule?
- What content must always use font-mono, and why?`}
          >
            <P>
              The 3 confirmation questions verify that Cowork loaded the reasoning
              layer. If it answers why font-mono is required — not just which elements
              use it, but the semantic signal it carries — it has the full{" "}
              <Code>DESIGN.md</Code> context and will reason correctly for the rest of
              the session.
            </P>
          </Step>

          <Step
            number={2}
            title="Customize CLAUDE.md for your product"
            caption={
              <>
                <Code>CLAUDE.md</Code> is the agent instruction file. Any AI tool that
                reads it applies its rules automatically. democrito ships a complete set
                of core rules. Add your product's overrides at the end, in a named
                block, without touching the core rules above it.
              </>
            }
            language="text"
            code={`I'm forking democrito for a product called [ProductName].

Add a product-specific block at the end of CLAUDE.md with these overrides:
- Product: [ProductName] — [one-line description]
- Accent: [your HSL value] — replaces terracotta. Update all references to terracotta
  in this block.
- Primary audience: [who uses this product]
- Additional constraint: [any rule specific to your product]

Keep all core democrito rules intact. Show me only the additions before writing.`}
          >
            <P>
              The separation matters structurally. Core rules at the top. Product
              overrides at the bottom, in a labeled block. When a new version of
              democrito ships, you merge upstream changes into the top without touching
              your product block. If you intermix them, future updates require manual
              diffing.
            </P>
            <P>
              Always review the proposed additions before Cowork writes them. The rules
              are: core rules untouched, product block clearly labeled, accent
              references consistent throughout.
            </P>
          </Step>

          <Step
            number={3}
            title="Generate DESIGN_SYSTEM.md from your customized context"
            caption={
              <>
                With <Code>CLAUDE.md</Code> and <Code>DESIGN.md</Code> customized for
                your brand, ask Cowork to generate the full component and token
                inventory. This is a derived document — generated from your 2 source
                files, not hand-authored. Treat it as a build artifact: always
                regenerable, never the source of truth.
              </>
            }
            language="text"
            code={`Using the customized CLAUDE.md and DESIGN.md for [ProductName] in the connected folder,
generate a DESIGN_SYSTEM.md that includes:

1. Token table — all CSS custom properties with their roles, grouped by category
   (surfaces, typography, accent, semantic, status). Accent values should reflect
   the [ProductName] brand, not the democrito defaults.
2. Font assignments — display / body / mono with the correct font names for [ProductName]
3. Component rules — inherited from the democrito core, with any product-specific
   additions from the CLAUDE.md product block

Format it as a markdown file. Save it to the root of the connected folder.`}
          />

          <Step
            number={4}
            title="Validate the generated output"
            caption={
              <>
                Before committing, ask Cowork to cross-check the generated{" "}
                <Code>DESIGN_SYSTEM.md</Code> against its source files.
              </>
            }
            language="text"
            code={`Compare the DESIGN_SYSTEM.md you just generated against CLAUDE.md and DESIGN.md.

Flag any inconsistencies:
- Token values in DESIGN_SYSTEM.md that don't match what's in CLAUDE.md or DESIGN.md
- Font assignments that contradict the font system
- Component rules that conflict with core democrito rules
- Any reference to the old accent color that should have been updated`}
          >
            <P>
              <Code>DESIGN_SYSTEM.md</Code> is a derivative. If the source files have
              internal tension — a description in <Code>DESIGN.md</Code> that doesn't
              match an override in your product block — the generated document will
              surface it. Fix the source, regenerate.
            </P>
          </Step>
        </div>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* Section 4 — Claude Code                                             */}
      {/* ------------------------------------------------------------------ */}
      <Section label="Claude Code">

        <Note label="What it is">
          <P>
            Claude Code is Anthropic's terminal-based AI assistant. It reads your
            entire local codebase, understands the file structure and import graph,
            and can create or modify components across multiple files in a single
            session.
          </P>
        </Note>

        <Note label="Why CLAUDE.md matters more here than anywhere else">
          <P>
            Claude Code auto-reads <Code>CLAUDE.md</Code> from the directory it's
            launched from. No context pasting. No URL sharing. No re-explaining the
            surface hierarchy at the start of every session. If <Code>CLAUDE.md</Code>{" "}
            is correct and you launch from the right directory, every session starts
            with the full system context already loaded. If you launch from the wrong
            directory, you get no context — and Claude Code will generate code that
            ignores every rule in the system.
          </P>
        </Note>

        <div className="space-y-6">
          <Step
            number={1}
            title="Install Claude Code"
            caption="Claude Code runs in your terminal. It requires Node.js 18 or higher. Install it globally; authenticate on first run."
            language="bash"
            code={`npm install -g @anthropic-ai/claude-code
claude   # opens the authentication flow on first run`}
          />

          <Step
            number={2}
            title="Fork, clone, and install"
            caption="Fork the repository on GitHub before cloning — you need your own copy to customize. Then clone your fork and install dependencies."
            language="bash"
            code={`# Fork on GitHub first, then:
git clone https://github.com/your-username/democrito.git
cd democrito/app-democrito
npm install`}
          >
            <P>
              The working directory for all component work is{" "}
              <Code>app-democrito/</Code>. This is where <Code>CLAUDE.md</Code> lives,
              where the component tree lives, and where Claude Code must be launched.
              The repo root contains documentation and configuration — not components.
            </P>
          </Step>

          <Step
            number={3}
            title="Start the dev server"
            caption="Open a terminal tab for the dev server and leave it running for the entire session. It hot-reloads on every save."
            language="bash"
            code={`npm run dev
# Component gallery, token viewer, and theme switcher at http://localhost:5173`}
          >
            <P>
              The showcase at <Code>localhost:5173</Code> is the ground truth for
              visual output. Every component you generate or modify will appear there
              immediately. Keep it open alongside Claude Code.
            </P>
          </Step>

          <Step
            number={4}
            title="Launch Claude Code from the correct directory"
            caption={
              <>
                Open a second terminal tab. <Code>cd</Code> into{" "}
                <Code>app-democrito</Code> before running <Code>claude</Code>. The
                launch directory is what determines which <Code>CLAUDE.md</Code> Claude
                Code reads. This is the single most common error — launching from the
                repo root instead of <Code>app-democrito/</Code> means Claude Code gets
                no design system context.
              </>
            }
            language="bash"
            code={`# In a new terminal tab:
cd democrito/app-democrito
claude`}
          />

          <Step
            number={5}
            title="Verify context, then build"
            caption="Every session starts with a verification prompt. Claude Code reads CLAUDE.md automatically, but you confirm it loaded the right rules before generating anything. Include the verification and the build request in the same prompt — Claude Code will answer the verification first, then proceed to the build."
            language="text"
            code={`[verify] What is the accent color and its usage rule, the 3 surface levels,
and which content must use font-mono in this design system?

[build] Create an atom called PriceBadge.
Props: price (string), currency ("USD" | "EUR" | "GBP"), variant ("default" | "accent").

Token assignments:
- Container: font-mono text-sm font-semibold rounded-full px-3 py-1
- default: bg-muted text-foreground
- accent: bg-accent/10 text-accent

Export from src/components/atoms/index.ts. Run lint after.`}
          >
            <P>
              If the verification answer is correct — terracotta, 3 surfaces in the
              right order, mono contract stated — proceed. If it returns anything
              inconsistent with what <Code>CLAUDE.md</Code> specifies, stop. Check
              which directory you launched from. Relaunch from{" "}
              <Code>app-democrito/</Code>.
            </P>
            <P>After any code changes, run the full check:</P>
            <StepCode language="bash">{`npm run lint && npm run test`}</StepCode>
            <P>Visual regression tests are available separately for UI changes:</P>
            <StepCode language="bash">{`npm run test:visual
# npm run test:visual:update   — to update snapshots after intentional changes`}</StepCode>
            <P>
              Run <Code>test:visual</Code> before opening any pull request that
              modifies component output.
            </P>
            <P>
              Never commit directly to <Code>main</Code>. Create a feature branch (
              <Code>feat/</Code>, <Code>fix/</Code>, <Code>chore/</Code>), commit
              there, then open a pull request.
            </P>
          </Step>
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
cd democrito/app-democrito
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
          caption="Five accent tokens must update in sync. Fonts require three changes in src/index.css. See the Theming guide for full examples."
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

      {/* Section 1 — Lovable */}
      <Section label="Lovable">
        <Text variant="muted">
          Direct GitHub sync. <Code>CLAUDE.md</Code> reads automatically when
          connected — no pasting needed. Two-tier knowledge separates global
          democrito rules from per-product overrides.
        </Text>

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
bg-neutral-*     → bg-background / bg-surface / bg-card  (match by visual role)
border-neutral-* → border-border
text-neutral-*   → text-foreground / text-muted-foreground / text-foreground-subtle
text-white       → text-foreground
text-orange-*    → text-accent
bg-orange-*      → bg-accent / bg-accent/10
font-sans        → font-display (headings) or font-body (prose)`}
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
bg-neutral-*   → bg-surface or bg-card
text-neutral-* → text-foreground or text-muted-foreground
text-green-*   → text-success
text-red-*     → text-error
text-orange-*  → text-accent`}
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
