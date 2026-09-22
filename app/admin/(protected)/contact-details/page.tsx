import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { updateContactDetails } from "@/app/admin/actions";
import AdminForm from "@/components/admin/AdminForm";
import SubmitButton from "@/components/admin/SubmitButton";

export const dynamic = "force-dynamic";

type Settings = {
  phone: string;
  whatsapp_number: string;
  email: string;
  address: string;
  address_enabled: boolean | null;
};

export default async function AdminContactDetailsPage() {
  const { data } = supabaseAdmin
    ? await supabaseAdmin
        .from("site_settings")
        .select("phone, whatsapp_number, email, address, address_enabled")
        .eq("id", 1)
        .single()
    : { data: null };

  const settings = data as Settings | null;

  return (
    <div>
      <h1 className="font-display text-2xl text-ink">Contact Details</h1>
      <p className="mt-1 text-sm text-stone">
        Shown in the site header, footer, and Contact page.
      </p>

      {!supabaseAdmin || !settings ? (
        <p className="mt-4 text-sm text-red-600">
          Site settings aren&rsquo;t configured yet — run the database setup first.
        </p>
      ) : (
        <AdminForm
          action={updateContactDetails}
          successMessage="Contact details updated."
          confirmMessage="This updates the phone, email, and address shown across the site (header, footer, and Contact page). Continue?"
          confirmLabel="Save changes"
          className="mt-6 max-w-lg space-y-4"
        >
          <Field label="Phone">
            <input
              name="phone"
              defaultValue={settings.phone}
              required
              className="input"
            />
          </Field>
          <Field label="WhatsApp number (digits only, no +)">
            <input
              name="whatsapp_number"
              defaultValue={settings.whatsapp_number}
              required
              className="input"
            />
          </Field>
          <Field label="Email">
            <input
              type="email"
              name="email"
              defaultValue={settings.email}
              required
              className="input"
            />
          </Field>
          <Field label="Address">
            <textarea
              name="address"
              defaultValue={settings.address}
              required
              className="input min-h-24 resize-y"
            />
          </Field>
          <div>
            <label className="flex items-center gap-2 text-sm text-charcoal">
              <input
                type="checkbox"
                name="address_enabled"
                defaultChecked={Boolean(settings.address_enabled)}
                className="h-4 w-4 rounded border-sandline text-gold focus:ring-gold"
              />
              Show the address on the website
            </label>
            <p className="mt-1 pl-6 text-xs text-stone">
              Off by default. When off, the address above won&rsquo;t appear anywhere on the site —
              including the footer and the Contact page&rsquo;s &ldquo;Head office&rdquo; card, which
              disappears entirely rather than showing blank.
            </p>
          </div>
          <SubmitButton>Save changes</SubmitButton>
        </AdminForm>
      )}
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
