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
      <div className="rounded-xl border bg-card overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
        {/* Image container */}
        <div className="relative aspect-[2/1] overflow-hidden bg-muted">
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
                ? "absolute top-2 right-2 bg-primary text-primary-foreground"
                : "absolute top-2 right-2"
            }
          >
            {fitBadge.label}
          </Badge>
        </div>

        {/* Content area */}
        <div className="p-3 space-y-1">
          <p className="font-semibold text-sm line-clamp-1">{property.name}</p>
          <p className="text-xs text-muted-foreground line-clamp-1">
            {property.tagline}
          </p>
          <div className="flex items-center justify-between pt-1">
            <span className="text-xs font-medium min-w-0 truncate">{priceDisplay}</span>
            <span className="text-xs text-muted-foreground shrink-0 pl-1">{startDate}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
