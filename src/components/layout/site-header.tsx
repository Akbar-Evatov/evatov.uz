"use client";

import { motion } from "framer-motion";
import { FileText, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { navLinks, site } from "@/data/site";
import { useActiveSection } from "@/hooks/use-active-section";
import { useUI } from "@/components/providers/ui-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { buttonClasses } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const sectionIds = navLinks.map((l) => l.id);

export function SiteHeader() {
  const { setCommandOpen, setResumeOpen } = useUI();
  const active = useActiveSection(sectionIds);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-30 w-full transition-colors duration-300",
        scrolled
          ? "border-b border-border bg-bg/80 backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <a
          href="#top"
          className="group flex shrink-0 items-center gap-2.5"
          aria-label={`${site.name} — back to top`}
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-surface font-mono text-xs font-semibold text-accent transition-colors group-hover:border-accent">
            {site.initials}
          </span>
          <span className="hidden text-sm font-semibold tracking-tight sm:block">
            {site.name}
          </span>
        </a>

        <nav aria-label="Sections" className="ml-2 hidden md:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = active === link.id;
              return (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "relative rounded-lg px-3 py-2 text-sm transition-colors",
                      isActive ? "text-fg" : "text-fg-muted hover:text-fg",
                    )}
                  >
                    {isActive ? (
                      <motion.span
                        layoutId="nav-active"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        className="absolute inset-0 -z-10 rounded-lg bg-surface-hover"
                      />
                    ) : null}
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            onClick={() => setCommandOpen(true)}
            className={cn(
              "group flex h-9 items-center gap-2 rounded-lg border border-border bg-bg-elevated",
              "px-2.5 text-sm text-fg-subtle transition-colors hover:border-border-strong hover:text-fg-muted",
              "sm:pr-2 sm:pl-3",
            )}
            aria-label="Open command palette"
          >
            <Search className="h-4 w-4" />
            <span className="hidden lg:inline">Search</span>
            <kbd className="ml-1 hidden rounded border border-border bg-surface px-1.5 py-0.5 font-mono text-[10px] sm:block">
              &#8984;K
            </kbd>
          </button>

          <ThemeToggle />

          <button
            type="button"
            onClick={() => setResumeOpen(true)}
            className={buttonClasses({
              variant: "primary",
              size: "sm",
              className: "hidden sm:inline-flex",
            })}
          >
            <FileText className="h-3.5 w-3.5" />
            Resume
          </button>
        </div>
      </div>
    </header>
  );
}
