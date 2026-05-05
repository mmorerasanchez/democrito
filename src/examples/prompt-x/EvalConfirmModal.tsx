import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Loader2 } from "lucide-react";
import type { PromptConfigState } from "./PromptConfigFields";

const ANATOMY_LABELS: Record<string, string> = {
  role: "Role", tone: "Tone", context: "Context", task: "Task",
  reasoning: "Reasoning", examples: "Examples", output: "Output",
  constraints: "Constraints", tools: "Tools",
};

const REASONING_LABELS: Record<string, string> = {
  react: "ReAct", cot: "Chain of Thought", "zero-shot": "Zero Shot", "few-shot": "Few Shot",
};

const MODELS_PROVIDER: Record<string, string> = {
  "gpt-5": "OpenAI", "gpt-5-mini": "OpenAI", "gpt-5-nano": "OpenAI", "gpt-5.2": "OpenAI",
  "gemini-3-pro-preview": "Google", "gemini-3-flash-preview": "Google", "gemini-2.5-pro": "Google", "gemini-2.5-flash": "Google", "gemini-2.5-flash-lite": "Google",
  "claude-4-opus": "Anthropic", "claude-4-sonnet": "Anthropic", "claude-3.5-sonnet": "Anthropic", "claude-3.5-haiku": "Anthropic",
};

export interface EvalConfirmModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  config: PromptConfigState;
  running: boolean;
  onConfirm: () => void;
}

/**
 * EvalConfirmModal — Shows a configuration summary before running an evaluation.
 */
export function EvalConfirmModal({
  open,
  onOpenChange,
  config,
  running,
  onConfirm,
}: EvalConfirmModalProps) {
  const provider = MODELS_PROVIDER[config.model] ?? "";

  const rows: { label: string; value: React.ReactNode }[] = [
    {
      label: "Model",
      value: (
        <span className="font-mono text-sm">
          {provider && <span className="font-body text-muted-foreground">{provider} / </span>}
          {config.model}
        </span>
      ),
    },
    { label: "Target Platform", value: <span className="font-body text-sm">{config.platform}</span> },
    { label: "Temperature", value: <span className="font-mono text-sm">{config.temperature}</span> },
    { label: "Max Tokens", value: <span className="font-mono text-sm">{config.maxTokens}</span> },
    { label: "Complexity", value: <Badge variant="secondary" size="sm"><span className="font-mono capitalize">{config.complexity}</span></Badge> },
    { label: "Reasoning", value: <span className="font-body text-sm">{REASONING_LABELS[config.reasoning] ?? config.reasoning}</span> },
    {
      label: "Anatomy Fields",
      value: (
        <div className="flex flex-wrap gap-1">
          {config.anatomyFields.map((f) => (
            <Badge key={f} variant="outline" size="sm">
              <span className="font-body text-xs">{ANATOMY_LABELS[f] ?? f}</span>
            </Badge>
          ))}
        </div>
      ),
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display">Review Configuration</DialogTitle>
          <DialogDescription className="font-body text-sm text-muted-foreground">
            Confirm your evaluation settings before running.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-2 space-y-3">
          {/* Prompt Preview */}
          <div className="space-y-1.5">
            <span className="font-mono text-2xs uppercase tracking-widest text-muted-foreground">Instruction</span>
            <div className="rounded-md border border-border bg-muted p-3 max-h-[120px] overflow-auto">
              <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed text-foreground">
                {config.instruction || "No instruction provided"}
              </pre>
            </div>
          </div>

          {/* Config Summary Table */}
          <div className="rounded-md border border-border bg-surface divide-y divide-border">
            {rows.map((row) => (
              <div key={row.label} className="flex items-center justify-between px-3 py-2">
                <span className="font-mono text-2xs uppercase tracking-widest text-muted-foreground">{row.label}</span>
                <div>{row.value}</div>
              </div>
            ))}
          </div>

          {/* Confirm Button */}
          <Button
            className="w-full"
            onClick={onConfirm}
            disabled={running || !config.instruction.trim()}
          >
            {running ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Sparkles className="h-3.5 w-3.5" />
            )}
            {running ? "Evaluating…" : "Run Evaluation"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
