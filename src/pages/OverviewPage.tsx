import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heading, Text, Code, Logo, CodeBlock } from "@/components/atoms";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Palette, Box, Layers, LayoutGrid, Layout, Star, ExternalLink, Sparkles, Code2, BarChart3, Workflow } from "lucide-react";

const stats = [
{ label: "Design Tokens", count: "90+" },
{ label: "Atoms", count: "10" },
{ label: "Molecules", count: "16" },
{ label: "Organisms", count: "19" },
{ label: "Pages", count: "7" },
{ label: "UI Primitives", count: "48" }];


const principles = [
{ name: "Monochromatic + Accent", desc: "95% warm stone grays, 4% terracotta orange accent, 1% semantic colors." },
{ name: "3-Surface Hierarchy", desc: "Background → Surface → Card creates depth without complexity." },
{ name: "Typography as Hierarchy", desc: "Three font families convey meaning: Display, Body, Mono." },
{ name: "Progressive Disclosure", desc: "Start with the lightest variant, add complexity as needed." },
{ name: "Accessible by Default", desc: "WCAG 2.1 AA, 44×44px touch targets, keyboard navigation." },
{ name: "IDE-Inspired", desc: "Clean, distraction-free workspace for data-dense work." }];


const sections = [
{ name: "Tokens", path: "/tokens", icon: Palette, desc: "Colors, Typography, Spacing, Radius, Shadows, Breakpoints" },
{ name: "Atoms", path: "/atoms", icon: Box, desc: "Button, Input, Textarea, Badge, Tag, Typography, Avatar, Spinner, Tooltip, Link, ..." },
{ name: "Molecules", path: "/molecules", icon: Layers, desc: "Form Field, Search Bar, Stat Card, Tab Nav, Empty State, Avatar Group, ..." },
{ name: "Organisms", path: "/organisms", icon: LayoutGrid, desc: "Top Bar, Filter Bar, Data Table, Activity Feed, Onboarding Wizard, Settings Nav, ..." },
{ name: "Pages", path: "/pages", icon: Layout, desc: "App Shell, Dashboard, Editor, Library, Detail View, Settings, Auth, ..." }];


const useCases = [
  {
    name: "Solo Developer",
    path: "/use-cases/solo-developer",
    icon: Code2,
    desc: "Building an AI prompt library with Lovable + Claude Code. Violet accent, dark-first, mono-heavy.",
  },
  {
    name: "Two-person Startup",
    path: "/use-cases/startup",
    icon: BarChart3,
    desc: "Building a developer observability dashboard. Blue accent, professional dual-theme.",
  },
  {
    name: "Growth Engineer",
    path: "/use-cases/growth-engineer",
    icon: Workflow,
    desc: "Building an internal AI ops platform. Amber accent, dark warm, optimised for sustained use.",
  },
  {
    name: "AI Integration",
    path: "/ai",
    icon: Sparkles,
    desc: "Context files, shadcn registry, Claude Skill. Every LLM produces on-brand output from the first prompt.",
  },
];

const REPO_URL = "https://github.com/mmorerasanchez/democrito";

const installCode = `git clone ${REPO_URL}.git
cd democrito
npm install
npm run dev`;

export default function OverviewPage() {
  const navigate = useNavigate();
  return (
    <div className="space-y-16">
      {/* Hero */}
      <div className="space-y-5">
        <div className="flex items-center gap-3">
          <Logo size={40} />
          <h1 className="font-mono text-3xl font-bold tracking-tight lowercase">
            democrito
          </h1>
          <Badge variant="outline">v3</Badge>
        </div>
        <Text size="lg" variant="muted" className="max-w-prose">
          Hand-crafted atomic design system for AI applications. Ready to integrate in your app and LLM.
        </Text>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button onClick={() => window.open(REPO_URL, "_blank")}>
            <Star className="h-4 w-4" />
            Star on GitHub
          </Button>
          <Button variant="outline" onClick={() => navigate("/tokens")}>
            Explore Components
          </Button>
        </div>
        <Text mono size="xs" variant="muted">
          Open source · MIT License · Built with React + Tailwind + shadcn/ui
        </Text>
      </div>

      {/* Stats */}
      <div>
        <Heading level="h2" className="mb-4">Summary</Heading>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {stats.map((s) =>
          <div key={s.label} className="rounded-md border border-border bg-card p-4 space-y-1">
              <p className="font-mono text-2xl font-bold text-accent">{s.count}</p>
              <p className="font-display text-sm font-medium">{s.label}</p>
            </div>
          )}
        </div>
      </div>

      {/* Explore */}
      <div>
        <Heading level="h2" className="mb-4">Explore</Heading>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map((s) =>
          <Link
            key={s.path}
            to={s.path}
            className="group flex items-start gap-3 rounded-lg border border-border bg-card p-4 transition-all duration-150 hover:-translate-y-px hover:shadow-md hover:border-accent/30">

              <div className="rounded-md bg-accent/10 p-2 text-accent">
                <s.icon className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-display text-sm font-medium group-hover:text-accent transition-colors">{s.name}</p>
                <p className="font-body text-xs text-muted-foreground line-clamp-2">{s.desc}</p>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity mt-0.5" />
            </Link>
          )}
        </div>
      </div>

      {/* Design Principles */}
      <div>
        <Heading level="h2" className="mb-4">Design Principles</Heading>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {principles.map((p, i) =>
          <div key={p.name} className="flex gap-3 rounded-md border border-border bg-card p-4">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/10 font-mono text-2xs font-bold text-accent">
                {i + 1}
              </span>
              <div>
                <p className="font-display text-sm font-medium">{p.name}</p>
                <p className="font-body text-xs text-muted-foreground">{p.desc}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Use Cases */}
      <div>
        <Heading level="h2" className="mb-1">Use Cases</Heading>
        <Text variant="muted" size="sm" className="mb-4">
          Three real projects plus AI integration guidance — from token overrides to LLM-ready context files.
        </Text>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {useCases.map((u) =>
          <Link
            key={u.path}
            to={u.path}
            className="group flex items-start gap-3 rounded-lg border border-border bg-card p-4 transition-all duration-150 hover:-translate-y-px hover:shadow-md hover:border-accent/30">

              <div className="rounded-md bg-accent/10 p-2 text-accent shrink-0">
                <u.icon className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-display text-sm font-medium group-hover:text-accent transition-colors">{u.name}</p>
                <p className="font-body text-xs text-muted-foreground line-clamp-2">{u.desc}</p>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity mt-0.5 shrink-0" />
            </Link>
          )}
        </div>
      </div>

      {/* Getting Started */}
      <div>
        <Heading level="h2" className="mb-4">Getting Started</Heading>
        <div className="rounded-lg border border-border bg-card p-6 space-y-6">
          {/* Clone & run */}
          <CodeBlock code={installCode} language="bash" />

          {/* Usage rules */}
          <div className="space-y-2">
            <Text variant="muted" size="sm" className="font-display font-medium">Usage rules</Text>
            <ul className="space-y-1.5 font-body text-sm text-muted-foreground list-disc list-inside">
              <li>Copy the <Code>@theme</Code> block from <Code>index.css</Code> into your project — all tokens are CSS custom properties</li>
              <li>Install via shadcn registry: <Code>npx shadcn add https://democrito.design/registry.json</Code></li>
              <li>Never hardcode colors or sizes — always use semantic tokens (no inline hex or HSL)</li>
              <li><Code>font-display</Code> for headings, <Code>font-body</Code> for paragraphs, <Code>font-mono</Code> for all data values and user-editable content</li>
              <li>Drop <Code>CLAUDE.md</Code> and <Code>src/DESIGN_SYSTEM.md</Code> into any AI coding agent — every LLM generates on-brand output from the first prompt</li>
            </ul>
          </div>

          {/* Star CTA */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="secondary" onClick={() => window.open(REPO_URL, "_blank")}>
              <Star className="h-4 w-4" />
              Star on GitHub
            </Button>
            <a href="https://www.linkedin.com/in/mmorerasanchez/" target="_blank" rel="noopener noreferrer">
              <Button variant="outline">
                <ExternalLink className="h-4 w-4" />
                Contact Creator
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>);

}
