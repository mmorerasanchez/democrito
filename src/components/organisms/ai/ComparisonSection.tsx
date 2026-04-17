import { CodeBlock, Heading } from "@/components/atoms";

const WITHOUT_SNIPPET = `// Generic button — no design system context
<button style={{
  background: '#3b82f6',
  padding: '8px 16px',
  borderRadius: '4px',
  color: 'white',
  fontSize: '14px'
}}>
  Submit
</button>`;

const WITH_SNIPPET = `// democrito-aware — tokens, typography, atomic design
<Button
  variant="default"
  className="bg-accent text-accent-foreground font-display"
>
  Submit
</Button>`;

export function ComparisonSection() {
  return (
    <section className="flex flex-col gap-6">
      <Heading level="h2" className="text-2xl font-semibold">
        How It Works
      </Heading>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <ComparisonPanel
          label="Without democrito context"
          code={WITHOUT_SNIPPET}
          ariaLabel="AI output without democrito context"
          className="md:pr-3 md:border-r md:border-border"
        />
        <ComparisonPanel
          label="With democrito context"
          code={WITH_SNIPPET}
          ariaLabel="AI output with democrito context"
          className="border-t border-border pt-6 md:border-t-0 md:pt-0 md:pl-3"
        />
      </div>
    </section>
  );
}

interface PanelProps {
  label: string;
  code: string;
  ariaLabel: string;
  className?: string;
}

function ComparisonPanel({ label, code, ariaLabel, className }: PanelProps) {
  return (
    <div aria-label={ariaLabel} className={className}>
      <p className="mb-3 font-display text-sm font-medium uppercase tracking-wide text-foreground-muted">
        {label}
      </p>
      <CodeBlock code={code} language="tsx" />
    </div>
  );
}
