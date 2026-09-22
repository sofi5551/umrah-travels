import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
import SiteChrome from "@/components/SiteChrome";
import ToastProvider from "@/components/Toast";
import { getSiteSettings } from "@/lib/siteSettings";
import { getFleet } from "@/lib/fleetData";
import { getServices } from "@/lib/servicesData";
import { getZiyaratPages } from "@/lib/ziyaratData";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700"],
});

const SITE_URL = "https://haramainways.com";
const SITE_TITLE = "Haramain Ways | Online Umrah Taxi Service in Saudi Arabia";
const SITE_DESCRIPTION =
  "Book a private Umrah taxi with licensed chauffeurs in Saudi Arabia. Airport transfers, intercity travel & Ziyarat services for families and pilgrims.";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return {
    metadataBase: new URL(SITE_URL),
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    icons: { icon: settings.faviconUrl },
    openGraph: {
      title: SITE_TITLE,
      description: SITE_DESCRIPTION,
      url: SITE_URL,
      siteName: "Haramain Ways",
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: SITE_TITLE,
      description: SITE_DESCRIPTION,
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [settings, fleet, services, ziyarat] = await Promise.all([
    getSiteSettings(),
    getFleet(),
    getServices(),
    getZiyaratPages(),
  ]);

  return (
    <html lang="en" className={`${fraunces.variable} ${manrope.variable}`}>
      <body>
        <ToastProvider>
          <SiteChrome settings={settings} fleet={fleet} services={services} ziyarat={ziyarat}>
            {children}
          </SiteChrome>
        </ToastProvider>
      </body>
    </html>
  );
}
