import { CodeBlock, CopyButton } from "@/components/atoms";

const INSTALL_COMMAND =
  "npx shadcn@latest add https://raw.githubusercontent.com/mmorerasanchez/democrito/main/registry.json democrito";

/**
 * Install command CTA. The page-level h1/description live in AiPage;
 * this section only contains the copy-to-clipboard install block.
 */
export function HeroSection() {
  return (
    <section className="space-y-4">
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
