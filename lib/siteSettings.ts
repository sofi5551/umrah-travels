import { cache } from "react";
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
  /** Background video for the homepage hero section. Defaults to the bundled /video1.mp4. */
  heroVideoUrl: string;
  /** Admin-controlled: shows the homepage promo-video carousel. On by default. */
  promoVideosEnabled: boolean;
  /** Site logo shown in the header. Defaults to the bundled /logo.png. */
  logoUrl: string;
  /** Browser-tab favicon. Defaults to the bundled /fav.png. */
  faviconUrl: string;
  /** Admin-controlled: shows the "Ziyarat" dropdown in the header. Off by default. */
  ziyaratEnabled: boolean;
  /** Background images, each defaulting to the bundled static file. */
  homepageQuoteBgUrl: string;
  homepageWhyChooseBgUrl: string;
  aboutHeroBgUrl: string;
  aboutMissionImageUrl: string;
  contactHeroBgUrl: string;
  fleetHeroBgUrl: string;
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
  heroVideoUrl: "/video1.mp4",
  promoVideosEnabled: true,
  logoUrl: "/logo.png",
  faviconUrl: "/fav.png",
  ziyaratEnabled: false,
  homepageQuoteBgUrl: "/images/safa-marwa.jpg",
  homepageWhyChooseBgUrl: "/images/masjid-nabawi.jpg",
  aboutHeroBgUrl: "/images/about-us.jpg",
  aboutMissionImageUrl: "/images/our-mission.jpg",
  contactHeroBgUrl: "/images/contact-page.jpg",
  fleetHeroBgUrl: "/images/our-fleet-background.jpg",
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
export const getSiteSettings = cache(async function getSiteSettings(): Promise<SiteSettings> {
  if (!isSupabaseConfigured || !supabase) return fallback;

  const { data, error } = await supabase
    .from("site_settings")
    .select(
      "phone, whatsapp_number, email, address, address_enabled, hero_video_url, promo_videos_enabled, logo_url, favicon_url, ziyarat_enabled, homepage_quote_bg_url, homepage_why_choose_bg_url, about_hero_bg_url, about_mission_image_url, contact_hero_bg_url, fleet_hero_bg_url, social_facebook, social_facebook_enabled, social_instagram, social_instagram_enabled, social_youtube, social_youtube_enabled, social_pinterest, social_pinterest_enabled, social_tiktok, social_tiktok_enabled, social_linkedin, social_linkedin_enabled, social_playstore, social_playstore_enabled"
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
    heroVideoUrl: data.hero_video_url || "/video1.mp4",
    promoVideosEnabled: data.promo_videos_enabled ?? true,
    logoUrl: data.logo_url || "/logo.png",
    faviconUrl: data.favicon_url || "/fav.png",
    ziyaratEnabled: Boolean(data.ziyarat_enabled),
    homepageQuoteBgUrl: data.homepage_quote_bg_url || "/images/safa-marwa.jpg",
    homepageWhyChooseBgUrl: data.homepage_why_choose_bg_url || "/images/masjid-nabawi.jpg",
    aboutHeroBgUrl: data.about_hero_bg_url || "/images/about-us.jpg",
    aboutMissionImageUrl: data.about_mission_image_url || "/images/our-mission.jpg",
    contactHeroBgUrl: data.contact_hero_bg_url || "/images/contact-page.jpg",
    fleetHeroBgUrl: data.fleet_hero_bg_url || "/images/our-fleet-background.jpg",
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
});
