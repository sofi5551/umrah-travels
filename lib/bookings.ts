import { isSupabaseConfigured, supabase } from "./supabase";

export type NewBooking = {
  name: string;
  date: string;
  pickup: string;
  dropoff: string;
  car?: string;
  passengers?: string;
  source?: string;
};

/**
 * Best-effort save of a booking-form submission. Never blocks or throws
 * into the UI's critical path (opening WhatsApp) — callers should fire this
 * without awaiting it. Degrades to a no-op if Supabase isn't configured.
 *
 * `table` picks which admin list the submission shows up under — "bookings"
 * (the "Quotes" section, the default, used everywhere except the Contact
 * page) or "contacts" (the "Contacts" section — same shape of data, just
 * tagged as having come from the Contact page's form specifically).
 */
export async function submitBooking(
  input: NewBooking,
  table: "bookings" | "contacts" = "bookings"
): Promise<void> {
  if (!isSupabaseConfigured || !supabase) return;

  const { error } = await supabase.from(table).insert({
    name: input.name,
    travel_date: input.date || null,
    pickup: input.pickup,
    dropoff: input.dropoff,
    car: input.car || null,
    passengers: input.passengers ? Number(input.passengers) : null,
    source: input.source || null,
  });

  if (error) throw new Error(error.message);
}
