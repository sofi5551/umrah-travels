import Image from "next/image";
import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { updateReview } from "@/app/admin/actions";
import AdminForm from "@/components/admin/AdminForm";
import SubmitButton from "@/components/admin/SubmitButton";
import BackButton from "@/components/admin/BackButton";

export const dynamic = "force-dynamic";

type ReviewRow = {
  id: string;
  name: string;
  rating: number;
  review: string;
  avatar_url: string | null;
  source: "user" | "admin";
};

export default async function EditReviewPage({ params }: { params: { id: string } }) {
  if (!supabaseAdmin) {
    return <p className="text-sm text-red-600">Admin database isn&rsquo;t configured.</p>;
  }

  const { data, error } = await supabaseAdmin
    .from("reviews")
    .select("id, name, rating, review, avatar_url, source")
    .eq("id", params.id)
    .single();

  if (error || !data) return notFound();
  const review = data as ReviewRow;

  if (review.source !== "admin") {
    return (
      <div>
        <div className="flex items-center gap-3">
          <BackButton href="/admin/reviews" />
          <h1 className="font-display text-2xl text-ink">Edit review</h1>
        </div>
        <p className="mt-4 max-w-lg border border-sandline bg-white p-6 text-sm text-stone">
          This review was submitted by a user and can&rsquo;t be edited — you can delete it from
          the Reviews list instead.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-3">
        <BackButton href="/admin/reviews" />
        <h1 className="font-display text-2xl text-ink">Edit {review.name}&rsquo;s review</h1>
      </div>

      <div className="mt-6 max-w-xl border border-sandline bg-white p-6">
        {review.avatar_url && (
          <div className="relative mb-4 h-20 w-20 overflow-hidden rounded-full">
            <Image src={review.avatar_url} alt={review.name} fill className="object-cover" />
          </div>
        )}
        <AdminForm
          action={updateReview.bind(null, review.id)}
          successMessage="Review updated."
          confirmMessage="This updates this review on the live homepage. Continue?"
          confirmLabel="Save changes"
          className="space-y-4"
        >
          <Field label="Name">
            <input name="name" required defaultValue={review.name} className="input" />
          </Field>
          <Field label="Rating (1–5)">
            <input
              type="number"
              name="rating"
              min={1}
              max={5}
              required
              defaultValue={review.rating}
              className="input"
            />
          </Field>
          <Field label="Review text">
            <textarea
              name="review"
              required
              defaultValue={review.review}
              className="input min-h-24 resize-y"
            />
          </Field>
          <Field label="Replace photo (optional)">
            <input type="file" name="avatar" accept="image/*" className="input" />
          </Field>
          <SubmitButton>Save changes</SubmitButton>
        </AdminForm>
      </div>
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
