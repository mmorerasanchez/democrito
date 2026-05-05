import { useState } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ParameterControl } from "@/components/molecules/ParameterControl";
import { TabNav } from "@/components/molecules/TabNav";
import { X } from "lucide-react";

const anatomyFields = ["Role", "Tone", "Context", "Task", "Reasoning", "Examples", "Output", "Constraints", "Tools"] as const;

const defaultSystemPrompt = `You are a prompt engineering assistant. Analyze prompts for clarity, completeness, and effectiveness. Follow the CLEAR framework: Clarity, Leverage, Effectiveness, Adaptability, Robustness.`;

interface PresetDetailPanelProps {
  type: "model" | "prompt";
  presetName?: string;
  onClose?: () => void;
  className?: string;
}

function ModelPresetDetail() {
  const [activeTab, setActiveTab] = useState("generation");
  const [customizePrompt, setCustomizePrompt] = useState(false);

  const tabs = [
    { label: "Generation", value: "generation" },
    { label: "Evaluation", value: "evaluation" },
  ];

  const renderFields = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label className="font-body text-sm font-medium">Provider</Label>
          <Select defaultValue="anthropic">
            <SelectTrigger className="h-9 font-mono text-sm"><SelectValue /></SelectTrigger>
            <SelectContent className="bg-popover border-border">
              <SelectItem value="anthropic" className="font-mono text-sm">Anthropic</SelectItem>
              <SelectItem value="openai" className="font-mono text-sm">OpenAI</SelectItem>
              <SelectItem value="google" className="font-mono text-sm">Google</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label className="font-body text-sm font-medium">Model ID</Label>
          <Input defaultValue="claude-3.5-sonnet" className="font-mono text-sm" />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <ParameterControl label="Temperature" value={0.7} min={0} max={2} step={0.1} />
        <div className="space-y-1.5">
          <Label className="font-body text-sm font-medium">Target Platform</Label>
          <Select defaultValue="claude">
            <SelectTrigger className="h-9 font-mono text-sm"><SelectValue /></SelectTrigger>
            <SelectContent className="bg-popover border-border">
              <SelectItem value="claude">Claude</SelectItem>
              <SelectItem value="chatgpt">ChatGPT</SelectItem>
              <SelectItem value="gemini">Gemini</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* System Prompt */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="font-body text-sm font-medium">System Prompt</Label>
          <Button variant="ghost" size="sm" onClick={() => setCustomizePrompt(!customizePrompt)}>
            {customizePrompt ? "View Default" : "Customize"}
          </Button>
        </div>
        <Textarea
          defaultValue={defaultSystemPrompt}
          readOnly={!customizePrompt}
          className={cn("min-h-[100px] font-mono text-xs", !customizePrompt && "opacity-60")}
        />
      </div>

      {/* Field Templates */}
      <div className="space-y-2">
        <Label className="font-body text-sm font-medium">Field Templates</Label>
        <div className="space-y-1.5">
          {anatomyFields.slice(0, 4).map((field) => (
            <div key={field} className="flex items-center gap-2 rounded-md border border-border bg-surface px-3 py-1.5">
              <span className="font-body text-xs font-medium text-foreground w-20">{field}</span>
              <span className="font-mono text-xs text-muted-foreground truncate">Default template for {field.toLowerCase()}...</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      <TabNav items={tabs} value={activeTab} onValueChange={setActiveTab} />
      {renderFields()}
    </div>
  );
}

function PromptPresetDetail() {
  const [gatesEnabled, setGatesEnabled] = useState(true);
  const [minScore, setMinScore] = useState(75);
  const [requiredRuns, setRequiredRuns] = useState(3);
  const [maxContext, setMaxContext] = useState(80);

  return (
    <div className="space-y-6">
      {/* Config */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label className="font-body text-sm font-medium">Provider</Label>
            <Select defaultValue="anthropic">
              <SelectTrigger className="h-9 font-mono text-sm"><SelectValue /></SelectTrigger>
              <SelectContent className="bg-popover border-border">
                <SelectItem value="anthropic" className="font-mono text-sm">Anthropic</SelectItem>
                <SelectItem value="openai" className="font-mono text-sm">OpenAI</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label className="font-body text-sm font-medium">Model</Label>
            <Input defaultValue="claude-3.5-sonnet" className="font-mono text-sm" />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <ParameterControl label="Temperature" value={0.5} min={0} max={2} step={0.1} />
          <div className="space-y-1.5">
            <Label className="font-body text-sm font-medium">Target Platform</Label>
            <Select defaultValue="claude">
              <SelectTrigger className="h-9 font-mono text-sm"><SelectValue /></SelectTrigger>
              <SelectContent className="bg-popover border-border">
                <SelectItem value="claude">Claude</SelectItem>
                <SelectItem value="chatgpt">ChatGPT</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-1.5">
          <Label className="font-body text-sm font-medium">User Prompt Template</Label>
          <Textarea defaultValue="You are a customer support specialist for {{company_name}}. Handle inquiries with empathy and technical accuracy..." className="min-h-[80px] font-mono text-xs" />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label className="font-body text-sm font-medium">Complexity</Label>
            <Select defaultValue="standard">
              <SelectTrigger className="h-9 font-mono text-sm"><SelectValue /></SelectTrigger>
              <SelectContent className="bg-popover border-border">
                <SelectItem value="simple">Simple</SelectItem>
                <SelectItem value="standard">Standard</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label className="font-body text-sm font-medium">Reasoning Framework</Label>
            <Select defaultValue="cot">
              <SelectTrigger className="h-9 font-mono text-sm"><SelectValue /></SelectTrigger>
              <SelectContent className="bg-popover border-border">
                <SelectItem value="cot">Chain of Thought</SelectItem>
                <SelectItem value="react">ReAct</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Field Templates */}
      <div className="rounded-md border border-border bg-card">
        <div className="border-b border-border px-3 py-2">
          <span className="font-display text-sm font-medium text-foreground">Field Templates</span>
        </div>
        <div className="divide-y divide-border">
          {anatomyFields.map((field) => (
            <div key={field} className="flex items-center gap-3 px-3 py-2">
              <span className="font-body text-xs font-medium text-foreground w-24 shrink-0">{field}</span>
              <span className="font-mono text-xs text-muted-foreground truncate">Pre-filled {field.toLowerCase()} content for this preset...</span>
            </div>
          ))}
        </div>
      </div>

      {/* Context Engineering */}
      <div className="rounded-md border border-border bg-card">
        <div className="border-b border-border px-3 py-2">
          <span className="font-display text-sm font-medium text-foreground">Context Engineering</span>
        </div>
        <div className="space-y-3 p-4">
          <div className="space-y-1.5">
            <Label className="font-body text-xs font-medium text-muted-foreground">Knowledge Source Templates</Label>
            <div className="rounded-md border border-border bg-surface px-3 py-2">
              <span className="font-mono text-xs text-foreground">product-docs.md, faq-database.json</span>
            </div>
          </div>
          <div className="space-y-1.5">
            <Label className="font-body text-xs font-medium text-muted-foreground">Tool Schema Templates</Label>
            <div className="rounded-md border border-border bg-surface px-3 py-2">
              <span className="font-mono text-xs text-foreground">search_knowledge_base(), create_ticket()</span>
            </div>
          </div>
          <div className="space-y-1.5">
            <Label className="font-body text-xs font-medium text-muted-foreground">Context Budget Defaults</Label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: "System", value: "40%" },
                { label: "Knowledge", value: "35%" },
                { label: "History", value: "25%" },
              ].map((b) => (
                <div key={b.label} className="rounded-md border border-border bg-surface px-2 py-1.5 text-center">
                  <span className="block font-mono text-2xs uppercase tracking-widest text-muted-foreground">{b.label}</span>
                  <span className="font-mono text-sm font-medium text-foreground">{b.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quality Gates */}
      <div className="rounded-md border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border px-3 py-2">
          <span className="font-display text-sm font-medium text-foreground">Quality Gates</span>
          <Switch checked={gatesEnabled} onCheckedChange={setGatesEnabled} />
        </div>
        {gatesEnabled && (
          <div className="space-y-4 p-4">
            <ParameterControl label="Min CLEAR Score" value={minScore} onChange={setMinScore} min={0} max={100} step={1} />
            <ParameterControl label="Required Test Runs" value={requiredRuns} onChange={setRequiredRuns} min={1} max={20} step={1} />
            <div className="space-y-1.5">
              <Label className="font-body text-sm font-medium">Required Fields for Draft Exit</Label>
              <div className="flex flex-wrap gap-1.5">
                {["Role", "Task", "Output"].map((f) => (
                  <Badge key={f} variant="secondary" size="sm">{f}</Badge>
                ))}
                <Badge variant="outline" size="sm" className="cursor-pointer opacity-50">+ Add</Badge>
              </div>
            </div>
            <ParameterControl label="Max Context Utilization" value={maxContext} onChange={setMaxContext} min={0} max={100} step={5} unit="%" />
          </div>
        )}
      </div>
    </div>
  );
}

export function PresetDetailPanel({ type, presetName, onClose, className }: PresetDetailPanelProps) {
  return (
    <div className={cn("rounded-md border border-border bg-card", className)}>
      <div className="flex items-center justify-between border-b border-border px-3 py-2">
        <div className="flex items-center gap-2">
          <span className="font-display text-sm font-medium text-foreground">
            {presetName || "Preset Configuration"}
          </span>
          <Badge variant="outline" size="sm">{type === "model" ? "Model" : "Prompt"}</Badge>
        </div>
        <Button variant="ghost" size="icon" className="h-7 w-7 min-h-0 min-w-0" onClick={onClose}>
          <X className="h-3.5 w-3.5" />
        </Button>
      </div>
      <div className="p-4">
        {type === "model" ? <ModelPresetDetail /> : <PromptPresetDetail />}
      </div>
      <div className="flex justify-end gap-2 border-t border-border px-3 py-2">
        <Button variant="ghost" size="sm" onClick={onClose}>Cancel</Button>
        <Button size="sm">Save Preset</Button>
      </div>
    </div>
  );
}
