"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Mail,
  FileText,
  Paperclip,
  Clock,
  AlertTriangle,
  PhoneCall,
  MessageSquare,
  Send,
  CheckCircle2,
  DollarSign,
  BarChart2,
  CalendarCheck,
  Star,
} from "lucide-react";
import { SectionReveal } from "./section-reveal";

/* Recognizable brand icons as inline SVGs */
function AdobePdfIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className}>
      {/* Document body */}
      <path d="M6 2h14l8 8v20a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" fill="white" stroke="#ccc" strokeWidth="0.5"/>
      {/* Folded corner */}
      <path d="M20 2v6a2 2 0 0 0 2 2h6" fill="#e8e8e8" stroke="#ccc" strokeWidth="0.5"/>
      <path d="M20 2l8 8h-6a2 2 0 0 1-2-2V2z" fill="#e8e8e8"/>
      {/* Red banner */}
      <rect x="2" y="16" width="22" height="12" rx="1" fill="#D32F2F"/>
      {/* PDF text */}
      <text x="13" y="25" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold" fontFamily="Arial, sans-serif">PDF</text>
    </svg>
  );
}

function GmailIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <path d="M22 6.25V17.5c0 .69-.56 1.25-1.25 1.25H18V9.35l-6 4.5-6-4.5v9.4H3.25C2.56 18.75 2 18.19 2 17.5V6.25C2 5.01 3.01 4 4.25 4c.46 0 .91.16 1.27.45L12 9.75l6.48-5.3A2.25 2.25 0 0 1 22 6.25Z" fill="#EA4335"/>
      <path d="M6 9.35v9.4H3.25C2.56 18.75 2 18.19 2 17.5V6.25C2 5.01 3.01 4 4.25 4c.46 0 .91.16 1.27.45L6 4.95" fill="#4285F4"/>
      <path d="M18 9.35v9.4h2.75c.69 0 1.25-.56 1.25-1.25V6.25C22 5.01 20.99 4 19.75 4c-.46 0-.91.16-1.27.45L18 4.95" fill="#34A853"/>
      <path d="M6 4.95l6 4.8 6-4.8" stroke="#FBBC05" strokeWidth="0" fill="#FBBC05" opacity="0.8"/>
    </svg>
  );
}

function ExcelIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <rect width="24" height="24" rx="4" fill="#217346" />
      <path d="M6 7h4l2 3.5L14 7h4l-3.5 5L18 17h-4l-2-3.5L10 17H6l3.5-5L6 7Z" fill="white" />
    </svg>
  );
}

/* ───── BEFORE panel — absolute chaos, nothing aligned ───── */
function BeforePanel() {
  return (
    <div className="w-full h-full bg-zinc-50 rounded-l-2xl p-4 relative overflow-hidden">
      <span className="inline-flex items-center px-3 py-1 rounded-full bg-zinc-800 text-white text-[10px] font-semibold relative z-10">
        Before
      </span>

      {/* Scattered, overlapping, rotated mess */}

      {/* Big PDF doc — tilted, oversized, with Adobe icon */}
      <div
        className="absolute bg-white border-2 border-zinc-200 rounded-md shadow-md px-3 py-3 w-[190px]"
        style={{ top: "52px", left: "4px", transform: "rotate(-4deg)" }}
      >
        <div className="flex items-center gap-2 mb-1.5 min-w-0">
          <AdobePdfIcon className="w-6 h-6 flex-shrink-0" />
          <p className="text-[11px] font-bold text-zinc-800 truncate">SponsorDeck_FINAL_v3.pdf</p>
        </div>
        <p className="text-[9px] text-zinc-400 truncate">210 pages · 48 MB · 3 weeks ago</p>
        <div className="mt-2 h-1 bg-red-100 rounded-full w-full">
          <div className="h-1 bg-red-400 rounded-full w-[15%]" />
        </div>
      </div>

      {/* Urgent email — Gmail style, overlapping the PDF */}
      <div
        className="absolute bg-white border border-zinc-200 rounded-lg shadow-lg px-2.5 py-2 w-[175px]"
        style={{ top: "118px", left: "85px", transform: "rotate(2deg)", zIndex: 2 }}
      >
        <div className="flex items-center gap-1.5 mb-1 min-w-0">
          <GmailIcon className="w-4 h-4 flex-shrink-0" />
          <p className="text-[10px] font-bold text-zinc-800 truncate">URGENT: Contract Changes</p>
        </div>
        <p className="text-[9px] text-zinc-500 leading-tight line-clamp-2">Legal flagged 7 issues with the Lakers contract</p>
        <div className="flex items-center gap-1 mt-1.5 min-w-0">
          <AdobePdfIcon className="w-3 h-3 flex-shrink-0" />
          <p className="text-[7px] text-zinc-400 truncate">contract_redline_v4.pdf</p>
        </div>
      </div>

      {/* Tiny sticky note */}
      <div
        className="absolute bg-yellow-100 border border-yellow-300 rounded px-2 py-1.5 shadow-sm w-[95px]"
        style={{ top: "44px", right: "14px", transform: "rotate(6deg)", zIndex: 3 }}
      >
        <p className="text-[8px] text-yellow-800 font-medium leading-tight">Call Sarah back!! PGA wants pricing changes</p>
      </div>

      {/* Missed calls stacked */}
      <div
        className="absolute bg-white border border-zinc-200 rounded-md shadow px-2 py-1.5 w-[140px]"
        style={{ top: "200px", left: "10px", transform: "rotate(-2deg)" }}
      >
        <div className="flex items-center gap-1.5">
          <PhoneCall className="w-3 h-3 text-red-400" />
          <p className="text-[9px] text-red-600 font-semibold">3 Missed Calls</p>
        </div>
        <p className="text-[8px] text-zinc-400 mt-0.5">Sarah, Mike, Unknown</p>
      </div>

      {/* Gmail thread — long, squished */}
      <div
        className="absolute bg-white border border-zinc-300 rounded-lg shadow-md px-2 py-2 w-[165px]"
        style={{ top: "235px", right: "5px", transform: "rotate(-3deg)", zIndex: 2 }}
      >
        <div className="flex items-center gap-1.5 mb-1 min-w-0">
          <GmailIcon className="w-3.5 h-3.5 flex-shrink-0" />
          <p className="text-[9px] text-zinc-500">17 messages</p>
        </div>
        <p className="text-[10px] font-medium text-zinc-700 leading-tight truncate">Re: Re: Fwd: Pricing</p>
        <div className="flex gap-1 mt-1.5">
          <AdobePdfIcon className="w-3 h-3 flex-shrink-0" />
          <AdobePdfIcon className="w-3 h-3 flex-shrink-0" />
          <ExcelIcon className="w-3 h-3 flex-shrink-0" />
          <span className="text-[7px] text-zinc-400">+1</span>
        </div>
      </div>

      {/* Excel file — tilted other way */}
      <div
        className="absolute bg-white border border-zinc-200 rounded px-2 py-1.5 shadow w-[150px]"
        style={{ top: "305px", left: "30px", transform: "rotate(5deg)" }}
      >
        <div className="flex items-center gap-1.5 min-w-0">
          <ExcelIcon className="w-4 h-4 flex-shrink-0" />
          <div className="min-w-0">
            <p className="text-[9px] text-zinc-800 font-medium truncate">Invoice_Q3_DRAFT2.xlsx</p>
            <p className="text-[7px] text-red-500 truncate">⚠ Conflicts with sent</p>
          </div>
        </div>
      </div>

      {/* Notification badge — floating */}
      <div
        className="absolute bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-[10px] font-bold shadow-lg"
        style={{ top: "175px", right: "30px", zIndex: 4 }}
      >
        47
      </div>

      {/* Another sticky */}
      <div
        className="absolute bg-pink-50 border border-pink-200 rounded px-2 py-1 shadow-sm w-[90px]"
        style={{ top: "355px", left: "5px", transform: "rotate(-7deg)" }}
      >
        <p className="text-[7px] text-pink-700 font-medium leading-tight">WHERE IS THE SIGNED CONTRACT???</p>
      </div>

      {/* Another PDF floating */}
      <div
        className="absolute bg-white border border-zinc-200 rounded-md shadow px-2 py-1.5 w-[125px]"
        style={{ top: "365px", right: "15px", transform: "rotate(3deg)" }}
      >
        <div className="flex items-center gap-1.5 min-w-0">
          <AdobePdfIcon className="w-3.5 h-3.5 flex-shrink-0" />
          <div className="min-w-0">
            <p className="text-[8px] text-zinc-600 truncate">creative_assets.pdf</p>
            <p className="text-[7px] text-red-400">312 MB · Upload failed</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───── AFTER panel — clean Anvara UI, content pushed right ───── */
function AfterPanel() {
  return (
    <div className="w-full h-full bg-white rounded-r-2xl p-5 flex flex-col gap-3 overflow-hidden items-end">
      <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary text-white text-[10px] font-semibold mb-1">
        After
      </span>

      {/* Clean deal timeline — narrower, right-aligned */}
      <div className="flex flex-col gap-2 w-[85%]">
        {/* Offer sent */}
        <div className="flex items-center gap-2.5 bg-blue-50/60 border border-blue-100 rounded-lg px-3 py-2.5">
          <Send className="w-4 h-4 text-primary flex-shrink-0" />
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-semibold text-zinc-800">Offer Sent</p>
            <p className="text-[10px] text-zinc-400">PGA Tour · $120k Package</p>
          </div>
          <CheckCircle2 className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
        </div>

        {/* Message */}
        <div className="flex items-center gap-2.5 bg-zinc-50 border border-zinc-100 rounded-lg px-3 py-2.5">
          <MessageSquare className="w-4 h-4 text-primary flex-shrink-0" />
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-semibold text-zinc-800">New Message</p>
            <p className="text-[10px] text-zinc-400">Sarah accepted the terms</p>
          </div>
          <span className="text-[9px] text-primary font-semibold flex-shrink-0">2m ago</span>
        </div>

        {/* Contract signed */}
        <div className="flex items-center gap-2.5 bg-green-50/60 border border-green-100 rounded-lg px-3 py-2.5">
          <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-semibold text-zinc-800">Contract Signed</p>
            <p className="text-[10px] text-zinc-400">e-Signed by both parties</p>
          </div>
          <CalendarCheck className="w-3.5 h-3.5 text-zinc-300 flex-shrink-0" />
        </div>

        {/* Payment */}
        <div className="flex items-center gap-2.5 bg-zinc-50 border border-zinc-100 rounded-lg px-3 py-2.5">
          <DollarSign className="w-4 h-4 text-green-500 flex-shrink-0" />
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-semibold text-zinc-800">Payment Processed</p>
            <p className="text-[10px] text-zinc-400">$120,000.00 · Invoice #1042</p>
          </div>
          <CheckCircle2 className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
        </div>

        {/* Performance */}
        <div className="flex items-center gap-2.5 bg-zinc-50 border border-zinc-100 rounded-lg px-3 py-2.5">
          <BarChart2 className="w-4 h-4 text-primary flex-shrink-0" />
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-semibold text-zinc-800">Performance Report</p>
            <p className="text-[10px] text-zinc-400">2.4M impressions · 340% ROI</p>
          </div>
          <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400 flex-shrink-0" />
        </div>

        {/* New deal */}
        <div className="flex items-center gap-2.5 bg-blue-50/60 border border-blue-100 rounded-lg px-3 py-2.5">
          <Send className="w-4 h-4 text-primary flex-shrink-0" />
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-semibold text-zinc-800">Renewal Offer</p>
            <p className="text-[10px] text-zinc-400">PGA Tour · Season 2 at $150k</p>
          </div>
          <span className="text-[9px] text-primary font-semibold flex-shrink-0">New</span>
        </div>
      </div>
    </div>
  );
}

/* ───── Drag slider ───── */
function BeforeAfterSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sliderX, setSliderX] = useState(50); // percentage
  const dragging = useRef(false);

  const updateSlider = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setSliderX(Math.max(10, Math.min(90, pct)));
  }, []);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      dragging.current = true;
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      updateSlider(e.clientX);
    },
    [updateSlider]
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragging.current) return;
      updateSlider(e.clientX);
    },
    [updateSlider]
  );

  const onPointerUp = useCallback(() => {
    dragging.current = false;
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-md mx-auto rounded-2xl overflow-hidden shadow-xl border border-zinc-200 select-none touch-none"
      style={{ height: "420px" }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      {/* Before panel — full width, clipped by slider */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - sliderX}% 0 0)` }}
      >
        <BeforePanel />
      </div>

      {/* After panel — full width, clipped by slider */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 0 0 ${sliderX}%)` }}
      >
        <AfterPanel />
      </div>

      {/* Slider handle */}
      <div
        className="absolute top-0 bottom-0 z-20"
        style={{ left: `${sliderX}%`, transform: "translateX(-50%)" }}
      >
        {/* Vertical line */}
        <div className="w-[2px] h-full bg-zinc-400 mx-auto" />
        {/* Drag handle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white border-2 border-zinc-400 shadow-lg flex items-center justify-center cursor-grab active:cursor-grabbing">
          <div className="flex gap-[2px]">
            <div className="w-[2px] h-3 bg-zinc-400 rounded-full" />
            <div className="w-[2px] h-3 bg-zinc-400 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───── Section ───── */
export function AZExecution() {
  return (
    <SectionReveal>
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: before/after slider */}
            <div className="flex justify-center pb-8">
              <BeforeAfterSlider />
            </div>

            {/* Right: text content */}
            <div className="flex flex-col gap-6">
              <span className="inline-flex items-center px-3 py-1 rounded-full border border-slate-200 text-sm text-slate-600 font-medium w-fit">
                A-Z Execution
              </span>

              <h2 className="text-4xl lg:text-5xl font-normal tracking-[-0.02em] text-slate-900 leading-tight">
                No more endless decks &amp; emails. A-Z execution in one place.
              </h2>

              <p className="text-lg text-slate-500 leading-relaxed">
                Anvara is the operating system for sponsorship deals—start to
                finish. Send offers, sign contracts, pay, share creative, and
                track performance in one streamlined flow. Bring deals to life
                faster, with less friction.
              </p>

              <div>
                <Link
                  href="/listings"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
                >
                  Make a Deal
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SectionReveal>
  );
}
