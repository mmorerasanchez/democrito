import * as React from "react";
import { cn } from "@/lib/utils";

type CategoryColor = "teal" | "amber" | "emerald" | "orange" | "violet" | "rose" | "blue" | "red" | "gold";

/** @deprecated Use CategoryColor instead */
type AnatomyColor = CategoryColor;

const categoryColorMap: Record<CategoryColor, string> = {
  teal: "bg-category-teal/10 text-category-teal border-category-teal/30",
  amber: "bg-category-amber/10 text-category-amber border-category-amber/30",
  emerald: "bg-category-emerald/10 text-category-emerald border-category-emerald/30",
  orange: "bg-category-orange/10 text-category-orange border-category-orange/30",
  violet: "bg-category-violet/10 text-category-violet border-category-violet/30",
  rose: "bg-category-rose/10 text-category-rose border-category-rose/30",
  blue: "bg-category-blue/10 text-category-blue border-category-blue/30",
  red: "bg-category-red/10 text-category-red border-category-red/30",
  gold: "bg-category-gold/10 text-category-gold border-category-gold/30",
};

/** Maps legacy anatomy field names to category colors */
const anatomyToCategory: Record<string, CategoryColor> = {
  role: "teal", tone: "amber", context: "emerald", task: "orange",
  reasoning: "violet", examples: "rose", output: "blue", constraints: "red", tools: "gold",
};

interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "removable" | "selectable";
  selected?: boolean;
  onRemove?: () => void;
  color?: CategoryColor;
}

const Tag = React.forwardRef<HTMLSpanElement, TagProps>(
  ({ className, variant = "default", selected, onRemove, color, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center gap-1 rounded-sm border px-2 py-0.5 font-mono text-xs transition-colors",
          color
            ? categoryColorMap[color]
            : selected
              ? "border-accent bg-card text-accent"
              : "border-border bg-muted text-foreground",
          variant === "selectable" && "cursor-pointer hover:bg-card",
          className,
        )}
        {...props}
      >
        {children}
        {variant === "removable" && (
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onRemove?.(); }}
            className="ml-0.5 rounded-sm text-muted-foreground hover:text-foreground"
            aria-label="Remove"
          >
            ×
          </button>
        )}
      </span>
    );
  },
);
Tag.displayName = "Tag";

export { Tag };
export type { TagProps, CategoryColor, AnatomyColor };
export { anatomyToCategory };
