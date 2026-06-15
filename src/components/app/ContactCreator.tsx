export function ContactCreator() {
  return (
    <div className="space-y-3 text-center">
      <p className="font-mono text-2xs uppercase tracking-widest text-muted-foreground">
        Contact
      </p>
      <p className="font-body text-sm text-muted-foreground">
        Questions, collaborations, or feedback on democrito — reach out on{" "}
        <a
          href="https://www.linkedin.com/in/mmorerasanchez/"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors hover:text-accent"
        >
          LinkedIn
        </a>
        {" "}or via{" "}
        <a
          href="mailto:hola@atomic-products.com"
          className="transition-colors hover:text-accent"
        >
          hola@atomic-products.com
        </a>
        .
      </p>
    </div>
  );
}
