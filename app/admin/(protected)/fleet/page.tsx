import Image from "next/image";
import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { createVehicle, deleteVehicle } from "@/app/admin/actions";
import ConfirmDeleteButton from "@/components/admin/ConfirmDeleteButton";
import AdminForm from "@/components/admin/AdminForm";
import SubmitButton from "@/components/admin/SubmitButton";
import { DEFAULT_BOOKING_NOTE, DEFAULT_COMFORT_NOTE } from "@/lib/data";

export const dynamic = "force-dynamic";

type VehicleRow = {
  id: string;
  slug: string;
  name: string;
  type: string;
  class_name: string;
  seats: number;
  luggage: string;
  image_url: string | null;
  sort_order: number;
};

export default async function AdminFleetPage() {
  const { data, error } = supabaseAdmin
    ? await supabaseAdmin
        .from("fleet")
        .select("id, slug, name, type, class_name, seats, luggage, image_url, sort_order")
        .order("sort_order", { ascending: true })
    : { data: null, error: null };

  const vehicles = (data as VehicleRow[] | null) ?? [];

  return (
    <div>
      <h1 className="font-display text-2xl text-ink">Fleet</h1>
      <p className="mt-1 text-sm text-stone">
        Vehicles shown on the Fleet page, the homepage, and the booking form.
      </p>

      {error && (
        <p className="mt-4 text-sm text-red-600">Couldn&rsquo;t load fleet: {error.message}</p>
      )}
      {!supabaseAdmin && (
        <p className="mt-4 text-sm text-red-600">
          Admin database isn&rsquo;t configured (missing SUPABASE_SERVICE_ROLE_KEY).
        </p>
      )}

      <div className="mt-6 overflow-x-auto border border-sandline bg-white">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="border-b border-sandline bg-sand">
            <tr>
              <th className="px-4 py-3 font-semibold text-ink">Photo</th>
              <th className="px-4 py-3 font-semibold text-ink">Name</th>
              <th className="px-4 py-3 font-semibold text-ink">Type</th>
              <th className="px-4 py-3 font-semibold text-ink">Class</th>
              <th className="px-4 py-3 font-semibold text-ink">Seats</th>
              <th className="px-4 py-3 font-semibold text-ink">Luggage</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-sandline">
            {vehicles.map((v) => (
              <tr key={v.id}>
                <td className="px-4 py-3">
                  {v.image_url ? (
                    <div className="relative h-12 w-16 overflow-hidden">
                      <Image src={v.image_url} alt={v.name} fill className="object-cover" />
                    </div>
                  ) : (
                    <div className="h-12 w-16 bg-sand" />
                  )}
                </td>
                <td className="px-4 py-3 text-charcoal">{v.name}</td>
                <td className="px-4 py-3 text-stone">{v.type}</td>
                <td className="px-4 py-3 text-stone">{v.class_name}</td>
                <td className="px-4 py-3 text-stone">{v.seats}</td>
                <td className="px-4 py-3 text-stone">{v.luggage}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Link href={`/admin/fleet/${v.id}`} className="text-ink hover:text-gold">
                      Edit
                    </Link>
                    <ConfirmDeleteButton
                      action={deleteVehicle.bind(null, v.id)}
                      itemLabel={v.name}
                      successMessage="Vehicle deleted."
                    />
                  </div>
                </td>
              </tr>
            ))}
            {vehicles.length === 0 && !error && (
              <tr>
                <td colSpan={7} className="px-4 py-6 text-center text-stone">
                  No vehicles yet — add one below.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-10 max-w-xl border border-sandline bg-white p-6">
        <h2 className="font-display text-lg text-ink">Add a vehicle</h2>
        <AdminForm
          action={createVehicle}
          successMessage="Vehicle added."
          confirmMessage="This adds a new vehicle to the live Fleet page and booking form. Continue?"
          confirmLabel="Add vehicle"
          className="mt-4 space-y-4"
        >
          <Field label="Name">
            <input name="name" required className="input" placeholder="e.g. Toyota Camry" />
          </Field>
          <Field label="Body type">
            <input name="type" required className="input" placeholder="e.g. Sedan" />
          </Field>
          <Field label="Class">
            <input
              name="class_name"
              required
              className="input"
              placeholder="e.g. Economy Class"
            />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Seats">
              <input type="number" min={1} name="seats" required className="input" />
            </Field>
            <Field label="Sort order">
              <input type="number" name="sort_order" defaultValue={0} className="input" />
            </Field>
          </div>
          <Field label="Luggage capacity">
            <input name="luggage" required className="input" placeholder="e.g. 2–3 bags" />
          </Field>
          <Field label="Description (shown on the vehicle's page — leave blank to auto-generate from name/type/seats)">
            <textarea name="description" className="input min-h-20 resize-y" />
          </Field>
          <Field label="Booking policy (shown in Vehicle specifications)">
            <input name="booking_note" defaultValue={DEFAULT_BOOKING_NOTE} className="input" />
          </Field>
          <Field label="Comfort note (shown in Vehicle specifications)">
            <input name="comfort_note" defaultValue={DEFAULT_COMFORT_NOTE} className="input" />
          </Field>
          <Field label="Photo">
            <input type="file" name="image" accept="image/*" className="input" />
          </Field>
          <SubmitButton>Add vehicle</SubmitButton>
        </AdminForm>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-black">
        {label}
      </span>
      {children}
    </label>
  );
}
