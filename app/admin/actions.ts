"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { getAdminSession } from "@/lib/getAdminSession";
import {
  DEFAULT_BOOKING_NOTE,
  DEFAULT_COMFORT_NOTE,
  buildDefaultDescription,
  buildDefaultServiceDescription,
} from "@/lib/data";

const FLEET_BUCKET = "fleet-images";
const REVIEW_AVATAR_BUCKET = "review-avatars";
const SERVICE_IMAGE_BUCKET = "service-images";
const SITE_MEDIA_BUCKET = "site-media";

async function requireAdmin() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");
  return session;
}

function requireAdminDb() {
  if (!supabaseAdmin) throw new Error("Admin database isn't configured yet.");
  return supabaseAdmin;
}

/**
 * Deletes a previously-uploaded file from storage when it's being replaced or
 * its owning row is deleted, so old uploads don't pile up as orphaned files
 * (against the free-tier storage cap). No-ops for anything that isn't a file
 * in this bucket — e.g. the hardcoded local /images/... fleet photos, or the
 * bundled /video1.mp4 default — and never throws: cleanup is best-effort and
 * must not fail the save/delete that already succeeded.
 */
async function deleteFromStorage(
  db: NonNullable<typeof supabaseAdmin>,
  bucket: string,
  url: string | null | undefined
) {
  if (!url) return;
  const marker = `/storage/v1/object/public/${bucket}/`;
  const index = url.indexOf(marker);
  if (index === -1) return;
  const path = url.slice(index + marker.length);
  if (!path) return;
  try {
    await db.storage.from(bucket).remove([path]);
  } catch {
    // ignore — the save/delete itself already succeeded
  }
}

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// ---------------------------------------------------------------------------
// Site settings (Contact Details + Social Icons share one row)
// ---------------------------------------------------------------------------

export async function updateContactDetails(formData: FormData) {
  await requireAdmin();
  const db = requireAdminDb();

  const { error } = await db
    .from("site_settings")
    .update({
      phone: String(formData.get("phone") || ""),
      whatsapp_number: String(formData.get("whatsapp_number") || ""),
      email: String(formData.get("email") || ""),
      address: String(formData.get("address") || ""),
      address_enabled: formData.get("address_enabled") === "on",
      updated_at: new Date().toISOString(),
    })
    .eq("id", 1);

  if (error) throw new Error(error.message);

  revalidatePath("/", "layout");
  revalidatePath("/admin/contact-details");
}

export async function updateHeroVideo(formData: FormData) {
  await requireAdmin();
  const db = requireAdminDb();

  const videoFile = formData.get("video");
  if (!(videoFile instanceof File) || videoFile.size === 0) {
    throw new Error("A video file is required.");
  }
  if (!videoFile.type.startsWith("video/")) {
    throw new Error("Please upload a video file.");
  }

  const { data: existing } = await db.from("site_settings").select("hero_video_url").eq("id", 1).single();

  const extension = videoFile.name.split(".").pop() || "mp4";
  const path = `hero/${crypto.randomUUID()}.${extension}`;
  const { error: uploadError } = await db.storage
    .from(SITE_MEDIA_BUCKET)
    .upload(path, videoFile, { upsert: false });
  if (uploadError) throw new Error(`Couldn't upload video: ${uploadError.message}`);

  const { data: publicUrl } = db.storage.from(SITE_MEDIA_BUCKET).getPublicUrl(path);

  const { error } = await db
    .from("site_settings")
    .update({ hero_video_url: publicUrl.publicUrl, updated_at: new Date().toISOString() })
    .eq("id", 1);

  if (error) throw new Error(error.message);

  await deleteFromStorage(db, SITE_MEDIA_BUCKET, existing?.hero_video_url);

  revalidatePath("/", "layout");
  revalidatePath("/admin/background-media");
}

// ---------------------------------------------------------------------------
// Branding (logo + favicon)
// ---------------------------------------------------------------------------

export async function updateLogo(formData: FormData) {
  await requireAdmin();
  const db = requireAdminDb();

  const file = formData.get("logo");
  if (!(file instanceof File) || file.size === 0) {
    throw new Error("A logo image is required.");
  }
  if (!file.type.startsWith("image/")) {
    throw new Error("Please upload an image file.");
  }

  const { data: existing } = await db.from("site_settings").select("logo_url").eq("id", 1).single();

  const extension = file.name.split(".").pop() || "png";
  const path = `branding/logo-${crypto.randomUUID()}.${extension}`;
  const { error: uploadError } = await db.storage
    .from(SITE_MEDIA_BUCKET)
    .upload(path, file, { upsert: false });
  if (uploadError) throw new Error(`Couldn't upload logo: ${uploadError.message}`);

  const { data: publicUrl } = db.storage.from(SITE_MEDIA_BUCKET).getPublicUrl(path);

  const { error } = await db
    .from("site_settings")
    .update({ logo_url: publicUrl.publicUrl, updated_at: new Date().toISOString() })
    .eq("id", 1);

  if (error) throw new Error(error.message);

  await deleteFromStorage(db, SITE_MEDIA_BUCKET, existing?.logo_url);

  revalidatePath("/", "layout");
  revalidatePath("/admin/branding");
}

export async function updateFavicon(formData: FormData) {
  await requireAdmin();
  const db = requireAdminDb();

  const file = formData.get("favicon");
  if (!(file instanceof File) || file.size === 0) {
    throw new Error("A favicon image is required.");
  }
  if (!file.type.startsWith("image/")) {
    throw new Error("Please upload an image file.");
  }

  const { data: existing } = await db.from("site_settings").select("favicon_url").eq("id", 1).single();

  const extension = file.name.split(".").pop() || "png";
  const path = `branding/favicon-${crypto.randomUUID()}.${extension}`;
  const { error: uploadError } = await db.storage
    .from(SITE_MEDIA_BUCKET)
    .upload(path, file, { upsert: false });
  if (uploadError) throw new Error(`Couldn't upload favicon: ${uploadError.message}`);

  const { data: publicUrl } = db.storage.from(SITE_MEDIA_BUCKET).getPublicUrl(path);

  const { error } = await db
    .from("site_settings")
    .update({ favicon_url: publicUrl.publicUrl, updated_at: new Date().toISOString() })
    .eq("id", 1);

  if (error) throw new Error(error.message);

  await deleteFromStorage(db, SITE_MEDIA_BUCKET, existing?.favicon_url);

  revalidatePath("/", "layout");
  revalidatePath("/admin/branding");
}

// ---------------------------------------------------------------------------
// Page background images
// ---------------------------------------------------------------------------

/**
 * Shared upload+replace logic for the site_settings background-image
 * columns below. Uploads the new file, points the given column at it, then
 * deletes whatever the column pointed to before — so replacing one of these
 * never leaves the old upload orphaned in storage.
 */
async function updateSiteBackgroundImage(
  columnName: string,
  pagePaths: string[],
  formData: FormData
) {
  await requireAdmin();
  const db = requireAdminDb();

  const file = formData.get("image");
  if (!(file instanceof File) || file.size === 0) {
    throw new Error("An image is required.");
  }
  if (!file.type.startsWith("image/")) {
    throw new Error("Please upload an image file.");
  }

  const { data: existing } = await db
    .from("site_settings")
    .select(columnName)
    .eq("id", 1)
    .single();

  const extension = file.name.split(".").pop() || "jpg";
  const path = `backgrounds/${crypto.randomUUID()}.${extension}`;
  const { error: uploadError } = await db.storage
    .from(SITE_MEDIA_BUCKET)
    .upload(path, file, { upsert: false });
  if (uploadError) throw new Error(`Couldn't upload image: ${uploadError.message}`);

  const { data: publicUrl } = db.storage.from(SITE_MEDIA_BUCKET).getPublicUrl(path);

  const { error } = await db
    .from("site_settings")
    .update({ [columnName]: publicUrl.publicUrl, updated_at: new Date().toISOString() })
    .eq("id", 1);

  if (error) throw new Error(error.message);

  const oldUrl = (existing as Record<string, string | null> | null)?.[columnName];
  await deleteFromStorage(db, SITE_MEDIA_BUCKET, oldUrl);

  revalidatePath("/", "layout");
  for (const p of pagePaths) revalidatePath(p);
  revalidatePath("/admin/background-media");
}

export async function updateHomepageQuoteBg(formData: FormData) {
  await updateSiteBackgroundImage("homepage_quote_bg_url", ["/"], formData);
}

export async function updateHomepageWhyChooseBg(formData: FormData) {
  await updateSiteBackgroundImage("homepage_why_choose_bg_url", ["/"], formData);
}

export async function updateAboutHeroBg(formData: FormData) {
  await updateSiteBackgroundImage("about_hero_bg_url", ["/about"], formData);
}

export async function updateAboutMissionImage(formData: FormData) {
  await updateSiteBackgroundImage("about_mission_image_url", ["/about"], formData);
}

export async function updateContactHeroBg(formData: FormData) {
  await updateSiteBackgroundImage("contact_hero_bg_url", ["/contact"], formData);
}

export async function updateFleetHeroBg(formData: FormData) {
  await updateSiteBackgroundImage("fleet_hero_bg_url", ["/fleet"], formData);
}

// ---------------------------------------------------------------------------
// Homepage promo-video carousel
// ---------------------------------------------------------------------------

export async function updatePromoVideosVisibility(formData: FormData) {
  await requireAdmin();
  const db = requireAdminDb();

  const { error } = await db
    .from("site_settings")
    .update({
      promo_videos_enabled: formData.get("promo_videos_enabled") === "on",
      updated_at: new Date().toISOString(),
    })
    .eq("id", 1);

  if (error) throw new Error(error.message);

  revalidatePath("/", "layout");
  revalidatePath("/admin/promo-videos");
}

async function uploadPromoVideo(db: NonNullable<typeof supabaseAdmin>, file: File) {
  const extension = file.name.split(".").pop() || "mp4";
  const path = `promo/${crypto.randomUUID()}.${extension}`;
  const { error } = await db.storage.from(SITE_MEDIA_BUCKET).upload(path, file, { upsert: false });
  if (error) throw new Error(`Couldn't upload video: ${error.message}`);
  const { data } = db.storage.from(SITE_MEDIA_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

export async function createPromoVideo(formData: FormData) {
  await requireAdmin();
  const db = requireAdminDb();

  const videoFile = formData.get("video");
  if (!(videoFile instanceof File) || videoFile.size === 0) {
    throw new Error("A video file is required.");
  }
  if (!videoFile.type.startsWith("video/")) {
    throw new Error("Please upload a video file.");
  }

  const videoUrl = await uploadPromoVideo(db, videoFile);

  const { error } = await db.from("promo_videos").insert({
    video_url: videoUrl,
    title: String(formData.get("title") || "").trim() || null,
    sort_order: Number(formData.get("sort_order") || 0),
  });

  if (error) throw new Error(error.message);

  revalidatePath("/", "layout");
  revalidatePath("/admin/promo-videos");
}

export async function updatePromoVideo(id: string, formData: FormData) {
  await requireAdmin();
  const db = requireAdminDb();

  const { data: existing, error: fetchError } = await db
    .from("promo_videos")
    .select("video_url")
    .eq("id", id)
    .single();
  if (fetchError || !existing) throw new Error("Video not found.");

  const update: Record<string, unknown> = {
    title: String(formData.get("title") || "").trim() || null,
    sort_order: Number(formData.get("sort_order") || 0),
  };

  const videoFile = formData.get("video");
  const replacing = videoFile instanceof File && videoFile.size > 0;
  if (replacing) {
    if (!(videoFile as File).type.startsWith("video/")) {
      throw new Error("Please upload a video file.");
    }
    update.video_url = await uploadPromoVideo(db, videoFile as File);
  }

  const { error } = await db.from("promo_videos").update(update).eq("id", id);
  if (error) throw new Error(error.message);

  if (replacing) await deleteFromStorage(db, SITE_MEDIA_BUCKET, existing.video_url);

  revalidatePath("/", "layout");
  revalidatePath("/admin/promo-videos");
}

export async function deletePromoVideo(id: string) {
  await requireAdmin();
  const db = requireAdminDb();

  const { data: existing } = await db.from("promo_videos").select("video_url").eq("id", id).single();

  const { error } = await db.from("promo_videos").delete().eq("id", id);
  if (error) throw new Error(error.message);

  if (existing?.video_url) await deleteFromStorage(db, SITE_MEDIA_BUCKET, existing.video_url);

  revalidatePath("/", "layout");
  revalidatePath("/admin/promo-videos");
}

// ---------------------------------------------------------------------------
// Ziyarat pages
// ---------------------------------------------------------------------------

export async function updateZiyaratVisibility(formData: FormData) {
  await requireAdmin();
  const db = requireAdminDb();

  const { error } = await db
    .from("site_settings")
    .update({
      ziyarat_enabled: formData.get("ziyarat_enabled") === "on",
      updated_at: new Date().toISOString(),
    })
    .eq("id", 1);

  if (error) throw new Error(error.message);

  revalidatePath("/", "layout");
  revalidatePath("/admin/ziyarat");
}

async function uploadZiyaratImage(db: NonNullable<typeof supabaseAdmin>, file: File) {
  const extension = file.name.split(".").pop() || "jpg";
  const path = `ziyarat/${crypto.randomUUID()}.${extension}`;
  const { error } = await db.storage.from(SITE_MEDIA_BUCKET).upload(path, file, { upsert: false });
  if (error) throw new Error(`Couldn't upload image: ${error.message}`);
  const { data } = db.storage.from(SITE_MEDIA_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

async function getZiyaratSlug(db: NonNullable<typeof supabaseAdmin>, id: string) {
  const { data } = await db.from("ziyarat_pages").select("slug").eq("id", id).single();
  return data?.slug as string | undefined;
}

export async function createZiyaratPage(formData: FormData) {
  await requireAdmin();
  const db = requireAdminDb();

  const label = String(formData.get("label") || "").trim();
  if (!label) throw new Error("Label is required.");

  const imageFile = formData.get("image");
  let imageUrl: string | null = null;
  if (imageFile instanceof File && imageFile.size > 0) {
    imageUrl = await uploadZiyaratImage(db, imageFile);
  }

  const { error } = await db.from("ziyarat_pages").insert({
    slug: slugify(label) || crypto.randomUUID(),
    label,
    description: String(formData.get("description") || "").trim() || null,
    quote: String(formData.get("quote") || "").trim() || null,
    image_url: imageUrl,
    sort_order: Number(formData.get("sort_order") || 0),
  });

  if (error) throw new Error(error.message);

  revalidatePath("/", "layout");
  revalidatePath("/ziyarat");
  revalidatePath("/admin/ziyarat");
}

export async function updateZiyaratPage(id: string, formData: FormData) {
  await requireAdmin();
  const db = requireAdminDb();

  const label = String(formData.get("label") || "").trim();
  if (!label) throw new Error("Label is required.");

  const { data: existing } = await db.from("ziyarat_pages").select("image_url").eq("id", id).single();

  const update: Record<string, unknown> = {
    label,
    description: String(formData.get("description") || "").trim() || null,
    quote: String(formData.get("quote") || "").trim() || null,
    sort_order: Number(formData.get("sort_order") || 0),
  };

  const imageFile = formData.get("image");
  const replacingImage = imageFile instanceof File && imageFile.size > 0;
  if (replacingImage) {
    update.image_url = await uploadZiyaratImage(db, imageFile as File);
  }

  const { error } = await db.from("ziyarat_pages").update(update).eq("id", id);
  if (error) throw new Error(error.message);

  if (replacingImage) await deleteFromStorage(db, SITE_MEDIA_BUCKET, existing?.image_url);

  const slug = await getZiyaratSlug(db, id);
  revalidatePath("/", "layout");
  revalidatePath("/ziyarat");
  if (slug) revalidatePath(`/ziyarat/${slug}`);
  revalidatePath("/admin/ziyarat");
}

export async function deleteZiyaratPage(id: string) {
  await requireAdmin();
  const db = requireAdminDb();

  const { data: existing } = await db
    .from("ziyarat_pages")
    .select("slug, image_url")
    .eq("id", id)
    .single();

  // ziyarat_blocks rows cascade-delete with the page, but their storage
  // files don't — clean those up first or they're orphaned for good.
  const { data: blocks } = await db
    .from("ziyarat_blocks")
    .select("image_url")
    .eq("ziyarat_id", id)
    .eq("type", "image");

  const { error } = await db.from("ziyarat_pages").delete().eq("id", id);
  if (error) throw new Error(error.message);

  if (existing?.image_url) await deleteFromStorage(db, SITE_MEDIA_BUCKET, existing.image_url);
  for (const block of blocks ?? []) {
    await deleteFromStorage(db, SITE_MEDIA_BUCKET, block.image_url);
  }

  revalidatePath("/", "layout");
  revalidatePath("/ziyarat");
  if (existing?.slug) revalidatePath(`/ziyarat/${existing.slug}`);
  revalidatePath("/admin/ziyarat");
}

// ---------------------------------------------------------------------------
// Ziyarat content blocks (admin-built pricing tables / pricing images)
// ---------------------------------------------------------------------------

async function getZiyaratPageSlug(db: NonNullable<typeof supabaseAdmin>, ziyaratId: string) {
  const { data } = await db.from("ziyarat_pages").select("slug").eq("id", ziyaratId).single();
  return data?.slug as string | undefined;
}

async function revalidateZiyaratBlocks(db: NonNullable<typeof supabaseAdmin>, ziyaratId: string) {
  const slug = await getZiyaratPageSlug(db, ziyaratId);
  if (slug) revalidatePath(`/ziyarat/${slug}`);
  revalidatePath(`/admin/ziyarat/${ziyaratId}`);
}

async function uploadZiyaratBlockImage(db: NonNullable<typeof supabaseAdmin>, file: File) {
  const extension = file.name.split(".").pop() || "jpg";
  const path = `ziyarat-blocks/${crypto.randomUUID()}.${extension}`;
  const { error } = await db.storage.from(SITE_MEDIA_BUCKET).upload(path, file, { upsert: false });
  if (error) throw new Error(`Couldn't upload image: ${error.message}`);
  const { data } = db.storage.from(SITE_MEDIA_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

export async function createZiyaratTableBlock(ziyaratId: string, formData: FormData) {
  await requireAdmin();
  const db = requireAdminDb();

  const { columns, rows } = parseTableFields(formData);

  const { error } = await db.from("ziyarat_blocks").insert({
    ziyarat_id: ziyaratId,
    type: "table",
    heading: String(formData.get("heading") || "").trim() || null,
    description: String(formData.get("description") || "").trim() || null,
    columns,
    rows,
    sort_order: Number(formData.get("sort_order") || 0),
  });

  if (error) throw new Error(error.message);
  await revalidateZiyaratBlocks(db, ziyaratId);
}

export async function updateZiyaratTableBlock(blockId: string, formData: FormData) {
  await requireAdmin();
  const db = requireAdminDb();

  const { data: existing, error: fetchError } = await db
    .from("ziyarat_blocks")
    .select("ziyarat_id")
    .eq("id", blockId)
    .single();
  if (fetchError || !existing) throw new Error("Block not found.");

  const { columns, rows } = parseTableFields(formData);

  const { error } = await db
    .from("ziyarat_blocks")
    .update({
      heading: String(formData.get("heading") || "").trim() || null,
      description: String(formData.get("description") || "").trim() || null,
      columns,
      rows,
      sort_order: Number(formData.get("sort_order") || 0),
    })
    .eq("id", blockId);

  if (error) throw new Error(error.message);
  await revalidateZiyaratBlocks(db, existing.ziyarat_id);
}

export async function createZiyaratImageBlock(ziyaratId: string, formData: FormData) {
  await requireAdmin();
  const db = requireAdminDb();

  const imageFile = formData.get("image");
  if (!(imageFile instanceof File) || imageFile.size === 0) {
    throw new Error("An image is required.");
  }
  const imageUrl = await uploadZiyaratBlockImage(db, imageFile);

  const { error } = await db.from("ziyarat_blocks").insert({
    ziyarat_id: ziyaratId,
    type: "image",
    heading: String(formData.get("heading") || "").trim() || null,
    description: String(formData.get("description") || "").trim() || null,
    image_url: imageUrl,
    sort_order: Number(formData.get("sort_order") || 0),
  });

  if (error) throw new Error(error.message);
  await revalidateZiyaratBlocks(db, ziyaratId);
}

export async function updateZiyaratImageBlock(blockId: string, formData: FormData) {
  await requireAdmin();
  const db = requireAdminDb();

  const { data: existing, error: fetchError } = await db
    .from("ziyarat_blocks")
    .select("ziyarat_id, image_url")
    .eq("id", blockId)
    .single();
  if (fetchError || !existing) throw new Error("Block not found.");

  const update: Record<string, unknown> = {
    heading: String(formData.get("heading") || "").trim() || null,
    description: String(formData.get("description") || "").trim() || null,
    sort_order: Number(formData.get("sort_order") || 0),
  };

  const imageFile = formData.get("image");
  const replacingImage = imageFile instanceof File && imageFile.size > 0;
  if (replacingImage) {
    update.image_url = await uploadZiyaratBlockImage(db, imageFile as File);
  }

  const { error } = await db.from("ziyarat_blocks").update(update).eq("id", blockId);
  if (error) throw new Error(error.message);

  if (replacingImage) await deleteFromStorage(db, SITE_MEDIA_BUCKET, existing.image_url);

  await revalidateZiyaratBlocks(db, existing.ziyarat_id);
}

export async function deleteZiyaratBlock(blockId: string) {
  await requireAdmin();
  const db = requireAdminDb();

  const { data: existing } = await db
    .from("ziyarat_blocks")
    .select("ziyarat_id, image_url")
    .eq("id", blockId)
    .single();

  const { error } = await db.from("ziyarat_blocks").delete().eq("id", blockId);
  if (error) throw new Error(error.message);

  if (existing?.image_url) await deleteFromStorage(db, SITE_MEDIA_BUCKET, existing.image_url);
  if (existing?.ziyarat_id) await revalidateZiyaratBlocks(db, existing.ziyarat_id);
}

const SOCIAL_PLATFORMS = [
  "facebook",
  "instagram",
  "youtube",
  "pinterest",
  "tiktok",
  "linkedin",
  "playstore",
] as const;

export async function updateSocialLinks(formData: FormData) {
  await requireAdmin();
  const db = requireAdminDb();

  const update: Record<string, unknown> = { updated_at: new Date().toISOString() };
  for (const platform of SOCIAL_PLATFORMS) {
    update[`social_${platform}`] = String(formData.get(`social_${platform}`) || "") || null;
    update[`social_${platform}_enabled`] = formData.get(`social_${platform}_enabled`) === "on";
  }

  const { error } = await db.from("site_settings").update(update).eq("id", 1);

  if (error) throw new Error(error.message);

  revalidatePath("/", "layout");
  revalidatePath("/admin/social-icons");
}

// ---------------------------------------------------------------------------
// Fleet
// ---------------------------------------------------------------------------

async function uploadFleetImage(db: NonNullable<typeof supabaseAdmin>, file: File) {
  const extension = file.name.split(".").pop() || "jpg";
  const path = `${crypto.randomUUID()}.${extension}`;
  const { error } = await db.storage.from(FLEET_BUCKET).upload(path, file, { upsert: false });
  if (error) throw new Error(`Couldn't upload image: ${error.message}`);
  const { data } = db.storage.from(FLEET_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

export async function createVehicle(formData: FormData) {
  await requireAdmin();
  const db = requireAdminDb();

  const name = String(formData.get("name") || "").trim();
  if (!name) throw new Error("Vehicle name is required.");

  const imageFile = formData.get("image");
  let imageUrl: string | null = null;
  if (imageFile instanceof File && imageFile.size > 0) {
    imageUrl = await uploadFleetImage(db, imageFile);
  }

  const type = String(formData.get("type") || "");
  const seats = Number(formData.get("seats") || 0);
  const description =
    String(formData.get("description") || "").trim() || buildDefaultDescription({ name, type, seats });

  const { error } = await db.from("fleet").insert({
    slug: slugify(name) || crypto.randomUUID(),
    name,
    type,
    class_name: String(formData.get("class_name") || ""),
    seats,
    luggage: String(formData.get("luggage") || ""),
    image_url: imageUrl,
    image_alt: name,
    sort_order: Number(formData.get("sort_order") || 0),
    booking_note: String(formData.get("booking_note") || "").trim() || DEFAULT_BOOKING_NOTE,
    comfort_note: String(formData.get("comfort_note") || "").trim() || DEFAULT_COMFORT_NOTE,
    description,
  });

  if (error) throw new Error(error.message);

  revalidatePath("/", "layout");
  revalidatePath("/fleet");
  revalidatePath("/admin/fleet");
}

export async function updateVehicle(id: string, formData: FormData) {
  await requireAdmin();
  const db = requireAdminDb();

  const name = String(formData.get("name") || "").trim();
  if (!name) throw new Error("Vehicle name is required.");

  const type = String(formData.get("type") || "");
  const seats = Number(formData.get("seats") || 0);

  const update: Record<string, unknown> = {
    name,
    type,
    class_name: String(formData.get("class_name") || ""),
    seats,
    luggage: String(formData.get("luggage") || ""),
    sort_order: Number(formData.get("sort_order") || 0),
    image_alt: name,
    booking_note: String(formData.get("booking_note") || "").trim() || DEFAULT_BOOKING_NOTE,
    comfort_note: String(formData.get("comfort_note") || "").trim() || DEFAULT_COMFORT_NOTE,
    description:
      String(formData.get("description") || "").trim() || buildDefaultDescription({ name, type, seats }),
  };

  const imageFile = formData.get("image");
  let previousImageUrl: string | null | undefined;
  if (imageFile instanceof File && imageFile.size > 0) {
    const { data: existing } = await db.from("fleet").select("image_url").eq("id", id).single();
    previousImageUrl = existing?.image_url;
    update.image_url = await uploadFleetImage(db, imageFile);
  }

  const { error } = await db.from("fleet").update(update).eq("id", id);
  if (error) throw new Error(error.message);

  if (previousImageUrl) await deleteFromStorage(db, FLEET_BUCKET, previousImageUrl);

  revalidatePath("/", "layout");
  revalidatePath("/fleet");
  revalidatePath("/admin/fleet");
}

export async function deleteVehicle(id: string) {
  await requireAdmin();
  const db = requireAdminDb();

  const { data: existing } = await db.from("fleet").select("image_url").eq("id", id).single();

  const { error } = await db.from("fleet").delete().eq("id", id);
  if (error) throw new Error(error.message);

  await deleteFromStorage(db, FLEET_BUCKET, existing?.image_url);

  revalidatePath("/", "layout");
  revalidatePath("/fleet");
  revalidatePath("/admin/fleet");
}

// ---------------------------------------------------------------------------
// Services
// ---------------------------------------------------------------------------

export async function createService(formData: FormData) {
  await requireAdmin();
  const db = requireAdminDb();

  const label = String(formData.get("label") || "").trim();
  if (!label) throw new Error("Label is required.");

  const from_location = String(formData.get("from_location") || "");
  const to_location = String(formData.get("to_location") || "");
  const description =
    String(formData.get("description") || "").trim() ||
    buildDefaultServiceDescription({ from: from_location, to: to_location });

  const { error } = await db.from("services").insert({
    slug: slugify(label) || crypto.randomUUID(),
    label,
    from_location,
    to_location,
    description,
    sort_order: Number(formData.get("sort_order") || 0),
    show_return_transfer: formData.get("show_return_transfer") === "on",
  });

  if (error) throw new Error(error.message);

  revalidatePath("/services");
  revalidatePath("/admin/services");
}

export async function updateService(id: string, formData: FormData) {
  await requireAdmin();
  const db = requireAdminDb();

  const label = String(formData.get("label") || "").trim();
  if (!label) throw new Error("Label is required.");

  const from_location = String(formData.get("from_location") || "");
  const to_location = String(formData.get("to_location") || "");
  const description =
    String(formData.get("description") || "").trim() ||
    buildDefaultServiceDescription({ from: from_location, to: to_location });

  const { error } = await db
    .from("services")
    .update({
      label,
      from_location,
      to_location,
      description,
      sort_order: Number(formData.get("sort_order") || 0),
      show_return_transfer: formData.get("show_return_transfer") === "on",
    })
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/services");
  revalidatePath("/admin/services");
}

export async function deleteService(id: string) {
  await requireAdmin();
  const db = requireAdminDb();

  // service_blocks rows cascade-delete with the service, but their storage
  // files don't — clean those up first or they're orphaned for good.
  const { data: blocks } = await db
    .from("service_blocks")
    .select("image_url")
    .eq("service_id", id)
    .eq("type", "image");

  const { error } = await db.from("services").delete().eq("id", id);
  if (error) throw new Error(error.message);

  for (const block of blocks ?? []) {
    await deleteFromStorage(db, SERVICE_IMAGE_BUCKET, block.image_url);
  }

  revalidatePath("/services");
  revalidatePath("/admin/services");
}

// ---------------------------------------------------------------------------
// Service content blocks (admin-built pricing tables / pricing images)
// ---------------------------------------------------------------------------

async function getServiceSlug(db: NonNullable<typeof supabaseAdmin>, serviceId: string) {
  const { data } = await db.from("services").select("slug").eq("id", serviceId).single();
  return data?.slug as string | undefined;
}

async function revalidateServiceBlocks(
  db: NonNullable<typeof supabaseAdmin>,
  serviceId: string
) {
  const slug = await getServiceSlug(db, serviceId);
  if (slug) revalidatePath(`/services/${slug}`);
  revalidatePath(`/admin/services/${serviceId}`);
}

async function uploadServiceImage(db: NonNullable<typeof supabaseAdmin>, file: File) {
  const extension = file.name.split(".").pop() || "jpg";
  const path = `${crypto.randomUUID()}.${extension}`;
  const { error } = await db.storage.from(SERVICE_IMAGE_BUCKET).upload(path, file, { upsert: false });
  if (error) throw new Error(`Couldn't upload image: ${error.message}`);
  const { data } = db.storage.from(SERVICE_IMAGE_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

function parseTableFields(formData: FormData) {
  let columns: string[] = [];
  let rows: string[][] = [];
  try {
    columns = JSON.parse(String(formData.get("columns") || "[]"));
    rows = JSON.parse(String(formData.get("rows") || "[]"));
  } catch {
    throw new Error("Invalid table data.");
  }
  columns = columns.map((c) => String(c || "").trim());
  rows = rows.map((row) => row.map((cell) => String(cell || "").trim()));
  if (columns.length === 0) throw new Error("Add at least one column.");
  if (rows.length === 0) throw new Error("Add at least one row.");
  return { columns, rows };
}

export async function createTableBlock(serviceId: string, formData: FormData) {
  await requireAdmin();
  const db = requireAdminDb();

  const { columns, rows } = parseTableFields(formData);

  const { error } = await db.from("service_blocks").insert({
    service_id: serviceId,
    type: "table",
    heading: String(formData.get("heading") || "").trim() || null,
    description: String(formData.get("description") || "").trim() || null,
    columns,
    rows,
    sort_order: Number(formData.get("sort_order") || 0),
    is_hourly: formData.get("is_hourly") === "on",
  });

  if (error) throw new Error(error.message);
  await revalidateServiceBlocks(db, serviceId);
}

export async function updateTableBlock(blockId: string, formData: FormData) {
  await requireAdmin();
  const db = requireAdminDb();

  const { data: existing, error: fetchError } = await db
    .from("service_blocks")
    .select("service_id")
    .eq("id", blockId)
    .single();
  if (fetchError || !existing) throw new Error("Block not found.");

  const { columns, rows } = parseTableFields(formData);

  const { error } = await db
    .from("service_blocks")
    .update({
      heading: String(formData.get("heading") || "").trim() || null,
      description: String(formData.get("description") || "").trim() || null,
      columns,
      rows,
      sort_order: Number(formData.get("sort_order") || 0),
      is_hourly: formData.get("is_hourly") === "on",
    })
    .eq("id", blockId);

  if (error) throw new Error(error.message);
  await revalidateServiceBlocks(db, existing.service_id);
}

export async function createImageBlock(serviceId: string, formData: FormData) {
  await requireAdmin();
  const db = requireAdminDb();

  const imageFile = formData.get("image");
  if (!(imageFile instanceof File) || imageFile.size === 0) {
    throw new Error("An image is required.");
  }
  const imageUrl = await uploadServiceImage(db, imageFile);

  const { error } = await db.from("service_blocks").insert({
    service_id: serviceId,
    type: "image",
    heading: String(formData.get("heading") || "").trim() || null,
    description: String(formData.get("description") || "").trim() || null,
    image_url: imageUrl,
    sort_order: Number(formData.get("sort_order") || 0),
  });

  if (error) throw new Error(error.message);
  await revalidateServiceBlocks(db, serviceId);
}

export async function updateImageBlock(blockId: string, formData: FormData) {
  await requireAdmin();
  const db = requireAdminDb();

  const { data: existing, error: fetchError } = await db
    .from("service_blocks")
    .select("service_id, image_url")
    .eq("id", blockId)
    .single();
  if (fetchError || !existing) throw new Error("Block not found.");

  const update: Record<string, unknown> = {
    heading: String(formData.get("heading") || "").trim() || null,
    description: String(formData.get("description") || "").trim() || null,
    sort_order: Number(formData.get("sort_order") || 0),
  };

  const imageFile = formData.get("image");
  const replacingImage = imageFile instanceof File && imageFile.size > 0;
  if (replacingImage) {
    update.image_url = await uploadServiceImage(db, imageFile as File);
  }

  const { error } = await db.from("service_blocks").update(update).eq("id", blockId);
  if (error) throw new Error(error.message);

  if (replacingImage) await deleteFromStorage(db, SERVICE_IMAGE_BUCKET, existing.image_url);

  await revalidateServiceBlocks(db, existing.service_id);
}

export async function deleteServiceBlock(blockId: string) {
  await requireAdmin();
  const db = requireAdminDb();

  const { data: existing } = await db
    .from("service_blocks")
    .select("service_id, image_url")
    .eq("id", blockId)
    .single();

  const { error } = await db.from("service_blocks").delete().eq("id", blockId);
  if (error) throw new Error(error.message);

  if (existing?.image_url) await deleteFromStorage(db, SERVICE_IMAGE_BUCKET, existing.image_url);
  if (existing?.service_id) await revalidateServiceBlocks(db, existing.service_id);
}

// ---------------------------------------------------------------------------
// Leads / moderation: Quotes, Contacts, Reviews
// ---------------------------------------------------------------------------

export async function deleteQuote(id: string) {
  await requireAdmin();
  const db = requireAdminDb();
  const { error } = await db.from("bookings").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/quotes");
}

export async function deleteContact(id: string) {
  await requireAdmin();
  const db = requireAdminDb();
  const { error } = await db.from("contacts").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/contacts");
}

export async function deleteReview(id: string) {
  await requireAdmin();
  const db = requireAdminDb();
  const { data: existing } = await db.from("reviews").select("avatar_url").eq("id", id).single();
  const { error } = await db.from("reviews").delete().eq("id", id);
  if (error) throw new Error(error.message);
  if (existing?.avatar_url) await deleteFromStorage(db, REVIEW_AVATAR_BUCKET, existing.avatar_url);
  revalidatePath("/");
  revalidatePath("/admin/reviews");
}

async function uploadReviewAvatar(db: NonNullable<typeof supabaseAdmin>, file: File) {
  const extension = file.name.split(".").pop() || "jpg";
  const path = `${crypto.randomUUID()}.${extension}`;
  const { error } = await db.storage.from(REVIEW_AVATAR_BUCKET).upload(path, file, { upsert: false });
  if (error) throw new Error(`Couldn't upload photo: ${error.message}`);
  const { data } = db.storage.from(REVIEW_AVATAR_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

function clampRating(raw: FormDataEntryValue | null) {
  const n = Math.round(Number(raw || 0));
  return Math.min(5, Math.max(1, n || 5));
}

/** Admin-created ("fake") review — always source: "admin", so it's editable later. */
export async function createReview(formData: FormData) {
  await requireAdmin();
  const db = requireAdminDb();

  const name = String(formData.get("name") || "").trim();
  const review = String(formData.get("review") || "").trim();
  if (!name || !review) throw new Error("Name and review text are required.");

  const avatarFile = formData.get("avatar");
  let avatarUrl: string | null = null;
  if (avatarFile instanceof File && avatarFile.size > 0) {
    avatarUrl = await uploadReviewAvatar(db, avatarFile);
  }

  const { error } = await db.from("reviews").insert({
    name,
    rating: clampRating(formData.get("rating")),
    review,
    avatar_url: avatarUrl,
    source: "admin",
  });

  if (error) throw new Error(error.message);

  revalidatePath("/");
  revalidatePath("/admin/reviews");
}

/** Only admin-sourced reviews can be edited — user-submitted ones are delete-only. */
export async function updateReview(id: string, formData: FormData) {
  await requireAdmin();
  const db = requireAdminDb();

  const { data: existing, error: fetchError } = await db
    .from("reviews")
    .select("source, avatar_url")
    .eq("id", id)
    .single();

  if (fetchError || !existing) throw new Error("Review not found.");
  if (existing.source !== "admin") {
    throw new Error("This review was submitted by a user and can't be edited.");
  }

  const name = String(formData.get("name") || "").trim();
  const review = String(formData.get("review") || "").trim();
  if (!name || !review) throw new Error("Name and review text are required.");

  const update: Record<string, unknown> = {
    name,
    rating: clampRating(formData.get("rating")),
    review,
  };

  const avatarFile = formData.get("avatar");
  const replacingAvatar = avatarFile instanceof File && avatarFile.size > 0;
  if (replacingAvatar) {
    update.avatar_url = await uploadReviewAvatar(db, avatarFile as File);
  }

  const { error } = await db.from("reviews").update(update).eq("id", id);
  if (error) throw new Error(error.message);

  if (replacingAvatar) await deleteFromStorage(db, REVIEW_AVATAR_BUCKET, existing.avatar_url);

  revalidatePath("/");
  revalidatePath("/admin/reviews");
}
