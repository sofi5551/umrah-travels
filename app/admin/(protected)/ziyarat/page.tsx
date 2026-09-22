import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import {
  createZiyaratPage,
  deleteZiyaratPage,
  updateZiyaratVisibility,
} from "@/app/admin/actions";
import AdminForm from "@/components/admin/AdminForm";
import SubmitButton from "@/components/admin/SubmitButton";
import ConfirmDeleteButton from "@/components/admin/ConfirmDeleteButton";

export const dynamic = "force-dynamic";

type Settings = { ziyarat_enabled: boolean | null };

type ZiyaratRow = {
  id: string;
  label: string;
  description: string | null;
  image_url: string | null;
  sort_order: number;
};

export default async function AdminZiyaratPage() {
  if (!supabaseAdmin) {
    return <p className="text-sm text-red-600">Admin database isn&rsquo;t configured.</p>;
  }

  const [{ data: settingsData }, { data: pageData, error }] = await Promise.all([
    supabaseAdmin.from("site_settings").select("ziyarat_enabled").eq("id", 1).single(),
    supabaseAdmin
      .from("ziyarat_pages")
      .select("id, label, description, image_url, sort_order")
      .order("sort_order", { ascending: true }),
  ]);

  const settings = settingsData as Settings | null;
  const pages = (pageData as ZiyaratRow[] | null) ?? [];

  return (
    <div>
      <h1 className="font-display text-2xl text-ink">Ziyarat</h1>
      <p className="mt-1 text-sm text-stone">
        Ziyarat site pages, shown as cards on the front-end &ldquo;Ziyarat&rdquo; page and as a
        dropdown in the header.
      </p>

      <div className="mt-6 max-w-lg border border-sandline bg-white p-6">
        <h2 className="font-display text-lg text-ink">Section visibility</h2>
        <AdminForm
          action={updateZiyaratVisibility}
          successMessage="Visibility updated."
          confirmMessage="This changes whether &ldquo;Ziyarat&rdquo; appears in the header for every visitor. Continue?"
          confirmLabel="Save changes"
          className="mt-3"
        >
          <label className="flex items-center gap-2 text-sm text-charcoal">
            <input
              type="checkbox"
              name="ziyarat_enabled"
              defaultChecked={Boolean(settings?.ziyarat_enabled)}
              className="h-4 w-4 rounded border-sandline text-gold focus:ring-gold"
            />
            Show &ldquo;Ziyarat&rdquo; in the header
          </label>
          <p className="mt-1 pl-6 text-xs text-stone">
            Off by default. Turn it on once you&rsquo;ve added the pages you want visitors to see.
          </p>
          <SubmitButton className="mt-4 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-goldsoft disabled:cursor-not-allowed disabled:opacity-60">
            Save changes
          </SubmitButton>
        </AdminForm>
      </div>

      {error && (
        <p className="mt-4 text-sm text-red-600">Couldn&rsquo;t load Ziyarat pages: {error.message}</p>
      )}

      <div className="mt-8 overflow-x-auto border border-sandline bg-white">
        <table className="w-full min-w-[600px] text-left text-sm">
          <thead className="border-b border-sandline bg-sand">
            <tr>
              <th className="px-4 py-3 font-semibold text-ink">Label</th>
              <th className="px-4 py-3 font-semibold text-ink">Description</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-sandline">
            {pages.map((p) => (
              <tr key={p.id}>
                <td className="px-4 py-3 text-charcoal">{p.label}</td>
                <td className="max-w-sm truncate px-4 py-3 text-stone">{p.description || "—"}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Link href={`/admin/ziyarat/${p.id}`} className="text-ink hover:text-gold">
                      Edit
                    </Link>
                    <ConfirmDeleteButton
                      action={deleteZiyaratPage.bind(null, p.id)}
                      itemLabel={p.label}
                      successMessage="Ziyarat page deleted."
                    />
                  </div>
                </td>
              </tr>
            ))}
            {pages.length === 0 && !error && (
              <tr>
                <td colSpan={3} className="px-4 py-6 text-center text-stone">
                  No Ziyarat pages yet — add one below.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-10 max-w-xl border border-sandline bg-white p-6">
        <h2 className="font-display text-lg text-ink">Add a Ziyarat page</h2>
        <AdminForm
          action={createZiyaratPage}
          successMessage="Ziyarat page added."
          confirmMessage="This adds a new page to the live Ziyarat listing and header dropdown. Continue?"
          confirmLabel="Add page"
          className="mt-4 space-y-4"
        >
          <Field label="Label" hint="The name shown in the header dropdown, listing, and page title.">
            <input name="label" required className="input" placeholder="e.g. Jabal al-Noor" />
          </Field>
          <Field
            label="Description (shown on the page)"
            hint="The intro paragraph at the top of this page, and the excerpt shown on its listing card."
          >
            <textarea name="description" className="input min-h-20 resize-y" />
          </Field>
          <Field
            label="Quote / Hadees (optional)"
            hint="Shown above the image, styled as a quote. Leave blank to omit."
          >
            <textarea name="quote" className="input min-h-16 resize-y" />
          </Field>
          <Field
            label="Image (optional)"
            hint="Shown below the quote, above the WhatsApp button."
          >
            <input type="file" name="image" accept="image/*" className="input" />
          </Field>
          <Field label="Sort order" hint="Controls the order pages appear in menus and listings — lower numbers show first.">
            <input type="number" name="sort_order" defaultValue={0} className="input" />
          </Field>
          <SubmitButton>Add page</SubmitButton>
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
