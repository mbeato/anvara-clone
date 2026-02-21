import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { SectionReveal } from "./section-reveal";

interface AccessMarketProps {
  properties: Array<{
    id: string;
    name: string;
    heroImage: string;
    subcategory: string | null;
    category: string;
  }>;
}

// Simulated view counts for demo polish — matches screenshot "4.4k views today" style
const VIEW_COUNTS = ["4.4k", "3.1k", "2.8k", "6.2k", "1.9k"];

export function AccessMarket({ properties }: AccessMarketProps) {
  const displayProperties = properties.slice(0, 5);

  return (
    <SectionReveal>
      <section className="w-full py-24 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          {/* Top CTA row */}
          <div className="flex justify-center gap-4 mb-16">
            <Link
              href="/browse"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              Try it Free
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/browse"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border bg-background text-foreground font-semibold text-sm hover:bg-muted transition-colors"
            >
              Contact Us
            </Link>
          </div>

          {/* Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left: Heading + body text */}
            <div className="flex flex-col gap-6">
              {/* Small label */}
              <p className="text-primary text-xs font-semibold tracking-widest uppercase">
                Access &amp; Visibility
              </p>

              <h2 className="text-4xl sm:text-5xl font-bold text-foreground leading-tight">
                Access the
                <br />
                Whole Market
              </h2>

              <p className="text-muted-foreground text-base leading-relaxed max-w-md">
                Anvara brings the biggest brands and rightsholders to one
                unified platform. With full visibility, more options, and direct
                contact, deals get done smarter, faster, and with better
                buyer-to-seller alignment.
              </p>

              {/* Check the Market CTA */}
              <Link
                href="/browse"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity self-start mt-2"
              >
                Check the Market
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Right: Property list */}
            <div className="flex flex-col gap-3">
              {displayProperties.map((property, index) => (
                <Link
                  key={property.id}
                  href={`/properties/${property.id}`}
                  className="flex items-center gap-4 p-4 rounded-xl bg-background border border-border hover:border-primary/30 hover:shadow-sm transition-all group"
                >
                  {/* Property thumbnail */}
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={property.heroImage}
                      alt={property.name}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>

                  {/* Property info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-foreground font-semibold text-sm truncate group-hover:text-primary transition-colors">
                      {property.name}
                    </p>
                    <p className="text-muted-foreground text-xs mt-0.5">
                      {property.subcategory || property.category}
                    </p>
                  </div>

                  {/* View count badge */}
                  <span className="flex-shrink-0 inline-flex items-center px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                    {VIEW_COUNTS[index % VIEW_COUNTS.length]} views today
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </SectionReveal>
  );
}
