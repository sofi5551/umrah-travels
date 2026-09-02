import BookingForm from "@/components/BookingForm";
import { site } from "@/lib/data";

export const metadata = { title: "Contact | VIP Umrah Taxi" };

function IconPhone() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.46.57 3.58a1 1 0 0 1-.25 1.01l-2.2 2.2z" />
    </svg>
  );
}

function IconMail() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
    </svg>
  );
}

function IconMapPin() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
    </svg>
  );
}

export default function ContactPage() {
  const contactDetails = [
    {
      icon: IconPhone,
      label: "Phone / WhatsApp",
      value: site.phone,
      href: `tel:${site.phone}`,
    },
    {
      icon: IconMail,
      label: "Email",
      value: site.email,
      href: `mailto:${site.email}`,
    },
    {
      icon: IconMapPin,
      label: "Head office",
      value: site.address,
      href: undefined,
    },
  ];

  return (
    <section className="relative overflow-hidden bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-8 sm:py-24">
        <p className="text-sm font-medium uppercase tracking-widest text-gold">Get in touch</p>
        <h1 className="mt-3 font-display text-3xl font-medium text-ink sm:text-4xl">
          Contact us
        </h1>
        <p className="mt-4 max-w-xl leading-relaxed text-stone">
          Book instantly on WhatsApp, or reach out directly — we&rsquo;re available 24/7.
        </p>

        <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="space-y-4">
              {contactDetails.map(({ icon: Icon, label, value, href }) => {
                const content = (
                  <div className="flex items-start gap-4 border border-sandline bg-sand/40 p-5 transition-colors hover:border-gold">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ink/5 text-ink">
                      <span className="h-5 w-5">
                        <Icon />
                      </span>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-stone">
                        {label}
                      </p>
                      <p className="mt-1 font-medium leading-relaxed text-ink">{value}</p>
                    </div>
                  </div>
                );
                return href ? (
                  <a key={label} href={href} className="block">
                    {content}
                  </a>
                ) : (
                  <div key={label}>{content}</div>
                );
              })}
            </div>

            <a
              href={`https://wa.me/${site.whatsappNumber}?text=Asalam-o-Alaikum!%20I%20want%20to%20book%20a%20taxi`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-goldsoft"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.48 1.33 4.99L2 22l5.2-1.36a9.94 9.94 0 0 0 4.84 1.23h.01c5.5 0 9.96-4.46 9.96-9.96 0-2.66-1.03-5.16-2.92-7.04A9.9 9.9 0 0 0 12.04 2z" />
              </svg>
              Book on WhatsApp
            </a>
          </div>

          <div className="border border-sandline bg-white p-6 shadow-lg sm:p-8">
            <h2 className="font-display text-xl text-ink">Send a booking request</h2>
            <p className="mt-1 text-sm text-stone">
              Share your travel details and our team will confirm your fare.
            </p>
            <div className="mt-6">
              <BookingForm compact />
            </div>
          </div>
        </div>
      </div>

      <svg
        className="pointer-events-none absolute inset-x-0 bottom-0 h-16 w-full rotate-180 text-inkdeep sm:h-20"
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        fill="currentColor"
        aria-hidden
      >
        <path d="M0,0 L1440,0 L1440,40 C1200,85 960,15 720,55 C480,90 240,10 0,55 Z" />
      </svg>
    </section>
  );
}
