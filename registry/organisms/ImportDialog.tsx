import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Upload, FileText } from "lucide-react";
import { useState } from "react";

type ImportFormat = "json" | "csv" | "yaml" | "text";

interface ImportDialogProps {
  onImport?: (content: string, format: ImportFormat) => void;
  onCancel?: () => void;
  className?: string;
}

const formatOptions: { value: ImportFormat; label: string }[] = [
  { value: "json", label: "JSON" },
  { value: "csv", label: "CSV" },
  { value: "yaml", label: "YAML" },
  { value: "text", label: "Plain Text" },
];

/**
 * ImportDialog — Content area for importing prompts or test data.
 * Supports paste or file reference with format selection.
 */
export function ImportDialog({ onImport, onCancel, className }: ImportDialogProps) {
  const [format, setFormat] = useState<ImportFormat>("json");
  const [content, setContent] = useState("");

  return (
    <div className={cn("rounded-md border border-border bg-card", className)}>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-3 py-2">
        <div className="flex items-center gap-2">
          <Upload className="h-4 w-4 text-muted-foreground" />
          <span className="font-display text-sm font-medium text-foreground">Import</span>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Format selector */}
        <div className="space-y-1.5">
          <span className="font-mono text-2xs uppercase tracking-widest text-muted-foreground">Format</span>
          <div className="flex gap-1">
            {formatOptions.map((opt) => (
              <Button
                key={opt.value}
                variant={format === opt.value ? "default" : "ghost"}
                size="sm"
                onClick={() => setFormat(opt.value)}
                className="font-mono text-xs"
              >
                {opt.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Paste area */}
        <div className="space-y-1.5">
          <span className="font-mono text-2xs uppercase tracking-widest text-muted-foreground">Paste content</span>
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={`Paste ${format.toUpperCase()} content here…`}
            className="min-h-[120px] text-xs"
          />
        </div>

        {/* File drop zone */}
        <div className="flex items-center justify-center rounded-md border-2 border-dashed border-border bg-muted/30 px-4 py-6">
          <div className="text-center">
            <FileText className="mx-auto h-6 w-6 text-muted-foreground" />
            <p className="mt-2 font-body text-xs text-muted-foreground">
              Or drop a <span className="font-mono text-accent">.{format}</span> file here
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2">
          <Button variant="ghost" size="sm" onClick={onCancel}>Cancel</Button>
          <Button size="sm" onClick={() => onImport?.(content, format)} disabled={!content.trim()}>
            Import
          </Button>
        </div>
      </div>
    </div>
  );
}
