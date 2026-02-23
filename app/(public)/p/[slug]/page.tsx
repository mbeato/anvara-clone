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
    <div className="max-w-4xl mx-auto px-4 py-8">
      <PropertyMeta property={property} />
      <div className="mt-4">
        <PropertyHero images={[property.imageUrl]} />
      </div>
      <div className="mt-8 space-y-10">
        <PropertyAbout description={property.description} />
        <LockedSection title="Sponsorship Tiers" />
        <LockedSection title="Audience Demographics" />
        <LockedSection title="Activation Formats" />
      </div>
    </div>
  )
}

export async function generateStaticParams() {
  return []
}
