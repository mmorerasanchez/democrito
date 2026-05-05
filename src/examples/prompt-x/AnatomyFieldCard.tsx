import * as React from "react";
import { cn } from "@/lib/utils";

type AnatomyField = "role" | "tone" | "context" | "task" | "reasoning" | "examples" | "output" | "constraints" | "tools";
type CardVariant = "atomic" | "compact" | "expanded" | "inactive";

const fieldLabels: Record<AnatomyField, string> = {
  role: "Role",
  tone: "Tone",
  context: "Context",
  task: "Task",
  reasoning: "Reasoning",
  examples: "Examples",
  output: "Output",
  constraints: "Constraints",
  tools: "Tools",
};

const fieldDotColors: Record<AnatomyField, string> = {
  role: "bg-category-teal",
  tone: "bg-category-amber",
  context: "bg-category-emerald",
  task: "bg-category-orange",
  reasoning: "bg-category-violet",
  examples: "bg-category-rose",
  output: "bg-category-blue",
  constraints: "bg-category-red",
  tools: "bg-category-gold",
};

interface AnatomyFieldCardProps {
  field: AnatomyField;
  variant?: CardVariant;
  content?: string;
  tokenCount?: number;
  className?: string;
}

function AnatomyFieldCard({
  field,
  variant = "compact",
  content = "",
  tokenCount,
  className,
}: AnatomyFieldCardProps) {
  const label = fieldLabels[field];
  const isInactive = variant === "inactive";

  return (
    <div
      className={cn(
        "rounded-md border border-border bg-card transition-colors",
        isInactive && "opacity-50",
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-border">
        <div className="flex items-center gap-2">
          <span className={cn("h-2 w-2 rounded-full", fieldDotColors[field])} />
          <span className="font-display text-sm font-medium text-foreground">{label}</span>
        </div>
        {tokenCount !== undefined && (
          <span className="font-mono text-2xs text-muted-foreground">
            {tokenCount.toLocaleString()} tokens
          </span>
        )}
      </div>

      {/* Content area — varies by variant */}
      {variant === "atomic" && null}

      {variant === "compact" && content && (
        <div className="px-3 py-2">
          <p className="font-mono text-xs text-muted-foreground line-clamp-2">{content}</p>
        </div>
      )}

      {variant === "expanded" && (
        <div className="px-3 py-2">
          <pre className="whitespace-pre-wrap font-mono text-xs text-foreground leading-relaxed">
            {content || <span className="text-foreground-subtle italic">Empty field…</span>}
          </pre>
        </div>
      )}

      {variant === "inactive" && content && (
        <div className="px-3 py-2">
          <p className="font-mono text-xs text-muted-foreground line-clamp-1">{content}</p>
        </div>
      )}
    </div>
  );
}

AnatomyFieldCard.displayName = "AnatomyFieldCard";

export { AnatomyFieldCard };
export type { AnatomyFieldCardProps, AnatomyField, CardVariant };
