import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { updateLogo, updateFavicon } from "@/app/admin/actions";
import AdminForm from "@/components/admin/AdminForm";
import SubmitButton from "@/components/admin/SubmitButton";

export const dynamic = "force-dynamic";

type Settings = {
  logo_url: string | null;
  favicon_url: string | null;
};

export default async function AdminBrandingPage() {
  const { data } = supabaseAdmin
    ? await supabaseAdmin.from("site_settings").select("logo_url, favicon_url").eq("id", 1).single()
    : { data: null };

  const settings = data as Settings | null;
  const currentLogo = settings?.logo_url || "/logo.png";
  const currentFavicon = settings?.favicon_url || "/fav.png";

  return (
    <div>
      <h1 className="font-display text-2xl text-ink">Logo &amp; Favicon</h1>
      <p className="mt-1 text-sm text-stone">
        The logo shown in the site header, and the browser-tab favicon.
      </p>

      {!supabaseAdmin ? (
        <p className="mt-4 text-sm text-red-600">
          Admin database isn&rsquo;t configured (missing SUPABASE_SERVICE_ROLE_KEY).
        </p>
      ) : (
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="border border-sandline bg-white p-6">
            <h2 className="font-display text-lg text-ink">Site logo</h2>
            <p className="mt-1 text-sm text-stone">Shown in the header, at its natural size.</p>

            <div className="mt-4">
              <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-black">
                Current logo
              </span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                key={currentLogo}
                src={currentLogo}
                alt="Current logo"
                className="max-h-40 border border-sandline bg-sand p-3"
              />
            </div>

            <AdminForm
              action={updateLogo}
              successMessage="Logo updated."
              confirmMessage="This replaces the logo shown in the header for every visitor right away. Continue?"
              confirmLabel="Upload logo"
              className="mt-6 space-y-4"
            >
              <Field
                label="Replace with a new logo"
                hint="A transparent .png works best. It's shown at its natural size in the header, so keep it reasonably compact."
              >
                <input type="file" name="logo" accept="image/*" required className="input" />
              </Field>
              <SubmitButton>Upload logo</SubmitButton>
            </AdminForm>
          </div>

          <div className="border border-sandline bg-white p-6">
            <h2 className="font-display text-lg text-ink">Favicon</h2>
            <p className="mt-1 text-sm text-stone">Shown as the icon in the browser tab.</p>

            <div className="mt-4">
              <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-black">
                Current favicon
              </span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                key={currentFavicon}
                src={currentFavicon}
                alt="Current favicon"
                className="h-16 w-16 border border-sandline bg-sand object-contain p-2"
              />
            </div>

            <AdminForm
              action={updateFavicon}
              successMessage="Favicon updated."
              confirmMessage="This replaces the browser-tab icon for every visitor right away. Continue?"
              confirmLabel="Upload favicon"
              className="mt-6 space-y-4"
            >
              <Field
                label="Replace with a new favicon"
                hint="A square .png or .ico works best — it's shown very small, so keep it simple."
              >
                <input type="file" name="favicon" accept="image/*" required className="input" />
              </Field>
              <SubmitButton>Upload favicon</SubmitButton>
            </AdminForm>
          </div>
        </div>
      )}
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
