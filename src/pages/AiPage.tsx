import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Code2, Layers } from "lucide-react";
import { TokenReferenceCard } from "@/components/molecules/TokenReferenceCard";
import {
  ComparisonSection,
  EcosystemSection,
  FileArchitectureSection,
  HeroSection,
  QuickStartSection,
} from "@/components/organisms/ai";

const platforms = [
  {
    path: "/ai/claude-design",
    icon: Sparkles,
    name: "Claude Design",
    badge: "Anthropic Labs",
    desc: "Import DESIGN.md and src/index.css during onboarding. Every generation follows democrito's surface hierarchy, font rules, and accent constraints — automatically.",
  },
  {
    path: "/ai/lovable",
    icon: Code2,
    name: "Lovable",
    badge: "Primary build env",
    desc: "Two-tier knowledge: democrito's global rules in Workspace Knowledge, product-specific overrides in Project Knowledge. Connect GitHub for direct CLAUDE.md access.",
  },
  {
    path: "/ai/stitch",
    icon: Layers,
    name: "Google Stitch",
    badge: "Google Labs",
    desc: "democrito ships DESIGN.md in the Stitch open-source format. Import it and generated screens follow democrito's visual rules. A token mapping pass is needed after export.",
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
      <QuickStartSection />
      <ComparisonSection />

      {/* Integrations */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="font-display text-lg font-medium tracking-tight">
            Integrations
          </h2>
          <p className="font-body text-sm text-muted-foreground">
            democrito ships structured context files for every major AI tool. Pick your platform.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {platforms.map((p) => (
            <Link
              key={p.path}
              to={p.path}
              className="group flex items-start gap-3 rounded-lg border border-border bg-card p-4 transition-all duration-150 hover:-translate-y-px hover:shadow-md hover:border-accent/30"
            >
              <div className="rounded-md bg-accent/10 p-2 text-accent shrink-0">
                <p.icon className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline gap-2 mb-0.5">
                  <span className="font-display text-sm font-medium group-hover:text-accent transition-colors">
                    {p.name}
                  </span>
                  <span className="font-mono text-2xs text-muted-foreground">
                    {p.badge}
                  </span>
                </div>
                <p className="font-body text-xs text-muted-foreground line-clamp-3">
                  {p.desc}
                </p>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity mt-0.5 shrink-0" />
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-lg font-medium tracking-tight">
          Token Quick Reference
        </h2>
        <TokenReferenceCard />
      </section>

      <EcosystemSection />
    </div>
  );
}
