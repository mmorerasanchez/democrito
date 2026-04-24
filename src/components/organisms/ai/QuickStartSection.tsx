import { CodeBlock, Text } from "@/components/atoms";

interface InstallPath {
  title: string;
  recommended?: boolean;
  description: string;
  code: string;
  language: string;
}

const PATHS: InstallPath[] = [
  {
    title: "shadcn Registry",
    recommended: true,
    description: "Installs the component registry and drops the AI context files into your project root.",
    code: "npx shadcn@latest add https://raw.githubusercontent.com/mmorerasanchez/democrito/main/registry.json democrito",
    language: "bash",
  },
  {
    title: "Git Clone",
    description: "Clone the full repo — useful if you want to browse, fork, or contribute.",
    code: "git clone https://github.com/mmorerasanchez/democrito.git",
    language: "bash",
  },
  {
    title: "Manual Download",
    description: "Download CLAUDE.md and DESIGN.md from the repo and drop them into your project root.",
    code: "https://github.com/mmorerasanchez/democrito",
    language: "url",
  },
];

export function QuickStartSection() {
  return (
    <section className="space-y-4">
      <h2 className="font-display text-lg font-medium tracking-tight">
        Quick Start
      </h2>
      <div className="space-y-6">
        {PATHS.map((path) => (
          <div key={path.title} className="space-y-2">
            <div className="flex items-baseline gap-2">
              <h3 className="font-display text-base font-medium">
                {path.title}
              </h3>
              {path.recommended && (
                <span className="font-mono text-xs uppercase tracking-wide text-accent">
                  recommended
                </span>
              )}
            </div>
            <Text variant="muted" size="sm">
              {path.description}
            </Text>
            <CodeBlock code={path.code} language={path.language} />
          </div>
        ))}
      </div>
    </section>
  );
}
