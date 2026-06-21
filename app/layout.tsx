import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { CartProvider } from "@/context/CartContext";
import SiteChrome from "@/components/SiteChrome";
import TopProgress from "@/components/TopProgress";

export const metadata: Metadata = {
  title: "Pixora - Digital Services",
  description: "Professional digital services for growing businesses — web development, logo design, SEO, social media & more. Based in Pakistan.",
  metadataBase: new URL("https://pixorau.vercel.app"),
  openGraph: {
    title: "Pixora - Digital Services",
    description: "Professional digital services for growing businesses — web development, logo design, SEO, social media & more.",
    url: "https://pixorau.vercel.app",
    siteName: "Pixora",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pixora - Digital Services",
    description: "Professional digital services for growing businesses — web development, logo design, SEO, social media & more.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
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
