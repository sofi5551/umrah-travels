import { routes } from "@/lib/data";
import RouteCard from "@/components/RouteCard";
import SectionHeading from "@/components/SectionHeading";

export const metadata = { title: "Umrah Cab Routes | VIP Umrah Taxi" };

export default function RoutesIndexPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-8">
      <SectionHeading
        title="Umrah cab routes"
        intro="Private transfers across the most frequently used routes between Makkah, Madinah, Jeddah, Riyadh, and Taif."
      />
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {routes.map((route) => (
          <RouteCard key={route.slug} route={route} />
        ))}
      </div>
    </section>
  );
}
