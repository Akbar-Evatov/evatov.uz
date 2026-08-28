"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy } from "lucide-react";
import { site } from "@/data/site";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { cn } from "@/lib/utils";

export function CopyEmailButton({ className }: { className?: string }) {
  const { copied, copy } = useCopyToClipboard();

  return (
    <button
      type="button"
      onClick={() => copy(site.email)}
      className={cn(
        "group inline-flex items-center gap-3 rounded-lg border border-border bg-surface",
        "px-4 py-3 text-left transition-colors hover:border-accent hover:bg-surface-hover",
        className,
      )}
    >
      <span className="font-mono text-sm text-fg">{site.email}</span>
      <span className="relative ml-auto flex h-5 w-5 shrink-0 items-center justify-center">
        <AnimatePresence mode="wait" initial={false}>
          {copied ? (
            <motion.span
              key="check"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.14 }}
              className="absolute"
            >
              <Check className="h-4 w-4 text-emerald" />
            </motion.span>
          ) : (
            <motion.span
              key="copy"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.14 }}
              className="absolute"
            >
              <Copy className="h-4 w-4 text-fg-subtle transition-colors group-hover:text-accent" />
            </motion.span>
          )}
        </AnimatePresence>
      </span>
      <span className="sr-only" role="status">
        {copied ? "Email copied to clipboard" : ""}
      </span>
    </button>
  );
}
