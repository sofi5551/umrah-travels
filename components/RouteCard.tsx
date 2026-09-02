import Link from "next/link";
import { CabRoute } from "@/lib/data";

export default function RouteCard({ route }: { route: CabRoute }) {
  return (
    <Link
      href={`/routes/${route.slug}`}
      className="group flex flex-col justify-between border border-sandline bg-white p-6 transition-colors hover:border-gold"
    >
      <div>
        <p className="text-sm text-stone">
          {route.from} <span className="text-gold">→</span> {route.to}
        </p>
        <h3 className="mt-2 font-display text-lg text-ink">{route.label}</h3>
        <p className="mt-2 text-sm leading-relaxed text-stone">{route.blurb}</p>
      </div>
      <span className="mt-5 inline-block text-sm font-semibold text-ink group-hover:text-gold">
        See route details →
      </span>
    </Link>
  );
}
