import { Heading, Link, Tag, Text } from "@/components/atoms";
import { Card } from "@/components/ui/card";

interface EcosystemItem {
  name: string;
  description: string;
  status: "live" | "coming-soon";
  href?: string;
  external?: boolean;
}

const ITEMS: EcosystemItem[] = [
  {
    name: "shadcn Registry",
    description: "Installable component registry for Claude, Cursor, and other shadcn-aware tooling.",
    status: "live",
    href: "https://raw.githubusercontent.com/mmorerasanchez/democrito/main/registry.json",
    external: true,
  },
  {
    name: "Claude Skill",
    description: "Dedicated Claude skill for generating democrito-compliant components on demand.",
    status: "coming-soon",
  },
  {
    name: "llms.txt",
    description: "Concise project summary for LLM agents — stack, install, design principles.",
    status: "live",
    href: "/llms.txt",
  },
  {
    name: "robots.txt",
    description: "Standard crawler permissions with forward-looking sitemap reference.",
    status: "live",
    href: "/robots.txt",
  },
  {
    name: "npm Package",
    description: "First-class npm distribution with versioned releases.",
    status: "coming-soon",
  },
];

export function EcosystemSection() {
  return (
    <section className="flex flex-col gap-6">
      <Heading level="h2" className="text-2xl font-semibold">
        Ecosystem
      </Heading>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {ITEMS.map((item) => (
          <Card key={item.name} className="flex flex-col gap-3 p-5">
            <div className="flex items-start justify-between gap-3">
              <Heading level="h3" className="text-base">
                {item.name}
              </Heading>
              {item.status === "live" ? (
                <Tag color="emerald">Live</Tag>
              ) : (
                <Tag>Coming soon</Tag>
              )}
            </div>
            <Text variant="muted" size="sm">
              {item.description}
            </Text>
            {item.href && (
              <Link
                href={item.href}
                external={item.external}
                className="font-mono text-xs"
              >
                {item.href}
              </Link>
            )}
          </Card>
        ))}
      </div>
    </section>
  );
}
