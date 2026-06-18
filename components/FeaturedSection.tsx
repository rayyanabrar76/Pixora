"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Service } from "@/lib/services";
import ProductCard from "@/components/ProductCard";

export default function FeaturedSection({ services }: { services: Service[] }) {
  const headRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [headIn, setHeadIn] = useState(false);
  const [gridIn, setGridIn] = useState(false);

  useEffect(() => {
    const o1 = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setHeadIn(true); o1.disconnect(); } }, { threshold: 0.4 });
    const o2 = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setGridIn(true); o2.disconnect(); } }, { threshold: 0.05 });
    if (headRef.current) o1.observe(headRef.current);
    if (gridRef.current) o2.observe(gridRef.current);
    return () => { o1.disconnect(); o2.disconnect(); };
  }, []);

  return (
    <section className="py-24 relative overflow-hidden" style={{ background: "#ffffff" }}>
      {/* Subtle top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px"
        style={{ background: "linear-gradient(to right,transparent,rgba(37,99,235,0.2),transparent)" }} />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-64 bg-blue-100/60 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4">

        {/* Heading */}
        <div ref={headRef} className="text-center mb-14"
          style={{
            opacity: headIn ? 1 : 0,
            transform: headIn ? "translateY(0)" : "translateY(28px)",
            transition: "opacity 0.7s ease-out, transform 0.7s ease-out",
          }}>
          <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-600 text-[11px] font-bold px-3.5 py-1.5 rounded-full uppercase tracking-widest mb-4 border border-blue-100">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            Our Services
          </span>
          <h2 className="text-4xl font-extrabold mb-3 leading-tight"
            style={{
              background: "linear-gradient(135deg,#0f172a 40%,#2563eb)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
            Featured Services
          </h2>
          <p className="text-gray-400 text-base max-w-md mx-auto">
            Affordable digital solutions tailored for your business growth
          </p>
        </div>

        {/* Grid */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((s, i) => (
            <div key={s.id} style={{
              opacity: gridIn ? 1 : 0,
              transform: gridIn ? "translateY(0) scale(1)" : "translateY(44px) scale(0.95)",
              transition: `opacity 0.55s ease-out ${i * 0.07}s, transform 0.55s ease-out ${i * 0.07}s`,
            }}>
              <ProductCard service={s} />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-14"
          style={{
            opacity: gridIn ? 1 : 0,
            transition: `opacity 0.6s ease-out ${services.length * 0.07 + 0.15}s`,
          }}>
          <Link href="/shop"
            className="inline-flex items-center gap-2.5 font-bold px-8 py-3.5 rounded-xl text-sm transition-all duration-200 hover:scale-105 hover:shadow-xl"
            style={{
              background: "linear-gradient(135deg,#1d4ed8,#2563eb)",
              color: "white",
              boxShadow: "0 4px 20px rgba(37,99,235,0.3)",
            }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(37,99,235,0.5)"}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(37,99,235,0.3)"}>
            View All Services <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
