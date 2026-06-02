import { ExternalLink } from "lucide-react";
import { Heading, Text } from "@/components/atoms";
import { Card } from "@/components/ui/card";

interface FileCardData {
  filename: string;
  role: string;
  description: string;
  githubUrl: string;
  rawUrl: string;
}

const FILES: FileCardData[] = [
  {
    filename: "CLAUDE.md",
    role: "Coding Rules",
    description:
      "Project stack, code conventions, architecture rules, common mistakes. Loaded automatically by Claude Code on session start.",
    githubUrl: "https://github.com/mmorerasanchez/democrito/blob/main/CLAUDE.md",
    rawUrl: "https://raw.githubusercontent.com/mmorerasanchez/democrito/main/CLAUDE.md",
  },
  {
    filename: "DESIGN.md",
    role: "Design Philosophy",
    description:
      "Visual principles, colour system rationale, typography rules, spacing philosophy. The \"taste\" layer that guides aesthetic decisions.",
    githubUrl: "https://github.com/mmorerasanchez/democrito/blob/main/DESIGN.md",
    rawUrl: "https://raw.githubusercontent.com/mmorerasanchez/democrito/main/DESIGN.md",
  },
  {
    filename: "docs/design-system.md",
    role: "Token Inventory",
    description:
      "Complete reference of CSS custom properties, component inventory, variant specifications. The machine-readable specification.",
    githubUrl: "https://github.com/mmorerasanchez/democrito/blob/main/docs/design-system.md",
    rawUrl: "https://raw.githubusercontent.com/mmorerasanchez/democrito/main/docs/design-system.md",
  },
  {
    filename: "AGENTS.md",
    role: "Cross-tool Agent Context",
    description:
      "The tool-agnostic sibling of CLAUDE.md — same project rules and architecture, in the format Cursor, Copilot, and Codex auto-load. One repo, every agent on-system.",
    githubUrl: "https://github.com/mmorerasanchez/democrito/blob/main/AGENTS.md",
    rawUrl: "https://raw.githubusercontent.com/mmorerasanchez/democrito/main/AGENTS.md",
  },
];

export function FileArchitectureSection() {
  return (
    <section className="space-y-4">
      <Heading level="h2">Agent context architecture</Heading>
      <Text variant="muted" size="sm">
        Four plain-text files give any AI agent the rules, the reasoning, and the inventory it needs to build on-system — loaded automatically by the tools that read them.
      </Text>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {FILES.map((file) => (
          <Card
            key={file.filename}
            className="flex flex-col gap-3 rounded-lg border border-border bg-card p-5 transition-colors duration-150 hover:border-accent-subtle"
          >
            <p className="font-mono text-base font-medium text-foreground">
              {file.filename}
            </p>
            <p className="font-display text-sm text-accent">{file.role}</p>
            <Text variant="muted" size="sm">
              {file.description}
            </Text>
            <a
              href={file.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto flex items-center gap-1 font-mono text-2xs text-muted-foreground hover:text-accent transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="h-3 w-3" />
              View on GitHub
            </a>
            <a
              href={file.rawUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 font-mono text-2xs text-muted-foreground hover:text-accent transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="h-3 w-3" />
              View raw
            </a>
          </Card>
        ))}
      </div>
    </section>
  );
}
