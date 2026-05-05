import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

type TestStatus = "pass" | "fail" | "pending" | "skipped";

interface TestCaseRowProps {
  /** Test case name */
  name: string;
  /** Test input/prompt */
  input: string;
  /** Expected output */
  expected?: string;
  /** Test status */
  status: TestStatus;
  /** Score (0-100) */
  score?: number;
  /** Whether this row is selected */
  selected?: boolean;
  onSelect?: (selected: boolean) => void;
  onClick?: () => void;
  className?: string;
}

const statusConfig: Record<TestStatus, { variant: "success" | "error" | "warning" | "secondary"; label: string }> = {
  pass: { variant: "success", label: "pass" },
  fail: { variant: "error", label: "fail" },
  pending: { variant: "warning", label: "pending" },
  skipped: { variant: "secondary", label: "skipped" },
};

/**
 * TestCaseRow — A single row in a test dataset table.
 * Shows checkbox, name, input preview, expected output, status badge, and score.
 */
export function TestCaseRow({
  name,
  input,
  expected,
  status,
  score,
  selected = false,
  onSelect,
  onClick,
  className,
}: TestCaseRowProps) {
  const { variant, label } = statusConfig[status];

  return (
    <div
      className={cn(
        "flex items-center gap-3 border-b border-border px-3 py-2.5 transition-colors duration-150",
        "hover:bg-muted/50 last:border-b-0",
        selected && "bg-accent/5",
        className,
      )}
    >
      <Checkbox
        checked={selected}
        onCheckedChange={(v) => onSelect?.(!!v)}
        aria-label={`Select ${name}`}
      />
      <button
        type="button"
        onClick={onClick}
        className="flex flex-1 items-center gap-3 min-w-0 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
      >
        <span className="font-mono text-sm font-medium text-foreground shrink-0 w-28 truncate">{name}</span>
        <span className="font-mono text-xs text-muted-foreground flex-1 truncate">{input}</span>
        {expected && (
          <span className="font-mono text-xs text-foreground-subtle flex-1 truncate hidden md:block">{expected}</span>
        )}
      </button>
      <Badge variant={variant} size="sm">{label}</Badge>
      {score !== undefined && (
        <span className={cn(
          "font-mono text-xs font-medium shrink-0 w-10 text-right",
          score >= 80 ? "text-success" : score >= 50 ? "text-warning" : "text-error",
        )}>
          {score}%
        </span>
      )}
    </div>
  );
}
