import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Pixora - Digital Services";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div style={{
        background: "linear-gradient(135deg,#060d1f 0%,#0d1a3a 50%,#080f22 100%)",
        width: "100%", height: "100%",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        fontFamily: "system-ui,sans-serif",
        position: "relative",
      }}>
        {/* Glow orbs */}
        <div style={{ position: "absolute", top: -80, left: "20%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle,rgba(37,99,235,0.25),transparent)", filter: "blur(60px)" }} />
        <div style={{ position: "absolute", bottom: -80, right: "15%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle,rgba(124,58,237,0.2),transparent)", filter: "blur(60px)" }} />

        {/* Logo row */}
        <div style={{ display: "flex", alignItems: "center", gap: 28, marginBottom: 32 }}>
          {/* Real P mark logo */}
          <svg width="96" height="96" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" rx="9" fill="#0f172a" />
            <path d="M8,8 L8,32 L13,32 L13,22 L26,22 L28,20 L28,10 L26,8 Z" fill="white" />
            <path d="M13,12 L24,12 L25,13 L25,19 L24,20 L13,20 Z" fill="#0f172a" />
            <circle cx="33" cy="30" r="3.5" fill="#3b82f6" />
          </svg>
          <span style={{ fontSize: 84, fontWeight: 900, letterSpacing: -3, color: "white" }}>
            Pix<span style={{ color: "#60a5fa" }}>ora</span>
          </span>
        </div>

        {/* Tagline */}
        <p style={{ color: "rgba(148,163,184,0.85)", fontSize: 30, textAlign: "center", margin: "0 120px 40px", lineHeight: 1.5 }}>
          Professional Digital Services for Growing Businesses
        </p>

        {/* Service pills */}
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center", maxWidth: 900 }}>
          {["Web Development", "Logo Design", "SEO", "Social Media", "Google Ads"].map((s) => (
            <div key={s} style={{ background: "rgba(37,99,235,0.18)", border: "1px solid rgba(37,99,235,0.4)", borderRadius: 999, padding: "10px 24px", color: "#93c5fd", fontSize: 20, fontWeight: 700 }}>
              {s}
            </div>
          ))}
        </div>

        {/* Bottom URL */}
        <p style={{ position: "absolute", bottom: 36, color: "rgba(100,116,139,0.6)", fontSize: 18, fontWeight: 600, letterSpacing: 1 }}>
          pixorau.vercel.app
        </p>
      </div>
    ),
    { ...size }
  );
}
