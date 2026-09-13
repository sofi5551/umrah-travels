export const site = {
  name: "Haramain Ways",
  phone: "+923078970656",
  whatsappNumber: "923078970656",
  email: "contact@haramainways.com",
  address:
    "Al-Aziziyah Al-Janoubiyah, King Khalid Bridge, Aljamia District, Makkah - C.R 7050292502",
  social: {
    facebook: "https://www.facebook.com/vipumrahtaxi/",
    instagram: "https://www.instagram.com/vipumrahtaxi/",
    youtube: "https://www.youtube.com/@vipumrahtaxicom",
    pinterest: "https://www.pinterest.com/vipumrahtaxi/",
    tiktok: "https://www.tiktok.com/@vipumrahtaxicom",
    linkedin: "https://www.linkedin.com/company/vip-umrah-taxi/",
    playstore:
      "https://play.google.com/store/apps/details?id=com.sa.vipumrahtaxi",
  },
};

export type ServicePage = {
  /** DB row id — undefined for hardcoded fallback services (no admin content blocks to fetch). */
  id?: string;
  slug: string;
  label: string;
  from: string;
  to: string;
  description: string;
  /** Admin-controlled: shows the "Return transfer" promo card on this page. */
  showReturnTransfer?: boolean;
};

/** Used when a service page has no custom description set. */
export function buildDefaultServiceDescription(input: { from: string; to: string }) {
  return `Your ${input.from} to ${input.to} transfer is arranged as a private, door-to-door journey. We confirm your vehicle, schedule, and fare in advance, and your driver plans the route around traffic and prayer times.`;
}

// Seed/fallback services, shown when Supabase isn't configured yet.
export const services: ServicePage[] = [
  { slug: "makkah-to-jeddah", label: "Makkah to Jeddah", from: "Makkah", to: "Jeddah", description: buildDefaultServiceDescription({ from: "Makkah", to: "Jeddah" }) },
  { slug: "jeddah-to-madinah", label: "Jeddah to Madinah", from: "Jeddah", to: "Madinah", description: buildDefaultServiceDescription({ from: "Jeddah", to: "Madinah" }) },
  { slug: "madinah-to-makkah", label: "Madinah to Makkah", from: "Madinah", to: "Makkah", description: buildDefaultServiceDescription({ from: "Madinah", to: "Makkah" }) },
  { slug: "makkah-to-madinah", label: "Makkah to Madinah", from: "Makkah", to: "Madinah", description: buildDefaultServiceDescription({ from: "Makkah", to: "Madinah" }) },
  { slug: "madinah-riyadh", label: "Madinah ↔ Riyadh", from: "Madinah", to: "Riyadh", description: buildDefaultServiceDescription({ from: "Madinah", to: "Riyadh" }) },
  { slug: "jeddah-riyadh", label: "Jeddah ↔ Riyadh", from: "Jeddah", to: "Riyadh", description: buildDefaultServiceDescription({ from: "Jeddah", to: "Riyadh" }) },
];

export type Vehicle = {
  slug: string;
  name: string;
  type: string;
  className: string;
  seats: number;
  luggage: string;
  hasDetailPage: boolean;
  image: string;
  imageAlt: string;
  bookingNote: string;
  comfortNote: string;
  description: string;
};

export const DEFAULT_BOOKING_NOTE = "100% private & non-shared";
export const DEFAULT_COMFORT_NOTE = "Air-conditioned, regularly maintained";

/** Used when a vehicle has no custom description set — keeps it accurate to
 * whatever name/type/seats the admin has entered rather than going stale. */
export function buildDefaultDescription(input: { name: string; type: string; seats: number }) {
  return `The ${input.name} is assigned for ${input.type.toLowerCase()} transfers carrying up to ${input.seats} passengers, suited to Umrah and Hajj travel between Makkah, Madinah, Jeddah, and Taif.`;
}

export const fleet: Vehicle[] = [
  {
    slug: "toyota-camry",
    name: "Toyota Camry",
    type: "Sedan",
    className: "Economy Class",
    seats: 4,
    luggage: "2–3 bags",
    hasDetailPage: true,
    image: "/images/fleet/toyota-camry.jpeg",
    imageAlt: "White Toyota Camry 2021-2024 in Makkah, Saudi Arabia",
    bookingNote: DEFAULT_BOOKING_NOTE,
    comfortNote: DEFAULT_COMFORT_NOTE,
    description: buildDefaultDescription({ name: "Toyota Camry", type: "Sedan", seats: 4 }),
  },
  {
    slug: "hyundai-staria",
    name: "Hyundai Staria",
    type: "Minivan",
    className: "Economy Class",
    seats: 7,
    luggage: "8–10 bags",
    hasDetailPage: true,
    image: "/images/fleet/hyundai-staria.jpeg",
    imageAlt: "Black Hyundai Staria 2022 passenger van for Haramain transport",
    bookingNote: DEFAULT_BOOKING_NOTE,
    comfortNote: DEFAULT_COMFORT_NOTE,
    description: buildDefaultDescription({ name: "Hyundai Staria", type: "Minivan", seats: 7 }),
  },
  {
    slug: "gmc-yukon-denali",
    name: "GMC Yukon Denali",
    type: "SUV",
    className: "Luxury Class",
    seats: 7,
    luggage: "6–8 bags",
    hasDetailPage: true,
    image: "/images/fleet/gmc-yukon-denali.jpeg",
    imageAlt: "Black GMC Yukon Denali 2021-2024 in Makkah, Saudi Arabia",
    bookingNote: DEFAULT_BOOKING_NOTE,
    comfortNote: DEFAULT_COMFORT_NOTE,
    description: buildDefaultDescription({ name: "GMC Yukon Denali", type: "SUV", seats: 7 }),
  },
  {
    slug: "toyota-hiace",
    name: "Toyota HiAce",
    type: "Minibus",
    className: "Large Group Transport",
    seats: 11,
    luggage: "16–17 bags",
    hasDetailPage: true,
    image: "/images/fleet/toyota-hiace.jpeg",
    bookingNote: DEFAULT_BOOKING_NOTE,
    comfortNote: DEFAULT_COMFORT_NOTE,
    imageAlt: "White Toyota HiAce 2019 passenger van for Haramain transport",
    description: buildDefaultDescription({ name: "Toyota HiAce", type: "Minibus", seats: 11 }),
  },
];

export type Review = {
  id: string;
  name: string;
  rating: number;
  review: string;
  avatarUrl?: string | null;
  createdAt: string;
  /** "user" = submitted through the public review form (delete-only in
   * admin). "admin" = added/edited from the admin panel. Undefined for the
   * hardcoded fallback below, which is display-only and never edited. */
  source?: "user" | "admin";
};

// Seed reviews — always shown alongside whatever's been submitted through the
// feedback form, merged and sorted together by date (newest first).
export const testimonials: Review[] = [
  {
    id: "seed-1",
    name: "Tam Parlak",
    rating: 5,
    review: "Great taxi experience. The driver offered his hotspot and was always on time.",
    createdAt: "2026-08-21",
  },
  {
    id: "seed-2",
    name: "Riyazatulla Baig Mirza",
    rating: 5,
    review: "Very helpful, prompt, and professional service. I'd encourage families traveling with kids to use this.",
    createdAt: "2026-08-14",
  },
  {
    id: "seed-3",
    name: "Aulia Safitri",
    rating: 4,
    review: "The driver was professional and on time, and the vehicle was clean and comfortable throughout.",
    createdAt: "2026-08-02",
  },
  {
    id: "seed-4",
    name: "Aulia Safitri",
    rating: 4,
    review: "Good service.",
    createdAt: "2026-07-24",
  },
  {
    id: "seed-5",
    name: "Bilal Rahem",
    rating: 5,
    review: "We booked a Staria van from Madinah to Jeddah — a new and comfortable car.",
    createdAt: "2026-07-11",
  },
  {
    id: "seed-6",
    name: "Kamal Hussain",
    rating: 5,
    review: "Booked a taxi for Makkah Ziyarat. The driver was punctual, respectful, and guided us well.",
    createdAt: "2026-06-29",
  },
];

export const faqs = [
  { q: "How do I travel from the airport to Makkah?", a: "Makkah has no airport of its own, so pilgrims land in Jeddah, Madinah, Taif, or Riyadh and continue by road. A private taxi takes you straight from the airport to your hotel with no stops, which is usually the easiest option for families and groups." },
  { q: "How far in advance should I book?", a: "Aim for 1–2 weeks ahead, especially during Ramadan and Hajj season, so your preferred vehicle and price are confirmed early." },
  { q: "Do you offer airport transfers?", a: "Yes — from King Abdulaziz International Airport in Jeddah, Prince Mohammad bin Abdulaziz Airport in Madinah, King Khalid Airport in Riyadh, Taif Regional Airport, and other locations across Saudi Arabia." },
  { q: "Do you provide services for both Umrah and Hajj pilgrims?", a: "Yes, for both — covering airport transfers, intercity travel, and Ziyarat visits." },
  { q: "Do your drivers speak multiple languages?", a: "Many drivers speak Urdu, English, Hindi, and Arabic, which helps pilgrims from different countries communicate easily." },
  { q: "Do prices change during the year?", a: "Fares can rise during peak periods like Ramadan and Hajj due to demand. Booking ahead helps secure better pricing and availability." },
  { q: "Can I change or cancel my booking?", a: "Yes. Let us know as early as possible so we can adjust the schedule or vehicle accordingly." },
  { q: "What is an Umrah taxi service?", a: "A private transport service built specifically for pilgrims — direct routes, flexible timing, and vehicles sized for families and groups." },
  { q: "Is an Umrah taxi different from a regular taxi?", a: "Yes — it's pre-arranged, uses vehicles suited to pilgrim travel, and drivers know the routes between Makkah, Madinah, and other key sites well." },
  { q: "Can I book before arriving in Saudi Arabia?", a: "Yes, international pilgrims can pre-book by WhatsApp or the online form so everything is confirmed before they land." },
  { q: "How can I book a taxi for Umrah travel?", a: "Share your travel details through WhatsApp or the form on this site. Once confirmed, your pickup and journey are scheduled in advance." },
  { q: "Is the service suitable for families and groups?", a: "Yes — vehicles range from 4-seat sedans to a 16-seat bus, with room for extra luggage and specific travel needs." },
];

export const steps = [
  { title: "Share your travel details", body: "Send your pickup location, destination, travel date, and passenger count through the booking form or WhatsApp." },
  { title: "Receive confirmation", body: "Our team confirms the vehicle, schedule, and fare in advance, so you know exactly what to expect." },
  { title: "Travel as planned", body: "Your driver arrives on time for a smooth, comfortable journey to your destination." },
];
