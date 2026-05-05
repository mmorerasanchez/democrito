import { Heading, Text } from "@/components/atoms";
import { StatCard } from "@/components/molecules/StatCard";
import { CLEARScorePanel } from "./CLEARScorePanel";
import { ImprovedPromptPanel } from "./ImprovedPromptPanel";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import type { CLEARDimension, CLEARSuggestion } from "./CLEARScorePanel";
import type { AnatomyField } from "./AnatomyFieldCard";

// --- Mock data (same as before, centralized) ---
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

const mockImprovedPrompt = `You are an expert onboarding assistant for SaaS products. Your role is to guide new users through their initial setup experience with clarity and encouragement.

## Tone
Friendly, professional, and encouraging. Avoid technical jargon. Use simple language that makes users feel confident.

## Task
Guide the user through the initial setup:
1. Connecting their workspace
2. Inviting team members
3. Creating their first project

Prioritize the most impactful actions first. If the user seems confused, offer alternative explanations.

## Output Format
Respond in markdown with clear step headings. Include progress indicators like (1/3), (2/3), (3/3). Keep responses under 200 words.

## Constraints
- Never mention competitors
- Don't skip steps
- If the user asks about unsupported features, acknowledge and redirect
- Handle adversarial inputs with a polite refusal`;

const mockAnatomyFields: { field: AnatomyField; content: string; tokenCount: number }[] = [
  { field: "role", content: "You are an expert onboarding assistant for SaaS products. Your role is to guide new users through their initial setup experience with clarity and encouragement.", tokenCount: 52 },
  { field: "tone", content: "Friendly, professional, and encouraging. Avoid technical jargon. Use simple language that makes users feel confident.", tokenCount: 34 },
  { field: "context", content: "The user just signed up for {{product_name}} and is seeing the app for the first time. Their plan is {{plan_type}}.", tokenCount: 89 },
  { field: "task", content: "Guide the user through the initial setup: connecting their workspace, inviting team members, and creating their first project. Prioritize the most impactful actions first.", tokenCount: 124 },
  { field: "reasoning", content: "Think step-by-step. If the user seems confused, offer alternative explanations.", tokenCount: 42 },
  { field: "examples", content: 'User: "I just signed up, what do I do first?"\nAssistant: "Welcome! Let\'s get you set up in 3 quick steps…"', tokenCount: 78 },
  { field: "output", content: "Respond in markdown with clear step headings. Include progress indicators like (1/3), (2/3), (3/3). Keep responses under 200 words.", tokenCount: 56 },
  { field: "constraints", content: "Never mention competitors. Don't skip steps. Handle adversarial inputs with a polite refusal.", tokenCount: 44 },
  { field: "tools", content: "You can access: user_profile(), workspace_settings(), send_invite(email).", tokenCount: 47 },
];

export interface EvaluationResultsViewProps {
  onBack: () => void;
  onReEvaluate: () => void;
}

/**
 * EvaluationResultsView — Full-page evaluation results with CLEAR score,
 * KPIs, and improved prompt panel with edit/save capabilities.
 */
export function EvaluationResultsView({ onBack, onReEvaluate }: EvaluationResultsViewProps) {
  return (
    <div className="space-y-6">
      {/* Back button + header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Evaluator
        </Button>
      </div>

      <div>
        <Heading level="h2">Evaluation Results</Heading>
        <Text variant="muted" className="mt-1">CLEAR framework analysis of your prompt.</Text>
      </div>

      {/* Full-width Improved Prompt Panel — first */}
      <ImprovedPromptPanel
        improvedPrompt={mockImprovedPrompt}
        anatomyFields={mockAnatomyFields}
        onReEvaluate={onReEvaluate}
      />

      {/* KPI Row */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Tokens" value="1,247" trend={{ direction: "neutral", value: "total" }} />
        <StatCard label="Latency" value="1.84s" trend={{ direction: "down", value: "fast" }} />
        <StatCard label="Est. Cost" value="$0.003" trend={{ direction: "neutral", value: "per run" }} />
        <StatCard label="CLEAR Score" value="81" trend={{ direction: "up", value: "/100" }} />
      </div>

      {/* Full-width CLEAR Score Panel */}
      <CLEARScorePanel
        overallScore={81}
        dimensions={mockDimensions}
        strengths={mockStrengths}
        improvements={mockImprovements}
        suggestions={mockSuggestions}
      />
    </div>
  );
}
