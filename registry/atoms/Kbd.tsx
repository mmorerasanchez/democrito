import { cn } from "@/lib/utils";
import { forwardRef } from "react";

type KbdProps = React.HTMLAttributes<HTMLElement>;

const Kbd = forwardRef<HTMLElement, KbdProps>(({ className, ...props }, ref) => {
  return (
    <kbd
      ref={ref}
      className={cn(
        "inline-flex h-5 items-center rounded border border-border bg-muted px-1.5 font-mono text-2xs text-muted-foreground shadow-[0_1px_0_1px_hsl(var(--border))]",
        className,
      )}
      {...props}
    />
  );
});
Kbd.displayName = "Kbd";

export { Kbd };
