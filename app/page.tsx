import BookingForm from "@/components/BookingForm";
import SectionHeading from "@/components/SectionHeading";
import RouteMotif from "@/components/RouteMotif";
import HeroModel from "@/components/HeroModel";
import ScrollReveal from "@/components/ScrollReveal";
import FleetModelCard from "@/components/FleetModelCard";
import Testimonials from "@/components/Testimonials";
import Faq from "@/components/Faq";
import { fleet, faqs, steps, site } from "@/lib/data";
import Link from "next/link";
import Image from "next/image";

const originCountries = [
  "Pakistan",
  "India",
  "United Kingdom",
  "United States",
  "Malaysia",
  "Indonesia",
  "Bangladesh",
];

const trustPoints = [
  "100% private, non-shared taxis",
  "Licensed and experienced drivers",
  "Fixed and transparent pricing",
  "24/7 WhatsApp support",
  "Suitable for families and elderly travelers",
];

const popularRoutes = [
  { label: "Makkah to Madinah taxi service", slug: "makkah-to-medina-taxi", from: "Makkah", to: "Madinah" },
  { label: "Madinah to Makkah private taxi", slug: "madinah-to-makkah-taxi", from: "Madinah", to: "Makkah" },
  { label: "Madinah Ziyarat tour", slug: "madinah-ziyarat-taxi", from: "Madinah", to: "Ziyarat sites" },
  { label: "Taif Ziyarat taxi", slug: "taif-ziyarat-taxi", from: "Taif", to: "Ziyarat sites" },
  { label: "Madinah to Riyadh taxi service", slug: "madinah-to-riyadh-taxi", from: "Madinah", to: "Riyadh" },
  { label: "Jeddah to Riyadh taxi service", slug: "jeddah-to-riyadh-taxi", from: "Jeddah", to: "Riyadh" },
  { label: "Makkah to Riyadh taxi service", slug: "makkah-to-riyadh-taxi", from: "Makkah", to: "Riyadh" },
];

const coverageParagraphs = [
  "Our service covers the main routes used by Umrah and Hajj pilgrims across Saudi Arabia, including travel between Makkah, Madinah, Jeddah, Taif, and nearby regions commonly visited during pilgrimage.",
  "Travel between Makkah and Madinah is a central part of the Umrah journey, connecting Masjid al-Haram and Al-Masjid an-Nabawi. We provide direct and comfortable transfers between these locations, along with transportation to important Ziyarat sites.",
  "We arrange airport pickups, intercity transfers, and visits to religious locations, with each journey planned according to distance, travel time, and traffic conditions. Transfers are available from major airports such as Jeddah, Madinah, Taif, and Riyadh, with direct drop-off at your hotel or accommodation.",
  "Drivers are familiar with key hotel areas, airport terminals, and commonly visited locations, helping ensure timely pickups and smooth travel without unnecessary delays. Advance booking allows better coordination of your schedule, especially during peak periods such as Ramadan and the Hajj season.",
  "All journeys are arranged as private transfers, allowing flexibility for prayer stops, rest breaks, and personal travel needs. The service is suitable for individuals, families, elderly pilgrims, and groups, with options available for additional luggage and special assistance when required.",
];

const coverageCities = ["Makkah", "Madinah", "Jeddah", "Taif", "Riyadh"];

const coverageStats = [
  { value: "5", label: "Cities covered" },
  { value: "100%", label: "Private transfers" },
  { value: "24/7", label: "Availability" },
];

function IconPlane() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2.5 1.5V22l4-1 4 1v-1.5L13 19v-5.5l8 2.5z" />
    </svg>
  );
}

function IconRoute() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6.8 17.2 17.2 6.8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeDasharray="2.2 3"
        strokeLinecap="round"
      />
      <circle cx="5" cy="19" r="2.3" fill="currentColor" />
      <circle cx="19" cy="5" r="2.3" fill="currentColor" />
    </svg>
  );
}

function IconPin() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
    </svg>
  );
}

function IconBuilding() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-4v-4H8v4H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm3 3v2h2V6H7zm4 0v2h2V6h-2zm4 0v2h2V6h-2zM7 10v2h2v-2H7zm4 0v2h2v-2h-2zm4 0v2h2v-2h-2zM7 14v2h2v-2H7zm8 0v2h2v-2h-2z" />
    </svg>
  );
}

function IconMessage() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20 2H4a2 2 0 0 0-2 2v18l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z" />
    </svg>
  );
}

function IconCheck() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M9 16.2 4.8 12l-1.4 1.4L9 19 20.6 7.4 19.2 6z" />
    </svg>
  );
}

function IconCar() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1h12v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-8l-2.08-5.99zM6.5 16A1.5 1.5 0 1 1 6.5 13a1.5 1.5 0 0 1 0 3zm11 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM5 11l1.5-4.5h11L19 11H5z" />
    </svg>
  );
}

const stepIcons = [IconMessage, IconCheck, IconCar];

function IconTag() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.41l9 9c.36.36.86.59 1.41.59.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z" />
    </svg>
  );
}

function IconShieldCheck() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-1.2 14.5L7 11.7l1.4-1.4 2.4 2.4 5.4-5.4L17.6 8.7l-6.8 6.8z" />
    </svg>
  );
}

function IconCalendar() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" />
    </svg>
  );
}

const pricingHighlights = [
  {
    title: "Fixed fares",
    body: "Confirmed by distance and vehicle type before your journey begins.",
    icon: IconTag,
  },
  {
    title: "No hidden charges",
    body: "Complete clarity on cost, with nothing added after booking.",
    icon: IconShieldCheck,
  },
  {
    title: "Peak season aware",
    body: "Rates may vary during Ramadan and Hajj due to higher demand.",
    icon: IconCalendar,
  },
];

const taxiServices = [
  {
    title: "Airport transfers from Jeddah, Madinah, Taif, and Riyadh",
    icon: IconPlane,
  },
  {
    title: "Intercity travel between Makkah and Madinah",
    icon: IconRoute,
  },
  {
    title: "Ziyarat visits in Makkah, Madinah, and Taif",
    icon: IconPin,
  },
  {
    title: "Hotel-to-hotel private transfers",
    icon: IconBuilding,
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[calc(100vh-6.5rem)] items-center overflow-hidden bg-ink text-white">
        <div className="pointer-events-none absolute inset-0 opacity-70 lg:opacity-90">
          <HeroModel />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/40 to-transparent" />
        <div className="relative mx-auto grid w-full max-w-6xl gap-12 px-4 py-16 sm:px-8 lg:grid-cols-2 lg:py-24">
          <div>
            <p className="text-sm font-medium text-goldsoft">
              Makkah · Madinah · Jeddah · Riyadh · Taif
            </p>
            <h1 className="mt-4 font-display text-4xl font-medium leading-tight sm:text-5xl">
              Private Umrah taxi service across Saudi Arabia
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-white/80">
              Chauffeur-driven transport for pilgrims, families, and groups.
              We arrange door-to-door transfers between airports, hotels, and
              Ziyarat locations, with every journey planned around your
              schedule.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={`https://wa.me/${site.whatsappNumber}?text=Asalam-o-Alaikum!%20I%20want%20to%20book%20a%20taxi`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-gold px-6 py-3 text-sm font-semibold text-ink hover:bg-goldsoft"
              >
                Book on WhatsApp
              </a>
              <a
                href="#quote"
                className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white hover:border-gold hover:text-gold"
              >
                Get a quick quote
              </a>
            </div>
            <ul className="mt-10 grid gap-2 text-sm text-white/70 sm:grid-cols-2">
              {trustPoints.map((point) => (
                <li key={point} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative hidden min-h-[320px] lg:block lg:translate-x-20">
            <RouteMotif />
          </div>
        </div>
      </section>

      {/* Quote form */}
      <section id="quote" className="relative overflow-hidden border-b border-sandline">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(/images/safa-marwa.png)" }}
        />
        <svg
          className="pointer-events-none absolute inset-x-0 top-0 h-16 w-full text-ink sm:h-24"
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          fill="currentColor"
          aria-hidden
        >
          <path d="M0,0 L1440,0 L1440,40 C1200,85 960,15 720,55 C480,90 240,10 0,55 Z" />
        </svg>
        <div className="relative mx-auto max-w-3xl px-4 py-16 sm:px-8">
          <ScrollReveal>
            <div className="rounded-2xl bg-white/60 p-6 shadow-lg backdrop-blur-sm sm:p-10">
              <SectionHeading
                title="Request a quick quote"
                introClassName="text-black"
                intro="Book instantly on WhatsApp, or share your travel details below and our team will confirm your fare."
              />
              <div className="mt-8">
                <BookingForm />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Coverage */}
      <section className="relative overflow-hidden bg-ink text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-8 sm:py-24">
          <ScrollReveal>
            <p className="text-sm font-medium uppercase tracking-widest text-goldsoft">
              Where we operate
            </p>
            <h2 className="mt-3 max-w-2xl font-display text-3xl font-medium sm:text-4xl">
              Transportation coverage for Umrah travel
            </h2>

            <div className="mt-10 grid grid-cols-3 gap-6 border-y border-white/10 py-8 sm:gap-10">
              {coverageStats.map((s) => (
                <div key={s.label}>
                  <p className="font-display text-3xl text-gold sm:text-4xl">{s.value}</p>
                  <p className="mt-1 text-xs uppercase tracking-wide text-white/60 sm:text-sm">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-12 grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
              <div className="space-y-5 leading-relaxed">
                <p className="text-lg text-white/90">{coverageParagraphs[0]}</p>
                {coverageParagraphs.slice(1).map((p, i) => (
                  <p key={i} className="text-base text-white/70">
                    {p}
                  </p>
                ))}
              </div>

              <div className="relative lg:pt-2">
                <div className="pointer-events-none absolute -inset-8 rounded-full bg-gold/10 blur-3xl" />
                <div className="relative aspect-[8/5]">
                  <RouteMotif />
                </div>
                <div className="relative mt-2 flex flex-wrap gap-2">
                  {coverageCities.map((city) => (
                    <span
                      key={city}
                      className="rounded-full border border-white/20 px-3 py-1 text-xs text-white/80"
                    >
                      {city}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal className="mt-16">
            <h3 className="font-display text-2xl font-medium sm:text-3xl">
              Our Umrah taxi services
            </h3>
            <p className="mt-3 max-w-2xl text-white/70">
              We provide transportation for the most common travel needs of pilgrims across Saudi
              Arabia, with services planned to ensure comfort, timing, and reliability.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {taxiServices.map(({ title, icon: Icon }) => (
                <div
                  key={title}
                  className="group border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-colors hover:border-gold/60 hover:bg-white/10"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gold/15 text-gold">
                    <span className="h-5 w-5">
                      <Icon />
                    </span>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-white/85">{title}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm text-white/60">
              Each booking is handled as a private service, allowing flexibility based on your
              travel plan.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Steps */}
      <section className="relative overflow-hidden bg-white py-16 sm:py-24">
        <svg
          className="pointer-events-none absolute inset-x-0 top-0 h-16 w-full text-ink sm:h-20"
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          fill="currentColor"
          aria-hidden
        >
          <path d="M0,0 L1440,0 L1440,40 C1200,85 960,15 720,55 C480,90 240,10 0,55 Z" />
        </svg>
        <div className="mx-auto max-w-6xl px-4 sm:px-8">
          <ScrollReveal>
            <SectionHeading
              align="center"
              title="Reserve your Umrah taxi in three steps"
              intro="Booking your transport is simple, with clear communication at every stage."
            />
            <div className="relative mt-16 grid gap-12 sm:grid-cols-3 sm:gap-8">
              <div
                className="pointer-events-none absolute top-7 hidden border-t-2 border-dashed border-sandline sm:block"
                style={{ left: "16.666%", right: "16.666%" }}
              />
              {steps.map((step, i) => {
                const Icon = stepIcons[i];
                return (
                  <div key={step.title} className="relative flex flex-col items-center text-center">
                    <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border-2 border-gold bg-white text-ink">
                      <span className="h-6 w-6">
                        <Icon />
                      </span>
                    </div>
                    <p className="mt-5 text-xs font-semibold uppercase tracking-widest text-gold">
                      Step 0{i + 1}
                    </p>
                    <h3 className="mt-2 font-display text-xl text-ink">{step.title}</h3>
                    <p className="mt-2 max-w-xs text-sm leading-relaxed text-stone">{step.body}</p>
                  </div>
                );
              })}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Popular routes */}
      <section className="relative overflow-hidden bg-ink text-white">
        <svg
          className="pointer-events-none absolute inset-x-0 top-0 h-16 w-full text-white sm:h-20"
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          fill="currentColor"
          aria-hidden
        >
          <path d="M0,0 L1440,0 L1440,40 C1200,85 960,15 720,55 C480,90 240,10 0,55 Z" />
        </svg>

        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-8 sm:py-24">
          <ScrollReveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="text-sm font-medium uppercase tracking-widest text-goldsoft">
                  Popular routes
                </p>
                <h2 className="mt-3 max-w-xl font-display text-3xl font-medium sm:text-4xl">
                  Popular routes for Umrah travel
                </h2>
                <p className="mt-4 max-w-xl text-white/70">
                  We arrange private transfers across the most frequently used routes between
                  Makkah, Madinah, Jeddah, and Taif. These journeys are commonly required for
                  airport arrivals, intercity travel, and visits to Ziyarat locations.
                </p>
              </div>
              <Link
                href="/routes"
                className="shrink-0 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-goldsoft"
              >
                View all routes
              </Link>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {popularRoutes.map((route) => (
                <Link
                  key={route.slug}
                  href={`/routes/${route.slug}`}
                  className="group flex flex-col justify-between border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-colors hover:border-gold/60 hover:bg-white/10"
                >
                  <div>
                    <p className="flex items-center gap-2 text-xs uppercase tracking-wide text-goldsoft">
                      {route.from} <span className="text-gold">→</span> {route.to}
                    </p>
                    <h3 className="mt-3 font-display text-lg leading-snug text-white">
                      {route.label}
                    </h3>
                  </div>
                  <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-white/70 group-hover:text-gold">
                    View route
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </span>
                </Link>
              ))}
            </div>

            <p className="mt-8 max-w-2xl text-sm text-white/60">
              Detailed route information, estimated travel time, and pricing are available on
              dedicated pages. You can also{" "}
              <a
                href={`https://wa.me/${site.whatsappNumber}?text=Asalam-o-Alaikum!%20I%20want%20guidance%20on%20a%20travel%20route`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold underline-offset-2 hover:underline"
              >
                contact us directly
              </a>{" "}
              for guidance based on your travel plan.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Fleet */}
      <section className="relative overflow-hidden bg-white py-16 sm:py-24">
        <svg
          className="pointer-events-none absolute inset-x-0 top-0 h-16 w-full text-ink sm:h-20"
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          fill="currentColor"
          aria-hidden
        >
          <path d="M0,0 L1440,0 L1440,40 C1200,85 960,15 720,55 C480,90 240,10 0,55 Z" />
        </svg>
        <div className="mx-auto max-w-6xl px-4 sm:px-8">
          <ScrollReveal>
            <div className="max-w-2xl">
              <SectionHeading
                title="Our fleet for Umrah travel"
                intro="We operate a modern fleet of vehicles designed to meet different group sizes, comfort preferences, and luggage requirements. Options include sedans for individual travelers, spacious vans for families, and larger vehicles for group transport, including Umrah bus service for larger pilgrim groups."
              />
            </div>

            <p className="mt-6 max-w-3xl text-sm leading-relaxed text-stone">
              All vehicles are air-conditioned, regularly maintained, and assigned based on your
              travel needs. Each transfer is handled as a private service, with a licensed
              driver experienced in intercity travel and routes between Makkah, Madinah, Jeddah,
              and Taif.
            </p>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-stone">
              Whether you require a standard car for a short journey or a larger vehicle for
              group travel, suitable options are available to ensure a comfortable and practical
              travel experience.
            </p>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {fleet.map((vehicle) => (
                <FleetModelCard key={vehicle.slug} vehicle={vehicle} />
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Pricing teaser */}
      <section className="relative overflow-hidden bg-ink text-white">
        <svg
          className="pointer-events-none absolute inset-x-0 top-0 h-16 w-full text-white sm:h-20"
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          fill="currentColor"
          aria-hidden
        >
          <path d="M0,0 L1440,0 L1440,40 C1200,85 960,15 720,55 C480,90 240,10 0,55 Z" />
        </svg>
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-8 sm:py-24">
          <ScrollReveal>
            <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-center lg:gap-16">
              <div>
                <p className="text-sm font-medium uppercase tracking-widest text-goldsoft">
                  Pricing
                </p>
                <h2 className="mt-3 font-display text-3xl font-medium sm:text-4xl">
                  Transparent and fixed pricing
                </h2>
                <p className="mt-5 text-white/75">
                  Our pricing is based on distance and vehicle type, with fares confirmed in
                  advance before your journey. This ensures complete clarity, with no hidden
                  charges or unexpected costs.
                </p>
                <p className="mt-4 text-white/75">
                  Rates may vary during peak periods such as Ramadan and the Hajj season due to
                  higher demand. For accurate pricing, you can request a quote directly or contact
                  our team for assistance based on your itinerary.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    href="/pricing"
                    className="rounded-full bg-gold px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-goldsoft"
                  >
                    See pricing
                  </Link>
                  <a
                    href="#quote"
                    className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-gold hover:text-gold"
                  >
                    Request a quote
                  </a>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                {pricingHighlights.map(({ title, body, icon: Icon }) => (
                  <div
                    key={title}
                    className="border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gold/15 text-gold">
                      <span className="h-4 w-4">
                        <Icon />
                      </span>
                    </div>
                    <p className="mt-3 text-sm font-semibold text-white">{title}</p>
                    <p className="mt-1 text-xs leading-relaxed text-white/60">{body}</p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Why choose us */}
      <section className="relative overflow-hidden text-white">
        <Image
          src="/images/masjid-nabawi.png"
          alt="Masjid an-Nabawi in Madinah at night"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-black/45" />

        <div
          className="relative mx-auto max-w-2xl px-4 py-16 sm:px-8 sm:py-24"
          style={{ textShadow: "0 2px 8px rgba(0,0,0,0.65)" }}
        >
          <ScrollReveal>
            <p className="text-sm font-medium uppercase tracking-widest text-goldsoft">
              Why choose us
            </p>
            <h2 className="mt-3 font-display text-3xl font-medium sm:text-4xl">
              Why pilgrims choose VIP Umrah Taxi
            </h2>
            <p className="mt-5 font-medium text-white/90">
              Choosing the right transport provider is important for a smooth and well-organized
              Umrah journey. VIP Umrah Taxi focuses on reliability, clear communication, and
              consistent service quality across every booking.
            </p>

            <div className="mt-8 space-y-5 font-medium leading-relaxed text-white/85">
              <p>
                Drivers are licensed and familiar with major routes between Makkah, Madinah,
                Jeddah, and Taif, while vehicles are regularly maintained to ensure a comfortable
                and safe journey. Each transfer is arranged with attention to timing, route
                planning, and passenger needs, allowing you to travel without unnecessary delays.
              </p>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-gold">
                  Trusted by pilgrims from
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {originCountries.map((country) => (
                    <span
                      key={country}
                      className="border border-white/20 bg-white/5 px-3 py-1 text-sm text-white backdrop-blur-sm"
                    >
                      {country}
                    </span>
                  ))}
                </div>
                <p className="mt-3 text-sm text-white/70">
                  Many prefer to arrange their transportation before arriving in Saudi Arabia.
                </p>
              </div>

              <p>
                Pre-booking allows better coordination for airport pickups, hotel transfers, and
                intercity travel, helping avoid last-minute arrangements during busy periods such
                as Ramadan and the Hajj season.
              </p>

              <p>
                Travelers value punctual service, clean vehicles, and drivers who understand the
                requirements of Umrah and Hajj journeys. Private transfers make the service
                especially suitable for families, elderly passengers, and groups.
              </p>

              <blockquote className="border-l-2 border-gold py-1 pl-5 font-display text-lg italic text-goldsoft">
                Many pilgrims continue to use our service for repeat visits due to its consistency
                and reliability.
              </blockquote>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-8">
          <SectionHeading
            title="Customer reviews"
            intro="Recent feedback reflects positive experiences with timely pickups, comfortable vehicles, and smooth intercity travel between Makkah, Madinah, and Jeddah. Passengers also appreciate the ease of booking in advance and the ability to travel privately without delays or shared rides."
          />
          <div className="mt-10">
            <Testimonials />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative overflow-hidden bg-ink text-white">
        <svg
          className="pointer-events-none absolute inset-x-0 top-0 h-16 w-full text-white sm:h-20"
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          fill="currentColor"
          aria-hidden
        >
          <path d="M0,0 L1440,0 L1440,40 C1200,85 960,15 720,55 C480,90 240,10 0,55 Z" />
        </svg>
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-8 sm:py-24">
          <ScrollReveal>
            <p className="text-sm font-medium uppercase tracking-widest text-goldsoft">FAQ</p>
            <h2 className="mt-3 font-display text-3xl font-medium sm:text-4xl">
              Frequently asked questions
            </h2>
            <div className="mt-10">
              <Faq items={faqs} variant="dark" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden bg-white">
        <svg
          className="pointer-events-none absolute inset-x-0 top-0 h-16 w-full text-ink sm:h-20"
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          fill="currentColor"
          aria-hidden
        >
          <path d="M0,0 L1440,0 L1440,40 C1200,85 960,15 720,55 C480,90 240,10 0,55 Z" />
        </svg>
        <div className="relative mx-auto max-w-2xl px-4 py-16 text-center sm:px-8 sm:py-24">
          <ScrollReveal>
            <p className="text-sm font-medium uppercase tracking-widest text-gold">
              Ready when you are
            </p>
            <h2 className="mt-3 font-display text-3xl font-medium text-ink sm:text-4xl">
              Book your Umrah taxi with confidence
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-stone">
              Whether it's an airport pickup, an intercity journey, or a Ziyarat visit — get your
              booking confirmed within minutes.
            </p>
            <a
              href={`https://wa.me/${site.whatsappNumber}?text=Asalam-o-Alaikum!%20I%20want%20to%20book%20a%20taxi`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold px-8 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-goldsoft"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.48 1.33 4.99L2 22l5.2-1.36a9.94 9.94 0 0 0 4.84 1.23h.01c5.5 0 9.96-4.46 9.96-9.96 0-2.66-1.03-5.16-2.92-7.04A9.9 9.9 0 0 0 12.04 2z" />
              </svg>
              Book on WhatsApp
            </a>
          </ScrollReveal>
        </div>

        <svg
          className="pointer-events-none absolute inset-x-0 bottom-0 h-16 w-full rotate-180 text-inkdeep sm:h-20"
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          fill="currentColor"
          aria-hidden
        >
          <path d="M0,0 L1440,0 L1440,40 C1200,85 960,15 720,55 C480,90 240,10 0,55 Z" />
        </svg>
      </section>
    </>
  );
}
