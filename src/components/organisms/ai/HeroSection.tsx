import { CodeBlock } from "@/components/atoms";

const INSTALL_COMMAND =
  "npx shadcn@latest add https://raw.githubusercontent.com/mmorerasanchez/democrito/main/registry.json democrito";

/**
 * Install command CTA. The page-level h1/description live in AiPage;
 * this section only contains the install block — styled like the
 * Quick Start CodeBlocks for visual consistency across the page.
 */
export function HeroSection() {
  return (
    <section className="space-y-4">
      <CodeBlock code={INSTALL_COMMAND} language="bash" />
    </section>
  );
}
