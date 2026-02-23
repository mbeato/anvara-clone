import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { getAllProperties } from "@/lib/data";

type Property = Awaited<ReturnType<typeof getAllProperties>>[number];

const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
  notation: "compact",
});

export function PropertyCard({ property }: { property: Property }) {
  // Audience fit badge logic (BROWSE-11)
  const fitBadge = property.featured
    ? { label: "Great Match", variant: "default" as const }
    : {
        label: `${Math.min(60 + property.tags.length * 8, 95)}% Fit`,
        variant: "secondary" as const,
      };

  // Price display — never show $0 (BROWSE-13)
  const priceDisplay =
    property.priceFrom > 0
      ? `From ${priceFormatter.format(property.priceFrom)}`
      : "Request Quote";

  // Start date — take the first part before "—"
  const startDate = property.availability.split("—")[0].trim();

  return (
    <Link href={`/listings/${property.slug}`} className="group block">
      <div className="rounded-lg sm:rounded-xl border bg-card overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
        {/* Image container */}
        <div className="relative aspect-[3/2] sm:aspect-[2/1] overflow-hidden bg-muted">
          <Image
            src={property.imageUrl}
            alt={property.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
          />
          {/* Audience fit badge */}
          <Badge
            variant={fitBadge.variant}
            className={
              fitBadge.variant === "default"
                ? "absolute top-1 right-1 sm:top-2 sm:right-2 text-[9px] sm:text-xs px-1.5 sm:px-2.5 py-0 sm:py-0.5 bg-primary text-primary-foreground"
                : "absolute top-1 right-1 sm:top-2 sm:right-2 text-[9px] sm:text-xs px-1.5 sm:px-2.5 py-0 sm:py-0.5"
            }
          >
            {fitBadge.label}
          </Badge>
        </div>

        {/* Content area */}
        <div className="p-1.5 sm:p-3 space-y-0.5">
          <p className="font-semibold text-[11px] sm:text-sm line-clamp-1 leading-tight">{property.name}</p>
          <p className="text-[10px] sm:text-xs text-muted-foreground line-clamp-1 leading-tight">
            {property.tagline}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-[10px] sm:text-xs font-medium min-w-0 truncate">{priceDisplay}</span>
            <span className="text-[10px] sm:text-xs text-muted-foreground shrink-0 pl-1 hidden sm:inline">{startDate}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
