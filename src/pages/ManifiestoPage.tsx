import { Separator } from "@/components/ui/separator";

const sections = [
  {
    label: "The Evidence",
    body: [
      "McKinsey tracked 300+ public companies across five years and 2 million financial data points. Companies in the top quartile of design maturity outperformed peers by 32 points in revenue growth and 56 points in shareholder returns. The Design Management Institute's Design Value Index shows design-driven companies outperforming the S&P 500 by more than 200% over rolling ten-year windows.",
      "The same pattern holds in government. The countries ranking highest on digital service delivery — Denmark, Estonia, Singapore — invested in open, documented design systems: GOV.UK, SGDS, KRDS. Estonia delivers 99% of public services online and produces unicorns at ten times the European per-capita rate.",
      "Design maturity is one of the most consistently rewarded competitive advantages of the modern era.",
    ],
  },
  {
    label: "The Last Twelve Months",
    body: [
      "Airbnb invented a file format because existing formats weren't expressive enough. Apple rewrote its visual language for the first time in twelve years. The U.S. government created a National Design Studio by executive order — the first dedicated federal design body in half a century. DESIGN.md emerged as a portable design brief for AI agents. Anthropic launched Claude Design, a tool whose entire pitch is the preservation of design systems and brand consistency. Lovable launched Aesthetics to give designers more expressive tools.",
      "Figma grew 41%. Adobe 11.5%. Canva 35% — adding 85 million users in a single year.",
      "These are not the numbers of a discipline in decline.",
    ],
  },
];

export default function ManifiestoPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-14 py-4">

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
          The line travels every feed — half provocation, half prophecy. It's a misreading.
          A borrowed philosophical frame applied to a discipline that is, in every measurable
          sense, accelerating.
        </p>
      </div>

      <Separator />

      {/* Evidence + Last Twelve Months */}
      {sections.map((section) => (
        <div key={section.label} className="space-y-4">
          <p className="font-mono text-2xs uppercase tracking-widest text-accent">
            {section.label}
          </p>
          <div className="space-y-4">
            {section.body.map((paragraph, i) => (
              <p key={i} className="font-body text-base leading-relaxed text-foreground">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      ))}

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
          <p className="font-body text-base leading-relaxed text-foreground italic">
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
          Three surfaces, not four. One accent. Three fonts, each with a specific semantic
          role. Every decision deliberate and documented, from the Sanzo Wada earth-tone
          palette to the JetBrains Mono treatment of every data value and user-editable field.
        </p>
        <p className="font-body text-base leading-relaxed text-foreground">
          democrito ships DESIGN.md — the layer that carries reasoning, not just tokens.
          When Claude, Lovable, or any AI agent reads it, it doesn't just know what to render.
          It knows why.
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
          We are entering the greatest creative expansion of our time. The tools are better
          than ever. The velocity is higher than ever. The gap between good and great is
          not closing.
        </p>
        <p className="font-display text-xl font-semibold tracking-tight text-foreground">
          You can only be as good as your taste.
        </p>
        <p className="font-mono text-sm text-muted-foreground">
          — Mariano Morera, founder, democrito
        </p>
      </div>

    </div>
  );
}
