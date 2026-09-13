import { isSupabaseConfigured, supabase } from "./supabase";
import { services as fallbackServices, type ServicePage, buildDefaultServiceDescription } from "./data";

/**
 * Public (anon-key) fetch of the service pages. Falls back to the hardcoded
 * seed list in lib/data.ts if Supabase isn't configured, the table doesn't
 * exist yet, the fetch fails, or the table is empty.
 */
export async function getServices(): Promise<ServicePage[]> {
  if (!isSupabaseConfigured || !supabase) return fallbackServices;

  const { data, error } = await supabase
    .from("services")
    .select("id, slug, label, from_location, to_location, description, show_return_transfer")
    .order("sort_order", { ascending: true });

  if (error || !data || data.length === 0) return fallbackServices;

  return data.map((row) => ({
    id: row.id,
    slug: row.slug,
    label: row.label,
    from: row.from_location,
    to: row.to_location,
    description:
      row.description || buildDefaultServiceDescription({ from: row.from_location, to: row.to_location }),
    showReturnTransfer: Boolean(row.show_return_transfer),
  }));
}

export async function getServiceBySlug(slug: string): Promise<ServicePage | null> {
  const services = await getServices();
  return services.find((s) => s.slug === slug) ?? null;
}
