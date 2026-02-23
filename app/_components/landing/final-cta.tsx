"use client";

import { useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { LandingPropertyCard } from "./landing-property-card";
import { SectionReveal } from "./section-reveal";

type Property = {
  id: string;
  slug: string;
  name: string;
  category: string;
  subcategory: string | null;
  region: string;
  heroImage: string;
};

interface FinalCTAProps {
  properties: Property[];
}

const SCROLL_SPEED = 25; // px per second

function VerticalScroll({
  items,
  direction,
}: {
  items: Property[];
  direction: "up" | "down";
}) {
  const innerRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const offsetRef = useRef<number>(0);
  const halfHeightRef = useRef<number>(0);

  const doubled = [...items, ...items];

  useEffect(() => {
    if (innerRef.current) {
      halfHeightRef.current = innerRef.current.scrollHeight / 2;
      if (direction === "down") {
        offsetRef.current = -halfHeightRef.current;
        innerRef.current.style.transform = `translateY(${offsetRef.current}px)`;
      }
    }
  }, [direction]);

  const animate = useCallback(
    (time: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = time;
      const delta = (time - lastTimeRef.current) / 1000;
      const halfH = halfHeightRef.current;

      if (halfH > 0) {
        if (direction === "up") {
          offsetRef.current -= delta * SCROLL_SPEED;
          if (offsetRef.current <= -halfH) {
            offsetRef.current += halfH;
          }
        } else {
          offsetRef.current += delta * SCROLL_SPEED;
          if (offsetRef.current >= 0) {
            offsetRef.current -= halfH;
          }
        }
        if (innerRef.current) {
          innerRef.current.style.transform = `translateY(${offsetRef.current}px)`;
        }
      }

      lastTimeRef.current = time;
      animRef.current = requestAnimationFrame(animate);
    },
    [direction]
  );

  useEffect(() => {
    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [animate]);

  return (
    <div className="relative h-[320px] lg:h-[480px] overflow-hidden">
      {/* Top/bottom fade masks */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-16 z-10 bg-gradient-to-b from-primary to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 z-10 bg-gradient-to-t from-primary to-transparent" />

      <div
        ref={innerRef}
        className="flex flex-col gap-4"
        style={{ willChange: "transform" }}
      >
        {doubled.map((property, index) => (
          <LandingPropertyCard
            key={`${property.id}-${direction}-${index}`}
            property={property}
          />
        ))}
      </div>
    </div>
  );
}

export function FinalCTA({ properties }: FinalCTAProps) {
  // Split properties into two columns
  const half = Math.ceil(properties.length / 2);
  const colA = properties.slice(0, half);
  const colB = properties.slice(half);

  return (
    <section className="bg-primary py-16 overflow-hidden">
      <SectionReveal>
        <div className="max-w-7xl mx-auto px-4 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left: Text content */}
          <div className="flex flex-col gap-5">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-[-0.02em] text-white leading-tight">
              Skip the Decks, Seal the deal
            </h2>
            <p className="text-white/80 text-base leading-relaxed max-w-md">
              Anvara puts premium sponsorships just a few clicks away. Built for
              speed. Free to explore.
            </p>
            <div>
              <Link
                href="/listings"
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

          {/* Right: Two vertical scrolling columns */}
          <div className="flex gap-4">
            <div className="flex-1">
              <VerticalScroll items={colA} direction="up" />
            </div>
            <div className="flex-1">
              <VerticalScroll items={colB} direction="down" />
            </div>
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}
