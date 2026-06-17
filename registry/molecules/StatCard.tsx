import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string | number;
  trend?: { direction: "up" | "down" | "neutral"; value: string };
  className?: string;
}

export function StatCard({ label, value, trend, className }: StatCardProps) {
  return (
    <div className={cn("rounded-md border border-border bg-card p-4 space-y-1", className)}>
      <p className="font-body text-xs text-muted-foreground">{label}</p>
      <p className="font-mono text-2xl font-bold text-foreground">{value}</p>
      {trend && (
        <p className={cn(
          "flex items-center gap-1 font-mono text-xs",
          trend.direction === "up" && "text-success",
          trend.direction === "down" && "text-error",
          trend.direction === "neutral" && "text-muted-foreground",
        )}>
          {trend.value}
        </p>
      )}
    </div>
  );
}
