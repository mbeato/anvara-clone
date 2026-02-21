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

  let properties = hasFilters
    ? await filterProperties({ category, region, minPrice, maxPrice })
    : await getAllProperties();

  // BROWSE-14: cap at 8 when filtering by category tab
  if (category) {
    properties = properties.slice(0, 8);
  }

  return (
    <BrowseClient
      properties={properties}
      currentFilters={{ category, region, minPrice, maxPrice }}
      hasFilters={hasFilters}
    />
  );
}
