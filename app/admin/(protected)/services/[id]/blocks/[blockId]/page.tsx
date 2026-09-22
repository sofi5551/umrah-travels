import Image from "next/image";
import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { updateTableBlock, updateImageBlock } from "@/app/admin/actions";
import AdminForm from "@/components/admin/AdminForm";
import SubmitButton from "@/components/admin/SubmitButton";
import TableBlockBuilder from "@/components/admin/TableBlockBuilder";
import BackButton from "@/components/admin/BackButton";

export const dynamic = "force-dynamic";

type ServiceBlockRow = {
  id: string;
  type: "table" | "image";
  heading: string | null;
  description: string | null;
  columns: string[] | null;
  rows: string[][] | null;
  image_url: string | null;
  sort_order: number;
  is_hourly: boolean | null;
};

export default async function EditServiceBlockPage({
  params,
}: {
  params: { id: string; blockId: string };
}) {
  if (!supabaseAdmin) {
    return <p className="text-sm text-red-600">Admin database isn&rsquo;t configured.</p>;
  }

  const { data, error } = await supabaseAdmin
    .from("service_blocks")
    .select("id, type, heading, description, columns, rows, image_url, sort_order, is_hourly")
    .eq("id", params.blockId)
    .single();

  if (error || !data) return notFound();
  const block = data as ServiceBlockRow;

  return (
    <div>
      <div className="flex items-center gap-3">
        <BackButton href={`/admin/services/${params.id}`} />
        <h1 className="font-display text-2xl text-ink">
          Edit {block.type === "table" ? "table" : "image"} block
        </h1>
      </div>

      <div className="mt-6 max-w-xl border border-sandline bg-white p-6">
        {block.type === "table" ? (
          <AdminForm
            action={updateTableBlock.bind(null, block.id)}
            successMessage="Table updated."
            confirmMessage="This updates this table on the live service page. Continue?"
            confirmLabel="Save changes"
            className="space-y-4"
          >
            <Field label="Heading" hint="Title shown above the table. Leave blank to show no title.">
              <input name="heading" defaultValue={block.heading ?? ""} className="input" />
            </Field>
            <Field label="Description" hint="Optional short text shown under the heading, above the table.">
              <textarea
                name="description"
                className="input min-h-16 resize-y"
                defaultValue={block.description ?? ""}
              />
            </Field>
            <Field
              label="Table"
              hint="Use + Column / + Row to add as many as you need, and × to remove one. Type directly into the header cells and rows."
            >
              <TableBlockBuilder defaultColumns={block.columns ?? undefined} defaultRows={block.rows ?? undefined} />
            </Field>
            <Field label="Sort order" hint="Where this table appears among the page&rsquo;s other blocks — lower numbers show first.">
              <input type="number" name="sort_order" defaultValue={block.sort_order} className="input" />
            </Field>
            <div>
              <label className="flex items-center gap-2 text-sm text-charcoal">
                <input
                  type="checkbox"
                  name="is_hourly"
                  defaultChecked={Boolean(block.is_hourly)}
                  className="h-4 w-4 rounded border-sandline text-gold focus:ring-gold"
                />
                This is an hourly rate table
              </label>
              <p className="mt-1 pl-6 text-xs text-stone">
                Adds a &ldquo;Hourly booking is suitable for…&rdquo; note directly under this table.
              </p>
            </div>
            <SubmitButton>Save changes</SubmitButton>
          </AdminForm>
        ) : (
          <AdminForm
            action={updateImageBlock.bind(null, block.id)}
            successMessage="Image updated."
            confirmMessage="This updates this image on the live service page. Continue?"
            confirmLabel="Save changes"
            className="space-y-4"
          >
            <Field label="Heading" hint="Title shown above the image. Leave blank to show no title.">
              <input name="heading" defaultValue={block.heading ?? ""} className="input" />
            </Field>
            <Field label="Description" hint="Optional short text shown under the heading, above the image.">
              <textarea
                name="description"
                className="input min-h-16 resize-y"
                defaultValue={block.description ?? ""}
              />
            </Field>
            {block.image_url && (
              <div>
                <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-black">
                  Current image
                </span>
                <div className="relative h-40 w-full overflow-hidden border border-sandline bg-sand">
                  <Image src={block.image_url} alt="" fill className="object-contain" />
                </div>
              </div>
            )}
            <Field
              label="Replace image (leave blank to keep current)"
              hint="It displays at full width on the page, so use a clear, high-resolution image."
            >
              <input type="file" name="image" accept="image/*" className="input" />
            </Field>
            <Field label="Sort order" hint="Where this image appears among the page&rsquo;s other blocks — lower numbers show first.">
              <input type="number" name="sort_order" defaultValue={block.sort_order} className="input" />
            </Field>
            <SubmitButton>Save changes</SubmitButton>
          </AdminForm>
        )}
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
