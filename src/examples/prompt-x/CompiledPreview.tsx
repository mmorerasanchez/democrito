import { cn } from "@/lib/utils";
import { TokenCounter } from "@/components/molecules/TokenCounter";
import { useMemo, useCallback } from "react";

interface CompiledPreviewProps {
  content: string;
  totalTokens?: number;
  maxTokens?: number;
  onVariableClick?: (variableName: string) => void;
  className?: string;
}

/** Split content into text segments and `{{variable}}` segments. */
function parseVariables(content: string) {
  const regex = /\{\{(\w+)\}\}/g;
  const parts: { text: string; variable?: string }[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(content)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ text: content.slice(lastIndex, match.index) });
    }
    parts.push({ text: match[0], variable: match[1] });
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < content.length) {
    parts.push({ text: content.slice(lastIndex) });
  }
  return parts;
}

/**
 * CompiledPreview — read-only view of the fully compiled prompt with
 * all anatomy fields merged and variables resolved. Shows token usage.
 * Clicking a {{variable}} fires onVariableClick with the variable name.
 */
export function CompiledPreview({
  content,
  totalTokens,
  maxTokens = 4096,
  onVariableClick,
  className,
}: CompiledPreviewProps) {
  const parts = useMemo(() => parseVariables(content), [content]);

  const handleClick = useCallback(
    (varName: string) => {
      onVariableClick?.(varName);
    },
    [onVariableClick],
  );

  return (
    <div className={cn("flex flex-col rounded-md border border-border bg-card", className)}>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-3 py-2">
        <span className="font-display text-sm font-medium text-foreground">Compiled Output</span>
        {totalTokens !== undefined && (
          <TokenCounter current={totalTokens} max={maxTokens} compact />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-3">
        {content ? (
          <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed text-foreground">
            {parts.map((part, i) =>
              part.variable ? (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleClick(part.variable!)}
                  className="inline rounded-sm border border-accent/30 bg-accent/10 px-1 py-0.5 font-mono text-xs text-accent transition-colors duration-150 hover:bg-accent/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {part.text}
                </button>
              ) : (
                <span key={i}>{part.text}</span>
              ),
            )}
          </pre>
        ) : (
          <p className="py-8 text-center font-body text-sm text-foreground-subtle italic">
            No compiled output yet — add content to anatomy fields.
          </p>
        )}
      </div>
    </div>
  );
}
