"use client";

import { useCallback, useMemo } from "react";
import { useRouter, usePathname } from "next/navigation";
import type { getAllProperties } from "@/lib/data";
import { CategoryCarousel } from "./category-carousel";
import { CategoryTabRow } from "./category-tab-row";
import { PropertyCard } from "./property-card";
import { FilterBar } from "./filter-bar";
import { ActiveFilterChips } from "./active-filter-chips";
import { EmptyState } from "./empty-state";
import { RecommendationsStrip } from "./recommendations-strip";

type Property = Awaited<ReturnType<typeof getAllProperties>>[number];

interface CurrentFilters {
  category?: string;
  region?: string;
  minPrice?: number;
  maxPrice?: number;
}

interface BrowseClientProps {
  properties: Property[];
  allProperties: Property[];
  currentFilters: CurrentFilters;
  hasFilters: boolean;
}

const PRICE_MAX = 150000;

export function BrowseClient({
  properties,
  allProperties,
  currentFilters,
  hasFilters,
}: BrowseClientProps) {
  const router = useRouter();
  const pathname = usePathname();

  // Mock-personalized recommendations: featured properties first, fill to 6
  const recommendedProperties = useMemo(() => {
    const featured = allProperties.filter((p) => p.featured);
    const nonFeatured = allProperties.filter((p) => !p.featured);
    return [
      ...featured,
      ...nonFeatured.slice(0, Math.max(0, 5 - featured.length)),
    ].slice(0, 6);
  }, [allProperties]);

  function updateFilter(key: string, value: string | undefined) {
    const params = new URLSearchParams();
    if (currentFilters.category) params.set("category", currentFilters.category);
    if (currentFilters.region) params.set("region", currentFilters.region);
    if (currentFilters.minPrice !== undefined)
      params.set("minPrice", String(currentFilters.minPrice));
    if (currentFilters.maxPrice !== undefined)
      params.set("maxPrice", String(currentFilters.maxPrice));
    if (value === undefined || value === "") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    const qs = params.toString();
    router.replace(pathname + (qs ? "?" + qs : ""), { scroll: false });
  }

  const handlePriceChange = useCallback(
    (min: number | undefined, max: number | undefined) => {
      const params = new URLSearchParams();
      if (currentFilters.category) params.set("category", currentFilters.category);
      if (currentFilters.region) params.set("region", currentFilters.region);
      if (min && min > 0) params.set("minPrice", String(min));
      if (max && max < PRICE_MAX) params.set("maxPrice", String(max));
      const qs = params.toString();
      router.replace(pathname + (qs ? "?" + qs : ""), { scroll: false });
    },
    [currentFilters, pathname, router]
  );

  const removeFilter = useCallback(
    (key: string) => {
      const params = new URLSearchParams();
      if (key !== "category" && currentFilters.category) params.set("category", currentFilters.category);
      if (key !== "region" && currentFilters.region) params.set("region", currentFilters.region);
      if (key !== "minPrice" && currentFilters.minPrice !== undefined) params.set("minPrice", String(currentFilters.minPrice));
      if (key !== "maxPrice" && currentFilters.maxPrice !== undefined) params.set("maxPrice", String(currentFilters.maxPrice));
      const qs = params.toString();
      router.replace(pathname + (qs ? "?" + qs : ""), { scroll: false });
    },
    [currentFilters, pathname, router]
  );

  function clearFilters() {
    router.replace(pathname, { scroll: false });
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Auto-scrolling category image carousel */}
      <CategoryCarousel
        onCategoryClick={(slug) => updateFilter("category", slug)}
      />

      {/* Compact text-only category tab row */}
      <CategoryTabRow
        activeCategory={currentFilters.category}
        onCategoryChange={(slug) => updateFilter("category", slug)}
      />

      {/* Filter bar: region, event type, price range */}
      <FilterBar
        currentFilters={currentFilters}
        onFilterChange={updateFilter}
        onPriceChange={handlePriceChange}
      />

      {/* Active filter chips with individual removal */}
      <ActiveFilterChips
        currentFilters={currentFilters}
        onRemoveFilter={removeFilter}
        onClearAll={clearFilters}
      />

      {/* Recommendations strip — hidden when any filters are active */}
      {!hasFilters && <RecommendationsStrip properties={recommendedProperties} />}

      {/* Property count */}
      <p className="text-sm text-muted-foreground">
        {properties.length}{" "}
        {properties.length === 1 ? "property" : "properties"}
      </p>

      {/* Property grid */}
      {properties.length === 0 ? (
        <EmptyState onClearFilters={clearFilters} />
      ) : (
        <div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
          data-has-filters={hasFilters ? "true" : "false"}
        >
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}
    </div>
  );
}
