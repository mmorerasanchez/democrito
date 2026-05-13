export function ContactCreator() {
  return (
    <div className="space-y-3">
      <p className="font-mono text-2xs uppercase tracking-widest text-muted-foreground">
        Contact
      </p>
      <p className="font-body text-sm text-muted-foreground">
        Questions, collaborations, or feedback on democrito — reach out directly.
      </p>
      <div className="flex flex-wrap gap-x-6 gap-y-1">
        <a
          href="https://www.linkedin.com/in/mmorerasanchez/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-xs text-muted-foreground transition-colors hover:text-accent"
        >
          LinkedIn
        </a>
        <a
          href="mailto:hola@atomic-products.com"
          className="font-mono text-xs text-muted-foreground transition-colors hover:text-accent"
        >
          hola@atomic-products.com
        </a>
      </div>
    </div>
  );
}
