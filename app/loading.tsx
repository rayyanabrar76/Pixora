export default function Loading() {
  return (
    <div style={{ background: "linear-gradient(180deg,#060d1f 0%,#080f22 100%)", minHeight: "100vh" }}>
      <style>{`
        @keyframes sk-shimmer {
          0%   { background-position: -800px 0 }
          100% { background-position:  800px 0 }
        }
        .sk {
          background: linear-gradient(
            90deg,
            rgba(255,255,255,0.04) 25%,
            rgba(255,255,255,0.09) 50%,
            rgba(255,255,255,0.04) 75%
          );
          background-size: 800px 100%;
          animation: sk-shimmer 1.6s infinite linear;
          border-radius: 8px;
        }
      `}</style>

      {/* ── Announcement bar ── */}
      <div style={{ height: 36, background: "rgba(0,0,0,0.3)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        className="sk" />

      {/* ── Navbar ── */}
      <div style={{ height: 60, borderBottom: "1px solid rgba(255,255,255,0.07)" }}
        className="flex items-center justify-between px-6">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="sk rounded-xl" style={{ width: 40, height: 40 }} />
          <div className="sk rounded-lg" style={{ width: 72, height: 22 }} />
        </div>
        {/* Desktop nav links */}
        <div className="hidden lg:flex items-center gap-7">
          {[48, 40, 52, 60].map((w, i) => (
            <div key={i} className="sk rounded-md" style={{ width: w, height: 14 }} />
          ))}
        </div>
        {/* Action icons */}
        <div className="flex items-center gap-3">
          <div className="sk rounded-full" style={{ width: 32, height: 32 }} />
          <div className="sk rounded-full" style={{ width: 32, height: 32 }} />
          <div className="sk rounded-full" style={{ width: 32, height: 32 }} />
          {/* Mobile hamburger */}
          <div className="sk rounded-md lg:hidden" style={{ width: 32, height: 32 }} />
        </div>
      </div>

      {/* ── Hero ── */}
      <div
        className="relative overflow-hidden"
        style={{ height: "700px" }}
      >
        {/* Desktop: 2 columns | Mobile: single column */}
        <div className="h-full max-w-6xl mx-auto px-6 flex items-start pt-10 lg:items-center lg:pt-0 gap-8">

          {/* Left — text content */}
          <div className="flex-1 flex flex-col">
            {/* Tag badge */}
            <div className="sk rounded-full mb-5" style={{ width: 180, height: 28 }} />
            {/* H1 lines */}
            <div className="sk rounded-xl mb-3" style={{ height: 44, width: "90%" }} />
            <div className="sk rounded-xl mb-3" style={{ height: 44, width: "75%" }} />
            <div className="sk rounded-xl mb-6" style={{ height: 44, width: "60%" }} />
            {/* Subtitle */}
            <div className="sk rounded-md mb-2" style={{ height: 14, width: "100%" }} />
            <div className="sk rounded-md mb-2" style={{ height: 14, width: "88%" }} />
            <div className="sk rounded-md mb-7" style={{ height: 14, width: "70%" }} />
            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="sk rounded-lg" style={{ width: 160, height: 46 }} />
              <div className="sk rounded-lg" style={{ width: 140, height: 46 }} />
            </div>
            {/* Stats — 4 column grid */}
            <div className="grid grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i}>
                  <div className="sk rounded-md mb-1.5" style={{ height: 22, width: 48 }} />
                  <div className="sk rounded-md" style={{ height: 11, width: 56 }} />
                </div>
              ))}
            </div>
          </div>

          {/* Right — mockup, desktop only */}
          <div className="hidden lg:block shrink-0 sk rounded-2xl" style={{ width: 380, height: 300, marginTop: 32 }} />
        </div>

        {/* Dots */}
        <div className="absolute flex gap-2 items-center" style={{ bottom: 56, left: "50%", transform: "translateX(-50%)" }}>
          {[...Array(4)].map((_, i) => (
            <div key={i} className="sk rounded-full" style={{ width: i === 0 ? 28 : 10, height: 10 }} />
          ))}
        </div>

        {/* Marquee strip */}
        <div className="absolute bottom-0 left-0 right-0 sk" style={{ height: 40, borderRadius: 0 }} />
      </div>

      {/* ── Featured Services section ── */}
      <div style={{ background: "linear-gradient(180deg,#060d1f 0%,#080f22 100%)", paddingTop: 64, paddingBottom: 64 }}>
        <div className="max-w-6xl mx-auto px-4">

          {/* Section heading */}
          <div className="flex flex-col items-center gap-3 mb-14">
            <div className="sk rounded-full" style={{ width: 120, height: 26 }} />
            <div className="sk rounded-xl" style={{ width: 220, height: 38 }} />
            <div className="sk rounded-md" style={{ width: 280, height: 14 }} />
          </div>

          {/* Cards grid — 1 col mobile / 2 col sm / 3 col lg */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="rounded-2xl overflow-hidden"
                style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
                {/* Banner */}
                <div className="sk" style={{ height: 208, borderRadius: 0 }} />
                {/* Card body */}
                <div style={{ background: "#0b1120", padding: "16px 20px 20px" }}>
                  <div className="sk rounded-md mb-2" style={{ height: 10, width: 64 }} />
                  <div className="sk rounded-md mb-2" style={{ height: 18, width: "80%" }} />
                  <div className="sk rounded-md mb-1" style={{ height: 12, width: "100%" }} />
                  <div className="sk rounded-md mb-5" style={{ height: 12, width: "70%" }} />
                  <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div className="sk rounded-md mb-1" style={{ height: 10, width: 56 }} />
                      <div className="sk rounded-md" style={{ height: 20, width: 80 }} />
                    </div>
                    <div className="sk rounded-xl" style={{ height: 36, width: 112 }} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="flex justify-center mt-14">
            <div className="sk rounded-xl" style={{ width: 180, height: 46 }} />
          </div>
        </div>
      </div>
    </div>
  );
}
