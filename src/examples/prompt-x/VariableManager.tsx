import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Plus } from "lucide-react";
import { useEffect, useRef } from "react";

interface Variable {
  name: string;
  defaultValue: string;
}

interface VariableManagerProps {
  variables: Variable[];
  onChange?: (variables: Variable[]) => void;
  readOnly?: boolean;
  highlightedVariable?: string | null;
  className?: string;
}

/**
 * VariableManager — manages template variables like {{company_name}}.
 * Shows a list of name/default-value pairs with add/remove controls.
 * When `highlightedVariable` matches a variable name, that row pulses with an accent highlight.
 */
export function VariableManager({
  variables,
  onChange,
  readOnly = false,
  highlightedVariable,
  className,
}: VariableManagerProps) {
  const rowRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  // Auto-scroll to highlighted variable
  useEffect(() => {
    if (highlightedVariable) {
      const el = rowRefs.current.get(highlightedVariable);
      el?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [highlightedVariable]);

  const handleUpdate = (index: number, field: "name" | "defaultValue", value: string) => {
    const updated = variables.map((v, i) =>
      i === index ? { ...v, [field]: value } : v
    );
    onChange?.(updated);
  };

  const handleAdd = () => {
    onChange?.([...variables, { name: "", defaultValue: "" }]);
  };

  const handleRemove = (index: number) => {
    onChange?.(variables.filter((_, i) => i !== index));
  };

  return (
    <div className={cn("rounded-md border border-border bg-card", className)}>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-3 py-2">
        <span className="font-display text-sm font-medium text-foreground">Variables</span>
        <span className="font-mono text-2xs text-muted-foreground">
          {variables.length} {variables.length === 1 ? "variable" : "variables"}
        </span>
      </div>

      {/* Variable list */}
      <div className="divide-y divide-border">
        {variables.length === 0 && (
          <p className="px-3 py-6 text-center font-body text-sm text-foreground-subtle italic">
            No variables detected.
          </p>
        )}

        {variables.map((v, i) => {
          const isHighlighted = highlightedVariable === v.name && v.name !== "";
          return (
            <div
              key={i}
              ref={(el) => {
                if (el && v.name) rowRefs.current.set(v.name, el);
              }}
              className={cn(
                "flex items-center gap-2 px-3 py-2 transition-colors duration-200",
                isHighlighted && "bg-accent/10 ring-1 ring-inset ring-accent/30",
              )}
            >
              <span className="font-mono text-xs text-muted-foreground select-none">{"{{"}</span>
              <Input
                value={v.name}
                onChange={(e) => handleUpdate(i, "name", e.target.value)}
                placeholder="variable_name"
                disabled={readOnly}
                className="h-7 flex-1 text-xs"
              />
              <span className="font-mono text-xs text-muted-foreground select-none">{"}}"}</span>
              <span className="font-mono text-2xs text-foreground-subtle">=</span>
              <Input
                value={v.defaultValue}
                onChange={(e) => handleUpdate(i, "defaultValue", e.target.value)}
                placeholder="default value"
                disabled={readOnly}
                className={cn("h-7 flex-1 text-xs", isHighlighted && "border-accent/40")}
              />
              {!readOnly && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-muted-foreground hover:text-destructive"
                  onClick={() => handleRemove(i)}
                  aria-label={`Remove variable ${v.name}`}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              )}
            </div>
          );
        })}
      </div>

      {/* Add button */}
      {!readOnly && (
        <div className="border-t border-border px-3 py-2">
          <Button variant="ghost" size="sm" onClick={handleAdd} className="w-full">
            <Plus className="h-3.5 w-3.5" /> Add Variable
          </Button>
        </div>
      )}
    </div>
  );
}
