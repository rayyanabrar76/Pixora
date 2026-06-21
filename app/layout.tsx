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
    title: "FAHADAMINAENTERPRISES - Digital Services",
    description: "Professional digital services for growing businesses — web development, logo design, SEO, social media & more.",
    url: "https://fahadaminaenterprises.com",
    siteName: "FAHADAMINAENTERPRISES",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "FAHADAMINAENTERPRISES - Digital Services",
    description: "Professional digital services for growing businesses — web development, logo design, SEO, social media & more.",
  },
};

const clerkAppearance = {
  layout: {
    logoImageUrl: "/logo_transparent.png",
    logoLinkUrl: "/",
    showOptionalFields: true,
  },
  variables: {
    colorPrimary: "#0097B2",
    colorBackground: "#0b1120",
    colorInputBackground: "#0d1830",
    colorInputText: "#e2e8f0",
    colorText: "#e2e8f0",
    colorTextSecondary: "rgba(148,163,184,0.7)",
    colorDanger: "#f87171",
    borderRadius: "12px",
    fontFamily: "inherit",
  },
  elements: {
    card: { boxShadow: "0 24px 80px rgba(0,0,0,0.6)", border: "1px solid rgba(255,255,255,0.08)" },
    headerTitle: { display: "none" },
    headerSubtitle: { display: "none" },
    logoBox: { display: "none" },
    socialButtonsBlockButton: { border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)" },
    formFieldInput: { border: "1px solid rgba(255,255,255,0.1)" },
    footerActionLink: { color: "#0097B2" },
    identityPreviewText: { color: "#e2e8f0" },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider appearance={clerkAppearance}>
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
