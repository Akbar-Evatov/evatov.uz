/**
 * Fixed page texture: blueprint grid plus two slow ambient glows. Purely
 * decorative and non-interactive.
 */
export function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-bg" />
      <div className="bg-grid mask-fade-edges absolute inset-0 opacity-90" />
      <div className="glow-a absolute -top-40 left-1/2 h-[38rem] w-[38rem] -translate-x-3/4 rounded-full blur-3xl" />
      <div className="glow-b absolute top-1/3 right-0 h-[32rem] w-[32rem] translate-x-1/3 rounded-full blur-3xl" />
      <div className="bg-dots absolute inset-x-0 bottom-0 h-64 opacity-60 [mask-image:linear-gradient(to_top,#000,transparent)]" />
    </div>
  );
}
