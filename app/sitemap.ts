import type { MetadataRoute } from "next";
import { getFleet } from "@/lib/fleetData";
import { getServices } from "@/lib/servicesData";
import { getZiyaratPages } from "@/lib/ziyaratData";

const SITE_URL = "https://haramainways.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [fleet, services, ziyarat] = await Promise.all([
    getFleet(),
    getServices(),
    getZiyaratPages(),
  ]);

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/services`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/fleet`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/ziyarat`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/about`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/contact`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/umrah-insights`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/privacy-policy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/terms-and-conditions`, changeFrequency: "yearly", priority: 0.2 },
  ];

  const servicePages: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${SITE_URL}/services/${s.slug}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const fleetPages: MetadataRoute.Sitemap = fleet
    .filter((v) => v.hasDetailPage)
    .map((v) => ({
      url: `${SITE_URL}/fleet/${v.slug}`,
      changeFrequency: "weekly",
      priority: 0.7,
    }));

  const ziyaratPages: MetadataRoute.Sitemap = ziyarat.map((p) => ({
    url: `${SITE_URL}/ziyarat/${p.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticPages, ...servicePages, ...fleetPages, ...ziyaratPages];
}
