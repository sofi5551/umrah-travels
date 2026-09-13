import Image from "next/image";
import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { updateVehicle } from "@/app/admin/actions";
import AdminForm from "@/components/admin/AdminForm";
import SubmitButton from "@/components/admin/SubmitButton";
import { DEFAULT_BOOKING_NOTE, DEFAULT_COMFORT_NOTE, buildDefaultDescription } from "@/lib/data";

export const dynamic = "force-dynamic";

type VehicleRow = {
  id: string;
  name: string;
  type: string;
  class_name: string;
  seats: number;
  luggage: string;
  image_url: string | null;
  sort_order: number;
  booking_note: string | null;
  comfort_note: string | null;
  description: string | null;
};

export default async function EditVehiclePage({ params }: { params: { id: string } }) {
  if (!supabaseAdmin) {
    return <p className="text-sm text-red-600">Admin database isn&rsquo;t configured.</p>;
  }

  const { data, error } = await supabaseAdmin
    .from("fleet")
    .select(
      "id, name, type, class_name, seats, luggage, image_url, sort_order, booking_note, comfort_note, description"
    )
    .eq("id", params.id)
    .single();

  if (error || !data) return notFound();
  const vehicle = data as VehicleRow;

  return (
    <div>
      <h1 className="font-display text-2xl text-ink">Edit {vehicle.name}</h1>

      <div className="mt-6 max-w-xl border border-sandline bg-white p-6">
        {vehicle.image_url && (
          <div className="relative mb-4 h-40 w-full overflow-hidden">
            <Image src={vehicle.image_url} alt={vehicle.name} fill className="object-cover" />
          </div>
        )}
        <AdminForm
          action={updateVehicle.bind(null, vehicle.id)}
          successMessage="Vehicle updated."
          className="space-y-4"
        >
          <Field label="Name">
            <input name="name" required defaultValue={vehicle.name} className="input" />
          </Field>
          <Field label="Body type">
            <input name="type" required defaultValue={vehicle.type} className="input" />
          </Field>
          <Field label="Class">
            <input
              name="class_name"
              required
              defaultValue={vehicle.class_name}
              className="input"
            />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Seats">
              <input
                type="number"
                min={1}
                name="seats"
                required
                defaultValue={vehicle.seats}
                className="input"
              />
            </Field>
            <Field label="Sort order">
              <input
                type="number"
                name="sort_order"
                defaultValue={vehicle.sort_order}
                className="input"
              />
            </Field>
          </div>
          <Field label="Luggage capacity">
            <input name="luggage" required defaultValue={vehicle.luggage} className="input" />
          </Field>
          <Field label="Description (shown on the vehicle's page)">
            <textarea
              name="description"
              className="input min-h-20 resize-y"
              defaultValue={
                vehicle.description ||
                buildDefaultDescription({
                  name: vehicle.name,
                  type: vehicle.type,
                  seats: vehicle.seats,
                })
              }
            />
          </Field>
          <Field label="Booking policy (shown in Vehicle specifications)">
            <input
              name="booking_note"
              defaultValue={vehicle.booking_note || DEFAULT_BOOKING_NOTE}
              className="input"
            />
          </Field>
          <Field label="Comfort note (shown in Vehicle specifications)">
            <input
              name="comfort_note"
              defaultValue={vehicle.comfort_note || DEFAULT_COMFORT_NOTE}
              className="input"
            />
          </Field>
          <Field label="Replace photo (optional)">
            <input type="file" name="image" accept="image/*" className="input" />
          </Field>
          <SubmitButton>Save changes</SubmitButton>
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
