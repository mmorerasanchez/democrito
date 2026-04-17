import { CodeBlock, CopyButton, Heading } from "@/components/atoms";

const INSTALL_COMMAND =
  "npx shadcn@latest add https://raw.githubusercontent.com/mmorerasanchez/democrito/main/registry.json democrito";

export function HeroSection() {
  return (
    <section className="flex flex-col gap-6 pt-20 pb-4">
      <Heading
        level="h1"
        className="font-display text-3xl font-bold md:text-4xl"
      >
        Built for AI-Native Development
      </Heading>
      <p className="max-w-2xl font-body text-lg text-muted-foreground">
        The first open-source design system with structured AI context files.
        Drop three files into your project and every AI assistant produces on-brand output.
      </p>

      {/* Mobile: command in a scrollable CodeBlock with a full-width CopyButton below. */}
      <div className="flex flex-col gap-3 md:hidden">
        <CodeBlock code={INSTALL_COMMAND} language="bash" showCopy={false} />
        <CopyButton
          variant="primary"
          value={INSTALL_COMMAND}
          label="Copy install command"
          className="w-full"
        />
      </div>

      {/* Desktop: single-row primary button with the command inline. */}
      <div className="hidden md:block">
        <CopyButton
          variant="primary"
          value={INSTALL_COMMAND}
          label={INSTALL_COMMAND}
          className="max-w-full"
        />
      </div>
    </section>
  );
}
