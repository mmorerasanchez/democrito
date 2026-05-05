import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface DetailLayoutProps {
  /** Breadcrumb navigation */
  breadcrumb?: ReactNode;
  /** Title area (title + actions) */
  titleBar: ReactNode;
  /** Status indicator slot */
  statusBar?: ReactNode;
  /** Tabs navigation (optional — omitted on saved view) */
  tabs?: ReactNode;
  /** Active tab content */
  children: ReactNode;
  className?: string;
}

/**
 * DetailLayout — Full-width detail view with tabs.
 * Breadcrumb → title bar → status lifecycle → tabs → content.
 */
export function DetailLayout({ breadcrumb, titleBar, statusBar, tabs, children, className }: DetailLayoutProps) {
  return (
    <div className={cn("flex h-full flex-col overflow-hidden", className)}>
      {/* Header section */}
      <div className="shrink-0 space-y-0">
        {breadcrumb && (
          <div className="px-4 pt-3 md:px-6">{breadcrumb}</div>
        )}
        <div className="px-4 py-3 md:px-6">{titleBar}</div>
        {statusBar && (
          <div className="px-4 pb-3 md:px-6">{statusBar}</div>
        )}
        <div className="px-4 md:px-6">{tabs}</div>
      </div>

      {/* Scrollable tab content */}
      <div className="flex-1 overflow-auto p-4 md:p-6">
        {children}
      </div>
    </div>
  );
}
