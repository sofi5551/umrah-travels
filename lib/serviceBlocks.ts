import { isSupabaseConfigured, supabase } from "./supabase";

export type ServiceBlock =
  | {
      id: string;
      type: "table";
      heading: string | null;
      description: string | null;
      columns: string[];
      rows: string[][];
      isHourly: boolean;
    }
  | {
      id: string;
      type: "image";
      heading: string | null;
      description: string | null;
      imageUrl: string;
    };

/**
 * Public (anon-key) fetch of a service page's admin-added content blocks
 * (pricing tables / pricing images). Returns [] if Supabase isn't
 * configured, the table doesn't exist yet, or the fetch fails — blocks are
 * a pure extra, so the page just renders without them rather than crashing.
 */
export async function getServiceBlocks(serviceId: string): Promise<ServiceBlock[]> {
  if (!isSupabaseConfigured || !supabase || !serviceId) return [];

  const { data, error } = await supabase
    .from("service_blocks")
    .select("id, type, heading, description, columns, rows, image_url, is_hourly")
    .eq("service_id", serviceId)
    .order("sort_order", { ascending: true });

  if (error || !data) return [];

  return data
    .map((row): ServiceBlock | null => {
      if (row.type === "table") {
        return {
          id: row.id,
          type: "table",
          heading: row.heading,
          description: row.description,
          columns: Array.isArray(row.columns) ? row.columns : [],
          rows: Array.isArray(row.rows) ? row.rows : [],
          isHourly: Boolean(row.is_hourly),
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
    .filter((b): b is ServiceBlock => b !== null);
}
