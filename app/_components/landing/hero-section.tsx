"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
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
  // useRef pattern per project decision 04-02: prevents recreation on re-render
  const plugin = useRef(
    Autoplay({ delay: 3000, stopOnMouseEnter: true, stopOnInteraction: false })
  );

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Rich dark gradient fallback background — always visible even without video */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900" />

      {/* Hero video background
          Place video file at /public/videos/hero.mp4 to enable.
          Free stock footage: https://www.pexels.com/search/videos/action%20sports/
      */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        aria-hidden="true"
      >
        {/* Video source — add local file or CDN URL here */}
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content wrapper — vertically centered, positioned in upper ~75% */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-4 pt-24 pb-4 text-center">
        {/* Eyebrow label */}
        <p className="text-white/60 text-sm font-medium tracking-widest uppercase mb-6 select-none">
          Introducing Anvara
        </p>

        {/* Main headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight max-w-4xl mx-auto">
          Connect Your Brand
          <br className="hidden sm:block" /> to Culture at Scale
        </h1>

        {/* Subtext */}
        <p className="mt-6 text-white/70 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Anvara gives brands effortless access to high-impact sponsorships.
          Instantly discover opportunities, compare options, close deals, and
          measure success—all in one platform.
        </p>

        {/* CTA Button */}
        <Link
          href="/browse"
          className="mt-10 inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity shadow-lg shadow-primary/30"
        >
          Try Anvara Free
          <ArrowRight className="w-4 h-4" />
        </Link>

        {/* "Im looking to target" label above carousel */}
        <p className="mt-16 text-white/40 text-xs font-medium tracking-widest uppercase select-none">
          I&apos;m looking to target
        </p>
      </div>

      {/* Property Card Snap Carousel — anchored at bottom of hero */}
      <div className="relative z-10 pb-8 px-4">
        <Carousel
          plugins={[plugin.current]}
          opts={{ loop: true, align: "start" }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {properties.map((property) => (
              <CarouselItem
                key={property.id}
                className="pl-4 basis-[85%] md:basis-1/2 lg:basis-1/3"
              >
                <LandingPropertyCard property={property} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
