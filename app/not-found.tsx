import Link from "next/link";
import { getSiteSettings } from "@/lib/siteSettings";

export const metadata = { title: "Page not found | Haramain Ways" };

export default async function NotFound() {
  const settings = await getSiteSettings();

  return (
    <section className="flex min-h-[calc(100vh-6.5rem)] items-center justify-center bg-ink px-4 py-16 text-center text-white sm:px-8">
      <div>
        <p className="font-display text-6xl font-medium text-gold sm:text-7xl">404</p>
        <h1 className="mt-4 font-display text-2xl font-medium sm:text-3xl">Page not found</h1>
        <p className="mx-auto mt-4 max-w-md text-white/75">
          The page you&rsquo;re looking for doesn&rsquo;t exist or may have moved. Let&rsquo;s get
          you back on track.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="rounded-full bg-gold px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-goldsoft"
          >
            Back to homepage
          </Link>
          <a
            href={`https://wa.me/${settings.whatsappNumber}?text=Asalam-o-Alaikum!%20I%20need%20help%20finding%20something%20on%20your%20site.`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-gold hover:text-gold"
          >
            Message us on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
