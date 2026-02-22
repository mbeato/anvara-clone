"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { SectionReveal } from "./section-reveal";

const resultProperties = [
  {
    name: "LAFC Sponsorships",
    avatarBg: "bg-gradient-to-br from-black to-yellow-600",
    initials: "LAFC",
  },
  {
    name: "UCLA Bruins Sponsorships",
    avatarBg: "bg-gradient-to-br from-blue-700 to-yellow-400",
    initials: "UCLA",
  },
  {
    name: "USC Football Sponsorships",
    avatarBg: "bg-gradient-to-br from-red-700 to-yellow-500",
    initials: "USC",
  },
  {
    name: "Outside Lands Music Festival",
    avatarBg: "bg-gradient-to-br from-green-700 to-emerald-400",
    initials: "OL",
  },
];

function PromptFormCard() {
  return (
    <div className="bg-white rounded-xl shadow-md border border-slate-100 p-5 w-full max-w-[260px] flex flex-col gap-4">
      {/* Prompt textarea */}
      <div>
        <label className="text-[11px] font-semibold text-slate-700 mb-1.5 block">
          Prompt
        </label>
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-[11px] text-slate-500 leading-snug min-h-[60px]">
          I want to run a campaign targeting college students on the West Coast
          for our new delivery promotion
        </div>
      </div>

      {/* Brand */}
      <div>
        <label className="text-[11px] font-semibold text-slate-700 mb-1.5 block">
          Brand
        </label>
        <div className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-[11px] text-slate-700 flex items-center justify-between">
          <span>Gopuff</span>
          <svg
            className="w-3 h-3 text-slate-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>

      {/* Age Demographic */}
      <div>
        <label className="text-[11px] font-semibold text-slate-700 mb-1.5 block">
          Age Demographic
        </label>
        <div className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-[11px] text-slate-400 flex items-center justify-between">
          <span>18–24</span>
          <svg
            className="w-3 h-3 text-slate-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>

      {/* Region */}
      <div>
        <label className="text-[11px] font-semibold text-slate-700 mb-1.5 block">
          Region
        </label>
        <div className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-[11px] text-slate-700 flex items-center justify-between">
          <span>🇺🇸 California</span>
          <svg
            className="w-3 h-3 text-slate-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>

      {/* Budget */}
      <div>
        <label className="text-[11px] font-semibold text-slate-700 mb-1.5 block">
          Budget
        </label>
        <div className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-[11px] text-slate-700 flex items-center justify-between">
          <span>$100K</span>
          <svg
            className="w-3 h-3 text-slate-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

function FlowCenter({ visible }: { visible: boolean }) {
  // Dashed line dash length for draw-on animation
  const DASH = 80;

  return (
    <div className="flex flex-col items-center gap-4 px-4">
      {/* Dotted arrow rows — each draws left-to-right with stagger */}
      <div className="flex flex-col gap-3 items-center">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-1">
            <svg width="64" height="2" className="overflow-visible">
              <line
                x1="0" y1="1" x2="64" y2="1"
                stroke="#cbd5e1"
                strokeWidth="2"
                strokeDasharray="4 4"
                strokeLinecap="round"
                style={{
                  strokeDashoffset: visible ? 0 : 80,
                  transition: `stroke-dashoffset 0.6s ease ${0.5 + i * 0.1}s`,
                }}
              />
            </svg>
            <svg
              className="w-3 h-3 text-slate-400 flex-shrink-0 transition-all duration-300"
              fill="currentColor"
              viewBox="0 0 20 20"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateX(0)" : "translateX(-4px)",
                transitionDelay: `${0.8 + i * 0.1}s`,
              }}
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        ))}
      </div>

      {/* Anvara Intelligence label — fades in after arrows */}
      <div
        className="flex flex-col items-center gap-2 mt-2 transition-all duration-500"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(8px)",
          transitionDelay: "1.1s",
        }}
      >
        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center shadow-md">
          <span className="text-white text-xs font-bold">A</span>
        </div>
        <p className="text-sm font-semibold text-slate-700 whitespace-nowrap">
          Anvara Intelligence
        </p>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
          <Check className="w-3 h-3" />
          Completed!
        </span>
      </div>
    </div>
  );
}


function AnimatedFlow() {
  const flowRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = flowRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); io.disconnect(); } },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={flowRef} className="bg-slate-50 rounded-2xl border border-slate-100 p-8">
      <div className="flex flex-col lg:flex-row items-center lg:items-stretch justify-center gap-6">
        {/* Left: prompt form — slides in first */}
        <div
          className="transition-all duration-600"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateX(0)" : "translateX(-20px)",
            transitionDuration: "0.6s",
            transitionDelay: "0s",
          }}
        >
          <PromptFormCard />
        </div>

        {/* Center: flow arrows + AI label — animates after form */}
        <div className="flex items-center">
          <FlowCenter visible={visible} />
        </div>

        {/* Right: results — each card staggers in */}
        <div className="flex items-center">
          <div className="flex flex-col gap-2 w-full max-w-[240px]">
            {resultProperties.map((prop, i) => (
              <div
                key={prop.name}
                className="flex items-center gap-3 bg-white rounded-xl border border-slate-100 shadow-sm px-3 py-2.5 transition-all duration-500"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateX(0)" : "translateX(16px)",
                  transitionDelay: `${1.3 + i * 0.12}s`,
                }}
              >
                <div
                  className={`w-8 h-8 rounded-lg ${prop.avatarBg} flex items-center justify-center flex-shrink-0`}
                >
                  <span className="text-white text-[8px] font-bold leading-none">
                    {prop.initials}
                  </span>
                </div>
                <span className="text-xs font-medium text-slate-700 leading-tight">
                  {prop.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function AnvaraIntelligence() {
  return (
    <SectionReveal>
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Top text — centered */}
          <div className="text-center flex flex-col items-center gap-5 mb-16">
            {/* Badge */}
            <span className="inline-flex items-center px-3 py-1 rounded-full border border-slate-200 text-sm text-slate-600 font-medium">
              Sponsorship Meets AI
            </span>

            {/* Heading */}
            <h2 className="text-4xl lg:text-5xl font-normal tracking-[-0.02em] text-slate-900 leading-tight max-w-3xl">
              Make smarter, faster marketing decisions with{" "}
              <span className="text-blue-600">Anvara Intelligence</span>
            </h2>

            {/* Body */}
            <p className="text-lg text-slate-500 leading-relaxed max-w-xl">
              Describe your brand, target audience, and goals. Our AI scans
              thousands of listings to match you with the most relevant
              partnerships—instantly.
            </p>

            {/* CTA */}
            <Link
              href="/browse"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
            >
              Try Anvara Intelligence
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Flow diagram — animated left to right */}
          <AnimatedFlow />
        </div>
      </section>
    </SectionReveal>
  );
}
