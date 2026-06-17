import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface EditorLayoutProps {
  /** Left pane content (editor, fields, etc.) */
  editor: ReactNode;
  /** Right pane content (preview, playground, etc.) */
  preview: ReactNode;
  /** Optional header bar above the split pane */
  header?: ReactNode;
  className?: string;
}

/**
 * EditorLayout — 50/50 split-pane template.
 * Left editor + 4px resizer + right preview.
 * Stacks vertically on mobile (md breakpoint).
 */
export function EditorLayout({ editor, preview, header, className }: EditorLayoutProps) {
  return (
    <div className={cn("flex h-full flex-col overflow-hidden", className)}>
      {header && (
        <div className="shrink-0 border-b border-border">{header}</div>
      )}
      <div className="flex flex-1 flex-col overflow-hidden md:flex-row">
        {/* Left pane */}
        <div className="flex-1 overflow-auto border-b border-border md:border-b-0 md:border-r">
          {editor}
        </div>
        {/* Resizer visual indicator (desktop only) */}
        <div className="hidden w-1 shrink-0 cursor-col-resize bg-border hover:bg-accent/30 transition-colors duration-150 md:block" />
        {/* Right pane */}
        <div className="flex-1 overflow-auto">
          {preview}
        </div>
      </div>
    </div>
  );
}
