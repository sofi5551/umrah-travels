import { isSupabaseConfigured, supabase } from "./supabase";

export type PromoVideo = {
  id: string;
  videoUrl: string;
  title: string | null;
};

// Shown until the admin's `promo_videos` table has rows of its own — same
// files used as the homepage hero video default, bundled in /public.
const fallbackPromoVideos: PromoVideo[] = [
  { id: "default-video1", videoUrl: "/video1.mp4", title: null },
  { id: "default-video2", videoUrl: "/video2.mp4", title: null },
];

/**
 * Public (anon-key) fetch of the homepage's promo-video carousel. Falls back
 * to the two bundled default videos if Supabase isn't configured, the table
 * doesn't exist yet, the fetch fails, or the table is empty.
 */
export async function getPromoVideos(): Promise<PromoVideo[]> {
  if (!isSupabaseConfigured || !supabase) return fallbackPromoVideos;

  const { data, error } = await supabase
    .from("promo_videos")
    .select("id, video_url, title")
    .order("sort_order", { ascending: true });

  if (error || !data || data.length === 0) return fallbackPromoVideos;

  return data.map((row) => ({
    id: row.id,
    videoUrl: row.video_url,
    title: row.title,
  }));
}
