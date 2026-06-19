import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Pixora - Digital Services";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg,#060d1f 0%,#0d1a3a 50%,#080f22 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui,sans-serif",
          position: "relative",
        }}
      >
        {/* Glow orbs */}
        <div style={{
          position: "absolute", top: -80, left: "20%",
          width: 500, height: 500, borderRadius: "50%",
          background: "radial-gradient(circle,rgba(37,99,235,0.25),transparent)",
          filter: "blur(60px)",
        }} />
        <div style={{
          position: "absolute", bottom: -80, right: "15%",
          width: 400, height: 400, borderRadius: "50%",
          background: "radial-gradient(circle,rgba(124,58,237,0.2),transparent)",
          filter: "blur(60px)",
        }} />

        {/* Logo row */}
        <div style={{ display: "flex", alignItems: "center", gap: 24, marginBottom: 28 }}>
          <div style={{
            width: 88, height: 88,
            background: "linear-gradient(135deg,#2563eb,#4f46e5)",
            borderRadius: 20,
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 8px 32px rgba(37,99,235,0.5)",
          }}>
            <span style={{ color: "white", fontSize: 56, fontWeight: 900, lineHeight: 1 }}>P</span>
          </div>
          <span style={{ fontSize: 80, fontWeight: 900, letterSpacing: -3, color: "white" }}>
            Pix<span style={{ color: "#60a5fa" }}>ora</span>
          </span>
        </div>

        {/* Tagline */}
        <p style={{
          color: "rgba(148,163,184,0.85)",
          fontSize: 30, textAlign: "center",
          margin: "0 120px 40px",
          lineHeight: 1.5,
        }}>
          Professional Digital Services for Growing Businesses
        </p>

        {/* Service pills */}
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center", maxWidth: 900 }}>
          {["Web Development", "Logo Design", "SEO", "Social Media", "Google Ads"].map((s) => (
            <div key={s} style={{
              background: "rgba(37,99,235,0.18)",
              border: "1px solid rgba(37,99,235,0.4)",
              borderRadius: 999,
              padding: "10px 24px",
              color: "#93c5fd",
              fontSize: 20,
              fontWeight: 700,
            }}>
              {s}
            </div>
          ))}
        </div>

        {/* Bottom URL */}
        <p style={{
          position: "absolute", bottom: 36,
          color: "rgba(100,116,139,0.6)",
          fontSize: 18, fontWeight: 600, letterSpacing: 1,
        }}>
          pixorau.vercel.app
        </p>
      </div>
    ),
    { ...size }
  );
}
