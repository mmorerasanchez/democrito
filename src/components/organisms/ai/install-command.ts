/**
 * Single source of truth for the democrito shadcn registry install command.
 * Used by HeroSection (top of /ai) and QuickStartSection so the two install
 * snippets can never drift apart. Update REGISTRY_URL here to propagate the
 * change to every surface that renders the command.
 */
export const REGISTRY_URL =
  "https://democrito.design/r/democrito.json";

export const INSTALL_COMMAND = `npx shadcn@latest add ${REGISTRY_URL} democrito`;
