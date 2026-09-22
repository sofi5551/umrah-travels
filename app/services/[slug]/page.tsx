import { notFound } from "next/navigation";
import { getServices, getServiceBySlug } from "@/lib/servicesData";
import { getServiceBlocks } from "@/lib/serviceBlocks";
import { getSiteSettings } from "@/lib/siteSettings";
import { getFleet } from "@/lib/fleetData";
import BookingForm from "@/components/BookingForm";
import SectionHeading from "@/components/SectionHeading";
import PricingNotices from "@/components/PricingNotices";
import MultilineText from "@/components/MultilineText";
import WaveDivider from "@/components/WaveDivider";

export const revalidate = 60;

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const service = await getServiceBySlug(params.slug);
  if (!service) return {};
  const title = `${service.label} | Haramain Ways`;
  return {
    title,
    description: service.description,
    openGraph: { title, description: service.description },
    twitter: { title, description: service.description },
  };
}

export default async function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const [fleet, settings, service] = await Promise.all([
    getFleet(),
    getSiteSettings(),
    getServiceBySlug(params.slug),
  ]);
  if (!service) return notFound();

  const blocks = service.id ? await getServiceBlocks(service.id) : [];
  const whatsappHref = (text: string) =>
    `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(text)}`;

  return (
    <>
      <section className="relative overflow-hidden bg-ink py-16 text-white transition-colors hover:bg-inkdeep">
        <div className="mx-auto max-w-4xl px-4 sm:px-8">
          <p className="text-sm font-medium text-goldsoft">
            {service.from} → {service.to}
          </p>
          <h1 className="mt-3 font-display text-4xl font-medium">{service.label}</h1>
          {service.description && (
            <MultilineText
              text={service.description}
              className="mt-5 max-w-2xl"
              paragraphClassName="text-white/80"
            />
          )}
          <a
            href={`https://wa.me/${settings.whatsappNumber}?text=Asalam-o-Alaikum!%20I%20want%20to%20book%20the%20${encodeURIComponent(
              service.label
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block rounded-full bg-gold px-6 py-3 text-sm font-semibold text-ink hover:bg-goldsoft"
          >
            Book on WhatsApp
          </a>
        </div>
        <WaveDivider color="text-white" position="bottom" />
      </section>

      <section className="relative overflow-hidden bg-white">
        <div className="mx-auto grid max-w-4xl gap-10 px-4 py-16 sm:px-8 lg:grid-cols-2">
          <div>
            <SectionHeading title="What to expect" />
            <ul className="mt-6 space-y-2 text-sm text-charcoal">
              <li>· 100% private, non-shared vehicle</li>
              <li>· Licensed, experienced driver</li>
              <li>· Fixed fare confirmed before travel</li>
              <li>· Suitable for families, elderly travelers, and groups</li>
            </ul>
          </div>
          <div className="border border-sandline bg-white p-6 shadow-lg">
            <h3 className="font-display text-lg text-ink">Request this transfer</h3>
            <div className="mt-4">
              <BookingForm
                compact
                fleet={fleet}
                whatsappNumber={settings.whatsappNumber}
                source={`Services – ${service.label}`}
                prefillPickup={service.from}
                prefillDropoff={service.to}
              />
            </div>
          </div>
        </div>

        {blocks.length > 0 && (
          <div className="mx-auto max-w-4xl space-y-12 px-4 pb-16 sm:px-8">
            {blocks.map((block) =>
              block.type === "table" ? (
                <div key={block.id} className="border border-sandline bg-white p-6 sm:p-8">
                  {block.heading && (
                    <h3 className="font-display text-xl text-ink">{block.heading}</h3>
                  )}
                  {block.description && (
                    <p className="mt-2 text-sm text-charcoal">{block.description}</p>
                  )}
                  <div className="themed-scrollbar mt-6 overflow-x-auto pb-2">
                    <table className="w-full min-w-[480px] border-collapse text-left text-sm">
                      <thead>
                        <tr className="border-b-2 border-ink">
                          {block.columns.map((col, i) => (
                            <th
                              key={i}
                              className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-ink"
                            >
                              {col}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {block.rows.map((row, i) => (
                          <tr
                            key={i}
                            className={`border-b border-sandline transition-colors hover:bg-sand/50 ${
                              i % 2 === 1 ? "bg-sand/25" : ""
                            }`}
                          >
                            {row.map((cell, j) => (
                              <td
                                key={j}
                                className={`px-4 py-3.5 ${
                                  j === 0 ? "font-medium text-ink" : "text-charcoal"
                                }`}
                              >
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {block.isHourly && (
                    <div className="mt-6 border-t border-sandline pt-6">
                      <h4 className="font-display text-base text-ink">
                        Hourly booking is suitable for:
                      </h4>
                      <ul className="mt-3 grid gap-2 text-sm text-charcoal sm:grid-cols-2">
                        {[
                          "Multiple stops",
                          "Business meetings",
                          "Shopping trips",
                          "Flexible city visits",
                        ].map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <div key={block.id} className="border border-sandline bg-white p-6 sm:p-8">
                  {block.heading && (
                    <h3 className="font-display text-xl text-ink">{block.heading}</h3>
                  )}
                  {block.description && (
                    <p className="mt-2 text-sm text-charcoal">{block.description}</p>
                  )}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={block.imageUrl}
                    alt={block.heading || ""}
                    className="mt-6 h-auto w-full"
                  />
                </div>
              )
            )}
          </div>
        )}

        <div className="mx-auto max-w-4xl px-4 pb-16 sm:px-8">
          <PricingNotices
            whatsappHref={whatsappHref(
              `Asalam-o-Alaikum! I want to confirm the fare for ${service.label}.`
            )}
            returnTitle={`${service.to} to ${service.from} Taxi Fare (Return Transfer)`}
            returnBody={`We also offer return taxi from ${service.to} to ${service.from} at similar fixed rates.`}
            idealFor={[
              "Round-trip booking",
              "Same-day return",
              `Families staying in ${service.to}`,
              "Airport pickup to your hotel",
            ]}
            showReturnTransfer={Boolean(service.showReturnTransfer)}
          />
        </div>

        <WaveDivider color="text-ink" position="bottom" dimOnFooterHover />
      </section>
    </>
  );
}
