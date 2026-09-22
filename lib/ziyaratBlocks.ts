import { isSupabaseConfigured, supabase } from "./supabase";

export type ZiyaratBlock =
  | {
      id: string;
      type: "table";
      heading: string | null;
      description: string | null;
      columns: string[];
      rows: string[][];
    }
  | {
      id: string;
      type: "image";
      heading: string | null;
      description: string | null;
      imageUrl: string;
    };

/**
 * Public (anon-key) fetch of a Ziyarat page's admin-added content blocks
 * (pricing tables / pricing images) — same shape and behavior as
 * lib/serviceBlocks.ts. Returns [] if Supabase isn't configured, the table
 * doesn't exist yet, or the fetch fails.
 */
export async function getZiyaratBlocks(ziyaratId: string): Promise<ZiyaratBlock[]> {
  if (!isSupabaseConfigured || !supabase || !ziyaratId) return [];

  const { data, error } = await supabase
    .from("ziyarat_blocks")
    .select("id, type, heading, description, columns, rows, image_url")
    .eq("ziyarat_id", ziyaratId)
    .order("sort_order", { ascending: true });

  if (error || !data) return [];

  return data
    .map((row): ZiyaratBlock | null => {
      if (row.type === "table") {
        return {
          id: row.id,
          type: "table",
          heading: row.heading,
          description: row.description,
          columns: Array.isArray(row.columns) ? row.columns : [],
          rows: Array.isArray(row.rows) ? row.rows : [],
        };
      }
      if (row.type === "image" && row.image_url) {
        return {
          id: row.id,
          type: "image",
          heading: row.heading,
          description: row.description,
          imageUrl: row.image_url,
        };
      }
      return null;
    })
    .filter((b): b is ZiyaratBlock => b !== null);
}
