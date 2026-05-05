import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface ScoreCriterion {
  label: string;
  weight: number;
  score: number;
  explanation: string;
}

const DEFAULT_CRITERIA: ScoreCriterion[] = [
  { label: "Clarity", weight: 25, score: 92, explanation: "Instructions are unambiguous and easy to follow for the target model." },
  { label: "Specificity", weight: 25, score: 88, explanation: "Prompt includes concrete details, avoiding vague or open-ended phrasing." },
  { label: "Structure", weight: 20, score: 95, explanation: "Logical flow with clear sections; anatomy fields are well-organized." },
  { label: "Completeness", weight: 15, score: 85, explanation: "All necessary context, constraints, and output format are defined." },
  { label: "Efficiency", weight: 15, score: 90, explanation: "Token usage is optimized — no redundancy or unnecessary verbosity." },
];

interface ScoreBreakdownProps {
  score?: number;
  criteria?: ScoreCriterion[];
  className?: string;
}

/**
 * ScoreBreakdown — Score badge that opens a centered modal with weighted rubric methodology.
 */
export function ScoreBreakdown({
  score = 90,
  criteria = DEFAULT_CRITERIA,
  className,
}: ScoreBreakdownProps) {
  const [open, setOpen] = useState(false);

  const getScoreColor = (s: number) => {
    if (s >= 90) return "text-success";
    if (s >= 75) return "text-warning";
    return "text-error";
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-2.5 py-1.5 font-mono text-sm transition-colors hover:bg-muted",
          className,
        )}
      >
        <span className="text-muted-foreground">Score</span>
        <span className={cn("font-semibold", getScoreColor(score))}>{score}</span>
        <span className="text-muted-foreground">/100</span>
        <ChevronDown className="h-3 w-3 text-muted-foreground" />
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg p-0">
          <DialogHeader className="border-b border-border px-5 py-4">
            <DialogTitle className="font-display text-md font-medium">Quality Score Methodology</DialogTitle>
            <DialogDescription className="font-body text-sm text-muted-foreground">
              Weighted evaluation across 5 prompt quality dimensions.
            </DialogDescription>
          </DialogHeader>
          <div className="divide-y divide-border">
            {criteria.map((c) => (
              <div key={c.label} className="px-5 py-3 space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-display text-sm font-medium text-foreground">{c.label}</span>
                    <Badge variant="secondary" size="sm">
                      <span className="font-mono text-2xs">{c.weight}%</span>
                    </Badge>
                  </div>
                  <span className={cn("font-mono text-sm font-semibold", getScoreColor(c.score))}>
                    {c.score}
                  </span>
                </div>
                <p className="font-body text-xs text-muted-foreground leading-relaxed">
                  {c.explanation}
                </p>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between border-t border-border px-5 py-3 bg-surface rounded-b-lg">
            <span className="font-display text-sm font-medium text-foreground">Weighted Total</span>
            <span className={cn("font-mono text-sm font-bold", getScoreColor(score))}>{score}/100</span>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
