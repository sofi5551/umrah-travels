import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import {
  createPromoVideo,
  deletePromoVideo,
  updatePromoVideosVisibility,
} from "@/app/admin/actions";
import AdminForm from "@/components/admin/AdminForm";
import SubmitButton from "@/components/admin/SubmitButton";
import ConfirmDeleteButton from "@/components/admin/ConfirmDeleteButton";

export const dynamic = "force-dynamic";

type Settings = { promo_videos_enabled: boolean | null };

type PromoVideoRow = {
  id: string;
  video_url: string;
  title: string | null;
  sort_order: number;
};

export default async function AdminPromoVideosPage() {
  if (!supabaseAdmin) {
    return <p className="text-sm text-red-600">Admin database isn&rsquo;t configured.</p>;
  }

  const [{ data: settingsData }, { data: videoData, error }] = await Promise.all([
    supabaseAdmin.from("site_settings").select("promo_videos_enabled").eq("id", 1).single(),
    supabaseAdmin
      .from("promo_videos")
      .select("id, video_url, title, sort_order")
      .order("sort_order", { ascending: true }),
  ]);

  const settings = settingsData as Settings | null;
  const videos = (videoData as PromoVideoRow[] | null) ?? [];

  return (
    <div>
      <h1 className="font-display text-2xl text-ink">Promo Videos</h1>
      <p className="mt-1 text-sm text-stone">
        The video carousel shown on the homepage, below &ldquo;Request a quick quote&rdquo;.
      </p>

      <div className="mt-6 max-w-lg border border-sandline bg-white p-6">
        <h2 className="font-display text-lg text-ink">Section visibility</h2>
        <AdminForm
          action={updatePromoVideosVisibility}
          successMessage="Visibility updated."
          confirmMessage="This changes whether the promo-video section appears on the live homepage. Continue?"
          confirmLabel="Save changes"
          className="mt-3"
        >
          <label className="flex items-center gap-2 text-sm text-charcoal">
            <input
              type="checkbox"
              name="promo_videos_enabled"
              defaultChecked={settings?.promo_videos_enabled ?? true}
              className="h-4 w-4 rounded border-sandline text-gold focus:ring-gold"
            />
            Show this section on the homepage
          </label>
          <p className="mt-1 pl-6 text-xs text-stone">On by default. Turn off to hide it entirely.</p>
          <SubmitButton className="mt-4 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-goldsoft disabled:cursor-not-allowed disabled:opacity-60">
            Save changes
          </SubmitButton>
        </AdminForm>
      </div>

      {error && (
        <p className="mt-4 text-sm text-red-600">Couldn&rsquo;t load videos: {error.message}</p>
      )}

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {videos.map((v) => (
          <div key={v.id} className="border border-sandline bg-white p-4">
            <video src={v.video_url} muted controls className="aspect-video w-full bg-ink object-cover" />
            <p className="mt-3 text-sm font-medium text-ink">{v.title || "(no title)"}</p>
            <div className="mt-3 flex items-center gap-3">
              <Link href={`/admin/promo-videos/${v.id}`} className="text-sm text-ink hover:text-gold">
                Edit
              </Link>
              <ConfirmDeleteButton
                action={deletePromoVideo.bind(null, v.id)}
                itemLabel={v.title || "this video"}
                successMessage="Video deleted."
                className="text-sm text-red-600 hover:underline"
              />
            </div>
          </div>
        ))}
        {videos.length === 0 && !error && (
          <p className="text-sm text-stone">
            No videos in the database yet — the homepage is showing the two bundled defaults. Add a
            video below to start managing them here.
          </p>
        )}
      </div>

      <div className="mt-10 max-w-xl border border-sandline bg-white p-6">
        <h2 className="font-display text-lg text-ink">Add a video</h2>
        <AdminForm
          action={createPromoVideo}
          successMessage="Video added."
          confirmMessage="This adds a new video to the live homepage carousel. Continue?"
          confirmLabel="Add video"
          className="mt-4 space-y-4"
        >
          <Field label="Title (optional)" hint="Shown as a caption under the video. Leave blank for none.">
            <input name="title" className="input" placeholder="e.g. On the road with Haramain Ways" />
          </Field>
          <Field label="Video" hint="Uploaded as .mp4. Keep it short — this plays automatically on the homepage.">
            <input type="file" name="video" accept="video/*" required className="input" />
          </Field>
          <Field label="Sort order" hint="Controls the order videos appear in the carousel — lower numbers show first.">
            <input type="number" name="sort_order" defaultValue={0} className="input" />
          </Field>
          <SubmitButton>Add video</SubmitButton>
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
