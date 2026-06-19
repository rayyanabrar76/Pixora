import { SERVICES } from "@/lib/services";
import { Metadata } from "next";

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: `${service.name} — Pixora`,
    description: service.description,
    openGraph: {
      title: `${service.name} — Pixora`,
      description: service.description,
      url: `https://pixorau.vercel.app/shop/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.name} — Pixora`,
      description: service.description,
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
