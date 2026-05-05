import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface PromptTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  tokenEstimate?: number;
  fields?: string[];
}

interface TemplatePickerProps {
  templates: PromptTemplate[];
  selectedId?: string | null;
  onSelect?: (template: PromptTemplate) => void;
  className?: string;
}

/**
 * TemplatePicker — grid picker for selecting prompt templates.
 * Shows template cards with name, description, category badge,
 * estimated tokens, and included anatomy fields.
 */
export function TemplatePicker({
  templates,
  selectedId,
  onSelect,
  className,
}: TemplatePickerProps) {
  return (
    <div className={cn("rounded-md border border-border bg-card", className)}>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-3 py-2">
        <span className="font-display text-sm font-medium text-foreground">Templates</span>
        <span className="font-mono text-2xs text-muted-foreground">
          {templates.length} {templates.length === 1 ? "template" : "templates"}
        </span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-3 p-3 sm:grid-cols-2 lg:grid-cols-3">
        {templates.map((template) => {
          const isSelected = selectedId === template.id;
          return (
            <button
              key={template.id}
              type="button"
              onClick={() => onSelect?.(template)}
              className={cn(
                "group relative flex flex-col rounded-md border p-3 text-left transition-all duration-150",
                "hover:border-accent/50 hover:bg-accent/5",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                isSelected
                  ? "border-accent bg-accent/10"
                  : "border-border bg-card",
              )}
            >
              {/* Selected check */}
              {isSelected && (
                <div className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-accent">
                  <Check className="h-3 w-3 text-accent-foreground" />
                </div>
              )}

              {/* Category badge */}
              <Badge variant="outline" size="sm" className="mb-2 w-fit">
                <span className="font-mono">{template.category}</span>
              </Badge>

              {/* Name */}
              <span className="font-display text-sm font-medium text-foreground">
                {template.name}
              </span>

              {/* Description */}
              <p className="mt-1 line-clamp-2 font-body text-xs text-muted-foreground">
                {template.description}
              </p>

              {/* Footer metadata */}
              <div className="mt-3 flex items-center gap-3">
                {template.tokenEstimate !== undefined && (
                  <span className="font-mono text-2xs text-foreground-subtle">
                    ~{template.tokenEstimate} tokens
                  </span>
                )}
                {template.fields && template.fields.length > 0 && (
                  <span className="font-mono text-2xs text-foreground-subtle">
                    {template.fields.length} fields
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Empty state */}
      {templates.length === 0 && (
        <p className="px-3 py-8 text-center font-body text-sm text-foreground-subtle italic">
          No templates available.
        </p>
      )}
    </div>
  );
}
