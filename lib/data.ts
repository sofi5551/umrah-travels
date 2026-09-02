export const site = {
  name: "VIP Umrah Taxi",
  phone: "+923078970656",
  whatsappNumber: "923078970656",
  email: "contact@vipumrahtaxi.com",
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

export type CabRoute = {
  slug: string;
  from: string;
  to: string;
  label: string;
  blurb: string;
};

// The 16 route links from the original site's "Umrah Cab" menu.
export const routes: CabRoute[] = [
  { slug: "jeddah-to-madinah-taxi", from: "Jeddah", to: "Madinah", label: "Jeddah to Madinah Cab", blurb: "Direct transfer from Jeddah's airport or hotels straight to Madinah, timed around your flight." },
  { slug: "jeddah-to-makkah-taxi", from: "Jeddah", to: "Makkah", label: "Jeddah to Makkah Cab", blurb: "The most requested pilgrim route — airport to Haram, door to door, no transfers." },
  { slug: "jeddah-ziyarat-taxi", from: "Jeddah", to: "Ziyarat sites", label: "Jeddah Ziyarat Cab", blurb: "A private driver for the day to visit Jeddah's historic and religious sites at your pace." },
  { slug: "madinah-to-makkah-taxi", from: "Madinah", to: "Makkah", label: "Madinah to Makkah Cab", blurb: "Comfortable intercity transfer between the two holy cities, with prayer-time stops on request." },
  { slug: "madinah-ziyarat-taxi", from: "Madinah", to: "Ziyarat sites", label: "Madinah Ziyarat Cab", blurb: "Visit Quba Mosque, Mount Uhud, and the Seven Mosques with a driver who knows the route well." },
  { slug: "makkah-to-jeddah-taxi", from: "Makkah", to: "Jeddah", label: "Makkah to Jeddah Cab", blurb: "Return transfer from Makkah to Jeddah's airport or city hotels, timed to your flight." },
  { slug: "makkah-ziyarat-taxi", from: "Makkah", to: "Ziyarat sites", label: "Makkah Ziyarat Cab", blurb: "A guided-pace tour of Jabal al-Noor, Jabal Thawr, and Makkah's other historic sites." },
  { slug: "makkah-to-medina-taxi", from: "Makkah", to: "Madinah", label: "Makkah to Madinah Cab", blurb: "Private transfer from Makkah to Madinah, non-stop or with rest breaks as you prefer." },
  { slug: "madinah-to-jeddah-taxi", from: "Madinah", to: "Jeddah", label: "Madinah to Jeddah Cab", blurb: "Airport-bound transfer from Madinah to Jeddah, coordinated with your departure time." },
  { slug: "taif-ziyarat-taxi", from: "Taif", to: "Ziyarat sites", label: "Taif Ziyarat Cab", blurb: "A cooler-climate day trip to Taif's gardens and historic sites, door to door." },
  { slug: "madinah-to-riyadh-taxi", from: "Madinah", to: "Riyadh", label: "Madinah to Riyadh Cab", blurb: "Long-distance intercity transfer between Madinah and the capital, in a private vehicle." },
  { slug: "riyadh-to-madinah-taxi", from: "Riyadh", to: "Madinah", label: "Riyadh to Madinah Cab", blurb: "Private transfer from Riyadh to Madinah for pilgrims routing through the capital." },
  { slug: "jeddah-to-riyadh-taxi", from: "Jeddah", to: "Riyadh", label: "Jeddah to Riyadh Cab", blurb: "Direct road transfer connecting Jeddah and Riyadh for business or pilgrim travel." },
  { slug: "riyadh-to-jeddah-taxi", from: "Riyadh", to: "Jeddah", label: "Riyadh to Jeddah Cab", blurb: "Comfortable long-distance transfer from Riyadh back to Jeddah." },
  { slug: "makkah-to-riyadh-taxi", from: "Makkah", to: "Riyadh", label: "Makkah to Riyadh Cab", blurb: "Private intercity travel between Makkah and Riyadh, with luggage space for groups." },
  { slug: "riyadh-to-makkah-taxi", from: "Riyadh", to: "Makkah", label: "Riyadh to Makkah Cab", blurb: "Transfer from Riyadh into Makkah, arranged in advance with a confirmed vehicle." },
];

export type FareRoute = {
  slug: string;
  label: string;
  from: string;
  to: string;
};

// The 6 fare pages linked from the original site's "Pricing" menu.
export const fareRoutes: FareRoute[] = [
  { slug: "makkah-to-jeddah-taxi-fare", label: "Makkah to Jeddah Taxi Fare", from: "Makkah", to: "Jeddah" },
  { slug: "jeddah-to-madinah-taxi-fare", label: "Jeddah to Madinah Taxi Fare", from: "Jeddah", to: "Madinah" },
  { slug: "madinah-to-makkah-taxi-fare", label: "Madinah to Makkah Taxi Fare", from: "Madinah", to: "Makkah" },
  { slug: "makkah-to-madinah-taxi-fare", label: "Makkah to Madinah Taxi Fare", from: "Makkah", to: "Madinah" },
  { slug: "madinah-to-riyadh-taxi-fare", label: "Madinah ↔ Riyadh Taxi Fare", from: "Madinah", to: "Riyadh" },
  { slug: "jeddah-to-riyadh-taxi-fare", label: "Jeddah ↔ Riyadh Taxi Fare", from: "Jeddah", to: "Riyadh" },
];

export type VehicleModel = {
  format: "glb" | "fbx" | "obj";
  url: string;
  mtlUrl?: string;
  resourcePath?: string;
  textureOverrides?: { mesh: string; map?: string; color?: string }[];
  // false for large files (40MB+) that shouldn't block the full-screen boot
  // loader — they still load and fade in on their own. Defaults to true.
  critical?: boolean;
};

export type Vehicle = {
  slug: string;
  name: string;
  type: string;
  className: string;
  seats: number;
  luggage: string;
  hasDetailPage: boolean;
  model?: VehicleModel;
};

export const fleet: Vehicle[] = [
  {
    slug: "hyundai-sonata",
    name: "Hyundai Sonata",
    type: "Sedan",
    className: "Economy Class",
    seats: 4,
    luggage: "2–3 bags",
    hasDetailPage: false,
    model: { format: "glb", url: "/models/fleet/hyundai-sonata/model.glb" },
  },
  {
    slug: "toyota-camry",
    name: "Toyota Camry",
    type: "Sedan",
    className: "Economy Class",
    seats: 4,
    luggage: "2–3 bags",
    hasDetailPage: false,
    model: { format: "glb", url: "/models/fleet/toyota-camry/model.glb" },
  },
  {
    slug: "chevrolet-suburban",
    name: "Chevrolet Suburban",
    type: "SUV",
    className: "Luxury Class",
    seats: 7,
    luggage: "6–8 bags",
    hasDetailPage: false,
    model: {
      format: "obj",
      url: "/models/fleet/chevrolet-suburban/model.obj",
      mtlUrl: "/models/fleet/chevrolet-suburban/model.mtl",
      resourcePath: "/models/fleet/chevrolet-suburban/textures/",
    },
  },
  {
    slug: "gmc-yukon-xl",
    name: "GMC Yukon XL",
    type: "SUV",
    className: "Luxury Class",
    seats: 7,
    luggage: "6–8 bags",
    hasDetailPage: true,
    model: {
      format: "fbx",
      url: "/models/fleet/gmc-yukon-xl/model.fbx",
      resourcePath: "/models/fleet/gmc-yukon-xl/textures/",
      critical: false,
    },
  },
  {
    slug: "hyundai-staria",
    name: "Hyundai Staria",
    type: "Minivan",
    className: "Economy Class",
    seats: 7,
    luggage: "8–10 bags",
    hasDetailPage: true,
    model: {
      format: "fbx",
      url: "/models/fleet/hyundai-staria/model.fbx",
      resourcePath: "/models/fleet/hyundai-staria/textures/",
      critical: false,
    },
  },
  {
    slug: "toyota-hiace",
    name: "Toyota Hiace",
    type: "Minibus",
    className: "Large Group Transport",
    seats: 11,
    luggage: "16–17 bags",
    hasDetailPage: true,
    model: { format: "fbx", url: "/models/fleet/toyota-hiace/model.fbx" },
  },
];

export type Review = {
  id: string;
  name: string;
  rating: number;
  review: string;
  avatarUrl?: string | null;
  createdAt: string;
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
