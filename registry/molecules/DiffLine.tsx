import { cn } from "@/lib/utils";

interface DiffLineProps {
  /** Line number */
  lineNumber: number;
  /** Type of diff */
  type: "added" | "removed" | "unchanged";
  /** Text content */
  text: string;
  className?: string;
}

/**
 * DiffLine — A single line in a diff view.
 * Shows line number, +/− prefix, and text with semantic coloring.
 */
export function DiffLine({ lineNumber, type, text, className }: DiffLineProps) {
  return (
    <div
      className={cn(
        "flex items-start gap-2 px-3 py-0.5 font-mono text-xs leading-relaxed",
        type === "added" && "bg-success-bg text-success",
        type === "removed" && "bg-error-bg text-error",
        type === "unchanged" && "text-foreground",
        className,
      )}
    >
      <span className="w-5 shrink-0 select-none text-right text-foreground-subtle">
        {lineNumber}
      </span>
      <span className={cn(
        "flex-1 whitespace-pre-wrap",
        type !== "unchanged" && "font-medium",
      )}>
        {type === "added" && "+ "}
        {type === "removed" && "− "}
        {text || "\u00A0"}
      </span>
    </div>
  );
}
