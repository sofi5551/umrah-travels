import Link from "next/link";
import WaveDivider from "@/components/WaveDivider";
import { Section, Bullets } from "@/components/LegalSection";
import { getSiteSettings } from "@/lib/siteSettings";
export const metadata = { title: "Privacy Policy | Haramain Ways" };

const sections = [
  { id: "information-we-collect", title: "Information We Collect" },
  { id: "use-of-your-information", title: "Use of Your Information" },
  { id: "sharing-your-information", title: "Sharing Your Information" },
  { id: "data-security", title: "Data Security" },
  { id: "your-rights", title: "Your Rights" },
  { id: "childrens-privacy", title: "Children’s Privacy" },
  { id: "retargeting-and-online-advertising", title: "Retargeting & Online Advertising" },
  { id: "analytics-tools", title: "Analytics Tools" },
  { id: "changes-to-this-privacy-policy", title: "Changes to This Policy" },
  { id: "contact-us", title: "Contact Us" },
];

const uses = [
  "Provide and operate the Service",
  "Process your taxi bookings and reservations",
  "Send you important information about your bookings and reservations",
  "Respond to your inquiries and requests",
  "Improve the Service and our offerings",
  "Send you promotional communications (with your consent)",
];

const rights = [
  "Access your personal data",
  "Rectify inaccurate personal data",
  "Request the erasure of your personal data",
  "Object to the processing of your personal data",
];

export default async function PrivacyPolicyPage() {
  const settings = await getSiteSettings();
  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden bg-ink py-16 text-white transition-colors hover:bg-inkdeep sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-8">
          <p className="text-sm font-medium uppercase tracking-widest text-goldsoft">Legal</p>
          <h1 className="mt-3 font-display text-3xl font-medium sm:text-4xl">Privacy Policy</h1>
          <p className="mt-4 max-w-2xl text-white/75">
            This policy discloses the privacy practices of Haramain Ways (&ldquo;us,&rdquo;
            &ldquo;we,&rdquo; or &ldquo;our&rdquo;) and applies to your use of{" "}
            <a
              href="https://haramainways.com/"
              className="text-gold underline-offset-2 hover:underline"
            >
              haramainways.com
            </a>{" "}
            (the &ldquo;Service&rdquo;).
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
            Effective Date: 23 May 2024
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
              <Section id="information-we-collect" title="Information We Collect">
                <p>
                  We collect several different types of information for various purposes to
                  improve our Service to you.
                </p>
                <div>
                  <h3 className="font-display text-lg text-ink">Personal Data</h3>
                  <p className="mt-1.5">
                    When you book a taxi through our website, we may collect personal data such
                    as your name, email address, phone number, and passport information. We may
                    also collect information about your travel itinerary, such as your arrival
                    and departure dates, and the number of pilgrims in your party.
                  </p>
                </div>
                <div>
                  <h3 className="font-display text-lg text-ink">Usage Data</h3>
                  <p className="mt-1.5">
                    We may collect information about your activity on the Service, such as the
                    pages you visit and the searches you perform.
                  </p>
                </div>
                <div>
                  <h3 className="font-display text-lg text-ink">Device Data</h3>
                  <p className="mt-1.5">
                    We may collect information about the device you use to access the Service,
                    such as the type of device, operating system, IP address, browser type, and
                    unique device identifiers.
                  </p>
                </div>
              </Section>

              <Section id="use-of-your-information" title="Use of Your Information">
                <p>We use the information we collect to:</p>
                <Bullets items={uses} />
              </Section>

              <Section id="sharing-your-information" title="Sharing Your Information">
                <p>
                  We may share your information with third-party service providers who help us
                  operate the Service, such as payment processors and booking platforms. We will
                  only share your information with these third parties to the extent necessary to
                  provide the Service.
                </p>
                <p>
                  We may also disclose your information if required to do so by law or in the
                  good faith belief that such disclosure is necessary to comply with a court
                  order, subpoena, or other legal process served on us, or to protect and defend
                  the rights or property of us or others.
                </p>
              </Section>

              <Section id="data-security" title="Data Security">
                <p>
                  We take reasonable steps to protect your information from unauthorized access,
                  disclosure, alteration, or destruction. However, no Internet transmission or
                  electronic storage method is completely secure, and we cannot guarantee the
                  security of your information.
                </p>
              </Section>

              <Section id="your-rights" title="Your Rights">
                <p>You have certain rights regarding your personal data. You may request to:</p>
                <Bullets items={rights} />
                <p>
                  You can exercise these rights by contacting us at{" "}
                  <a
                    href="mailto:contact@haramainways.com"
                    className="text-gold underline-offset-2 hover:underline"
                  >
                    contact@haramainways.com
                  </a>
                  .
                </p>
              </Section>

              <Section id="childrens-privacy" title="Children’s Privacy">
                <p>
                  Our Service does not address anyone under the age of 18 (&ldquo;Children&rdquo;).
                  We do not knowingly collect personal data from children. If you are a parent or
                  guardian and you are aware that your Child has provided us with personal data,
                  please contact us. If we become aware that we have collected personal data from
                  a Child without verification of parental consent, we will take steps to remove
                  that information from our servers.
                </p>
              </Section>

              <Section
                id="retargeting-and-online-advertising"
                title="Retargeting and Online Advertising"
              >
                <p>
                  We use remarketing technologies with Google Ads and similar third-party
                  platforms to show relevant ads to users who have previously visited our
                  website. These platforms use cookies and other identifiers to track user
                  behavior across websites and deliver targeted advertising. You can opt out of
                  Google&rsquo;s use of cookies and device identifiers by visiting{" "}
                  <a
                    href="https://adssettings.google.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold underline-offset-2 hover:underline"
                  >
                    adssettings.google.com
                  </a>
                  . You can also control cookies through your browser settings.
                </p>
              </Section>

              <Section id="analytics-tools" title="Analytics Tools">
                <p>
                  We use analytics tools such as Google Analytics, Microsoft Clarity, and Google
                  Tag Manager to collect data about user behavior on our website. This data helps
                  us understand how users interact with our website and improve the overall user
                  experience. These tools may use cookies and other tracking technologies to
                  collect and analyze information.
                </p>
              </Section>

              <Section id="changes-to-this-privacy-policy" title="Changes to This Privacy Policy">
                <p>
                  We may update our Privacy Policy from time to time. We will notify you of any
                  changes by posting the new Privacy Policy on this page.
                </p>
              </Section>

              <Section id="contact-us" title="Contact Us">
                <p>If you have any questions about this Privacy Policy, please contact us at:</p>
                <div className="mt-2 space-y-3">
                  <div className="flex flex-wrap items-center gap-4 border border-sandline bg-sand/40 p-5">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ink/5 text-ink">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
                        <path d="M6.6 10.8c1.4 2.8 3.7 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.2 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.9 21 3 13.1 3 3.3c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.2 1.1L6.6 10.8z" />
                      </svg>
                    </div>
                    <a
                      href={`https://wa.me/${settings.whatsappNumber}?text=Asalam-o-Alaikum!%20I%20have%20a%20question%20about%20your%20Privacy%20Policy.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-ink hover:text-gold"
                    >
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
                  href="/terms-and-conditions"
                  className="text-gold underline-offset-2 hover:underline"
                >
                  Terms and Conditions
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
        <WaveDivider color="text-ink" position="bottom" dimOnFooterHover />
      </section>
    </>
  );
}
