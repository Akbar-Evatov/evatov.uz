"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Download, ExternalLink, FileText, X } from "lucide-react";
import { site } from "@/data/site";
import { useUI } from "@/components/providers/ui-provider";
import { buttonClasses } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Resume preview. The embedded viewer is desktop-only — mobile browsers
 * generally refuse to render a PDF in an iframe, so small screens get a
 * download / open-in-tab card instead of a blank frame.
 */
export function ResumeModal() {
  const { resumeOpen, setResumeOpen } = useUI();
  const reduce = useReducedMotion();

  return (
    <Dialog.Root open={resumeOpen} onOpenChange={setResumeOpen}>
      <AnimatePresence>
        {resumeOpen ? (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="fixed inset-0 z-50 bg-slate-950/65 backdrop-blur-sm"
              />
            </Dialog.Overlay>

            <Dialog.Content asChild forceMount aria-describedby={undefined}>
              <motion.div
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.98 }}
                transition={{ duration: 0.22, ease: [0.21, 0.47, 0.32, 0.98] }}
                className={cn(
                  "fixed inset-x-3 top-[5vh] z-50 mx-auto flex h-[90vh] w-auto max-w-4xl flex-col",
                  "overflow-hidden rounded-xl border border-border bg-surface shadow-2xl",
                  "sm:inset-x-6",
                )}
              >
                <header className="flex shrink-0 items-center gap-3 border-b border-border bg-bg-elevated px-4 py-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-surface">
                    <FileText className="h-4 w-4 text-accent" />
                  </span>
                  <div className="min-w-0">
                    <Dialog.Title className="truncate text-sm font-medium text-fg">
                      {site.name} — Resume
                    </Dialog.Title>
                    <p className="truncate font-mono text-[11px] text-fg-subtle">
                      {site.resumeFileName}
                    </p>
                  </div>

                  <div className="ml-auto flex items-center gap-2">
                    <a
                      href={site.resumePath}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={buttonClasses({
                        variant: "secondary",
                        size: "sm",
                        className: "hidden sm:inline-flex",
                      })}
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      New tab
                    </a>
                    <a
                      href={site.resumePath}
                      download={site.resumeFileName}
                      className={buttonClasses({ variant: "primary", size: "sm" })}
                    >
                      <Download className="h-3.5 w-3.5" />
                      Download
                    </a>
                    <Dialog.Close
                      className={buttonClasses({
                        variant: "ghost",
                        size: "sm",
                        className: "w-9 px-0",
                      })}
                      aria-label="Close resume preview"
                    >
                      <X className="h-4 w-4" />
                    </Dialog.Close>
                  </div>
                </header>

                <div className="min-h-0 flex-1 bg-bg-elevated">
                  <iframe
                    src={`${site.resumePath}#view=FitH&toolbar=0`}
                    title={`${site.name} resume`}
                    className="hidden h-full w-full md:block"
                  />

                  <div className="flex h-full flex-col items-center justify-center gap-4 px-6 text-center md:hidden">
                    <span className="flex h-14 w-14 items-center justify-center rounded-xl border border-border bg-surface">
                      <FileText className="h-6 w-6 text-accent" />
                    </span>
                    <p className="max-w-xs text-sm text-fg-muted text-pretty">
                      Inline PDF preview is not supported on most mobile browsers. Open
                      or download the file instead.
                    </p>
                    <div className="flex flex-wrap justify-center gap-2">
                      <a
                        href={site.resumePath}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={buttonClasses({ variant: "secondary", size: "sm" })}
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        Open PDF
                      </a>
                      <a
                        href={site.resumePath}
                        download={site.resumeFileName}
                        className={buttonClasses({ variant: "primary", size: "sm" })}
                      >
                        <Download className="h-3.5 w-3.5" />
                        Download
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        ) : null}
      </AnimatePresence>
    </Dialog.Root>
  );
}
