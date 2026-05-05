import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Lightbulb } from "lucide-react";
import { useState } from "react";

export interface CLEARDimension {
  key: "C" | "L" | "E" | "A" | "R";
  label: string;
  description: string;
  score: number;
}

export interface CLEARSuggestion {
  id: string;
  text: string;
  dimension: string;
}

export interface CLEARScorePanelProps {
  overallScore: number;
  dimensions: CLEARDimension[];
  strengths: string[];
  improvements: string[];
  suggestions: CLEARSuggestion[];
  onApplySuggestion?: (id: string) => void;
  className?: string;
}

const scoreColor = (score: number) =>
  score >= 80 ? "text-success" : score >= 50 ? "text-warning" : "text-error";

/**
 * CLEARScorePanel — Displays CLEAR framework evaluation results with
 * overall score, dimension breakdown, strengths/improvements, and suggestions.
 */
export function CLEARScorePanel({
  overallScore,
  dimensions,
  strengths,
  improvements,
  suggestions,
  onApplySuggestion,
  className,
}: CLEARScorePanelProps) {
  const [open, setOpen] = useState(true);

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <div className={cn("rounded-md border border-border bg-card", className)}>
        {/* Header */}
        <CollapsibleTrigger className="w-full">
          <div className="flex items-center justify-between px-3 py-2 border-b border-border">
            <div className="flex items-center gap-2">
              <span className="font-display text-sm font-medium text-foreground">CLEAR Score</span>
              <span className={cn("font-mono text-sm font-bold", scoreColor(overallScore))}>
                {overallScore}/100
              </span>
            </div>
            <ChevronDown className={cn("h-3.5 w-3.5 text-muted-foreground transition-transform", open && "rotate-180")} />
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="p-4 space-y-5">
            {/* Overall Score — large */}
            <div className="text-center py-2">
              <span className={cn("font-mono text-4xl font-bold", scoreColor(overallScore))}>
                {overallScore}
              </span>
              <span className="font-mono text-lg text-muted-foreground">/100</span>
              <p className="font-body text-xs text-muted-foreground mt-1">Overall CLEAR Score</p>
            </div>

            {/* Dimension Breakdown */}
            <div className="space-y-3">
              <span className="font-mono text-2xs uppercase tracking-widest text-muted-foreground">Dimensions</span>
              {dimensions.map((dim) => (
                <div key={dim.key} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-accent">{dim.key}</span>
                      <span className="font-body text-sm text-foreground">{dim.label}</span>
                    </div>
                    <span className={cn("font-mono text-xs font-medium", scoreColor(dim.score))}>
                      {dim.score}
                    </span>
                  </div>
                  <Progress value={dim.score} className="h-1.5" />
                  <p className="font-body text-2xs text-muted-foreground">{dim.description}</p>
                </div>
              ))}
            </div>

            {/* Insights — coming soon */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="font-mono text-2xs uppercase tracking-widest text-muted-foreground">Insights</span>
                <Badge variant="secondary" size="sm"><span className="font-mono">soon</span></Badge>
              </div>
              <div className="rounded-md border border-border bg-muted/50 px-4 py-8 text-center">
                <Lightbulb className="mx-auto h-5 w-5 text-muted-foreground mb-2" />
                <p className="font-body text-sm text-muted-foreground">
                  Strengths, improvements, and actionable suggestions will appear here.
                </p>
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
}
