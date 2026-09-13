"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";
import WhatsAppFab from "./WhatsAppFab";
import GlobalLoaderProvider from "./GlobalLoader";
import type { SiteSettings } from "@/lib/siteSettings";
import type { Vehicle, ServicePage } from "@/lib/data";

/**
 * The public marketing site's chrome (Header, Footer, WhatsApp FAB, loading
 * splash) — skipped entirely on /admin/* routes, which have their own
 * sidebar shell (app/admin/(protected)/layout.tsx) and shouldn't show the
 * public nav or splash screen.
 */
export default function SiteChrome({
  settings,
  fleet,
  services,
  children,
}: {
  settings: SiteSettings;
  fleet: Vehicle[];
  services: ServicePage[];
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <GlobalLoaderProvider>
      <Header settings={settings} fleet={fleet} services={services} />
      <main id="main">{children}</main>
      <Footer settings={settings} services={services} />
      <WhatsAppFab settings={settings} />
    </GlobalLoaderProvider>
  );
}
