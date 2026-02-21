import { filterProperties, getAllProperties } from "@/lib/data";
import { PropertyCard } from "./_components/property-card";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function BrowsePage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;

  const category =
    typeof params.category === "string" ? params.category : undefined;
  const region =
    typeof params.region === "string" ? params.region : undefined;
  const minPriceRaw =
    typeof params.minPrice === "string" ? parseInt(params.minPrice) : NaN;
  const maxPriceRaw =
    typeof params.maxPrice === "string" ? parseInt(params.maxPrice) : NaN;
  const minPrice = !isNaN(minPriceRaw) ? minPriceRaw : undefined;
  const maxPrice = !isNaN(maxPriceRaw) ? maxPriceRaw : undefined;

  const hasFilters = !!(category || region || minPrice !== undefined || maxPrice !== undefined);

  let properties = hasFilters
    ? await filterProperties({ category, region, minPrice, maxPrice })
    : await getAllProperties();

  // BROWSE-14: cap at 8 when filtering by category tab
  if (category) {
    properties = properties.slice(0, 8);
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Browse Properties</h1>

      {/* Carousel placeholder — implemented in 04-02 */}
      <div className="w-full h-48 rounded-xl bg-muted flex items-center justify-center text-muted-foreground">
        Carousel placeholder
      </div>

      {/* Category tabs placeholder — implemented in 04-02 */}
      <div className="h-10 flex items-center text-muted-foreground">
        Category tabs placeholder
      </div>

      {/* Filter bar placeholder — implemented in 04-03 */}
      <div className="h-10 flex items-center text-muted-foreground">
        Filter bar placeholder
      </div>

      {/* Property grid */}
      {/* data-has-filters used by recommendations strip in 04-04 */}
      <div
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
        data-has-filters={hasFilters ? "true" : "false"}
      >
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>

      {properties.length === 0 && (
        <p className="text-center text-muted-foreground py-12">
          No properties match your filters.
        </p>
      )}
    </div>
  );
}
