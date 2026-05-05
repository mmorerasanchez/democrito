import { cn } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";

const statusColorMap: Record<string, { dot: string; line: string; icon: string; border: string }> = {
  draft: { dot: "bg-status-draft", line: "bg-status-draft", icon: "text-status-draft", border: "border-status-draft" },
  testing: { dot: "bg-status-testing", line: "bg-status-testing", icon: "text-status-testing", border: "border-status-testing" },
  production: { dot: "bg-status-production", line: "bg-status-production", icon: "text-status-production", border: "border-status-production" },
  archived: { dot: "bg-status-archived", line: "bg-status-archived", icon: "text-status-archived", border: "border-status-archived" },
};

interface Step {
  label: string;
  status: "draft" | "testing" | "production" | "archived";
  completed?: boolean;
  active?: boolean;
}

interface StatusLifecycleBarProps {
  steps: Step[];
  className?: string;
}

export function StatusLifecycleBar({ steps, className }: StatusLifecycleBarProps) {
  return (
    <div className={cn("flex items-center gap-0", className)}>
      {steps.map((step, i) => {
        const colors = statusColorMap[step.status];
        return (
          <div key={step.label} className="flex items-center">
            <div className={cn("flex items-center gap-2 rounded-full px-3 py-1.5 transition-colors",
              step.active ? "bg-card border border-border" : "bg-transparent"
            )}>
              {/* Gate circle */}
              <span className={cn(
                "flex h-3.5 w-3.5 items-center justify-center rounded-full",
                step.completed ? colors.dot : "border-2 border-border bg-transparent",
                step.active && !step.completed && colors.border,
              )}>
                {step.completed && <CheckCircle2 className={cn("h-3.5 w-3.5", colors.icon)} />}
              </span>
              <span className={cn(
                "font-mono text-xs",
                step.active ? "font-medium text-foreground" : "text-muted-foreground",
              )}>
                {step.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={cn(
                "h-px w-6",
                step.completed ? colors.line : "bg-border",
              )} />
            )}
          </div>
        );
      })}
    </div>
  );
}
