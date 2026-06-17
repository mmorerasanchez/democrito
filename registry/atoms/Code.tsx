import { cn } from "@/lib/utils";
import { forwardRef } from "react";

type CodeProps = React.HTMLAttributes<HTMLElement>;

const Code = forwardRef<HTMLElement, CodeProps>(({ className, ...props }, ref) => {
  return (
    <code
      ref={ref}
      className={cn(
        "rounded-sm border border-border bg-accent/10 px-1.5 py-0.5 font-mono text-sm text-accent",
        className,
      )}
      {...props}
    />
  );
});
Code.displayName = "Code";

export { Code };
