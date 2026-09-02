import { fleet } from "@/lib/data";
import FleetCard from "@/components/FleetCard";
import SectionHeading from "@/components/SectionHeading";

export const metadata = { title: "Our Fleet | VIP Umrah Taxi" };

export default function FleetIndexPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-8">
      <SectionHeading
        title="Our fleet"
        intro="Sedans for individual travelers, spacious vans for families, and larger vehicles for group transport — all air-conditioned and privately booked."
      />
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {fleet.map((vehicle) => (
          <FleetCard key={vehicle.slug} vehicle={vehicle} />
        ))}
      </div>
    </section>
  );
}
