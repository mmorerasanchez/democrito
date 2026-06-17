import { cn } from "@/lib/utils";
import { RunHistoryItem } from "@/components/molecules/RunHistoryItem";
import { Badge } from "@/components/ui/badge";

interface RunEntry {
  id: string;
  runId: string;
  model: string;
  status: "success" | "error" | "running" | "pending";
  tokens?: number;
  latencyMs?: number;
  timestamp: string;
}

interface RunHistoryProps {
  runs: RunEntry[];
  onRunClick?: (id: string) => void;
  className?: string;
}

/**
 * RunHistory — Scrollable list of playground/evaluation run entries.
 */
export function RunHistory({ runs, onRunClick, className }: RunHistoryProps) {
  const successCount = runs.filter((r) => r.status === "success").length;
  const errorCount = runs.filter((r) => r.status === "error").length;

  return (
    <div className={cn("rounded-md border border-border bg-card", className)}>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-3 py-2">
        <div className="flex items-center gap-2">
          <span className="font-display text-sm font-medium text-foreground">Run History</span>
          <Badge variant="outline" size="sm"><span className="font-mono">{runs.length} runs</span></Badge>
        </div>
        <div className="flex items-center gap-2">
          {successCount > 0 && <Badge variant="success" size="sm">{successCount}</Badge>}
          {errorCount > 0 && <Badge variant="error" size="sm">{errorCount}</Badge>}
        </div>
      </div>

      {/* Runs list */}
      <div className="max-h-[320px] overflow-auto">
        {runs.map((run) => (
          <RunHistoryItem
            key={run.id}
            runId={run.runId}
            model={run.model}
            status={run.status}
            tokens={run.tokens}
            latencyMs={run.latencyMs}
            timestamp={run.timestamp}
            onClick={() => onRunClick?.(run.id)}
          />
        ))}
      </div>

      {runs.length === 0 && (
        <p className="px-3 py-8 text-center font-body text-sm text-foreground-subtle italic">
          No runs yet. Execute a prompt to see history.
        </p>
      )}
    </div>
  );
}
