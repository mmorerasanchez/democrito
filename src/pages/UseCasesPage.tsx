import { Link } from "react-router-dom";
import { ArrowRight, Code2, BarChart3, Workflow } from "lucide-react";
import { Heading, Text } from "@/components/atoms";

const personas = [
  {
    slug: "solo-developer",
    icon: Code2,
    name: "Solo Developer",
    badge: "Persona 1",
    desc: "Building an AI prompt library with Lovable + Claude Code. Violet accent, dark-first, mono-heavy.",
  },
  {
    slug: "startup",
    icon: BarChart3,
    name: "Two-person Startup",
    badge: "Persona 2",
    desc: "Building a developer observability dashboard. Blue accent, professional dual-theme.",
  },
  {
    slug: "growth-engineer",
    icon: Workflow,
    name: "Growth Engineer",
    badge: "Persona 3",
    desc: "Building an internal AI ops platform. Amber accent, dark warm, optimised for sustained use.",
  },
];

export default function UseCasesPage() {
  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="space-y-2">
        <Heading level="h1">Use Cases</Heading>
        <Text size="lg" variant="muted" className="max-w-prose">
          Three real projects. Full implementation decisions — from the problem through the token
          overrides.
        </Text>
      </div>

      {/* Persona cards */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {personas.map((p) => (
          <Link
            key={p.slug}
            to={`/use-cases/${p.slug}`}
            className="group flex items-start gap-3 rounded-lg border border-border bg-card p-4 transition-all duration-150 hover:-translate-y-px hover:shadow-md hover:border-accent/30"
          >
            <div className="rounded-md bg-accent/10 p-2 text-accent shrink-0">
              <p.icon className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-mono text-2xs text-muted-foreground mb-0.5">{p.badge}</p>
              <p className="font-display text-sm font-medium group-hover:text-accent transition-colors">
                {p.name}
              </p>
              <p className="font-body text-xs text-muted-foreground line-clamp-2 mt-0.5">{p.desc}</p>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity mt-0.5 shrink-0" />
          </Link>
        ))}
      </div>
    </div>
  );
}
