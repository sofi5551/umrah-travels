import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { deleteQuote } from "@/app/admin/actions";
import ConfirmDeleteButton from "@/components/admin/ConfirmDeleteButton";

export const dynamic = "force-dynamic";

type Quote = {
  id: string;
  name: string;
  travel_date: string | null;
  pickup: string;
  dropoff: string;
  car: string | null;
  passengers: number | null;
  source: string | null;
  created_at: string;
};

export default async function AdminQuotesPage() {
  const { data, error } = supabaseAdmin
    ? await supabaseAdmin
        .from("bookings")
        .select("id, name, travel_date, pickup, dropoff, car, passengers, source, created_at")
        .order("created_at", { ascending: false })
    : { data: null, error: null };

  const quotes = (data as Quote[] | null) ?? [];

  return (
    <div>
      <h1 className="font-display text-2xl text-ink">Quotes</h1>
      <p className="mt-1 text-sm text-stone">Booking-form submissions, newest first.</p>

      {error && (
        <p className="mt-4 text-sm text-red-600">Couldn&rsquo;t load quotes: {error.message}</p>
      )}
      {!supabaseAdmin && (
        <p className="mt-4 text-sm text-red-600">
          Admin database isn&rsquo;t configured (missing SUPABASE_SERVICE_ROLE_KEY).
        </p>
      )}

      <div className="mt-6 overflow-x-auto border border-sandline bg-white">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead className="border-b border-sandline bg-sand">
            <tr>
              <th className="px-4 py-3 font-semibold text-ink">Name</th>
              <th className="px-4 py-3 font-semibold text-ink">Date</th>
              <th className="px-4 py-3 font-semibold text-ink">Pickup</th>
              <th className="px-4 py-3 font-semibold text-ink">Drop-off</th>
              <th className="px-4 py-3 font-semibold text-ink">Car</th>
              <th className="px-4 py-3 font-semibold text-ink">Pax</th>
              <th className="px-4 py-3 font-semibold text-ink">Source</th>
              <th className="px-4 py-3 font-semibold text-ink">Submitted</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-sandline">
            {quotes.map((q) => (
              <tr key={q.id}>
                <td className="px-4 py-3 text-charcoal">{q.name}</td>
                <td className="px-4 py-3 text-stone">{q.travel_date || "—"}</td>
                <td className="px-4 py-3 text-stone">{q.pickup}</td>
                <td className="px-4 py-3 text-stone">{q.dropoff}</td>
                <td className="px-4 py-3 text-stone">{q.car || "—"}</td>
                <td className="px-4 py-3 text-stone">{q.passengers ?? "—"}</td>
                <td className="px-4 py-3 text-stone">{q.source || "—"}</td>
                <td className="px-4 py-3 text-stone">
                  {new Date(q.created_at).toLocaleString()}
                </td>
                <td className="px-4 py-3">
                  <ConfirmDeleteButton
                    action={deleteQuote.bind(null, q.id)}
                    itemLabel={`the quote from ${q.name}`}
                    successMessage="Quote deleted."
                  />
                </td>
              </tr>
            ))}
            {quotes.length === 0 && !error && (
              <tr>
                <td colSpan={9} className="px-4 py-6 text-center text-stone">
                  No quotes yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
