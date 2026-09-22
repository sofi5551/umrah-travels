import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { updatePromoVideo } from "@/app/admin/actions";
import AdminForm from "@/components/admin/AdminForm";
import SubmitButton from "@/components/admin/SubmitButton";
import BackButton from "@/components/admin/BackButton";

export const dynamic = "force-dynamic";

type PromoVideoRow = {
  id: string;
  video_url: string;
  title: string | null;
  sort_order: number;
};

export default async function EditPromoVideoPage({ params }: { params: { id: string } }) {
  if (!supabaseAdmin) {
    return <p className="text-sm text-red-600">Admin database isn&rsquo;t configured.</p>;
  }

  const { data, error } = await supabaseAdmin
    .from("promo_videos")
    .select("id, video_url, title, sort_order")
    .eq("id", params.id)
    .single();

  if (error || !data) return notFound();
  const video = data as PromoVideoRow;

  return (
    <div>
      <div className="flex items-center gap-3">
        <BackButton href="/admin/promo-videos" />
        <h1 className="font-display text-2xl text-ink">Edit video</h1>
      </div>

      <div className="mt-6 max-w-xl border border-sandline bg-white p-6">
        <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-black">
          Current video
        </span>
        <video src={video.video_url} controls muted className="w-full border border-sandline bg-ink" />

        <AdminForm
          action={updatePromoVideo.bind(null, video.id)}
          successMessage="Video updated."
          confirmMessage="This updates this video on the live homepage carousel. Continue?"
          confirmLabel="Save changes"
          className="mt-6 space-y-4"
        >
          <Field label="Title (optional)" hint="Shown as a caption under the video. Leave blank for none.">
            <input name="title" defaultValue={video.title ?? ""} className="input" />
          </Field>
          <Field
            label="Replace video (leave blank to keep current)"
            hint="Uploaded as .mp4. Keep it short — this plays automatically on the homepage."
          >
            <input type="file" name="video" accept="video/*" className="input" />
          </Field>
          <Field label="Sort order" hint="Controls the order videos appear in the carousel — lower numbers show first.">
            <input type="number" name="sort_order" defaultValue={video.sort_order} className="input" />
          </Field>
          <SubmitButton>Save changes</SubmitButton>
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
