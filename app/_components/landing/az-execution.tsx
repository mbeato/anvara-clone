import Link from "next/link";
import { ArrowRight, MessageSquare, FileText, Calendar, Check, BarChart2 } from "lucide-react";
import { SectionReveal } from "./section-reveal";

const dealItems = [
  {
    name: "Los Angeles",
    subtitle: "Sponsor Deck Attached",
    detail: "210 pages",
    avatarBg: "bg-red-500",
    avatarText: "LA",
    badge: { label: "New", color: "bg-blue-500 text-white" },
    statusIcon: null,
  },
  {
    name: "Lakers",
    subtitle: "Sponsor Deck Attached",
    detail: "210 pages",
    avatarBg: "bg-purple-600",
    avatarText: "LAL",
    badge: { label: "Uploaded", color: "bg-slate-700 text-white" },
    statusIcon: null,
  },
  {
    name: "Disney",
    subtitle: "Sorry to bother, we're p...",
    detail: "",
    avatarBg: "bg-red-500",
    avatarText: "D",
    badge: null,
    statusIcon: null,
  },
  {
    name: "PGA Tour",
    subtitle: "Sponsor Deck Attached",
    detail: "107 pages",
    avatarBg: "bg-green-600",
    avatarText: "PGA",
    badge: { label: "Is uploaded", color: "bg-slate-600 text-white" },
    statusIcon: null,
  },
];

function BeforeAfterMockup() {
  return (
    <div className="relative bg-white rounded-2xl shadow-xl border border-slate-100 p-6 w-full max-w-sm mx-auto">
      {/* Before / After pills */}
      <div className="flex justify-between mb-5">
        <span className="px-4 py-1.5 rounded-full bg-slate-800 text-white text-xs font-semibold">
          Before
        </span>
        <span className="px-4 py-1.5 rounded-full bg-slate-800 text-white text-xs font-semibold">
          After
        </span>
      </div>

      {/* Deal items list */}
      <div className="flex flex-col gap-2">
        {dealItems.map((item) => (
          <div
            key={item.name}
            className="flex items-center gap-3 bg-slate-50 rounded-xl px-3 py-2.5 border border-slate-100"
          >
            {/* Avatar */}
            <div
              className={`w-8 h-8 rounded-full ${item.avatarBg} flex items-center justify-center flex-shrink-0`}
            >
              <span className="text-white text-[9px] font-bold leading-none">
                {item.avatarText}
              </span>
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-slate-800 truncate">
                {item.name}
              </p>
              <p className="text-[10px] text-slate-400 truncate leading-tight">
                {item.subtitle}
                {item.detail && (
                  <span className="ml-1 text-slate-300">{item.detail}</span>
                )}
              </p>
            </div>

            {/* Badge */}
            {item.badge && (
              <span
                className={`text-[9px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ${item.badge.color}`}
              >
                {item.badge.label}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Floating action bar */}
      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800 text-white shadow-lg">
        <MessageSquare className="w-3.5 h-3.5" />
        <FileText className="w-3.5 h-3.5" />
        <Calendar className="w-3.5 h-3.5" />
        <Check className="w-3.5 h-3.5" />
        <BarChart2 className="w-3.5 h-3.5" />
      </div>
    </div>
  );
}

export function AZExecution() {
  return (
    <SectionReveal>
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: mockup illustration */}
            <div className="flex justify-center pb-8">
              <BeforeAfterMockup />
            </div>

            {/* Right: text content */}
            <div className="flex flex-col gap-6">
              {/* Badge */}
              <span className="inline-flex items-center px-3 py-1 rounded-full border border-slate-200 text-sm text-slate-600 font-medium w-fit">
                A-Z Execution
              </span>

              {/* Heading */}
              <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
                No more endless decks &amp; emails. A-Z execution in one place.
              </h2>

              {/* Body */}
              <p className="text-lg text-slate-500 leading-relaxed">
                Anvara is the operating system for sponsorship deals—start to
                finish. Send offers, sign contracts, pay, share creative, and
                track performance in one streamlined flow. Bring deals to life
                faster, with less friction.
              </p>

              {/* CTA */}
              <div>
                <Link
                  href="/browse"
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
