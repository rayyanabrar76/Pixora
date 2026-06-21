import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { CartProvider } from "@/context/CartContext";
import SiteChrome from "@/components/SiteChrome";
import TopProgress from "@/components/TopProgress";
import { Comfortaa } from "next/font/google";

const comfortaa = Comfortaa({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-brand",
  display: "swap",
});

export const metadata: Metadata = {
  icons: { icon: "/logo_transparent.ico" },
  title: "FAHADAMINAENTERPRISES - Digital Services",
  description: "Professional digital services for growing businesses — web development, logo design, SEO, social media & more. Based in Pakistan.",
  metadataBase: new URL("https://fahadaminaenterprises.com"),
  openGraph: {
    title: "Fahadamina Enterprises - Digital Services",
    description: "Professional digital services for growing businesses — web development, logo design, SEO, social media & more.",
    url: "https://fahadaminaenterprises.com",
    siteName: "Fahadamina Enterprises",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fahadamina Enterprises - Digital Services",
    description: "Professional digital services for growing businesses — web development, logo design, SEO, social media & more.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en" className={comfortaa.variable}>
        <body className="min-h-screen flex flex-col">
          <CartProvider>
            <TopProgress />
            <SiteChrome>{children}</SiteChrome>
          </CartProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
