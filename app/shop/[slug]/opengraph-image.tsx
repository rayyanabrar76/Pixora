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

        {/* Pixora mark top-left */}
        <div style={{
          position: "absolute", top: 40, left: 40,
          display: "flex", alignItems: "center", gap: 14,
        }}>
          <div style={{
            width: 52, height: 52,
            background: "rgba(255,255,255,0.2)",
            borderRadius: 12,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ color: "white", fontSize: 32, fontWeight: 900, lineHeight: 1 }}>P</span>
          </div>
          <span style={{ color: "white", fontSize: 32, fontWeight: 900, opacity: 0.9 }}>
            Pix<span style={{ color: "#93c5fd" }}>ora</span>
          </span>
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
