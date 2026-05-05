import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import { CLEARScorePanel } from "./CLEARScorePanel";
import type { CLEARDimension, CLEARSuggestion } from "./CLEARScorePanel";
import { Sparkles, ArrowRight, Loader2 } from "lucide-react";

const MODELS: Record<string, string[]> = {
  OpenAI: ["gpt-5", "gpt-5-mini", "gpt-5-nano", "gpt-5.2"],
  Google: ["gemini-3-pro-preview", "gemini-3-flash-preview", "gemini-2.5-pro", "gemini-2.5-flash"],
  Anthropic: ["claude-4-opus", "claude-4-sonnet", "claude-3.5-sonnet", "claude-3.5-haiku"],
};

// --- Mock results ---
const mockDimensions: CLEARDimension[] = [
  { key: "C", label: "Clarity", description: "How unambiguous the instructions are", score: 88 },
  { key: "L", label: "Leverage", description: "How well it uses model capabilities", score: 72 },
  { key: "E", label: "Efficiency", description: "Token optimization, no redundancy", score: 91 },
  { key: "A", label: "Adaptability", description: "Handles edge cases and variations", score: 68 },
  { key: "R", label: "Robustness", description: "Resilience to adversarial inputs", score: 85 },
];

const mockStrengths = [
  "Clear role definition establishes strong persona boundaries",
  "Explicit output format prevents ambiguous responses",
  "Good use of step-by-step reasoning instructions",
];

const mockImprovements = [
  "Add fallback instructions for unsupported languages",
  "Include token budget awareness for lengthy contexts",
  "Consider adding few-shot examples for edge cases",
];

const mockSuggestions: CLEARSuggestion[] = [
  { id: "s1", text: "Add a language detection step before responding to handle multi-language inputs gracefully.", dimension: "Adaptability" },
  { id: "s2", text: "Include explicit token budget constraints to prevent context window overflow.", dimension: "Efficiency" },
  { id: "s3", text: "Add adversarial input handling with a polite refusal template.", dimension: "Robustness" },
];

interface VariablePair {
  name: string;
  value: string;
}

export interface TestRunnerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialPrompt?: string;
  initialVariables?: VariablePair[];
}

/** Extract {{variable}} names from prompt text */
function extractVariables(text: string): string[] {
  const matches = text.match(/\{\{(\w+)\}\}/g);
  if (!matches) return [];
  return [...new Set(matches.map((m) => m.replace(/\{\{|\}\}/g, "")))];
}

/**
 * TestRunnerModal — Dialog modal for running prompt evaluations.
 * Triggered from Editor "Run" buttons and Dashboard/Designer evaluator tabs.
 */
export function TestRunnerModal({
  open,
  onOpenChange,
  initialPrompt = "",
  initialVariables = [],
}: TestRunnerModalProps) {
  const [prompt, setPrompt] = useState(initialPrompt);
  const [model, setModel] = useState("claude-3.5-sonnet");
  const [variables, setVariables] = useState<VariablePair[]>(initialVariables);
  const [running, setRunning] = useState(false);
  const [hasResults, setHasResults] = useState(false);

  // Auto-detect variables from prompt
  const detectedVars = useMemo(() => extractVariables(prompt), [prompt]);

  // Sync detected variables with state
  const activeVariables = useMemo(() => {
    const existing = new Map(variables.map((v) => [v.name, v.value]));
    return detectedVars.map((name) => ({
      name,
      value: existing.get(name) ?? "",
    }));
  }, [detectedVars, variables]);

  const updateVariable = (name: string, value: string) => {
    setVariables((prev) => {
      const next = prev.filter((v) => v.name !== name);
      next.push({ name, value });
      return next;
    });
  };

  const handleRun = () => {
    setRunning(true);
    // Simulate evaluation delay
    setTimeout(() => {
      setRunning(false);
      setHasResults(true);
    }, 1800);
  };

  const overallScore = 81;

  const getProviderForModel = (m: string) => {
    for (const [provider, models] of Object.entries(MODELS)) {
      if (models.includes(m)) return provider;
    }
    return null;
  };
  const modelProvider = getProviderForModel(model);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display">Test Run</DialogTitle>
          <DialogDescription className="font-body text-sm text-muted-foreground">
            Evaluate your prompt using the CLEAR framework. Paste or write a prompt, select a model, and run.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          {/* Prompt Input */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-mono text-2xs uppercase tracking-widest text-muted-foreground">Prompt</span>
              <a
                href="/app/library"
                className="inline-flex items-center gap-1 font-display text-xs font-medium text-accent hover:underline"
              >
                Start from preset
                <ArrowRight className="h-3 w-3" />
              </a>
            </div>
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Paste or write your prompt here…"
              className="min-h-[120px] font-mono text-xs"
            />
          </div>

          {/* Model Select */}
          <div className="space-y-1.5">
            <span className="font-mono text-2xs uppercase tracking-widest text-muted-foreground">Model</span>
            <Select value={model} onValueChange={setModel}>
              <SelectTrigger className="h-9 font-mono text-sm">
                <span className="truncate">
                  {modelProvider && <span className="font-body text-muted-foreground">{modelProvider} / </span>}
                  {model}
                </span>
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                {Object.entries(MODELS).map(([provider, models]) => (
                  <SelectGroup key={provider}>
                    <SelectLabel className="font-display text-xs text-muted-foreground">{provider}</SelectLabel>
                    {models.map((m) => (
                      <SelectItem key={m} value={m} className="font-mono text-sm">{m}</SelectItem>
                    ))}
                  </SelectGroup>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Variable Inputs */}
          {activeVariables.length > 0 && (
            <div className="space-y-2">
              <span className="font-mono text-2xs uppercase tracking-widest text-muted-foreground">
                Variables
                <Badge variant="secondary" size="sm" className="ml-2"><span className="font-mono">{activeVariables.length}</span></Badge>
              </span>
              <div className="space-y-1.5">
                {activeVariables.map((v) => (
                  <div key={v.name} className="flex items-center gap-2">
                    <span className="font-mono text-sm text-accent w-32 shrink-0 truncate">{`{{${v.name}}}`}</span>
                    <Input
                      value={v.value}
                      onChange={(e) => updateVariable(v.name, e.target.value)}
                      placeholder="value"
                      className="h-8 font-mono text-sm"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Run Button */}
          <Button
            className="w-full"
            onClick={handleRun}
            disabled={!prompt.trim() || running}
          >
            {running ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Sparkles className="h-3.5 w-3.5" />
            )}
            {running ? "Evaluating…" : "Run Evaluation"}
          </Button>

          {/* Results */}
          {hasResults && (
            <div className="space-y-4 border-t border-border pt-4">
              {/* KPI Row */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <span className="font-mono text-lg font-bold text-foreground">1,247</span>
                  <p className="font-body text-xs text-muted-foreground">Tokens</p>
                </div>
                <div className="text-center">
                  <span className="font-mono text-lg font-bold text-foreground">1.84s</span>
                  <p className="font-body text-xs text-muted-foreground">Latency</p>
                </div>
                <div className="text-center">
                  <span className="font-mono text-lg font-bold text-foreground">$0.003</span>
                  <p className="font-body text-xs text-muted-foreground">Est. Cost</p>
                </div>
              </div>

              {/* CLEAR Score */}
              <CLEARScorePanel
                overallScore={overallScore}
                dimensions={mockDimensions}
                strengths={mockStrengths}
                improvements={mockImprovements}
                suggestions={mockSuggestions}
              />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
