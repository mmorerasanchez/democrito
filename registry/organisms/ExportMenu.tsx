import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Download, FileJson, FileSpreadsheet, FileText, Copy } from "lucide-react";
import { useState } from "react";

type ExportFormat = "json" | "csv" | "yaml" | "markdown" | "clipboard";

interface ExportMenuProps {
  onExport?: (format: ExportFormat) => void;
  promptName?: string;
  className?: string;
}

const exportOptions: { format: ExportFormat; label: string; icon: typeof FileJson; description: string }[] = [
  { format: "json", label: "JSON", icon: FileJson, description: "Structured prompt data with metadata" },
  { format: "csv", label: "CSV", icon: FileSpreadsheet, description: "Tabular format for spreadsheets" },
  { format: "yaml", label: "YAML", icon: FileText, description: "Human-readable config format" },
  { format: "markdown", label: "Markdown", icon: FileText, description: "Documentation-ready format" },
  { format: "clipboard", label: "Copy to Clipboard", icon: Copy, description: "Copy compiled prompt text" },
];

/**
 * ExportMenu — Panel listing available export formats with descriptions.
 */
export function ExportMenu({ onExport, promptName, className }: ExportMenuProps) {
  return (
    <div className={cn("rounded-md border border-border bg-card w-72", className)}>
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-border px-3 py-2">
        <Download className="h-4 w-4 text-muted-foreground" />
        <span className="font-display text-sm font-medium text-foreground">Export</span>
        {promptName && (
          <span className="font-mono text-2xs text-muted-foreground truncate ml-auto">{promptName}</span>
        )}
      </div>

      {/* Options */}
      <div className="py-1">
        {exportOptions.map(({ format, label, icon: Icon, description }) => (
          <button
            key={format}
            type="button"
            onClick={() => onExport?.(format)}
            className="flex w-full items-start gap-3 px-3 py-2.5 text-left transition-colors duration-150 hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Icon className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
            <div className="min-w-0">
              <span className="font-mono text-sm font-medium text-foreground">{label}</span>
              <p className="font-body text-xs text-muted-foreground">{description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
