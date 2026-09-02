import { notFound } from "next/navigation";
import { fleet } from "@/lib/data";
import BookingForm from "@/components/BookingForm";
import SectionHeading from "@/components/SectionHeading";

export function generateStaticParams() {
  return fleet.filter((v) => v.hasDetailPage).map((v) => ({ slug: v.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const vehicle = fleet.find((v) => v.slug === params.slug);
  if (!vehicle) return {};
  return { title: `${vehicle.name} | VIP Umrah Taxi` };
}

export default function VehicleDetailPage({ params }: { params: { slug: string } }) {
  const vehicle = fleet.find((v) => v.slug === params.slug);
  if (!vehicle || !vehicle.hasDetailPage) return notFound();

  const specs = [
    { label: "Class", value: vehicle.className },
    { label: "Body type", value: vehicle.type },
    { label: "Seats", value: `Up to ${vehicle.seats} passengers` },
    { label: "Luggage capacity", value: vehicle.luggage },
    { label: "Booking", value: "100% private & non-shared" },
    { label: "Comfort", value: "Air-conditioned, regularly maintained" },
  ];

  return (
    <>
      <section className="bg-ink py-16 text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-8">
          <p className="text-sm font-medium text-goldsoft">{vehicle.className}</p>
          <h1 className="mt-3 font-display text-4xl font-medium">{vehicle.name}</h1>
          <p className="mt-5 max-w-2xl text-white/80">
            The {vehicle.name} is assigned for {vehicle.type.toLowerCase()} transfers
            carrying up to {vehicle.seats} passengers, suited to Umrah and Hajj travel
            between Makkah, Madinah, Jeddah, and Taif.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-4xl gap-10 px-4 py-16 sm:px-8 lg:grid-cols-2">
        <div>
          <SectionHeading title="Vehicle specifications" />
          <dl className="mt-6 divide-y divide-sandline border-y border-sandline">
            {specs.map((s) => (
              <div key={s.label} className="flex justify-between gap-4 py-3 text-sm">
                <dt className="text-stone">{s.label}</dt>
                <dd className="text-right font-medium text-charcoal">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="border border-sandline bg-white p-6">
          <h3 className="font-display text-lg text-ink">Book the {vehicle.name}</h3>
          <div className="mt-4">
            <BookingForm compact prefillCar={`${vehicle.name} – ${vehicle.seats} Seats`} />
          </div>
        </div>
      </section>
    </>
  );
}
