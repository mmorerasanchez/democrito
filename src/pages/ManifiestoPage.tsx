import { PageMeta } from "@/components/PageMeta";
import { Separator } from "@/components/ui/separator";

const L = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-foreground underline decoration-border underline-offset-2 transition-colors hover:text-accent hover:decoration-accent"
  >
    {children}
  </a>
);

export default function ManifiestoPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-14 py-4">
      <PageMeta
        title="Manifesto"
        description="You can only be as good as your taste — why design systems still matter in the age of generation."
        path="/manifesto"
      />

      {/* Header */}
      <div className="space-y-4">
        <p className="font-mono text-2xs uppercase tracking-widest text-muted-foreground">
          Manifiesto
        </p>
        <h1 className="font-display text-3xl font-bold tracking-tight">
          You can only be as good as your taste.
        </h1>
        <p className="font-body text-base leading-relaxed text-muted-foreground">
          Every few months, a new headline declares something dead. Design has had its share.
          The line travels every feed — half provocation, half prophecy, full misreading.
          A borrowed, misunderstood thought, applied to a discipline that is, in every
          measurable sense, accelerating.
        </p>
      </div>

      <Separator />

      {/* The Evidence */}
      <div className="space-y-4">
        <p className="font-mono text-2xs uppercase tracking-widest text-accent">
          The Evidence
        </p>
        <div className="space-y-4">
          <p className="font-body text-base leading-relaxed text-foreground">
            <L href="https://www.mckinsey.com/capabilities/mckinsey-design/our-insights/the-business-value-of-design">
              McKinsey tracked 300+ public companies
            </L>{" "}
            across five years and 2 million financial data points. Companies in the top
            quartile of design maturity outperformed peers by 32 points in revenue growth
            and 56 points in shareholder returns.
          </p>
          <p className="font-body text-base leading-relaxed text-foreground">
            The{" "}
            <L href="https://www.dmi.org/page/DesignValue">
              Design Management Institute's Design Value Index
            </L>{" "}
            shows design-driven companies outperforming the S&P 500 by more than 200%
            over rolling ten-year windows.
          </p>
          <p className="font-body text-base leading-relaxed text-foreground">
            The same pattern holds in government. The countries ranking highest on digital
            service delivery — Denmark, Estonia, Singapore — invested in open, documented
            design systems:{" "}
            <L href="https://design-system.service.gov.uk/">GOV.UK</L>,{" "}
            <L href="https://www.designsystem.gov.sg/">SGDS</L>,{" "}
            <L href="https://www.krds.go.kr/">KRDS</L>. Estonia delivers 99% of public
            services online and produces unicorns at ten times the European per-capita rate.
            A{" "}
            <L href="https://platformland.github.io/government-design-systems/">
              growing directory of government design systems
            </L>{" "}
            now spans dozens of countries.
          </p>
          <p className="font-body text-base leading-relaxed text-foreground">
            Design maturity is one of the most consistently rewarded competitive advantages
            of the modern era.
          </p>
        </div>
      </div>

      {/* The Last Twelve Months */}
      <div className="space-y-4">
        <p className="font-mono text-2xs uppercase tracking-widest text-accent">
          The Last Twelve Months
        </p>
        <div className="space-y-4">
          <p className="font-body text-base leading-relaxed text-foreground">
            <L href="https://airbnb.design/">Airbnb invented a file format</L> because
            existing formats weren't expressive enough.{" "}
            <L href="https://developer.apple.com/design/">
              Apple rewrote its visual language
            </L>{" "}
            for the first time in twelve years.{" "}
            <L href="https://www.whitehouse.gov/presidential-actions/2025/08/improving-our-nation-through-better-design/">
              The U.S. government created a National Design Studio by executive order
            </L>{" "}
            — the first dedicated federal design body in half a century.{" "}
            <L href="https://blog.google/innovation-and-ai/models-and-research/google-labs/stitch-design-md/">
              DESIGN.md emerged as a portable design brief for AI agents
            </L>.{" "}
            <L href="https://www.anthropic.com/news/claude-design-anthropic-labs">
              Anthropic launched Claude Design
            </L>, a tool whose entire pitch is the preservation of design systems and brand
            consistency. Lovable launched Aesthetics to give designers more expressive tools.
          </p>
          <p className="font-body text-base leading-relaxed text-foreground">
            Figma grew 41%. Adobe 11.5%. Canva 35% — adding 85 million users in a single year.
          </p>
          <p className="font-body text-base leading-relaxed text-foreground">
            These are not the numbers of a discipline in decline.
          </p>
        </div>
      </div>

      <Separator />

      {/* The Gap */}
      <div className="space-y-4">
        <p className="font-mono text-2xs uppercase tracking-widest text-accent">
          The Gap AI Hasn't Closed
        </p>
        <p className="font-body text-base leading-relaxed text-foreground">
          AI raises the floor. A model can generate a UI in thirty seconds, a brand system
          from a URL, a component from a prompt. But Joel Lewenstein, Anthropic's head of
          product design and the person who built Claude Design, confirmed the limit directly
          after launch:
        </p>
        {/* Blockquote */}
        <blockquote className="border-l-2 border-accent pl-5 py-1">
          <p className="font-body text-base leading-relaxed text-foreground">
            "Claude Design doesn't yet address that last mile craft and delight that
            differentiates the best products from the OK ones."
          </p>
          <p className="mt-2 font-mono text-xs text-muted-foreground">
            — Joel Lewenstein, Head of Product Design, Anthropic
          </p>
        </blockquote>
        <p className="font-body text-base leading-relaxed text-foreground">
          The company that built the tool everyone fears most is the one naming the gap.
        </p>
        <p className="font-body text-base leading-relaxed text-foreground">
          The 80% is automated. The 20% — why this surface, not that one; why this typeface
          for data and that one for prose; why one accent, not three — is still brain work.
          That is the craft difference that defines taste.
        </p>
      </div>

      <Separator />

      {/* democrito */}
      <div className="space-y-4">
        <p className="font-mono text-2xs uppercase tracking-widest text-accent">
          democrito
        </p>
        <p className="font-body text-base leading-relaxed text-foreground">
          democrito exists in that 20%.
        </p>
        <p className="font-body text-base leading-relaxed text-foreground">
          Three surfaces. One accent. Three fonts, each with a specific semantic role.
          Every decision deliberate and documented, from the Sanzo Wada earth-tone palette
          to the JetBrains Mono.
        </p>
        <p className="font-body text-base leading-relaxed text-foreground">
          democrito ships DESIGN.md — the layer that carries reasoning, not just tokens —
          along with CLAUDE.md, specific Claude instructions. When Claude, Lovable, or any
          AI agent reads it, it doesn't just know what to render. It knows why.
        </p>
        <p className="font-body text-base leading-relaxed text-foreground">
          That is what separates a design system from a stylesheet. And what separates a
          product with taste from one without.
        </p>
      </div>

      <Separator />

      {/* Closing */}
      <div className="space-y-6">
        <p className="font-body text-base leading-relaxed text-foreground">
          "X is dead" is an old rhetorical move: a modern echo of the German
          post-Reformation philosophical tradition, where Nietzsche's "God is dead"
          announced the collapse of a shared moral frame. Used for design, the phrase
          keeps its theatrical cadence — half provocation, half prophecy — but it loses
          its accuracy. It becomes a kind of hallucination: dramatic in sound, empty
          in diagnosis.
        </p>
        <p className="font-body text-base leading-relaxed text-foreground">
          What is actually happening is the opposite of decline. We are entering the
          greatest creative expansion of our time. Tools are improving, velocity is
          compounding, and the bar is rising alongside competition. In that environment,
          designers are asked to stretch in two directions at once: closer to making
          (closing the gap with engineering by expressing consistent experiences in
          code), and deeper into judgment (choosing the right references, sensing the
          true signal, and shaping it into coherent craft).
        </p>
        <p className="font-body text-base leading-relaxed text-foreground">
          When generation becomes cheap, the advantage moves to what cannot be inferred
          automatically: intention, restraint, and the ability to make the right choices
          under constraint. That is where taste lives — and why design is not dying,
          but concentrating into its most essential work.
        </p>
        <p className="font-display text-xl font-semibold tracking-tight text-foreground">
          You can only be as good as your taste.
        </p>
        <p className="font-mono text-sm text-muted-foreground">
          — Mariano Morera, founder
        </p>
      </div>

    </div>
  );
}
