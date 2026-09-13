import { isSupabaseConfigured, supabase } from "./supabase";
import {
  fleet as fallbackFleet,
  type Vehicle,
  DEFAULT_BOOKING_NOTE,
  DEFAULT_COMFORT_NOTE,
  buildDefaultDescription,
} from "./data";

/**
 * Public (anon-key) fetch of the fleet. Falls back to the hardcoded seed
 * vehicles in lib/data.ts if Supabase isn't configured, the table doesn't
 * exist yet, or the fetch fails, or the table is empty.
 */
export async function getFleet(): Promise<Vehicle[]> {
  if (!isSupabaseConfigured || !supabase) return fallbackFleet;

  const { data, error } = await supabase
    .from("fleet")
    .select(
      "slug, name, type, class_name, seats, luggage, image_url, image_alt, booking_note, comfort_note, description"
    )
    .order("sort_order", { ascending: true });

  if (error || !data || data.length === 0) return fallbackFleet;

  return data.map((row) => ({
    slug: row.slug,
    name: row.name,
    type: row.type,
    className: row.class_name,
    seats: row.seats,
    luggage: row.luggage,
    hasDetailPage: true,
    image: row.image_url || "",
    imageAlt: row.image_alt || row.name,
    bookingNote: row.booking_note || DEFAULT_BOOKING_NOTE,
    comfortNote: row.comfort_note || DEFAULT_COMFORT_NOTE,
    description:
      row.description || buildDefaultDescription({ name: row.name, type: row.type, seats: row.seats }),
  }));
}

export async function getVehicleBySlug(slug: string): Promise<Vehicle | null> {
  const fleet = await getFleet();
  return fleet.find((v) => v.slug === slug) ?? null;
}
