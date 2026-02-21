"use client";

import { useState, useEffect } from "react";
import { Music, Zap, Utensils } from "lucide-react";
import { SectionReveal } from "./section-reveal";

const ROTATING_WORDS = [
  "Music Event",
  "Food Festival",
  "Action Sports",
  "Music Festival",
  "Tech Conference",
];

const TOKEN_ICONS = [
  { icon: Music, label: "Music", rotate: "-rotateY(15deg)" },
  { icon: Zap, label: "Sports", rotate: "rotateY(0deg)" },
  { icon: Utensils, label: "Food", rotate: "rotateY(15deg)" },
];

export function WhatIsAnvara() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      // Fade out
      setVisible(false);

      // After fade out, change word and fade back in
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
        setVisible(true);
      }, 300);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <SectionReveal>
      <section className="w-full py-24 px-4 bg-background">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-12">
          {/* Badge */}
          <span className="inline-flex items-center px-4 py-1.5 rounded-full border border-border bg-muted text-muted-foreground text-xs font-semibold tracking-wider uppercase">
            What is Anvara?
          </span>

          {/* 3D Token Illustrations */}
          <div className="flex items-end justify-center gap-6 sm:gap-10">
            {TOKEN_ICONS.map(({ icon: Icon, label, rotate }, i) => (
              <div
                key={label}
                className="flex flex-col items-center gap-2"
                style={{
                  transform: `perspective(800px) ${rotate}`,
                  transition: "transform 0.3s ease",
                }}
              >
                <div
                  className={[
                    "flex items-center justify-center rounded-2xl shadow-xl border border-white/10",
                    // Middle card is slightly larger
                    i === 1
                      ? "w-20 h-28 sm:w-24 sm:h-32 bg-white"
                      : "w-16 h-22 sm:w-20 sm:h-28 bg-white/90",
                  ].join(" ")}
                >
                  <Icon
                    className={[
                      "text-slate-600",
                      i === 1 ? "w-8 h-8" : "w-6 h-6",
                    ].join(" ")}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Rotating text headline */}
          <div className="flex flex-col items-center gap-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight">
              Anvara is the marketplace for{" "}
              <span
                className="text-primary inline-block"
                style={{
                  opacity: visible ? 1 : 0,
                  transition: "opacity 0.3s ease",
                }}
              >
                {ROTATING_WORDS[currentIndex]}
              </span>{" "}
              sponsorships
            </h2>

            <p className="text-muted-foreground text-base sm:text-lg max-w-xl leading-relaxed">
              We help brands and rightsholders bring marketing to life.
            </p>
          </div>
        </div>
      </section>
    </SectionReveal>
  );
}
