"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { LandingPropertyCard } from "./landing-property-card";

interface HeroSectionProps {
  properties: Array<{
    id: string;
    name: string;
    category: string;
    subcategory: string | null;
    region: string;
    heroImage: string;
  }>;
}

export function HeroSection({ properties }: HeroSectionProps) {
  // Group properties into sets of 3 for vertical jump-scroll
  const groups = [];
  for (let i = 0; i < properties.length; i += 3) {
    groups.push(properties.slice(i, i + 3));
  }

  const [activeGroup, setActiveGroup] = useState(0);

  const advance = useCallback(() => {
    setActiveGroup((prev) => (prev + 1) % groups.length);
  }, [groups.length]);

  useEffect(() => {
    const timer = setInterval(advance, 3000);
    return () => clearInterval(timer);
  }, [advance]);

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Rich dark gradient fallback background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900" />

      {/* Hero video background — place at /public/videos/hero.mp4 */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        aria-hidden="true"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content wrapper */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-4 pt-24 pb-4 text-center">
        <p className="text-white/60 text-sm font-medium tracking-widest uppercase mb-6 select-none">
          Introducing Anvara
        </p>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight max-w-4xl mx-auto">
          Connect Your Brand
          <br className="hidden sm:block" /> to Culture at Scale
        </h1>

        <p className="mt-6 text-white/70 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Anvara gives brands effortless access to high-impact sponsorships.
          Instantly discover opportunities, compare options, close deals, and
          measure success—all in one platform.
        </p>

        <Link
          href="/browse"
          className="mt-10 inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity shadow-lg shadow-primary/30"
        >
          Try Anvara Free
          <ArrowRight className="w-4 h-4" />
        </Link>

        <p className="mt-16 text-white/40 text-xs font-medium tracking-widest uppercase select-none">
          I&apos;m looking to target
        </p>
      </div>

      {/* Vertical jump-scroll cards — 3 cards centered, cycling every 3s */}
      <div className="relative z-10 pb-8 flex justify-center">
        <div className="relative h-[190px] w-full max-w-[900px] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeGroup}
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -60, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="absolute inset-0 flex items-center justify-center gap-4"
            >
              {groups[activeGroup]?.map((property) => (
                <LandingPropertyCard key={property.id} property={property} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
