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
      className="group relative block w-[320px] h-[210px] flex-shrink-0 rounded-xl overflow-hidden border border-white/20 shadow-lg shadow-black/20"
    >
      {/* Top 55% — image only */}
      <div className="relative w-full h-[55%] overflow-hidden">
        <Image
          src={property.heroImage}
          alt={property.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="320px"
        />
      </div>

      {/* Bottom 45% — liquid glass panel */}
      <div className="relative h-[45%] bg-white/10 backdrop-blur-xl backdrop-saturate-[180%] border-t border-white/20 px-3 py-2 flex flex-col justify-center">
        <h3 className="text-white text-sm font-semibold leading-tight truncate">
          {property.name}
        </h3>
        <p className="text-white/60 text-xs mt-0.5 truncate">
          {property.subcategory || property.category} · {property.region}
        </p>
      </div>
    </Link>
  );
}
