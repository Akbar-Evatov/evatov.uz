"use client";

import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useMounted } from "@/hooks/use-mounted";
import { cn } from "@/lib/utils";

/**
 * Sliding dark/light switch. Renders a neutral placeholder until mounted so the
 * server HTML and the first client paint agree.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();
  const isDark = resolvedTheme === "dark";

  const track = cn(
    "relative inline-flex h-9 w-16 shrink-0 items-center rounded-full border border-border",
    "bg-bg-elevated p-1 transition-colors hover:border-border-strong",
    className,
  );

  if (!mounted) {
    return <div className={track} aria-hidden />;
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={track}
    >
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 520, damping: 34 }}
        className={cn(
          "flex h-7 w-7 items-center justify-center rounded-full",
          "bg-surface shadow-sm ring-1 ring-border",
          isDark ? "ml-auto" : "mr-auto",
        )}
      >
        {isDark ? (
          <Moon className="h-3.5 w-3.5 text-accent" strokeWidth={2} />
        ) : (
          <Sun className="h-3.5 w-3.5 text-amber-500" strokeWidth={2} />
        )}
      </motion.span>
    </button>
  );
}
