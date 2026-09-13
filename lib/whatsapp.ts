export type BookingDetails = {
  name?: string;
  date?: string;
  pickup?: string;
  dropoff?: string;
  car?: string;
  passengers?: string;
};

/**
 * Builds a wa.me deep link pre-filled with the booking details, mirroring
 * the original site's "Book on WhatsApp" behaviour (no backend, no DB —
 * the message is composed client-side and handed to WhatsApp).
 *
 * `whatsappNumber` must be passed in by the caller (from the live
 * site_settings, via getSiteSettings()) rather than imported here, so that
 * changing the number in admin actually changes where every link points.
 */
export function buildWhatsAppLink(details: BookingDetails = {}, whatsappNumber: string) {
  const lines = ["Asalam-o-Alaikum! I want to book a taxi.", ""];

  if (details.name) lines.push(`Name: ${details.name}`);
  if (details.date) lines.push(`Date: ${details.date}`);
  if (details.pickup) lines.push(`Pickup: ${details.pickup}`);
  if (details.dropoff) lines.push(`Drop-off: ${details.dropoff}`);
  if (details.car) lines.push(`Preferred car: ${details.car}`);
  if (details.passengers) lines.push(`Passengers: ${details.passengers}`);

  const text = encodeURIComponent(lines.join("\n"));
  return `https://wa.me/${whatsappNumber}?text=${text}`;
}
