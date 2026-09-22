import Image from "next/image";
import Link from "next/link";
import WaveDivider from "@/components/WaveDivider";
import { getSiteSettings } from "@/lib/siteSettings";

export const metadata = { title: "About | Haramain Ways" };

const specializations = [
  "Private airport transfers",
  "Intercity pilgrim transportation",
  "Ziyarat taxi services",
  "Family and group travel arrangements",
];

function IconClock() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M12 7v5l3.5 2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconBadge() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20 7h-4V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM10 5h4v2h-4V5zm2 12a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
    </svg>
  );
}

function IconHeart() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
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

const coreValues = [
  {
    title: "Reliability & Punctuality",
    body: "We recognize the importance of time-sensitive travel during Umrah and Hajj. Our experienced drivers, route planning, and real-time coordination ensure on-time pickups and drop-offs, even during peak pilgrimage seasons.",
    icon: IconClock,
  },
  {
    title: "Professional & Experienced Drivers",
    body: "All our drivers are licensed, trained, and familiar with pilgrimage routes, local regulations, and Ziyarat locations. Their experience ensures safe driving, respectful service, and a calm travel environment for pilgrims.",
    icon: IconBadge,
  },
  {
    title: "Respect, Care & Pilgrim-Centered Service",
    body: "We treat every traveler with dignity, patience, and understanding. Our team is committed to creating a comfortable, respectful, and welcoming atmosphere, especially for elderly pilgrims, families, and first-time visitors.",
    icon: IconHeart,
  },
  {
    title: "Flexible Services for Every Travel Need",
    body: "From airport transfers to intercity routes and multi-stop Ziyarat tours, we offer a wide range of taxi services tailored to individual pilgrims, families, and groups. Every journey is planned to match your needs, schedule, and comfort level.",
    icon: IconRoute,
  },
];

export default async function AboutPage() {
  const settings = await getSiteSettings();

  return (
    <>
      {/* About Us — hero */}
      <section className="relative overflow-hidden text-white">
        <Image
          src={settings.aboutHeroBgUrl}
          alt="Interior of Masjid an-Nabawi"
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-black/60" />

        <div
          className="relative mx-auto max-w-2xl px-4 py-20 sm:px-8 sm:py-28"
          style={{ textShadow: "0 2px 8px rgba(0,0,0,0.65)" }}
        >
          <p className="text-sm font-medium uppercase tracking-widest text-goldsoft">About Us</p>
          <h1 className="mt-3 font-display text-3xl font-medium leading-tight sm:text-4xl">
            We Are a Trusted Taxi Service for Pilgrims in Saudi Arabia
          </h1>

          <div className="mt-6 space-y-4 font-medium leading-relaxed text-white/90">
            <p>
              At Haramain Ways, we are more than just a transportation service. We are a
              pilgrim-focused travel team dedicated to delivering a smooth, comfortable, and
              dependable Umrah and Hajj transportation experience across Saudi Arabia.
            </p>
            <p>
              Every year, we assist pilgrims traveling to the holy cities of Makkah and Madinah,
              helping them move safely between airports, hotels, Ziyarat locations, and intercity
              routes with peace of mind. Our services are designed specifically for pilgrims who
              value comfort, privacy, punctuality, and reliability during their sacred journey.
            </p>
            <p>
              We operate throughout Saudi Arabia, including Riyadh, Taif, and Jeddah, and also
              serve additional cities upon request. However, our core expertise and most
              frequently traveled routes are between Jeddah, Makkah, and Madinah, where we
              specialize in:
            </p>
          </div>

          <ul className="mt-5 grid gap-2 font-medium text-white/90 sm:grid-cols-2">
            {specializations.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                {item}
              </li>
            ))}
          </ul>

          <p className="mt-6 font-medium text-white/80">
            You can view our head office location and full contact details on our{" "}
            <Link href="/contact" className="text-gold underline-offset-2 hover:underline">
              Contact Us page
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Our Mission */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-6">
              <p className="text-sm font-medium uppercase tracking-widest text-gold">
                Our Purpose
              </p>
              <h2 className="mt-3 font-display text-3xl font-medium text-ink sm:text-4xl">
                Our Mission
              </h2>
              <p className="mt-5 leading-relaxed text-stone">
                Our mission is to provide safe, professional, and personalized transportation
                solutions that support pilgrims throughout their Umrah and Hajj journey.
              </p>
              <p className="mt-4 leading-relaxed text-stone">
                We understand that transportation plays a vital role in a pilgrim&rsquo;s
                experience. A stress-free journey allows pilgrims to focus fully on worship,
                reflection, and spiritual fulfillment. Whether you need a luxury private car, an
                affordable family vehicle, or group transportation for Umrah or Hajj, our team is
                committed to serving you with care and integrity.
              </p>
            </div>
            <div className="lg:col-span-6">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-xl">
                <Image
                  src={settings.aboutMissionImageUrl}
                  alt="Courtyard canopies at Masjid an-Nabawi"
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Core Values */}
      <section className="relative overflow-hidden bg-ink text-white">
        <WaveDivider color="text-white" />

        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-8 sm:py-24">
          <p className="text-sm font-medium uppercase tracking-widest text-goldsoft">
            What We Stand For
          </p>
          <h2 className="mt-3 font-display text-3xl font-medium sm:text-4xl">Our Core Values</h2>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {coreValues.map(({ title, body, icon: Icon }) => (
              <div
                key={title}
                className="border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-colors hover:border-gold/50"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gold/15 text-gold">
                  <span className="h-5 w-5">
                    <Icon />
                  </span>
                </div>
                <h3 className="mt-4 font-display text-lg text-white">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{body}</p>
              </div>
            ))}
          </div>
        </div>

        <WaveDivider color="text-ink" position="bottom" dimOnFooterHover />
      </section>
    </>
  );
}
