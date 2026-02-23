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
import { RecommendationsStrip, ListingStrip } from "./recommendations-strip";
import { Pagination } from "./pagination";

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
  currentPage: number;
  totalPages: number;
  totalCount: number;
}

const PRICE_MAX = 150000;

export function BrowseClient({
  properties,
  allProperties,
  currentFilters,
  hasFilters,
  currentPage,
  totalPages,
  totalCount,
}: BrowseClientProps) {
  const router = useRouter();
  const pathname = usePathname();

  // Newest listings: reverse order to simulate newest first, take 12
  const newestProperties = useMemo(() => {
    return [...allProperties].reverse().slice(0, 12);
  }, [allProperties]);

  // Mock-personalized recommendations: featured properties first, fill to 12
  const recommendedProperties = useMemo(() => {
    const featured = allProperties.filter((p) => p.featured);
    const nonFeatured = allProperties.filter((p) => !p.featured);
    return [
      ...featured,
      ...nonFeatured.slice(0, Math.max(0, 12 - featured.length)),
    ].slice(0, 12);
  }, [allProperties]);

  function updateFilter(key: string, value: string | undefined) {
    // Always reset to page 1 when filters change
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
      // Reset to page 1 on price change
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
      // Reset to page 1 on filter removal
      const qs = params.toString();
      router.replace(pathname + (qs ? "?" + qs : ""), { scroll: false });
    },
    [currentFilters, pathname, router]
  );

  function clearFilters() {
    router.replace(pathname, { scroll: false });
  }

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6 space-y-4 sm:space-y-6">
      {/* Auto-scrolling category image carousel */}
      <CategoryCarousel
        onCategoryClick={(slug) => updateFilter("category", slug)}
      />

      {/* Newest listings strip */}
      {!hasFilters && currentPage === 1 && (
        <ListingStrip
          title="Newest Listings"
          subtitle="Just added to the marketplace"
          properties={newestProperties}
        />
      )}

      {/* Recommendations strip — hidden when any filters are active */}
      {!hasFilters && currentPage === 1 && (
        <div className="!mt-2">
          <RecommendationsStrip properties={recommendedProperties} />
        </div>
      )}

      {/* Category tabs + filter controls */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
        <CategoryTabRow
          activeCategory={currentFilters.category}
          onCategoryChange={(slug) => updateFilter("category", slug)}
        />
        <div className="hidden sm:flex">
          <FilterBar
            currentFilters={currentFilters}
            onFilterChange={updateFilter}
            onPriceChange={handlePriceChange}
          />
        </div>
      </div>

      {/* Mobile filter bar — stacked below tabs */}
      <div className="sm:hidden">
        <FilterBar
          currentFilters={currentFilters}
          onFilterChange={updateFilter}
          onPriceChange={handlePriceChange}
        />
      </div>

      {/* Active filter chips with individual removal */}
      <ActiveFilterChips
        currentFilters={currentFilters}
        onRemoveFilter={removeFilter}
        onClearAll={clearFilters}
      />

      {/* Property grid */}
      {properties.length === 0 ? (
        <EmptyState onClearFilters={clearFilters} />
      ) : (
        <div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 !mt-2"
          data-has-filters={hasFilters ? "true" : "false"}
        >
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}

      {/* Listing count + pagination below grid */}
      <div className="flex items-center justify-between !mt-2">
        <p className="text-sm text-muted-foreground">
          {totalCount}{" "}
          {totalCount === 1 ? "listing" : "listings"}
        </p>
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
          />
        )}
      </div>
    </div>
  );
}
