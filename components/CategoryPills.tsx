"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function CategoryPills({ categories }: { categories: string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="py-8 border-b" style={{ background: "#f8fafc", borderColor: "#e2e8f0" }}>
      <div ref={ref} className="max-w-6xl mx-auto px-4 flex gap-2.5 flex-wrap justify-center">
        {categories.map((cat, i) => (
          <Link key={cat} href={`/shop?category=${encodeURIComponent(cat)}`}
            className="group flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
            style={{
              background: "white",
              border: "1px solid #e2e8f0",
              color: "#475569",
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0) scale(1)" : "translateY(16px) scale(0.92)",
              transition: `opacity 0.4s ease-out ${i * 0.055}s, transform 0.4s ease-out ${i * 0.055}s, background 0.2s, color 0.2s, box-shadow 0.2s, border-color 0.2s`,
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = "#2563eb";
              (e.currentTarget as HTMLElement).style.color = "white";
              (e.currentTarget as HTMLElement).style.borderColor = "#2563eb";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 14px rgba(37,99,235,0.35)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = "white";
              (e.currentTarget as HTMLElement).style.color = "#475569";
              (e.currentTarget as HTMLElement).style.borderColor = "#e2e8f0";
              (e.currentTarget as HTMLElement).style.boxShadow = "";
            }}>
            {cat}
          </Link>
        ))}
      </div>
    </section>
  );
}
