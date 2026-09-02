import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFab from "@/components/WhatsAppFab";
import GlobalLoaderProvider from "@/components/GlobalLoader";
import ToastProvider from "@/components/Toast";

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
  title: "VIP Umrah Taxi | Online Umrah Taxi Service in Saudi Arabia",
  description:
    "Book a private Umrah taxi with licensed chauffeurs in Saudi Arabia. Airport transfers, intercity travel & Ziyarat services for families and pilgrims.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${manrope.variable}`}>
      <body>
        <GlobalLoaderProvider>
          <ToastProvider>
            <Header />
            <main id="main">{children}</main>
            <Footer />
            <WhatsAppFab />
          </ToastProvider>
        </GlobalLoaderProvider>
      </body>
    </html>
  );
}
