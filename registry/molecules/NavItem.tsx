import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import type { LucideIcon } from "lucide-react";

interface NavItemProps {
  icon: LucideIcon;
  label: string;
  active?: boolean;
  disabled?: boolean;
  collapsed?: boolean;
  count?: number;
  badge?: string;
  onClick?: () => void;
  className?: string;
}

export function NavItem({ icon: Icon, label, active, disabled, collapsed, count, badge, onClick, className }: NavItemProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "flex w-full items-center gap-3 rounded-md px-3 py-2 font-display text-sm font-medium transition-all duration-150",
        active
          ? "bg-card text-foreground"
          : "text-muted-foreground hover:bg-muted hover:text-foreground",
        disabled && "pointer-events-none opacity-50",
        className,
      )}
    >
      <div className="relative shrink-0">
        <Icon className="h-[18px] w-[18px]" />
        {collapsed && count !== undefined && (
          <span className="absolute -top-1.5 -right-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-accent font-mono text-[8px] font-bold text-accent-foreground">
            {count}
          </span>
        )}
      </div>
      {!collapsed && (
        <>
          <span className="flex-1 text-left truncate">{label}</span>
          {count !== undefined && <Badge variant="count" size="sm">{count}</Badge>}
          {badge && <Badge variant="outline" size="sm" className="text-2xs">{badge}</Badge>}
        </>
      )}
    </button>
  );
}
