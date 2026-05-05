import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface EvaluationMetric {
  name: string;
  score: number;
  maxScore?: number;
}

interface EvaluationResultsProps {
  title?: string;
  model: string;
  overallScore: number;
  metrics: EvaluationMetric[];
  totalTests: number;
  passed: number;
  failed: number;
  timestamp?: string;
  className?: string;
}

/**
 * EvaluationResults — Displays evaluation run results with overall score,
 * per-metric breakdowns, and pass/fail summary.
 */
export function EvaluationResults({
  title = "Evaluation Results",
  model,
  overallScore,
  metrics,
  totalTests,
  passed,
  failed,
  timestamp,
  className,
}: EvaluationResultsProps) {
  const scoreColor = overallScore >= 80 ? "text-success" : overallScore >= 50 ? "text-warning" : "text-error";

  return (
    <div className={cn("rounded-md border border-border bg-card", className)}>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-3 py-2">
        <span className="font-display text-sm font-medium text-foreground">{title}</span>
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-muted-foreground">{model}</span>
          {timestamp && <span className="font-mono text-2xs text-foreground-subtle">{timestamp}</span>}
        </div>
      </div>

      {/* Overall score */}
      <div className="flex items-center gap-6 border-b border-border px-4 py-4">
        <div className="text-center">
          <span className={cn("font-mono text-3xl font-bold", scoreColor)}>{overallScore}</span>
          <span className="font-mono text-sm text-muted-foreground">/100</span>
          <p className="font-body text-xs text-muted-foreground mt-1">Overall Score</p>
        </div>
        <div className="flex-1 grid grid-cols-3 gap-4">
          <div className="text-center">
            <span className="font-mono text-lg font-bold text-foreground">{totalTests}</span>
            <p className="font-body text-xs text-muted-foreground">Total</p>
          </div>
          <div className="text-center">
            <span className="font-mono text-lg font-bold text-success">{passed}</span>
            <p className="font-body text-xs text-muted-foreground">Passed</p>
          </div>
          <div className="text-center">
            <span className="font-mono text-lg font-bold text-error">{failed}</span>
            <p className="font-body text-xs text-muted-foreground">Failed</p>
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="p-3 space-y-3">
        <span className="font-mono text-2xs uppercase tracking-widest text-muted-foreground">Metrics</span>
        {metrics.map((metric) => {
          const max = metric.maxScore ?? 100;
          const pct = (metric.score / max) * 100;
          return (
            <div key={metric.name} className="flex items-center gap-3">
              <span className="font-body text-sm text-foreground w-28 shrink-0 truncate">{metric.name}</span>
              <Progress value={pct} className="flex-1 h-2" />
              <span className={cn(
                "font-mono text-xs font-medium w-12 text-right shrink-0",
                pct >= 80 ? "text-success" : pct >= 50 ? "text-warning" : "text-error",
              )}>
                {metric.score}/{max}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
