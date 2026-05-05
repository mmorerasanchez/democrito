import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy, Settings2, Trash2 } from "lucide-react";

export interface PresetCardData {
  id: string;
  name: string;
  isSystem: boolean;
  type: "model" | "prompt";
  provider: string;
  model: string;
  temperature: number;
  /** Model presets */
  targetPlatform?: string;
  /** Prompt presets */
  complexity?: "Simple" | "Standard" | "Advanced";
  fieldCount?: number;
}

interface PresetCardProps {
  preset: PresetCardData;
  onCopy?: (id: string) => void;
  onConfigure?: (id: string) => void;
  onDelete?: (id: string) => void;
  className?: string;
}

export function PresetCard({ preset, onCopy, onConfigure, onDelete, className }: PresetCardProps) {
  const detailLine =
    preset.type === "model"
      ? `${preset.provider} · ${preset.model} · ${preset.temperature}`
      : `${preset.complexity} · ${preset.fieldCount} fields`;

  return (
    <div className={cn("flex items-center justify-between rounded-md border border-border bg-card px-3 py-2.5", className)}>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="font-body text-sm font-medium text-foreground">{preset.name}</span>
          <Badge variant={preset.isSystem ? "outline" : "secondary"} size="sm">
            {preset.isSystem ? "System" : "Custom"}
          </Badge>
        </div>
        <span className="font-mono text-xs text-muted-foreground">{detailLine}</span>
      </div>
      <div className="flex items-center gap-1">
        {preset.isSystem ? (
          <Button variant="ghost" size="sm" onClick={() => onCopy?.(preset.id)}>
            <Copy className="h-3.5 w-3.5" /> Copy
          </Button>
        ) : (
          <>
            <Button variant="ghost" size="sm" onClick={() => onConfigure?.(preset.id)}>
              <Settings2 className="h-3.5 w-3.5" /> Configure
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 min-h-0 min-w-0 text-muted-foreground hover:text-error" onClick={() => onDelete?.(preset.id)}>
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
