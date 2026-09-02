import Link from "next/link";
import { routes, site } from "@/lib/data";

const socialLinks = [
  { label: "Facebook", href: site.social.facebook },
  { label: "Instagram", href: site.social.instagram },
  { label: "YouTube", href: site.social.youtube },
  { label: "Pinterest", href: site.social.pinterest },
  { label: "TikTok", href: site.social.tiktok },
  { label: "LinkedIn", href: site.social.linkedin },
];

export default function Footer() {
  return (
    <footer className="bg-inkdeep text-white/80">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-8">
        <p className="max-w-2xl text-sm leading-relaxed text-white/70">
          We provide safe and reliable transportation for Umrah and Hajj
          pilgrims. Arrival times may vary due to unforeseen circumstances —
          see our Terms &amp; Conditions for details.
        </p>

        <div className="mt-10 grid grid-cols-2 gap-8 sm:grid-cols-3">
          <div>
            <h3 className="font-display text-base text-white">Our Services</h3>
            <ul className="mt-4 space-y-2 text-sm">
              {routes.slice(0, 6).map((r) => (
                <li key={r.slug}>
                  <Link href={`/routes/${r.slug}`} className="hover:text-gold">
                    {r.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-base text-white">Useful links</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-gold">About</Link></li>
              <li><Link href="/contact" className="hover:text-gold">Contact</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-gold">Privacy Policy</Link></li>
              <li><Link href="/terms-and-conditions" className="hover:text-gold">Terms and Conditions</Link></li>
              <li><Link href="/umrah-insights" className="hover:text-gold">Umrah Insights</Link></li>
              <li><Link href="/pricing" className="hover:text-gold">Pricing</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-base text-white">Get in touch</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href={`tel:${site.phone}`} className="hover:text-gold">{site.phone}</a></li>
              <li><a href={`mailto:${site.email}`} className="hover:text-gold">{site.email}</a></li>
              <li className="pt-2 text-white/60">{site.address}</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-5 border-t border-white/10 pt-6">
          {socialLinks.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-white/70 hover:text-gold"
            >
              {s.label}
            </a>
          ))}
        </div>

        <p className="mt-8 text-xs text-white/50">
          © {new Date().getFullYear()} VIP Umrah Taxi — All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
