import * as React from "react";
import { cn } from "@/lib/utils";

type Status = "draft" | "testing" | "production" | "archived";

const statusColorMap: Record<Status, string> = {
  draft: "bg-status-draft/10 text-status-draft",
  testing: "bg-status-testing/10 text-status-testing",
  production: "bg-status-production/10 text-status-production",
  archived: "bg-status-archived/10 text-status-archived",
};

const statusLabelMap: Record<Status, string> = {
  draft: "Draft",
  testing: "Testing",
  production: "Production",
  archived: "Archived",
};

interface StatusBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Lifecycle status of the entity */
  status: Status;
}

const StatusBadge = React.forwardRef<HTMLSpanElement, StatusBadgeProps>(
  ({ className, status, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-full px-2 py-0.5 font-mono text-xs font-medium",
          statusColorMap[status],
          className,
        )}
        {...props}
      >
        {children ?? statusLabelMap[status]}
      </span>
    );
  },
);
StatusBadge.displayName = "StatusBadge";

export { StatusBadge };
export type { StatusBadgeProps, Status };
