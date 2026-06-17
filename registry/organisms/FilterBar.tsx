import { cn } from "@/lib/utils";
import { SearchBar } from "@/components/molecules/SearchBar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LayoutGrid, List } from "lucide-react";
import { useState } from "react";

interface FilterBarProps {
  search: string;
  onSearchChange: (v: string) => void;
  viewMode?: "grid" | "list";
  onViewModeChange?: (mode: "grid" | "list") => void;
  className?: string;
}

export function FilterBar({ search, onSearchChange, viewMode: controlledViewMode, onViewModeChange, className }: FilterBarProps) {
  const [internalViewMode, setInternalViewMode] = useState<"grid" | "list">("grid");
  const viewMode = controlledViewMode ?? internalViewMode;
  const setViewMode = onViewModeChange ?? setInternalViewMode;
  const statuses = ["Draft", "Testing", "Production", "Archived"] as const;
  const [activeStatuses, setActiveStatuses] = useState<string[]>([]);

  const toggleStatus = (s: string) => {
    setActiveStatuses((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);
  };

  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      <SearchBar value={search} onChange={onSearchChange} className="w-full sm:w-64" showShortcut={false} />
      <div className="flex items-center gap-1.5">
        {statuses.map((s) => (
          <Badge
            key={s}
            variant={activeStatuses.includes(s) ? s.toLowerCase() as "draft" | "testing" | "production" | "archived" : "outline"}
            className="cursor-pointer"
            onClick={() => toggleStatus(s)}
          >
            {s}
          </Badge>
        ))}
      </div>
      <div className="flex items-center gap-2 ml-auto">
        <Select defaultValue="updated">
          <SelectTrigger className="w-[130px] h-8 font-mono text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-popover border-border">
            <SelectItem value="updated">Last updated</SelectItem>
            <SelectItem value="created">Created</SelectItem>
            <SelectItem value="name">Name</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex items-center border border-border rounded-md">
          <Button variant={viewMode === "grid" ? "secondary" : "ghost"} size="icon" className="h-8 w-8 rounded-r-none" onClick={() => setViewMode("grid")} aria-label="Grid view">
            <LayoutGrid className="h-3.5 w-3.5" />
          </Button>
          <Button variant={viewMode === "list" ? "secondary" : "ghost"} size="icon" className="h-8 w-8 rounded-l-none" onClick={() => setViewMode("list")} aria-label="List view">
            <List className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
