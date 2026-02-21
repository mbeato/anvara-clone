"use client";

import { useRouter, usePathname } from "next/navigation";
import type { getAllProperties } from "@/lib/data";
import { CategoryCarousel } from "./category-carousel";
import { CategoryTabRow } from "./category-tab-row";
import { PropertyCard } from "./property-card";

type Property = Awaited<ReturnType<typeof getAllProperties>>[number];

interface CurrentFilters {
  category?: string;
  region?: string;
  minPrice?: number;
  maxPrice?: number;
}

interface BrowseClientProps {
  properties: Property[];
  currentFilters: CurrentFilters;
  hasFilters: boolean;
}

export function BrowseClient({
  properties,
  currentFilters,
  hasFilters,
}: BrowseClientProps) {
  const router = useRouter();
  const pathname = usePathname();

  function updateFilter(key: string, value: string | undefined) {
    const params = new URLSearchParams();

    // Carry over existing filters
    if (currentFilters.category) params.set("category", currentFilters.category);
    if (currentFilters.region) params.set("region", currentFilters.region);
    if (currentFilters.minPrice !== undefined)
      params.set("minPrice", String(currentFilters.minPrice));
    if (currentFilters.maxPrice !== undefined)
      params.set("maxPrice", String(currentFilters.maxPrice));

    // Apply the new change
    if (value === undefined || value === "") {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    const qs = params.toString();
    router.replace(pathname + (qs ? "?" + qs : ""), { scroll: false });
  }

  function clearFilters() {
    router.replace(pathname, { scroll: false });
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Category image carousel */}
      <CategoryCarousel
        onCategoryClick={(slug) => updateFilter("category", slug)}
      />

      {/* Compact text-only category tab row */}
      <CategoryTabRow
        activeCategory={currentFilters.category}
        onCategoryChange={(slug) => updateFilter("category", slug)}
      />

      {/* FilterBar — wired in Plan 04-03 */}

      {/* RecommendationsStrip — wired in Plan 04-04 */}

      {/* Property count */}
      <p className="text-sm text-muted-foreground">
        {properties.length} {properties.length === 1 ? "property" : "properties"}
        {hasFilters && (
          <button
            onClick={clearFilters}
            className="ml-2 text-primary hover:underline"
          >
            Clear filters
          </button>
        )}
      </p>

      {/* Property grid */}
      <div
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
        data-has-filters={hasFilters ? "true" : "false"}
      >
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>

      {/* Empty state — will be replaced by EmptyState component in 04-03 */}
      {properties.length === 0 && (
        <p className="text-center text-muted-foreground py-12">
          No properties match your filters.
        </p>
      )}
    </div>
  );
}
