import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, FolderInput, Tag, Archive, Trash2 } from "lucide-react";

interface BulkActionsBarProps {
  selectedCount: number;
  onDismiss?: () => void;
  onMove?: () => void;
  onTag?: () => void;
  onArchive?: () => void;
  onDelete?: () => void;
  className?: string;
}

export function BulkActionsBar({ selectedCount, onDismiss, onMove, onTag, onArchive, onDelete, className }: BulkActionsBarProps) {
  if (selectedCount === 0) return null;

  return (
    <div className={cn(
      "sticky bottom-4 mx-auto flex w-fit items-center gap-3 rounded-lg border border-border bg-card px-4 py-2.5 shadow-lg animate-bulk-bar-in",
      className,
    )}>
      <span className="font-mono text-sm text-foreground font-medium">{selectedCount} selected</span>
      <div className="h-4 w-px bg-border" />
      <div className="flex items-center gap-1">
        <Button variant="secondary" size="sm" onClick={onMove}><FolderInput className="h-3.5 w-3.5 mr-1" />Move</Button>
        <Button variant="secondary" size="sm" onClick={onTag}><Tag className="h-3.5 w-3.5 mr-1" />Tag</Button>
        <Button variant="secondary" size="sm" onClick={onArchive}><Archive className="h-3.5 w-3.5 mr-1" />Archive</Button>
        <Button variant="destructive" size="sm" onClick={onDelete}><Trash2 className="h-3.5 w-3.5 mr-1" />Delete</Button>
      </div>
      <Button variant="ghost" size="icon" className="h-6 w-6 ml-1" onClick={onDismiss} aria-label="Dismiss">
        <X className="h-3.5 w-3.5" />
      </Button>
    </div>
  );
}
