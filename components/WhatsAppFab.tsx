import type { SiteSettings } from "@/lib/siteSettings";

export default function WhatsAppFab({ settings }: { settings: SiteSettings }) {
  return (
    <a
      href={`https://wa.me/${settings.whatsappNumber}?text=Asalam-o-Alaikum!%20I%20want%20to%20book%20a%20taxi`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Get a taxi instantly on WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.48 1.33 4.99L2 22l5.2-1.36a9.94 9.94 0 0 0 4.84 1.23h.01c5.5 0 9.96-4.46 9.96-9.96 0-2.66-1.03-5.16-2.92-7.04A9.9 9.9 0 0 0 12.04 2z" />
      </svg>
      Book on WhatsApp
    </a>
  );
}
