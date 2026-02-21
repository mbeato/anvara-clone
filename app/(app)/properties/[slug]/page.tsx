import { notFound } from "next/navigation"
import { getPropertyBySlug } from "@/lib/data"
import { PropertyHero } from "@/components/property-detail/property-hero"
import { PropertyMeta } from "@/components/property-detail/property-meta"
import { PropertyAbout } from "@/components/property-detail/property-about"

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
        <div className="col-span-3">
          <PropertyHero images={[property.imageUrl]} />
          <div className="mt-6 space-y-8">
            <PropertyMeta property={property} />
            <PropertyAbout description={property.description} />
            {/* Tiers, demographics, categories, formats — added in Plans 03-02 and 03-03 */}
          </div>
        </div>
        <div className="col-span-2 sticky top-20">
          {/* OfferSidebar — added in Plan 03-02 */}
          <div className="rounded-lg border p-6 text-sm text-muted-foreground">
            Offer sidebar placeholder
          </div>
        </div>
      </div>
    </div>
  )
}

export async function generateStaticParams() {
  return []
}
