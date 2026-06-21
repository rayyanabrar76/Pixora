import Link from "next/link";
import { ArrowRight, CheckCircle2, Users, Zap, Shield, Star, Target, Globe } from "lucide-react";
import { PMark } from "@/components/Logo";

const STATS = [
  { val: "200+", label: "Happy Clients",  sub: "Across Pakistan"      },
  { val: "500+", label: "Projects Done",  sub: "Delivered on time"    },
  { val: "3+",   label: "Years Active",   sub: "Building brands"      },
  { val: "5★",   label: "Avg. Rating",    sub: "100% satisfaction"    },
];

const VALUES = [
  { Icon: Zap,    title: "Speed",       desc: "Most services delivered in 24–48 hours without sacrificing quality." },
  { Icon: Shield, title: "Trust",       desc: "Transparent pricing, no hidden fees, unlimited revisions until you're happy." },
  { Icon: Target, title: "Results",     desc: "Every deliverable is built to achieve your specific business goals." },
  { Icon: Globe,  title: "Reach",       desc: "We help local businesses compete with global brands online." },
];

const TEAM = [
  { name: "The Founder",    role: "Founder & Creative Director", initials: "FE", color: "#0097B2" },
  { name: "Design Team",    role: "Brand & Visual Design",        initials: "DT", color: "#7c3aed" },
  { name: "Dev Team",       role: "Web & App Development",        initials: "DV", color: "#0891b2" },
  { name: "Marketing Team", role: "SEO & Social Media",           initials: "MT", color: "#059669" },
];

export default function AboutPage() {
  return (
    <div style={{ background: "linear-gradient(180deg,#060d1f 0%,#080f22 100%)", minHeight: "100vh" }}>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-24 pb-20 px-4">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-125 h-125 rounded-full blur-3xl opacity-10 pointer-events-none"
          style={{ background: "radial-gradient(circle,#2563eb,transparent)" }} />
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-[0.06] pointer-events-none"
          style={{ background: "radial-gradient(circle,#7c3aed,transparent)" }} />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-px"
          style={{ background: "linear-gradient(to right,transparent,rgba(37,99,235,0.4),transparent)" }} />

        <div className="max-w-3xl mx-auto text-center relative">
          <span className="inline-flex items-center gap-2 text-[11px] font-bold px-3.5 py-1.5 rounded-full uppercase tracking-widest mb-5"
            style={{ background: "rgba(37,99,235,0.12)", border: "1px solid rgba(37,99,235,0.25)", color: "#60a5fa" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            About Fahadamina Enterprises
          </span>
          <h1 className="text-5xl font-extrabold mb-5 leading-tight"
            style={{ background: "linear-gradient(135deg,#fff 40%,#93c5fd)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            We Build Brands<br />That Get Remembered
          </h1>
          <p className="text-lg leading-relaxed max-w-xl mx-auto" style={{ color: "rgba(148,163,184,0.75)" }}>
            A passionate digital services team based in Pakistan, dedicated to helping businesses build a powerful online presence — at a price that actually makes sense.
          </p>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="px-4 pb-20">
        <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4">
          {STATS.map(({ val, label, sub }) => (
            <div key={label} className="rounded-2xl p-5 text-center"
              style={{ background: "#0b1120", border: "1px solid rgba(255,255,255,0.07)" }}>
              <div className="text-3xl font-extrabold mb-1"
                style={{ background: "linear-gradient(135deg,#60a5fa,#a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                {val}
              </div>
              <div className="text-sm font-bold" style={{ color: "#e2e8f0" }}>{label}</div>
              <div className="text-xs mt-0.5" style={{ color: "rgba(100,116,139,0.6)" }}>{sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Our Story ── */}
      <section className="px-4 pb-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Visual card */}
          <div className="relative rounded-3xl overflow-hidden h-80"
            style={{ background: "linear-gradient(135deg,#0d1a3a,#0f1535)", border: "1px solid rgba(37,99,235,0.2)" }}>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="mb-4 flex items-center justify-center"
                  style={{ filter: "drop-shadow(0 0 40px rgba(0,151,178,0.6))" }}>
                  <PMark size={96} />
                </div>
                <p style={{
                  fontFamily: "var(--font-brand, sans-serif)",
                  fontWeight: 900,
                  color: "#0097B2",
                  fontSize: "1.1rem",
                  letterSpacing: "0.04em",
                  lineHeight: 1.2,
                }}>FAHADAMINA<br />ENTERPRISES</p>
                <p className="text-xs mt-2" style={{ color: "rgba(148,163,184,0.5)" }}>Digital Agency · Pakistan</p>
              </div>
            </div>
            {/* Grid pattern */}
            <div className="absolute inset-0 opacity-5"
              style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.1) 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
            <div className="absolute bottom-0 left-0 right-0 h-24"
              style={{ background: "linear-gradient(to top,#0b1120,transparent)" }} />
          </div>

          {/* Text */}
          <div>
            <span className="inline-flex items-center gap-2 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4"
              style={{ background: "rgba(37,99,235,0.12)", border: "1px solid rgba(37,99,235,0.25)", color: "#60a5fa" }}>
              Our Story
            </span>
            <h2 className="text-3xl font-extrabold mb-5 leading-tight"
              style={{ color: "#f1f5f9" }}>
              Built to help local businesses compete online
            </h2>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(148,163,184,0.75)" }}>
              Fahadamina Enterprises was founded with a simple mission: make professional digital services accessible to every business, not just the big ones. We believe a small shop in a small city deserves the same online quality as a multinational brand.
            </p>
            <p className="text-sm leading-relaxed mb-7" style={{ color: "rgba(148,163,184,0.75)" }}>
              From graphic design to full website development, we handle every aspect of your digital presence with care, speed, and competitive pricing built for the Pakistani market.
            </p>
            {["Affordable pricing tailored to local businesses", "Fast turnaround — most projects in 24–48 hours", "Unlimited revisions until you're 100% happy"].map((pt) => (
              <div key={pt} className="flex items-center gap-2.5 mb-3">
                <CheckCircle2 size={15} style={{ color: "#60a5fa", flexShrink: 0 }} />
                <span className="text-sm" style={{ color: "rgba(203,213,225,0.8)" }}>{pt}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="px-4 pb-24 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px"
          style={{ background: "linear-gradient(to right,transparent,rgba(37,99,235,0.3),transparent)" }} />
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 text-[11px] font-bold px-3.5 py-1.5 rounded-full uppercase tracking-widest mb-4"
              style={{ background: "rgba(37,99,235,0.12)", border: "1px solid rgba(37,99,235,0.25)", color: "#60a5fa" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              What We Stand For
            </span>
            <h2 className="text-3xl font-extrabold"
              style={{ background: "linear-gradient(135deg,#fff 40%,#93c5fd)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Our Core Values
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map(({ Icon, title, desc }) => (
              <div key={title} className="rounded-2xl p-6"
                style={{ background: "#0b1120", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: "rgba(37,99,235,0.15)", border: "1px solid rgba(37,99,235,0.2)" }}>
                  <Icon size={18} style={{ color: "#60a5fa" }} />
                </div>
                <h3 className="font-extrabold text-base mb-2" style={{ color: "#e2e8f0" }}>{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(100,116,139,0.75)" }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section className="px-4 pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 text-[11px] font-bold px-3.5 py-1.5 rounded-full uppercase tracking-widest mb-4"
              style={{ background: "rgba(37,99,235,0.12)", border: "1px solid rgba(37,99,235,0.25)", color: "#60a5fa" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              The Team
            </span>
            <h2 className="text-3xl font-extrabold"
              style={{ background: "linear-gradient(135deg,#fff 40%,#93c5fd)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              People Behind Fahadamina Enterprises
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {TEAM.map(({ name, role, initials, color }) => (
              <div key={name} className="rounded-2xl p-6 text-center"
                style={{ background: "#0b1120", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white text-xl font-extrabold"
                  style={{ background: `linear-gradient(135deg,${color},${color}99)`, boxShadow: `0 4px 20px ${color}40` }}>
                  {initials}
                </div>
                <h3 className="font-extrabold text-sm mb-1" style={{ color: "#e2e8f0" }}>{name}</h3>
                <p className="text-xs" style={{ color: "rgba(100,116,139,0.65)" }}>{role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-4 pb-24">
        <div className="max-w-2xl mx-auto text-center rounded-3xl p-12 relative overflow-hidden"
          style={{ background: "linear-gradient(135deg,rgba(37,99,235,0.15),rgba(79,70,229,0.1))", border: "1px solid rgba(37,99,235,0.25)" }}>
          <div className="absolute inset-0 opacity-5 pointer-events-none"
            style={{ backgroundImage: "radial-gradient(circle at 50% 50%,#2563eb 0%,transparent 60%)" }} />
          <h2 className="text-3xl font-extrabold mb-3 relative"
            style={{ background: "linear-gradient(135deg,#fff 40%,#93c5fd)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            Let&apos;s Work Together
          </h2>
          <p className="text-sm mb-8 relative" style={{ color: "rgba(148,163,184,0.75)" }}>
            Start your project today and see the difference quality makes.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap relative">
            <Link href="/shop"
              className="inline-flex items-center gap-2 font-bold px-7 py-3.5 rounded-xl text-white text-sm transition-all hover:scale-[1.03]"
              style={{ background: "linear-gradient(135deg,#2563eb,#4f46e5)", boxShadow: "0 4px 24px rgba(37,99,235,0.5)" }}>
              Browse Services <ArrowRight size={15} />
            </Link>
            <Link href="/contact"
              className="inline-flex items-center gap-2 font-bold px-7 py-3.5 rounded-xl text-sm transition-all hover:scale-[1.03]"
              style={{ color: "#93c5fd", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }}>
              Contact Us
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
