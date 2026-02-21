"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { LandingPropertyCard } from "./landing-property-card";

type Property = {
  id: string;
  name: string;
  category: string;
  subcategory: string | null;
  region: string;
  heroImage: string;
};

interface HeroSectionProps {
  properties: Property[];
}

const PROMPTS = [
  { text: "Gen Z trendsetters at music & cultural festivals", category: "music" },
  { text: "sports fans at live events across the country", category: "sports" },
  { text: "foodies at premier culinary experiences", category: "food" },
  { text: "art lovers at galleries & film festivals", category: "arts" },
  { text: "thrill seekers at action sports events", category: "lifestyle" },
];

// Typing speed constants (ms)
const TYPE_SPEED = 40;
const DELETE_SPEED = 25;
const PAUSE_AFTER_TYPE = 2200;
const PAUSE_AFTER_DELETE = 300;

export function HeroSection({ properties }: HeroSectionProps) {
  const [promptIndex, setPromptIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const fullText = PROMPTS[promptIndex].text;

  // Build card groups filtered by category, up to 3 cards each
  const cardGroups = useMemo(() => {
    return PROMPTS.map((prompt) => {
      const matched = properties.filter((p) => p.category === prompt.category);
      return matched.slice(0, 3);
    });
  }, [properties]);

  useEffect(() => {
    if (!isDeleting) {
      // Typing phase
      if (displayText.length < fullText.length) {
        timeoutRef.current = setTimeout(() => {
          setDisplayText(fullText.slice(0, displayText.length + 1));
        }, TYPE_SPEED);
      } else {
        // Fully typed — pause then start deleting
        timeoutRef.current = setTimeout(() => {
          setIsDeleting(true);
        }, PAUSE_AFTER_TYPE);
      }
    } else {
      // Deleting phase
      if (displayText.length > 0) {
        timeoutRef.current = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, DELETE_SPEED);
      } else {
        // Fully deleted — pause, advance prompt, start typing
        timeoutRef.current = setTimeout(() => {
          setPromptIndex((prev) => (prev + 1) % PROMPTS.length);
          setIsDeleting(false);
        }, PAUSE_AFTER_DELETE);
      }
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [displayText, isDeleting, fullText]);

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

        {/* Typewriter prompt */}
        <div className="mt-16 h-14 flex flex-col items-center justify-start">
          <p className="text-white/40 text-xs font-medium tracking-widest uppercase select-none mb-2">
            I&apos;m looking to target
          </p>
          <p className="text-white text-sm sm:text-base font-medium h-6">
            {displayText}
            <span className="inline-block w-[2px] h-4 bg-primary ml-0.5 align-middle animate-pulse" />
          </p>
        </div>
      </div>

      {/* Vertical jump-scroll cards — synced to typewriter prompt */}
      <div className="relative z-10 pb-8 flex justify-center">
        <div className="relative h-[190px] w-full max-w-[900px] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={promptIndex}
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -60, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="absolute inset-0 flex items-center justify-center gap-4"
            >
              {cardGroups[promptIndex]?.map((property) => (
                <LandingPropertyCard key={property.id} property={property} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
