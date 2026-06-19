import { ImageResponse } from "next/og";
import { SERVICES } from "@/lib/services";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const GRAD: Record<string, [string, string]> = {
  "Design":             ["#2563eb", "#7c3aed"],
  "Web Development":    ["#4338ca", "#6d28d9"],
  "Marketing":          ["#7c3aed", "#be185d"],
  "Photography":        ["#0e7490", "#0ea5e9"],
  "Google My Business": ["#0369a1", "#16a34a"],
};

export default function Image({ params }: { params: { slug: string } }) {
  const service = SERVICES.find((s) => s.slug === params.slug);

  if (!service) {
    return new ImageResponse(
      <div style={{ background: "#060d1f", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ color: "white", fontSize: 48 }}>Pixora</span>
      </div>,
      { ...size }
    );
  }

  const [gradStart, gradEnd] = GRAD[service.category] ?? ["#2563eb", "#7c3aed"];

  // Break name into words for big stacked display
  const words = service.name.toUpperCase().split(" ");

  return new ImageResponse(
    (
      <div style={{
        width: "100%", height: "100%",
        background: `linear-gradient(135deg, ${gradStart} 0%, ${gradEnd} 100%)`,
        display: "flex", fontFamily: "system-ui,sans-serif",
        position: "relative", overflow: "hidden",
      }}>

        {/* Decorative circles — top right */}
        <div style={{ position: "absolute", top: -80, right: -80, width: 400, height: 400, borderRadius: "50%", background: "rgba(255,255,255,0.08)" }} />
        <div style={{ position: "absolute", top: 40, right: 40, width: 260, height: 260, borderRadius: "50%", background: "rgba(255,255,255,0.06)" }} />
        <div style={{ position: "absolute", top: 130, right: 130, width: 120, height: 120, borderRadius: "50%", background: "rgba(255,255,255,0.1)" }} />

        {/* Decorative circles — bottom left */}
        <div style={{ position: "absolute", bottom: -60, left: -60, width: 300, height: 300, borderRadius: "50%", background: "rgba(0,0,0,0.15)" }} />

        {/* Dark overlay on right half for contrast */}
        <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 480, background: "rgba(0,0,0,0.22)" }} />

        {/* Pixora logo — top left */}
        <div style={{ position: "absolute", top: 44, left: 52, display: "flex", alignItems: "center", gap: 16 }}>
          <svg width="52" height="52" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" rx="9" fill="rgba(0,0,0,0.35)" />
            <path d="M8,8 L8,32 L13,32 L13,22 L26,22 L28,20 L28,10 L26,8 Z" fill="white" />
            <path d="M13,12 L24,12 L25,13 L25,19 L24,20 L13,20 Z" fill="rgba(0,0,0,0.35)" />
            <circle cx="33" cy="30" r="3.5" fill="white" />
          </svg>
          <div style={{ display: "flex", alignItems: "baseline" }}>
            <span style={{ color: "white", fontSize: 30, fontWeight: 900 }}>Pix</span>
            <span style={{ color: "rgba(255,255,255,0.65)", fontSize: 30, fontWeight: 900 }}>ora</span>
          </div>
        </div>

        {/* Main service name — large stacked text */}
        <div style={{
          position: "absolute", left: 52, bottom: 0, top: 0,
          display: "flex", flexDirection: "column", justifyContent: "center",
          paddingTop: 40,
          maxWidth: 680,
        }}>
          {/* Category badge */}
          <div style={{
            display: "flex", width: "fit-content",
            background: "rgba(255,255,255,0.2)",
            borderRadius: 999, padding: "8px 22px",
            color: "white", fontSize: 17, fontWeight: 800,
            letterSpacing: 3, textTransform: "uppercase",
            marginBottom: 28,
          }}>
            {service.category}
          </div>

          {/* Service name — big stacked */}
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {words.map((word, i) => (
              <span key={i} style={{
                color: "white",
                fontSize: words.length <= 2 ? 110 : words.length === 3 ? 84 : 68,
                fontWeight: 900,
                lineHeight: 0.95,
                letterSpacing: -2,
                textShadow: "0 4px 24px rgba(0,0,0,0.25)",
              }}>
                {word}
              </span>
            ))}
          </div>

          {/* Price */}
          <div style={{
            marginTop: 32,
            color: "rgba(255,255,255,0.9)",
            fontSize: 28, fontWeight: 700,
          }}>
            Starting at {service.priceLabel}
          </div>
        </div>

        {/* Right side — includes list */}
        <div style={{
          position: "absolute", right: 52, top: 0, bottom: 0,
          width: 380,
          display: "flex", flexDirection: "column", justifyContent: "center",
          gap: 16,
        }}>
          <span style={{ color: "rgba(255,255,255,0.55)", fontSize: 14, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", marginBottom: 4 }}>
            What&apos;s included
          </span>
          {service.details.slice(0, 4).map((d, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{
                width: 26, height: 26, borderRadius: "50%",
                background: "rgba(255,255,255,0.25)",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                <span style={{ color: "white", fontSize: 14 }}>✓</span>
              </div>
              <span style={{ color: "rgba(255,255,255,0.9)", fontSize: 20, fontWeight: 600 }}>{d}</span>
            </div>
          ))}

          {/* Order CTA */}
          <div style={{
            marginTop: 20,
            background: "rgba(255,255,255,0.2)",
            border: "2px solid rgba(255,255,255,0.35)",
            borderRadius: 14, padding: "14px 32px",
            color: "white", fontSize: 20, fontWeight: 800,
            display: "flex", width: "fit-content",
          }}>
            Order Now →
          </div>
        </div>

        {/* Bottom URL */}
        <div style={{
          position: "absolute", bottom: 32, left: 52,
          color: "rgba(255,255,255,0.4)", fontSize: 16, fontWeight: 600, letterSpacing: 1,
        }}>
          pixorau.vercel.app
        </div>
      </div>
    ),
    { ...size }
  );
}
