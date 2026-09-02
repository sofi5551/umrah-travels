import { notFound } from "next/navigation";
import { fareRoutes, fleet } from "@/lib/data";
import BookingForm from "@/components/BookingForm";
import SectionHeading from "@/components/SectionHeading";

export function generateStaticParams() {
  return fareRoutes.map((f) => ({ slug: f.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const fare = fareRoutes.find((f) => f.slug === params.slug);
  if (!fare) return {};
  return { title: `${fare.label} | VIP Umrah Taxi` };
}

export default function FareDetailPage({ params }: { params: { slug: string } }) {
  const fare = fareRoutes.find((f) => f.slug === params.slug);
  if (!fare) return notFound();

  return (
    <>
      <section className="bg-ink py-16 text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-8">
          <p className="text-sm font-medium text-goldsoft">
            {fare.from} → {fare.to}
          </p>
          <h1 className="mt-3 font-display text-4xl font-medium">{fare.label}</h1>
          <p className="mt-5 max-w-2xl text-white/80">
            Fares for {fare.from} to {fare.to} depend on vehicle type and are
            confirmed before your journey — request a quote for today's price.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-8">
        <SectionHeading title="Indicative vehicle options" />
        <div className="mt-6 overflow-x-auto border border-sandline bg-white">
          <table className="w-full min-w-[420px] text-left text-sm">
            <thead className="border-b border-sandline bg-sand">
              <tr>
                <th className="px-5 py-3 font-semibold text-ink">Vehicle</th>
                <th className="px-5 py-3 font-semibold text-ink">Seats</th>
                <th className="px-5 py-3 font-semibold text-ink">Fare</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sandline">
              {fleet.map((v) => (
                <tr key={v.slug}>
                  <td className="px-5 py-3 text-charcoal">{v.name}</td>
                  <td className="px-5 py-3 text-stone">{v.seats}</td>
                  <td className="px-5 py-3 text-stone">Request a quote</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-10 border border-sandline bg-white p-6">
          <h3 className="font-display text-lg text-ink">
            Get today's {fare.from} to {fare.to} price
          </h3>
          <div className="mt-4">
            <BookingForm compact prefillPickup={fare.from} prefillDropoff={fare.to} />
          </div>
        </div>
      </section>
    </>
  );
}
