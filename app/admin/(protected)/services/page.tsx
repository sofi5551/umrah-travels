import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { createService, deleteService } from "@/app/admin/actions";
import ConfirmDeleteButton from "@/components/admin/ConfirmDeleteButton";
import AdminForm from "@/components/admin/AdminForm";
import SubmitButton from "@/components/admin/SubmitButton";

export const dynamic = "force-dynamic";

type ServiceRow = {
  id: string;
  label: string;
  from_location: string;
  to_location: string;
  description: string | null;
  sort_order: number;
};

export default async function AdminServicesPage() {
  const { data, error } = supabaseAdmin
    ? await supabaseAdmin
        .from("services")
        .select("id, label, from_location, to_location, description, sort_order")
        .order("sort_order", { ascending: true })
    : { data: null, error: null };

  const services = (data as ServiceRow[] | null) ?? [];

  return (
    <div>
      <h1 className="font-display text-2xl text-ink">Services</h1>
      <p className="mt-1 text-sm text-stone">
        Pages shown under the site&rsquo;s &ldquo;Services&rdquo; menu and listing.
      </p>

      {error && (
        <p className="mt-4 text-sm text-red-600">Couldn&rsquo;t load services: {error.message}</p>
      )}
      {!supabaseAdmin && (
        <p className="mt-4 text-sm text-red-600">
          Admin database isn&rsquo;t configured (missing SUPABASE_SERVICE_ROLE_KEY).
        </p>
      )}

      <div className="mt-6 overflow-x-auto border border-sandline bg-white">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="border-b border-sandline bg-sand">
            <tr>
              <th className="px-4 py-3 font-semibold text-ink">Label</th>
              <th className="px-4 py-3 font-semibold text-ink">From</th>
              <th className="px-4 py-3 font-semibold text-ink">To</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-sandline">
            {services.map((s) => (
              <tr key={s.id}>
                <td className="px-4 py-3 text-charcoal">{s.label}</td>
                <td className="px-4 py-3 text-stone">{s.from_location}</td>
                <td className="px-4 py-3 text-stone">{s.to_location}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Link href={`/admin/services/${s.id}`} className="text-ink hover:text-gold">
                      Edit
                    </Link>
                    <ConfirmDeleteButton
                      action={deleteService.bind(null, s.id)}
                      itemLabel={s.label}
                      successMessage="Service deleted."
                    />
                  </div>
                </td>
              </tr>
            ))}
            {services.length === 0 && !error && (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-stone">
                  No services yet — add one below.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-10 max-w-xl border border-sandline bg-white p-6">
        <h2 className="font-display text-lg text-ink">Add a service</h2>
        <AdminForm
          action={createService}
          successMessage="Service added."
          confirmMessage="This adds a new page to the live Services menu and listing. Continue?"
          confirmLabel="Add service"
          className="mt-4 space-y-4"
        >
          <Field label="Label" hint="The name shown in the Services menu, listing, and page title — e.g. &ldquo;Makkah to Jeddah&rdquo;.">
            <input name="label" required className="input" placeholder="e.g. Makkah to Jeddah" />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="From" hint="Starting city — used in the route badge and pre-fills the booking form.">
              <input name="from_location" required className="input" placeholder="Makkah" />
            </Field>
            <Field label="To" hint="Destination city — used the same way as From.">
              <input name="to_location" required className="input" placeholder="Jeddah" />
            </Field>
          </div>
          <Field
            label="Description (shown on the page — leave blank to auto-generate)"
            hint="The intro text at the top of this page, under the title. Press Enter to start a new paragraph."
          >
            <textarea name="description" className="input min-h-20 resize-y" />
          </Field>
          <Field label="Sort order" hint="Controls the order services appear in menus and listings — lower numbers show first.">
            <input type="number" name="sort_order" defaultValue={0} className="input" />
          </Field>
          <div>
            <label className="flex items-center gap-2 text-sm text-charcoal">
              <input
                type="checkbox"
                name="show_return_transfer"
                className="h-4 w-4 rounded border-sandline text-gold focus:ring-gold"
              />
              Show the &ldquo;Return transfer&rdquo; card on this page
            </label>
            <p className="mt-1 pl-6 text-xs text-stone">
              Adds a promo card at the bottom of this page suggesting the reverse trip (To → From). Off by
              default — turn it on per page once you&rsquo;ve added your pricing tables.
            </p>
          </div>
          <SubmitButton>Add service</SubmitButton>
        </AdminForm>
      </div>
    </div>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-black">
        {label}
      </span>
      {children}
      {hint && <span className="mt-1 block text-xs font-normal normal-case text-stone">{hint}</span>}
    </label>
  );
}
