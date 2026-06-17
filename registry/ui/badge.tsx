import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full font-mono text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground",
        secondary: "border-transparent bg-secondary text-secondary-foreground",
        destructive: "border-transparent bg-destructive text-destructive-foreground",
        outline: "border border-border text-foreground",
        // Status variants
        draft: "border-transparent bg-status-draft/10 text-status-draft",
        testing: "border-transparent bg-status-testing/10 text-status-testing",
        production: "border-transparent bg-status-production/10 text-status-production",
        archived: "border-transparent bg-status-archived/10 text-status-archived",
        // Semantic variants
        success: "border-transparent bg-success-bg text-success",
        warning: "border-transparent bg-warning-bg text-warning",
        error: "border-transparent bg-error-bg text-error",
        info: "border-transparent bg-info-bg text-info",
        // Count variant
        count: "border-transparent bg-accent text-accent-foreground min-w-[18px] justify-center",
      },
      size: {
        default: "px-2.5 py-0.5",
        sm: "px-2 py-0.5 text-2xs",
        lg: "px-3 py-1",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

// Dot badge - 8px circle
function BadgeDot({ color, className }: { color?: string; className?: string }) {
  return (
    <span
      className={cn("inline-block h-2 w-2 rounded-full bg-current", className)}
      style={color ? { color } : undefined}
    />
  );
}

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant, size }), className)} {...props} />;
}

export { Badge, BadgeDot, badgeVariants };
