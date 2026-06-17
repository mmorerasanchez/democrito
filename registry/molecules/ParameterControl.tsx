import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";

interface ParameterControlProps {
  label: string;
  value: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  className?: string;
}

/**
 * ParameterControl — Labeled slider + numeric input for model parameters
 * (temperature, top_p, max_tokens, etc.)
 */
export function ParameterControl({
  label,
  value,
  onChange,
  min = 0,
  max = 1,
  step = 0.01,
  unit,
  className,
}: ParameterControlProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between">
        <Label className="font-body text-sm font-medium">{label}</Label>
        <div className="flex items-center gap-1">
          <Input
            type="number"
            value={value}
            onChange={(e) => onChange?.(parseFloat(e.target.value) || 0)}
            min={min}
            max={max}
            step={step}
            className="h-7 w-16 px-2 text-center font-mono text-xs"
          />
          {unit && (
            <span className="font-mono text-2xs text-muted-foreground">{unit}</span>
          )}
        </div>
      </div>
      <Slider
        value={[value]}
        onValueChange={([v]) => onChange?.(v)}
        min={min}
        max={max}
        step={step}
        className="w-full"
      />
    </div>
  );
}
