import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface DashboardLayoutProps {
  /** KPI stats section */
  stats?: ReactNode;
  /** Main content grid (activity, recent prompts, etc.) */
  children: ReactNode;
  /** Optional header/welcome section */
  header?: ReactNode;
  className?: string;
}

/**
 * DashboardLayout — Overview page template.
 * Optional header → stats row → main content grid.
 */
export function DashboardLayout({ stats, children, header, className }: DashboardLayoutProps) {
  return (
    <div className={cn("flex-1 overflow-auto p-4 md:p-6 lg:p-8", className)}>
      <div className="mx-auto max-w-6xl space-y-6">
        {header}
        {stats}
        {children}
      </div>
    </div>
  );
}
