import SectionHeading from "@/components/SectionHeading";

export const metadata = { title: "Terms and Conditions | VIP Umrah Taxi" };

export default function TermsPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-8">
      <SectionHeading title="Terms and Conditions" />
      <div className="mt-6 space-y-4 text-sm leading-relaxed text-stone">
        <p>
          This page is a placeholder. Replace this content with your actual
          terms — covering booking confirmation, cancellation and change
          policy, fare adjustments during peak periods (Ramadan, Hajj), and
          liability for delays caused by traffic, weather, or other
          unforeseen circumstances.
        </p>
        <p>
          Note from the original site: "Arrival times may vary due to
          unforeseen circumstances. Our drivers are trained to provide
          excellent service, but if you encounter any issues, please contact
          our customer support team."
        </p>
      </div>
    </section>
  );
}
