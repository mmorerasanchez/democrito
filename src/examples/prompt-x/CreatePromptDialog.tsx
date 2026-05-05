import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ParameterControl } from "@/components/molecules/ParameterControl";
import { ChevronDown, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

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

const MODELS = {
  OpenAI: ["gpt-5", "gpt-5-mini", "gpt-5-nano"],
  Google: ["gemini-3-pro-preview", "gemini-3-flash-preview", "gemini-2.5-pro"],
  Anthropic: ["claude-4-opus", "claude-4-sonnet", "claude-3.5-sonnet"],
};

const PLATFORMS = ["Claude", "Gemini", "ChatGPT", "Lovable"];

export interface CreatePromptFormData {
  name: string;
  description: string;
  model: string;
  platform: string;
  temperature: number;
  maxTokens: number;
  anatomyFields: string[];
  fieldContents: Record<string, string>;
}

const defaultFormData: CreatePromptFormData = {
  name: "",
  description: "",
  model: "gemini-3-flash-preview",
  platform: "Claude",
  temperature: 0.7,
  maxTokens: 2048,
  anatomyFields: ["role", "task", "output"],
  fieldContents: {},
};

interface CreatePromptDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (data: CreatePromptFormData) => void;
}

export function CreatePromptDialog({ open, onOpenChange, onSubmit }: CreatePromptDialogProps) {
  const [form, setForm] = useState<CreatePromptFormData>(defaultFormData);
  const [configOpen, setConfigOpen] = useState(false);
  const [fieldsOpen, setFieldsOpen] = useState(true);

  const update = <K extends keyof CreatePromptFormData>(key: K, val: CreatePromptFormData[K]) =>
    setForm((prev) => ({ ...prev, [key]: val }));

  const toggleField = (field: string) => {
    const next = form.anatomyFields.includes(field)
      ? form.anatomyFields.filter((f) => f !== field)
      : [...form.anatomyFields, field];
    update("anatomyFields", next);
  };

  const updateFieldContent = (field: string, content: string) =>
    setForm((prev) => ({ ...prev, fieldContents: { ...prev.fieldContents, [field]: content } }));

  const handleSubmit = () => {
    onSubmit?.(form);
    setForm(defaultFormData);
    onOpenChange(false);
  };

  const isValid = form.name.trim().length > 0 && form.anatomyFields.length > 0;

  const getProviderForModel = (model: string) => {
    for (const [provider, models] of Object.entries(MODELS)) {
      if (models.includes(model)) return provider;
    }
    return null;
  };

  const modelProvider = getProviderForModel(form.model);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-lg font-semibold">Create New Prompt</DialogTitle>
          <DialogDescription className="font-body text-sm text-muted-foreground">
            Define your prompt structure, select anatomy fields, and configure model settings.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 py-2">
          {/* Name & Description */}
          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label htmlFor="prompt-name" className="font-body text-sm font-medium">
                Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="prompt-name"
                placeholder="e.g. Onboarding Flow, Code Review Assistant"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="prompt-desc" className="font-body text-sm font-medium">Description</Label>
              <Textarea
                id="prompt-desc"
                placeholder="Brief description of this prompt's purpose…"
                className="min-h-[60px]"
                value={form.description}
                onChange={(e) => update("description", e.target.value)}
              />
            </div>
          </div>

          {/* Anatomy Fields Selection + Content */}
          <Collapsible open={fieldsOpen} onOpenChange={setFieldsOpen}>
            <CollapsibleTrigger className="w-full">
              <div className="flex items-center gap-2 py-2">
                <span className="font-display text-sm font-medium text-foreground">Anatomy Fields</span>
                <Badge variant="secondary" size="sm">
                  <span className="font-mono">{form.anatomyFields.length}</span>
                </Badge>
                <ChevronDown className={cn("ml-auto h-3.5 w-3.5 text-muted-foreground transition-transform", fieldsOpen && "rotate-180")} />
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-3 pt-1">
              {/* Toggle grid */}
              <div className="grid grid-cols-3 gap-2">
                {ANATOMY_FIELDS.map((field) => (
                  <label
                    key={field.value}
                    className={cn(
                      "flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2 transition-colors",
                      form.anatomyFields.includes(field.value)
                        ? "border-accent/30 bg-accent/5"
                        : "border-border bg-card"
                    )}
                  >
                    <Checkbox
                      checked={form.anatomyFields.includes(field.value)}
                      onCheckedChange={() => toggleField(field.value)}
                      className="h-3.5 w-3.5"
                    />
                    <span className={cn("h-2 w-2 rounded-full", field.color)} />
                    <span className="font-body text-sm">{field.label}</span>
                  </label>
                ))}
              </div>

              {/* Content textareas for selected fields */}
              {form.anatomyFields.length > 0 && (
                <div className="space-y-3 rounded-md border border-border bg-surface p-3">
                  <span className="font-mono text-2xs uppercase tracking-widest text-muted-foreground">Field Content</span>
                  {form.anatomyFields.map((fieldKey) => {
                    const meta = ANATOMY_FIELDS.find((f) => f.value === fieldKey);
                    if (!meta) return null;
                    return (
                      <div key={fieldKey} className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className={cn("h-2 w-2 rounded-full", meta.color)} />
                          <span className="font-display text-xs font-medium text-foreground">{meta.label}</span>
                        </div>
                        <Textarea
                          placeholder={`Enter ${meta.label.toLowerCase()} content…`}
                          className="min-h-[48px] text-xs"
                          value={form.fieldContents[fieldKey] || ""}
                          onChange={(e) => updateFieldContent(fieldKey, e.target.value)}
                        />
                      </div>
                    );
                  })}
                </div>
              )}
            </CollapsibleContent>
          </Collapsible>

          {/* Model Configuration */}
          <Collapsible open={configOpen} onOpenChange={setConfigOpen}>
            <CollapsibleTrigger className="w-full">
              <div className="flex items-center gap-2 py-2">
                <span className="font-display text-sm font-medium text-foreground">Model Configuration</span>
                <ChevronDown className={cn("ml-auto h-3.5 w-3.5 text-muted-foreground transition-transform", configOpen && "rotate-180")} />
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-4 pt-1">
              <div className="grid grid-cols-2 gap-4">
                {/* Model */}
                <div className="space-y-1.5">
                  <span className="font-mono text-2xs uppercase tracking-widest text-muted-foreground">Model</span>
                  <Select value={form.model} onValueChange={(v) => update("model", v)}>
                    <SelectTrigger className="h-9 font-mono text-sm">
                      <span className="truncate">
                        {modelProvider && <span className="font-body text-muted-foreground">{modelProvider} / </span>}
                        {form.model}
                      </span>
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border">
                      {Object.entries(MODELS).map(([provider, models]) => (
                        <div key={provider}>
                          <div className="px-2 py-1.5 font-display text-xs text-muted-foreground">{provider}</div>
                          {models.map((m) => (
                            <SelectItem key={m} value={m} className="font-mono text-sm">{m}</SelectItem>
                          ))}
                        </div>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Platform */}
                <div className="space-y-1.5">
                  <span className="font-mono text-2xs uppercase tracking-widest text-muted-foreground">Target Platform</span>
                  <Select value={form.platform} onValueChange={(v) => update("platform", v)}>
                    <SelectTrigger className="h-9 font-mono text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border">
                      {PLATFORMS.map((p) => (
                        <SelectItem key={p} value={p} className="font-mono text-sm">{p}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Sliders */}
              <ParameterControl label="Temperature" value={form.temperature} onChange={(v) => update("temperature", v)} min={0} max={2} step={0.1} />
              <ParameterControl label="Max Tokens" value={form.maxTokens} onChange={(v) => update("maxTokens", v)} min={1} max={8192} step={1} />
            </CollapsibleContent>
          </Collapsible>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="ghost" size="sm" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button size="sm" disabled={!isValid} onClick={handleSubmit}>
            <Sparkles className="h-3.5 w-3.5" />
            Create Prompt
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
