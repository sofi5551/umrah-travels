import Link from "next/link";
import { getZiyaratPages } from "@/lib/ziyaratData";
import SectionHeading from "@/components/SectionHeading";
import WaveDivider from "@/components/WaveDivider";

export const metadata = {
  title: "Ziyarat | Haramain Ways",
  description:
    "Visit the historic and sacred sites around Makkah and Madinah with a private driver — Ziyarat tours arranged around your schedule.",
};
export const revalidate = 60;

export default async function ZiyaratIndexPage() {
  const pages = await getZiyaratPages();

  return (
    <>
      <section className="relative overflow-hidden bg-ink py-16 text-white transition-colors hover:bg-inkdeep sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-8">
          <p className="text-sm font-medium uppercase tracking-widest text-goldsoft">Ziyarat</p>
          <h1 className="mt-3 font-display text-3xl font-medium sm:text-4xl">Ziyarat sites</h1>
          <p className="mt-4 max-w-2xl leading-relaxed text-white/75">
            Visit the historic and sacred sites around Makkah and Madinah with a private driver who
            knows the significance of each stop. Browse the sites below, or message us on WhatsApp
            to arrange a Ziyarat tour built around your schedule.
          </p>
        </div>
        <WaveDivider color="text-white" position="bottom" />
      </section>

      <section className="relative overflow-hidden bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-8">
          <SectionHeading
            title="Choose a site"
            intro="Each visit is arranged as a private, non-shared trip, confirmed in advance with your driver."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {pages.map((page) => (
              <Link
                key={page.slug}
                href={`/ziyarat/${page.slug}`}
                className="group flex flex-col overflow-hidden border border-sandline bg-white transition-colors hover:border-gold"
              >
                {page.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={page.imageUrl} alt={page.label} className="h-44 w-full object-cover" />
                ) : (
                  <div className="h-44 w-full bg-sand" />
                )}
                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <h3 className="font-display text-lg text-ink">{page.label}</h3>
                    {page.description && (
                      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-stone">
                        {page.description}
                      </p>
                    )}
                  </div>
                  <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-ink group-hover:text-gold">
                    View page
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </Link>
            ))}
            {pages.length === 0 && (
              <p className="text-sm text-stone">No Ziyarat pages available yet.</p>
            )}
          </div>
        </div>
        <WaveDivider color="text-ink" position="bottom" dimOnFooterHover />
      </section>
    </>
  );
}
