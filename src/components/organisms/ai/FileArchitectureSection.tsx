import { Heading, Text } from "@/components/atoms";
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
    <section className="flex flex-col gap-6">
      <Heading level="h2" className="text-2xl font-semibold">
        Three-File Architecture
      </Heading>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {FILES.map((file) => (
          <Card
            key={file.filename}
            className="flex flex-col gap-3 p-5 transition-colors duration-150 hover:border-accent-subtle"
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
