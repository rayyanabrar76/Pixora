"use client";

import { useEffect, useRef, useState } from "react";
import { ClipboardList, Paintbrush2, Rocket } from "lucide-react";

const STEPS = [
  {
    Icon: ClipboardList, num: "01", color: "#3b82f6",
    title: "Tell Us What You Need",
    desc: "Share your requirements and we'll put together a plan tailored to your business goals.",
  },
  {
    Icon: Paintbrush2, num: "02", color: "#8b5cf6",
    title: "We Create & Refine",
    desc: "Our team gets to work. We share drafts, collect your feedback, and polish until it's perfect.",
  },
  {
    Icon: Rocket, num: "03", color: "#06b6d4",
    title: "Delivered to You",
    desc: "Final files, source assets, and handoff in 24–72 hours. Ready to publish and grow.",
  },
];

export default function ProcessSection() {
  const ref = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="py-24 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg,#060c1a 0%,#080f22 100%)" }}>

      {/* Subtle grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)",
          backgroundSize: "48px 48px",
        }} />

      {/* Center glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 h-40 bg-blue-600/5 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 relative">

        {/* Heading */}
        <div className="text-center mb-16"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(28px)",
            transition: "opacity 0.7s, transform 0.7s",
          }}>
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold px-3.5 py-1.5 rounded-full uppercase tracking-widest mb-4"
            style={{ background: "rgba(59,130,246,0.12)", color: "#60a5fa", border: "1px solid rgba(59,130,246,0.2)" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            How It Works
          </span>
          <h2 className="text-4xl font-extrabold mb-3 leading-tight"
            style={{
              background: "linear-gradient(135deg,#fff 50%,#93c5fd)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
            Simple 3-Step Process
          </h2>
          <p className="text-base max-w-md mx-auto" style={{ color: "rgba(148,163,184,0.65)" }}>
            From idea to delivery — fast, easy, and stress-free
          </p>
        </div>

        {/* Steps */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">

          {/* Animated connector */}
          <div className="hidden md:block absolute top-12 left-[18%] right-[18%] h-px pointer-events-none overflow-hidden">
            <div style={{
              height: "1px",
              background: "linear-gradient(to right,transparent,rgba(59,130,246,0.4),rgba(139,92,246,0.4),rgba(6,182,212,0.4),transparent)",
              transformOrigin: "left center",
              transform: inView ? "scaleX(1)" : "scaleX(0)",
              transition: "transform 1.2s ease-out 0.4s",
            }} />
          </div>

          {STEPS.map((step, i) => (
            <div key={step.num}
              className="relative rounded-2xl p-8 text-center group hover:-translate-y-2 transition-all duration-300"
              style={{
                background: "rgba(255,255,255,0.035)",
                border: "1px solid rgba(255,255,255,0.07)",
                backdropFilter: "blur(12px)",
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0) scale(1)" : "translateY(44px) scale(0.95)",
                transition: `opacity 0.65s ease-out ${i * 0.15}s, transform 0.65s ease-out ${i * 0.15}s, border-color 0.3s, box-shadow 0.3s, translate 0.3s`,
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = `${step.color}55`;
                (e.currentTarget as HTMLElement).style.boxShadow = `0 20px 60px ${step.color}20`;
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)";
                (e.currentTarget as HTMLElement).style.boxShadow = "";
              }}>

              {/* Step badge */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-xs font-extrabold w-8 h-8 rounded-full flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg,${step.color},${step.color}aa)`,
                  boxShadow: `0 4px 16px ${step.color}55`,
                  color: "white",
                }}>
                {step.num}
              </div>

              {/* Icon */}
              <div className="flex justify-center mt-4 mb-5">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: `${step.color}15`,
                    border: `1px solid ${step.color}25`,
                  }}>
                  <step.Icon size={30} style={{ color: step.color }} />
                </div>
              </div>

              <h3 className="text-lg font-extrabold text-white mb-3">{step.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(148,163,184,0.65)" }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
