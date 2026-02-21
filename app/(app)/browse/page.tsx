import { filterProperties, getAllProperties } from "@/lib/data";
import { BrowseClient } from "./_components/browse-client";

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

  const hasFilters = !!(
    category ||
    region ||
    minPrice !== undefined ||
    maxPrice !== undefined
  );

  // Fetch full list once — reuse for display when no filters, pass to BrowseClient for recommendations
  const allProperties = await getAllProperties();

  const properties = hasFilters
    ? await filterProperties({ category, region, minPrice, maxPrice })
    : allProperties;

  // BROWSE-14: cap at 8 when filtering by category tab
  const displayProperties = category ? properties.slice(0, 8) : properties;

  return (
    <BrowseClient
      properties={displayProperties}
      allProperties={allProperties}
      currentFilters={{ category, region, minPrice, maxPrice }}
      hasFilters={hasFilters}
    />
  );
}
