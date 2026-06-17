import { cn } from "@/lib/utils";
import { NavItem } from "@/components/molecules/NavItem";
import { Logo } from "@/components/atoms";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  FileText, Sparkles, Settings, ChevronsLeft, ChevronsRight,
  Hash, Plus, BarChart3, LayoutTemplate, Code2,
} from "lucide-react";

interface SidebarNavProps {
  collapsed?: boolean;
  onToggle?: () => void;
  activeItem?: string;
  onItemClick?: (id: string) => void;
  activeProject?: string;
  onProjectClick?: (slug: string) => void;
  className?: string;
}

const hubItems = [
  { id: "store", label: "Store", icon: FileText },
  { id: "designer", label: "Designer", icon: Sparkles },
  { id: "settings", label: "Settings", icon: Settings },
];

const projectItems = [
  { id: "work", label: "Work", count: 12 },
  { id: "personal", label: "Personal", count: 8 },
  { id: "client-abc", label: "Client ABC", count: 5 },
  { id: "side-projects", label: "Side Projects", count: 3 },
  { id: "research", label: "Research", count: 2 },
];

const comingSoonItems = [
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "templates", label: "Templates", icon: LayoutTemplate },
  { id: "api", label: "API", icon: Code2 },
];

export function SidebarNav({ collapsed = false, onToggle, activeItem = "store", onItemClick, activeProject, onProjectClick, className }: SidebarNavProps) {
  return (
    <aside className={cn(
      "flex flex-col border-r border-border bg-surface transition-all duration-200",
      collapsed ? "w-sidebar-collapsed" : "w-sidebar-w",
      className,
    )}>
      {/* Header */}
      <div className={cn("flex h-header items-center border-b border-border px-3", collapsed ? "justify-center" : "justify-between")}>
        <Logo size={collapsed ? 20 : 24} />
        {!collapsed && (
          <span className="font-display text-md font-semibold tracking-tight">
            Store
          </span>
        )}
        <Button variant="ghost" size="icon" onClick={onToggle} aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"} className="h-7 w-7">
          {collapsed ? <ChevronsRight className="h-4 w-4" /> : <ChevronsLeft className="h-4 w-4" />}
        </Button>
      </div>

      <nav className="flex-1 overflow-y-auto space-y-6 p-2 pt-4">
        {/* Hubs */}
        <div>
          {!collapsed && (
            <span className="mb-1 block px-3 py-1 font-mono text-2xs uppercase tracking-widest text-muted-foreground">
              Hubs
            </span>
          )}
          <div className="space-y-0.5">
            {hubItems.map((item) => (
              <NavItem
                key={item.id}
                icon={item.icon}
                label={item.label}
                active={activeItem === item.id}
                collapsed={collapsed}
                onClick={() => onItemClick?.(item.id)}
              />
            ))}
          </div>
        </div>

        {/* Projects */}
        <div>
          {!collapsed && (
            <div className="mb-1 flex items-center justify-between px-3 py-1">
              <span className="font-mono text-2xs uppercase tracking-widest text-muted-foreground">
                Projects
              </span>
              <Button variant="ghost" size="icon" className="h-5 w-5 text-muted-foreground hover:text-foreground" aria-label="Add project">
                <Plus className="h-3 w-3" />
              </Button>
            </div>
          )}
          <div className="space-y-0.5">
            {projectItems.map((item) => (
              <NavItem
                key={item.id}
                icon={Hash}
                label={item.label}
                count={item.count}
                active={activeProject === item.id}
                collapsed={collapsed}
                onClick={() => onProjectClick?.(item.id)}
              />
            ))}
          </div>
        </div>

        {/* Coming Soon */}
        <div>
          {!collapsed && (
            <span className="mb-1 block px-3 py-1 font-mono text-2xs uppercase tracking-widest text-muted-foreground">
              Coming Soon
            </span>
          )}
          <div className="space-y-0.5">
            {comingSoonItems.map((item) => (
              <NavItem
                key={item.id}
                icon={item.icon}
                label={item.label}
                disabled
                badge="soon"
                collapsed={collapsed}
              />
            ))}
          </div>
        </div>
      </nav>

      {/* Footer */}
      <div className="border-t border-border p-2">
        <div className={cn("flex items-center gap-2 rounded-md p-2", collapsed && "justify-center")}>
          <Avatar size="sm">
            <AvatarFallback>MR</AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="min-w-0 flex-1">
              <p className="truncate font-display text-sm font-medium">Mariano</p>
              <p className="truncate font-body text-2xs text-muted-foreground">user@example.com</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
