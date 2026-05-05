import { useState } from "react";
import { cn } from "@/lib/utils";
import { TabNav } from "@/components/molecules/TabNav";
import { AnatomyFieldCard } from "./AnatomyFieldCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, Save, RefreshCw, Check } from "lucide-react";
import type { AnatomyField } from "./AnatomyFieldCard";

interface AnatomyFieldData {
  field: AnatomyField;
  content: string;
  tokenCount: number;
}

export interface ImprovedPromptPanelProps {
  improvedPrompt: string;
  anatomyFields: AnatomyFieldData[];
  onReEvaluate?: () => void;
  onSaveToStore?: (status: string) => void;
  className?: string;
}

const tabs = [
  { label: "Full Version", value: "full" },
  { label: "Anatomy Fields", value: "anatomy" },
];

/**
 * ImprovedPromptPanel — Shows the AI-improved version of a prompt in two views:
 * Full Version (monospace, copyable) and Anatomy Fields (editable cards).
 */
export function ImprovedPromptPanel({
  improvedPrompt,
  anatomyFields,
  onReEvaluate,
  onSaveToStore,
  className,
}: ImprovedPromptPanelProps) {
  const [activeTab, setActiveTab] = useState("full");
  const [copied, setCopied] = useState(false);
  const [showSave, setShowSave] = useState(false);
  const [saveStatus, setSaveStatus] = useState("draft");

  const handleCopy = async () => {
    await navigator.clipboard.writeText(improvedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    onSaveToStore?.(saveStatus);
    setShowSave(false);
  };

  return (
    <div className={cn("rounded-md border border-border bg-card", className)}>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-3 py-2">
        <span className="font-display text-sm font-medium text-foreground">Improved Prompt</span>
        <TabNav items={tabs} value={activeTab} onValueChange={setActiveTab} className="bg-transparent p-0" />
      </div>

      <div className="p-4 space-y-4">
        {/* Full Version Tab */}
        {activeTab === "full" && (
          <>
            <div className="rounded-md border border-border bg-muted p-3 max-h-[300px] overflow-auto">
              <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed text-foreground">
                {improvedPrompt}
              </pre>
            </div>
            <div className="flex items-center justify-between gap-2">
              <Button variant="outline" size="sm" onClick={handleCopy}>
                {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? "Copied" : "Copy"}
              </Button>
              {!showSave ? (
                <Button size="sm" onClick={() => setShowSave(true)}>
                  <Save className="h-3.5 w-3.5" />
                  Save to Store
                </Button>
              ) : (
                <div className="flex items-center gap-2">
                  <Select value={saveStatus} onValueChange={setSaveStatus}>
                    <SelectTrigger className="h-8 w-[120px] font-mono text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border">
                      <SelectItem value="draft">
                        <Badge variant="draft" size="sm">Draft</Badge>
                      </SelectItem>
                      <SelectItem value="testing">
                        <Badge variant="testing" size="sm">Testing</Badge>
                      </SelectItem>
                      <SelectItem value="production">
                        <Badge variant="production" size="sm">Production</Badge>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <Button size="sm" onClick={handleSave}>
                    <Save className="h-3.5 w-3.5" />
                    Save
                  </Button>
                </div>
              )}
            </div>
          </>
        )}

        {/* Anatomy Fields Tab */}
        {activeTab === "anatomy" && (
          <>
            <div className="space-y-2 max-h-[300px] overflow-auto">
              {anatomyFields.map((f) => (
                <AnatomyFieldCard
                  key={f.field}
                  field={f.field}
                  variant="expanded"
                  content={f.content}
                  tokenCount={f.tokenCount}
                />
              ))}
            </div>
            <div className="flex items-center justify-between gap-2">
              <Button variant="outline" size="sm" onClick={onReEvaluate}>
                <RefreshCw className="h-3.5 w-3.5" />
                Re-evaluate
              </Button>
              <Button size="sm" onClick={() => onSaveToStore?.("draft")}>
                <Save className="h-3.5 w-3.5" />
                Save to Store
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
