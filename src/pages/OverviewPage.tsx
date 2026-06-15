import { PageMeta } from "@/components/app/PageMeta";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heading, Text, Logo, Link } from "@/components/atoms";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { ArrowRight, Box, Star, Layers, Heart, Github } from "lucide-react";
import { QuickStartSection } from "@/components/sections";
import { ATOMS, MOLECULES, ORGANISMS, TEMPLATES, UI, TOKENS } from "@/generated/counts";

function ClaudeIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 512 509.64"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path d="M142.27 316.619l73.655-41.326 1.238-3.589-1.238-1.996-3.589-.001-12.31-.759-42.084-1.138-36.498-1.516-35.361-1.896-8.897-1.895-8.34-10.995.859-5.484 7.482-5.03 10.717.935 23.683 1.617 35.537 2.452 25.782 1.517 38.193 3.968h6.064l.86-2.451-2.073-1.517-1.618-1.517-36.776-24.922-39.81-26.338-20.852-15.166-11.273-7.683-5.687-7.204-2.451-15.721 10.237-11.273 13.75.935 3.513.936 13.928 10.716 29.749 23.027 38.848 28.612 5.687 4.727 2.275-1.617.278-1.138-2.553-4.271-21.13-38.193-22.546-38.848-10.035-16.101-2.654-9.655c-.935-3.968-1.617-7.304-1.617-11.374l11.652-15.823 6.445-2.073 15.545 2.073 6.547 5.687 9.655 22.092 15.646 34.78 24.265 47.291 7.103 14.028 3.791 12.992 1.416 3.968 2.449-.001v-2.275l1.997-26.641 3.69-32.707 3.589-42.084 1.239-11.854 5.863-14.206 11.652-7.683 9.099 4.348 7.482 10.716-1.036 6.926-4.449 28.915-8.72 45.294-5.687 30.331h3.313l3.792-3.791 15.342-20.372 25.782-32.227 11.374-12.789 13.27-14.129 8.517-6.724 16.1-.001 11.854 17.617-5.307 18.199-16.581 21.029-13.75 17.819-19.716 26.54-12.309 21.231 1.138 1.694 2.932-.278 44.536-9.479 24.062-4.347 28.714-4.928 12.992 6.066 1.416 6.167-5.106 12.613-30.71 7.583-36.018 7.204-53.636 12.689-.657.48.758.935 24.164 2.275 10.337.556h25.301l47.114 3.514 12.309 8.139 7.381 9.959-1.238 7.583-18.957 9.655-25.579-6.066-59.702-14.205-20.474-5.106-2.83-.001v1.694l17.061 16.682 31.266 28.233 39.152 36.397 1.997 8.999-5.03 7.102-5.307-.758-34.401-25.883-13.27-11.651-30.053-25.302-1.996-.001v2.654l6.926 10.136 36.574 54.975 1.895 16.859-2.653 5.485-9.479 3.311-10.414-1.895-21.408-30.054-22.092-33.844-17.819-30.331-2.173 1.238-10.515 113.261-4.929 5.788-11.374 4.348-9.478-7.204-5.03-11.652 5.03-23.027 6.066-30.052 4.928-23.886 4.449-29.674 2.654-9.858-.177-.657-2.173.278-22.37 30.71-34.021 45.977-26.919 28.815-6.445 2.553-11.173-5.789 1.037-10.337 6.243-9.2 37.257-47.392 22.47-29.371 14.508-16.961-.101-2.451h-.859l-98.954 64.251-17.618 2.275-7.583-7.103.936-11.652 3.589-3.791 29.749-20.474-.101.102.024.101z" />
    </svg>
  );
}

const principles = [
  { name: "Monochromatic + Accent", desc: "95% warm stone grays, 4% terracotta orange accent, 1% semantic colors." },
  { name: "3-Surface Hierarchy", desc: "Background → Surface → Card creates depth without complexity." },
  { name: "Typography as Hierarchy", desc: "Three font families convey meaning: Display, Body, Mono." },
  { name: "Progressive Disclosure", desc: "Start with the lightest variant, add complexity as needed." },
  { name: "Accessible by Default", desc: "WCAG 2.1 AA, 44×44px touch targets, keyboard navigation." },
  { name: "IDE-Inspired", desc: "Clean, distraction-free workspace for data-dense work." },
];

const components = [
  { count: TOKENS, title: "Tokens",        subtitle: "Colors, Typography, Spacing, Radius, Shadows, Breakpoints",                          path: "/tokens",     external: false },
  { count: ATOMS,  title: "Atoms",         subtitle: "Button, Input, Textarea, Badge, Tag, Typography, Avatar, Spinner, Tooltip, Link, ...", path: "/atoms",      external: false },
  { count: MOLECULES, title: "Molecules",  subtitle: "Form Field, Search Bar, Stat Card, Tab Nav, Empty State, Avatar Group, ...",          path: "/molecules",  external: false },
  { count: ORGANISMS, title: "Organisms",  subtitle: "Top Bar, Filter Bar, Data Table, Activity Feed, Onboarding Wizard, Settings Nav, ...", path: "/organisms",  external: false },
  { count: TEMPLATES, title: "Templates",  subtitle: "App Shell, Dashboard, Editor, Library, Detail View, Settings, Auth, ...",             path: "/templates",  external: false },
  { count: UI,     title: "UI primitives", subtitle: "Dialog, Dropdown, Popover, Sheet, Tabs, Toast, ...",                                  path: "https://democrito.design/r/democrito.json", external: true },
];

const paths = [
  {
    to: "/ai/claude",
    icon: ClaudeIcon,
    name: "Claude",
  },
  {
    to: "/ai/vibe-coding",
    icon: Heart,
    name: "Vibe Coding",
  },
  {
    to: "/ai/github",
    icon: Github,
    name: "Terminal",
  },
  {
    to: "/ai/examples",
    icon: Layers,
    name: "Examples",
  },
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
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "democrito",
          "description": "Themeable atomic design system with warm industrial aesthetic, three-surface depth, and three-font semantic typography. Built for data-dense, IDE-inspired applications.",
          "url": "https://democrito.design",
          "applicationCategory": "DeveloperApplication",
          "operatingSystem": "Web",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        }}
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
        <p className="font-body text-base text-muted-foreground">
          Agnostic atomic design system for AI-native tools — structured tokens, accessible components, and three-theme support. React + Tailwind CSS + Radix UI. Adaptable via Claude, vibe coding platforms or terminal.
        </p>
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
        <div id="hero-sentinel" aria-hidden="true" className="h-px" />
      </div>

      {/* Why */}
      <div className="space-y-4">
        <Heading level="h2">Why</Heading>
        <Text variant="muted" size="sm">
          Around 400 BC, Democritus proposed something radical: that all matter is made of
          invisible, indivisible units he called <em>atoms</em> that combine to form everything.
        </Text>
        <Text variant="muted" size="sm">
          Twenty-five centuries later, Brad Frost borrowed the concept for design interfaces:
          buttons are atoms, forms are molecules, pages are built from organisms. The methodology
          is called{" "}
          <Link href="https://atomicdesign.bradfrost.com/chapter-2/" external>
            atomic design
          </Link>{" "}
          — and the connection back to Democritus is in the name.
        </Text>
        <Text variant="muted" size="sm">
          democrito carries that thread forward into the age of AI-assisted development to allow
          designers build consistent design systems with craft and taste — and besides them, there
          are now AI agents, vibe-coding tools, and LLMs that need the rules to create delightful
          AI products.
        </Text>
      </div>

      {/* How */}
      <div className="space-y-6">
        <div className="space-y-2">
          <Heading level="h2">How</Heading>
          <Text variant="muted" size="sm">
            Install via the shadcn registry in one command, copy the token layer manually for any
            non-React stack, and customize via Claude, vibe coding platform, or your favorite LLM
            to give any AI agent immediate design context — no build step required.
          </Text>
        </div>
        <QuickStartSection showHeading={false} />
        <div className="space-y-4">
          <h3 className="font-display text-base font-medium">Customize with your brand</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {paths.map((item) => (
              <RouterLink
                key={item.to}
                to={item.to}
                className="group flex flex-col gap-3 rounded-lg border border-border bg-card p-5 transition-colors duration-150 hover:border-accent-subtle"
              >
                <div className="flex items-center justify-between">
                  <item.icon className="h-4 w-4 text-accent" />
                  <ArrowRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-accent transition-colors" />
                </div>
                <p className="font-display text-sm font-semibold text-foreground group-hover:text-accent transition-colors">
                  {item.name}
                </p>
              </RouterLink>
            ))}
          </div>
        </div>
      </div>

      {/* What */}
      <div className="space-y-12">
        <div className="space-y-2">
          <Heading level="h2">What</Heading>
          <Text variant="muted" size="sm">
            From design tokens to full-page layouts, every piece is documented, themed across
            three surfaces, and structured for AI consumption. Adopt the whole system or extract
            only what your product needs.
          </Text>
        </div>

        {/* Design Principles */}
        <div>
          <Heading level="h3" className="mb-4">Design principles</Heading>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {principles.map((p, i) => (
              <div key={p.name} className="flex gap-3 rounded-md border border-border bg-card p-5">
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

        {/* Design components */}
        <div>
          <Heading level="h3" className="mb-4">Design components</Heading>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {components.map((c) => {
              const inner = (
                <div className="flex flex-col gap-3 rounded-lg border border-border bg-card p-5 transition-all duration-150 group-hover:-translate-y-px group-hover:shadow-md group-hover:border-accent/30">
                  <div className="flex items-start justify-between">
                    <p className="font-mono text-xl font-medium text-accent">{c.count}</p>
                    <ArrowRight className="h-4 w-4 text-muted-foreground opacity-40 group-hover:opacity-100 transition-opacity mt-0.5" />
                  </div>
                  <div className="space-y-0.5">
                    <p className="font-display text-sm font-medium group-hover:text-accent transition-colors">{c.title}</p>
                    <p className="font-body text-xs text-muted-foreground line-clamp-2">{c.subtitle}</p>
                  </div>
                </div>
              );
              return c.external ? (
                <a key={c.title} href={c.path} target="_blank" rel="noopener noreferrer" className="group block">
                  {inner}
                </a>
              ) : (
                <RouterLink key={c.title} to={c.path} className="group block">
                  {inner}
                </RouterLink>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
