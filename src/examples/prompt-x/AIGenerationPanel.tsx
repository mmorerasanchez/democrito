import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Copy, Check } from "lucide-react";
import { useState } from "react";

interface AIGenerationPanelProps {
  instruction?: string;
  onInstructionChange?: (value: string) => void;
  generatedOutput?: string;
  isGenerating?: boolean;
  onGenerate?: () => void;
  onAccept?: (output: string) => void;
  targetField?: string;
  className?: string;
}

/**
 * AIGenerationPanel — AI-assisted prompt generation surface.
 * Provides an instruction input, generate button, and output area
 * with accept/copy actions.
 */
export function AIGenerationPanel({
  instruction = "",
  onInstructionChange,
  generatedOutput,
  isGenerating = false,
  onGenerate,
  onAccept,
  targetField,
  className,
}: AIGenerationPanelProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (generatedOutput) {
      navigator.clipboard.writeText(generatedOutput);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <div className={cn("rounded-md border border-border bg-card", className)}>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-3 py-2">
        <div className="flex items-center gap-2">
          <span className="font-display text-sm font-medium text-foreground">AI Generate</span>
          {targetField && (
            <Badge variant="outline" size="sm">
              <span className="font-mono">{targetField}</span>
            </Badge>
          )}
        </div>
        <Badge variant="secondary" size="sm">
          <span className="font-mono">ai-assist</span>
        </Badge>
      </div>

      {/* Instruction input */}
      <div className="border-b border-border p-3">
        <span className="mb-1.5 block font-mono text-2xs uppercase tracking-widest text-muted-foreground">
          Instruction
        </span>
        <Textarea
          value={instruction}
          onChange={(e) => onInstructionChange?.(e.target.value)}
          placeholder="Describe what you want the AI to generate…"
          className="min-h-[60px] text-xs"
        />
        <div className="mt-2 flex justify-end">
          <Button
            size="sm"
            onClick={onGenerate}
            disabled={isGenerating || !instruction.trim()}
          >
            <Sparkles className="h-3.5 w-3.5" />
            {isGenerating ? "Generating…" : "Generate"}
          </Button>
        </div>
      </div>

      {/* Output area */}
      <div className="p-3">
        <span className="mb-1.5 block font-mono text-2xs uppercase tracking-widest text-muted-foreground">
          Output
        </span>

        {isGenerating ? (
          <div className="flex items-center justify-center gap-2 py-8">
            <div className="flex gap-1">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="h-1.5 w-1.5 rounded-full bg-accent animate-ai-pulse"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
            <span className="font-body text-sm text-muted-foreground">Generating…</span>
          </div>
        ) : generatedOutput ? (
          <div className="space-y-2">
            <pre className="whitespace-pre-wrap rounded-sm border border-border bg-muted p-3 font-mono text-xs leading-relaxed text-foreground">
              {generatedOutput}
            </pre>
            <div className="flex items-center gap-2 justify-end">
              <Button variant="ghost" size="sm" onClick={handleCopy}>
                {copied ? (
                  <Check className="h-3.5 w-3.5 text-success" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
                {copied ? "Copied" : "Copy"}
              </Button>
              {onAccept && (
                <Button size="sm" onClick={() => onAccept(generatedOutput)}>
                  Accept
                </Button>
              )}
            </div>
          </div>
        ) : (
          <p className="py-8 text-center font-body text-sm text-foreground-subtle italic">
            Write an instruction and click Generate.
          </p>
        )}
      </div>
    </div>
  );
}
