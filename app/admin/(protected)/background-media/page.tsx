import { supabaseAdmin } from "@/lib/supabaseAdmin";
import {
  updateHeroVideo,
  updateHomepageQuoteBg,
  updateHomepageWhyChooseBg,
  updateAboutHeroBg,
  updateAboutMissionImage,
  updateContactHeroBg,
  updateFleetHeroBg,
} from "@/app/admin/actions";
import AdminForm from "@/components/admin/AdminForm";
import SubmitButton from "@/components/admin/SubmitButton";

export const dynamic = "force-dynamic";

type Settings = {
  hero_video_url: string | null;
  homepage_quote_bg_url: string | null;
  homepage_why_choose_bg_url: string | null;
  about_hero_bg_url: string | null;
  about_mission_image_url: string | null;
  contact_hero_bg_url: string | null;
  fleet_hero_bg_url: string | null;
};

export default async function AdminBackgroundMediaPage() {
  const { data } = supabaseAdmin
    ? await supabaseAdmin
        .from("site_settings")
        .select(
          "hero_video_url, homepage_quote_bg_url, homepage_why_choose_bg_url, about_hero_bg_url, about_mission_image_url, contact_hero_bg_url, fleet_hero_bg_url"
        )
        .eq("id", 1)
        .single()
    : { data: null };

  const settings = data as Settings | null;
  const currentVideoUrl = settings?.hero_video_url || "/video1.mp4";

  return (
    <div>
      <h1 className="font-display text-2xl text-ink">Background Images and Video</h1>
      <p className="mt-1 text-sm text-stone">
        Background media shown across the site.
      </p>

      {!supabaseAdmin ? (
        <p className="mt-4 text-sm text-red-600">
          Admin database isn&rsquo;t configured (missing SUPABASE_SERVICE_ROLE_KEY).
        </p>
      ) : (
        <>
          <div className="mt-6 max-w-xl border border-sandline bg-white p-6">
            <h2 className="font-display text-lg text-ink">Homepage hero video</h2>
            <p className="mt-1 text-sm text-stone">
              Plays muted and on loop behind the homepage&rsquo;s first section (the one with the
              &ldquo;Book on WhatsApp&rdquo; button).
            </p>

            <div className="mt-4">
              <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-black">
                Current video
              </span>
              <video
                key={currentVideoUrl}
                src={currentVideoUrl}
                controls
                muted
                className="w-full border border-sandline bg-ink"
              />
            </div>

            <AdminForm
              action={updateHeroVideo}
              successMessage="Hero video updated."
              confirmMessage="This replaces the homepage's background video for every visitor right away. Continue?"
              confirmLabel="Upload video"
              className="mt-6 space-y-4"
            >
              <Field
                label="Replace with a new video"
                hint="Use a short, looping clip (a few seconds is enough) compressed as .mp4 — it plays automatically and needs to load fast. Large files will slow down the homepage."
              >
                <input type="file" name="video" accept="video/*" required className="input" />
              </Field>
              <SubmitButton>Upload video</SubmitButton>
            </AdminForm>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <BackgroundImageCard
              title={'Homepage — "Request a quick quote" section'}
              currentUrl={settings?.homepage_quote_bg_url || "/images/safa-marwa.jpg"}
              action={updateHomepageQuoteBg}
              confirmMessage="This replaces the background image behind the homepage's quote-request section. Continue?"
            />
            <BackgroundImageCard
              title={'Homepage — "Why pilgrims choose Haramain Ways" section'}
              currentUrl={settings?.homepage_why_choose_bg_url || "/images/masjid-nabawi.jpg"}
              action={updateHomepageWhyChooseBg}
              confirmMessage={'This replaces the background image behind the homepage\'s "Why pilgrims choose Haramain Ways" section. Continue?'}
            />
            <BackgroundImageCard
              title={'About page — "We Are a Trusted Taxi Service…" section'}
              currentUrl={settings?.about_hero_bg_url || "/images/about-us.jpg"}
              action={updateAboutHeroBg}
              confirmMessage="This replaces the background image behind the About page's first section. Continue?"
            />
            <BackgroundImageCard
              title={'About page — "Our Purpose / Our Mission" section'}
              hint="Shown as the photo beside the text, not a full-width background."
              currentUrl={settings?.about_mission_image_url || "/images/our-mission.jpg"}
              action={updateAboutMissionImage}
              confirmMessage={'This replaces the image on the About page\'s "Our Mission" section. Continue?'}
            />
            <BackgroundImageCard
              title="Contact page — first section"
              currentUrl={settings?.contact_hero_bg_url || "/images/contact-page.jpg"}
              action={updateContactHeroBg}
              confirmMessage="This replaces the background image behind the Contact page's first section. Continue?"
            />
            <BackgroundImageCard
              title="Fleet page — first section"
              currentUrl={settings?.fleet_hero_bg_url || "/images/our-fleet-background.jpg"}
              action={updateFleetHeroBg}
              confirmMessage="This replaces the background image behind the Fleet page's first section. Continue?"
            />
          </div>
        </>
      )}
    </div>
  );
}

function BackgroundImageCard({
  title,
  hint,
  currentUrl,
  action,
  confirmMessage,
}: {
  title: string;
  hint?: string;
  currentUrl: string;
  action: (formData: FormData) => Promise<void>;
  confirmMessage: string;
}) {
  return (
    <div className="border border-sandline bg-white p-6">
      <h2 className="font-display text-lg text-ink">{title}</h2>
      <p className="mt-1 text-sm text-stone">
        {hint || "Shown as a full-width background image on the live site."}
      </p>

      <div className="mt-4">
        <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-black">
          Current image
        </span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={currentUrl}
          src={currentUrl}
          alt=""
          className="h-40 w-full border border-sandline bg-sand object-cover"
        />
      </div>

      <AdminForm
        action={action}
        successMessage="Image updated."
        confirmMessage={confirmMessage}
        confirmLabel="Upload image"
        className="mt-6 space-y-4"
      >
        <Field
          label="Replace with a new image"
          hint="Use a high-resolution landscape photo — it's displayed edge-to-edge behind text."
        >
          <input type="file" name="image" accept="image/*" required className="input" />
        </Field>
        <SubmitButton>Upload image</SubmitButton>
      </AdminForm>
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
