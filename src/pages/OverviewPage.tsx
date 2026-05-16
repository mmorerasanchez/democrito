import { PageMeta } from "@/components/PageMeta";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heading, Text, Logo } from "@/components/atoms";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Palette, Box, Layers, LayoutGrid, Layout, Star, Quote } from "lucide-react";
import { QuickStartSection } from "@/components/organisms/ai";

const stats = [
  { label: "Design Tokens", count: "90+" },
  { label: "Atoms",         count: "10"  },
  { label: "Molecules",     count: "18"  },
  { label: "Organisms",     count: "19"  },
  { label: "Templates",      count: "7"   },
  { label: "UI Primitives", count: "40+" },
];

const principles = [
  { name: "Monochromatic + Accent", desc: "95% warm stone grays, 4% terracotta orange accent, 1% semantic colors." },
  { name: "3-Surface Hierarchy", desc: "Background → Surface → Card creates depth without complexity." },
  { name: "Typography as Hierarchy", desc: "Three font families convey meaning: Display, Body, Mono." },
  { name: "Progressive Disclosure", desc: "Start with the lightest variant, add complexity as needed." },
  { name: "Accessible by Default", desc: "WCAG 2.1 AA, 44×44px touch targets, keyboard navigation." },
  { name: "IDE-Inspired", desc: "Clean, distraction-free workspace for data-dense work." },
];

const sections = [
  { name: "Tokens",     path: "/tokens",    icon: Palette,    desc: "Colors, Typography, Spacing, Radius, Shadows, Breakpoints" },
  { name: "Atoms",      path: "/atoms",     icon: Box,        desc: "Button, Input, Textarea, Badge, Tag, Typography, Avatar, Spinner, Tooltip, Link, ..." },
  { name: "Molecules",  path: "/molecules", icon: Layers,     desc: "Form Field, Search Bar, Stat Card, Tab Nav, Empty State, Avatar Group, ..." },
  { name: "Organisms",  path: "/organisms", icon: LayoutGrid, desc: "Top Bar, Filter Bar, Data Table, Activity Feed, Onboarding Wizard, Settings Nav, ..." },
  { name: "Templates",  path: "/templates", icon: Layout,     desc: "App Shell, Dashboard, Editor, Library, Detail View, Settings, Auth, ..." },
  { name: "Manifesto",  path: "/manifesto", icon: Quote,      desc: "Why design systems still matter — the taste argument." },
];

const REPO_URL = "https://github.com/mmorerasanchez/democrito";

export default function OverviewPage() {
  const navigate = useNavigate();
  return (
    <div className="space-y-16">
      <PageMeta
        title="democrito — Atomic Design System for AI-Native Development"
        description="Themeable atomic design system with warm industrial aesthetic, three-surface depth, and three-font semantic typography. Built for data-dense, IDE-inspired applications."
        path="/"
      />
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
          Hand-crafted atomic design system for AI applications — ready to drop into your codebase and any LLM.
        </Text>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button onClick={() => window.open(REPO_URL, "_blank")}>
            <Star className="h-4 w-4" />
            Star on GitHub
          </Button>
          <Button variant="outline" onClick={() => navigate("/atoms")}>
            <Box className="h-4 w-4" />
            Browse components
          </Button>
          <button
            type="button"
            onClick={() => navigate("/tokens")}
            className="inline-flex items-center gap-1.5 font-mono text-sm text-muted-foreground transition-colors hover:text-accent sm:ml-1"
          >
            Explore tokens
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
        <Text mono size="xs" variant="muted">
          Open source · MIT License · Built with React + Tailwind + shadcn/ui
        </Text>
      </div>
      <div id="hero-sentinel" aria-hidden="true" className="h-px" />

      {/* Why */}
      <div className="space-y-2">
        <Heading level="h2">Why</Heading>
        <Text variant="muted" size="sm" className="max-w-prose">
          AI tools produce what you give them. democrito gives them a complete visual language —
          90+ design tokens, structured components, and AI context files — so every assistant,
          from Claude to Lovable, produces on-brand output from the first prompt.
        </Text>
      </div>

      {/* How */}
      <div className="space-y-3">
        <Heading level="h2">How</Heading>
        <Text variant="muted" size="sm" className="max-w-prose">
          Three paths: install via the shadcn registry in one command, copy the token
          layer manually for any non-React stack, or drop CLAUDE.md into your repo root
          to give any AI agent immediate design context — no build step required.
        </Text>
        <QuickStartSection showHeading={false} />
      </div>

      {/* What */}
      <div className="space-y-12">
        <div className="space-y-2">
          <Heading level="h2">What</Heading>
          <Text variant="muted" size="sm" className="max-w-prose">
            From design tokens to full-page layouts, every piece is documented, themed across
            three surfaces, and structured for AI consumption. Adopt the whole system or extract
            only what your product needs.
          </Text>
        </div>

        {/* Summary */}
        <div>
          <Heading level="h3" className="mb-4">Summary</Heading>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {stats.map((s) => (
              <div key={s.label} className="rounded-md border border-border bg-card p-4 space-y-1">
                <p className="font-mono text-xl font-medium text-foreground">{s.count}</p>
                <p className="font-display text-xs font-medium text-muted-foreground uppercase tracking-widest">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Sections */}
        <div>
          <Heading level="h3" className="mb-4">Sections</Heading>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {sections.map((s) => (
              <Link
                key={s.path}
                to={s.path}
                className="group flex items-start gap-3 rounded-lg border border-border bg-card p-4 transition-all duration-150 hover:-translate-y-px hover:shadow-md hover:border-accent/30"
              >
                <div className="rounded-md bg-accent/10 p-2 text-accent">
                  <s.icon className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-display text-sm font-medium group-hover:text-accent transition-colors">{s.name}</p>
                  <p className="font-body text-xs text-muted-foreground line-clamp-2">{s.desc}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity mt-0.5" />
              </Link>
            ))}
          </div>
        </div>

        {/* Design Principles */}
        <div>
          <Heading level="h3" className="mb-4">Design Principles</Heading>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {principles.map((p, i) => (
              <div key={p.name} className="flex gap-3 rounded-md border border-border bg-card p-4">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/10 font-mono text-2xs font-bold text-accent">
                  {i + 1}
                </span>
                <div>
                  <p className="font-display text-sm font-medium">{p.name}</p>
                  <p className="font-body text-xs text-muted-foreground">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
