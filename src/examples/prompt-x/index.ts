// Prompt-x example components.
//
// These are NOT part of the public democrito design system surface.
// They are full-featured implementations of prompt-engineering UI built
// on the public democrito atoms / molecules / templates, kept here for
// reference and reuse by projects building on the prompt-x stack.

export { AIGenerationPanel } from "./AIGenerationPanel";
export { AnatomyFieldCard } from "./AnatomyFieldCard";
export { CLEARScorePanel } from "./CLEARScorePanel";
export { CompiledPreview } from "./CompiledPreview";
export { CreatePromptDialog } from "./CreatePromptDialog";
export type { CreatePromptFormData } from "./CreatePromptDialog";
export { EvalConfirmModal } from "./EvalConfirmModal";
export { EvaluationResults } from "./EvaluationResults";
export { EvaluationResultsView } from "./EvaluationResultsView";
export { GlobalVariableManager } from "./GlobalVariableManager";
export { ImprovedPromptPanel } from "./ImprovedPromptPanel";
export { PlaygroundPanel } from "./PlaygroundPanel";
export { PresetCard } from "./PresetCard";
export type { PresetCardData } from "./PresetCard";
export { PresetDetailPanel } from "./PresetDetailPanel";
export { PromptCard } from "./PromptCard";
export { PromptConfigFields, defaultPromptConfig } from "./PromptConfigFields";
export type { PromptConfigState } from "./PromptConfigFields";
export { PromptEditorPanel } from "./PromptEditorPanel";
export { StatusLifecycleBar } from "./StatusLifecycleBar";
export { TemplatePicker } from "./TemplatePicker";
export { TestDatasetManager } from "./TestDatasetManager";
export { TestRunnerModal } from "./TestRunnerModal";
export { VariableManager } from "./VariableManager";
export { VersionComparison } from "./VersionComparison";
export { VersionTimeline } from "./VersionTimeline";

// Molecules that ship as prompt-x examples (not in the public molecules barrel).
export { TestCaseRow } from "./TestCaseRow";
export { ScoreBreakdown } from "./ScoreBreakdown";
