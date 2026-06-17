import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface WizardStep {
  id: string;
  title: string;
  description: string;
  completed?: boolean;
  /** If true, this step auto-advances (no manual next) */
  autoAdvance?: boolean;
}

interface OnboardingWizardProps {
  steps: WizardStep[];
  currentStep: number;
  onStepClick?: (index: number) => void;
  onNext?: () => void;
  onSkip?: () => void;
  onBack?: () => void;
  children?: React.ReactNode;
  className?: string;
  /** Hide footer actions (for auto-advance or result steps) */
  hideActions?: boolean;
  /** Hide progress header */
  hideHeader?: boolean;
}

/**
 * OnboardingWizard — Step-by-step onboarding flow with progress indicator,
 * step content slot, and navigation actions. Supports broader widths.
 */
export function OnboardingWizard({
  steps,
  currentStep,
  onStepClick,
  onNext,
  onSkip,
  onBack,
  children,
  className,
  hideActions = false,
  hideHeader = false,
}: OnboardingWizardProps) {
  const isLastStep = currentStep === steps.length - 1;
  const isFirstStep = currentStep === 0;

  return (
    <div className={cn("rounded-md border border-border bg-card", className)}>
      {/* Header */}
      {!hideHeader && (
        <div className="flex items-center justify-between border-b border-border px-5 py-3">
          <span className="font-display text-sm font-medium text-foreground">Getting Started</span>
          <span className="font-mono text-2xs text-muted-foreground">
            Step {currentStep + 1} of {steps.length}
          </span>
        </div>
      )}

      {/* Progress steps */}
      <div className="border-b border-border px-5 py-3">
        <div className="flex items-center gap-2">
          {steps.map((step, i) => (
            <div key={step.id} className="flex items-center gap-2">
              {i > 0 && (
                <div className={cn(
                  "h-px w-4 sm:w-6 transition-colors",
                  i <= currentStep ? "bg-accent" : "bg-border",
                )} />
              )}
              <button
                type="button"
                onClick={() => onStepClick?.(i)}
                className={cn(
                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-mono text-xs font-medium transition-all duration-150",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  step.completed
                    ? "bg-success text-success-foreground"
                    : i === currentStep
                    ? "bg-accent text-accent-foreground"
                    : "bg-muted text-muted-foreground",
                )}
              >
                {step.completed ? <Check className="h-3.5 w-3.5" /> : i + 1}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Current step info */}
      <div className="px-5 py-5">
        <h3 className="font-display text-md font-medium text-foreground">
          {steps[currentStep]?.title}
        </h3>
        <p className="mt-1 font-body text-sm text-muted-foreground">
          {steps[currentStep]?.description}
        </p>

        {/* Content slot */}
        {children && <div className="mt-4">{children}</div>}
      </div>

      {/* Actions */}
      {!hideActions && (
        <div className="flex items-center justify-between border-t border-border px-5 py-3">
          <div>
            {!isFirstStep && (
              <Button variant="ghost" size="sm" onClick={onBack}>
                Back
              </Button>
            )}
            {isFirstStep && (
              <Button variant="ghost" size="sm" onClick={onSkip}>
                Skip
              </Button>
            )}
          </div>
          <Button size="sm" onClick={onNext}>
            {isLastStep ? "Finish" : "Continue"}
          </Button>
        </div>
      )}
    </div>
  );
}

export type { WizardStep, OnboardingWizardProps };
