"use client";

import { ArrowUp, Command } from "lucide-react";
import { GithubIcon, LinkedinIcon, TelegramIcon } from "@/components/ui/brand-icons";
import { site } from "@/data/site";
import { useUI } from "@/components/providers/ui-provider";
import { cn } from "@/lib/utils";

const socials = [
  { label: "GitHub", href: site.socials.github, icon: GithubIcon },
  { label: "LinkedIn", href: site.socials.linkedin, icon: LinkedinIcon },
  { label: "Telegram", href: site.socials.telegram, icon: TelegramIcon },
];

export function SiteFooter() {
  const { setCommandOpen } = useUI();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-surface font-mono text-xs font-semibold text-accent">
            {site.initials}
          </span>
          <div>
            <p className="text-sm font-medium">{site.name}</p>
            <p className="font-mono text-[11px] text-fg-subtle">
              &copy; {year} &middot; Built with Next.js &amp; Tailwind CSS
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {socials.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-lg border border-border",
                "bg-bg-elevated text-fg-subtle transition-colors hover:border-accent hover:text-accent",
              )}
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}

          <button
            type="button"
            onClick={() => setCommandOpen(true)}
            aria-label="Open command palette"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-bg-elevated text-fg-subtle transition-colors hover:border-accent hover:text-accent"
          >
            <Command className="h-4 w-4" />
          </button>

          <a
            href="#top"
            aria-label="Back to top"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-bg-elevated text-fg-subtle transition-colors hover:border-accent hover:text-accent"
          >
            <ArrowUp className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
