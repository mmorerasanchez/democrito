import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

type ActivityType = "created" | "updated" | "deployed" | "archived" | "commented";

interface ActivityFeedItemProps {
  /** User who performed the action */
  user: string;
  /** Type of action */
  type: ActivityType;
  /** Target entity name */
  target: string;
  /** Relative timestamp */
  timestamp: string;
  /** Optional description/detail */
  detail?: string;
  className?: string;
}

const typeLabels: Record<ActivityType, { label: string; variant: "success" | "info" | "warning" | "secondary" | "outline" }> = {
  created: { label: "created", variant: "success" },
  updated: { label: "updated", variant: "info" },
  deployed: { label: "deployed", variant: "success" },
  archived: { label: "archived", variant: "secondary" },
  commented: { label: "commented", variant: "outline" },
};

/**
 * ActivityFeedItem — A single row in an activity feed.
 * Shows user, action badge, target, timestamp, and optional detail.
 */
export function ActivityFeedItem({
  user,
  type,
  target,
  timestamp,
  detail,
  className,
}: ActivityFeedItemProps) {
  const { label, variant } = typeLabels[type];

  return (
    <div className={cn("flex items-start gap-3 py-2.5 border-b border-border last:border-b-0", className)}>
      {/* Avatar placeholder */}
      <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted font-mono text-2xs text-muted-foreground">
        {user.charAt(0).toUpperCase()}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-body text-sm font-medium text-foreground">{user}</span>
          <Badge variant={variant} size="sm">{label}</Badge>
          <span className="font-mono text-sm text-foreground truncate">{target}</span>
        </div>
        {detail && (
          <p className="mt-0.5 font-body text-xs text-muted-foreground line-clamp-1">{detail}</p>
        )}
      </div>

      <span className="shrink-0 font-mono text-2xs text-foreground-subtle">{timestamp}</span>
    </div>
  );
}
