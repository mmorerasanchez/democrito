import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Text, Code } from "@/components/atoms";

interface FeedItem {
  actor: string;
  initials: string;
  action: string;
  resource: string;
  time: string;
}

interface ActivityFeedProps {
  items: FeedItem[];
  className?: string;
}

export function ActivityFeed({ items, className }: ActivityFeedProps) {
  return (
    <div className={cn("rounded-md border border-border bg-card overflow-hidden", className)}>
      <div className="border-b border-border bg-surface px-4 py-3">
        <h3 className="font-display text-sm font-medium">Recent Activity</h3>
      </div>
      <div className="max-h-[400px] overflow-y-auto divide-y divide-border">
        {items.map((item, i) => (
          <div key={i} className="flex items-start gap-3 px-4 py-3">
            <Avatar size="xs">
              <AvatarFallback>{item.initials}</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="font-body text-sm">
                <span className="font-medium text-foreground">{item.actor}</span>{" "}
                <span className="text-muted-foreground">{item.action}</span>{" "}
                <Code className="text-accent border-none bg-transparent p-0">{item.resource}</Code>
              </p>
              <Text mono size="xs" variant="muted" className="mt-0.5">{item.time}</Text>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
