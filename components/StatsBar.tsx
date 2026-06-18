"use client";

import { useEffect, useRef, useState } from "react";
import { Users, Briefcase, Star, Headphones } from "lucide-react";

const STATS = [
  { Icon: Users,      value: 500,  suffix: "+",  label: "Happy Clients"  },
  { Icon: Briefcase,  value: 1000, suffix: "+",  label: "Projects Done"  },
  { Icon: Star,       value: 5,    suffix: ".0", label: "Average Rating" },
  { Icon: Headphones, value: 24,   suffix: "/7", label: "Support"        },
];

function Counter({ target, suffix, inView }: { target: number; suffix: string; inView: boolean }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const start = Date.now();
    const id = setInterval(() => {
      const p = Math.min((Date.now() - start) / duration, 1);
      setCount(Math.floor((1 - Math.pow(1 - p, 3)) * target));
      if (p >= 1) { setCount(target); clearInterval(id); }
    }, 16);
    return () => clearInterval(id);
  }, [inView, target]);
  return <>{count}{suffix}</>;
}

export default function StatsBar() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold: 0.25 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative overflow-hidden py-16"
      style={{ background: "linear-gradient(180deg,#03060e 0%,#060d1f 100%)" }}>
      {/* Ambient glows */}
      <div className="absolute top-0 left-1/4 w-96 h-32 bg-blue-600/8 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-32 bg-indigo-600/8 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 divide-x divide-white/8">
          {STATS.map((s, i) => (
            <div key={s.label} className="px-8 text-center first:pl-0 last:pr-0"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(28px)",
                transition: `opacity 0.7s ease-out ${i * 0.1}s, transform 0.7s ease-out ${i * 0.1}s`,
              }}>
              {/* Icon */}
              <div className="flex justify-center mb-4">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{
                    background: "rgba(59,130,246,0.12)",
                    border: "1px solid rgba(59,130,246,0.2)",
                    animation: inView ? `floatY 3s ease-in-out infinite ${i * 0.45}s` : "none",
                  }}>
                  <s.Icon size={20} style={{ color: "#60a5fa" }} />
                </div>
              </div>
              {/* Number */}
              <div className="text-4xl lg:text-5xl font-extrabold tabular-nums mb-1"
                style={{
                  background: "linear-gradient(135deg,#fff 40%,#93c5fd)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>
                <Counter target={s.value} suffix={s.suffix} inView={inView} />
              </div>
              <div className="text-sm font-medium" style={{ color: "rgba(148,163,184,0.6)" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
