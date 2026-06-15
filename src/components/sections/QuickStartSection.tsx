import { CodeBlock, Text } from "@/components/atoms";
import { INSTALL_COMMAND } from "./install-command";

interface InstallPath {
  title: string;
  recommended?: boolean;
  description: string;
  code: string;
  language: string;
}

const PATHS: InstallPath[] = [
  {
    title: "shadcn registry",
    recommended: true,
    description: "Installs the component registry and drops the AI context files into your project root.",
    code: INSTALL_COMMAND,
    language: "bash",
  },
  {
    title: "Git clone",
    description: "Clone the full repo — useful if you want to browse, fork, or contribute.",
    code: "git clone https://github.com/mmorerasanchez/democrito.git",
    language: "bash",
  },
  {
    title: "Manual download",
    description: "Download CLAUDE.md and DESIGN.md from the repo and drop them into your project root.",
    code: "https://github.com/mmorerasanchez/democrito",
    language: "url",
  },
];

interface QuickStartSectionProps {
  showHeading?: boolean;
}

export function QuickStartSection({ showHeading = true }: QuickStartSectionProps) {
  return (
    <section className="space-y-4">
      {showHeading && (
        <h2 className="font-display text-lg font-medium tracking-tight">
          Quick Start
        </h2>
      )}
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
            {path.recommended && (
              <div className="flex justify-end">
                <a
                  href="https://democrito.design/r/democrito.json"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-2xs text-muted-foreground transition-colors hover:text-accent"
                >
                  registry.json ↗
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
