import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

type RunStatus = "success" | "error" | "running" | "pending";

interface RunHistoryItemProps {
  /** Run identifier */
  runId: string;
  /** Model used */
  model: string;
  /** Status of the run */
  status: RunStatus;
  /** Token usage */
  tokens?: number;
  /** Latency in ms */
  latencyMs?: number;
  /** Relative timestamp */
  timestamp: string;
  /** Click handler */
  onClick?: () => void;
  className?: string;
}

const statusConfig: Record<RunStatus, { variant: "success" | "error" | "info" | "warning"; label: string }> = {
  success: { variant: "success", label: "success" },
  error: { variant: "error", label: "error" },
  running: { variant: "info", label: "running" },
  pending: { variant: "warning", label: "pending" },
};

/**
 * RunHistoryItem — A single run entry in a history list.
 * Shows run ID, model, status badge, tokens, latency, and timestamp.
 */
export function RunHistoryItem({
  runId,
  model,
  status,
  tokens,
  latencyMs,
  timestamp,
  onClick,
  className,
}: RunHistoryItemProps) {
  const { variant, label } = statusConfig[status];

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full items-center gap-3 border-b border-border px-3 py-2.5 text-left transition-colors duration-150",
        "hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        "last:border-b-0",
        className,
      )}
    >
      <span className="font-mono text-xs text-foreground-subtle shrink-0">{runId}</span>
      <span className="font-mono text-sm text-foreground truncate">{model}</span>
      <Badge variant={variant} size="sm">{label}</Badge>
      <div className="ml-auto flex items-center gap-3 shrink-0">
        {tokens !== undefined && (
          <span className="font-mono text-2xs text-muted-foreground">{tokens.toLocaleString()} tok</span>
        )}
        {latencyMs !== undefined && (
          <span className="font-mono text-2xs text-muted-foreground">{latencyMs}ms</span>
        )}
        <span className="font-mono text-2xs text-foreground-subtle">{timestamp}</span>
      </div>
    </button>
  );
}
