import { cn } from "@/lib/utils";

interface VariableHighlightProps {
  /** Variable name without braces */
  name: string;
  /** Resolved value (shown on hover or inline) */
  resolvedValue?: string;
  /** Whether the variable is unresolved / missing */
  unresolved?: boolean;
  /** Click handler */
  onClick?: (name: string) => void;
  className?: string;
}

/**
 * VariableHighlight — Inline styled {{variable}} token.
 * Shows accent-colored variable name with optional click-to-highlight
 * and unresolved state (error styling).
 */
export function VariableHighlight({
  name,
  resolvedValue,
  unresolved = false,
  onClick,
  className,
}: VariableHighlightProps) {
  return (
    <button
      type="button"
      onClick={() => onClick?.(name)}
      title={resolvedValue ? `Resolved: ${resolvedValue}` : unresolved ? "Unresolved variable" : name}
      className={cn(
        "inline-flex items-center rounded-sm border px-1.5 py-0.5 font-mono text-sm font-medium transition-colors duration-150",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        unresolved
          ? "border-error-border bg-error-bg text-error"
          : "border-accent/30 bg-accent/10 text-accent hover:bg-accent/20",
        className,
      )}
    >
      {"{{"}
      {name}
      {"}}"}
    </button>
  );
}
