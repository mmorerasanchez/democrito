export function Footer() {
  return (
    <p className="font-mono text-2xs text-muted-foreground">
      Made with ❤️ from 🇪🇸 by{" "}
      <a
        href="https://atomic-products.com"
        target="_blank"
        rel="noopener noreferrer"
        className="transition-colors hover:text-accent"
      >
        Mariano at atomic products
      </a>
      {" · "}
      <a
        href="https://github.com/mmorerasanchez/democrito"
        target="_blank"
        rel="noopener noreferrer"
        className="transition-colors hover:text-accent"
      >
        github.com/mmorerasanchez/democrito
      </a>
    </p>
  );
}
