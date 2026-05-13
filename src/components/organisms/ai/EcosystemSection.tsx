import { Link, Tag, Text } from "@/components/atoms";
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
    href: "https://democrito.design/r/democrito.json",
    external: true,
  },
  {
    name: "Claude Skill",
    description: "Dedicated Claude skill for generating democrito-compliant components on demand.",
    status: "live",
    href: "https://raw.githubusercontent.com/mmorerasanchez/democrito/main/skill/democrito/SKILL.md",
    external: true,
  },
];

export function EcosystemSection() {
  return (
    <section className="space-y-4">
      <h2 className="font-display text-lg font-medium tracking-tight">
        Ecosystem
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {ITEMS.map((item) => (
          <Card
            key={item.name}
            className="flex flex-col gap-3 rounded-lg border border-border bg-card p-5 overflow-hidden"
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-display text-base font-medium">
                {item.name}
              </h3>
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
                className="font-mono text-xs truncate block"
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
