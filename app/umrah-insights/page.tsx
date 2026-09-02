import SectionHeading from "@/components/SectionHeading";

export const metadata = { title: "Umrah Insights | VIP Umrah Taxi" };

const placeholderPosts = [
  {
    title: "Planning your first Umrah trip: a transport checklist",
    excerpt: "What to arrange before you land — airport transfers, hotel proximity, and Ziyarat timing.",
  },
  {
    title: "Best times to travel between Makkah and Madinah",
    excerpt: "How traffic, prayer times, and season affect your intercity transfer.",
  },
  {
    title: "Traveling for Umrah with elderly family members",
    excerpt: "Choosing the right vehicle and pacing your itinerary for comfort.",
  },
];

export default function UmrahInsightsPage() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-16 sm:px-8">
      <SectionHeading
        title="Umrah insights"
        intro="Guidance and tips for pilgrims planning transport around Makkah, Madinah, Jeddah, and Taif. This section is a placeholder — connect it to a CMS or add real posts here."
      />
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {placeholderPosts.map((post) => (
          <article key={post.title} className="border border-sandline bg-white p-6">
            <h3 className="font-display text-lg text-ink">{post.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-stone">{post.excerpt}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
