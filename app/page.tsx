import { getAllProperties } from "@/lib/data";
import { HeroSection } from "./_components/landing/hero-section";
import { BrandLogosBar } from "./_components/landing/brand-logos-bar";
import { WhatIsAnvara } from "./_components/landing/what-is-anvara";
import { AccessMarket } from "./_components/landing/access-market";
import { AZExecution } from "./_components/landing/az-execution";
import { PerformanceReporting } from "./_components/landing/performance-reporting";
import { AnvaraIntelligence } from "./_components/landing/anvara-intelligence";
import { ForBrandsRightsholders } from "./_components/landing/for-brands-rightsholders";
import { Testimonial } from "./_components/landing/testimonial";
import { FaqSection } from "./_components/landing/faq-section";
import { FinalCTA } from "./_components/landing/final-cta";
import { LandingFooter } from "./_components/landing/landing-footer";
import { LandingNavbar } from "./_components/landing/landing-navbar";

export default async function LandingPage() {
  const rawProperties = await getAllProperties();

  // Map Prisma's imageUrl field to heroImage expected by landing section components
  const properties = rawProperties.map((p) => ({
    id: p.id,
    name: p.name,
    category: p.category,
    subcategory: p.subcategory,
    region: p.region,
    heroImage: p.imageUrl,
  }));

  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      {/* Sticky navbar — adaptive dark/light */}
      <LandingNavbar />

      {/* Section 1: Hero — Video bg, headline, CTA, snap carousel */}
      <HeroSection properties={properties} />

      {/* Section 3: What is Anvara — rotating text, 3D tokens */}
      <WhatIsAnvara />

      {/* Section 4: Access the Whole Market — property list, CTA */}
      <AccessMarket properties={properties} />

      {/* Section 5: A-Z Execution — Before/After mockup */}
      <AZExecution />

      {/* Section 6: Performance Reporting — metrics visualization */}
      <PerformanceReporting />

      {/* Section 7: Anvara Intelligence — AI flow diagram */}
      <AnvaraIntelligence />

      {/* Section 8: For Brands / For Rightsholders — logo grids */}
      <ForBrandsRightsholders />

      {/* Section 9: Testimonial — GoPuff quote */}
      <Testimonial />

      {/* Section 10: FAQ — 6 accordion items */}
      <FaqSection />

      {/* Section 11: Final CTA — blue banner + marquee */}
      <FinalCTA properties={properties} />

      {/* Section 12: Footer */}
      <LandingFooter />
    </main>
  );
}
