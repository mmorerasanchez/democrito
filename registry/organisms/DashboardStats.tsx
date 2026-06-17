import { cn } from "@/lib/utils";
import { StatCard } from "@/components/molecules/StatCard";

interface DashboardStatsProps {
  className?: string;
}

export function DashboardStats({ className }: DashboardStatsProps) {
  return (
    <div className={cn("grid grid-cols-2 gap-4 lg:grid-cols-4", className)}>
      <StatCard label="Total Prompts" value="1,247" trend={{ direction: "up", value: "+12%" }} />
      <StatCard label="Evaluations" value="384" trend={{ direction: "up", value: "+8%" }} />
      <StatCard label="Avg Score" value="87.3" trend={{ direction: "neutral", value: "0.0%" }} />
      <StatCard label="Active Users" value="23" trend={{ direction: "down", value: "-2" }} />
    </div>
  );
}
