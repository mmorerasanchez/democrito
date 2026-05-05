import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useMemo } from "react";

type VersionStatus = "draft" | "testing" | "production" | "archived";

interface VersionSide {
  label: string;
  status: VersionStatus;
  content: string;
  tokenCount?: number;
}

interface VersionComparisonProps {
  versionA: VersionSide;
  versionB: VersionSide;
  className?: string;
}

interface DiffLine {
  type: "unchanged" | "added" | "removed";
  text: string;
}

/** Simple line-level diff: compares line arrays and marks additions/removals. */
function computeDiff(a: string, b: string): { left: DiffLine[]; right: DiffLine[] } {
  const linesA = a.split("\n");
  const linesB = b.split("\n");

  const left: DiffLine[] = [];
  const right: DiffLine[] = [];

  const maxLen = Math.max(linesA.length, linesB.length);

  // Simple line-by-line comparison (not LCS, but clear for prompt diffs)
  const setBLines = new Set(linesB);
  const setALines = new Set(linesA);

  for (const line of linesA) {
    if (setBLines.has(line)) {
      left.push({ type: "unchanged", text: line });
    } else {
      left.push({ type: "removed", text: line });
    }
  }

  for (const line of linesB) {
    if (setALines.has(line)) {
      right.push({ type: "unchanged", text: line });
    } else {
      right.push({ type: "added", text: line });
    }
  }

  return { left, right };
}

function DiffColumn({ label, status, lines, tokenCount }: {
  label: string;
  status: VersionStatus;
  lines: DiffLine[];
  tokenCount?: number;
}) {
  return (
    <div className="flex flex-col min-w-0">
      {/* Column header */}
      <div className="flex items-center justify-between border-b border-border px-3 py-2">
        <div className="flex items-center gap-2">
          <span className="font-mono text-sm font-medium text-foreground">{label}</span>
          <Badge variant={status} size="sm">{status}</Badge>
        </div>
        {tokenCount !== undefined && (
          <span className="font-mono text-2xs text-muted-foreground">{tokenCount} tokens</span>
        )}
      </div>

      {/* Diff lines */}
      <div className="flex-1 overflow-auto p-0">
        {lines.map((line, i) => (
          <div
            key={i}
            className={cn(
              "flex items-start gap-2 px-3 py-0.5 font-mono text-xs leading-relaxed",
              line.type === "added" && "bg-success-bg text-success",
              line.type === "removed" && "bg-error-bg text-error",
              line.type === "unchanged" && "text-foreground",
            )}
          >
            <span className="w-5 shrink-0 select-none text-right text-foreground-subtle">
              {i + 1}
            </span>
            <span
              className={cn(
                "flex-1 whitespace-pre-wrap",
                line.type === "added" && "font-medium",
                line.type === "removed" && "font-medium",
              )}
            >
              {line.type === "added" && "+ "}
              {line.type === "removed" && "− "}
              {line.text || "\u00A0"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * VersionComparison — side-by-side diff view comparing two prompt versions.
 * Shows version labels, status badges, token counts, and line-level
 * diff highlighting (green for added, red for removed).
 */
export function VersionComparison({
  versionA,
  versionB,
  className,
}: VersionComparisonProps) {
  const { left, right } = useMemo(
    () => computeDiff(versionA.content, versionB.content),
    [versionA.content, versionB.content],
  );

  return (
    <div className={cn("rounded-md border border-border bg-card overflow-hidden", className)}>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-3 py-2">
        <span className="font-display text-sm font-medium text-foreground">Version Comparison</span>
        <span className="font-mono text-2xs text-muted-foreground">
          {versionA.label} → {versionB.label}
        </span>
      </div>

      {/* Side-by-side panels */}
      <div className="grid grid-cols-1 divide-y divide-border lg:grid-cols-2 lg:divide-x lg:divide-y-0">
        <DiffColumn
          label={versionA.label}
          status={versionA.status}
          lines={left}
          tokenCount={versionA.tokenCount}
        />
        <DiffColumn
          label={versionB.label}
          status={versionB.status}
          lines={right}
          tokenCount={versionB.tokenCount}
        />
      </div>
    </div>
  );
}
