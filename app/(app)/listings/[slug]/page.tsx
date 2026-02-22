import { notFound } from "next/navigation"
import { getPropertyBySlug } from "@/lib/data"
import { PropertyHero } from "@/components/property-detail/property-hero"
import { PropertyMeta } from "@/components/property-detail/property-meta"
import { PropertyAbout } from "@/components/property-detail/property-about"
import { OfferSidebar } from "@/components/property-detail/offer-sidebar"
import { PropertyDemographics } from "@/components/property-detail/property-demographics"
import { PropertyCategories } from "@/components/property-detail/property-categories"
import { PropertyFormats } from "@/components/property-detail/property-formats"

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
          <PropertyMeta property={property} />
          <div className="mt-4">
            <PropertyHero images={[property.imageUrl]} />
          </div>
          <div className="mt-6 space-y-8">
            {/* About this Listing */}
            <PropertyAbout description={property.description} />

            {/* Audience demographics */}
            <PropertyDemographics
              audienceGender={property.audienceGender}
              audienceAgeRange={property.audienceAgeRange}
              audienceIncome={property.audienceIncome}
              audienceTotalReach={property.audienceTotalReach}
              tags={property.tags}
            />

            {/* Ideal Brand Categories */}
            <PropertyCategories tags={property.tags} />

            {/* Activation Formats */}
            <PropertyFormats
              category={property.category}
              subcategory={property.subcategory}
            />
          </div>
        </div>

        {/* Right column — 40%, sticky */}
        <div className="col-span-2 sticky top-20 mt-20">
          <OfferSidebar
            propertyId={property.id}
            propertyName={property.name}
            priceFrom={property.priceFrom}
            packages={property.packages}
          />
        </div>
      </div>
    </div>
  )
}

export async function generateStaticParams() {
  return []
}
