import { Link } from "react-router-dom";
import { Star, ExternalLink, ArrowRight, Sparkles, Code2, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Heading, Text, Code, CodeBlock } from "@/components/atoms";
import {
  EcosystemSection,
  FileArchitectureSection,
  HeroSection,
} from "@/components/organisms/ai";

const REPO_URL = "https://github.com/mmorerasanchez/democrito";

const installCode = `git clone ${REPO_URL}.git
cd democrito
npm install
npm run dev`;

const platforms = [
  {
    path: "/ai/claude",
    icon: Sparkles,
    name: "Claude",
    badge: "Anthropic",
    desc: "Four tools — chat, design, Cowork, and terminal — with a single context layer. CLAUDE.md, DESIGN.md, and the compact token block keep every Claude surface on-brand from the first prompt.",
  },
  {
    path: "/ai/vibe-coding",
    icon: Code2,
    name: "Vibe Coding Tools",
    badge: "Lovable · Stitch · Replit",
    desc: "Visual-first builders that generate full apps from prompts. democrito's context files — DESIGN.md, CLAUDE.md, and the token block — wire into each platform's knowledge layer.",
  },
  {
    path: "/ai/github",
    icon: Github,
    name: "GitHub",
    badge: "Open Source",
    desc: "Fork it, star it, contribute back. The repo ships with structured context files for every AI tool — browse the source, customize your setup, or propose a new component.",
  },
];

/**
 * /ai — documentation page rendered inside ShowcaseLayout.
 * Sibling of Overview, Tokens, Atoms, etc. — uses the showcase
 * page pattern (page header + section blocks).
 */
export default function AiPage() {
  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <h1 className="font-display text-xl font-semibold tracking-tight">
          AI Integration
        </h1>
        <p className="max-w-2xl font-body text-base text-muted-foreground">
          The first open-source design system with structured AI context files.
          Drop three files into your project and every AI assistant produces on-brand output.
        </p>
      </div>

      <HeroSection />
      <FileArchitectureSection />

      {/* Three Ways to Interact */}
      <section className="space-y-4">
        <h2 className="font-display text-lg font-medium tracking-tight">
          Three Ways to Interact
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {platforms.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="group flex flex-col gap-3 rounded-lg border border-border bg-card p-5 transition-colors duration-150 hover:border-accent-subtle"
            >
              <div className="flex items-center justify-between">
                <item.icon className="h-4 w-4 text-accent" />
                <ArrowRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-accent transition-colors" />
              </div>
              <div>
                <p className="font-display text-sm font-semibold text-foreground group-hover:text-accent transition-colors">
                  {item.name}
                </p>
                <p className="font-mono text-xs text-muted-foreground">{item.badge}</p>
              </div>
              <p className="font-body text-sm text-muted-foreground">
                {item.desc}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <EcosystemSection />

      {/* Getting Started */}
      <div>
        <Heading level="h2" className="mb-4">Getting Started</Heading>
        <div className="rounded-lg border border-border bg-card p-6 space-y-6">
          <CodeBlock code={installCode} language="bash" />
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
    </div>
  );
}
