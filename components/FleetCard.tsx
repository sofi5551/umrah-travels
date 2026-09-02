import Link from "next/link";
import { Vehicle } from "@/lib/data";

export default function FleetCard({ vehicle }: { vehicle: Vehicle }) {
  const content = (
    <div className="group flex h-full flex-col border border-sandline bg-white p-6 transition-colors hover:border-gold">
      <span className="text-xs font-medium uppercase tracking-wide text-gold">
        {vehicle.className}
      </span>
      <h3 className="mt-2 font-display text-xl text-ink">{vehicle.name}</h3>
      <p className="mt-1 text-sm text-stone">{vehicle.type}</p>
      <ul className="mt-4 space-y-1.5 text-sm text-charcoal">
        <li>Seats up to {vehicle.seats} passengers</li>
        <li>Luggage capacity: {vehicle.luggage}</li>
        <li>100% private &amp; non-shared</li>
        <li>Air-conditioned</li>
      </ul>
      {vehicle.hasDetailPage && (
        <span className="mt-5 inline-block text-sm font-semibold text-ink group-hover:text-gold">
          View vehicle details →
        </span>
      )}
    </div>
  );

  if (!vehicle.hasDetailPage) return content;

  return (
    <Link href={`/fleet/${vehicle.slug}`} className="block h-full">
      {content}
    </Link>
  );
}
