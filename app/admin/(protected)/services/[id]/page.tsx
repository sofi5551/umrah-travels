import Link from "next/link";
import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import {
  updateService,
  createTableBlock,
  createImageBlock,
  deleteServiceBlock,
} from "@/app/admin/actions";
import AdminForm from "@/components/admin/AdminForm";
import SubmitButton from "@/components/admin/SubmitButton";
import ConfirmDeleteButton from "@/components/admin/ConfirmDeleteButton";
import TableBlockBuilder from "@/components/admin/TableBlockBuilder";
import { buildDefaultServiceDescription } from "@/lib/data";

export const dynamic = "force-dynamic";

type ServiceRow = {
  id: string;
  label: string;
  from_location: string;
  to_location: string;
  description: string | null;
  sort_order: number;
  show_return_transfer: boolean | null;
};

type ServiceBlockRow = {
  id: string;
  type: "table" | "image";
  heading: string | null;
  description: string | null;
  image_url: string | null;
};

export default async function EditServicePage({ params }: { params: { id: string } }) {
  if (!supabaseAdmin) {
    return <p className="text-sm text-red-600">Admin database isn&rsquo;t configured.</p>;
  }

  const { data, error } = await supabaseAdmin
    .from("services")
    .select("id, label, from_location, to_location, description, sort_order, show_return_transfer")
    .eq("id", params.id)
    .single();

  if (error || !data) return notFound();
  const service = data as ServiceRow;

  const { data: blockData } = await supabaseAdmin
    .from("service_blocks")
    .select("id, type, heading, description, image_url")
    .eq("service_id", service.id)
    .order("sort_order", { ascending: true });
  const blocks = (blockData as ServiceBlockRow[] | null) ?? [];

  return (
    <div>
      <h1 className="font-display text-2xl text-ink">Edit {service.label}</h1>

      <div className="mt-6 max-w-xl border border-sandline bg-white p-6">
        <AdminForm
          action={updateService.bind(null, service.id)}
          successMessage="Service updated."
          className="space-y-4"
        >
          <Field label="Label" hint="The name shown in the Services menu, listing, and page title.">
            <input name="label" required defaultValue={service.label} className="input" />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="From" hint="Starting city — used in the route badge and pre-fills the booking form.">
              <input
                name="from_location"
                required
                defaultValue={service.from_location}
                className="input"
              />
            </Field>
            <Field label="To" hint="Destination city — used the same way as From.">
              <input
                name="to_location"
                required
                defaultValue={service.to_location}
                className="input"
              />
            </Field>
          </div>
          <Field label="Description (shown on the page)" hint="The intro paragraph at the top of this page, under the title.">
            <textarea
              name="description"
              className="input min-h-20 resize-y"
              defaultValue={
                service.description ||
                buildDefaultServiceDescription({
                  from: service.from_location,
                  to: service.to_location,
                })
              }
            />
          </Field>
          <Field label="Sort order" hint="Controls the order services appear in menus and listings — lower numbers show first.">
            <input
              type="number"
              name="sort_order"
              defaultValue={service.sort_order}
              className="input"
            />
          </Field>
          <div>
            <label className="flex items-center gap-2 text-sm text-charcoal">
              <input
                type="checkbox"
                name="show_return_transfer"
                defaultChecked={Boolean(service.show_return_transfer)}
                className="h-4 w-4 rounded border-sandline text-gold focus:ring-gold"
              />
              Show the &ldquo;Return transfer&rdquo; card on this page
            </label>
            <p className="mt-1 pl-6 text-xs text-stone">
              Adds a promo card at the bottom of this page suggesting the reverse trip ({service.to_location} →{" "}
              {service.from_location}). Leave off unless you want to advertise return trips here.
            </p>
          </div>
          <SubmitButton>Save changes</SubmitButton>
        </AdminForm>
      </div>

      <div className="mt-10">
        <h2 className="font-display text-xl text-ink">Content blocks</h2>
        <p className="mt-1 text-sm text-stone">
          Pricing tables and pricing images shown on this page, below the booking form. Add as many as you
          like — they appear in the order set by each block&rsquo;s sort order.
        </p>

        <div className="mt-4 divide-y divide-sandline border border-sandline bg-white">
          {blocks.map((block) => (
            <div key={block.id} className="flex items-center justify-between gap-4 px-4 py-3">
              <div>
                <span className="mr-2 inline-block rounded-full bg-sand px-2 py-0.5 text-xs font-medium uppercase tracking-wide text-ink">
                  {block.type}
                </span>
                <span className="text-sm text-charcoal">{block.heading || "(no heading)"}</span>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <Link
                  href={`/admin/services/${service.id}/blocks/${block.id}`}
                  className="text-sm text-ink hover:text-gold"
                >
                  Edit
                </Link>
                <ConfirmDeleteButton
                  action={deleteServiceBlock.bind(null, block.id)}
                  itemLabel={block.heading || "this block"}
                  successMessage="Block deleted."
                />
              </div>
            </div>
          ))}
          {blocks.length === 0 && (
            <p className="px-4 py-6 text-center text-sm text-stone">No content blocks yet — add one below.</p>
          )}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="border border-sandline bg-white p-6">
            <h3 className="font-display text-lg text-ink">Add a pricing table</h3>
            <p className="mt-1 text-xs text-stone">
              A table with fully custom columns and rows — e.g. a fare list by vehicle or by destination.
            </p>
            <AdminForm
              action={createTableBlock.bind(null, service.id)}
              successMessage="Table added."
              className="mt-4 space-y-4"
            >
              <Field label="Heading" hint="Title shown above the table, e.g. &ldquo;Airport Fare&rdquo;. Leave blank to show no title.">
                <input name="heading" className="input" placeholder="e.g. Airport Fare" />
              </Field>
              <Field label="Description" hint="Optional short text shown under the heading, above the table.">
                <textarea name="description" className="input min-h-16 resize-y" />
              </Field>
              <Field
                label="Table"
                hint="Use + Column / + Row to add as many as you need, and × to remove one. Type directly into the header cells and rows — the first column is usually the vehicle or service name, the rest are prices or details."
              >
                <TableBlockBuilder />
              </Field>
              <Field label="Sort order" hint="Where this table appears among the page&rsquo;s other blocks — lower numbers show first.">
                <input type="number" name="sort_order" defaultValue={0} className="input" />
              </Field>
              <div>
                <label className="flex items-center gap-2 text-sm text-charcoal">
                  <input
                    type="checkbox"
                    name="is_hourly"
                    className="h-4 w-4 rounded border-sandline text-gold focus:ring-gold"
                  />
                  This is an hourly rate table
                </label>
                <p className="mt-1 pl-6 text-xs text-stone">
                  Adds a &ldquo;Hourly booking is suitable for…&rdquo; note directly under this table. Only
                  check this for tables that list hourly rates.
                </p>
              </div>
              <SubmitButton>Add table</SubmitButton>
            </AdminForm>
          </div>

          <div className="border border-sandline bg-white p-6">
            <h3 className="font-display text-lg text-ink">Add a pricing image</h3>
            <p className="mt-1 text-xs text-stone">
              For a pricing graphic you already have as an image (e.g. a designed fare chart).
            </p>
            <AdminForm
              action={createImageBlock.bind(null, service.id)}
              successMessage="Image added."
              className="mt-4 space-y-4"
            >
              <Field label="Heading" hint="Title shown above the image, e.g. &ldquo;Hourly Rates&rdquo;. Leave blank to show no title.">
                <input name="heading" className="input" placeholder="e.g. Hourly Rates" />
              </Field>
              <Field label="Description" hint="Optional short text shown under the heading, above the image.">
                <textarea name="description" className="input min-h-16 resize-y" />
              </Field>
              <Field label="Image" hint="It displays at full width on the page, so use a clear, high-resolution image.">
                <input type="file" name="image" accept="image/*" required className="input" />
              </Field>
              <Field label="Sort order" hint="Where this image appears among the page&rsquo;s other blocks — lower numbers show first.">
                <input type="number" name="sort_order" defaultValue={0} className="input" />
              </Field>
              <SubmitButton>Add image</SubmitButton>
            </AdminForm>
          </div>
        </div>
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
