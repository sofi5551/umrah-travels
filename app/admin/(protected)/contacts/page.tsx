import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { deleteContact } from "@/app/admin/actions";
import ConfirmDeleteButton from "@/components/admin/ConfirmDeleteButton";

export const dynamic = "force-dynamic";

type Contact = {
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

export default async function AdminContactsPage() {
  const { data, error } = supabaseAdmin
    ? await supabaseAdmin
        .from("contacts")
        .select("id, name, travel_date, pickup, dropoff, car, passengers, source, created_at")
        .order("created_at", { ascending: false })
    : { data: null, error: null };

  const contacts = (data as Contact[] | null) ?? [];

  return (
    <div>
      <h1 className="font-display text-2xl text-ink">Contacts</h1>
      <p className="mt-1 text-sm text-stone">
        Submissions from the Contact page&rsquo;s booking form, newest first.
      </p>

      {error && (
        <p className="mt-4 text-sm text-red-600">Couldn&rsquo;t load contacts: {error.message}</p>
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
            {contacts.map((c) => (
              <tr key={c.id}>
                <td className="px-4 py-3 text-charcoal">{c.name}</td>
                <td className="px-4 py-3 text-stone">{c.travel_date || "—"}</td>
                <td className="px-4 py-3 text-stone">{c.pickup}</td>
                <td className="px-4 py-3 text-stone">{c.dropoff}</td>
                <td className="px-4 py-3 text-stone">{c.car || "—"}</td>
                <td className="px-4 py-3 text-stone">{c.passengers ?? "—"}</td>
                <td className="px-4 py-3 text-stone">{c.source || "—"}</td>
                <td className="px-4 py-3 text-stone">
                  {new Date(c.created_at).toLocaleString()}
                </td>
                <td className="px-4 py-3">
                  <ConfirmDeleteButton
                    action={deleteContact.bind(null, c.id)}
                    itemLabel={`the contact submission from ${c.name}`}
                    successMessage="Contact deleted."
                  />
                </td>
              </tr>
            ))}
            {contacts.length === 0 && !error && (
              <tr>
                <td colSpan={9} className="px-4 py-6 text-center text-stone">
                  No contact submissions yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
