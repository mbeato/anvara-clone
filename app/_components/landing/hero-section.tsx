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

// Each prompt has typed text, a category filter, and 3 curated Unsplash images
const PROMPTS = [
  {
    text: "Gen Z trendsetters at music & cultural festivals",
    category: "music",
    images: [
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=560&h=360&fit=crop",
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=560&h=360&fit=crop",
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=560&h=360&fit=crop",
    ],
  },
  {
    text: "sports fans at live events across the country",
    category: "sports",
    images: [
      "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=560&h=360&fit=crop",
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=560&h=360&fit=crop",
      "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=560&h=360&fit=crop",
    ],
  },
  {
    text: "foodies at premier culinary experiences",
    category: "food",
    images: [
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=560&h=360&fit=crop",
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=560&h=360&fit=crop",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=560&h=360&fit=crop",
    ],
  },
  {
    text: "art lovers at galleries & film festivals",
    category: "arts",
    images: [
      "https://images.unsplash.com/photo-1531243269054-5ebf6f34081e?w=560&h=360&fit=crop",
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=560&h=360&fit=crop",
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=560&h=360&fit=crop",
    ],
  },
  {
    text: "thrill seekers at action sports events",
    category: "lifestyle",
    images: [
      "https://images.unsplash.com/photo-1564415637254-92c66292cd64?w=560&h=360&fit=crop",
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=560&h=360&fit=crop",
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=560&h=360&fit=crop",
    ],
  },
];

const TYPE_SPEED = 40;
const DELETE_SPEED = 25;
const PAUSE_AFTER_TYPE = 2200;
const PAUSE_AFTER_DELETE = 300;
const CARD_STAGGER_MS = 120; // delay between each card animating in

export function HeroSection({ properties }: HeroSectionProps) {
  const [promptIndex, setPromptIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const fullText = PROMPTS[promptIndex].text;

  // Build card groups: filter by category, always pad to 3, override images
  const cardGroups = useMemo(() => {
    return PROMPTS.map((prompt) => {
      const matched = properties.filter((p) => p.category === prompt.category);
      // Ensure we always have 3 cards — cycle through matched if fewer
      const cards: Property[] = [];
      for (let i = 0; i < 3; i++) {
        if (matched.length > 0) {
          const prop = matched[i % matched.length];
          cards.push({
            ...prop,
            id: `${prop.id}-hero-${i}`,
            heroImage: prompt.images[i],
          });
        }
      }
      return cards;
    });
  }, [properties]);

  useEffect(() => {
    if (!isDeleting) {
      if (displayText.length < fullText.length) {
        timeoutRef.current = setTimeout(() => {
          setDisplayText(fullText.slice(0, displayText.length + 1));
        }, TYPE_SPEED);
      } else {
        timeoutRef.current = setTimeout(() => {
          setIsDeleting(true);
        }, PAUSE_AFTER_TYPE);
      }
    } else {
      if (displayText.length > 0) {
        timeoutRef.current = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, DELETE_SPEED);
      } else {
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

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
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

        {/* Typewriter — single row: static prefix + typed audience */}
        <p className="mt-16 text-sm sm:text-base font-medium select-none whitespace-nowrap">
          <span className="text-white/40 tracking-widest uppercase text-xs mr-2">
            I&apos;m looking to target
          </span>
          <span className="text-white">
            {displayText}
          </span>
          <span className="inline-block w-[2px] h-4 bg-primary ml-0.5 align-middle animate-pulse" />
        </p>
      </div>

      {/* Vertical jump-scroll cards — all exit together, stagger on entry */}
      <div className="relative z-10 pb-8 flex justify-center">
        <div className="relative h-[190px] w-full max-w-[920px] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={promptIndex}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: CARD_STAGGER_MS / 1000 } },
                exit: { transition: { duration: 0.25 } },
              }}
              className="absolute inset-0 flex items-center justify-center gap-4"
            >
              {cardGroups[promptIndex]?.map((property, i) => (
                <motion.div
                  key={property.id}
                  variants={{
                    hidden: { y: 50, opacity: 0 },
                    visible: { y: 0, opacity: 1 },
                    exit: { y: -50, opacity: 0 },
                  }}
                  transition={{
                    duration: 0.35,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                >
                  <LandingPropertyCard property={property} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
