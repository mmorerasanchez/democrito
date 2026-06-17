import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface LibraryLayoutProps {
  /** FilterBar or search controls */
  filters: ReactNode;
  /** Card grid or list content */
  children: ReactNode;
  /** Pagination controls */
  pagination?: ReactNode;
  /** BulkActionsBar (shown conditionally) */
  bulkActions?: ReactNode;
  className?: string;
}

/**
 * LibraryLayout — Filterable card grid template.
 * FilterBar on top → scrollable card grid → pagination at bottom.
 * Optional bulk actions bar overlays from the bottom.
 */
export function LibraryLayout({ filters, children, pagination, bulkActions, className }: LibraryLayoutProps) {
  return (
    <div className={cn("flex h-full flex-col", className)}>
      {/* Filter bar */}
      <div className="shrink-0 border-b border-border">
        {filters}
      </div>

      {/* Scrollable content area */}
      <div className="flex-1 overflow-auto p-4 md:p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {children}
        </div>
      </div>

      {/* Pagination */}
      {pagination && (
        <div className="shrink-0 border-t border-border px-4 py-3">
          {pagination}
        </div>
      )}

      {/* Bulk actions bar (overlays bottom) */}
      {bulkActions && (
        <div className="shrink-0 animate-bulk-bar-in">
          {bulkActions}
        </div>
      )}
    </div>
  );
}
