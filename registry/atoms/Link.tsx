import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  external?: boolean;
}

const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ external, className, children, ...props }, ref) => {
    return (
      <a
        ref={ref}
        className={cn(
          "font-body text-foreground bg-link-highlight px-0.5 rounded-sm transition-colors hover:text-accent",
          className,
        )}
        {...(external && { target: "_blank", rel: "noopener noreferrer" })}
        {...props}
      >
        {children}
        {external && <span aria-hidden="true"> ↗</span>}
      </a>
    );
  },
);
Link.displayName = "Link";

export { Link };
export type { LinkProps };
