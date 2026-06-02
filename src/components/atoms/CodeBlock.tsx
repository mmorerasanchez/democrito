import { forwardRef } from "react";

import { CopyButton } from "@/components/atoms/CopyButton";
import { cn } from "@/lib/utils";
import { tokenizeBrackets } from "@/lib/tokenizeBrackets";

interface CodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The code to render and optionally copy. Preserve whitespace exactly as written. */
  code: string;
  /** Optional language label shown in the top-left corner (e.g. "bash", "tsx"). */
  language?: string;
  /** Whether to render the overlay copy button. Defaults to true. */
  showCopy?: boolean;
}

/**
 * Multi-line code display. Uses `--surface` (not `--card`) to keep it positioned as
 * content, not an elevated container. Overflow is horizontal-scroll only — never wrap.
 */
const CodeBlock = forwardRef<HTMLDivElement, CodeBlockProps>(
  ({ code, language, showCopy = true, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "group relative rounded-lg bg-surface",
          language ? "pt-8 pb-4" : "py-4",
          "px-4",
          className,
        )}
        {...props}
      >
        {language && (
          <span className="absolute left-3 top-2 font-mono text-xs text-foreground-muted">
            {language}
          </span>
        )}
        {showCopy && (
          <CopyButton
            variant="ghost"
            value={code}
            label={language ? `${language} snippet` : "code snippet"}
            className="absolute right-2 top-2 h-9 w-9 min-h-0 min-w-0 opacity-50 transition-opacity duration-100 group-hover:opacity-100 focus-visible:opacity-100"
          />
        )}
        <pre
          role="code"
          className="overflow-x-auto whitespace-pre font-mono text-sm text-foreground"
        >
          {tokenizeBrackets(code)}
        </pre>
      </div>
    );
  },
);
CodeBlock.displayName = "CodeBlock";

export { CodeBlock };
export type { CodeBlockProps };
