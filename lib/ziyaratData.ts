import { isSupabaseConfigured, supabase } from "./supabase";

export type ZiyaratPage = {
  id: string;
  slug: string;
  label: string;
  description: string;
  quote: string | null;
  imageUrl: string | null;
};

/**
 * Public (anon-key) fetch of the admin-managed Ziyarat pages. Returns [] if
 * Supabase isn't configured, the table doesn't exist yet, or the fetch
 * fails — this is new, purely admin-authored content with no seed data to
 * fall back to, so an empty list is the correct "nothing configured yet"
 * state rather than a crash.
 */
export async function getZiyaratPages(): Promise<ZiyaratPage[]> {
  if (!isSupabaseConfigured || !supabase) return [];

  const { data, error } = await supabase
    .from("ziyarat_pages")
    .select("id, slug, label, description, quote, image_url")
    .order("sort_order", { ascending: true });

  if (error || !data) return [];

  return data.map((row) => ({
    id: row.id,
    slug: row.slug,
    label: row.label,
    description: row.description || "",
    quote: row.quote,
    imageUrl: row.image_url,
  }));
}

export async function getZiyaratPageBySlug(slug: string): Promise<ZiyaratPage | null> {
  const pages = await getZiyaratPages();
  return pages.find((p) => p.slug === slug) ?? null;
}
