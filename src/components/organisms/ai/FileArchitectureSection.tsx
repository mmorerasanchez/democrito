import { Text } from "@/components/atoms";
import { Card } from "@/components/ui/card";

interface FileCardData {
  filename: string;
  role: string;
  description: string;
}

const FILES: FileCardData[] = [
  {
    filename: "CLAUDE.md",
    role: "Coding Rules",
    description:
      "Project stack, code conventions, architecture rules, common mistakes. Loaded automatically by Claude Code on session start.",
  },
  {
    filename: "DESIGN.md",
    role: "Design Philosophy",
    description:
      "Visual principles, colour system rationale, typography rules, spacing philosophy. The \"taste\" layer that guides aesthetic decisions.",
  },
  {
    filename: "DESIGN_SYSTEM.md",
    role: "Token Inventory",
    description:
      "Complete reference of CSS custom properties, component inventory, variant specifications. The machine-readable specification.",
  },
];

export function FileArchitectureSection() {
  return (
    <section className="space-y-4">
      <h2 className="font-display text-lg font-medium tracking-tight">
        Three-File Architecture
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
          </Card>
        ))}
      </div>
    </section>
  );
}
