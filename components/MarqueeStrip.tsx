"use client";

const KEYWORDS = [
  "Logo Design", "Landing Page", "SEO Optimization", "Social Media Management",
  "Mobile App UI", "E-Commerce Store", "Email Marketing", "Google My Business",
  "Photography", "Brochure Design", "WhatsApp Business", "Google Ads",
  "Corporate Website", "Pitch Deck", "Website Maintenance", "Social Media Setup",
];

export default function MarqueeStrip() {
  const doubled = [...KEYWORDS, ...KEYWORDS];
  return (
    <div className="relative overflow-hidden py-3.5 border-y border-white/5"
      style={{ background: "#03060e" }}>
      {/* Edge fade */}
      <div className="absolute inset-y-0 left-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right,#03060e,transparent)" }} />
      <div className="absolute inset-y-0 right-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left,#03060e,transparent)" }} />

      <div className="flex whitespace-nowrap select-none"
        style={{ animation: "marquee 32s linear infinite" }}>
        {doubled.map((kw, i) => (
          <span key={i} className="inline-flex items-center gap-4 px-5 text-sm font-semibold"
            style={{ color: "rgba(148,163,184,0.7)" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500/60 shrink-0" />
            {kw}
          </span>
        ))}
      </div>
    </div>
  );
}
