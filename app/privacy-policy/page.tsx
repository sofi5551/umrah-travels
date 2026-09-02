import SectionHeading from "@/components/SectionHeading";

export const metadata = { title: "Privacy Policy | VIP Umrah Taxi" };

export default function PrivacyPolicyPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-8">
      <SectionHeading title="Privacy Policy" />
      <div className="mt-6 space-y-4 text-sm leading-relaxed text-stone">
        <p>
          This page is a placeholder. Replace this content with your actual
          privacy policy — covering what information is collected through the
          booking form (name, travel dates, pickup/drop-off locations), how
          it's used to arrange transport, and how it's stored or shared with
          drivers.
        </p>
        <p>
          Since bookings on this site are sent via WhatsApp, you should also
          note that message content is subject to WhatsApp's own privacy
          policy once sent.
        </p>
      </div>
    </section>
  );
}
