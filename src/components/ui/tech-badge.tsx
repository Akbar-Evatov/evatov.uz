import { cn } from "@/lib/utils";

export function TechBadge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border border-border bg-bg-elevated px-2 py-1",
        "font-mono text-[11px] leading-none tracking-tight text-fg-muted",
        "transition-colors duration-200",
        "hover:border-accent hover:bg-accent-soft hover:text-accent",
        className,
      )}
    >
      {children}
    </span>
  );
}
