import { CopyButton } from "@/components/atoms/CopyButton";
import { tokenizeBrackets } from "@/lib/tokenizeBrackets";

export function StepCode({ language, children }: { language: string; children: string }) {
  return (
    <div className="rounded-md border border-border overflow-hidden">
      <div className="flex items-center justify-between border-b border-border bg-surface px-4 py-1.5">
        <span className="font-mono text-2xs text-muted-foreground">{language}</span>
        <CopyButton
          variant="ghost"
          value={children}
          label="code"
          className="h-7 w-7 min-h-0 min-w-0 -mr-1 opacity-50 hover:opacity-100 transition-opacity"
        />
      </div>
      <pre className="overflow-x-auto bg-muted p-4">
        <code className="font-mono text-xs text-foreground whitespace-pre">
          {tokenizeBrackets(children)}
        </code>
      </pre>
    </div>
  );
}

export function Note({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-md border border-border bg-surface p-5 space-y-3">
      <p className="font-mono text-2xs uppercase tracking-widest text-muted-foreground">
        {label}
      </p>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

export function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-body text-sm leading-relaxed text-muted-foreground">{children}</p>
  );
}

export function Step({
  number,
  title,
  caption,
  language,
  code,
  children,
}: {
  number: number;
  title: string;
  caption?: React.ReactNode;
  language?: string;
  code?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-start gap-3">
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/10 font-mono text-2xs font-bold text-accent mt-0.5">
          {number}
        </span>
        <div>
          <p className="font-display text-sm font-semibold">{title}</p>
          {caption && (
            <div className="mt-1 font-body text-xs leading-relaxed text-muted-foreground">
              {caption}
            </div>
          )}
        </div>
      </div>
      {(code || children) && (
        <div className="pl-9 space-y-3">
          {code && language && <StepCode language={language}>{code}</StepCode>}
          {children}
        </div>
      )}
    </div>
  );
}

export function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <span className="font-mono text-2xs text-muted-foreground uppercase tracking-widest shrink-0">
          {label}
        </span>
        <div className="flex-1 border-t border-border" />
      </div>
      {children}
    </div>
  );
}
