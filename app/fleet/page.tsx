import Image from "next/image";
import { getFleet } from "@/lib/fleetData";
import { getSiteSettings } from "@/lib/siteSettings";
import FleetCard from "@/components/FleetCard";
import WaveDivider from "@/components/WaveDivider";

export const metadata = {
  title: "Our Fleet | Haramain Ways",
  description:
    "A modern fleet of sedans, vans, and buses for Umrah and Hajj pilgrims — private, non-shared vehicles matched to your group size and luggage.",
};
export const revalidate = 60;

export default async function FleetIndexPage() {
  const [fleet, settings] = await Promise.all([getFleet(), getSiteSettings()]);

  return (
    <section className="relative overflow-hidden text-white">
      <Image
        src={settings.fleetHeroBgUrl}
        alt="Golden desert dunes and sandstone cliffs in Saudi Arabia"
        fill
        sizes="100vw"
        priority
        className="object-cover"
      />
      <div className="pointer-events-none absolute inset-0 bg-ink/45" />

      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-8 sm:py-28">
        <div className="max-w-3xl" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.65)" }}>
          <p className="text-sm font-medium uppercase tracking-widest text-goldsoft">
            Our Fleet
          </p>
          <h1 className="mt-3 font-display text-3xl font-medium leading-tight sm:text-4xl">
            A vehicle for every group size and journey
          </h1>
          <p className="mt-5 max-w-2xl leading-relaxed text-white/85">
            We operate a modern fleet of vehicles designed to meet different group sizes, comfort
            preferences, and luggage requirements. Options include sedans for individual
            travelers, spacious vans for families, and larger vehicles for group transport,
            including Umrah bus service for larger pilgrim groups. Every vehicle is privately
            booked and non-shared — you travel only with your own party, never pooled with
            strangers.
          </p>
          <p className="mt-4 max-w-2xl leading-relaxed text-white/85">
            All vehicles are air-conditioned, regularly maintained, and driven by licensed,
            experienced drivers familiar with the routes between Makkah, Madinah, Jeddah, Taif,
            and Riyadh. Fares are confirmed in advance based on your chosen vehicle and route, so
            there are no surprises on the day of travel.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {fleet.map((vehicle) => (
            <FleetCard key={vehicle.slug} vehicle={vehicle} whatsappNumber={settings.whatsappNumber} />
          ))}
        </div>
      </div>

      <WaveDivider color="text-ink" position="bottom" dimOnFooterHover />
    </section>
  );
}
