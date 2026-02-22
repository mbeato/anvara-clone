"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const NAV_LINKS = [
  { label: "For Brands", href: "#" },
  { label: "For Rightsholders", href: "#" },
  { label: "For Agencies", href: "#" },
  { label: "Customers", href: "#" },
  { label: "Resources", href: "#" },
  { label: "Pricing", href: "#" },
];

export function LandingNavbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Flip to light mode once we pass the hero (~90vh)
      setScrolled(window.scrollY > window.innerHeight * 0.85);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm"
          : "bg-black/30 backdrop-blur-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo — swap between white and blue versions */}
        <Link href="/" className="relative shrink-0 h-8 w-[120px]">
          <Image
            src="/anvara-logo-white.png"
            alt="Anvara"
            fill
            className={`object-contain object-left transition-opacity duration-300 ${
              scrolled ? "opacity-0" : "opacity-100"
            }`}
            sizes="120px"
            priority
          />
          <Image
            src="/anvara-logo-blue.png"
            alt="Anvara"
            fill
            className={`object-contain object-left transition-opacity duration-300 ${
              scrolled ? "opacity-100" : "opacity-0"
            }`}
            sizes="120px"
            priority
          />
        </Link>

        {/* Center nav links — hidden on mobile */}
        <div className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors duration-300 ${
                scrolled
                  ? "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right side — CTA + Login */}
        <div className="flex items-center gap-3">
          <Link
            href="/browse"
            className={`hidden sm:inline-flex text-sm font-medium transition-colors duration-300 ${
              scrolled
                ? "text-zinc-600 hover:text-zinc-900"
                : "text-white/70 hover:text-white"
            }`}
          >
            Log in
          </Link>
          <Link
            href="/browse"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-white text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Try Anvara Free
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </nav>
  );
}
