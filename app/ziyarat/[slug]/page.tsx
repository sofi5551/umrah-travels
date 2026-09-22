import { notFound } from "next/navigation";
import { getZiyaratPages, getZiyaratPageBySlug } from "@/lib/ziyaratData";
import { getZiyaratBlocks } from "@/lib/ziyaratBlocks";
import { getSiteSettings } from "@/lib/siteSettings";
import { getFleet } from "@/lib/fleetData";
import BookingForm from "@/components/BookingForm";
import SectionHeading from "@/components/SectionHeading";
import PricingNotices from "@/components/PricingNotices";
import MultilineText from "@/components/MultilineText";
import WaveDivider from "@/components/WaveDivider";

export const revalidate = 60;

export async function generateStaticParams() {
  const pages = await getZiyaratPages();
  return pages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const page = await getZiyaratPageBySlug(params.slug);
  if (!page) return {};
  const title = `${page.label} | Haramain Ways`;
  const description = page.description || undefined;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: page.imageUrl ? [page.imageUrl] : undefined,
    },
    twitter: { title, description },
  };
}

export default async function ZiyaratDetailPage({ params }: { params: { slug: string } }) {
  const [fleet, settings, page] = await Promise.all([
    getFleet(),
    getSiteSettings(),
    getZiyaratPageBySlug(params.slug),
  ]);
  if (!page) return notFound();

  const blocks = page.id ? await getZiyaratBlocks(page.id) : [];
  const whatsappHref = `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(
    `Asalam-o-Alaikum! I want to know more about visiting ${page.label}.`
  )}`;

  return (
    <>
      <section className="relative overflow-hidden bg-ink py-16 text-white transition-colors hover:bg-inkdeep">
        <div className="mx-auto max-w-4xl px-4 sm:px-8">
          <p className="text-sm font-medium text-goldsoft">Ziyarat</p>
          <h1 className="mt-3 font-display text-4xl font-medium">{page.label}</h1>
          {page.description && (
            <MultilineText
              text={page.description}
              className="mt-5 max-w-3xl"
              paragraphClassName="text-white/80"
            />
          )}

          <div className="mx-auto mt-10 max-w-2xl text-center">
            {page.quote && (
              <blockquote className="border-l-2 border-gold pl-6 text-left font-display text-xl italic leading-relaxed text-white/90">
                &ldquo;{page.quote}&rdquo;
              </blockquote>
            )}

            {page.imageUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={page.imageUrl}
                alt={page.label}
                className={`w-full border border-white/15 shadow-lg ${page.quote ? "mt-8" : ""}`}
              />
            )}

            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-block rounded-full bg-gold px-6 py-3 text-sm font-semibold text-ink hover:bg-goldsoft ${
                page.quote || page.imageUrl ? "mt-8" : ""
              }`}
            >
              Book on WhatsApp
            </a>
          </div>
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
              <li>· Driver waits on-site during your visit</li>
              <li>· Suitable for families, elderly travelers, and groups</li>
            </ul>
          </div>
          <div className="border border-sandline bg-white p-6 shadow-lg">
            <h3 className="font-display text-lg text-ink">Request this visit</h3>
            <div className="mt-4">
              <BookingForm
                compact
                fleet={fleet}
                whatsappNumber={settings.whatsappNumber}
                source={`Ziyarat – ${page.label}`}
                prefillDropoff={page.label}
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
            whatsappHref={`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(
              `Asalam-o-Alaikum! I want to confirm the fare for visiting ${page.label}.`
            )}`}
            showReturnTransfer={false}
          />
        </div>

        <WaveDivider color="text-ink" position="bottom" dimOnFooterHover />
      </section>
    </>
  );
}
