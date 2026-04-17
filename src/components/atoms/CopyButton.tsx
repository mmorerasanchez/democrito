import { Check, Copy } from "lucide-react";
import { forwardRef, useRef, useState } from "react";

import { cn } from "@/lib/utils";

interface CopyButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "value"> {
  /** Text copied to the clipboard when the button is clicked. */
  value: string;
  /** Primary shows label + icon with accent background; ghost is icon-only, typically overlaid on a CodeBlock. */
  variant: "primary" | "ghost";
  /** Visible text for the primary variant. Defaults to `value`. Ignored for ghost. */
  label?: string;
}

const COPIED_DURATION_MS = 2000;

const CopyButton = forwardRef<HTMLButtonElement, CopyButtonProps>(
  ({ value, variant, label, className, onClick, ...props }, ref) => {
    const [copied, setCopied] = useState(false);
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e);
      try {
        await navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), COPIED_DURATION_MS);
      } catch {
        // Fallback: select the nearest <pre> for manual Cmd/Ctrl+C.
        const target = buttonRef.current;
        const pre = target?.closest("div")?.querySelector("pre");
        if (pre) {
          const range = document.createRange();
          range.selectNodeContents(pre);
          const selection = window.getSelection();
          selection?.removeAllRanges();
          selection?.addRange(range);
        }
      }
    };

    const Icon = copied ? Check : Copy;
    const displayLabel = variant === "primary" ? (copied ? "Copied!" : (label ?? value)) : null;
    const ariaLabel = copied ? "Copied to clipboard" : `Copy ${label ?? value} to clipboard`;

    const baseClasses =
      "inline-flex items-center justify-center gap-2 rounded-md font-mono text-sm transition-[filter,background-color,color] duration-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50";

    const variantClasses =
      variant === "primary"
        ? "min-h-[44px] bg-accent text-accent-foreground px-4 py-2 hover:brightness-110 active:scale-[0.98]"
        : "h-11 w-11 min-h-[44px] min-w-[44px] bg-transparent text-foreground-muted hover:bg-surface hover:text-foreground";

    return (
      <button
        ref={(node) => {
          buttonRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
        type="button"
        onClick={handleClick}
        aria-label={ariaLabel}
        className={cn(baseClasses, variantClasses, className)}
        {...props}
      >
        <Icon className="h-4 w-4" aria-hidden="true" />
        {displayLabel && <span className="truncate">{displayLabel}</span>}
        <span className="sr-only" aria-live="polite">
          {copied ? "Copied to clipboard" : ""}
        </span>
      </button>
    );
  },
);
CopyButton.displayName = "CopyButton";

export { CopyButton };
export type { CopyButtonProps };
