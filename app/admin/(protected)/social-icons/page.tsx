import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { updateSocialLinks } from "@/app/admin/actions";
import AdminForm from "@/components/admin/AdminForm";
import SubmitButton from "@/components/admin/SubmitButton";

export const dynamic = "force-dynamic";

type Platform =
  | "facebook"
  | "instagram"
  | "youtube"
  | "pinterest"
  | "tiktok"
  | "linkedin"
  | "playstore";

type Settings = Record<`social_${Platform}`, string | null> &
  Record<`social_${Platform}_enabled`, boolean>;

const platforms: { key: Platform; label: string }[] = [
  { key: "facebook", label: "Facebook" },
  { key: "instagram", label: "Instagram" },
  { key: "youtube", label: "YouTube" },
  { key: "pinterest", label: "Pinterest" },
  { key: "tiktok", label: "TikTok" },
  { key: "linkedin", label: "LinkedIn" },
  { key: "playstore", label: "Play Store" },
];

export default async function AdminSocialIconsPage() {
  const { data } = supabaseAdmin
    ? await supabaseAdmin
        .from("site_settings")
        .select(
          "social_facebook, social_facebook_enabled, social_instagram, social_instagram_enabled, social_youtube, social_youtube_enabled, social_pinterest, social_pinterest_enabled, social_tiktok, social_tiktok_enabled, social_linkedin, social_linkedin_enabled, social_playstore, social_playstore_enabled"
        )
        .eq("id", 1)
        .single()
    : { data: null };

  const settings = data as Settings | null;

  return (
    <div>
      <h1 className="font-display text-2xl text-ink">Social Icons</h1>
      <p className="mt-1 text-sm text-stone">
        Links shown in the site footer. New links start off — turn a platform on once its URL is
        set.
      </p>

      {!supabaseAdmin || !settings ? (
        <p className="mt-4 text-sm text-red-600">
          Site settings aren&rsquo;t configured yet — run the database setup first.
        </p>
      ) : (
        <AdminForm
          action={updateSocialLinks}
          successMessage="Social links updated."
          className="mt-6 max-w-lg space-y-5"
        >
          {platforms.map((p) => (
            <div key={p.key} className="border border-sandline bg-white p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-ink">{p.label}</span>
                <Toggle
                  name={`social_${p.key}_enabled`}
                  defaultChecked={Boolean(settings[`social_${p.key}_enabled`])}
                />
              </div>
              <input
                name={`social_${p.key}`}
                type="url"
                defaultValue={settings[`social_${p.key}`] || ""}
                className="input mt-3"
                placeholder="https://..."
              />
            </div>
          ))}
          <SubmitButton>Save changes</SubmitButton>
        </AdminForm>
      )}
    </div>
  );
}

function Toggle({ name, defaultChecked }: { name: string; defaultChecked: boolean }) {
  return (
    <label className="relative inline-flex cursor-pointer items-center">
      <input type="checkbox" name={name} defaultChecked={defaultChecked} className="peer sr-only" />
      <div className="h-6 w-11 rounded-full bg-sandline transition-colors peer-checked:bg-gold peer-focus-visible:ring-2 peer-focus-visible:ring-gold/50 peer-focus-visible:ring-offset-2" />
      <div className="pointer-events-none absolute left-1 h-4 w-4 rounded-full bg-white transition-transform peer-checked:translate-x-5" />
    </label>
  );
}
