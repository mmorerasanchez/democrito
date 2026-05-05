import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface Version {
  id: string;
  label: string;
  status: "draft" | "testing" | "production" | "archived";
  timestamp: string;
  author?: string;
  tokenDelta?: number;
  active?: boolean;
}

interface VersionTimelineProps {
  versions: Version[];
  onSelect?: (id: string) => void;
  className?: string;
}

/**
 * VersionTimeline — vertical timeline showing prompt version history.
 * Each entry shows version label, status badge, timestamp, and optional token delta.
 */
export function VersionTimeline({
  versions,
  onSelect,
  className,
}: VersionTimelineProps) {
  return (
    <div className={cn("rounded-md border border-border bg-card", className)}>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-3 py-2">
        <span className="font-display text-sm font-medium text-foreground">Version History</span>
        <span className="font-mono text-2xs text-muted-foreground">
          {versions.length} {versions.length === 1 ? "version" : "versions"}
        </span>
      </div>

      {/* Timeline */}
      <div className="relative">
        {versions.map((v, i) => {
          const isLast = i === versions.length - 1;
          return (
            <button
              key={v.id}
              type="button"
              onClick={() => onSelect?.(v.id)}
              className={cn(
                "relative flex w-full items-start gap-3 px-3 py-3 text-left transition-colors hover:bg-muted/50",
                v.active && "bg-muted/30",
              )}
            >
              {/* Timeline line + dot */}
              <div className="relative flex flex-col items-center pt-0.5">
                <span
                  className={cn(
                    "h-2 w-2 rounded-full border-2",
                    v.active
                      ? "border-accent bg-accent"
                      : "border-border bg-card",
                  )}
                />
                {!isLast && (
                  <span className="absolute top-3 h-full w-px bg-border" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className={cn(
                    "font-mono text-sm",
                    v.active ? "font-medium text-foreground" : "text-muted-foreground",
                  )}>
                    {v.label}
                  </span>
                  <Badge variant={v.status} size="sm">{v.status}</Badge>
                </div>
                <div className="mt-0.5 flex items-center gap-2">
                  <span className="font-mono text-2xs text-foreground-subtle">{v.timestamp}</span>
                  {v.author && (
                    <>
                      <span className="text-border">·</span>
                      <span className="font-body text-2xs text-foreground-subtle">{v.author}</span>
                    </>
                  )}
                  {v.tokenDelta !== undefined && v.tokenDelta !== 0 && (
                    <>
                      <span className="text-border">·</span>
                      <span className={cn(
                        "font-mono text-2xs",
                        v.tokenDelta > 0 ? "text-warning" : "text-success",
                      )}>
                        {v.tokenDelta > 0 ? "+" : ""}{v.tokenDelta} tokens
                      </span>
                    </>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
