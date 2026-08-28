"use client";

import { ArrowUpRight, Download, MapPin, Send } from "lucide-react";
import { GithubIcon, LinkedinIcon, TelegramIcon } from "@/components/ui/brand-icons";
import { site } from "@/data/site";
import { useUI } from "@/components/providers/ui-provider";
import { buttonClasses } from "@/components/ui/button";
import { CopyEmailButton } from "@/components/ui/copy-email-button";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

const channels = [
  { label: "GitHub", href: site.socials.github, icon: GithubIcon },
  { label: "LinkedIn", href: site.socials.linkedin, icon: LinkedinIcon },
  { label: "Telegram", href: site.socials.telegram, icon: TelegramIcon },
];

export function Contact() {
  const { setResumeOpen } = useUI();

  return (
    <section id="contact" className="scroll-mt-24 px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="hairline relative overflow-hidden rounded-2xl border border-border bg-surface/70 p-6 backdrop-blur sm:p-10 lg:p-14">
          <div
            aria-hidden
            className="glow-a pointer-events-none absolute -top-32 -right-24 h-80 w-80 rounded-full blur-3xl"
          />

          <div className="relative grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <div>
              <SectionHeading
                index="04"
                eyebrow="Contact"
                title="Currently open to opportunities"
                description="Internships, junior engineering roles, or a problem that needs modelling before it needs a UI. The fastest route is email — I answer everything."
              />
            </div>

            <div className="flex flex-col justify-center gap-4">
              <Reveal>
                <p className="font-mono text-[10px] tracking-[0.14em] text-fg-subtle uppercase">
                  Email &mdash; click to copy
                </p>
                <CopyEmailButton className="mt-2 w-full" />
              </Reveal>

              <Reveal delay={0.06} className="flex flex-wrap gap-2">
                <a
                  href={`mailto:${site.email}`}
                  className={buttonClasses({ variant: "primary" })}
                >
                  <Send className="h-4 w-4" />
                  Send an email
                </a>
                <button
                  type="button"
                  onClick={() => setResumeOpen(true)}
                  className={buttonClasses({ variant: "secondary" })}
                >
                  <Download className="h-4 w-4" />
                  Resume
                </button>
              </Reveal>

              <Reveal delay={0.12}>
                <ul className="mt-2 grid gap-2 sm:grid-cols-3">
                  {channels.map(({ label, href, icon: Icon }) => (
                    <li key={label}>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-2 rounded-lg border border-border bg-bg-elevated px-3 py-2.5 text-sm text-fg-muted transition-colors hover:border-accent hover:text-fg"
                      >
                        <Icon className="h-4 w-4 shrink-0" />
                        {label}
                        <ArrowUpRight className="ml-auto h-3.5 w-3.5 text-fg-subtle transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </a>
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={0.18}>
                <p className="flex items-center gap-2 font-mono text-[11px] text-fg-subtle">
                  <MapPin className="h-3.5 w-3.5" />
                  {site.location}
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
