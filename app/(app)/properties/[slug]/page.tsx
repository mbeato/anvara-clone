import { notFound } from "next/navigation"
import { getPropertyBySlug } from "@/lib/data"
import { PropertyHero } from "@/components/property-detail/property-hero"
import { PropertyMeta } from "@/components/property-detail/property-meta"
import { PropertyAbout } from "@/components/property-detail/property-about"
import { PropertyTiers } from "@/components/property-detail/property-tiers"
import { BuildOfferForm } from "@/components/property-detail/build-offer-form"
import { OfferSidebar } from "@/components/property-detail/offer-sidebar"

export default async function PropertyDetailPage({
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
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="grid grid-cols-5 gap-8 items-start">
        {/* Left column — 60% */}
        <div className="col-span-3">
          <PropertyHero images={[property.imageUrl]} />
          <div className="mt-6 space-y-8">
            <PropertyMeta property={property} />
            <PropertyAbout description={property.description} />
            <PropertyTiers packages={property.packages} />
            <div id="build-offer">
              <BuildOfferForm />
            </div>
          </div>
        </div>

        {/* Right column — 40%, sticky */}
        <div className="col-span-2 sticky top-20">
          <OfferSidebar
            propertyId={property.id}
            propertyName={property.name}
            priceFrom={property.priceFrom}
            packageCount={property.packages.length}
          />
        </div>
      </div>
    </div>
  )
}

export async function generateStaticParams() {
  return []
}
