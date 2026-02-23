"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { GlassFilter } from "@/components/ui/liquid-glass-button";
import { SectionReveal } from "./section-reveal";

/*
 * SVG icon masks — each icon rendered as white stroke on transparent bg.
 * Used as CSS mask-image so the frosted etch layer only shows through
 * the icon shape, making icons look etched into the glass.
 */
const ICON_SVGS = {
  music: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>`,
  utensils: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>`,
  bike: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="18.5" cy="17.5" r="3.5"/><circle cx="5.5" cy="17.5" r="3.5"/><circle cx="15" cy="5" r="1" fill="white"/><path d="M12 17.5V14l-3-3 4-3 2 3h2"/></svg>`,
  palette: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".5" fill="white"/><circle cx="17.5" cy="10.5" r=".5" fill="white"/><circle cx="8.5" cy="7.5" r=".5" fill="white"/><circle cx="6.5" cy="12.5" r=".5" fill="white"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>`,
  trophy: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>`,
} as const;

function iconMaskStyle(svgKey: keyof typeof ICON_SVGS) {
  const encoded = encodeURIComponent(ICON_SVGS[svgKey]);
  return {
    WebkitMaskImage: `url("data:image/svg+xml,${encoded}")`,
    maskImage: `url("data:image/svg+xml,${encoded}")`,
    WebkitMaskSize: "contain",
    maskSize: "contain",
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    WebkitMaskPosition: "center",
    maskPosition: "center",
  } as React.CSSProperties;
}

const CATEGORIES = [
  { word: "Music Event", iconKey: "music" as const, label: "Music" },
  { word: "Food Festival", iconKey: "utensils" as const, label: "Food" },
  { word: "Action Sports", iconKey: "bike" as const, label: "Sports" },
  { word: "Art Exhibition", iconKey: "palette" as const, label: "Arts" },
  { word: "Sports League", iconKey: "trophy" as const, label: "League" },
];

/* Alternating tilt — left, right, left, right, left */
const TOKEN_TRANSFORMS = [
  { rotate: -8, y: 4, x: 4 },
  { rotate: 6, y: -5, x: 2 },
  { rotate: -5, y: 2, x: 0 },
  { rotate: 7, y: -4, x: -2 },
  { rotate: -9, y: 5, x: -4 },
];

/* Negative margin to make tokens overlap each other */
const TOKEN_MARGIN = "-ml-4 sm:-ml-3 md:-ml-4 first:ml-0";

/* The liquid glass inset shadow — identical to the LiquidButton component */
const GLASS_SHADOW_LIGHT =
  "0 0 6px rgba(0,0,0,0.03), 0 2px 6px rgba(0,0,0,0.08), inset 3px 3px 0.5px -3px rgba(0,0,0,0.9), inset -3px -3px 0.5px -3px rgba(0,0,0,0.85), inset 1px 1px 1px -0.5px rgba(0,0,0,0.6), inset -1px -1px 1px -0.5px rgba(0,0,0,0.6), inset 0 0 6px 6px rgba(0,0,0,0.12), inset 0 0 2px 2px rgba(0,0,0,0.06), 0 0 12px rgba(255,255,255,0.15)";

const GLASS_SHADOW_ACTIVE =
  "0 0 8px rgba(0,0,0,0.05), 0 4px 12px rgba(0,0,0,0.12), inset 3px 3px 0.5px -3px rgba(0,0,0,0.9), inset -3px -3px 0.5px -3px rgba(0,0,0,0.85), inset 1px 1px 1px -0.5px rgba(0,0,0,0.6), inset -1px -1px 1px -0.5px rgba(0,0,0,0.6), inset 0 0 8px 8px rgba(0,0,0,0.14), inset 0 0 3px 3px rgba(0,0,0,0.08), 0 0 20px rgba(255,255,255,0.2)";

const TYPE_SPEED = 35;
const DELETE_SPEED = 22;
const PAUSE_AFTER_TYPE = 1800;
const PAUSE_AFTER_DELETE = 250;

export function WhatIsAnvara() {
  const [catIndex, setCatIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const fullText = CATEGORIES[catIndex].word;

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
          setCatIndex((prev) => (prev + 1) % CATEGORIES.length);
          setIsDeleting(false);
        }, PAUSE_AFTER_DELETE);
      }
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [displayText, isDeleting, fullText]);

  return (
    <SectionReveal>
      <section className="w-full py-20 sm:py-24 flex items-center justify-center px-4 bg-background relative overflow-hidden">
        {/* Dot grid — center 60% only */}
        <div
          className="absolute top-0 left-[20%] w-[60%] h-full pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.18) 1px, transparent 1px)",
            backgroundSize: "5px 5px",
          }}
        />
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-10">
          {/* Badge */}
          <span className="inline-flex items-center px-4 py-1.5 rounded-full border border-border bg-muted text-muted-foreground text-xs font-semibold tracking-wider uppercase">
            What is Anvara?
          </span>

          {/* Liquid glass tokens */}
          <div
            className="relative flex items-center justify-center py-8"
            style={{ perspective: "900px" }}
          >
            {/* Colorful gradient backdrop — glass refracts this */}
            <div
              className="absolute rounded-full blur-3xl pointer-events-none"
              style={{
                width: "460px",
                height: "260px",
                background:
                  "linear-gradient(135deg, rgba(100,130,255,0.4) 0%, rgba(170,90,240,0.3) 35%, rgba(255,120,160,0.35) 65%, rgba(255,190,90,0.25) 100%)",
              }}
            />

            <div className="relative flex items-center justify-center">
              {CATEGORIES.map(({ iconKey, label }, i) => {
                const isActive = i === catIndex;
                const isAdjacent =
                  i ===
                    (catIndex - 1 + CATEGORIES.length) % CATEGORIES.length ||
                  i === (catIndex + 1) % CATEGORIES.length;

                const t = TOKEN_TRANSFORMS[i];

                return (
                  <div
                    key={label}
                    className={`relative transition-all duration-300 ease-out ${TOKEN_MARGIN}`}
                    style={{
                      transformStyle: "preserve-3d",
                      transform: [
                        `rotate(${t.rotate}deg)`,
                        `translateY(${t.y + (isActive ? -10 : 0)}px)`,
                        `translateX(${t.x}px)`,
                        `scale(${isActive ? 1.12 : isAdjacent ? 0.95 : 0.82})`,
                        isActive ? "translateZ(24px)" : "translateZ(0px)",
                      ].join(" "),
                      zIndex: isActive ? 10 : isAdjacent ? 5 : 1,
                      opacity: isActive ? 1 : isAdjacent ? 0.7 : 0.4,
                    }}
                  >
                    {/* Liquid glass token card */}
                    <div
                      className="relative flex items-center justify-center overflow-hidden w-[72px] h-[82px] sm:w-[92px] sm:h-[104px] md:w-[112px] md:h-[126px] rounded-[22px] transition-shadow duration-300"
                      style={{
                        boxShadow: isActive
                          ? GLASS_SHADOW_ACTIVE
                          : GLASS_SHADOW_LIGHT,
                      }}
                    >
                      {/* Layer 1: SVG turbulence distortion (from LiquidButton) */}
                      <div
                        className="absolute inset-0 isolate -z-10 overflow-hidden rounded-[22px]"
                        style={{
                          backdropFilter: 'url("#container-glass")',
                        }}
                      />

                      {/* Layer 2: Frosted blur — inactive cards get heavier frost */}
                      <div
                        className="absolute inset-0 rounded-[22px] pointer-events-none"
                        style={{
                          backdropFilter: isActive
                            ? "blur(16px) saturate(160%)"
                            : "blur(32px) saturate(130%) brightness(1.08)",
                          WebkitBackdropFilter: isActive
                            ? "blur(16px) saturate(160%)"
                            : "blur(32px) saturate(130%) brightness(1.08)",
                        }}
                      />

                      {/* Layer 3: Semi-transparent frosted fill — thicker on inactive */}
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background: isActive
                            ? "linear-gradient(160deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0.2) 100%)"
                            : "linear-gradient(160deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.25) 50%, rgba(255,255,255,0.35) 100%)",
                        }}
                      />

                      {/* Layer 4: Top edge highlight */}
                      <div
                        className="absolute inset-x-0 top-0 h-[40%] pointer-events-none rounded-t-[18px]"
                        style={{
                          background:
                            "linear-gradient(to bottom, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.1) 60%, transparent 100%)",
                        }}
                      />

                      {/* ICON — frosted etch effect via CSS mask.
                          This div has a BRIGHTER frosting + backdrop-filter,
                          but is masked to the icon shape so only the icon
                          area appears as a different frost level — like
                          it's etched/stamped into the glass surface. */}
                      <div
                        className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none"
                      >
                        <div
                          className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 transition-all duration-300 ease-out"
                          style={{
                            ...iconMaskStyle(iconKey),
                            backdropFilter: isActive
                              ? "blur(3px) brightness(1.4) saturate(120%)"
                              : "blur(6px) brightness(1.1) saturate(100%)",
                            WebkitBackdropFilter: isActive
                              ? "blur(3px) brightness(1.4) saturate(120%)"
                              : "blur(6px) brightness(1.1) saturate(100%)",
                            background: isActive
                              ? "rgba(255,255,255,0.35)"
                              : "rgba(255,255,255,0.12)",
                            boxShadow: isActive
                              ? "0 1px 2px rgba(255,255,255,0.5), 0 -1px 1px rgba(0,0,0,0.08)"
                              : "none",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Shared GlassFilter SVG — renders the feTurbulence distortion filter */}
            <GlassFilter />
          </div>

          {/* Typewriter headline */}
          <div className="flex flex-col items-center gap-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-[-0.02em] text-foreground leading-tight">
              Anvara is the marketplace for
              <br />
              <span className="text-primary whitespace-normal sm:whitespace-nowrap">
                {displayText}
              </span>
              <span className="inline-block w-[3px] h-[0.9em] bg-primary ml-1 align-middle animate-pulse" />
              {" "}sponsorships
            </h2>

            <p className="text-muted-foreground text-base sm:text-lg max-w-xl leading-relaxed">
              We help brands and rightsholders bring marketing to life.
            </p>

            <div className="flex items-center gap-3 mt-2">
              <Link
                href="/listings"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary text-white text-sm font-semibold hover:opacity-90 transition-opacity shadow-md shadow-primary/25"
              >
                Sign up Today
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-foreground text-background text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                Contact Us
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SectionReveal>
  );
}
