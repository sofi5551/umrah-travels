import Link from "next/link";
import { fareRoutes, fleet } from "@/lib/data";
import SectionHeading from "@/components/SectionHeading";

export const metadata = { title: "Umrah Taxi Pricing | VIP Umrah Taxi" };

export default function PricingIndexPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-8">
      <SectionHeading
        title="Transparent and fixed pricing"
        intro="Fares are based on distance and vehicle type, confirmed in advance so there are no hidden charges. Rates may vary during peak periods such as Ramadan and Hajj season due to higher demand."
      />

      <div className="mt-10 overflow-x-auto border border-sandline bg-white">
        <table className="w-full min-w-[480px] text-left text-sm">
          <thead className="border-b border-sandline bg-sand">
            <tr>
              <th className="px-5 py-3 font-semibold text-ink">Vehicle</th>
              <th className="px-5 py-3 font-semibold text-ink">Seats</th>
              <th className="px-5 py-3 font-semibold text-ink">Class</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sandline">
            {fleet.map((v) => (
              <tr key={v.slug}>
                <td className="px-5 py-3 text-charcoal">{v.name}</td>
                <td className="px-5 py-3 text-stone">{v.seats}</td>
                <td className="px-5 py-3 text-stone">{v.className}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-stone">
        Exact fares depend on route and season — request a quote for a confirmed price.
      </p>

      <div className="mt-14">
        <SectionHeading title="Fare guides by route" />
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {fareRoutes.map((f) => (
            <Link
              key={f.slug}
              href={`/pricing/${f.slug}`}
              className="border border-sandline bg-white p-5 text-sm font-medium text-ink hover:border-gold"
            >
              {f.label} →
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
