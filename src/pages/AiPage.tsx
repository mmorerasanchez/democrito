import { Link } from "react-router-dom";
import { ArrowRight, Github, Heart } from "lucide-react";
import {
  EcosystemSection,
  FileArchitectureSection,
  HeroSection,
} from "@/components/organisms/ai";

function AnthropicIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path d="M13.827 3.52h3.603L24 20h-3.603l-6.57-16.48zm-7.258 0h3.767L16.906 20h-3.674l-1.343-3.461H5.017L3.674 20H0L6.57 3.52zm4.132 9.959L8.453 7.687 6.205 13.48h4.496z" />
    </svg>
  );
}

const platforms = [
  {
    path: "/ai/claude",
    icon: AnthropicIcon,
    name: "Claude",
    badge: "Anthropic",
    desc: "Four tools — chat, design, Cowork, and terminal — with a single context layer. CLAUDE.md, DESIGN.md, and the compact token block keep every Claude surface on-brand from the first prompt.",
  },
  {
    path: "/ai/vibe-coding",
    icon: Heart,
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
    </div>
  );
}
