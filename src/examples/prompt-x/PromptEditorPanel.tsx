import { cn } from "@/lib/utils";
import { AnatomyFieldCard } from "./AnatomyFieldCard";
import { CompiledPreview } from "./CompiledPreview";
import type { AnatomyField } from "./AnatomyFieldCard";

interface FieldData {
  field: AnatomyField;
  content: string;
  tokenCount?: number;
}

interface PromptEditorPanelProps {
  fields: FieldData[];
  compiledOutput?: string;
  totalTokens?: number;
  maxTokens?: number;
  className?: string;
}

/**
 * PromptEditorPanel — split panel with anatomy field cards on the left
 * and compiled preview on the right. The core editing surface of the prompt-x application.
 */
export function PromptEditorPanel({
  fields,
  compiledOutput = "",
  totalTokens,
  maxTokens,
  className,
}: PromptEditorPanelProps) {
  return (
    <div className={cn("grid grid-cols-1 gap-4 lg:grid-cols-2", className)}>
      {/* Left — Anatomy Fields */}
      <div className="space-y-3">
        <span className="font-mono text-2xs uppercase tracking-widest text-muted-foreground">
          Anatomy Fields
        </span>
        <div className="space-y-2">
          {fields.map((f) => (
            <AnatomyFieldCard
              key={f.field}
              field={f.field}
              variant="compact"
              content={f.content}
              tokenCount={f.tokenCount}
            />
          ))}
        </div>
      </div>

      {/* Right — Compiled Preview */}
      <div className="space-y-3">
        <span className="font-mono text-2xs uppercase tracking-widest text-muted-foreground">
          Compiled Preview
        </span>
        <CompiledPreview
          content={compiledOutput}
          totalTokens={totalTokens}
          maxTokens={maxTokens}
          className="min-h-[300px]"
        />
      </div>
    </div>
  );
}
