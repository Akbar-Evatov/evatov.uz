import { Brain, MessageSquare, Package, Sigma, Terminal, Trophy } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { journeyPillars, strengths } from "@/data/journey";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

const icons: Record<string, LucideIcon> = {
  Sigma,
  Trophy,
  Terminal,
  Brain,
  MessageSquare,
  Package,
};

export function Journey() {
  return (
    <section id="journey" className="scroll-mt-24 px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="03"
          eyebrow="Background"
          title="Three tracks, one way of working"
          description="I did not arrive at engineering through a single door. The mathematics, the competition deadlines and the code each taught something the others could not — and the combination is the actual offer."
        />

        <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {journeyPillars.map((pillar, i) => {
            const Icon = icons[pillar.icon] ?? Sigma;
            return (
              <Reveal
                as="li"
                key={pillar.id}
                delay={i * 0.07}
                className="hairline group relative flex flex-col rounded-xl border border-border bg-surface/70 p-6 backdrop-blur transition-colors duration-300 hover:border-border-strong"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-bg-elevated transition-colors group-hover:border-accent/40">
                    <Icon className="h-4.5 w-4.5 text-accent" strokeWidth={1.75} />
                  </span>
                  <span className="rounded-full border border-border bg-bg-elevated px-2.5 py-1 font-mono text-[10px] tracking-widest text-fg-subtle uppercase">
                    {pillar.kicker}
                  </span>
                </div>

                <p className="mt-5 font-mono text-[11px] tracking-wide text-fg-subtle">
                  {pillar.period}
                </p>
                <h3 className="mt-1.5 text-lg font-semibold tracking-tight text-balance">
                  {pillar.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-fg-muted text-pretty">
                  {pillar.body}
                </p>

                <ul className="mt-5 space-y-2 border-t border-border pt-4">
                  {pillar.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex items-center gap-2.5 font-mono text-[11px] text-fg-subtle"
                    >
                      <span
                        aria-hidden
                        className="h-1 w-1 shrink-0 rounded-full bg-accent"
                      />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </Reveal>
            );
          })}
        </ul>

        {/* -------------------------------------------- what it adds up to */}
        <Reveal delay={0.05} className="mt-16">
          <div className="flex items-center gap-3 font-mono text-xs tracking-widest text-fg-subtle uppercase">
            <span aria-hidden className="h-px w-8 bg-border-strong" />
            What it adds up to
          </div>
        </Reveal>

        <ul className="mt-6 grid gap-5 md:grid-cols-3">
          {strengths.map((strength, i) => {
            const Icon = icons[strength.icon] ?? Brain;
            return (
              <Reveal as="li" key={strength.title} delay={i * 0.07}>
                <div className="flex h-full flex-col rounded-xl border border-dashed border-border-strong/70 bg-bg-elevated/40 p-5">
                  <Icon className="h-5 w-5 text-violet" strokeWidth={1.75} />
                  <h4 className="mt-4 text-base font-semibold tracking-tight">
                    {strength.title}
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-fg-muted text-pretty">
                    {strength.detail}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
