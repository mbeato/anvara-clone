import Link from "next/link";
import Image from "next/image";

// Use the Prisma return type from getAllProperties
type Property = {
  id: string;
  name: string;
  category: string;
  subcategory: string | null;
  region: string;
  heroImage: string;
};

interface LandingPropertyCardProps {
  property: Property;
}

export function LandingPropertyCard({ property }: LandingPropertyCardProps) {
  return (
    <Link
      href={`/properties/${property.id}`}
      className="group relative block w-[280px] h-[180px] flex-shrink-0 rounded-xl overflow-hidden"
    >
      <Image
        src={property.heroImage}
        alt={property.name}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes="280px"
      />
      {/* Dark gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      {/* Text overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-3">
        <h3 className="text-white text-sm font-semibold leading-tight truncate">
          {property.name}
        </h3>
        <p className="text-white/70 text-xs mt-0.5">
          {property.subcategory || property.category} · {property.region}
        </p>
      </div>
    </Link>
  );
}
