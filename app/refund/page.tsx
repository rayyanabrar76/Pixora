import Link from "next/link";
import { CheckCircle2, XCircle, Clock, Mail, RefreshCw, Star } from "lucide-react";

const ELIGIBLE = [
  "Work has not yet been started on your order.",
  "A significant quality issue exists that our team is unable to resolve after reasonable revision attempts.",
  "We fail to deliver the agreed scope of work within a reasonable timeframe without prior notice.",
];

const NOT_ELIGIBLE = [
  "The final deliverable has been approved by you.",
  "You change your mind after delivery without citing a quality issue.",
  "The brief or requirements were changed significantly after work began.",
  "Delays caused by the client failing to provide required content, feedback, or approvals on time.",
  "Subjective preference changes — for example, not liking a colour after approving the direction.",
];

const STEPS = [
  {
    num: "01",
    title: "Email Us Within 7 Days",
    desc: "Send a refund request to our support email within 7 calendar days of delivery. Include your order number and a clear description of the issue.",
  },
  {
    num: "02",
    title: "We Review Your Request",
    desc: "Our team will review the request within 1 business day and attempt to resolve the issue through additional revisions before processing a monetary refund.",
  },
  {
    num: "03",
    title: "Refund Issued",
    desc: "If the issue cannot be resolved, we will issue a full or partial refund via bank transfer or mobile wallet within 3–5 business days.",
  },
];

export default function RefundPage() {
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
            Refund Policy
          </h1>
          <p className="text-base leading-relaxed max-w-xl mx-auto" style={{ color: "rgba(148,163,184,0.75)" }}>
            Your satisfaction is our top priority. We back every service with a satisfaction guarantee and a fair refund policy designed to protect you.
          </p>
          <p className="text-xs mt-4" style={{ color: "rgba(100,116,139,0.6)" }}>
            Last updated: June 2026
          </p>
        </div>
      </section>

      <section className="px-4 pb-24">
        <div className="max-w-3xl mx-auto space-y-8">

          {/* Satisfaction guarantee banner */}
          <div className="rounded-2xl p-6 flex items-start gap-4"
            style={{ background: "linear-gradient(135deg,rgba(37,99,235,0.1),rgba(79,70,229,0.07))", border: "1px solid rgba(37,99,235,0.2)" }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
              style={{ background: "rgba(37,99,235,0.15)", border: "1px solid rgba(37,99,235,0.2)" }}>
              <Star size={16} style={{ color: "#60a5fa" }} />
            </div>
            <div>
              <h2 className="font-extrabold text-base mb-1" style={{ color: "#f1f5f9" }}>100% Satisfaction Guarantee</h2>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(203,213,225,0.8)" }}>
                We offer unlimited revisions within the original project scope until you are completely happy with the result. A refund is only needed when revisions cannot resolve the issue.
              </p>
            </div>
          </div>

          {/* Free revisions */}
          <div className="rounded-2xl overflow-hidden"
            style={{ background: "#0b1120", border: "1px solid rgba(255,255,255,0.07)" }}>
            <div className="flex items-center gap-3 px-6 py-5"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: "rgba(37,99,235,0.15)", border: "1px solid rgba(37,99,235,0.2)" }}>
                <RefreshCw size={16} style={{ color: "#60a5fa" }} />
              </div>
              <h2 className="font-extrabold text-base" style={{ color: "#f1f5f9" }}>Free Revisions Policy</h2>
            </div>
            <div className="px-6 py-5">
              <p className="text-sm leading-relaxed mb-3" style={{ color: "rgba(148,163,184,0.75)" }}>
                Every service at Fahadamina Enterprises includes unlimited free revisions within the agreed project scope. A revision is a change or refinement to the existing concept — it is not a request for an entirely different direction after work has begun.
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(148,163,184,0.75)" }}>
                If you request changes that fall outside the original brief (for example, switching from a minimalist logo to an illustrative one after the first draft), this may require a new order or an additional fee, which will be agreed with you beforehand.
              </p>
            </div>
          </div>

          {/* When refunds are granted */}
          <div className="rounded-2xl overflow-hidden"
            style={{ background: "#0b1120", border: "1px solid rgba(255,255,255,0.07)" }}>
            <div className="flex items-center gap-3 px-6 py-5"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.2)" }}>
                <CheckCircle2 size={16} style={{ color: "#4ade80" }} />
              </div>
              <h2 className="font-extrabold text-base" style={{ color: "#f1f5f9" }}>When a Refund Is Granted</h2>
            </div>
            <div className="px-6 py-5 space-y-3">
              {ELIGIBLE.map((item) => (
                <div key={item} className="flex items-start gap-2.5">
                  <CheckCircle2 size={14} className="mt-0.5 shrink-0" style={{ color: "#4ade80" }} />
                  <span className="text-sm leading-relaxed" style={{ color: "rgba(203,213,225,0.8)" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* When refunds are NOT granted */}
          <div className="rounded-2xl overflow-hidden"
            style={{ background: "#0b1120", border: "1px solid rgba(255,255,255,0.07)" }}>
            <div className="flex items-center gap-3 px-6 py-5"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}>
                <XCircle size={16} style={{ color: "#f87171" }} />
              </div>
              <h2 className="font-extrabold text-base" style={{ color: "#f1f5f9" }}>When a Refund Is Not Granted</h2>
            </div>
            <div className="px-6 py-5 space-y-3">
              {NOT_ELIGIBLE.map((item) => (
                <div key={item} className="flex items-start gap-2.5">
                  <XCircle size={14} className="mt-0.5 shrink-0" style={{ color: "#f87171" }} />
                  <span className="text-sm leading-relaxed" style={{ color: "rgba(148,163,184,0.75)" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* How to request */}
          <div className="rounded-2xl overflow-hidden"
            style={{ background: "#0b1120", border: "1px solid rgba(255,255,255,0.07)" }}>
            <div className="flex items-center gap-3 px-6 py-5"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: "rgba(37,99,235,0.15)", border: "1px solid rgba(37,99,235,0.2)" }}>
                <Clock size={16} style={{ color: "#60a5fa" }} />
              </div>
              <h2 className="font-extrabold text-base" style={{ color: "#f1f5f9" }}>How to Request a Refund</h2>
            </div>
            <div className="px-6 py-6">
              <div className="space-y-5">
                {STEPS.map(({ num, title, desc }) => (
                  <div key={num} className="flex items-start gap-4">
                    <div className="text-xs font-extrabold w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: "rgba(37,99,235,0.15)", color: "#60a5fa", border: "1px solid rgba(37,99,235,0.2)" }}>
                      {num}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold mb-1" style={{ color: "#e2e8f0" }}>{title}</h3>
                      <p className="text-sm leading-relaxed" style={{ color: "rgba(148,163,184,0.75)" }}>{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-5" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(148,163,184,0.75)" }}>
                  Refunds are processed via bank transfer or mobile wallet within <span style={{ color: "#e2e8f0", fontWeight: 700 }}>3–5 business days</span> after approval.
                </p>
                <Link href="/contact"
                  className="inline-flex items-center gap-2 font-bold px-5 py-2.5 rounded-xl text-white text-sm transition-all hover:scale-[1.03]"
                  style={{ background: "linear-gradient(135deg,#2563eb,#4f46e5)", boxShadow: "0 4px 16px rgba(37,99,235,0.4)" }}>
                  <Mail size={14} />
                  Submit a Refund Request
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
