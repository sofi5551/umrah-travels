import Link from "next/link";
import type { ServicePage } from "@/lib/data";
import type { SiteSettings } from "@/lib/siteSettings";

export default function Footer({
  settings,
  services,
}: {
  settings: SiteSettings;
  services: ServicePage[];
}) {
  const socialLinks = [
    { label: "Facebook", link: settings.social.facebook },
    { label: "Instagram", link: settings.social.instagram },
    { label: "YouTube", link: settings.social.youtube },
    { label: "Pinterest", link: settings.social.pinterest },
    { label: "TikTok", link: settings.social.tiktok },
    { label: "LinkedIn", link: settings.social.linkedin },
  ]
    .filter((s) => s.link.enabled && s.link.url)
    .map((s) => ({ label: s.label, href: s.link.url }));

  return (
    <footer className="bg-inkdeep text-white/80 transition-[filter] duration-300 hover:brightness-90">
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
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="hover:text-gold">
                    {s.label}
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
              <li><Link href="/umrah-insights" className="hover:text-gold">Umrah Visa</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-base text-white">Get in touch</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href={`tel:${settings.phone}`} className="hover:text-gold">{settings.phone}</a></li>
              <li><a href={`mailto:${settings.email}`} className="hover:text-gold">{settings.email}</a></li>
              {settings.addressEnabled && (
                <li className="pt-2 text-white/60">{settings.address}</li>
              )}
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
          © {new Date().getFullYear()} Haramain Ways — All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
