import Link from "next/link";
import { Send, Clock, FolderOpen, Mail, AlertCircle, CheckCircle2 } from "lucide-react";

const DELIVERY_TIMES = [
  {
    service: "Logo Design",
    time: "24 – 48 hours",
    desc: "Initial concepts delivered within 24 hours. Final files after revision approval.",
    formats: "AI, EPS, SVG, PNG, PDF",
  },
  {
    service: "Website Design & Development",
    time: "5 – 7 business days",
    desc: "Full design and development cycle including 2 review rounds.",
    formats: "Live website, source code, Figma files",
  },
  {
    service: "Social Media Package",
    time: "3 – 5 business days",
    desc: "Monthly content packages, post templates, and story designs.",
    formats: "PNG, MP4, Canva/Figma source files",
  },
  {
    service: "SEO Services",
    time: "Ongoing monthly",
    desc: "Initial audit within 3 days. Monthly reports delivered on the 1st of each month.",
    formats: "PDF report, Google Search Console access",
  },
  {
    service: "Video Editing",
    time: "2 – 3 business days",
    desc: "Short-form content (under 5 minutes). Longer projects quoted separately.",
    formats: "MP4 (1080p / 4K), Premiere Pro project file",
  },
  {
    service: "Brand Identity Package",
    time: "4 – 6 business days",
    desc: "Includes logo, colour palette, typography guide, and brand board.",
    formats: "AI, PDF brand guide, PNG, SVG",
  },
];

const HOW_IT_WORKS = [
  {
    Icon: CheckCircle2,
    title: "Order Confirmed",
    desc: "Once your payment is confirmed, you receive an order confirmation email with your order number and next steps.",
  },
  {
    Icon: Mail,
    title: "Brief Collection",
    desc: "We reach out within a few hours to collect your brief, brand assets, and any specific requirements needed to begin work.",
  },
  {
    Icon: Clock,
    title: "Work Begins",
    desc: "Our team starts work immediately. You will receive progress updates via email at key stages of the project.",
  },
  {
    Icon: FolderOpen,
    title: "Delivery",
    desc: "Completed files are sent to you via email attachment or a shared Google Drive folder, depending on the file size.",
  },
];

export default function ShippingPage() {
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
            Delivery
          </span>
          <h1 className="text-5xl font-extrabold mb-5 leading-tight"
            style={{ background: "linear-gradient(135deg,#fff 40%,#93c5fd)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            Delivery Policy
          </h1>
          <p className="text-base leading-relaxed max-w-xl mx-auto" style={{ color: "rgba(148,163,184,0.75)" }}>
            All Fahadamina Enterprises deliverables are 100% digital. No physical shipping is involved. Files are sent via email or Google Drive.
          </p>
          <p className="text-xs mt-4" style={{ color: "rgba(100,116,139,0.6)" }}>
            Last updated: June 2026
          </p>
        </div>
      </section>

      <section className="px-4 pb-24">
        <div className="max-w-4xl mx-auto space-y-12">

          {/* Digital delivery banner */}
          <div className="rounded-2xl p-6 flex items-start gap-4"
            style={{ background: "linear-gradient(135deg,rgba(37,99,235,0.1),rgba(79,70,229,0.07))", border: "1px solid rgba(37,99,235,0.2)" }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
              style={{ background: "rgba(37,99,235,0.15)", border: "1px solid rgba(37,99,235,0.2)" }}>
              <Send size={16} style={{ color: "#60a5fa" }} />
            </div>
            <div>
              <h2 className="font-extrabold text-base mb-1" style={{ color: "#f1f5f9" }}>100% Digital Delivery</h2>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(203,213,225,0.8)" }}>
                Since all our services are digital, there is no physical shipping. Your completed files are delivered directly to your inbox or via a shared Google Drive link. You will receive a delivery notification email the moment your files are ready.
              </p>
            </div>
          </div>

          {/* How delivery works */}
          <div>
            <div className="mb-8">
              <span className="inline-flex items-center gap-2 text-[11px] font-bold px-3.5 py-1.5 rounded-full uppercase tracking-widest mb-4"
                style={{ background: "rgba(37,99,235,0.12)", border: "1px solid rgba(37,99,235,0.25)", color: "#60a5fa" }}>
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                How It Works
              </span>
              <h2 className="text-2xl font-extrabold"
                style={{ background: "linear-gradient(135deg,#fff 40%,#93c5fd)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                From Order to Delivery
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {HOW_IT_WORKS.map(({ Icon, title, desc }, idx) => (
                <div key={title} className="rounded-2xl p-5 flex items-start gap-4"
                  style={{ background: "#0b1120", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <div className="text-xs font-extrabold w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: "rgba(37,99,235,0.15)", color: "#60a5fa", border: "1px solid rgba(37,99,235,0.2)" }}>
                    0{idx + 1}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold mb-1" style={{ color: "#e2e8f0" }}>{title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: "rgba(100,116,139,0.75)" }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery timeframes */}
          <div>
            <div className="mb-8">
              <span className="inline-flex items-center gap-2 text-[11px] font-bold px-3.5 py-1.5 rounded-full uppercase tracking-widest mb-4"
                style={{ background: "rgba(37,99,235,0.12)", border: "1px solid rgba(37,99,235,0.25)", color: "#60a5fa" }}>
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                Timeframes
              </span>
              <h2 className="text-2xl font-extrabold"
                style={{ background: "linear-gradient(135deg,#fff 40%,#93c5fd)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Delivery Times by Service
              </h2>
            </div>
            <div className="rounded-2xl overflow-hidden"
              style={{ background: "#0b1120", border: "1px solid rgba(255,255,255,0.07)" }}>
              {DELIVERY_TIMES.map(({ service, time, desc, formats }, idx) => (
                <div key={service}
                  className="px-6 py-5 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 items-start"
                  style={{ borderBottom: idx < DELIVERY_TIMES.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
                  <div>
                    <div className="text-sm font-bold mb-0.5" style={{ color: "#e2e8f0" }}>{service}</div>
                    <div className="text-xs font-bold" style={{ color: "#60a5fa" }}>{time}</div>
                  </div>
                  <div className="sm:col-span-2">
                    <p className="text-xs leading-relaxed mb-1.5" style={{ color: "rgba(148,163,184,0.75)" }}>{desc}</p>
                    <p className="text-[11px]" style={{ color: "rgba(100,116,139,0.6)" }}>
                      <span className="font-bold" style={{ color: "rgba(100,116,139,0.8)" }}>Formats: </span>
                      {formats}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs mt-3 px-1" style={{ color: "rgba(100,116,139,0.6)" }}>
              All timeframes begin once we have received your complete brief and required assets. Rush delivery is available on select services — contact us for pricing.
            </p>
          </div>

          {/* Missed deadlines */}
          <div className="rounded-2xl overflow-hidden"
            style={{ background: "#0b1120", border: "1px solid rgba(255,255,255,0.07)" }}>
            <div className="flex items-center gap-3 px-6 py-5"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}>
                <AlertCircle size={16} style={{ color: "#f87171" }} />
              </div>
              <h2 className="font-extrabold text-base" style={{ color: "#f1f5f9" }}>If a Deadline Is Missed</h2>
            </div>
            <div className="px-6 py-5 space-y-3">
              <p className="text-sm leading-relaxed" style={{ color: "rgba(148,163,184,0.75)" }}>
                We take our delivery commitments seriously. If we miss a stated deadline due to reasons within our control, we will:
              </p>
              {[
                "Notify you immediately by email with a revised delivery date.",
                "Offer a discount on your current or next order as compensation.",
                "Provide a full refund if the delay is significant and you no longer wish to proceed.",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2.5">
                  <CheckCircle2 size={14} className="mt-0.5 shrink-0" style={{ color: "#60a5fa" }} />
                  <span className="text-sm leading-relaxed" style={{ color: "rgba(203,213,225,0.8)" }}>{item}</span>
                </div>
              ))}
              <p className="text-sm leading-relaxed pt-1" style={{ color: "rgba(148,163,184,0.75)" }}>
                Please note that delays caused by late submission of required content or approvals from your side do not constitute a missed deadline on our part.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <p className="text-sm mb-5" style={{ color: "rgba(148,163,184,0.7)" }}>
              Have a time-sensitive project? Get in touch and we will work out a timeline that suits you.
            </p>
            <Link href="/contact"
              className="inline-flex items-center gap-2 font-bold px-7 py-3.5 rounded-xl text-white text-sm transition-all hover:scale-[1.03]"
              style={{ background: "linear-gradient(135deg,#2563eb,#4f46e5)", boxShadow: "0 4px 20px rgba(37,99,235,0.4)" }}>
              Discuss Your Project
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
}
