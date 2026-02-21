import Link from "next/link";
import { LandingPropertyCard } from "./landing-property-card";
import { SectionReveal } from "./section-reveal";

type Property = {
  id: string;
  name: string;
  category: string;
  subcategory: string | null;
  region: string;
  heroImage: string;
};

interface FinalCTAProps {
  properties: Property[];
}

export function FinalCTA({ properties }: FinalCTAProps) {
  // Duplicate for seamless marquee loop
  const marqueeItems = [...properties, ...properties];

  return (
    <section className="bg-primary py-16 overflow-hidden">
      <SectionReveal>
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left: Text content */}
          <div className="flex flex-col gap-5">
            <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
              Skip the Decks, Seal the deal
            </h2>
            <p className="text-white/80 text-base leading-relaxed max-w-md">
              Anvara puts premium sponsorships just a few clicks away. Built for
              speed. Free to explore.
            </p>
            <div>
              <Link
                href="/browse"
                className="inline-flex items-center gap-2 bg-white text-primary text-sm font-semibold px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity"
              >
                Get Started
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

          {/* Right: Marquee carousel */}
          <div className="overflow-hidden">
            <div className="flex gap-4 animate-marquee w-max">
              {marqueeItems.map((property, index) => (
                <LandingPropertyCard key={`${property.id}-${index}`} property={property} />
              ))}
            </div>
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}
