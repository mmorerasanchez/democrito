import { PageMeta } from "@/components/PageMeta";
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
    <div className="rounded-md border border-border bg-surface p-5 space-y-3">
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
      <PageMeta
        title="Using democrito with Claude"
        description="Workflow for Claude.ai, Claude Code, Cowork, and Claude Design — three-file context layer for every Claude surface."
        path="/ai/claude"
      />
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
    <div className="space-y-10">
      <PageMeta
        title="democrito on GitHub"
        description="Fork, customise, contribute. Instruction file ecosystem — CLAUDE.md, AGENTS.md, GEMINI.md — and the design context layer."
        path="/ai/github"
      />
      {/* Page header */}
      <div className="space-y-3">
        <Badge variant="outline" className="font-mono text-xs">Open Source</Badge>
        <Heading level="h1">democrito on GitHub</Heading>
        <P>
          democrito ships 4 context files that carry the design system to any AI tool:{" "}
          <Code>CLAUDE.md</Code> (agent coding rules and architecture),{" "}
          <Code>DESIGN.md</Code> (taste layer — visual philosophy and the why behind every
          decision), <Code>src/DESIGN_SYSTEM.md</Code> (component inventory and usage
          rules), and <Code>src/index.css</Code> (all CSS custom properties across the 3
          themes). Fork the repo and these files come with it.
        </P>
        <P>
          The design context files (<Code>DESIGN.md</Code>,{" "}
          <Code>src/DESIGN_SYSTEM.md</Code>, <Code>src/index.css</Code>) are the
          vocabulary layer — they don't change per tool. The instruction files (
          <Code>CLAUDE.md</Code> and what you add from the ecosystem below) are the agent
          layer — they tell each specific tool how to work with the system.
        </P>
      </div>

      {/* Steps */}
      <div className="space-y-10">

        <Section label="Setup">
        {/* ---------------------------------------------------------------- */}
        {/* Step 1 — Fork and clone                                          */}
        {/* ---------------------------------------------------------------- */}
        <Step
          number={1}
          title="Fork and clone"
          caption={
            <>
              Fork on GitHub first — you need your own copy before customizing. The
              shadcn registry install (<Code>npx shadcn@latest add</Code>) drops the AI
              context files into an existing project in one command and is the right path
              if you're integrating into an app you already own. Forking the full repo is
              the right path if you want to browse the system, customize the base tokens,
              or contribute.
            </>
          }
          language="bash"
          code={`# Fork on GitHub first, then:
git clone https://github.com/your-username/democrito.git
cd democrito/app-democrito
npm install
npm run dev   # component showcase at localhost:5173`}
        >
          <P>
            democrito follows semantic versioning. Patch releases (<Code>v3.0.x</Code>)
            are safe to pull. Minor releases (<Code>v3.x.0</Code>) may add tokens — check
            the changelog before updating. Major releases signal breaking changes.
          </P>
        </Step>
        </Section>

        <Section label="The instruction layer">
        {/* ---------------------------------------------------------------- */}
        {/* Step 2 — Instruction file ecosystem                              */}
        {/* ---------------------------------------------------------------- */}
        <Step
          number={2}
          title="Understand the instruction file ecosystem"
          caption="This is the section that matters most for an AI-native design system. The AI tooling landscape has consolidated around a small set of instruction file formats, and a repository built for AI-native development should ship with — or at minimum document — the right files for each tool."
        >
          {/* Landscape table */}
          <Note label="The current landscape">
            <P>
              Every major AI coding tool reads a configuration file from your project root
              before doing anything:
            </P>
            <div className="overflow-x-auto rounded-md border border-border">
              <table className="w-full font-mono text-xs">
                <thead>
                  <tr className="border-b border-border bg-surface">
                    <th className="px-4 py-2.5 text-left font-semibold text-foreground">File</th>
                    <th className="px-4 py-2.5 text-left font-semibold text-foreground">Tool(s)</th>
                    <th className="px-4 py-2.5 text-left font-semibold text-foreground">Location</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr className="bg-card">
                    <td className="px-4 py-2.5 text-accent"><Code>CLAUDE.md</Code></td>
                    <td className="px-4 py-2.5 text-muted-foreground">Claude Code (primary)</td>
                    <td className="px-4 py-2.5 text-muted-foreground">Project root, <Code>~/.claude/</Code>, any subdirectory</td>
                  </tr>
                  <tr className="bg-card">
                    <td className="px-4 py-2.5 text-accent"><Code>AGENTS.md</Code></td>
                    <td className="px-4 py-2.5 text-muted-foreground">Universal — Codex CLI, Cursor, Gemini CLI, Windsurf, Aider, goose, Devin, Jules, Junie, and 20+ more</td>
                    <td className="px-4 py-2.5 text-muted-foreground">Project root + subdirectories (nearest wins)</td>
                  </tr>
                  <tr className="bg-card">
                    <td className="px-4 py-2.5 text-accent"><Code>GEMINI.md</Code></td>
                    <td className="px-4 py-2.5 text-muted-foreground">Gemini CLI (primary)</td>
                    <td className="px-4 py-2.5 text-muted-foreground">Project root, <Code>~/.gemini/</Code></td>
                  </tr>
                  <tr className="bg-card">
                    <td className="px-4 py-2.5 text-accent"><Code>.github/copilot-instructions.md</Code></td>
                    <td className="px-4 py-2.5 text-muted-foreground">GitHub Copilot</td>
                    <td className="px-4 py-2.5 text-muted-foreground"><Code>.github/</Code> directory</td>
                  </tr>
                  <tr className="bg-card">
                    <td className="px-4 py-2.5 text-accent"><Code>.cursor/rules/*.mdc</Code></td>
                    <td className="px-4 py-2.5 text-muted-foreground">Cursor (current format)</td>
                    <td className="px-4 py-2.5 text-muted-foreground"><Code>.cursor/rules/</Code> directory</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <P>
              Claude Code reads <Code>CLAUDE.md</Code> as its primary file and falls back
              to <Code>AGENTS.md</Code> if no <Code>CLAUDE.md</Code> exists in the
              directory. This means the two formats co-exist cleanly:{" "}
              <Code>CLAUDE.md</Code> for Claude-specific additions,{" "}
              <Code>AGENTS.md</Code> as the single source of truth for everything else.
            </P>
            <P>
              <Code>AGENTS.md</Code> is the closest thing to a universal standard —
              originated by OpenAI Codex (August 2025), now stewarded by the Linux
              Foundation's Agentic AI Foundation alongside Anthropic's MCP. It's in
              60,000+ open-source repositories and natively supported by every tool listed
              above.
            </P>
          </Note>

          {/* What democrito ships */}
          <Note label="What democrito ships">
            <P>
              democrito ships <Code>CLAUDE.md</Code> at the repo root. It covers the full
              atomic architecture, token rules, naming conventions, 3-theme compliance,
              and verification commands — everything Claude Code needs from the first
              session.
            </P>
          </Note>

          {/* What to add */}
          <Note label="What to add for the full ecosystem">
            <P>
              If you use tools beyond Claude Code, add <Code>AGENTS.md</Code> at the repo
              root. The practical approach: have <Code>CLAUDE.md</Code> contain the
              Claude-specific additions (MCP tools, Claude Code-specific behaviour), and
              have <Code>AGENTS.md</Code> carry the shared core rules that every tool
              needs.
            </P>
            <P>A minimal <Code>AGENTS.md</Code> for a democrito fork:</P>
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
- Colors: semantic tokens only — never bg-gray-*, text-white, dark: overrides, or hardcoded hex/rgb
- Every new token must be defined in all 3 themes: :root (warm), .dark, .light
## Conventions
- PascalCase filenames, one component per file
- Named exports only, barrel index.ts at each atomic level
- TypeScript strict mode, explicit props interface with JSDoc on every component
- Never commit directly to main — feature branches (feat/, fix/, chore/) + PR
## Verification
Run after every change: \`npm run lint && npm run test\``}</StepCode>
            <P>
              For GitHub Copilot, add{" "}
              <Code>.github/copilot-instructions.md</Code>. Its glob-scoped variant (
              <Code>.github/instructions/*.instructions.md</Code> with an{" "}
              <Code>applyTo</Code> frontmatter field) is useful for splitting component
              rules from token rules if your team builds heavily with Copilot.
            </P>
            <P>
              For local-only overrides you don't want committed — personal tool paths,
              experiment flags, machine-specific settings — use{" "}
              <Code>AGENTS.override.md</Code> in the same directory and add it to{" "}
              <Code>.gitignore</Code>.
            </P>
          </Note>

          {/* Directory hierarchy */}
          <Note label="The directory hierarchy">
            <P>
              For monorepos and projects with a subdirectory structure, place a second
              instruction file inside the component directory for scoped context. The
              nearest file to the file being edited wins:
            </P>
            <StepCode language="text">{`democrito/
├── AGENTS.md               ← repo-level: setup, contribution workflow, versioning
├── CLAUDE.md               ← Claude-specific additions (references AGENTS.md)
├── DESIGN.md               ← taste layer (design philosophy)
├── .github/
│   └── copilot-instructions.md
└── app-democrito/
    ├── AGENTS.md           ← component-level (optional): atomic rules, token rules, verify commands
    └── src/
        ├── index.css
        └── DESIGN_SYSTEM.md`}</StepCode>
          </Note>
        </Step>

        {/* ---------------------------------------------------------------- */}
        {/* Step 3 — Design context files                                    */}
        {/* ---------------------------------------------------------------- */}
        <Step
          number={3}
          title="Explore the design context files"
          caption="Separate from the instruction files, democrito ships 3 design context files. These carry the visual system — not the agent rules."
        >
          <Note label="DESIGN.md — the taste layer">
            <P>
              Documents the visual philosophy: why the system uses 3 surfaces instead of
              4, why the accent is scarce, what the mono contract is and why it exists.
              This is what separates a design system from a stylesheet — it gives AI tools
              the reasoning, not just the values.
            </P>
          </Note>
          <Note label="src/index.css — the token layer">
            <P>
              Every color, spacing value, radius, and font assignment as CSS custom
              properties, defined across all 3 themes (<Code>:root</Code> for warm
              default, <Code>.dark</Code>, <Code>.light</Code>). This is the source of
              truth for rendered output.
            </P>
          </Note>
          <Note label="src/DESIGN_SYSTEM.md — the vocabulary layer">
            <P>
              The full component inventory, type scale matrix, usage rules, and
              anti-patterns. Generated from the source files — treat it as a build
              artifact, regenerable when the source changes.
            </P>
          </Note>
          <P>
            Understanding how these 3 files relate to each other, and to the instruction
            files above, is the fastest way to understand the whole system.
          </P>
        </Step>
        </Section>

        <Section label="Brand and contribution">
        {/* ---------------------------------------------------------------- */}
        {/* Step 4 — Customize for your brand                                */}
        {/* ---------------------------------------------------------------- */}
        <Step
          number={4}
          title="Customize for your brand"
          caption="democrito is built for zero-effort theming. The token layer (src/index.css) is the only file that requires code changes for a full rebrand. The design context files (DESIGN.md, src/DESIGN_SYSTEM.md) need prose updates to keep the reasoning consistent with the new values."
        >
          <Note label="5 accent tokens must update in sync">
            <P>
              Updating only <Code>--accent</Code> and missing the others will produce
              partially broken hover states, focus rings, and sidebar highlights:
            </P>
            <StepCode language="bash">{`# In src/index.css, update all 5 in the :root block:
# --accent
# --accent-muted
# --ring
# --sidebar-primary
# --sidebar-ring
#
# Repeat for .dark and .light — all 3 themes, every time.
# Skip one and theme switching partially breaks.`}</StepCode>
          </Note>
          <Note label="Fonts require 3 changes in src/index.css">
            <P>
              Not just the <Code>@theme</Code> block values. The <Code>@import</Code>{" "}
              URLs at the top of the file must point to your fonts' CDN location. Update
              both or the font will fall back silently.
            </P>
          </Note>
          <P>
            After updating <Code>src/index.css</Code>, propagate the new brand values to
            the reasoning layer: update <Code>DESIGN.md</Code> to replace all references
            to the old accent name and HSL value, update your <Code>AGENTS.md</Code> if
            it references the old token values, and regenerate{" "}
            <Code>src/DESIGN_SYSTEM.md</Code> from the updated context.
          </P>
          <P>
            If you're using <Code>AGENTS.override.md</Code> for local
            customization work-in-progress that's not ready to commit, add it to{" "}
            <Code>.gitignore</Code>:
          </P>
          <StepCode language="bash">{`echo "AGENTS.override.md" >> .gitignore`}</StepCode>
          <P>
            The theming guide at <Code>docs/theming.md</Code> in the repo covers the full
            walkthrough with before/after examples for accent and font changes.
          </P>
        </Step>

        {/* ---------------------------------------------------------------- */}
        {/* Step 5 — Contribute                                              */}
        {/* ---------------------------------------------------------------- */}
        <Step
          number={5}
          title="Contribute a component or token"
          caption="Open an issue first to align on atomic level and token scope before writing code. The most common avoidable PR rejection is a component that uses hardcoded colors or defines tokens only in the warm theme."
          language="text"
          code={`1.  Classify atomic level: atom / molecule / organism / template
2.  Create file: src/components/<level>/YourComponent.tsx
3.  Define TypeScript props interface with JSDoc on every prop
4.  Use semantic tokens only — no hardcoded colors, spacing, or radii
5.  Follow the 3-font rule: font-display / font-body / font-mono
6.  Define any new tokens in all 3 theme blocks: :root, .dark, .light
7.  Export from the level's index.ts barrel
8.  Update src/DESIGN_SYSTEM.md with the new component entry
9.  Run: npm run lint && npm run test && npm run test:visual
10. Submit PR: feat(<level>): add YourComponent`}
        >
          <P>
            The 3-theme rule in step 6 is the most common contributor error. Adding a
            token to <Code>:root</Code> only breaks theme switching for every user on dark
            or light mode. Claude Code can run the update across all 3 blocks in one
            prompt if you specify which token to change — ask it to "add{" "}
            <Code>--token-name: value</Code> to all 3 theme blocks in{" "}
            <Code>src/index.css</Code>" rather than editing manually.
          </P>
        </Step>
        </Section>

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
      <PageMeta
        title="Using democrito with Vibe Coding Tools"
        description="Drop-in context files for Lovable, Google Stitch, and Replit. DESIGN.md, AGENTS.md, and token mapping for every platform."
        path="/ai/vibe-coding"
      />
      {/* Page header */}
      <div className="space-y-3">
        <Badge variant="outline" className="font-mono text-xs">Vibe Coding</Badge>
        <Heading level="h1">Using democrito with Vibe Coding Tools</Heading>
        <P>
          Lovable, Google Stitch, and Replit are visual-first builders that generate
          full applications from natural-language prompts. The workflow for integrating
          democrito into each one follows the same logic: load the taste layer (
          <Code>DESIGN.md</Code>) so the tool reasons correctly, load the token layer
          (<Code>src/index.css</Code>) so it renders correctly, and do a token mapping
          pass after any export — because all 3 tools generate generic Tailwind classes,
          not democrito's semantic tokens.
        </P>
      </div>

      {/* Preamble — 3 points that apply to every tool */}
      <Note label="Applies to every tool in this section">
        <div className="space-y-4">
          <div className="space-y-1">
            <p className="font-display text-sm font-semibold">
              DESIGN.md is the common layer
            </p>
            <P>
              democrito ships <Code>DESIGN.md</Code> following Google's open-source
              format — a plain-text design brief that Lovable, Stitch, and Replit all
              read natively. It carries the visual reasoning: surface hierarchy, font
              roles, accent constraints, and the do/don't list. It tells the tool{" "}
              <em>why</em> the system looks the way it does, not just what the values are.
            </P>
          </div>
          <div className="space-y-1">
            <p className="font-display text-sm font-semibold">
              Token mapping is always required
            </p>
            <P>
              Lovable, Stitch, and Replit generate code with generic Tailwind classes (
              <Code>bg-neutral-900</Code>, <Code>text-orange-500</Code>) — not
              democrito's semantic tokens. The visual output will be on-system. The code
              output always needs a mapping pass. Skip it and AI-generated components
              revert to hardcoded values on the next edit.
            </P>
          </div>
          <div className="space-y-1">
            <p className="font-display text-sm font-semibold">
              Each tool has a persistent knowledge layer
            </p>
            <P>
              Set democrito's universal rules there once. Put product-specific overrides
              in the per-project layer. Never duplicate content across both.
            </P>
          </div>
        </div>
      </Note>

      {/* ------------------------------------------------------------------ */}
      {/* Section 1 — Lovable                                                 */}
      {/* ------------------------------------------------------------------ */}
      <Section label="Lovable">

        <Note label="What it is">
          <P>
            Lovable is a prompt-driven app builder with GitHub sync. It reads instruction
            files from your connected repository automatically — no pasting required once
            the repo is connected.
          </P>
        </Note>

        <Note label="What to know before starting">
          <P>
            Lovable has a 2-tier persistent knowledge system: Workspace Knowledge for
            rules that apply to every project in your workspace, and Project Knowledge
            for overrides specific to a single project. Each supports up to 10,000
            characters. When they conflict, Project Knowledge wins — it's more specific,
            so it takes precedence.
          </P>
          <P>
            On the instruction file side: both <Code>AGENTS.md</Code> and{" "}
            <Code>CLAUDE.md</Code> are read from the project root when GitHub is
            connected. The distinction matters in practice: <Code>AGENTS.md</Code> is
            guaranteed to be read regardless of conversation length. In very long
            sessions, <Code>CLAUDE.md</Code> may not be consistently included. Use{" "}
            <Code>AGENTS.md</Code> as your primary instruction file for Lovable.
          </P>
          <P>
            Workspace Knowledge is for rules you want across every project — the
            3-surface hierarchy, the mono contract, the single-accent rule. The
            instruction file (<Code>AGENTS.md</Code>) is for project-specific structure:
            file paths, component naming, import conventions. Product-specific overrides
            go in Project Knowledge.
          </P>
        </Note>

        <div className="space-y-6">
          <Step
            number={1}
            title="Connect GitHub and set up AGENTS.md"
            caption={
              <>
                Connect your democrito fork via Settings → GitHub. Then create an{" "}
                <Code>AGENTS.md</Code> file at the repo root. This is what Lovable reads
                to understand the project's file structure and naming conventions.
              </>
            }
            language="markdown"
            code={`# democrito — agent instructions

ARCHITECTURE: Atomic Design. Before creating any component, check
src/components/atoms/, molecules/, organisms/, and ui/ for existing implementations.

NAMING: PascalCase filenames. One component per file. Barrel exports via index.ts at each level.

TOKENS: Always use semantic Tailwind classes. Never hardcode colors, spacing, or radii.
- Surfaces: bg-background → bg-surface → bg-card (never a 4th level)
- Text: text-foreground / text-muted-foreground / text-foreground-subtle / text-accent
- Never: bg-gray-*, text-white, dark: overrides

FONTS: font-display (headings, buttons, nav), font-body (descriptions, labels),
font-mono (ALL data values, inputs, IDs, variables, user-editable content).

LINT: Run after every change.`}
          />

          <Step
            number={2}
            title="Add Workspace Knowledge — democrito's universal rules"
            caption="Settings → Knowledge. Paste once. Applies to every project you build on democrito, not just this one."
            language="text"
            code={`democrito design system — universal rules

SURFACES
3-surface hierarchy only: bg-background → bg-surface → bg-card.
Never a 4th level. Shadows reserved for floating elements (dropdowns, tooltips).

TYPOGRAPHY
font-display: headings, buttons, nav labels — signals structure.
font-body: descriptions, labels, body copy — signals narrative.
font-mono: ALL data values, inputs, variables, identifiers, timestamps,
token counts, KPI numbers, user-editable content — signals "this is data."
The font-mono rule is a semantic contract, not a style choice. Never break it.

ACCENT
Single accent color per screen. Marks the one most important action.
Use bg-accent / text-accent only for primary CTAs and interactive links.
bg-accent-muted for hover states and badges. bg-accent-subtle for active
tabs, code blocks, selected rows.

ANTI-PATTERNS
Never hardcode colors. Never use dark: prefixes. Never exceed 3 surfaces.
Never use font-mono on structural labels (buttons, nav items).
Never use font-display on data values (inputs, badges, table data).`}
          />

          <Step
            number={3}
            title="Add Project Knowledge — product overrides only"
            caption="Project settings → Knowledge. Only what changes for this specific product. If it applies across all your projects, it belongs in Workspace Knowledge, not here."
            language="text"
            code={`Product: [ProductName] — [one-line description]
Accent: hsl([value]) replaces terracotta (hsl 18 65% 55%).
Theme: [dark-first / warm default / light].
Primary font: [font name] replaces Plus Jakarta Sans for font-display.

All other democrito rules from Workspace Knowledge apply unchanged.`}
          />

          <Step
            number={4}
            title="Reference components by file path"
            caption="Lovable reads your connected repository. Use actual file paths to anchor generations to existing patterns — this produces more consistent output than open-ended descriptions."
            language="text"
            code={`Create a molecule called RunRow.
Follow the pattern in src/components/molecules/StatCard.tsx.

Props: label (string), value (string), status ("running" | "done" | "error").

Token assignments:
- Container: bg-card border-border rounded-lg px-4 py-3
- label: font-display text-sm font-medium text-muted-foreground
- value: font-mono text-sm text-foreground
- status badge: font-mono text-xs using text-success / text-error / text-muted-foreground

Export from src/components/molecules/index.ts. Run lint after.`}
          >
            <P>
              The <Code>value</Code> field uses <Code>font-mono</Code> because it's a
              data value the user reads and references. The <Code>label</Code> uses{" "}
              <Code>font-display</Code> because it's structural navigation. Swapping them
              breaks the mono contract — Lovable knows this from the Workspace Knowledge
              and will enforce it if the knowledge was set correctly.
            </P>
          </Step>
        </div>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* Section 2 — Google Stitch                                           */}
      {/* ------------------------------------------------------------------ */}
      <Section label="Google Stitch">

        <Note label="What it is">
          <P>
            Stitch is Google Labs' AI-native UI design tool. It generates screens and
            components from natural-language prompts, powered by Gemini. Its primary
            output format is Figma-compatible screens and exported Tailwind/React code.
          </P>
        </Note>

        <Note label="What to know before starting">
          <P>
            <Code>DESIGN.md</Code> is Google's contribution to the vibe coding
            ecosystem — an open-source format for encoding design systems as
            agent-readable plain text. democrito's <Code>DESIGN.md</Code> follows this
            format exactly. Stitch reads it natively as project context: when you import
            it, every screen Stitch generates applies democrito's visual rules without
            you specifying them per prompt.
          </P>
          <P>
            Two things to hold in mind. First: Stitch can also generate a{" "}
            <Code>DESIGN.md</Code> for you — either from a URL or from scratch. If
            you've already customized democrito for a brand, you can push your
            customized version back into Stitch as the project's design context. Second:
            Stitch's export uses generic Tailwind classes. The visual output will be
            correct; the code always needs a token mapping pass.
          </P>
        </Note>

        <div className="space-y-6">
          <Step
            number={1}
            title="Import DESIGN.md"
            caption="Paste the raw file contents directly into the Stitch project, or point it at the raw GitHub URL. If you've customized democrito for a specific brand, use your fork's URL — not the upstream default."
            language="url"
            code={`https://raw.githubusercontent.com/mmorerasanchez/democrito/main/DESIGN.md`}
          >
            <P>If you've forked and customized:</P>
            <StepCode language="url">{`https://raw.githubusercontent.com/[your-username]/democrito/main/DESIGN.md`}</StepCode>
          </Step>

          <Step
            number={2}
            title="Verify the import"
            caption="Before generating anything, confirm Stitch loaded the reasoning layer, not just the values."
            language="text"
            code={`What is the accent color in this design system, its HSL value, and its usage rule?`}
          >
            <P>
              Expected: terracotta, approximately HSL(18° 65% 55%), reserved for primary
              CTAs and interactive links, 1 instance per screen maximum.
            </P>
            <P>
              If Stitch returns a generic color or omits the scarcity rule, re-paste the
              full <Code>DESIGN.md</Code> contents directly rather than using the URL.
              Some Stitch project configurations fetch the URL at generation time rather
              than on import — pasting the contents directly is more reliable.
            </P>
          </Step>

          <Step
            number={3}
            title="Generate with token language"
            caption="Use token names in your prompts, not visual descriptions. Reference list descriptions are not decoration — they're taste vectors that resolve ambiguity the token language doesn't cover. Include both."
            language="text"
            code={`Design a data table layout for a log viewer.
IDE-grade, not consumer-grade. Dense and purposeful.
Closer to Linear or Raycast than to Stripe or Notion.

- Table container: bg-surface
- Table headers: font-mono text-xs uppercase tracking-widest text-muted-foreground, bg-surface
- Table cells: font-mono text-sm text-foreground
- Row hover: bg-accent-subtle
- Horizontal dividers only — no vertical column lines
- Timestamp column: text-foreground-subtle
- Selected row: bg-accent-subtle border-l-2 border-accent`}
          />

          <Step
            number={4}
            title="Token mapping pass after export"
            caption="Stitch's export uses generic Tailwind utility classes. The visual rendering from Stitch is correct — the class names in the exported code are not. Apply this mapping pass to every export before the code enters your project."
            language="text"
            code={`Replace in exported code:

bg-neutral-*    → bg-background / bg-surface / bg-card  (match by visual role)
border-neutral-* → border-border
text-neutral-*  → text-foreground / text-muted-foreground / text-foreground-subtle
text-white      → text-foreground
text-orange-*   → text-accent
bg-orange-*     → bg-accent or bg-accent/10
font-sans       → font-display (headings) or font-body (prose)
font-mono       → font-mono (keep — already correct)`}
          >
            <P>
              This step is not optional. Skip it and every component that gets edited or
              regenerated later will revert to generic values, breaking the semantic layer
              progressively.
            </P>
          </Step>
        </div>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* Section 3 — Replit                                                  */}
      {/* ------------------------------------------------------------------ */}
      <Section label="Replit">

        <Note label="What it is">
          <P>
            Replit Agent is a full-stack app builder that runs entirely in the browser —
            no local setup, no CLI. Agent 4 handles planning, design, and code generation
            from natural-language descriptions, including parallel build execution and
            in-browser testing.
          </P>
        </Note>

        <Note label="What to know before starting">
          <P>
            <Code>replit.md</Code> is Agent's instruction file — the equivalent of{" "}
            <Code>CLAUDE.md</Code> in a local repo. Agent auto-creates it when you start
            a new project, populating it with project type conventions it inferred from
            your prompt. You can edit it at any time. Agent also updates it
            automatically as the project evolves, so review it periodically if your rules
            need to stay fixed.
          </P>
          <P>
            <Code>replit.md</Code> must live at the project root. Agent won't detect it
            in subdirectories. There's no strict character limit, but keep it focused —
            very large files may not be fully processed.
          </P>
          <P>
            On design system tiers: Themes (colors, fonts, UI properties applied
            globally) are available to all plans. Figma design system import and
            package/library import are currently Enterprise Beta. For democrito
            integration, <Code>replit.md</Code> plus the <Code>DESIGN.md</Code> URL
            reference is the approach that works on all plans.
          </P>
        </Note>

        <div className="space-y-6">
          <Step
            number={1}
            title="Set up replit.md at the project root"
            caption="When Agent auto-creates replit.md, it includes project structure and tech stack. Append the democrito design rules as a dedicated section. If you're creating the project manually, include the full block below."
            language="markdown"
            code={`# [ProjectName] — Agent Instructions

## Project context
[Brief description of what the app does and who uses it.]

## Tech stack
React + TypeScript + Tailwind CSS + shadcn/ui

## Design system
democrito v3 — reference: https://democrito.design
DESIGN.md: https://raw.githubusercontent.com/mmorerasanchez/democrito/main/DESIGN.md

Before generating any UI, read the DESIGN.md at the URL above and confirm:
- The 3 surface levels and when each applies
- The accent color and its usage constraint (1 per screen maximum)
- Which content must use font-mono and why

## Token rules
- Surfaces: bg-background → bg-surface → bg-card (never a 4th level)
- Fonts: font-display (headings), font-body (prose), font-mono (ALL data values)
- Colors: semantic tokens only — never bg-gray-*, text-green-*, or dark: prefixes
- Never hardcode hex or rgb values

## Component rules
- Check for existing components before creating new ones
- PascalCase filenames, one component per file
- Always run lint after changes`}
          />

          <Step
            number={2}
            title="Confirm context before building"
            caption="At the start of each session, ask Agent to confirm it read the design system. Agent reads replit.md on session start, but the DESIGN.md URL reference requires it to fetch external content — that step only happens if you confirm it."
            language="text"
            code={`Before we start building: read the DESIGN.md at the URL in replit.md and confirm
the 3 surface levels, the accent color and its rule, and which content must use font-mono.`}
          >
            <P>
              If Agent confirms with the correct answers — terracotta, 3 surfaces in the
              right order, mono contract for data values — proceed. If it returns generic
              answers, paste the raw <Code>DESIGN.md</Code> content directly into the
              chat instead of relying on the URL fetch.
            </P>
          </Step>

          <Step
            number={3}
            title="Generate with token language"
            language="text"
            code={`Create a card component for a SaaS metrics dashboard.

Token assignments:
- Container: bg-card border border-border rounded-lg p-4
- Metric value: font-mono text-2xl font-bold text-foreground
- Label below the metric: font-display text-sm font-medium text-muted-foreground
- Trend indicator: font-mono text-xs — text-success for positive, text-error for negative

Rules: no hardcoded colors. No dark: prefixes. Maximum 3 surfaces.`}
          />

          <Step
            number={4}
            title="Token mapping pass after generation"
            caption="Agent may output generic Tailwind classes even after reading DESIGN.md, particularly for colors. Apply the same mapping pass as Stitch."
            language="text"
            code={`Review all className values in the component you just generated.
Replace generic Tailwind colors with democrito semantic tokens:

bg-neutral-*   → bg-surface or bg-card (match by visual depth)
text-neutral-* → text-foreground or text-muted-foreground
text-green-*   → text-success
text-red-*     → text-error
text-orange-*  → text-accent
bg-orange-*    → bg-accent or bg-accent/10
font-sans      → font-display (headings) or font-body (prose)

Flag any remaining hardcoded hex or rgb values.`}
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
