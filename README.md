# VIP Umrah Taxi — Next.js rebuild

A content-equivalent, visually redesigned rebuild of vipumrahtaxi.com, built with Next.js 14 (App Router), TypeScript, and Tailwind CSS.

## Getting started

This project's dependencies were **not installed** in the environment that generated it (no network access there). To run it:

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## What's included

- **Homepage** (`app/page.tsx`) — hero, quote form, coverage, 3-step booking, popular routes, fleet, pricing teaser, testimonials, FAQ, final CTA.
- **16 route pages** at `/routes/[slug]` (e.g. `/routes/jeddah-to-makkah-taxi`), generated from `lib/data.ts`.
- **8 fleet pages** at `/fleet` (index) and `/fleet/[slug]` for the 5 vehicles that had detail pages on the original site (GMC Yukon XL, Hyundai Staria, Hyundai Starex H1, Toyota Hiace, Toyota Coaster).
- **6 fare pages** at `/pricing` (index) and `/pricing/[slug]`.
- **About, Contact, Privacy Policy, Terms and Conditions, Umrah Insights** pages.
- A **booking form** (`components/BookingForm.tsx`) that composes the trip details into a message and opens WhatsApp — same behavior as the original site, no backend required.

## Notes and assumptions

- **URLs differ slightly** from the original site: routes are nested under `/routes/`, `/fleet/`, and `/pricing/` instead of being flat top-level slugs (e.g. `/routes/jeddah-to-makkah-taxi` instead of `/jeddah-to-makkah-taxi`). This is standard Next.js App Router structure. If you need the exact flat URLs for SEO continuity, this is straightforward to change — say so and I'll restructure the routing.
- **Images are not included.** The original site's photos live on its WordPress media library; I could not download and redistribute them from a page fetch. Swap in real vehicle/route photos under `public/` and reference them with `next/image` — I left space for this in the fleet cards and route pages.
- **Privacy Policy and Terms pages are placeholders** — I didn't have access to the actual legal text from those pages, only a footer disclaimer. Replace with your real policy text.
- **Umrah Insights is a placeholder blog index** — the original site's actual blog posts weren't fetched. Wire this up to a CMS or add real posts.
- **Pricing is shown without specific SAR figures** — the original site doesn't expose exact fares in its page text (likely dynamic or quote-based), so fare pages point people to "request a quote" via WhatsApp, matching the original's actual behavior.
- **Booking form** always opens WhatsApp with a pre-filled message, mirroring the original — no email/database submission was requested.

## Design

Palette, type (Fraunces + Manrope), and layout are a deliberate redesign rather than a visual clone of the original WordPress theme — see `tailwind.config.ts` for the token system.
