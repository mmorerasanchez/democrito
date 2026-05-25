import { cn } from "@/lib/utils";
import { forwardRef } from "react";

type HeadingLevel = "h1" | "h2" | "h3" | "h4";

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: HeadingLevel;
  as?: HeadingLevel;
}

const headingStyles: Record<HeadingLevel, string> = {
  h1: "text-2xl font-semibold font-display tracking-tight text-wrap-balance",
  h2: "text-xl font-medium font-display tracking-tight text-wrap-balance",
  h3: "text-md font-medium font-display",
  h4: "text-sm font-medium font-display uppercase tracking-widest text-muted-foreground",
};

/** No icons allowed inside headings — use Text or a wrapper instead. */
const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ level = "h2", as, className, children, ...props }, ref) => {
    const Tag = as || level;
    return (
      <Tag ref={ref} className={cn(headingStyles[level], className)} {...props}>
        {children}
      </Tag>
    );
  },
);
Heading.displayName = "Heading";

export { Heading };
export type { HeadingProps, HeadingLevel };
