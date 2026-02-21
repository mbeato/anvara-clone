import Link from "next/link";
import { SectionReveal } from "./section-reveal";

const brandLogos = [
  { label: "gopuff", style: "lowercase font-bold tracking-tight" },
  { label: "Coca-Cola", style: "italic font-semibold" },
  { label: "Snapchat", style: "font-bold" },
  { label: "McDonald's", style: "font-bold" },
  { label: "mastercard", style: "lowercase font-semibold" },
  { label: "Kalshi", style: "font-bold tracking-tight" },
  { label: "Brex", style: "font-bold tracking-wide" },
  { label: "TikTok", style: "font-bold" },
  { label: "ally", style: "lowercase font-bold" },
  { label: "LEGO", style: "font-black uppercase tracking-widest" },
];

const rightsholdersLogos = [
  { label: "LAFC", style: "font-black uppercase tracking-wider" },
  { label: "Serie A", style: "font-bold italic" },
  { label: "SXSW", style: "font-black uppercase tracking-widest" },
  { label: "WE BELONG HERE", style: "font-bold uppercase text-[10px] tracking-wide" },
  { label: "ATP TOUR", style: "font-bold uppercase tracking-wider" },
  { label: "PGA", style: "font-black uppercase" },
  { label: "NASCAR", style: "font-black uppercase tracking-wider" },
  { label: "Rockies", style: "font-bold italic" },
  { label: "Outside Lands", style: "font-semibold text-[11px]" },
  { label: "Art Basel", style: "font-bold tracking-tight" },
];

function LogoGrid({ logos }: { logos: typeof brandLogos }) {
  return (
    <div className="grid grid-cols-5 gap-3 mt-6">
      {logos.map((logo) => (
        <div
          key={logo.label}
          className="flex items-center justify-center rounded-lg bg-white/60 border border-white/80 px-2 py-3 h-12 text-center"
        >
          <span className={`text-xs text-zinc-700 leading-tight ${logo.style}`}>
            {logo.label}
          </span>
        </div>
      ))}
    </div>
  );
}

export function ForBrandsRightsholders() {
  return (
    <section className="py-20 px-4 bg-zinc-50">
      <SectionReveal>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* For Brands */}
          <div className="rounded-2xl bg-zinc-100/80 border border-zinc-200 p-8 flex flex-col">
            <h2 className="text-2xl font-bold text-center text-zinc-900">
              For Brands
            </h2>
            <p className="mt-3 text-sm text-muted-foreground text-center leading-relaxed">
              Anvara puts premium sponsorships just a few clicks away. Built for
              speed. Free to explore.
            </p>
            <div className="opacity-60 grayscale flex-1">
              <LogoGrid logos={brandLogos} />
            </div>
            <div className="mt-8 flex justify-center">
              <Link
                href="/browse"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground text-sm font-semibold px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity"
              >
                Anvara for Brands
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>
          </div>

          {/* For Rightsholders */}
          <div className="rounded-2xl bg-zinc-100/80 border border-zinc-200 p-8 flex flex-col">
            <h2 className="text-2xl font-bold text-center text-zinc-900">
              For Rightsholders
            </h2>
            <p className="mt-3 text-sm text-muted-foreground text-center leading-relaxed">
              Anvara puts premium sponsorships just a few clicks away. Built for
              speed. Free to explore.
            </p>
            <div className="opacity-60 grayscale flex-1">
              <LogoGrid logos={rightsholdersLogos} />
            </div>
            <div className="mt-8 flex justify-center">
              <Link
                href="/browse"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground text-sm font-semibold px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity"
              >
                Anvara for Rightsholders
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}
