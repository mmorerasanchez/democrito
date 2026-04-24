import { CodeBlock } from "@/components/atoms";

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
    <section className="space-y-4">
      <h2 className="font-display text-lg font-medium tracking-tight">
        How It Works
      </h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <ComparisonPanel
          label="Without democrito context"
          code={WITHOUT_SNIPPET}
          ariaLabel="AI output without democrito context"
          className="sm:pr-3 sm:border-r sm:border-border"
        />
        <ComparisonPanel
          label="With democrito context"
          code={WITH_SNIPPET}
          ariaLabel="AI output with democrito context"
          className="border-t border-border pt-6 sm:border-t-0 sm:pt-0 sm:pl-3"
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
