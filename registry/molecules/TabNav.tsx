import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface TabNavItem {
  label: string;
  value: string;
  icon?: LucideIcon;
  disabled?: boolean;
  badge?: string;
}

interface TabNavProps {
  items: TabNavItem[];
  value: string;
  onValueChange: (value: string) => void;
  className?: string;
}

export function TabNav({ items, value, onValueChange, className }: TabNavProps) {
  return (
    <nav className={cn("flex items-center gap-1 rounded-lg bg-muted p-1", className)} role="tablist">
      {items.map((item) => {
        const isActive = item.value === value;
        const Icon = item.icon;
        return (
          <button
            key={item.value}
            role="tab"
            aria-selected={isActive}
            aria-disabled={item.disabled}
            disabled={item.disabled}
            onClick={() => onValueChange(item.value)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 font-display text-sm font-medium transition-colors duration-150",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              isActive
                ? "bg-card text-foreground shadow-xs"
                : "text-muted-foreground hover:text-foreground",
              item.disabled && "cursor-not-allowed opacity-40 hover:text-muted-foreground",
            )}
          >
            {item.label}
            {item.badge && <span className="font-mono text-2xs text-muted-foreground">{item.badge}</span>}
            {Icon && <Icon className="h-3.5 w-3.5" />}
          </button>
        );
      })}
    </nav>
  );
}
