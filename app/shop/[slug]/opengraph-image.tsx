import { ImageResponse } from "next/og";
import { SERVICES } from "@/lib/services";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const GRAD: Record<string, [string, string]> = {
  "Design":             ["#1d4ed8", "#7c3aed"],
  "Web Development":    ["#1e3a8a", "#4f46e5"],
  "Marketing":          ["#5b21b6", "#be185d"],
  "Photography":        ["#0f766e", "#0ea5e9"],
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

  const [gradStart, gradEnd] = GRAD[service.category] ?? ["#1d4ed8", "#7c3aed"];

  return new ImageResponse(
    (
      <div style={{
        background: "#060d1f",
        width: "100%", height: "100%",
        display: "flex", fontFamily: "system-ui,sans-serif",
        position: "relative", overflow: "hidden",
      }}>
        {/* Left colored band */}
        <div style={{
          position: "absolute", left: 0, top: 0, bottom: 0, width: 520,
          background: `linear-gradient(160deg,${gradStart},${gradEnd})`,
          display: "flex",
        }} />

        {/* Glow overlay on left band */}
        <div style={{
          position: "absolute", left: -60, top: -100,
          width: 500, height: 500, borderRadius: "50%",
          background: "radial-gradient(circle,rgba(255,255,255,0.12),transparent)",
        }} />

        {/* Pixora mark top-left — real logo SVG */}
        <div style={{
          position: "absolute", top: 40, left: 40,
          display: "flex", alignItems: "center", gap: 14,
        }}>
          <svg width="56" height="56" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" rx="9" fill="#0f172a" />
            <path d="M8,8 L8,32 L13,32 L13,22 L26,22 L28,20 L28,10 L26,8 Z" fill="white" />
            <path d="M13,12 L24,12 L25,13 L25,19 L24,20 L13,20 Z" fill="#0f172a" />
            <circle cx="33" cy="30" r="3.5" fill="#3b82f6" />
          </svg>
          <div style={{ display: "flex", alignItems: "baseline" }}>
            <span style={{ color: "white", fontSize: 32, fontWeight: 900 }}>Pix</span>
            <span style={{ color: "#93c5fd", fontSize: 32, fontWeight: 900 }}>ora</span>
          </div>
        </div>

        {/* Left: service name */}
        <div style={{
          position: "absolute", left: 0, top: 0, bottom: 0, width: 520,
          display: "flex", flexDirection: "column", justifyContent: "center",
          padding: "0 48px",
        }}>
          {/* Category badge */}
          <div style={{
            display: "flex", alignItems: "center",
            background: "rgba(255,255,255,0.18)",
            borderRadius: 999, padding: "8px 20px",
            color: "white", fontSize: 18, fontWeight: 700,
            letterSpacing: 2, textTransform: "uppercase",
            marginBottom: 24, width: "fit-content",
          }}>
            {service.category}
          </div>

          {/* Service name */}
          <div style={{
            color: "white", fontSize: 56, fontWeight: 900,
            lineHeight: 1.1, marginBottom: 24,
          }}>
            {service.name}
          </div>

          {/* Price */}
          <div style={{
            color: "rgba(255,255,255,0.85)", fontSize: 32, fontWeight: 800,
          }}>
            Starting at {service.priceLabel}
          </div>
        </div>

        {/* Right: dark panel with details */}
        <div style={{
          position: "absolute", right: 0, top: 0, bottom: 0, width: 680,
          background: "linear-gradient(160deg,#0d1525,#0a1020)",
          display: "flex", flexDirection: "column", justifyContent: "center",
          padding: "60px 56px",
        }}>
          <div style={{ color: "rgba(148,163,184,0.6)", fontSize: 18, fontWeight: 600, marginBottom: 20, letterSpacing: 1, textTransform: "uppercase" }}>
            What&apos;s included
          </div>

          {service.details.slice(0, 4).map((d, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 16,
              marginBottom: 18,
            }}>
              <div style={{
                width: 28, height: 28, borderRadius: "50%",
                background: `linear-gradient(135deg,${gradStart},${gradEnd})`,
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                <span style={{ color: "white", fontSize: 16, lineHeight: 1 }}>✓</span>
              </div>
              <span style={{ color: "rgba(203,213,225,0.85)", fontSize: 22 }}>{d}</span>
            </div>
          ))}

          {/* CTA */}
          <div style={{
            marginTop: 32,
            display: "flex", alignItems: "center", gap: 16,
          }}>
            <div style={{
              background: `linear-gradient(135deg,${gradStart},${gradEnd})`,
              borderRadius: 14, padding: "14px 36px",
              color: "white", fontSize: 22, fontWeight: 800,
            }}>
              Order Now
            </div>
            <span style={{ color: "rgba(100,116,139,0.6)", fontSize: 18 }}>
              pixorau.vercel.app
            </span>
          </div>
        </div>

        {/* Vertical divider glow */}
        <div style={{
          position: "absolute", left: 520, top: 0, bottom: 0, width: 2,
          background: `linear-gradient(to bottom,transparent,${gradEnd},transparent)`,
          opacity: 0.5,
        }} />
      </div>
    ),
    { ...size }
  );
}
