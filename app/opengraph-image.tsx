import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Fahadamina Enterprises - Digital Services";
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
          {/* F mark logo */}
          <svg width="96" height="106" viewBox="0 0 200 220" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="12" y="12" width="36" height="196" rx="6" fill="#0097B2" />
            <rect x="12" y="12" width="168" height="46" rx="6" fill="#0097B2" />
            <rect x="12" y="94" width="116" height="38" rx="6" fill="#0097B2" />
            <circle cx="182" cy="68" r="14" fill="#0097B2" />
            <circle cx="154" cy="128" r="21" fill="#0097B2" />
            <circle cx="108" cy="188" r="30" fill="#0097B2" />
          </svg>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 72, fontWeight: 900, letterSpacing: -2, color: "white", lineHeight: 1 }}>Fahadamina</span>
            <span style={{ fontSize: 32, fontWeight: 800, letterSpacing: 4, color: "#0097B2" }}>ENTERPRISES</span>
          </div>
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
          fahadaminaenterprises.com
        </p>
      </div>
    ),
    { ...size }
  );
}
