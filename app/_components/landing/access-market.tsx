"use client";

import { useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Flame } from "lucide-react";
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

// Made-up view counts cycled across all properties
const VIEW_COUNTS = [
  "4.4k", "3.1k", "2.8k", "6.2k", "1.9k", "5.7k", "2.3k",
  "7.1k", "1.4k", "3.9k", "8.2k", "4.6k", "2.1k", "5.3k",
];

const SCROLL_PX_PER_SEC = 30; // pixels per second — smooth continuous speed

function PropertyRow({
  property,
  viewCount,
}: {
  property: AccessMarketProps["properties"][number];
  viewCount: string;
}) {
  return (
    <Link
      href={`/properties/${property.id}`}
      className="flex items-center gap-4 p-3.5 rounded-xl bg-white border border-zinc-200 hover:border-primary/30 hover:shadow-sm transition-all group flex-shrink-0"
    >
      <div className="relative w-11 h-11 rounded-lg overflow-hidden flex-shrink-0">
        <Image
          src={property.heroImage}
          alt={property.name}
          fill
          className="object-cover"
          sizes="44px"
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-foreground font-medium text-sm truncate group-hover:text-primary transition-colors">
          {property.name}
        </p>
        <p className="text-muted-foreground text-xs mt-0.5">
          {property.subcategory || property.category}
        </p>
      </div>
      <span className="flex-shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
        <Flame className="w-3 h-3 fill-primary" />
        {viewCount} views
      </span>
    </Link>
  );
}

export function AccessMarket({ properties }: AccessMarketProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const pausedRef = useRef(false);

  // Double the items for seamless loop
  const items = properties.length > 0 ? properties : [];
  const doubled = [...items, ...items];

  const animate = useCallback(
    (time: number) => {
      if (!scrollRef.current) return;
      if (!lastTimeRef.current) lastTimeRef.current = time;

      if (!pausedRef.current) {
        const delta = (time - lastTimeRef.current) / 1000;
        scrollRef.current.scrollTop -= delta * SCROLL_PX_PER_SEC;

        // When we've scrolled past the top, jump to second half seamlessly
        const halfHeight = scrollRef.current.scrollHeight / 2;
        if (scrollRef.current.scrollTop <= 0) {
          scrollRef.current.scrollTop += halfHeight;
        }
      }

      lastTimeRef.current = time;
      animRef.current = requestAnimationFrame(animate);
    },
    []
  );

  useEffect(() => {
    // Start at halfway so upward scroll has room
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight / 2;
    }
    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [animate]);

  return (
    <SectionReveal>
      <section className="w-full py-24 px-4 bg-zinc-100">
        <div className="max-w-6xl mx-auto">
          {/* Top CTA row */}
          {/* Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left: Heading + body text */}
            <div className="flex flex-col gap-6">
              <p className="text-primary text-xs font-semibold tracking-widest uppercase">
                Access &amp; Visibility
              </p>

              <h2 className="text-4xl sm:text-5xl font-normal tracking-[-0.02em] text-foreground leading-tight">
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

              <Link
                href="/listings"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity self-start mt-2"
              >
                Check the Market
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Right: Smooth infinite scroll in darker container */}
            <div className="bg-zinc-200/80 rounded-2xl p-4 relative">
              {/* Top/bottom fade masks */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-8 z-10 bg-gradient-to-b from-zinc-200/80 to-transparent rounded-t-2xl" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 z-10 bg-gradient-to-t from-zinc-200/80 to-transparent rounded-b-2xl" />

              <div
                ref={scrollRef}
                className="flex flex-col gap-2.5 max-h-[380px] overflow-hidden scrollbar-hide"
                onMouseEnter={() => { pausedRef.current = true; }}
                onMouseLeave={() => { pausedRef.current = false; }}
              >
                {doubled.map((property, i) => (
                  <PropertyRow
                    key={`${property.id}-${i}`}
                    property={property}
                    viewCount={VIEW_COUNTS[i % VIEW_COUNTS.length]}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </SectionReveal>
  );
}
