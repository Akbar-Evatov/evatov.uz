"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown, SquareTerminal, X } from "lucide-react";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { projects } from "@/data/projects";
import { site } from "@/data/site";
import { skillGroups } from "@/data/skills";
import { useUI } from "@/components/providers/ui-provider";
import { cn } from "@/lib/utils";

type Tone = "default" | "muted" | "accent" | "error";
type Line = { id: number; tone: Tone; text: string };

const PROMPT = "visitor@evatov.uz:~$";

const HELP: string[] = [
  "Available commands",
  "",
  "  help        show this list",
  "  bio         who I am, in four lines",
  "  skills      technical competencies by group",
  "  projects    what I have built",
  "  contact     how to reach me",
  "  resume      open the resume preview",
  "  theme       toggle dark / light",
  "  goto <id>   scroll to projects | skills | journey | contact",
  "  clear       wipe the screen",
];

const BIO: string[] = [
  `${site.name} — ${site.role}`,
  `${site.location} · B.Sc. Software Engineering, class of 2028`,
  "",
  "I build full-stack products in Next.js and Python, and I model the",
  "messy problems underneath them. 2nd place nationally at Uzbekistan's",
  "AI Hackathon for a shadow-economy scoring methodology.",
];

let lineId = 0;
const nextId = () => ++lineId;

function toLines(text: string[], tone: Tone = "default"): Line[] {
  return text.map((t) => ({ id: nextId(), tone, text: t }));
}

const toneClass: Record<Tone, string> = {
  default: "text-fg",
  muted: "text-fg-subtle",
  accent: "text-accent",
  error: "text-rose-400",
};

/**
 * Collapsible mini terminal. Deliberately shallow — a handful of commands that
 * mirror the page content, so a non-technical visitor loses nothing by
 * ignoring it entirely.
 */
export function TerminalDrawer() {
  const { terminalOpen, setTerminalOpen, setResumeOpen } = useUI();
  const { resolvedTheme, setTheme } = useTheme();
  const reduce = useReducedMotion();
  const inputId = useId();

  const [lines, setLines] = useState<Line[]>(() =>
    toLines([
      `${site.name} — interactive shell v1.0`,
      "Type `help` to see what this thing knows.",
    ], "muted"),
  );
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Keep the newest output in view.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  useEffect(() => {
    if (terminalOpen) {
      const t = window.setTimeout(() => inputRef.current?.focus(), 240);
      return () => window.clearTimeout(t);
    }
  }, [terminalOpen]);

  const push = useCallback((newLines: Line[]) => {
    setLines((prev) => [...prev, ...newLines]);
  }, []);

  const scrollToSection = useCallback(
    (id: string) => {
      const el = document.getElementById(id);
      if (!el) return false;
      el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      return true;
    },
    [reduce],
  );

  const execute = useCallback(
    (raw: string) => {
      const input = raw.trim();
      push([{ id: nextId(), tone: "accent", text: `${PROMPT} ${input}` }]);
      if (!input) return;

      setHistory((h) => [input, ...h].slice(0, 40));
      setHistoryIndex(-1);

      const [command, ...args] = input.toLowerCase().split(/\s+/);

      switch (command) {
        case "help":
          push(toLines(HELP, "muted"));
          break;

        case "bio":
        case "whoami":
          push(toLines(BIO));
          break;

        case "skills": {
          const out: string[] = [];
          for (const group of skillGroups) {
            out.push(`${group.title.toUpperCase()}`);
            out.push(`  ${group.items.join(", ")}`);
            out.push("");
          }
          push(toLines(out, "muted"));
          break;
        }

        case "projects":
        case "ls": {
          const out = projects.flatMap((p) => [
            `${p.title}  ·  ${p.period}`,
            `  ${p.tagline}`,
            `  ${p.tech.slice(0, 4).join(" / ")}`,
            "",
          ]);
          push(toLines(out, "muted"));
          break;
        }

        case "contact":
          push(
            toLines([
              `email      ${site.email}`,
              `github     ${site.socials.github}`,
              `linkedin   ${site.socials.linkedin}`,
              `telegram   ${site.socials.telegram}`,
              "",
              `status     ${site.availability}`,
            ], "muted"),
          );
          break;

        case "resume":
        case "cv":
          push(toLines(["Opening resume preview..."], "muted"));
          setResumeOpen(true);
          break;

        case "theme": {
          const next = resolvedTheme === "dark" ? "light" : "dark";
          setTheme(next);
          push(toLines([`Theme set to ${next}.`], "muted"));
          break;
        }

        case "goto": {
          const target = args[0];
          if (!target) {
            push(toLines(["usage: goto <projects|skills|journey|contact>"], "error"));
            break;
          }
          if (scrollToSection(target)) {
            push(toLines([`Scrolling to #${target}...`], "muted"));
          } else {
            push(toLines([`No section named "${target}".`], "error"));
          }
          break;
        }

        case "clear":
          setLines([]);
          break;

        case "sudo":
          push(toLines(["Nice try. This shell has no root, only receipts."], "muted"));
          break;

        default:
          push(
            toLines(
              [`command not found: ${command}`, "Type `help` for the list."],
              "error",
            ),
          );
      }
    },
    [push, resolvedTheme, scrollToSection, setResumeOpen, setTheme],
  );

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      execute(value);
      setValue("");
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(historyIndex + 1, history.length - 1);
      if (next >= 0) {
        setHistoryIndex(next);
        setValue(history[next]);
      }
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = historyIndex - 1;
      setHistoryIndex(next);
      setValue(next >= 0 ? history[next] : "");
    }
  };

  return (
    <>
      <AnimatePresence>
        {!terminalOpen ? (
          <motion.button
            key="launcher"
            type="button"
            onClick={() => setTerminalOpen(true)}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "fixed right-4 bottom-4 z-40 flex items-center gap-2 rounded-full",
              "border border-border bg-surface/90 px-4 py-2.5 shadow-lg backdrop-blur",
              "text-sm font-medium text-fg-muted transition-colors",
              "hover:border-accent hover:text-fg sm:right-6 sm:bottom-6",
            )}
            aria-label="Open the interactive terminal"
          >
            <SquareTerminal className="h-4 w-4 text-accent" />
            <span className="hidden sm:inline">Terminal</span>
          </motion.button>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {terminalOpen ? (
          <motion.div
            key="drawer"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.24, ease: [0.21, 0.47, 0.32, 0.98] }}
            className={cn(
              "fixed right-3 bottom-3 left-3 z-40 flex h-[min(26rem,70vh)] flex-col",
              "overflow-hidden rounded-xl border border-border bg-surface/95 shadow-2xl backdrop-blur",
              "sm:right-6 sm:bottom-6 sm:left-auto sm:w-[34rem]",
            )}
          >
            <header className="flex shrink-0 items-center gap-2 border-b border-border bg-bg-elevated px-3 py-2">
              <span className="flex gap-1.5" aria-hidden>
                <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
              </span>
              <p className="ml-1 font-mono text-[11px] text-fg-subtle">
                {PROMPT.replace(":~$", "")} — bash
              </p>
              <div className="ml-auto flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setTerminalOpen(false)}
                  className="rounded-md p-1.5 text-fg-subtle transition-colors hover:bg-surface-hover hover:text-fg"
                  aria-label="Minimise terminal"
                >
                  <ChevronDown className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setTerminalOpen(false)}
                  className="rounded-md p-1.5 text-fg-subtle transition-colors hover:bg-surface-hover hover:text-fg"
                  aria-label="Close terminal"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </header>

            <div
              ref={scrollRef}
              onClick={() => inputRef.current?.focus()}
              className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 py-3 font-mono text-[12.5px] leading-relaxed"
            >
              <div role="log" aria-live="polite" aria-label="Terminal output">
                {lines.map((line) => (
                  <p
                    key={line.id}
                    className={cn("whitespace-pre-wrap break-words", toneClass[line.tone])}
                  >
                    {line.text || " "}
                  </p>
                ))}
              </div>

              <div className="mt-1 flex items-center gap-2">
                <label htmlFor={inputId} className="shrink-0 text-emerald select-none">
                  {PROMPT}
                </label>
                <div className="relative flex-1">
                  <input
                    id={inputId}
                    ref={inputRef}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={onKeyDown}
                    spellCheck={false}
                    autoComplete="off"
                    autoCapitalize="off"
                    autoCorrect="off"
                    aria-label="Terminal input"
                    className="w-full bg-transparent text-fg caret-accent outline-none"
                  />
                  {value === "" ? (
                    <span
                      aria-hidden
                      className="animate-caret pointer-events-none absolute top-0 left-0 text-accent"
                    >
                      &#9608;
                    </span>
                  ) : null}
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
