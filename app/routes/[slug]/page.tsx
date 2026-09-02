import { notFound } from "next/navigation";
import { routes, site } from "@/lib/data";
import BookingForm from "@/components/BookingForm";
import SectionHeading from "@/components/SectionHeading";
import Faq from "@/components/Faq";

export function generateStaticParams() {
  return routes.map((r) => ({ slug: r.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const route = routes.find((r) => r.slug === params.slug);
  if (!route) return {};
  return { title: `${route.label} | VIP Umrah Taxi` };
}

const routeFaqs = (from: string, to: string) => [
  {
    q: `How long does the ${from} to ${to} transfer take?`,
    a: "Travel time depends on distance, traffic, and prayer-time stops. Your driver will confirm an estimated duration when your booking is confirmed.",
  },
  {
    q: "Is the vehicle shared with other passengers?",
    a: "No — every transfer is a private, non-shared booking for you and your group only.",
  },
  {
    q: "Can I book this route for a group?",
    a: "Yes. Vehicles range from 4-seat sedans to a 16-seat bus, so let us know your group size when requesting a quote.",
  },
];

export default function RouteDetailPage({ params }: { params: { slug: string } }) {
  const route = routes.find((r) => r.slug === params.slug);
  if (!route) return notFound();

  return (
    <>
      <section className="bg-ink py-16 text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-8">
          <p className="text-sm font-medium text-goldsoft">
            {route.from} → {route.to}
          </p>
          <h1 className="mt-3 font-display text-4xl font-medium">{route.label}</h1>
          <p className="mt-5 max-w-2xl text-white/80">{route.blurb}</p>
          <a
            href={`https://wa.me/${site.whatsappNumber}?text=Asalam-o-Alaikum!%20I%20want%20to%20book%20the%20${encodeURIComponent(
              route.label
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block rounded-full bg-gold px-6 py-3 text-sm font-semibold text-ink hover:bg-goldsoft"
          >
            Book this route on WhatsApp
          </a>
        </div>
      </section>

      <section className="mx-auto grid max-w-4xl gap-10 px-4 py-16 sm:px-8 lg:grid-cols-2">
        <div>
          <SectionHeading
            title="What to expect"
            intro={`Your ${route.from} to ${route.to} transfer is arranged as a private, door-to-door journey. We confirm your vehicle, schedule, and fare in advance, and your driver plans the route around traffic and prayer times.`}
          />
          <ul className="mt-6 space-y-2 text-sm text-charcoal">
            <li>· 100% private, non-shared vehicle</li>
            <li>· Licensed, experienced driver</li>
            <li>· Fixed fare confirmed before travel</li>
            <li>· Suitable for families, elderly travelers, and groups</li>
          </ul>
        </div>
        <div className="border border-sandline bg-white p-6">
          <h3 className="font-display text-lg text-ink">Request this transfer</h3>
          <div className="mt-4">
            <BookingForm compact prefillPickup={route.from} prefillDropoff={route.to} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-16 sm:px-8">
        <SectionHeading title="Route FAQs" />
        <div className="mt-6">
          <Faq items={routeFaqs(route.from, route.to)} />
        </div>
      </section>
    </>
  );
}
