import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heading, Text, Code, Logo } from "@/components/atoms";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Palette, Box, Layers, LayoutGrid, Layout, Star, ExternalLink, Terminal, Sparkles, Code2, BarChart3, Workflow } from "lucide-react";

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
    path: "/use-cases#solo-developer",
    icon: Code2,
    desc: "Building an AI prompt library with Lovable + Claude Code. Violet accent, dark-first, mono-heavy.",
  },
  {
    name: "Two-person Startup",
    path: "/use-cases#startup",
    icon: BarChart3,
    desc: "Building a developer observability dashboard. Blue accent, professional dual-theme.",
  },
  {
    name: "Growth Engineer",
    path: "/use-cases#growth-engineer",
    icon: Workflow,
    desc: "Building an internal AI ops platform. Amber accent, dark warm, optimised for sustained use.",
  },
];

const REPO_URL = "https://github.com/mmorerasanchez/democrito";

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

      {/* Getting Started */}
      <div>
        <Heading level="h2" className="mb-4">Getting Started</Heading>
        <div className="rounded-lg border border-border bg-card p-6 space-y-6">
          {/* Clone & run */}
          <div className="space-y-3">
            <div className="rounded-md bg-muted p-4 font-mono text-sm text-foreground space-y-1">
              <div className="flex items-center gap-2 text-muted-foreground text-xs mb-2">
                <Terminal className="h-3.5 w-3.5" />
                <span>Terminal</span>
              </div>
              <p>git clone {REPO_URL}.git</p>
              <p>cd democrito</p>
              <p>npm install</p>
              <p>npm run dev</p>
            </div>
          </div>

          {/* Usage rules */}
          <div className="space-y-2">
            <Text variant="muted" size="sm" className="font-display font-medium">Usage rules</Text>
            <ul className="space-y-1.5 font-body text-sm text-muted-foreground list-disc list-inside">
              <li>Copy the <Code>@theme</Code> block from <Code>index.css</Code> into your project</li>
              <li>Never hardcode colors or sizes — always use semantic tokens</li>
              <li><Code>font-display</Code> for headings, <Code>font-body</Code> for text, <Code>font-mono</Code> for data</li>
              <li>Use the showcase pages as visual reference; copy tokens, atoms, and molecules into your app</li>
            </ul>
          </div>

          {/* AI usage */}
          <div className="space-y-2">
            <Text variant="muted" size="sm" className="font-display font-medium">AI-ready</Text>
            <Text size="sm" variant="muted">
              Includes structured context files read automatically by AI coding agents:{" "}
              <Code>CLAUDE.md</Code>, <Code>DESIGN.md</Code>, and <Code>src/DESIGN_SYSTEM.md</Code>.
              Drop the repo into Cursor, Claude Code, or Windsurf and every LLM generates on-system output from the first prompt.
            </Text>
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

          {/* AI CTA */}
          <div className="rounded-md border border-accent/20 bg-accent/5 p-4 flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-start gap-3 flex-1">
              <div className="rounded-md bg-accent/10 p-2 text-accent shrink-0">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <p className="font-display text-sm font-medium">AI-Ready by Design</p>
                <p className="font-body text-xs text-muted-foreground mt-0.5">
                  democrito ships structured AI context files so every LLM produces on-brand output — no prompt engineering required.
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={() => navigate("/ai")} className="shrink-0">
              Explore AI Integration
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Use Cases */}
      <div>
        <Heading level="h2" className="mb-1">Use Cases</Heading>
        <Text variant="muted" size="sm" className="mb-4">
          Three real projects. Full implementation decisions — from the problem through the token overrides.
        </Text>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
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
    </div>);

}