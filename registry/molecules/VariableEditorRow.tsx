import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface VariableEditorRowProps {
  /** Variable name */
  name: string;
  /** Default/current value */
  value: string;
  /** Whether this row is highlighted (active) */
  highlighted?: boolean;
  onNameChange?: (name: string) => void;
  onValueChange?: (value: string) => void;
  onDelete?: () => void;
  className?: string;
}

/**
 * VariableEditorRow — A single name/value row in a variable manager.
 * Two mono inputs + delete button. Supports highlighted state.
 */
export function VariableEditorRow({
  name,
  value,
  highlighted = false,
  onNameChange,
  onValueChange,
  onDelete,
  className,
}: VariableEditorRowProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-md px-2 py-1.5 transition-all duration-150",
        highlighted && "bg-accent/10 ring-1 ring-accent/30",
        className,
      )}
    >
      <Input
        value={name}
        onChange={(e) => onNameChange?.(e.target.value)}
        placeholder="variable_name"
        className="h-8 flex-1 font-mono text-sm"
      />
      <Input
        value={value}
        onChange={(e) => onValueChange?.(e.target.value)}
        placeholder="default value"
        className="h-8 flex-[2] font-mono text-sm"
      />
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 min-h-0 min-w-0 shrink-0 text-muted-foreground hover:text-error"
        onClick={onDelete}
        aria-label={`Delete variable ${name}`}
      >
        <Trash2 className="h-3.5 w-3.5" />
      </Button>
    </div>
  );
}
