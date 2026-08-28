"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Command } from "cmdk";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Check,
  Copy,
  CornerDownLeft,
  Download,
  ExternalLink,
  FileText,

  Home,

  Moon,
  Search,
  Sun,
  Terminal,
} from "lucide-react";
import { useTheme } from "next-themes";
import { GithubIcon, LinkedinIcon, TelegramIcon } from "@/components/ui/brand-icons";
import { useCallback, useEffect } from "react";
import { navLinks, site } from "@/data/site";
import { projects } from "@/data/projects";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { useUI } from "@/components/providers/ui-provider";
import { cn } from "@/lib/utils";

const itemClass = cn(
  "group flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-fg-muted",
  "transition-colors select-none",
  "data-[selected=true]:bg-surface-hover data-[selected=true]:text-fg",
);

const groupClass = cn(
  "px-1 py-1",
  "[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:pt-3 [&_[cmdk-group-heading]]:pb-1.5",
  "[&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[10px]",
  "[&_[cmdk-group-heading]]:tracking-[0.14em] [&_[cmdk-group-heading]]:uppercase",
  "[&_[cmdk-group-heading]]:text-fg-subtle",
);

function Shortcut({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="ml-auto rounded border border-border bg-bg-elevated px-1.5 py-0.5 font-mono text-[10px] text-fg-subtle">
      {children}
    </kbd>
  );
}

export function CommandPalette() {
  const { commandOpen, setCommandOpen, toggleCommand, setResumeOpen, setTerminalOpen } =
    useUI();
  const { resolvedTheme, setTheme } = useTheme();
  const { copied, copy } = useCopyToClipboard();
  const reduce = useReducedMotion();
  const isDark = resolvedTheme === "dark";

  // Global Cmd+K / Ctrl+K.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggleCommand();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [toggleCommand]);

  const run = useCallback(
    (action: () => void) => {
      setCommandOpen(false);
      // Let the dialog finish closing before moving focus or scrolling.
      window.setTimeout(action, 90);
    },
    [setCommandOpen],
  );

  const goTo = useCallback(
    (id: string) => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      else window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    },
    [reduce],
  );

  const openExternal = useCallback((url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  }, []);

  const downloadResume = useCallback(() => {
    const a = document.createElement("a");
    a.href = site.resumePath;
    a.download = site.resumeFileName;
    document.body.appendChild(a);
    a.click();
    a.remove();
  }, []);

  return (
    <Dialog.Root open={commandOpen} onOpenChange={setCommandOpen}>
      <AnimatePresence>
        {commandOpen ? (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="fixed inset-0 z-50 bg-slate-950/55 backdrop-blur-sm"
              />
            </Dialog.Overlay>

            <Dialog.Content asChild forceMount aria-describedby={undefined}>
              <motion.div
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.985 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.985 }}
                transition={{ duration: 0.19, ease: [0.21, 0.47, 0.32, 0.98] }}
                className={cn(
                  "fixed top-[12vh] left-1/2 z-50 w-[min(94vw,40rem)] -translate-x-1/2",
                  "overflow-hidden rounded-xl border border-border bg-surface shadow-2xl",
                )}
              >
                <Dialog.Title className="sr-only">Command palette</Dialog.Title>

                <Command
                  loop
                  className="[&_[cmdk-list]]:max-h-[min(24rem,52vh)] [&_[cmdk-list]]:overflow-y-auto [&_[cmdk-list]]:overscroll-contain"
                >
                  <div className="flex items-center gap-3 border-b border-border px-4">
                    <Search className="h-4 w-4 shrink-0 text-fg-subtle" />
                    <Command.Input
                      autoFocus
                      placeholder="Jump to a section, open a project, copy an email..."
                      className="w-full bg-transparent py-4 text-sm text-fg outline-none placeholder:text-fg-subtle"
                    />
                    <kbd className="hidden shrink-0 rounded border border-border bg-bg-elevated px-1.5 py-0.5 font-mono text-[10px] text-fg-subtle sm:block">
                      ESC
                    </kbd>
                  </div>

                  <Command.List className="p-2">
                    <Command.Empty className="px-3 py-10 text-center text-sm text-fg-subtle">
                      No matches. Try &ldquo;resume&rdquo; or &ldquo;projects&rdquo;.
                    </Command.Empty>

                    <Command.Group heading="Navigate" className={groupClass}>
                      <Command.Item
                        className={itemClass}
                        value="home top hero start"
                        onSelect={() => run(() => goTo("top"))}
                      >
                        <Home className="h-4 w-4 text-fg-subtle group-data-[selected=true]:text-accent" />
                        Home
                        <Shortcut>
                          <CornerDownLeft className="h-2.5 w-2.5" />
                        </Shortcut>
                      </Command.Item>
                      {navLinks.map((link) => (
                        <Command.Item
                          key={link.id}
                          className={itemClass}
                          value={`go to ${link.label}`}
                          onSelect={() => run(() => goTo(link.id))}
                        >
                          <ArrowUpRight className="h-4 w-4 text-fg-subtle group-data-[selected=true]:text-accent" />
                          {link.label}
                        </Command.Item>
                      ))}
                    </Command.Group>

                    <Command.Group heading="Projects" className={groupClass}>
                      {projects.map((project) => {
                        const href = project.links.demo ?? project.links.repo;
                        return (
                          <Command.Item
                            key={project.slug}
                            className={itemClass}
                            value={`project ${project.title} ${project.tech.join(" ")}`}
                            onSelect={() =>
                              run(() => (href ? openExternal(href) : goTo("projects")))
                            }
                          >
                            <ExternalLink className="h-4 w-4 text-fg-subtle group-data-[selected=true]:text-accent" />
                            <span className="truncate">{project.title}</span>
                            <span className="ml-auto hidden truncate font-mono text-[10px] text-fg-subtle sm:block">
                              {project.tech[0]}
                            </span>
                          </Command.Item>
                        );
                      })}
                    </Command.Group>

                    <Command.Group heading="Actions" className={groupClass}>
                      <Command.Item
                        className={itemClass}
                        value="view resume cv preview pdf"
                        onSelect={() => run(() => setResumeOpen(true))}
                      >
                        <FileText className="h-4 w-4 text-fg-subtle group-data-[selected=true]:text-accent" />
                        Preview resume
                      </Command.Item>
                      <Command.Item
                        className={itemClass}
                        value="download resume cv pdf"
                        onSelect={() => run(downloadResume)}
                      >
                        <Download className="h-4 w-4 text-fg-subtle group-data-[selected=true]:text-accent" />
                        Download resume (PDF)
                      </Command.Item>
                      <Command.Item
                        className={itemClass}
                        value="copy email address contact"
                        onSelect={() => copy(site.email)}
                      >
                        {copied ? (
                          <Check className="h-4 w-4 text-emerald" />
                        ) : (
                          <Copy className="h-4 w-4 text-fg-subtle group-data-[selected=true]:text-accent" />
                        )}
                        {copied ? "Copied to clipboard" : "Copy email address"}
                        <span className="ml-auto hidden font-mono text-[10px] text-fg-subtle sm:block">
                          {site.email}
                        </span>
                      </Command.Item>
                      <Command.Item
                        className={itemClass}
                        value="open terminal console playground"
                        onSelect={() => run(() => setTerminalOpen(true))}
                      >
                        <Terminal className="h-4 w-4 text-fg-subtle group-data-[selected=true]:text-accent" />
                        Open the mini terminal
                      </Command.Item>
                      <Command.Item
                        className={itemClass}
                        value="toggle theme dark light mode appearance"
                        onSelect={() => setTheme(isDark ? "light" : "dark")}
                      >
                        {isDark ? (
                          <Sun className="h-4 w-4 text-fg-subtle group-data-[selected=true]:text-accent" />
                        ) : (
                          <Moon className="h-4 w-4 text-fg-subtle group-data-[selected=true]:text-accent" />
                        )}
                        Switch to {isDark ? "light" : "dark"} theme
                      </Command.Item>
                    </Command.Group>

                    <Command.Group heading="Elsewhere" className={groupClass}>
                      <Command.Item
                        className={itemClass}
                        value="github code repositories"
                        onSelect={() => run(() => openExternal(site.socials.github))}
                      >
                        <GithubIcon className="h-4 w-4 text-fg-subtle group-data-[selected=true]:text-accent" />
                        GitHub
                      </Command.Item>
                      <Command.Item
                        className={itemClass}
                        value="linkedin profile"
                        onSelect={() => run(() => openExternal(site.socials.linkedin))}
                      >
                        <LinkedinIcon className="h-4 w-4 text-fg-subtle group-data-[selected=true]:text-accent" />
                        LinkedIn
                      </Command.Item>
                      <Command.Item
                        className={itemClass}
                        value="telegram message chat"
                        onSelect={() => run(() => openExternal(site.socials.telegram))}
                      >
                        <TelegramIcon className="h-4 w-4 text-fg-subtle group-data-[selected=true]:text-accent" />
                        Telegram
                      </Command.Item>
                    </Command.Group>
                  </Command.List>

                  <div className="flex items-center justify-between border-t border-border bg-bg-elevated px-4 py-2.5 font-mono text-[10px] text-fg-subtle">
                    <span className="flex items-center gap-1.5">
                      <kbd className="rounded border border-border px-1 py-0.5">&uarr;</kbd>
                      <kbd className="rounded border border-border px-1 py-0.5">&darr;</kbd>
                      to navigate
                    </span>
                    <span className="flex items-center gap-1.5">
                      <kbd className="rounded border border-border px-1 py-0.5">&crarr;</kbd>
                      to select
                    </span>
                  </div>
                </Command>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        ) : null}
      </AnimatePresence>
    </Dialog.Root>
  );
}
