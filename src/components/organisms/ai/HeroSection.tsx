import { CodeBlock } from "@/components/atoms";
import { CopyButton } from "@/components/atoms/CopyButton";
import { INSTALL_COMMAND } from "./install-command";

/**
 * Install command CTA. Renders the install snippet in a CodeBlock with the
 * default ghost copy disabled, then overlays an explicit CopyButton that
 * stays fully visible on touch devices (no hover required) and remains
 * consistent with the ghost variant used elsewhere on desktop.
 */
export function HeroSection() {
  return (
    <section className="space-y-4">
      <h2 className="font-display text-lg font-medium tracking-tight">Install</h2>
      <p className="font-body text-sm text-muted-foreground max-w-2xl">
        Add democrito to your project in one command — tokens, fonts, and CSS custom
        properties across three themes, ready to use.
      </p>
      <div className="relative">
        <CodeBlock
          code={INSTALL_COMMAND}
          language="bash"
          showCopy={false}
          // Reserve space on the right so the copy button never overlaps
          // the code, regardless of line length, wrapping, or font size.
          className="pr-14"
        />
        <CopyButton
          variant="ghost"
          value={INSTALL_COMMAND}
          label="install command"
          className="absolute right-2 top-2 h-9 w-9 min-h-0 min-w-0 opacity-100 md:opacity-50 md:transition-opacity md:duration-100 md:hover:opacity-100 md:focus-visible:opacity-100"
        />
      </div>
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
    </section>
  );
}
