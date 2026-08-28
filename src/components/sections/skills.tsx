import { Code, Database, LayoutTemplate, Server, Sigma, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { skillGroups } from "@/data/skills";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { TechBadge } from "@/components/ui/tech-badge";

const icons: Record<string, LucideIcon> = {
  Code,
  LayoutTemplate,
  Server,
  Database,
  Wrench,
  Sigma,
};

export function Skills() {
  return (
    <section id="skills" className="scroll-mt-24 px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="02"
          eyebrow="Capabilities"
          title="Core technical competencies"
          description="What I reach for, grouped the way I actually think about it — including the mathematics, because on the projects that mattered it was the deciding factor."
        />

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, i) => {
            const Icon = icons[group.icon] ?? Code;
            return (
              <Reveal
                as="li"
                key={group.id}
                delay={(i % 3) * 0.06}
                className="hairline group relative flex flex-col rounded-xl border border-border bg-surface/70 p-5 backdrop-blur transition-colors duration-300 hover:border-border-strong"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-bg-elevated transition-colors group-hover:border-accent/40">
                    <Icon className="h-4 w-4 text-accent" strokeWidth={1.75} />
                  </span>
                  <h3 className="text-base font-semibold tracking-tight">
                    {group.title}
                  </h3>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-fg-muted text-pretty">
                  {group.blurb}
                </p>

                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <li key={item}>
                      <TechBadge>{item}</TechBadge>
                    </li>
                  ))}
                </ul>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
