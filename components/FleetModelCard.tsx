import Link from "next/link";
import VehicleModel from "./VehicleModel";
import type { Vehicle } from "@/lib/data";

export default function FleetModelCard({ vehicle }: { vehicle: Vehicle }) {
  const content = (
    <div className="group flex h-full flex-col border border-sandline bg-white transition-colors hover:border-gold">
      <div className="relative h-52 border-b border-sandline bg-sand/60">
        {vehicle.model ? (
          <VehicleModel
            format={vehicle.model.format}
            url={vehicle.model.url}
            mtlUrl={vehicle.model.mtlUrl}
            resourcePath={vehicle.model.resourcePath}
            textureOverrides={vehicle.model.textureOverrides}
            critical={vehicle.model.critical}
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-stone/60">
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8" aria-hidden>
              <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1h12v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-8l-2.08-5.99zM6.5 16A1.5 1.5 0 1 1 6.5 13a1.5 1.5 0 0 1 0 3zm11 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM5 11l1.5-4.5h11L19 11H5z" />
            </svg>
            <span className="text-xs">Preview coming soon</span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
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
    </div>
  );

  if (!vehicle.hasDetailPage) return content;

  return (
    <Link href={`/fleet/${vehicle.slug}`} className="block h-full">
      {content}
    </Link>
  );
}
