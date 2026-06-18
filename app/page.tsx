import Hero from "@/components/Hero";
import WhyUs from "@/components/WhyUs";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { SERVICES } from "@/lib/services";

const FEATURED = SERVICES.filter((s) => s.badge || ["1", "5", "8", "11", "16"].includes(s.id)).slice(0, 9);

export default function Home() {
  return (
    <>
      <Hero />

      {/* Featured services */}
      <section className="py-24 relative overflow-hidden" style={{ background: "linear-gradient(180deg,#060d1f 0%,#080f22 100%)" }}>
        {/* glow orbs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px" style={{ background: "linear-gradient(to right,transparent,rgba(37,99,235,0.4),transparent)" }} />
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-10" style={{ background: "radial-gradient(circle,#2563eb,transparent)" }} />
        <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-10" style={{ background: "radial-gradient(circle,#7c3aed,transparent)" }} />

        <div className="max-w-6xl mx-auto px-4 relative">
          {/* Heading */}
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 text-[11px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-5"
              style={{ background: "rgba(37,99,235,0.12)", border: "1px solid rgba(37,99,235,0.25)", color: "#60a5fa" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              Our Services
            </span>
            <h2 className="text-4xl font-extrabold mb-3 leading-tight"
              style={{ background: "linear-gradient(135deg,#ffffff 40%,#93c5fd)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Featured Services
            </h2>
            <p className="max-w-md mx-auto" style={{ color: "rgba(148,163,184,0.7)" }}>Affordable digital solutions crafted for your business growth</p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {FEATURED.map((s) => <ProductCard key={s.id} service={s} />)}
          </div>

          {/* CTA */}
          <div className="text-center mt-14">
            <Link href="/shop"
              className="inline-flex items-center gap-2.5 font-bold px-8 py-3.5 rounded-xl text-sm transition-all duration-200 hover:scale-105 hover:shadow-xl text-white"
              style={{ background: "linear-gradient(135deg,#1d4ed8,#2563eb)", boxShadow: "0 4px 20px rgba(37,99,235,0.35)" }}>
              View All Services
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
        </div>
      </section>

      <WhyUs />
    </>
  );
}
