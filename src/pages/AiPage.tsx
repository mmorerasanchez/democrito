import { TokenReferenceCard } from "@/components/molecules/TokenReferenceCard";
import {
  ComparisonSection,
  EcosystemSection,
  FileArchitectureSection,
  HeroSection,
  QuickStartSection,
} from "@/components/organisms/ai";

/**
 * /ai — documentation page rendered inside ShowcaseLayout.
 * Sibling of Overview, Tokens, Atoms, etc. — uses the showcase
 * page pattern (page header + section blocks).
 */
export default function AiPage() {
  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <h1 className="font-display text-xl font-semibold tracking-tight">
          AI Integration
        </h1>
        <p className="max-w-2xl font-body text-base text-muted-foreground">
          The first open-source design system with structured AI context files.
          Drop three files into your project and every AI assistant produces on-brand output.
        </p>
      </div>

      <HeroSection />
      <FileArchitectureSection />
      <QuickStartSection />
      <ComparisonSection />

      <section className="space-y-4">
        <h2 className="font-display text-lg font-medium tracking-tight">
          Token Quick Reference
        </h2>
        <TokenReferenceCard />
      </section>

      <EcosystemSection />
    </div>
  );
}
