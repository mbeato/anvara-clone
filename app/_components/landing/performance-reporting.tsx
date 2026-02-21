import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionReveal } from "./section-reveal";

function MetricsVisualization() {
  return (
    <div className="relative w-full max-w-md mx-auto" style={{ height: 320 }}>
      {/* Background card */}
      <div className="absolute inset-0 bg-slate-100 rounded-2xl" />

      {/* Property card */}
      <div className="absolute top-8 left-8 bg-white rounded-xl shadow-sm border border-slate-100 px-4 py-3 flex items-center gap-3 z-10">
        {/* Avatar: gradient square mimicking Lollapalooza colorful artwork */}
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 flex-shrink-0" />
        <div>
          <p className="text-sm font-semibold text-slate-800">lollapalooza 2025</p>
          <p className="text-xs text-slate-400">Chicago, IL</p>
        </div>
      </div>

      {/* SVG curved lines — drawn from card center to each badge */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 400 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: "visible" }}
      >
        {/* Blue line to Impressions (top-right) */}
        <path
          d="M 130 60 Q 260 40 310 68"
          stroke="#3B82F6"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        {/* Red line to Mentions (center-right) */}
        <path
          d="M 130 60 Q 200 100 280 130"
          stroke="#EF4444"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        {/* Green line to ROI (bottom-left) */}
        <path
          d="M 100 68 Q 80 180 80 215"
          stroke="#84CC16"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
      </svg>

      {/* Badge: 125.2M Impressions — top-right */}
      <span className="absolute top-12 right-4 px-3 py-1.5 rounded-full text-white text-xs font-semibold bg-blue-500 z-10 whitespace-nowrap shadow-sm">
        ◎ 125.2M Impressions
      </span>

      {/* Badge: 144 Mentions — center-right */}
      <span className="absolute top-1/2 right-8 -translate-y-1/2 px-3 py-1.5 rounded-full text-white text-xs font-semibold bg-red-500 z-10 whitespace-nowrap shadow-sm">
        ◎ 144 Mentions
      </span>

      {/* Badge: 4.0x ROI — bottom-left */}
      <span className="absolute bottom-12 left-8 px-3 py-1.5 rounded-full text-white text-xs font-semibold bg-lime-600 z-10 whitespace-nowrap shadow-sm">
        ◎ 4.0x ROI
      </span>
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
              <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
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
                  href="/browse"
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
