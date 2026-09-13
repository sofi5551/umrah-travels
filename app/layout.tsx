import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
import SiteChrome from "@/components/SiteChrome";
import ToastProvider from "@/components/Toast";
import { getSiteSettings } from "@/lib/siteSettings";
import { getFleet } from "@/lib/fleetData";
import { getServices } from "@/lib/servicesData";

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

export const metadata: Metadata = {
  title: "Haramain Ways | Online Umrah Taxi Service in Saudi Arabia",
  description:
    "Book a private Umrah taxi with licensed chauffeurs in Saudi Arabia. Airport transfers, intercity travel & Ziyarat services for families and pilgrims.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [settings, fleet, services] = await Promise.all([
    getSiteSettings(),
    getFleet(),
    getServices(),
  ]);

  return (
    <html lang="en" className={`${fraunces.variable} ${manrope.variable}`}>
      <body>
        <ToastProvider>
          <SiteChrome settings={settings} fleet={fleet} services={services}>
            {children}
          </SiteChrome>
        </ToastProvider>
      </body>
    </html>
  );
}
