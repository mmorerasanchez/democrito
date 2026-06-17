import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface ComparisonLayoutProps {
  /** Toolbar with version selectors, sync toggle, close */
  toolbar: ReactNode;
  /** Left version panel */
  panelA: ReactNode;
  /** Right version panel */
  panelB: ReactNode;
  className?: string;
}

/**
 * ComparisonLayout — Side-by-side 50/50 comparison template.
 * Toolbar on top → two equal panels below.
 * Stacks vertically on mobile.
 */
export function ComparisonLayout({ toolbar, panelA, panelB, className }: ComparisonLayoutProps) {
  return (
    <div className={cn("flex h-full flex-col overflow-hidden", className)}>
      {/* Toolbar */}
      <div className="shrink-0 border-b border-border">
        {toolbar}
      </div>

      {/* Side-by-side panels */}
      <div className="flex flex-1 flex-col overflow-hidden md:flex-row">
        <div className="flex-1 overflow-auto border-b border-border md:border-b-0 md:border-r">
          {panelA}
        </div>
        <div className="hidden w-px shrink-0 bg-border md:block" />
        <div className="flex-1 overflow-auto">
          {panelB}
        </div>
      </div>
    </div>
  );
}
