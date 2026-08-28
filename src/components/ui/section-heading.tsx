import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

type SectionHeadingProps = {
  /** Monospace index label, e.g. "02". */
  index: string;
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  className?: string;
};

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-2xl", className)}>
      <Reveal>
        <div className="flex items-center gap-3 font-mono text-xs tracking-widest text-fg-subtle uppercase">
          <span className="text-accent">{index}</span>
          <span aria-hidden className="h-px w-8 bg-border-strong" />
          <span>{eyebrow}</span>
        </div>
      </Reveal>
      <Reveal delay={0.06}>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          {title}
        </h2>
      </Reveal>
      {description ? (
        <Reveal delay={0.12}>
          <p className="mt-4 text-base leading-relaxed text-fg-muted text-pretty">
            {description}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
