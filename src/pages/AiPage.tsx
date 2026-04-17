import { Heading, Logo } from "@/components/atoms";
import { TokenReferenceCard } from "@/components/molecules/TokenReferenceCard";
import {
  ComparisonSection,
  EcosystemSection,
  FileArchitectureSection,
  HeroSection,
  QuickStartSection,
} from "@/components/organisms/ai";
import { ThemeToggle } from "@/components/ThemeToggle";

/**
 * /ai — full-width marketing/education page. No sidebar, no breadcrumbs.
 * Header is inlined here rather than via ShowcaseLayout to honour the spec's
 * "no sidebar, no navigation beyond the global header" constraint.
 */
export default function AiPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-sticky flex h-header items-center justify-between border-b border-border bg-surface px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <Logo size={24} />
          <h1 className="font-mono text-lg font-semibold tracking-tight lowercase">
            democrito
          </h1>
          <span className="font-mono text-2xs text-muted-foreground">/ai</span>
        </div>
        <ThemeToggle />
      </header>

      <main className="flex-1 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-4xl flex-col gap-16 pb-20">
          <HeroSection />
          <FileArchitectureSection />
          <QuickStartSection />
          <ComparisonSection />
          <section className="flex flex-col gap-6">
            <Heading level="h2" className="text-2xl font-semibold">
              Token Quick Reference
            </Heading>
            <TokenReferenceCard />
          </section>
          <EcosystemSection />
        </div>
      </main>
    </div>
  );
}
