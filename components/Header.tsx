"use client";

import Link from "next/link";
import { useState } from "react";
import type { Vehicle, ServicePage } from "@/lib/data";
import type { SiteSettings } from "@/lib/siteSettings";
import type { ZiyaratPage } from "@/lib/ziyaratData";

function NavDropdown({
  label,
  href,
  items,
}: {
  label: string;
  href: string;
  items: { slug: string; label: string; base: string }[];
}) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Link
        href={href}
        className="flex items-center gap-1 py-2 text-sm font-medium tracking-tight hover:text-gold transition-colors"
      >
        {label}
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden>
          <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </Link>
      {open && (
        <div className="absolute left-0 top-full z-40 w-72 border border-sandline bg-white py-2 shadow-lg">
          {items.map((item) => (
            <Link
              key={item.slug}
              href={`${item.base}/${item.slug}`}
              className="block px-4 py-2 text-sm text-charcoal hover:bg-sand hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Header({
  settings,
  fleet,
  services,
  ziyarat,
}: {
  settings: SiteSettings;
  fleet: Vehicle[];
  services: ServicePage[];
  ziyarat: ZiyaratPage[];
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const fleetLinks = fleet.filter((v) => v.hasDetailPage);
  const showZiyarat = settings.ziyaratEnabled;

  return (
    <header className="sticky top-0 z-50 border-b border-sandline bg-white/95 backdrop-blur">
      <div className="flex items-center justify-center gap-6 border-b border-sandline bg-ink px-4 py-1.5 text-xs text-white/90 sm:px-8">
        <a
          href={`https://wa.me/${settings.whatsappNumber}?text=Asalam-o-Alaikum!%20I%20want%20to%20book%20a%20taxi`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 hover:text-gold"
        >
          <svg
            className="h-3.5 w-3"
            fill="currentColor"
            viewBox="0 0 24 28"
            aria-hidden
          >
            <title>Phone</title>
            <path d="M20 18.641c0-0.078 0-0.172-0.031-0.25-0.094-0.281-2.375-1.437-2.812-1.687-0.297-0.172-0.656-0.516-1.016-0.516-0.688 0-1.703 2.047-2.312 2.047-0.313 0-0.703-0.281-0.984-0.438-2.063-1.156-3.484-2.578-4.641-4.641-0.156-0.281-0.438-0.672-0.438-0.984 0-0.609 2.047-1.625 2.047-2.312 0-0.359-0.344-0.719-0.516-1.016-0.25-0.438-1.406-2.719-1.687-2.812-0.078-0.031-0.172-0.031-0.25-0.031-0.406 0-1.203 0.187-1.578 0.344-1.031 0.469-1.781 2.438-1.781 3.516 0 1.047 0.422 2 0.781 2.969 1.25 3.422 4.969 7.141 8.391 8.391 0.969 0.359 1.922 0.781 2.969 0.781 1.078 0 3.047-0.75 3.516-1.781 0.156-0.375 0.344-1.172 0.344-1.578zM24 6.5v15c0 2.484-2.016 4.5-4.5 4.5h-15c-2.484 0-4.5-2.016-4.5-4.5v-15c0-2.484 2.016-4.5 4.5-4.5h15c2.484 0 4.5 2.016 4.5 4.5z"></path>
          </svg>
          {settings.phone}
        </a>
        <span className="flex items-center gap-1.5">
          <svg
            className="h-3 w-3"
            fill="currentColor"
            viewBox="0 0 16 16"
            aria-hidden
          >
            <title>Hours</title>
            <path d="M8 0c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8zM10.293 11.707l-3.293-3.293v-4.414h2v3.586l2.707 2.707-1.414 1.414z"></path>
          </svg>
          24/7
        </span>
      </div>

      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-8">
        <Link href="/" className="flex items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={settings.logoUrl} alt="Haramain Ways" className="h-20 w-auto sm:h-24" />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          <NavDropdown
            label="Services"
            href="/services"
            items={services.map((s) => ({ slug: s.slug, label: s.label, base: "/services" }))}
          />
          {showZiyarat && (
            <NavDropdown
              label="Ziyarat"
              href="/ziyarat"
              items={ziyarat.map((p) => ({ slug: p.slug, label: p.label, base: "/ziyarat" }))}
            />
          )}
          <NavDropdown
            label="Fleet"
            href="/fleet"
            items={fleetLinks.map((v) => ({ slug: v.slug, label: v.name, base: "/fleet" }))}
          />
          <Link href="/about" className="text-sm font-medium hover:text-gold">
            About
          </Link>
          <Link href="/umrah-insights" className="text-sm font-medium hover:text-gold">
            Umrah Visa
          </Link>
        </nav>

        <a
          href={`https://wa.me/${settings.whatsappNumber}?text=Asalam-o-Alaikum!%20I%20want%20to%20book%20a%20taxi`}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-inkdeep lg:inline-block"
        >
          Book on WhatsApp
        </a>

        <button
          className="self-center lg:hidden"
          aria-label="Toggle menu"
          onClick={() => setMobileOpen((v) => !v)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="1.8" />
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-sandline bg-white px-4 py-4 lg:hidden">
          <MobileSection title="Services" base="/services" items={services} labelKey="label" />
          {showZiyarat && (
            <MobileSection title="Ziyarat" base="/ziyarat" items={ziyarat} labelKey="label" />
          )}
          <MobileSection
            title="Fleet"
            base="/fleet"
            items={fleetLinks}
            labelKey="name"
          />
          <Link href="/about" className="block py-2 text-sm font-medium">
            About
          </Link>
          <Link href="/umrah-insights" className="block py-2 text-sm font-medium">
            Umrah Visa
          </Link>
          <a
            href={`https://wa.me/${settings.whatsappNumber}?text=Asalam-o-Alaikum!%20I%20want%20to%20book%20a%20taxi`}
            className="mt-3 block rounded-full bg-ink px-5 py-2.5 text-center text-sm font-semibold text-white"
          >
            Book on WhatsApp
          </a>
        </div>
      )}
    </header>
  );
}

function MobileSection<T extends { slug: string }>({
  title,
  base,
  items,
  labelKey,
}: {
  title: string;
  base: string;
  items: T[];
  labelKey: keyof T;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-sandline py-2">
      <button
        className="flex w-full items-center justify-between py-2 text-sm font-semibold"
        onClick={() => setOpen((v) => !v)}
      >
        {title}
        <span>{open ? "−" : "+"}</span>
      </button>
      {open && (
        <div className="pl-2">
          {items.map((item) => (
            <Link
              key={item.slug}
              href={`${base}/${item.slug}`}
              className="block py-1.5 text-sm text-stone"
            >
              {String(item[labelKey])}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
