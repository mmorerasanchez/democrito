import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

interface TokenCounterProps {
  current: number;
  max: number;
  compact?: boolean;
  className?: string;
}

export function TokenCounter({ current, max, compact, className }: TokenCounterProps) {
  const ratio = current / max;
  const variant = ratio > 0.9 ? "error" : ratio > 0.75 ? "warning" : "default";

  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <span className={cn(
        "font-mono text-xs",
        variant === "error" && "text-error",
        variant === "warning" && "text-warning",
        variant === "default" && "text-muted-foreground",
      )}>
        {compact ? current.toLocaleString() : `${current.toLocaleString()} tokens`}
      </span>
      <Progress value={ratio * 100} variant={variant === "default" ? "default" : variant} className="w-[60px] h-[3px]" />
    </span>
  );
}
