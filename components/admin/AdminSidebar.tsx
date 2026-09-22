"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { logout } from "@/app/admin/login/actions";

const STORAGE_KEY = "admin-sidebar-expanded";

const navItems = [
  { href: "/admin/quotes", label: "Quotes", icon: IconQuotes },
  { href: "/admin/contacts", label: "Contacts", icon: IconContacts },
  { href: "/admin/reviews", label: "Reviews", icon: IconReviews },
  { href: "/admin/social-icons", label: "Social Icons", icon: IconSocial },
  { href: "/admin/contact-details", label: "Contact Details", icon: IconContactDetails },
  { href: "/admin/fleet", label: "Fleet", icon: IconFleet },
  { href: "/admin/services", label: "Services", icon: IconPricing },
  { href: "/admin/ziyarat", label: "Ziyarat", icon: IconZiyarat },
  { href: "/admin/background-media", label: "Background Media", icon: IconMedia },
  { href: "/admin/promo-videos", label: "Promo Videos", icon: IconPromo },
  { href: "/admin/branding", label: "Logo & Favicon", icon: IconBrand },
];

export default function AdminSidebar({
  email,
  faviconUrl,
}: {
  email: string;
  faviconUrl: string;
}) {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    try {
      setExpanded(localStorage.getItem(STORAGE_KEY) === "1");
    } catch {
      // localStorage unavailable — default stays collapsed
    }
  }, []);

  function toggle() {
    setExpanded((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(STORAGE_KEY, next ? "1" : "0");
      } catch {
        // ignore
      }
      return next;
    });
  }

  return (
    <>
      {expanded && (
        <div
          className="fixed inset-0 z-40 bg-ink/50 lg:hidden"
          onClick={toggle}
          aria-hidden
        />
      )}

      <aside
        className={`flex shrink-0 flex-col bg-ink text-white ${
          expanded
            ? "fixed inset-y-0 left-0 z-50 w-60 lg:sticky lg:top-0 lg:h-screen"
            : "sticky top-0 z-40 h-screen w-16"
        }`}
      >
        <div className="flex items-center gap-3 px-3 py-6">
          <Link
            href="/"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/15 transition-colors hover:bg-gold/25"
            aria-label="Go to homepage"
            title="Go to homepage"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={faviconUrl} alt="" className="h-7 w-7 object-contain" aria-hidden />
          </Link>
          {expanded && (
            <Link href="/" className="min-w-0">
              <p className="truncate font-display text-lg text-white hover:text-goldsoft">
                Haramain Ways
              </p>
              <p className="text-xs uppercase tracking-widest text-goldsoft">Admin</p>
            </Link>
          )}
        </div>

        <button
          type="button"
          onClick={toggle}
          aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
          className="mx-3 flex h-9 w-9 items-center justify-center rounded text-white/70 transition-colors hover:bg-white/10 hover:text-white"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>

        <nav className="mt-4 flex-1 space-y-1 px-3">
          {navItems.map((item) => {
            const active = pathname?.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                title={item.label}
                className={`flex items-center gap-3 rounded px-3 py-2 text-sm transition-colors ${
                  active ? "bg-white/10 text-white" : "text-white/80 hover:bg-white/10 hover:text-white"
                }`}
              >
                <span className="h-5 w-5 shrink-0">
                  <item.icon />
                </span>
                {expanded && <span className="truncate">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-white/10 px-3 py-4">
          {expanded && <p className="truncate px-3 text-xs text-white/50">{email}</p>}
          <form action={logout}>
            <button
              type="submit"
              title="Log out"
              className={`mt-2 flex w-full items-center gap-3 rounded px-3 py-2 text-sm text-white/80 transition-colors hover:bg-white/10 hover:text-white`}
            >
              <span className="h-5 w-5 shrink-0">
                <IconLogout />
              </span>
              {expanded && <span>Log out</span>}
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}

function IconQuotes() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20 2H4a2 2 0 0 0-2 2v18l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z" />
    </svg>
  );
}

function IconContacts() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0 2c-4.42 0-8 2.24-8 5v2h16v-2c0-2.76-3.58-5-8-5z" />
    </svg>
  );
}

function IconReviews() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2l2.9 6.26L22 9.27l-5 4.63L18.2 21 12 17.3 5.8 21 7 13.9l-5-4.63 7.1-1.01L12 2z" />
    </svg>
  );
}

function IconSocial() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M3 12h18M12 3c2.4 2.5 2.4 15.5 0 18M12 3c-2.4 2.5-2.4 15.5 0 18"
        stroke="currentColor"
        strokeWidth="1.4"
      />
    </svg>
  );
}

function IconContactDetails() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.46.57 3.58a1 1 0 0 1-.25 1.01l-2.2 2.2z" />
    </svg>
  );
}

function IconFleet() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1h12v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-8l-2.08-5.99zM6.5 16A1.5 1.5 0 1 1 6.5 13a1.5 1.5 0 0 1 0 3zm11 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM5 11l1.5-4.5h11L19 11H5z" />
    </svg>
  );
}

function IconPricing() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.41l9 9c.36.36.86.59 1.41.59.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z" />
    </svg>
  );
}

function IconMedia() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="4" width="18" height="14" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="m3 15 5-4.5 4 3.5 3-2.5 6 5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="8" cy="9" r="1.4" fill="currentColor" />
    </svg>
  );
}

function IconPromo() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="2.5" y="5" width="15" height="14" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="m9.5 9 5 3-5 3V9z" fill="currentColor" />
      <path d="m17.5 10 4-2.5v9l-4-2.5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

function IconBrand() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconZiyarat() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 2v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M9 22V13a3 3 0 0 1 6 0v9" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path
        d="M4 22v-8.5C4 9 7.5 6.5 8.5 5.5M20 22v-8.5C20 9 16.5 6.5 15.5 5.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M2 22h20" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function IconLogout() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M9 3H5a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h4M16 16l4-4-4-4M20 12H9"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
