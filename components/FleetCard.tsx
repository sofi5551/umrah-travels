import Image from "next/image";
import Link from "next/link";
import { Vehicle } from "@/lib/data";

export default function FleetCard({
  vehicle,
  whatsappNumber,
}: {
  vehicle: Vehicle;
  whatsappNumber: string;
}) {
  const whatsappHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    `Asalam-o-Alaikum! I want to get a quotation for the ${vehicle.name}.`
  )}`;

  return (
    <div className="group flex h-full flex-col border border-sandline bg-white transition-colors hover:border-gold">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-sand">
        {vehicle.image && (
          <Image
            src={vehicle.image}
            alt={vehicle.imageAlt}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <span className="text-xs font-medium uppercase tracking-wide text-gold">
          {vehicle.className}
        </span>
        {vehicle.hasDetailPage ? (
          <Link
            href={`/fleet/${vehicle.slug}`}
            className="mt-2 font-display text-xl text-ink hover:text-gold"
          >
            {vehicle.name}
          </Link>
        ) : (
          <h3 className="mt-2 font-display text-xl text-ink">{vehicle.name}</h3>
        )}
        <p className="mt-1 text-sm text-stone">{vehicle.type}</p>
        <ul className="mt-4 space-y-1.5 text-sm text-charcoal">
          <li>Seats up to {vehicle.seats} passengers</li>
          <li>Luggage capacity: {vehicle.luggage}</li>
          <li>100% private &amp; non-shared</li>
          <li>Air-conditioned</li>
        </ul>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-block text-sm font-semibold text-ink hover:text-gold"
        >
          Get Quotation →
        </a>
      </div>
    </div>
  );
}
