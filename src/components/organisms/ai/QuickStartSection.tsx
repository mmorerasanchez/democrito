import { CodeBlock, Heading, Text } from "@/components/atoms";

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
    <section className="flex flex-col gap-6">
      <Heading level="h2" className="text-2xl font-semibold">
        Quick Start
      </Heading>
      <div className="flex flex-col gap-6">
        {PATHS.map((path) => (
          <div key={path.title} className="flex flex-col gap-2">
            <div className="flex items-baseline gap-2">
              <Heading level="h3" className="text-base">
                {path.title}
              </Heading>
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
