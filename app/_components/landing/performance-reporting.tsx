"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionReveal } from "./section-reveal";

function MetricsVisualization() {
  /*
   * Matches anvara.com: grey card, property chip top-left, three curves
   * starting close together at bottom-center, fanning upward to different
   * heights. Badges float at each curve endpoint. No axes, no fills.
   */

  // SVG viewBox
  const vw = 400;
  const vh = 340;

  // All curves start from the same bottom-left point
  const startX = 70;
  const startY = 300;

  // Endpoints — fan out: green ends left/low, red mid, blue top-right
  const roiEnd = { x: 215, y: 195 };
  const menEnd = { x: 295, y: 130 };
  const impEnd = { x: 355, y: 60 };

  // Sharp curves — stay flat/horizontal as long as possible, then bend
  // upward sharply near the endpoint. Like an elbow or hockey stick.
  // ROI — runs flat then sharp upward bend
  const roiPath = `M ${startX} ${startY} C ${180} ${startY}, ${roiEnd.x} ${startY}, ${roiEnd.x} ${roiEnd.y}`;
  // Mentions — flat longer, then sharp upward
  const menPath = `M ${startX} ${startY} C ${220} ${startY}, ${menEnd.x} ${startY}, ${menEnd.x} ${menEnd.y}`;
  // Impressions — flat the longest, then very sharp upward
  const impPath = `M ${startX} ${startY} C ${260} ${startY}, ${impEnd.x} ${startY}, ${impEnd.x} ${impEnd.y}`;

  const cardRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); io.disconnect(); } },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Generous dash length — longer than any curve's actual length
  const DASH = 600;

  // Staggered delays: green (shortest) draws first, red second, blue last
  const roiDelay = "0s";
  const menDelay = "0.15s";
  const impDelay = "0.3s";
  const dur = "1.2s";

  return (
    <div ref={cardRef} className="relative w-full max-w-md mx-auto" style={{ height: 340 }}>
      <div className="absolute inset-0 bg-zinc-100 rounded-2xl overflow-hidden">
        {/* Property card — top-left */}
        <div className="absolute top-6 left-6 bg-white rounded-xl shadow-sm border border-zinc-200/60 px-4 py-3 flex items-center gap-3 z-10">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 flex-shrink-0" />
          <div>
            <p className="text-sm font-semibold text-zinc-800">lollapalooza 2025</p>
            <p className="text-xs text-zinc-400">Chicago, IL</p>
          </div>
        </div>

        {/* SVG curves */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox={`0 0 ${vw} ${vh}`}
          fill="none"
        >
          {/* Green — ROI (draws first) */}
          <path
            d={roiPath}
            stroke="#84CC16"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
            strokeDasharray={DASH}
            strokeDashoffset={visible ? 0 : DASH}
            style={{ transition: `stroke-dashoffset ${dur} cubic-bezier(0.4,0,0.2,1) ${roiDelay}` }}
          />
          {/* Red — Mentions (draws second) */}
          <path
            d={menPath}
            stroke="#EF4444"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
            strokeDasharray={DASH}
            strokeDashoffset={visible ? 0 : DASH}
            style={{ transition: `stroke-dashoffset ${dur} cubic-bezier(0.4,0,0.2,1) ${menDelay}` }}
          />
          {/* Blue — Impressions (draws last) */}
          <path
            d={impPath}
            stroke="#3B82F6"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
            strokeDasharray={DASH}
            strokeDashoffset={visible ? 0 : DASH}
            style={{ transition: `stroke-dashoffset ${dur} cubic-bezier(0.4,0,0.2,1) ${impDelay}` }}
          />

          {/* Endpoint dots — fade in after curves finish */}
          <circle
            cx={roiEnd.x} cy={roiEnd.y} r="4" fill="#84CC16"
            opacity={visible ? 1 : 0}
            style={{ transition: `opacity 0.3s ease ${roiDelay ? "1.2s" : "0s"}` }}
          />
          <circle
            cx={menEnd.x} cy={menEnd.y} r="4" fill="#EF4444"
            opacity={visible ? 1 : 0}
            style={{ transition: "opacity 0.3s ease 1.35s" }}
          />
          <circle
            cx={impEnd.x} cy={impEnd.y} r="4" fill="#3B82F6"
            opacity={visible ? 1 : 0}
            style={{ transition: "opacity 0.3s ease 1.5s" }}
          />
        </svg>

        {/* Badges — fade in + slide up after their curve finishes */}
        {/* ROI */}
        <span
          className="absolute px-3 py-1.5 rounded-full text-white text-xs font-semibold bg-lime-600 z-10 whitespace-nowrap shadow-sm transition-all duration-500"
          style={{
            top: "175px", left: "42%",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(8px)",
            transitionDelay: "1.2s",
          }}
        >
          ◎ 4.0x ROI
        </span>

        {/* Mentions */}
        <span
          className="absolute px-3 py-1.5 rounded-full text-white text-xs font-semibold bg-red-500 z-10 whitespace-nowrap shadow-sm transition-all duration-500"
          style={{
            top: "118px", right: "60px",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(8px)",
            transitionDelay: "1.35s",
          }}
        >
          ◎ 144 Mentions
        </span>

        {/* Impressions */}
        <span
          className="absolute px-3 py-1.5 rounded-full text-white text-xs font-semibold bg-blue-500 z-10 whitespace-nowrap shadow-sm transition-all duration-500"
          style={{
            top: "44px", right: "14px",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(8px)",
            transitionDelay: "1.5s",
          }}
        >
          ◎ 125.2M Impressions
        </span>
      </div>
    </div>
  );
}

export function PerformanceReporting() {
  return (
    <SectionReveal>
      <section className="py-24 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: text content */}
            <div className="flex flex-col gap-6">
              {/* Badge */}
              <span className="inline-flex items-center px-3 py-1 rounded-full border border-slate-200 text-sm text-slate-600 font-medium w-fit bg-white">
                Analytics
              </span>

              {/* Heading */}
              <h2 className="text-4xl lg:text-5xl font-normal tracking-[-0.02em] text-slate-900 leading-tight">
                Built-In Performance Reporting
              </h2>

              {/* Body */}
              <p className="text-lg text-slate-500 leading-relaxed">
                Measure success without extra tools. Track engagement, reach,
                and ROI on every campaign—so you get the credit and insights you
                deserve.
              </p>

              {/* CTA */}
              <div>
                <Link
                  href="/listings"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
                >
                  Measure Success
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right: metrics visualization */}
            <div>
              <MetricsVisualization />
            </div>
          </div>
        </div>
      </section>
    </SectionReveal>
  );
}
