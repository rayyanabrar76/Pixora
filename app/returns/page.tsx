import Link from "next/link";
import { PackageX, RefreshCw, CheckCircle2, ArrowRight } from "lucide-react";

const ALTERNATIVES = [
  {
    Icon: RefreshCw,
    title: "Unlimited Revisions",
    desc: "Every order includes unlimited revision rounds within the original scope. We keep refining the work until you are fully satisfied — no extra charge.",
  },
  {
    Icon: CheckCircle2,
    title: "Satisfaction Guarantee",
    desc: "If after multiple revision rounds you are still not happy with the quality, we will review your case and work towards a fair resolution, including a potential refund.",
  },
];

export default function ReturnsPage() {
  return (
    <div style={{ background: "linear-gradient(180deg,#060d1f 0%,#080f22 100%)", minHeight: "100vh" }}>

      {/* Ambient glows */}
      <div className="fixed top-0 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-[0.06] pointer-events-none"
        style={{ background: "radial-gradient(circle,#2563eb,transparent)" }} />
      <div className="fixed top-0 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-[0.06] pointer-events-none"
        style={{ background: "radial-gradient(circle,#7c3aed,transparent)" }} />

      {/* Hero */}
      <section className="relative overflow-hidden pt-24 pb-16 px-4">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-px"
          style={{ background: "linear-gradient(to right,transparent,rgba(37,99,235,0.4),transparent)" }} />
        <div className="max-w-3xl mx-auto text-center relative">
          <span className="inline-flex items-center gap-2 text-[11px] font-bold px-3.5 py-1.5 rounded-full uppercase tracking-widest mb-5"
            style={{ background: "rgba(37,99,235,0.12)", border: "1px solid rgba(37,99,235,0.25)", color: "#60a5fa" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            Legal
          </span>
          <h1 className="text-5xl font-extrabold mb-5 leading-tight"
            style={{ background: "linear-gradient(135deg,#fff 40%,#93c5fd)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            Return Policy
          </h1>
          <p className="text-base leading-relaxed max-w-xl mx-auto" style={{ color: "rgba(148,163,184,0.75)" }}>
            All services provided by Pixora are 100% digital. Here is what that means for you.
          </p>
          <p className="text-xs mt-4" style={{ color: "rgba(100,116,139,0.6)" }}>
            Last updated: June 2026
          </p>
        </div>
      </section>

      <section className="px-4 pb-24">
        <div className="max-w-3xl mx-auto space-y-8">

          {/* Main explanation */}
          <div className="rounded-2xl overflow-hidden"
            style={{ background: "#0b1120", border: "1px solid rgba(255,255,255,0.07)" }}>
            <div className="flex items-center gap-3 px-6 py-5"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: "rgba(37,99,235,0.15)", border: "1px solid rgba(37,99,235,0.2)" }}>
                <PackageX size={16} style={{ color: "#60a5fa" }} />
              </div>
              <h2 className="font-extrabold text-base" style={{ color: "#f1f5f9" }}>Digital Services Cannot Be Returned</h2>
            </div>
            <div className="px-6 py-5 space-y-4">
              <p className="text-sm leading-relaxed" style={{ color: "rgba(148,163,184,0.75)" }}>
                Pixora provides exclusively digital services — including logo design, website development, social media content, video editing, and SEO. Because our deliverables are custom-created digital files and intangible service outputs, they cannot be physically returned the way a retail product can.
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(148,163,184,0.75)" }}>
                Once a file is delivered, it exists on your device or in a shared folder — there is no mechanism to reverse a digital delivery. This is a common characteristic of all custom digital work across the industry.
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(148,163,184,0.75)" }}>
                However, we understand that a "return" in the traditional sense means you want your money back because you are not satisfied. We have built policies specifically designed to make that almost never necessary, and to protect you when it is.
              </p>
            </div>
          </div>

          {/* What we offer instead */}
          <div>
            <h2 className="text-lg font-extrabold mb-5" style={{ color: "#f1f5f9" }}>What We Offer Instead</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {ALTERNATIVES.map(({ Icon, title, desc }) => (
                <div key={title} className="rounded-2xl p-6"
                  style={{ background: "#0b1120", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: "rgba(37,99,235,0.15)", border: "1px solid rgba(37,99,235,0.2)" }}>
                    <Icon size={16} style={{ color: "#60a5fa" }} />
                  </div>
                  <h3 className="font-extrabold text-sm mb-2" style={{ color: "#e2e8f0" }}>{title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(100,116,139,0.75)" }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Refund link */}
          <div className="rounded-2xl p-6"
            style={{ background: "linear-gradient(135deg,rgba(37,99,235,0.1),rgba(79,70,229,0.07))", border: "1px solid rgba(37,99,235,0.2)" }}>
            <h2 className="font-extrabold text-base mb-2" style={{ color: "#f1f5f9" }}>Looking for a Monetary Refund?</h2>
            <p className="text-sm leading-relaxed mb-5" style={{ color: "rgba(203,213,225,0.8)" }}>
              If you believe you are entitled to a monetary refund, please read our full Refund Policy which outlines the exact conditions, the process, and the timelines for refund processing.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/refund"
                className="inline-flex items-center gap-2 font-bold px-5 py-2.5 rounded-xl text-white text-sm transition-all hover:scale-[1.03]"
                style={{ background: "linear-gradient(135deg,#2563eb,#4f46e5)", boxShadow: "0 4px 16px rgba(37,99,235,0.4)" }}>
                Read Refund Policy <ArrowRight size={14} />
              </Link>
              <Link href="/contact"
                className="inline-flex items-center gap-2 font-bold px-5 py-2.5 rounded-xl text-sm transition-all hover:scale-[1.03]"
                style={{ color: "#93c5fd", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }}>
                Contact Support
              </Link>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
