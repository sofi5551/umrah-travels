import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { deleteReview, createReview } from "@/app/admin/actions";
import ConfirmDeleteButton from "@/components/admin/ConfirmDeleteButton";
import AdminForm from "@/components/admin/AdminForm";
import SubmitButton from "@/components/admin/SubmitButton";

export const dynamic = "force-dynamic";

type ReviewRow = {
  id: string;
  name: string;
  rating: number;
  review: string;
  avatar_url: string | null;
  created_at: string;
  source: "user" | "admin";
};

export default async function AdminReviewsPage() {
  const { data, error } = supabaseAdmin
    ? await supabaseAdmin
        .from("reviews")
        .select("id, name, rating, review, avatar_url, created_at, source")
        .order("created_at", { ascending: false })
    : { data: null, error: null };

  const reviews = (data as ReviewRow[] | null) ?? [];

  return (
    <div>
      <h1 className="font-display text-2xl text-ink">Reviews</h1>
      <p className="mt-1 text-sm text-stone">
        User-submitted reviews can be deleted but not edited. Reviews you add yourself below are
        fully editable.
      </p>

      {error && (
        <p className="mt-4 text-sm text-red-600">Couldn&rsquo;t load reviews: {error.message}</p>
      )}
      {!supabaseAdmin && (
        <p className="mt-4 text-sm text-red-600">
          Admin database isn&rsquo;t configured (missing SUPABASE_SERVICE_ROLE_KEY).
        </p>
      )}

      <div className="mt-6 space-y-4">
        {reviews.map((r) => (
          <div key={r.id} className="border border-sandline bg-white p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-ink">{r.name}</p>
                  <span className="rounded-full border border-sandline px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-stone">
                    {r.source === "admin" ? "Admin" : "User"}
                  </span>
                </div>
                <p className="text-sm text-gold">
                  {"★".repeat(r.rating)}
                  {"☆".repeat(5 - r.rating)}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <p className="text-xs text-stone">{new Date(r.created_at).toLocaleString()}</p>
                {r.source === "admin" && (
                  <Link href={`/admin/reviews/${r.id}`} className="text-sm text-ink hover:text-gold">
                    Edit
                  </Link>
                )}
                <ConfirmDeleteButton
                  action={deleteReview.bind(null, r.id)}
                  itemLabel={`${r.name}'s review`}
                  successMessage="Review deleted."
                  className="text-sm text-red-600 hover:underline"
                />
              </div>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-charcoal">{r.review}</p>
          </div>
        ))}
        {reviews.length === 0 && !error && (
          <p className="border border-sandline bg-white p-6 text-center text-stone">
            No reviews yet — add one below.
          </p>
        )}
      </div>

      <div className="mt-10 max-w-xl border border-sandline bg-white p-6">
        <h2 className="font-display text-lg text-ink">Add a review</h2>
        <p className="mt-1 text-sm text-stone">
          Shows up on the homepage alongside real submissions. Fully editable afterward.
        </p>
        <AdminForm action={createReview} successMessage="Review added." className="mt-4 space-y-4">
          <Field label="Name">
            <input name="name" required className="input" placeholder="Full name" />
          </Field>
          <Field label="Rating (1–5)">
            <input
              type="number"
              name="rating"
              min={1}
              max={5}
              defaultValue={5}
              required
              className="input"
            />
          </Field>
          <Field label="Review text">
            <textarea
              name="review"
              required
              className="input min-h-24 resize-y"
              placeholder="Tell us about your trip..."
            />
          </Field>
          <Field label="Photo (optional)">
            <input type="file" name="avatar" accept="image/*" className="input" />
          </Field>
          <SubmitButton>Add review</SubmitButton>
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
