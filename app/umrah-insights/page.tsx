import SectionHeading from "@/components/SectionHeading";
import WaveDivider from "@/components/WaveDivider";
import { getSiteSettings } from "@/lib/siteSettings";

export const metadata = { title: "Umrah Visa | Haramain Ways" };

function IconPassport() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="4" y="3" width="16" height="18" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="9" r="2.4" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M8 15.5c.9-1.3 2.2-2 4-2s3.1.7 4 2"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path d="M8 18.5h8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function IconKaaba() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="4.5" y="5" width="15" height="14" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4.5 10h15" stroke="currentColor" strokeWidth="1.6" />
      <rect x="10.2" y="13.5" width="3.6" height="5.5" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

const entryOptions = [
  {
    icon: IconPassport,
    tag: "Entry Authorization",
    title: "Electronic Travel Authorization (ETA)",
    body: "If you hold a passport from the United Kingdom, United States, or another eligible country, you may qualify for an Electronic Travel Authorization (ETA) — allowing entry into the Kingdom of Saudi Arabia for tourism, business, or Umrah.",
    whatsappText: "I want to apply for the Electronic Travel Authorization (ETA) for entering Saudi Arabia.",
  },
  {
    icon: IconKaaba,
    tag: "Pilgrimage Visa",
    title: "Umrah Visa",
    body: "A dedicated Umrah visa allows eligible pilgrims to enter Saudi Arabia specifically to perform Umrah. It is typically arranged through a licensed Umrah service provider or the official Nusuk platform before you travel.",
    whatsappText: "I want to apply for an Umrah visa.",
  },
];

export default async function UmrahInsightsPage() {
  const settings = await getSiteSettings();

  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden bg-ink py-16 text-white transition-colors hover:bg-inkdeep sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-8">
          <p className="text-sm font-medium uppercase tracking-widest text-goldsoft">Guides</p>
          <h1 className="mt-3 font-display text-3xl font-medium sm:text-4xl">Umrah Visa</h1>
          <p className="mt-4 max-w-2xl text-white/75">
            Everything to plan around before your trip — from entry requirements and visas to
            transport tips for Makkah, Madinah, Jeddah, and Taif.
          </p>
        </div>
        <WaveDivider color="text-white" position="bottom" />
      </section>

      {/* Body */}
      <section className="relative overflow-hidden bg-white">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-8">
          <SectionHeading
            title="Visa & entry essentials"
            intro="Check which pathway applies to you before you book your flight. If you're unsure, our team can point you in the right direction."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {entryOptions.map(({ icon: Icon, tag, title, body, whatsappText }) => (
              <div
                key={title}
                className="flex h-full flex-col bg-ink p-6 transition-colors hover:bg-inkdeep sm:p-7"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold/15 text-gold">
                  <span className="h-6 w-6">
                    <Icon />
                  </span>
                </div>
                <h3 className="mt-5 font-display text-xl text-white">{title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-white/70">{body}</p>
                <span className="mt-5 inline-flex w-fit items-center rounded-full border border-white/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-goldsoft">
                  {tag}
                </span>
                <a
                  href={`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(
                    `Asalam-o-Alaikum! ${whatsappText}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-gold px-5 py-3 text-sm font-semibold text-ink transition-colors hover:bg-goldsoft"
                >
                  Apply Now
                </a>
              </div>
            ))}
          </div>
        </div>
        <WaveDivider color="text-ink" position="bottom" dimOnFooterHover />
      </section>
    </>
  );
}
