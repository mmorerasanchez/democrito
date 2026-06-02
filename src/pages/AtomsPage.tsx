import { PageMeta } from "@/components/PageMeta";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge, BadgeDot } from "@/components/ui/badge";
import { Heading, Text, Code, CodeBlock, CopyButton, Kbd, Link, Logo, StatusBadge, Tag } from "@/components/atoms";
import { Avatar, AvatarImage, AvatarFallback, AvatarStatus } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner, ThinkingDots } from "@/components/atoms";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Settings, Plus, Trash2, Search, Copy, ArrowRight, Loader2 } from "lucide-react";

function CategoryHeader({ id, title, description, count }: { id: string; title: string; description: string; count: number }) {
  return (
    <div id={id} className="scroll-mt-6 border-t border-border pt-8">
      <div className="flex items-baseline gap-3">
        <Heading level="h2">{title}</Heading>
        <span className="font-mono text-2xs text-muted-foreground">{count} components</span>
      </div>
      <p className="mt-0.5 font-body text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

/* ── Section wrapper ── */
function Section({ id, title, description, children }: { id: string; title: string; description: string; children: React.ReactNode }) {
  return (
    <section id={id} className="space-y-4">
      <div>
        <Heading level="h3">{title}</Heading>
        <p className="font-body text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="overflow-hidden rounded-lg border border-border bg-card p-6 space-y-6">{children}</div>
    </section>
  );
}

function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <h3 className="font-mono text-2xs font-medium uppercase tracking-widest text-muted-foreground">{title}</h3>
      {children}
    </div>
  );
}

function ApiSnippet({ children }: { children: string }) {
  return (
    <pre className="mt-2 rounded-md border border-border bg-muted p-3 font-mono text-2xs text-muted-foreground overflow-x-auto">
      {children}
    </pre>
  );
}

export default function AtomsPage() {
  const [sliderValue, setSliderValue] = useState([50]);
  const [switchOn, setSwitchOn] = useState(false);
  const [checked, setChecked] = useState(false);

  const categories = [
    { id: "cat-form",     label: "Form & Input",        count: 1 },
    { id: "cat-labels",   label: "Labels & typography",  count: 6 },
    { id: "cat-feedback", label: "Feedback & state",     count: 1 },
    { id: "cat-utility",  label: "Utilities",            count: 3 },
  ];

  return (
    <div className="space-y-12">
      <PageMeta
        title="Atoms"
        description="11 custom atoms — Code, CodeBlock, CopyButton, Heading, Kbd, Link, Logo, Spinner, StatusBadge, Tag, Text — plus shadcn/ui primitives. Variants, sizes, states, and copy-ready API."
        path="/atoms"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "TechArticle",
          "name": "Atoms · democrito",
          "description": "10 base components — Button, Input, Textarea, Badge, Tag, Typography, Avatar, Spinner, Tooltip, Link. Variants, sizes, states, and copy-ready API.",
          "url": "https://democrito.design/atoms",
          "isPartOf": { "@type": "SoftwareApplication", "name": "democrito" },
        }}
      />
      <div>
        <Heading level="h1">Atoms</Heading>
        <p className="mt-1 font-body text-base text-muted-foreground">
          Base-level components — the building blocks of the design system.
        </p>
        <p className="mt-0.5 font-mono text-xs text-foreground-subtle">11 atoms · 4 categories</p>
      </div>

      {/* ── CATEGORY JUMP NAV ── */}
      <nav className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <a
            key={cat.id}
            href={`#${cat.id}`}
            className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-1.5 font-display text-xs font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            {cat.label}
            <span className="font-mono text-2xs text-muted-foreground">{cat.count}</span>
          </a>
        ))}
      </nav>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* CATEGORY: Form & Input                                      */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <CategoryHeader id="cat-form" title="Form & Input" description="Interactive controls and data entry components." count={1} />

      {/* ── BUTTONS ── */}
      <Section id="button" title="Button" description="Primary interactive element. Extends shadcn/ui Button with design system token styling, loading state, and theme-inverted primary.">
        <SubSection title="Variants">
          <div className="flex flex-wrap items-center gap-3">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </div>
        </SubSection>
        <SubSection title="Sizes">
          <div className="flex flex-wrap items-center gap-3">
            <Button size="sm">Small</Button>
            <Button size="default">Medium</Button>
            <Button size="lg">Large</Button>
            <Button size="icon" aria-label="Settings"><Settings /></Button>
          </div>
        </SubSection>
        <SubSection title="With Icons">
          <div className="flex flex-wrap items-center gap-3">
            <Button><Plus /> Create New</Button>
            <Button variant="secondary"><Copy /> Duplicate</Button>
            <Button variant="destructive"><Trash2 /> Delete</Button>
            <Button variant="ghost"><ArrowRight /> Continue</Button>
          </div>
        </SubSection>
        <SubSection title="States">
          <div className="flex flex-wrap items-center gap-3">
            <Button>Default</Button>
            <Button disabled>Disabled</Button>
            <Button loading>Loading</Button>
          </div>
        </SubSection>
        <ApiSnippet>{`<Button variant="default | secondary | destructive | outline | ghost | link" size="sm | default | lg | icon" loading={boolean} />`}</ApiSnippet>
      </Section>

      {/* ── INPUT ── */}
      <Section id="input" title="Input" description="Text input — always font-mono per spec. Card bg with accent focus ring. Extends shadcn/ui Input.">
        <SubSection title="States">
          <div className="grid gap-3 max-w-sm">
            <Input placeholder="Empty state placeholder…" />
            <Input defaultValue="Filled state value" />
            <Input error placeholder="Error state" />
            <Input disabled placeholder="Disabled state" />
          </div>
        </SubSection>
        <ApiSnippet>{`<Input placeholder="..." error={boolean} disabled={boolean} />`}</ApiSnippet>
      </Section>

      {/* ── TEXTAREA ── */}
      <Section id="textarea" title="Textarea" description="Multi-line text input — always font-mono. Auto-resize variant. Min 80px, max 300px.">
        <SubSection title="States">
          <div className="grid gap-3 max-w-md">
            <Textarea placeholder="Enter prompt content…" />
            <Textarea error placeholder="Error state" />
            <Textarea disabled placeholder="Disabled" />
          </div>
        </SubSection>
        <ApiSnippet>{`<Textarea placeholder="..." error={boolean} />`}</ApiSnippet>
      </Section>

      {/* ── FORM ELEMENTS ── */}
      <Section id="form-elements" title="Form Elements" description="Checkbox, Radio (via Select), Switch, Select, Slider — all using shadcn/ui base with design tokens.">
        <SubSection title="Checkbox">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Checkbox id="check-1" checked={checked} onCheckedChange={(c) => setChecked(c === true)} />
              <Label htmlFor="check-1" className="font-body text-sm">Checked: {checked ? "yes" : "no"}</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="check-2" disabled />
              <Label htmlFor="check-2" className="font-body text-sm text-muted-foreground">Disabled</Label>
            </div>
          </div>
        </SubSection>
        <SubSection title="Switch">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Switch checked={switchOn} onCheckedChange={setSwitchOn} id="switch-1" />
              <Label htmlFor="switch-1" className="font-body text-sm">{switchOn ? "On" : "Off"}</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch disabled id="switch-2" />
              <Label htmlFor="switch-2" className="font-body text-sm text-muted-foreground">Disabled</Label>
            </div>
          </div>
        </SubSection>
        <SubSection title="Select">
          <div className="max-w-xs">
            <Select>
              <SelectTrigger className="font-mono">
                <SelectValue placeholder="Select a model…" />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                <SelectItem value="claude">claude-3.5-sonnet</SelectItem>
                <SelectItem value="gpt4">gpt-4-turbo</SelectItem>
                <SelectItem value="gemini">gemini-1.5-pro</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </SubSection>
        <SubSection title="Slider">
          <div className="max-w-sm space-y-2">
            <div className="flex items-center justify-between">
              <Label className="font-body text-sm">Temperature</Label>
              <span className="font-mono text-xs text-muted-foreground">{(sliderValue[0] / 100).toFixed(2)}</span>
            </div>
            <Slider value={sliderValue} onValueChange={setSliderValue} max={100} step={1} />
          </div>
        </SubSection>
      </Section>

      {/* ── COPY BUTTON ── */}
      <Section id="copy-button" title="Copy Button" description="One-click clipboard copy. Primary: label + icon with accent background. Ghost: icon-only overlay, used inside CodeBlock.">
        <SubSection title="Variants">
          <div className="flex flex-wrap items-center gap-4">
            <CopyButton variant="primary" value="npm install democrito" label="Copy install command" />
            <CopyButton variant="ghost" value="npm install democrito" label="code snippet" />
          </div>
        </SubSection>
        <ApiSnippet>{`<CopyButton variant="primary | ghost" value="text to copy" label="optional label" />`}</ApiSnippet>
      </Section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* CATEGORY: Labels & Typography                               */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <CategoryHeader id="cat-labels" title="Labels & Typography" description="Badges, tags, and typographic display components." count={6} />

      {/* ── BADGE ── */}
      <Section id="badge" title="Badge" description="Pill-shaped labels using font-mono. Status, semantic, and count variants.">
        <SubSection title="Default Variants">
          <div className="flex flex-wrap items-center gap-2">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="outline">Outline</Badge>
          </div>
        </SubSection>
        <SubSection title="Status">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="draft">Draft</Badge>
            <Badge variant="testing">Testing</Badge>
            <Badge variant="production">Production</Badge>
            <Badge variant="archived">Archived</Badge>
          </div>
        </SubSection>
        <SubSection title="Semantic">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="error">Error</Badge>
            <Badge variant="info">Info</Badge>
          </div>
        </SubSection>
        <SubSection title="Count & Dot">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="count">3</Badge>
            <Badge variant="count">42</Badge>
            <span className="flex items-center gap-2"><BadgeDot className="text-success" /> Online</span>
            <span className="flex items-center gap-2"><BadgeDot className="text-warning" /> Busy</span>
          </div>
        </SubSection>
        <SubSection title="Sizes">
          <div className="flex flex-wrap items-center gap-2">
            <Badge size="sm">Small</Badge>
            <Badge size="default">Default</Badge>
            <Badge size="lg">Large</Badge>
          </div>
        </SubSection>
        <ApiSnippet>{`<Badge variant="default | draft | testing | production | archived | claude | gpt | gemini | lovable | success | warning | error | info | count" size="sm | default | lg" />`}</ApiSnippet>
      </Section>

      {/* ── TAG ── */}
      <Section id="tag" title="Tag" description="Border-based labels with optional remove and selectable states. Font-mono, text-xs.">
        <SubSection title="Variants">
          <div className="flex flex-wrap items-center gap-2">
            <Tag>default</Tag>
            <Tag color="teal">colored</Tag>
            <Tag variant="removable" onRemove={() => {}}>removable</Tag>
            <Tag variant="selectable">selectable</Tag>
            <Tag variant="selectable" selected>selected</Tag>
          </div>
        </SubSection>
        <ApiSnippet>{`<Tag variant="default | removable | selectable" color="role" selected />`}</ApiSnippet>
      </Section>

      {/* ── STATUS BADGE ── */}
      <Section id="status-badge" title="Status Badge" description="Lifecycle status pill — draft, testing, production, archived. Semantic background tint with matching text color. Font-mono, text-xs.">
        <SubSection title="All statuses">
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge status="draft" />
            <StatusBadge status="testing" />
            <StatusBadge status="production" />
            <StatusBadge status="archived" />
          </div>
        </SubSection>
        <ApiSnippet>{`<StatusBadge status="draft | testing | production | archived" />`}</ApiSnippet>
      </Section>

      {/* ── TYPOGRAPHY ── */}
      <Section id="typography" title="Typography" description="Reusable Heading, Text, Code, and Kbd components enforcing the design system type scale.">
        <SubSection title="Heading Levels">
          <div className="space-y-2">
            <Heading level="h1">H1 — Page Title</Heading>
            <Heading level="h2">H2 — Section Heading</Heading>
            <Heading level="h3">H3 — Card Title</Heading>
            <Heading level="h4">H4 — Subsection</Heading>
          </div>
        </SubSection>
        <SubSection title="Text Variants">
          <div className="space-y-1">
            <Text>Default body text</Text>
            <Text variant="muted">Muted text for secondary info</Text>
            <Text variant="subtle">Subtle text for tertiary info</Text>
            <Text variant="accent">Accent text</Text>
            <Text variant="error">Error text</Text>
            <Text variant="success">Success text</Text>
            <Text mono>Monospace text for data values</Text>
          </div>
        </SubSection>
        <SubSection title="Code & Kbd">
          <div className="flex flex-wrap items-center gap-3">
            <span>Inline <Code>code snippet</Code> in text</span>
            <span>Press <Kbd>⌘</Kbd> + <Kbd>K</Kbd> to search</span>
          </div>
        </SubSection>
        <ApiSnippet>{`<Heading level="h1 | h2 | h3 | h4" />
<Text variant="default | muted | subtle | accent | error | success" size="xs | sm | base | lg" mono={boolean} />
<Code>inline code</Code>
<Kbd>⌘K</Kbd>`}</ApiSnippet>
      </Section>

      {/* ── AVATAR ── */}
      <Section id="avatar" title="Avatar" description="Circular avatar with image, initials fallback, status indicator. Sizes: xs(20), sm(28), md(36), lg(48).">
        <SubSection title="Sizes with Fallback">
          <div className="flex items-center gap-4">
            {(["xs", "sm", "md", "lg"] as const).map((size) => (
              <Avatar key={size} size={size}>
                <AvatarFallback>{size.toUpperCase()}</AvatarFallback>
              </Avatar>
            ))}
          </div>
        </SubSection>
        <SubSection title="With Status">
          <div className="flex items-center gap-4">
            <Avatar size="md"><AvatarFallback>MR</AvatarFallback><AvatarStatus status="online" /></Avatar>
            <Avatar size="md"><AvatarFallback>JD</AvatarFallback><AvatarStatus status="busy" /></Avatar>
            <Avatar size="md"><AvatarFallback>AK</AvatarFallback><AvatarStatus status="offline" /></Avatar>
          </div>
        </SubSection>
        <SubSection title="Stacked Group">
          <div className="flex -space-x-2">
            {["MR", "JD", "AK", "BL"].map((initials) => (
              <Avatar key={initials} size="sm" className="border-2 border-background">
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
            ))}
          </div>
        </SubSection>
        <ApiSnippet>{`<Avatar size="xs | sm | md | lg"><AvatarFallback>MR</AvatarFallback><AvatarStatus status="online" /></Avatar>`}</ApiSnippet>
      </Section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* CATEGORY: Feedback & State                                  */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <CategoryHeader id="cat-feedback" title="Feedback & State" description="Loading states, overlays, and interaction feedback." count={1} />

      {/* ── SEPARATOR ── */}
      <Section id="separator" title="Separator" description="1px border color line. Horizontal or vertical.">
        <div className="space-y-4">
          <Separator />
          <div className="flex items-center gap-4 h-6">
            <span className="font-body text-sm">Left</span>
            <Separator orientation="vertical" />
            <span className="font-body text-sm">Right</span>
          </div>
        </div>
      </Section>

      {/* ── SKELETON ── */}
      <Section id="skeleton" title="Skeleton" description="Loading placeholder with 1.5s pulse animation. Respects prefers-reduced-motion.">
        <div className="space-y-3 max-w-sm">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <div className="flex items-center gap-3">
            <Skeleton className="h-9 w-9 rounded-full" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-2/3" />
            </div>
          </div>
        </div>
      </Section>

      {/* ── SPINNER ── */}
      <Section id="spinner" title="Spinner & Thinking Dots" description="Loading indicators. Spinner: accent border-top spin. Thinking dots: 3×6px staggered pulse.">
        <SubSection title="Spinner Sizes">
          <div className="flex items-center gap-6">
            <Spinner size="sm" />
            <Spinner size="md" />
            <Spinner size="lg" />
            <Spinner size="inline" />
          </div>
        </SubSection>
        <SubSection title="Thinking Dots">
          <ThinkingDots />
        </SubSection>
        <ApiSnippet>{`<Spinner size="sm | md | lg | inline" />
<ThinkingDots />`}</ApiSnippet>
      </Section>

      {/* ── TOOLTIP ── */}
      <Section id="tooltip" title="Tooltip" description="Inverted colors, font-body, text-xs, radius-sm, max-width 240px. Radix Tooltip.">
        <div className="flex items-center gap-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="sm">Hover me</Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>This is a tooltip</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Search"><Search /></Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Search prompts</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* CATEGORY: Utilities                                         */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <CategoryHeader id="cat-utility" title="Utilities" description="Progress indicators, links, brand mark, and code display." count={3} />

      {/* ── PROGRESS ── */}
      <Section id="progress" title="Progress Bar" description="4px height, accent fill, rounded-full. Semantic color variants. Determinate + indeterminate.">
        <SubSection title="Variants">
          <div className="space-y-3 max-w-md">
            <div className="space-y-1">
              <span className="font-mono text-2xs text-muted-foreground">default (65%)</span>
              <Progress value={65} />
            </div>
            <div className="space-y-1">
              <span className="font-mono text-2xs text-muted-foreground">success (100%)</span>
              <Progress value={100} variant="success" />
            </div>
            <div className="space-y-1">
              <span className="font-mono text-2xs text-muted-foreground">warning (80%)</span>
              <Progress value={80} variant="warning" />
            </div>
            <div className="space-y-1">
              <span className="font-mono text-2xs text-muted-foreground">error (95%)</span>
              <Progress value={95} variant="error" />
            </div>
          </div>
        </SubSection>
        <ApiSnippet>{`<Progress value={65} variant="default | success | warning | error | info" indeterminate={boolean} />`}</ApiSnippet>
      </Section>

      {/* ── LINK ── */}
      <Section id="link" title="Link" description="Styled anchor. font-body, text-accent, hover:underline. External variant appends ↗ and opens in new tab.">
        <SubSection title="Variants">
          <div className="flex flex-wrap items-center gap-6">
            <Link href="#">Internal link</Link>
            <Link href="https://example.com" external>External link</Link>
          </div>
        </SubSection>
        <ApiSnippet>{`<Link href="#" external={boolean}>Link text</Link>`}</ApiSnippet>
      </Section>

      {/* ── CODE BLOCK ── */}
      <Section id="codeblock" title="Code Block" description="Multi-line code display on --surface. Optional language label, variable {{bracket}} highlighting, and hover-reveal copy button.">
        <SubSection title="With language label">
          <CodeBlock code={`import { CodeBlock } from "@/components/atoms";\n\n<CodeBlock code={snippet} language="tsx" />`} language="tsx" />
        </SubSection>
        <SubSection title="Plain (no label)">
          <CodeBlock code={`npm install democrito`} />
        </SubSection>
        <ApiSnippet>{`<CodeBlock code="..." language="tsx" showCopy={boolean} />`}</ApiSnippet>
      </Section>

      {/* ── LOGO ── */}
      <Section id="logo" title="Logo" description="Theme-aware brand mark. Renders logo-dark.png on dark theme, logo-light-warm.png on warm/light.">
        <SubSection title="Sizes">
          <div className="flex items-center gap-6">
            <Logo size={16} />
            <Logo size={24} />
            <Logo size={32} />
            <Logo size={48} />
          </div>
        </SubSection>
        <ApiSnippet>{`<Logo size={28} />`}</ApiSnippet>
      </Section>

      {/* ── LABEL ── */}
      <Section id="label" title="Label" description="Form label. font-body, text-sm, font-medium. Required state with asterisk.">
        <div className="flex flex-wrap items-center gap-6">
          <Label className="font-body text-sm font-medium">Default Label</Label>
          <Label className="font-body text-sm font-medium">Required <span className="text-destructive">*</span></Label>
          <Label className="font-body text-sm font-medium text-muted-foreground cursor-not-allowed">Disabled Label</Label>
        </div>
      </Section>
    </div>
  );
}
