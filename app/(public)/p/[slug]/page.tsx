import { notFound } from "next/navigation"
import { getPropertyBySlug } from "@/lib/data"
import { PropertyHero } from "@/components/property-detail/property-hero"
import { PropertyMeta } from "@/components/property-detail/property-meta"
import { PropertyAbout } from "@/components/property-detail/property-about"
import { LockedSection } from "@/components/public-listing/locked-section"

export default async function PublicListingPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const property = await getPropertyBySlug(slug)

  if (!property) {
    notFound()
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
        {/* Left column — title, meta, image */}
        <div className="lg:col-span-3">
          <PropertyMeta property={property} />
          <div className="mt-4">
            <PropertyHero images={[property.imageUrl]} />
          </div>
        </div>

        {/* Right column — about, locked sections */}
        <div className="lg:col-span-2 space-y-8 lg:sticky lg:top-24">
          <PropertyAbout description={property.description} />
          <LockedSection title="Sponsorship Tiers" />
          <LockedSection title="Audience Demographics" />
        </div>
      </div>
    </div>
  )
}

export async function generateStaticParams() {
  return []
}
