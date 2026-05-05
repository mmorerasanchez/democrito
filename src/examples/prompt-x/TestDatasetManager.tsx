import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TestCaseRow } from "./TestCaseRow";
import { Plus, Play, Upload } from "lucide-react";

interface TestCase {
  id: string;
  name: string;
  input: string;
  expected?: string;
  status: "pass" | "fail" | "pending" | "skipped";
  score?: number;
}

interface TestDatasetManagerProps {
  name?: string;
  testCases: TestCase[];
  selectedIds?: string[];
  onSelectChange?: (ids: string[]) => void;
  onAdd?: () => void;
  onRunSelected?: () => void;
  onImport?: () => void;
  onCaseClick?: (id: string) => void;
  className?: string;
}

/**
 * TestDatasetManager — Manages a collection of test cases with
 * bulk selection, run, import, and add actions.
 */
export function TestDatasetManager({
  name = "Test Dataset",
  testCases,
  selectedIds = [],
  onSelectChange,
  onAdd,
  onRunSelected,
  onImport,
  onCaseClick,
  className,
}: TestDatasetManagerProps) {
  const passCount = testCases.filter((t) => t.status === "pass").length;
  const failCount = testCases.filter((t) => t.status === "fail").length;

  const handleSelect = (id: string, selected: boolean) => {
    if (selected) {
      onSelectChange?.([...selectedIds, id]);
    } else {
      onSelectChange?.(selectedIds.filter((i) => i !== id));
    }
  };

  return (
    <div className={cn("rounded-md border border-border bg-card", className)}>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-3 py-2">
        <div className="flex items-center gap-2">
          <span className="font-display text-sm font-medium text-foreground">{name}</span>
          <Badge variant="outline" size="sm"><span className="font-mono">{testCases.length} cases</span></Badge>
          {passCount > 0 && <Badge variant="success" size="sm">{passCount} pass</Badge>}
          {failCount > 0 && <Badge variant="error" size="sm">{failCount} fail</Badge>}
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" onClick={onImport}>
            <Upload className="h-3.5 w-3.5" />
            Import
          </Button>
          <Button variant="ghost" size="sm" onClick={onRunSelected} disabled={selectedIds.length === 0}>
            <Play className="h-3.5 w-3.5" />
            Run
          </Button>
          <Button variant="secondary" size="sm" onClick={onAdd}>
            <Plus className="h-3.5 w-3.5" />
            Add
          </Button>
        </div>
      </div>

      {/* Table header */}
      <div className="flex items-center gap-3 border-b border-border bg-surface px-3 py-1.5">
        <span className="w-5" />
        <span className="font-mono text-2xs uppercase tracking-widest text-muted-foreground w-28">Name</span>
        <span className="font-mono text-2xs uppercase tracking-widest text-muted-foreground flex-1">Input</span>
        <span className="font-mono text-2xs uppercase tracking-widest text-muted-foreground flex-1 hidden md:block">Expected</span>
        <span className="font-mono text-2xs uppercase tracking-widest text-muted-foreground w-16">Status</span>
        <span className="font-mono text-2xs uppercase tracking-widest text-muted-foreground w-10 text-right">Score</span>
      </div>

      {/* Rows */}
      {testCases.map((tc) => (
        <TestCaseRow
          key={tc.id}
          name={tc.name}
          input={tc.input}
          expected={tc.expected}
          status={tc.status}
          score={tc.score}
          selected={selectedIds.includes(tc.id)}
          onSelect={(sel) => handleSelect(tc.id, sel)}
          onClick={() => onCaseClick?.(tc.id)}
        />
      ))}

      {testCases.length === 0 && (
        <p className="px-3 py-8 text-center font-body text-sm text-foreground-subtle italic">
          No test cases. Add or import test data to get started.
        </p>
      )}
    </div>
  );
}
