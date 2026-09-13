import { isSupabaseConfigured, supabase } from "./supabase";
import { testimonials, type Review } from "./data";

const AVATAR_BUCKET = "review-avatars";

export type NewReview = {
  name: string;
  email: string;
  rating: number;
  review: string;
  avatarFile?: File | null;
};

/**
 * All reviews, newest first, straight from Supabase (this now includes the
 * former "seed" reviews, migrated into the table as source: "admin" rows so
 * they're editable). Falls back to the hardcoded testimonials only when
 * Supabase isn't configured yet, the query fails, or the table is empty —
 * never merged with live data, which would double up the migrated seed rows.
 */
export async function fetchReviews(): Promise<Review[]> {
  if (!isSupabaseConfigured || !supabase) {
    return sortByNewest(testimonials);
  }

  const { data, error } = await supabase
    .from("reviews")
    .select("id, name, rating, review, avatar_url, created_at, source")
    .order("created_at", { ascending: false });

  if (error || !data || data.length === 0) {
    return sortByNewest(testimonials);
  }

  const live: Review[] = data.map((row) => ({
    id: row.id,
    name: row.name,
    rating: row.rating,
    review: row.review,
    avatarUrl: row.avatar_url,
    createdAt: row.created_at,
    source: row.source,
  }));

  return sortByNewest(live);
}

/**
 * Uploads the optional avatar, inserts the review row, and returns it in the
 * same shape fetchReviews() produces so it can be prepended to the list
 * immediately without a refetch.
 */
export async function submitReview(input: NewReview): Promise<Review> {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error(
      "Reviews aren't connected to a database yet — ask the site owner to finish the Supabase setup."
    );
  }

  let avatarUrl: string | null = null;

  if (input.avatarFile) {
    const extension = input.avatarFile.name.split(".").pop() || "jpg";
    const path = `${crypto.randomUUID()}.${extension}`;

    const { error: uploadError } = await supabase.storage
      .from(AVATAR_BUCKET)
      .upload(path, input.avatarFile, { upsert: false });

    if (uploadError) {
      throw new Error(`Couldn't upload your photo: ${uploadError.message}`);
    }

    const { data: publicUrlData } = supabase.storage.from(AVATAR_BUCKET).getPublicUrl(path);
    avatarUrl = publicUrlData.publicUrl;
  }

  const { data, error } = await supabase
    .from("reviews")
    .insert({
      name: input.name,
      email: input.email,
      rating: input.rating,
      review: input.review,
      avatar_url: avatarUrl,
      source: "user",
    })
    .select("id, name, rating, review, avatar_url, created_at, source")
    .single();

  if (error || !data) {
    throw new Error(error?.message || "Something went wrong submitting your review.");
  }

  return {
    id: data.id,
    name: data.name,
    rating: data.rating,
    review: data.review,
    avatarUrl: data.avatar_url,
    createdAt: data.created_at,
    source: data.source,
  };
}

function sortByNewest(reviews: Review[]): Review[] {
  return [...reviews].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}
