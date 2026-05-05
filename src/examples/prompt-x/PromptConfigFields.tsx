import { useState } from "react";
import { cn } from "@/lib/utils";
import { ParameterControl } from "@/components/molecules/ParameterControl";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup, SelectLabel } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const MODELS = {
  OpenAI: ["gpt-5", "gpt-5-mini", "gpt-5-nano", "gpt-5.2"],
  Google: ["gemini-3-pro-preview", "gemini-3-flash-preview", "gemini-2.5-pro", "gemini-2.5-flash", "gemini-2.5-flash-lite"],
  Anthropic: ["claude-4-opus", "claude-4-sonnet", "claude-3.5-sonnet", "claude-3.5-haiku"],
};

const PLATFORMS = ["Claude", "Gemini", "ChatGPT", "Lovable"];

const COMPLEXITY_OPTIONS = [
  { value: "basic", label: "Basic" },
  { value: "standard", label: "Standard" },
  { value: "advanced", label: "Advanced" },
] as const;

const REASONING_OPTIONS = [
  { value: "react", label: "ReAct" },
  { value: "cot", label: "Chain of Thought" },
  { value: "zero-shot", label: "Zero Shot" },
  { value: "few-shot", label: "Few Shot" },
] as const;

const ANATOMY_FIELDS = [
  { value: "role", label: "Role", color: "bg-category-teal" },
  { value: "tone", label: "Tone", color: "bg-category-amber" },
  { value: "context", label: "Context", color: "bg-category-emerald" },
  { value: "task", label: "Task", color: "bg-category-orange" },
  { value: "reasoning", label: "Reasoning", color: "bg-category-violet" },
  { value: "examples", label: "Examples", color: "bg-category-rose" },
  { value: "output", label: "Output", color: "bg-category-blue" },
  { value: "constraints", label: "Constraints", color: "bg-category-red" },
  { value: "tools", label: "Tools", color: "bg-category-gold" },
] as const;

export interface PromptConfigState {
  model: string;
  platform: string;
  instruction: string;
  temperature: number;
  maxTokens: number;
  complexity: string;
  reasoning: string;
  anatomyFields: string[];
}

export const defaultPromptConfig: PromptConfigState = {
  model: "gemini-3-flash-preview",
  platform: "Claude",
  instruction: "",
  temperature: 0.7,
  maxTokens: 2048,
  complexity: "standard",
  reasoning: "cot",
  anatomyFields: ["role", "task", "output"],
};

interface PromptConfigFieldsProps {
  config: PromptConfigState;
  onChange: (config: PromptConfigState) => void;
  /** "full" = AI Designer (all visible), "compact" = Dashboard (instruction visible, rest collapsible), "settings" = Detail settings (no anatomy, no advanced wrapper) */
  mode: "full" | "compact" | "settings";
  /** Override instruction value externally (e.g. typing animation) */
  instructionOverride?: string;
  className?: string;
}

/**
 * PromptConfigFields — Shared prompt configuration fields used across
 * Dashboard (compact/collapsible) and AI Designer (full) pages.
 */
export function PromptConfigFields({
  config,
  onChange,
  mode,
  instructionOverride,
  className,
}: PromptConfigFieldsProps) {
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [anatomyOpen, setAnatomyOpen] = useState(false);

  const update = <K extends keyof PromptConfigState>(key: K, value: PromptConfigState[K]) => {
    onChange({ ...config, [key]: value });
  };

  const toggleAnatomy = (field: string) => {
    const next = config.anatomyFields.includes(field)
      ? config.anatomyFields.filter((f) => f !== field)
      : [...config.anatomyFields, field];
    update("anatomyFields", next);
  };

  const getProviderForModel = (model: string) => {
    for (const [provider, models] of Object.entries(MODELS)) {
      if (models.includes(model)) return provider;
    }
    return null;
  };

  // --- Shared sub-components ---

  const modelProvider = getProviderForModel(config.model);

  const ModelSelect = (
    <div className="space-y-1.5">
      <span className="font-mono text-2xs uppercase tracking-widest text-muted-foreground">Model</span>
      <Select value={config.model} onValueChange={(v) => update("model", v)}>
        <SelectTrigger className="h-9 font-mono text-sm">
          <span className="truncate">
            {modelProvider && <span className="font-body text-muted-foreground">{modelProvider} / </span>}
            {config.model}
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
  );

  const PlatformSelect = (
    <div className="space-y-1.5">
      <span className="font-mono text-2xs uppercase tracking-widest text-muted-foreground">Target Platform</span>
      <Select value={config.platform} onValueChange={(v) => update("platform", v)}>
        <SelectTrigger className="h-9 font-mono text-sm">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-popover border-border">
          {PLATFORMS.map((p) => (
            <SelectItem key={p} value={p} className="font-mono text-sm">{p}</SelectItem>
          ))}
          <SelectItem value="__new" className="text-accent font-body text-sm">+ Add new preset</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );

  const InstructionBox = (
    <div className="space-y-1.5">
      <span className="font-mono text-2xs uppercase tracking-widest text-muted-foreground">Instruction</span>
      <Textarea
        value={instructionOverride ?? config.instruction}
        onChange={(e) => update("instruction", e.target.value)}
        placeholder="Describe what you want the AI to generate…"
        className="min-h-[60px] text-xs"
        readOnly={instructionOverride !== undefined}
      />
    </div>
  );

  const Sliders = (
    <div className="space-y-3">
      <ParameterControl label="Temperature" value={config.temperature} onChange={(v) => update("temperature", v)} min={0} max={2} step={0.1} />
      <ParameterControl label="Max Tokens" value={config.maxTokens} onChange={(v) => update("maxTokens", v)} min={1} max={8192} step={1} />
    </div>
  );

  const AdvancedSection = (
    <div className="space-y-3">
      {/* Complexity */}
      <div className="space-y-1.5">
        <span className="font-mono text-2xs uppercase tracking-widest text-muted-foreground">Complexity</span>
        <div className="flex gap-2">
          {COMPLEXITY_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => update("complexity", opt.value)}
              className={cn(
                "flex-1 rounded-md border px-3 py-1.5 font-display text-sm font-medium transition-colors",
                config.complexity === opt.value
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-border bg-card text-muted-foreground hover:text-foreground"
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Reasoning Framework */}
      <div className="space-y-1.5">
        <span className="font-mono text-2xs uppercase tracking-widest text-muted-foreground">Reasoning Framework</span>
        <Select value={config.reasoning} onValueChange={(v) => update("reasoning", v)}>
          <SelectTrigger className="h-9 font-mono text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-popover border-border">
            {REASONING_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value} className="font-mono text-sm">{opt.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  const AnatomySection = (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
      {ANATOMY_FIELDS.map((field) => (
        <label
          key={field.value}
          className={cn(
            "flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2 transition-colors",
            config.anatomyFields.includes(field.value)
              ? "border-accent/30 bg-accent/5"
              : "border-border bg-card"
          )}
        >
          <Checkbox
            checked={config.anatomyFields.includes(field.value)}
            onCheckedChange={() => toggleAnatomy(field.value)}
            className="h-3.5 w-3.5"
          />
          <span className={cn("h-2 w-2 rounded-full", field.color)} />
          <span className="font-body text-sm">{field.label}</span>
        </label>
      ))}
    </div>
  );

  // --- Collapsible trigger style ---
  const CollapsibleHeader = ({ label, open, count }: { label: string; open: boolean; count?: number }) => (
    <div className="flex items-center gap-2 py-2">
      <span className="font-display text-sm font-medium text-foreground">{label}</span>
      {count !== undefined && (
        <Badge variant="secondary" size="sm"><span className="font-mono">{count}</span></Badge>
      )}
      <ChevronDown className={cn("ml-auto h-3.5 w-3.5 text-muted-foreground transition-transform", open && "rotate-180")} />
    </div>
  );

  // ======= SETTINGS MODE (Detail page — no anatomy, no advanced wrapper) =======
  if (mode === "settings") {
    return (
      <div className={cn("space-y-4", className)}>
        <div className="grid grid-cols-2 gap-4">
          {ModelSelect}
          {PlatformSelect}
        </div>
        {InstructionBox}
        {Sliders}
        {/* Reasoning Framework — flat, always visible */}
        <div className="space-y-1.5">
          <span className="font-mono text-2xs uppercase tracking-widest text-muted-foreground">Complexity</span>
          <div className="flex gap-2">
            {COMPLEXITY_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => update("complexity", opt.value)}
                className={cn(
                  "flex-1 rounded-md border px-3 py-1.5 font-display text-sm font-medium transition-colors",
                  config.complexity === opt.value
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-border bg-card text-muted-foreground hover:text-foreground"
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-1.5">
          <span className="font-mono text-2xs uppercase tracking-widest text-muted-foreground">Reasoning Framework</span>
          <Select value={config.reasoning} onValueChange={(v) => update("reasoning", v)}>
            <SelectTrigger className="h-9 font-mono text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border">
              {REASONING_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value} className="font-mono text-sm">{opt.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    );
  }

  // ======= FULL MODE (AI Designer) =======
  if (mode === "full") {
    return (
      <div className={cn("space-y-4", className)}>
        <div className="grid grid-cols-2 gap-4">
          {ModelSelect}
          {PlatformSelect}
        </div>

        {InstructionBox}
        {Sliders}

        {/* Advanced config — collapsible */}
        <Collapsible open={advancedOpen} onOpenChange={setAdvancedOpen}>
          <CollapsibleTrigger className="w-full">
            <CollapsibleHeader label="Advanced Configuration" open={advancedOpen} />
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-4 pt-1">
            {AdvancedSection}
          </CollapsibleContent>
        </Collapsible>

        {/* Anatomy fields — collapsible */}
        <Collapsible open={anatomyOpen} onOpenChange={setAnatomyOpen}>
          <CollapsibleTrigger className="w-full">
            <CollapsibleHeader label="Anatomy Fields" open={anatomyOpen} count={config.anatomyFields.length} />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-1">
            {AnatomySection}
          </CollapsibleContent>
        </Collapsible>
      </div>
    );
  }

  // ======= COMPACT MODE (Dashboard) =======
  return (
    <div className={cn("space-y-3", className)}>
      {InstructionBox}

      <Collapsible open={advancedOpen} onOpenChange={setAdvancedOpen}>
        <CollapsibleTrigger className="w-full">
          <CollapsibleHeader label="Configuration" open={advancedOpen} />
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-4 pt-1">
          <div className="grid grid-cols-2 gap-4">
            {ModelSelect}
            {PlatformSelect}
          </div>
          {Sliders}
          {AdvancedSection}
        </CollapsibleContent>
      </Collapsible>

      <Collapsible open={anatomyOpen} onOpenChange={setAnatomyOpen}>
        <CollapsibleTrigger className="w-full">
          <CollapsibleHeader label="Anatomy Fields" open={anatomyOpen} count={config.anatomyFields.length} />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-1">
          {AnatomySection}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
