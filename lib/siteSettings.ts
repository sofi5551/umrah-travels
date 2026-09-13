import { isSupabaseConfigured, supabase } from "./supabase";
import { site as fallbackSite } from "./data";

export type SocialLink = { url: string; enabled: boolean };

export type SiteSettings = {
  phone: string;
  whatsappNumber: string;
  email: string;
  address: string;
  /** Admin-controlled: shows the address anywhere on the site. Off by default. */
  addressEnabled: boolean;
  social: {
    facebook: SocialLink;
    instagram: SocialLink;
    youtube: SocialLink;
    pinterest: SocialLink;
    tiktok: SocialLink;
    linkedin: SocialLink;
    playstore: SocialLink;
  };
};

// Only used when Supabase isn't configured at all (degraded mode) — in that
// case every hardcoded link shows, matching the site's original pre-admin
// behavior. This is distinct from the DB default (new rows start disabled,
// per the admin's explicit choice), which only applies once Supabase is live.
function toLink(url?: string): SocialLink {
  return { url: url || "", enabled: Boolean(url) };
}

const fallback: SiteSettings = {
  phone: fallbackSite.phone,
  whatsappNumber: fallbackSite.whatsappNumber,
  email: fallbackSite.email,
  address: fallbackSite.address,
  addressEnabled: false,
  social: {
    facebook: toLink(fallbackSite.social.facebook),
    instagram: toLink(fallbackSite.social.instagram),
    youtube: toLink(fallbackSite.social.youtube),
    pinterest: toLink(fallbackSite.social.pinterest),
    tiktok: toLink(fallbackSite.social.tiktok),
    linkedin: toLink(fallbackSite.social.linkedin),
    playstore: toLink(fallbackSite.social.playstore),
  },
};

/**
 * Public (anon-key) fetch of the site's editable contact details + social
 * links. Falls back to the hardcoded defaults in lib/data.ts if Supabase
 * isn't configured, the table doesn't exist yet, or the fetch fails — the
 * site should never break because the admin panel's setup step hasn't run.
 */
export async function getSiteSettings(): Promise<SiteSettings> {
  if (!isSupabaseConfigured || !supabase) return fallback;

  const { data, error } = await supabase
    .from("site_settings")
    .select(
      "phone, whatsapp_number, email, address, address_enabled, social_facebook, social_facebook_enabled, social_instagram, social_instagram_enabled, social_youtube, social_youtube_enabled, social_pinterest, social_pinterest_enabled, social_tiktok, social_tiktok_enabled, social_linkedin, social_linkedin_enabled, social_playstore, social_playstore_enabled"
    )
    .eq("id", 1)
    .single();

  if (error || !data) return fallback;

  return {
    phone: data.phone,
    whatsappNumber: data.whatsapp_number,
    email: data.email,
    address: data.address,
    addressEnabled: Boolean(data.address_enabled),
    social: {
      facebook: { url: data.social_facebook || "", enabled: Boolean(data.social_facebook_enabled) },
      instagram: {
        url: data.social_instagram || "",
        enabled: Boolean(data.social_instagram_enabled),
      },
      youtube: { url: data.social_youtube || "", enabled: Boolean(data.social_youtube_enabled) },
      pinterest: {
        url: data.social_pinterest || "",
        enabled: Boolean(data.social_pinterest_enabled),
      },
      tiktok: { url: data.social_tiktok || "", enabled: Boolean(data.social_tiktok_enabled) },
      linkedin: { url: data.social_linkedin || "", enabled: Boolean(data.social_linkedin_enabled) },
      playstore: {
        url: data.social_playstore || "",
        enabled: Boolean(data.social_playstore_enabled),
      },
    },
  };
}
