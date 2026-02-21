import { SectionReveal } from "./section-reveal";

// Server Component — no client interactivity needed
export function BrandLogosBar() {
  return (
    <SectionReveal>
      <div className="w-full bg-muted/50 border-y border-border/40 py-8 px-4">
        <div className="max-w-5xl mx-auto flex flex-col items-center gap-6">
          {/* Label */}
          <p className="text-muted-foreground/60 text-xs font-semibold tracking-widest uppercase select-none">
            Used by Teams At
          </p>

          {/* Logos row */}
          <div className="flex flex-wrap items-center justify-center gap-10 sm:gap-16 opacity-60">
            {/* micro1 */}
            <span className="text-foreground font-serif italic text-xl font-medium tracking-tight select-none">
              micro1.
            </span>

            {/* Legendz */}
            <span className="text-foreground font-bold text-xl tracking-widest uppercase select-none">
              L&apos;EGENDZ
            </span>

            {/* Delta */}
            <span className="text-foreground font-bold text-xl tracking-wide uppercase select-none flex items-center gap-1.5">
              {/* Delta triangle symbol */}
              <svg
                viewBox="0 0 20 18"
                fill="currentColor"
                className="w-5 h-5"
                aria-hidden="true"
              >
                <polygon points="10,0 20,18 0,18" />
              </svg>
              DELTA
            </span>

            {/* gopuff */}
            <span className="text-foreground font-bold text-xl tracking-normal lowercase select-none">
              gopuff
            </span>
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}
