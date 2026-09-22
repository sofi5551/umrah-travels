import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import {
  updateZiyaratPage,
  createZiyaratTableBlock,
  createZiyaratImageBlock,
  deleteZiyaratBlock,
} from "@/app/admin/actions";
import AdminForm from "@/components/admin/AdminForm";
import SubmitButton from "@/components/admin/SubmitButton";
import ConfirmDeleteButton from "@/components/admin/ConfirmDeleteButton";
import TableBlockBuilder from "@/components/admin/TableBlockBuilder";
import BackButton from "@/components/admin/BackButton";

export const dynamic = "force-dynamic";

type ZiyaratRow = {
  id: string;
  label: string;
  description: string | null;
  quote: string | null;
  image_url: string | null;
  sort_order: number;
};

type ZiyaratBlockRow = {
  id: string;
  type: "table" | "image";
  heading: string | null;
  description: string | null;
  image_url: string | null;
};

export default async function EditZiyaratPage({ params }: { params: { id: string } }) {
  if (!supabaseAdmin) {
    return <p className="text-sm text-red-600">Admin database isn&rsquo;t configured.</p>;
  }

  const { data, error } = await supabaseAdmin
    .from("ziyarat_pages")
    .select("id, label, description, quote, image_url, sort_order")
    .eq("id", params.id)
    .single();

  if (error || !data) return notFound();
  const page = data as ZiyaratRow;

  const { data: blockData } = await supabaseAdmin
    .from("ziyarat_blocks")
    .select("id, type, heading, description, image_url")
    .eq("ziyarat_id", page.id)
    .order("sort_order", { ascending: true });
  const blocks = (blockData as ZiyaratBlockRow[] | null) ?? [];

  return (
    <div>
      <div className="flex items-center gap-3">
        <BackButton href="/admin/ziyarat" />
        <h1 className="font-display text-2xl text-ink">Edit {page.label}</h1>
      </div>

      <div className="mt-6 max-w-xl border border-sandline bg-white p-6">
        {page.image_url && (
          <div className="relative mb-4 h-40 w-full overflow-hidden">
            <Image src={page.image_url} alt={page.label} fill className="object-cover" />
          </div>
        )}
        <AdminForm
          action={updateZiyaratPage.bind(null, page.id)}
          successMessage="Ziyarat page updated."
          confirmMessage="This updates this page on the live site. Continue?"
          confirmLabel="Save changes"
          className="space-y-4"
        >
          <Field label="Label" hint="The name shown in the header dropdown, listing, and page title.">
            <input name="label" required defaultValue={page.label} className="input" />
          </Field>
          <Field
            label="Description (shown on the page)"
            hint="The intro text at the top of this page, and the excerpt shown on its listing card. Press Enter to start a new paragraph."
          >
            <textarea
              name="description"
              className="input min-h-20 resize-y"
              defaultValue={page.description ?? ""}
            />
          </Field>
          <Field
            label="Quote / Hadees (optional)"
            hint="Shown above the image, styled as a quote. Leave blank to omit."
          >
            <textarea name="quote" className="input min-h-16 resize-y" defaultValue={page.quote ?? ""} />
          </Field>
          <Field
            label="Replace image (leave blank to keep current)"
            hint="Shown below the quote, above the WhatsApp button."
          >
            <input type="file" name="image" accept="image/*" className="input" />
          </Field>
          <Field label="Sort order" hint="Controls the order pages appear in menus and listings — lower numbers show first.">
            <input type="number" name="sort_order" defaultValue={page.sort_order} className="input" />
          </Field>
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
                  href={`/admin/ziyarat/${page.id}/blocks/${block.id}`}
                  className="text-sm text-ink hover:text-gold"
                >
                  Edit
                </Link>
                <ConfirmDeleteButton
                  action={deleteZiyaratBlock.bind(null, block.id)}
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
              A table with fully custom columns and rows — e.g. entry fees or tour package prices.
            </p>
            <AdminForm
              action={createZiyaratTableBlock.bind(null, page.id)}
              successMessage="Table added."
              confirmMessage="This adds a new pricing table to the live page. Continue?"
              confirmLabel="Add table"
              className="mt-4 space-y-4"
            >
              <Field label="Heading" hint="Title shown above the table. Leave blank to show no title.">
                <input name="heading" className="input" placeholder="e.g. Visit Packages" />
              </Field>
              <Field label="Description" hint="Optional short text shown under the heading, above the table.">
                <textarea name="description" className="input min-h-16 resize-y" />
              </Field>
              <Field
                label="Table"
                hint="Use + Column / + Row to add as many as you need, and × to remove one."
              >
                <TableBlockBuilder />
              </Field>
              <Field label="Sort order" hint="Where this table appears among the page&rsquo;s other blocks — lower numbers show first.">
                <input type="number" name="sort_order" defaultValue={0} className="input" />
              </Field>
              <SubmitButton>Add table</SubmitButton>
            </AdminForm>
          </div>

          <div className="border border-sandline bg-white p-6">
            <h3 className="font-display text-lg text-ink">Add a pricing image</h3>
            <p className="mt-1 text-xs text-stone">
              For a pricing graphic you already have as an image.
            </p>
            <AdminForm
              action={createZiyaratImageBlock.bind(null, page.id)}
              successMessage="Image added."
              confirmMessage="This adds a new pricing image to the live page. Continue?"
              confirmLabel="Add image"
              className="mt-4 space-y-4"
            >
              <Field label="Heading" hint="Title shown above the image. Leave blank to show no title.">
                <input name="heading" className="input" placeholder="e.g. Entry Fees" />
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
