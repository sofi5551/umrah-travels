import Link from "next/link";
import { getServices } from "@/lib/servicesData";
import { getSiteSettings } from "@/lib/siteSettings";
import SectionHeading from "@/components/SectionHeading";
import ServicePricingNotices from "@/components/ServicePricingNotices";
import WaveDivider from "@/components/WaveDivider";

export const metadata = { title: "Our Services | Haramain Ways" };
export const revalidate = 60;

export default async function ServicesIndexPage() {
  const [services, settings] = await Promise.all([getServices(), getSiteSettings()]);

  return (
    <>
      <section className="relative overflow-hidden bg-ink py-16 text-white transition-colors hover:bg-inkdeep sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-8">
          <p className="text-sm font-medium uppercase tracking-widest text-goldsoft">
            Services
          </p>
          <h1 className="mt-3 font-display text-3xl font-medium sm:text-4xl">Our services</h1>
          <p className="mt-4 max-w-2xl leading-relaxed text-white/75">
            Whether you&rsquo;re travelling between Saudi Arabia&rsquo;s holy cities, arranging an
            airport pickup, or booking a vehicle by the hour for Ziyarat visits and local errands,
            our private taxi services are built around your schedule. Every trip comes with a
            licensed driver, a fixed fare confirmed before you travel, and a vehicle matched to
            your group size and luggage — never shared or pooled with other passengers. Browse the
            routes below, or message us on WhatsApp for a journey that isn&rsquo;t listed — we&rsquo;re
            happy to arrange custom transfers across the Kingdom.
          </p>
        </div>
        <WaveDivider color="text-white" position="bottom" />
      </section>

      <section className="relative overflow-hidden bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-8">
          <SectionHeading
            title="Choose your route"
            intro="Every service is a private, non-shared booking, confirmed in advance with your driver."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group flex flex-col justify-between border border-sandline bg-white p-6 transition-colors hover:border-gold"
              >
                <div>
                  <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-gold">
                    {service.from} <span>→</span> {service.to}
                  </p>
                  <h3 className="mt-3 font-display text-lg text-ink">{service.label}</h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-stone">
                    {service.description}
                  </p>
                </div>
                <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-ink group-hover:text-gold">
                  View service
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </span>
              </Link>
            ))}
            {services.length === 0 && (
              <p className="text-sm text-stone">No services available yet.</p>
            )}
          </div>

          <div className="mx-auto mt-14 max-w-4xl">
            <ServicePricingNotices
              whatsappHref={`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(
                "Asalam-o-Alaikum! I want to confirm a fare before travel."
              )}`}
              returnTitle="Return transfers available"
              returnBody="Every route above is also available as a return transfer, at similar fixed rates."
              idealFor={[
                "Round-trip booking",
                "Same-day return",
                "Families travelling together",
                "Airport pickup to your hotel",
              ]}
            />
          </div>
        </div>
        <WaveDivider color="text-inkdeep" position="bottom" dimOnFooterHover />
      </section>
    </>
  );
}
