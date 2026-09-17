import Link from "next/link";
import WaveDivider from "@/components/WaveDivider";
import { Section, Bullets } from "@/components/LegalSection";
import { getSiteSettings } from "@/lib/siteSettings";

export const metadata = { title: "Terms and Conditions | Haramain Ways" };

const sections = [
  { id: "services-provided", title: "1. Services Provided" },
  { id: "booking-and-payment", title: "2. Booking and Payment" },
  { id: "cancellation-and-refund-policy", title: "3. Cancellation & Refund Policy" },
  { id: "passenger-responsibility", title: "4. Passenger Responsibility" },
  { id: "driver-conduct-and-safety", title: "5. Driver Conduct and Safety" },
  { id: "luggage-policy", title: "6. Luggage Policy" },
  { id: "service-limitations", title: "7. Service Limitations" },
  { id: "intellectual-property", title: "8. Intellectual Property" },
  { id: "privacy-policy", title: "9. Privacy Policy" },
  { id: "changes-to-terms", title: "10. Changes to Terms" },
  { id: "contact-us", title: "11. Contact Us" },
];

const bookingPayment = [
  "All bookings must be made via our website, phone, or WhatsApp.",
  "Payments can be made online or in cash, as agreed upon during booking.",
  "Prices quoted are fixed unless additional services are requested after confirmation.",
  "Full or partial advance payment may be required to confirm your booking.",
];

const cancellationRefund = [
  "Cancellations made at least 24 hours before the scheduled pickup time may be eligible for a full refund.",
  "Cancellations made within 24 hours of the pickup time may not be eligible for a refund.",
  "No-shows or last-minute cancellations are non-refundable.",
  "Haramain Ways reserves the right to cancel bookings in case of emergencies, vehicle issues, or unavoidable circumstances. In such cases, a full refund will be issued.",
];

const passengerResponsibility = [
  "Passengers are responsible for providing accurate information during booking.",
  "Passengers must ensure timely arrival at the pickup location.",
  "Any damage caused to the vehicle due to passenger negligence will be charged accordingly.",
];

const driverConduct = [
  "All our drivers are trained professionals who follow traffic laws and prioritize passenger safety.",
  "Passengers are required to wear seatbelts and avoid behavior that could distract the driver.",
  "Smoking and alcohol consumption are strictly prohibited in all our vehicles.",
];

const luggagePolicy = [
  "Each passenger is allowed a reasonable amount of luggage.",
  "Oversized or excessive luggage must be communicated at the time of booking.",
  "Haramain Ways is not liable for loss or damage to personal belongings during transit.",
];

const serviceLimitations = [
  "Services are subject to availability and local laws.",
  "We may refuse service to individuals who are abusive, intoxicated, or pose a risk to safety.",
];

export default async function TermsPage() {
  const settings = await getSiteSettings();

  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden bg-ink py-16 text-white transition-colors hover:bg-inkdeep sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-8">
          <p className="text-sm font-medium uppercase tracking-widest text-goldsoft">Legal</p>
          <h1 className="mt-3 font-display text-3xl font-medium sm:text-4xl">
            Terms and Conditions
          </h1>
          <p className="mt-4 max-w-2xl text-white/75">
            Welcome to Haramain Ways. By accessing or using our website and services, you agree
            to comply with and be bound by the following terms and conditions. If you do not
            agree with any part of these terms, please do not use our services.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-1.5 text-xs text-white/70">
            <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5" aria-hidden>
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
              <path
                d="M12 7v5l3.5 2"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Effective Date: 2 May 2025
          </div>
        </div>
        <WaveDivider color="text-white" position="bottom" />
      </section>

      {/* Body */}
      <section className="relative bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-[240px_1fr] lg:gap-16">
            {/* Table of contents */}
            <nav aria-label="Table of contents" className="hidden lg:block">
              <div className="sticky top-28">
                <p className="text-xs font-semibold uppercase tracking-wide text-stone">
                  On this page
                </p>
                <ul className="mt-4 space-y-1 border-l border-sandline">
                  {sections.map((s) => (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        className="-ml-px block border-l-2 border-transparent py-1.5 pl-4 text-sm text-stone transition-colors hover:border-gold hover:text-ink"
                      >
                        {s.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>

            {/* Content */}
            <div className="max-w-2xl space-y-10">
              <Section id="services-provided" title="1. Services Provided">
                <p>
                  Haramain Ways offers transportation services specifically tailored for Umrah
                  pilgrims and other travelers within designated regions. Services may include
                  airport transfers, hotel pickups, drop-offs, and other customized travel
                  arrangements.
                </p>
              </Section>

              <Section id="booking-and-payment" title="2. Booking and Payment">
                <Bullets items={bookingPayment} />
              </Section>

              <Section
                id="cancellation-and-refund-policy"
                title="3. Cancellation and Refund Policy"
              >
                <Bullets items={cancellationRefund} />
              </Section>

              <Section id="passenger-responsibility" title="4. Passenger Responsibility">
                <Bullets items={passengerResponsibility} />
              </Section>

              <Section id="driver-conduct-and-safety" title="5. Driver Conduct and Safety">
                <Bullets items={driverConduct} />
              </Section>

              <Section id="luggage-policy" title="6. Luggage Policy">
                <Bullets items={luggagePolicy} />
              </Section>

              <Section id="service-limitations" title="7. Service Limitations">
                <Bullets items={serviceLimitations} />
              </Section>

              <Section id="intellectual-property" title="8. Intellectual Property">
                <p>
                  All content on haramainways.com, including logos, text, graphics, and images,
                  is the property of Haramain Ways and protected by copyright laws.
                  Unauthorized use is strictly prohibited.
                </p>
              </Section>

              <Section id="privacy-policy" title="9. Privacy Policy">
                <p>
                  Your personal information is handled in accordance with our{" "}
                  <Link
                    href="/privacy-policy"
                    className="text-gold underline-offset-2 hover:underline"
                  >
                    Privacy Policy
                  </Link>
                  . By using our services, you consent to the collection and use of your data as
                  outlined therein.
                </p>
              </Section>

              <Section id="changes-to-terms" title="10. Changes to Terms">
                <p>
                  Haramain Ways reserves the right to update these Terms and Conditions at any
                  time. Continued use of the site and services after changes indicates your
                  acceptance of the revised terms.
                </p>
              </Section>

              <Section id="contact-us" title="11. Contact Us">
                <p>If you have any questions about these Terms and Conditions, please contact us:</p>
                <div className="mt-2 space-y-3">
                  <div className="flex flex-wrap items-center gap-4 border border-sandline bg-sand/40 p-5">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ink/5 text-ink">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
                        <path d="M6.6 10.8c1.4 2.8 3.7 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.2 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.9 21 3 13.1 3 3.3c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.2 1.1L6.6 10.8z" />
                      </svg>
                    </div>
                    <a href={`tel:${settings.whatsappNumber}`} className="font-medium text-ink hover:text-gold">
                      {settings.whatsappNumber}
                    </a>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 border border-sandline bg-sand/40 p-5">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ink/5 text-ink">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
                        <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
                      </svg>
                    </div>
                    <a
                      href={`mailto:${settings.email}`}
                      className="font-medium text-ink hover:text-gold"
                    >
                      {settings.email}
                    </a>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 border border-sandline bg-sand/40 p-5">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ink/5 text-ink">
                      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
                        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
                        <path
                          d="M3.5 9h17M3.5 15h17M12 3c2.2 2.5 3.4 5.6 3.4 9s-1.2 6.5-3.4 9c-2.2-2.5-3.4-5.6-3.4-9S9.8 5.5 12 3z"
                          stroke="currentColor"
                          strokeWidth="1.4"
                        />
                      </svg>
                    </div>
                    <a
                      href="https://haramainways.com"
                      className="font-medium text-ink hover:text-gold"
                    >
                      haramainways.com
                    </a>
                  </div>
                </div>
              </Section>

              <p className="border-t border-sandline pt-8 text-sm text-stone">
                See also our{" "}
                <Link
                  href="/privacy-policy"
                  className="text-gold underline-offset-2 hover:underline"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
        <WaveDivider color="text-inkdeep" position="bottom" dimOnFooterHover />
      </section>
    </>
  );
}
