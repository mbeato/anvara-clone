import { getPaginatedProperties, getAllProperties } from "@/lib/data";
import { BrowseClient } from "./_components/browse-client";

const PAGE_SIZE = 15;

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

  const pageRaw =
    typeof params.page === "string" ? parseInt(params.page) : NaN;
  const page = !isNaN(pageRaw) && pageRaw > 0 ? pageRaw : 1;

  const hasFilters = !!(
    category ||
    region ||
    minPrice !== undefined ||
    maxPrice !== undefined
  );

  const [{ properties, totalCount, totalPages }, allProperties] =
    await Promise.all([
      getPaginatedProperties(
        { category, region, minPrice, maxPrice },
        page,
        PAGE_SIZE
      ),
      getAllProperties(),
    ]);

  return (
    <BrowseClient
      properties={properties}
      allProperties={allProperties}
      currentFilters={{ category, region, minPrice, maxPrice }}
      hasFilters={hasFilters}
      currentPage={page}
      totalPages={totalPages}
      totalCount={totalCount}
    />
  );
}
