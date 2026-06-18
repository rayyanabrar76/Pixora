"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";

export default function CTASection() {
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
    <section ref={ref} className="relative overflow-hidden py-28"
      style={{ background: "linear-gradient(135deg,#03060e 0%,#071030 50%,#03060e 100%)" }}>

      {/* Blobs */}
      <div className="absolute top-0 left-0 w-125 h-125 rounded-full blur-3xl pointer-events-none opacity-20"
        style={{ background: "radial-gradient(circle,#2563eb,transparent)", animation: "blob 10s ease-in-out infinite" }} />
      <div className="absolute bottom-0 right-0 w-125 h-125 rounded-full blur-3xl pointer-events-none opacity-20"
        style={{ background: "radial-gradient(circle,#7c3aed,transparent)", animation: "blob 13s ease-in-out infinite 2.5s" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-75 rounded-full blur-3xl pointer-events-none opacity-10"
        style={{ background: "radial-gradient(circle,#0ea5e9,transparent)", animation: "floatY 7s ease-in-out infinite" }} />

      {/* Grid overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)",
          backgroundSize: "44px 44px",
        }} />

      {/* Decorative top line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-px pointer-events-none"
        style={{ background: "linear-gradient(to right,transparent,rgba(99,102,241,0.6),transparent)" }} />

      <div className="max-w-3xl mx-auto px-4 text-center relative z-10">

        {/* Badge */}
        <div style={{ opacity: inView ? 1 : 0, transform: inView ? "scale(1)" : "scale(0.85)", transition: "opacity 0.5s, transform 0.5s" }}>
          <span className="inline-flex items-center gap-2 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-6"
            style={{ background: "rgba(99,102,241,0.12)", color: "#a5b4fc", border: "1px solid rgba(99,102,241,0.25)" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            Let&apos;s work together
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(32px)",
            transition: "opacity 0.7s 0.1s, transform 0.7s 0.1s",
            background: "linear-gradient(135deg,#fff 40%,#93c5fd 70%,#c4b5fd)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
          Ready to grow<br />your business?
        </h2>

        {/* Subtext */}
        <p className="text-lg mb-12 max-w-xl mx-auto"
          style={{
            color: "rgba(148,163,184,0.7)",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.7s 0.2s, transform 0.7s 0.2s",
          }}>
          Let&apos;s build something great together. Get in touch and we&apos;ll start working on your project today.
        </p>

        {/* Buttons */}
        <div className="flex items-center justify-center gap-4 flex-wrap"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.7s 0.3s, transform 0.7s 0.3s",
          }}>
          <Link href="/contact"
            className="inline-flex items-center gap-2.5 font-extrabold px-9 py-4 rounded-xl text-base transition-all duration-200 hover:scale-105"
            style={{
              background: "linear-gradient(135deg,#2563eb,#4f46e5)",
              color: "white",
              boxShadow: "0 0 0 1px rgba(99,102,241,0.3), 0 8px 32px rgba(37,99,235,0.4)",
              animation: inView ? "pulseGlow 3s ease-in-out infinite 1s" : "none",
            }}>
            Get Started <ArrowRight size={18} />
          </Link>
          <Link href="/contact"
            className="inline-flex items-center gap-2.5 font-bold px-9 py-4 rounded-xl text-base transition-all duration-200 hover:scale-105 hover:bg-white/8"
            style={{
              color: "rgba(203,213,225,0.9)",
              border: "1px solid rgba(255,255,255,0.12)",
              backdropFilter: "blur(8px)",
            }}>
            <Mail size={17} /> Contact Us
          </Link>
        </div>

        {/* Trust line */}
        <p className="mt-10 text-xs"
          style={{
            color: "rgba(100,116,139,0.6)",
            opacity: inView ? 1 : 0,
            transition: "opacity 0.7s 0.5s",
          }}>
          No contracts • Free consultation • Results guaranteed
        </p>
      </div>
    </section>
  );
}
