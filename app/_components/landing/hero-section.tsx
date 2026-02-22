"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
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
// Each prompt maps to a category, curated card images, and a background video
const PROMPTS = [
  {
    text: "Gen Z trendsetters at music & cultural festivals",
    category: "music",
    video: "/videos/hero-3-concert.mp4",
    images: [
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=560&h=360&fit=crop",
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=560&h=360&fit=crop",
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=560&h=360&fit=crop",
    ],
  },
  {
    text: "sports fans at live events across the country",
    category: "sports",
    video: "/videos/hero-1-sports.mp4",
    images: [
      "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=560&h=360&fit=crop",
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=560&h=360&fit=crop",
      "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=560&h=360&fit=crop",
    ],
  },
  {
    text: "foodies at premier culinary experiences",
    category: "food",
    video: "/videos/hero-4-concert.mp4",
    images: [
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=560&h=360&fit=crop",
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=560&h=360&fit=crop",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=560&h=360&fit=crop",
    ],
  },
  {
    text: "art lovers at galleries & film festivals",
    category: "arts",
    video: "/videos/hero-5-art.mp4",
    images: [
      "https://images.unsplash.com/photo-1531243269054-5ebf6f34081e?w=560&h=360&fit=crop",
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=560&h=360&fit=crop",
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=560&h=360&fit=crop",
    ],
  },
  {
    text: "thrill seekers at action sports events",
    category: "lifestyle",
    video: "/videos/hero-2-sports.mp4",
    images: [
      "https://images.unsplash.com/photo-1564415637254-92c66292cd64?w=560&h=360&fit=crop",
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=560&h=360&fit=crop",
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=560&h=360&fit=crop",
    ],
  },
];

const TYPE_SPEED = 28;
const DELETE_SPEED = 18;
const PAUSE_AFTER_TYPE = 1600;
const PAUSE_AFTER_DELETE = 200;
const CARD_STAGGER_MS = 80; // delay between each card animating in

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

      {/* Hero video background — synced to current prompt category */}
      {PROMPTS.map((prompt, i) => (
        <video
          key={prompt.video}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
          style={{ opacity: i === promptIndex ? 1 : 0 }}
          aria-hidden="true"
        >
          <source src={prompt.video} type="video/mp4" />
        </video>
      ))}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-4 pt-24 pb-4 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-[-0.02em] text-white leading-tight max-w-4xl mx-auto">
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
          className="mt-10 inline-flex items-center gap-2 px-7 py-3.5 rounded-lg bg-primary text-white font-semibold text-sm hover:opacity-90 transition-opacity shadow-lg shadow-primary/30"
        >
          Try Anvara Free
          <ArrowRight className="w-4 h-4" />
        </Link>

      </div>

      {/* Typewriter + cards — aligned to same max-width container */}
      <div className="relative z-10 pb-8 flex justify-center">
        <div className="w-full max-w-[1040px] px-4">
          {/* Typewriter — message field style above cards */}
          <div className="mb-4 flex items-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-5 py-3">
            <p className="text-sm sm:text-base font-medium select-none whitespace-nowrap">
              <span className="text-white/50">
                I&apos;m looking to target{" "}
              </span>
              <span className="text-white">
                {displayText}
              </span>
              <span className="inline-block w-[2px] h-4 bg-primary ml-0.5 align-middle animate-pulse" />
            </p>
          </div>

          {/* Vertical jump-scroll cards */}
          <div className="relative h-[220px] overflow-hidden">
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
                    duration: 0.25,
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
      </div>

      {/* Brand logos — scrolling marquee */}
      <div className="relative z-10 pb-6 flex flex-col items-center gap-3">
        <p className="text-white/40 text-xs font-semibold tracking-widest uppercase select-none">
          Used by Teams At
        </p>
        <div className="w-[60%] mx-auto overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex gap-12 animate-[marquee_30s_linear_infinite] w-max">
            {[...Array(2)].map((_, dupeIdx) => (
              <div key={dupeIdx} className="flex items-center gap-12 shrink-0">
                {/* Snapchat — official Simple Icons ghost */}
                <span className="text-white/60 flex items-center gap-2 select-none">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.075.045.203.09.401.09.3-.016.659-.12 1.033-.301.165-.088.344-.104.464-.104.182 0 .359.029.509.09.45.149.734.479.734.838.015.449-.39.839-1.213 1.168-.089.029-.209.075-.344.119-.45.135-1.139.36-1.333.81-.09.224-.061.524.12.868l.015.015c.06.136 1.526 3.475 4.791 4.014.255.044.435.27.42.509 0 .075-.015.149-.045.225-.24.569-1.273.988-3.146 1.271-.059.091-.12.375-.164.57-.029.179-.074.36-.134.553-.076.271-.27.405-.555.405h-.03c-.135 0-.313-.031-.538-.074-.36-.075-.765-.135-1.273-.135-.3 0-.599.015-.913.074-.6.104-1.123.464-1.723.884-.853.599-1.826 1.288-3.294 1.288-.06 0-.119-.015-.18-.015h-.149c-1.468 0-2.427-.675-3.279-1.288-.599-.42-1.107-.779-1.707-.884-.314-.045-.629-.074-.928-.074-.54 0-.958.089-1.272.149-.211.043-.391.074-.54.074-.374 0-.523-.224-.583-.42-.061-.192-.09-.389-.135-.567-.046-.181-.105-.494-.166-.57-1.918-.222-2.95-.642-3.189-1.226-.031-.063-.052-.15-.055-.225-.015-.243.165-.465.42-.509 3.264-.54 4.73-3.879 4.791-4.02l.016-.029c.18-.345.224-.645.119-.869-.195-.434-.884-.658-1.332-.809-.121-.029-.24-.074-.346-.119-1.107-.435-1.257-.93-1.197-1.273.09-.479.674-.793 1.168-.793.146 0 .27.029.383.074.42.194.789.3 1.104.3.234 0 .384-.06.465-.105l-.046-.569c-.098-1.626-.225-3.651.307-4.837C7.392 1.077 10.739.807 11.727.807l.419-.015h.06z"/>
                  </svg>
                  <span className="text-lg font-bold">Snapchat</span>
                </span>

                {/* BeReal — Simple Icons logo is the wordmark */}
                <svg viewBox="0 0 24 24" fill="currentColor" className="text-white/60 h-5 w-auto select-none">
                  <path d="M6.501 10.727c.593 0 1.029.196 1.307.587.279.393.418.857.418 1.391v.312H5.674a.97.97 0 0 0 .343.596c.182.148.422.223.718.223.172 0 .327-.023.464-.066.163-.055.324-.119.48-.192l.297.733a1.73 1.73 0 0 1-.644.296c-.252.063-.46.093-.62.093-.656 0-1.172-.18-1.55-.537-.377-.36-.565-.84-.565-1.441 0-.603.17-1.086.51-1.45.342-.364.806-.545 1.394-.545Zm8.835 0c.593 0 1.028.196 1.307.587.278.393.417.857.417 1.391v.312h-2.552c.038.235.16.447.344.596.182.148.421.223.718.223.171 0 .326-.023.464-.066a4.53 4.53 0 0 0 .48-.192l.297.733a1.728 1.728 0 0 1-.644.296 2.67 2.67 0 0 1-.62.093c-.656 0-1.173-.18-1.55-.537-.377-.36-.566-.84-.566-1.441 0-.603.17-1.086.512-1.45.34-.364.805-.545 1.393-.545Zm3.875.041c.974 0 1.603.502 1.603 1.26v2.579h-1.027v-.561h-.02c-.215.385-.616.62-1.111.62-.756 0-1.265-.473-1.265-1.136v-.008c0-.683.53-1.083 1.465-1.144l.931-.055v-.231c0-.335-.217-.541-.618-.541-.383 0-.615.18-.664.421l-.007.03h-.939l.004-.04c.056-.696.653-1.194 1.648-1.194Zm4.789 2.8v1.039h-1.04v-1.039H24ZM1.982 9.308c.515 0 .934.114 1.257.34.322.225.484.607.484 1.14 0 .198-.046.376-.137.534-.09.16-.21.296-.355.41.24.125.436.294.59.506.153.213.23.483.23.81 0 .489-.171.871-.512 1.146-.34.275-.795.413-1.362.413H0V9.308h1.982Zm8.702 0c.578 0 1.072.133 1.483.398.411.265.617.675.617 1.231 0 .327-.085.609-.254.846a1.714 1.714 0 0 1-.652.549l1.304 2.275h-1.077l-1.124-2.025a3.626 3.626 0 0 1-.367.015h-.585v2.01H9.022V9.308h1.662ZM22.448 9.3v5.307h-1.076V9.3h1.076Zm-2.66 3.661-.777.049c-.397.025-.605.192-.605.46v.007c0 .277.229.442.584.442.46 0 .797-.294.797-.688l.001-.27ZM2.17 12.285H1.007v1.489h1.092c.27 0 .488-.063.652-.188a.622.622 0 0 0 .246-.53c0-.25-.076-.44-.226-.572-.151-.132-.352-.199-.601-.199Zm4.308-.694a.75.75 0 0 0-.523.19c-.14.128-.232.315-.273.558h1.584c-.052-.253-.146-.442-.281-.564a.73.73 0 0 0-.507-.184Zm8.834 0a.75.75 0 0 0-.523.19c-.14.128-.231.315-.273.558h1.585c-.053-.253-.146-.442-.281-.564a.73.73 0 0 0-.508-.184Zm-4.659-1.441h-.624v1.62h.64c.301 0 .551-.06.749-.182.198-.122.296-.324.296-.604 0-.297-.093-.51-.28-.639-.188-.13-.448-.195-.781-.195Zm-8.819 0h-.827v1.316h.749c.281 0 .5-.053.66-.16.158-.105.238-.273.238-.501 0-.25-.073-.422-.219-.515-.146-.093-.346-.14-.601-.14Z"/>
                </svg>

                {/* Squarespace — official Simple Icons */}
                <span className="text-white/60 flex items-center gap-2 select-none">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M22.655 8.719c-1.802-1.801-4.726-1.801-6.564 0l-7.351 7.35c-.45.45-.45 1.2 0 1.65.45.449 1.2.449 1.65 0l7.351-7.351c.899-.899 2.362-.899 3.264 0 .9.9.9 2.364 0 3.264l-7.239 7.239c.9.899 2.362.899 3.263 0l5.589-5.589c1.836-1.838 1.836-4.763.037-6.563zm-2.475 2.437c-.451-.45-1.201-.45-1.65 0l-7.354 7.389c-.9.899-2.361.899-3.262 0-.45-.45-1.2-.45-1.65 0s-.45 1.2 0 1.649c1.801 1.801 4.726 1.801 6.564 0l7.351-7.35c.449-.487.449-1.239.001-1.688zm-2.439-7.35c-1.801-1.801-4.726-1.801-6.564 0l-7.351 7.351c-.45.449-.45 1.199 0 1.649s1.2.45 1.65 0l7.395-7.351c.9-.899 2.371-.899 3.27 0 .451.45 1.201.45 1.65 0 .421-.487.421-1.199-.029-1.649h-.021zm-2.475 2.437c-.45-.45-1.2-.45-1.65 0l-7.351 7.389c-.899.9-2.363.9-3.265 0-.9-.899-.9-2.363 0-3.264l7.239-7.239c-.9-.9-2.362-.9-3.263 0L1.35 8.719c-1.8 1.8-1.8 4.725 0 6.563 1.801 1.801 4.725 1.801 6.564 0l7.35-7.351c.451-.488.451-1.238 0-1.688h.002z"/>
                  </svg>
                  <span className="text-lg font-semibold">Squarespace</span>
                </span>

                {/* Publicis Media */}
                <span className="text-white/60 text-lg font-bold tracking-wider uppercase select-none">
                  Publicis Media
                </span>

                {/* Graza */}
                <span className="text-white/60 text-xl font-black italic select-none tracking-tight">
                  graza
                </span>

                {/* BP — official helios sunburst */}
                <span className="text-white/60 flex items-center gap-1.5 select-none">
                  <svg viewBox="0 0 212.6 283.5" fill="currentColor" className="w-6 h-6">
                    <path d="M211.6,194.7c-6.8-7.3-14.3-13.5-22.2-18.5c7.8-5,15.3-11.3,22.1-18.6c-8.9-4.5-18.1-7.8-27.2-9.8 c5.6-7.4,10.5-15.9,14.5-25c-9.9-1.2-19.6-1.1-28.9,0.1c2.8-8.9,4.5-18.5,5-28.5c-9.7,2.3-18.9,5.6-27.1,9.9 c-0.5-9.3-2.1-18.9-5-28.5c-8.3,5.5-15.8,11.8-22.1,18.6c-3.6-8.6-8.5-17-14.5-25c-6,8-10.8,16.5-14.4,25.1 C85.5,87.6,78,81.3,69.7,75.9c-2.9,9.5-4.5,19.1-5,28.4c-8.3-4.3-17.4-7.6-27.1-9.9c0.6,10,2.3,19.6,5.1,28.5 c-9.3-1.2-19-1.2-29,0c3.9,9.2,8.8,17.6,14.5,25c-9.1,2.1-18.3,5.4-27.2,9.9c6.8,7.3,14.3,13.5,22.2,18.5 c-7.8,5-15.3,11.3-22.1,18.6c8.9,4.5,18.1,7.8,27.2,9.8c-5.6,7.4-10.5,15.9-14.5,25c9.9,1.2,19.6,1.1,28.8,0 c-2.8,8.9-4.5,18.5-5,28.4c9.7-2.3,18.9-5.6,27.1-9.9c0.4,9.3,2.1,18.9,5,28.5c8.3-5.5,15.8-11.7,22.1-18.6 c3.6,8.6,8.5,17.1,14.5,25.1c6-8,10.8-16.5,14.4-25.1c6.3,6.9,13.8,13.2,22.2,18.6c2.9-9.5,4.5-19.1,5-28.5 c8.3,4.3,17.5,7.6,27.2,9.9c-0.6-10-2.3-19.5-5.1-28.4c9.2,1.2,19,1.2,28.9,0c-3.9-9.2-8.8-17.6-14.5-25 C193.5,202.5,202.7,199.2,211.6,194.7z"/>
                  </svg>
                  <span className="text-xl font-bold lowercase">bp</span>
                </span>

                {/* Sephora */}
                <span className="text-white/60 text-lg font-bold tracking-[0.25em] uppercase select-none">
                  SEPHORA
                </span>

                {/* Huel */}
                <span className="text-white/60 text-xl font-black tracking-wider uppercase select-none">
                  HUEL
                </span>

                {/* micro1 */}
                <span className="text-white/60 font-serif italic text-lg font-medium tracking-tight select-none">
                  micro1.
                </span>

                {/* Legendz */}
                <span className="text-white/60 font-bold text-lg tracking-widest uppercase select-none">
                  L&apos;EGENDZ
                </span>

                {/* Delta — official Simple Icons */}
                <span className="text-white/60 flex items-center gap-1.5 select-none">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
                    <path d="M0 13.85h4.626l-2.31-.978zm.172-.395l2.144-1.033 2.143 1.033-2.143-3.304Z"/>
                  </svg>
                  <span className="text-lg font-bold tracking-wide uppercase">Delta</span>
                </span>

                {/* gopuff */}
                <span className="text-white/60 text-lg font-bold tracking-normal lowercase select-none">
                  gopuff
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
