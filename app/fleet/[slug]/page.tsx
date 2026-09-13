import Image from "next/image";
import { notFound } from "next/navigation";
import { getFleet, getVehicleBySlug } from "@/lib/fleetData";
import { getSiteSettings } from "@/lib/siteSettings";
import BookingForm from "@/components/BookingForm";
import SectionHeading from "@/components/SectionHeading";
import WaveDivider from "@/components/WaveDivider";

export const revalidate = 60;

export async function generateStaticParams() {
  const fleet = await getFleet();
  return fleet.filter((v) => v.hasDetailPage).map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const vehicle = await getVehicleBySlug(params.slug);
  if (!vehicle) return {};
  return { title: `${vehicle.name} | Haramain Ways` };
}

export default async function VehicleDetailPage({ params }: { params: { slug: string } }) {
  const [fleet, settings, vehicle] = await Promise.all([
    getFleet(),
    getSiteSettings(),
    getVehicleBySlug(params.slug),
  ]);
  if (!vehicle || !vehicle.hasDetailPage) return notFound();

  const specs = [
    { label: "Class", value: vehicle.className },
    { label: "Body type", value: vehicle.type },
    { label: "Seats", value: `Up to ${vehicle.seats} passengers` },
    { label: "Luggage capacity", value: vehicle.luggage },
    { label: "Booking", value: vehicle.bookingNote },
    { label: "Comfort", value: vehicle.comfortNote },
  ];

  return (
    <>
      <section className="relative overflow-hidden bg-ink py-16 text-white transition-colors hover:bg-inkdeep">
        <div className="mx-auto max-w-4xl px-4 sm:px-8">
          <p className="text-sm font-medium text-goldsoft">{vehicle.className}</p>
          <h1 className="mt-3 font-display text-4xl font-medium">{vehicle.name}</h1>
          <p className="mt-5 max-w-2xl text-white/80">{vehicle.description}</p>
        </div>
        <WaveDivider color="text-white" position="bottom" />
      </section>

      <section className="relative overflow-hidden bg-white">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="relative min-h-[280px] w-full overflow-hidden bg-sand">
              {vehicle.image && (
                <Image
                  src={vehicle.image}
                  alt={vehicle.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              )}
            </div>
            <div className="border border-sandline bg-white p-6 shadow-lg">
              <h3 className="font-display text-lg text-ink">Book the {vehicle.name}</h3>
              <div className="mt-4">
                <BookingForm
                  compact
                  fleet={fleet}
                  whatsappNumber={settings.whatsappNumber}
                  source={`Fleet – ${vehicle.name}`}
                  prefillCar={`${vehicle.name} – ${vehicle.seats} Seats`}
                />
              </div>
            </div>
          </div>

          <div className="mx-auto mt-16 max-w-xl">
            <SectionHeading title="Vehicle specifications" align="center" />
            <dl className="mt-6 divide-y divide-sandline border-y border-sandline">
              {specs.map((s) => (
                <div key={s.label} className="flex justify-between gap-4 py-3 text-sm">
                  <dt className="text-stone">{s.label}</dt>
                  <dd className="text-right font-medium text-charcoal">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
        <WaveDivider color="text-inkdeep" position="bottom" dimOnFooterHover />
      </section>
    </>
  );
}
