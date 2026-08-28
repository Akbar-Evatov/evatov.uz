"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, Command, Download, Mail, Trophy } from "lucide-react";
import { site } from "@/data/site";
import { useUI } from "@/components/providers/ui-provider";
import { buttonClasses } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const readout: { key: string; value: string }[] = [
  { key: "role", value: "Software Engineer" },
  { key: "focus", value: "Full-stack · applied statistics" },
  { key: "stack", value: "Next.js · TypeScript · Python · PostgreSQL" },
  { key: "study", value: "B.Sc. Software Engineering, class of 2028" },
  { key: "based", value: site.location },
];

const stats: { value: string; label: string }[] = [
  { value: "2nd", label: "National AI Hackathon" },
  { value: "20M", label: "UZS prize awarded" },
  { value: "4+", label: "Shipped projects" },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98] as const },
  },
};

export function Hero() {
  const { setCommandOpen, setResumeOpen } = useUI();
  const reduce = useReducedMotion();

  return (
    <section
      id="top"
      className="relative scroll-mt-24 overflow-x-clip px-4 pt-14 pb-20 sm:px-6 sm:pt-20 lg:px-8 lg:pt-28"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          variants={container}
          initial={reduce ? false : "hidden"}
          animate="show"
          className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16"
        >
          {/* ---------------------------------------------- copy */}
          <div>
            <motion.div data-reveal="" variants={item} className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald/30 bg-emerald/10 px-3 py-1.5 text-xs font-medium text-emerald">
                <span
                  aria-hidden
                  className="animate-pulse-dot h-1.5 w-1.5 rounded-full bg-emerald"
                />
                {site.availability}
              </span>
              <span className="font-mono text-xs tracking-widest text-fg-subtle uppercase">
                {site.name}
              </span>
            </motion.div>

            <motion.h1
              data-reveal=""
              variants={item}
              className="mt-6 text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl"
            >
              <span className="text-gradient">Mathematical rigor,</span>
              <br />
              shipped as full-stack software.
            </motion.h1>

            <motion.p
              data-reveal=""
              variants={item}
              className="mt-6 max-w-xl text-base leading-relaxed text-fg-muted text-pretty sm:text-lg"
            >
              {site.summary}
            </motion.p>

            <motion.div data-reveal="" variants={item} className="mt-8 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setResumeOpen(true)}
                className={buttonClasses({ variant: "primary" })}
              >
                <Download className="h-4 w-4" />
                Download Resume
              </button>
              <a href="#projects" className={buttonClasses({ variant: "secondary" })}>
                <ArrowDown className="h-4 w-4" />
                Explore Projects
              </a>
              <a href="#contact" className={buttonClasses({ variant: "ghost" })}>
                <Mail className="h-4 w-4" />
                Quick Contact
              </a>
            </motion.div>

            <motion.button
              data-reveal=""
              variants={item}
              type="button"
              onClick={() => setCommandOpen(true)}
              className="group mt-7 inline-flex items-center gap-2 font-mono text-xs text-fg-subtle transition-colors hover:text-fg-muted"
            >
              Press
              <kbd className="inline-flex items-center gap-1 rounded border border-border bg-bg-elevated px-1.5 py-1 text-[10px] text-fg-muted transition-colors group-hover:border-accent group-hover:text-accent">
                <Command className="h-2.5 w-2.5" />K
              </kbd>
              to navigate
            </motion.button>
          </div>

          {/* ---------------------------------------------- system readout */}
          <motion.div data-reveal="" variants={item} className="relative">
            <div
              aria-hidden
              className="glow-a pointer-events-none absolute inset-0 -z-10 scale-110 rounded-full blur-3xl"
            />

            <div className="hairline relative overflow-hidden rounded-xl border border-border bg-surface/80 shadow-card backdrop-blur">
              <div
                aria-hidden
                className="animate-scan pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-50"
              />

              <div className="flex items-center gap-2 border-b border-border bg-bg-elevated px-4 py-2.5">
                <span className="flex gap-1.5" aria-hidden>
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-400/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
                </span>
                <span className="ml-1 font-mono text-[11px] text-fg-subtle">
                  profile.json
                </span>
              </div>

              <dl className="divide-y divide-border">
                {readout.map((row) => (
                  <div
                    key={row.key}
                    className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-baseline sm:gap-4"
                  >
                    <dt className="w-16 shrink-0 font-mono text-[11px] tracking-wide text-accent">
                      {row.key}
                    </dt>
                    <dd className="font-mono text-[12.5px] leading-relaxed text-fg-muted">
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="flex items-start gap-3 border-t border-border bg-bg-elevated px-4 py-3.5">
                <Trophy className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                <p className="text-[12.5px] leading-relaxed text-fg-muted">
                  <span className="font-medium text-fg">2nd place, National AI Hackathon</span>{" "}
                  &mdash; Qarshi, Uzbekistan, August 2026.
                </p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className={cn(
                    "rounded-lg border border-border bg-surface/60 px-3 py-3 text-center",
                    "backdrop-blur transition-colors hover:border-border-strong",
                  )}
                >
                  <p className="font-mono text-xl font-semibold text-fg">{stat.value}</p>
                  <p className="mt-1 text-[11px] leading-tight text-fg-subtle text-balance">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
