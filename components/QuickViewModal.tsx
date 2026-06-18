"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { X, ShoppingCart, Check, Plus, Minus, ArrowRight, CheckCircle2 } from "lucide-react";
import { Service } from "@/lib/services";
import { useCart } from "@/context/CartContext";
import ServiceBanner from "@/components/ServiceBanner";

export default function QuickViewModal({ service, onClose }: {
  service: Service;
  onClose: () => void;
}) {
  const { addToCart } = useCart();
  const [qty, setQty]       = useState(1);
  const [added, setAdded]   = useState(false);
  const [visible, setVisible] = useState(false);

  /* ── open: wait one frame so CSS picks up the initial state ── */
  useEffect(() => {
    const raf = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  /* ── keyboard + scroll lock ── */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") handleClose(); };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", handler); document.body.style.overflow = ""; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── close: animate out THEN unmount ── */
  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 300);
  };

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addToCart(service);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  /* ── spring easing ── */
  const spring = "cubic-bezier(0.16, 1, 0.3, 1)";

  return createPortal(
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
      zIndex: 9999,
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "1rem",
    }}>

      {/* Backdrop */}
      <div
        onClick={handleClose}
        style={{
          position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
          background: "rgba(2,6,18,0.88)",
          backdropFilter: visible ? "blur(14px)" : "blur(0px)",
          opacity: visible ? 1 : 0,
          transition: `opacity 0.3s ease, backdrop-filter 0.3s ease`,
        }}
      />

      {/* Modal panel */}
      <div style={{
        position: "relative", width: "100%", maxWidth: "48rem", zIndex: 1,
        opacity: visible ? 1 : 0,
        transform: visible ? "scale(1) translateY(0px)" : "scale(0.93) translateY(28px)",
        transition: `opacity 0.35s ${spring}, transform 0.35s ${spring}`,
      }}>

        {/* Glow ring behind panel */}
        <div style={{
          position: "absolute", inset: -1,
          borderRadius: "1.25rem",
          background: "linear-gradient(135deg,rgba(37,99,235,0.35),rgba(79,70,229,0.2),rgba(124,58,237,0.15))",
          opacity: visible ? 1 : 0,
          transition: `opacity 0.5s ease 0.1s`,
          filter: "blur(1px)",
          pointerEvents: "none",
        }} />

        <div className="relative w-full rounded-2xl overflow-hidden flex flex-col sm:flex-row"
          style={{
            maxHeight: "90vh",
            background: "linear-gradient(160deg,#0d1525 0%,#0a1020 100%)",
            border: "1px solid rgba(255,255,255,0.09)",
            boxShadow: "0 40px 100px rgba(0,0,0,0.75), 0 0 0 1px rgba(37,99,235,0.12)",
          }}>

          {/* Top accent line */}
          <div className="absolute top-0 left-0 right-0 h-px z-10"
            style={{ background: "linear-gradient(to right,transparent,rgba(37,99,235,0.7),rgba(79,70,229,0.5),transparent)" }} />

          {/* Close */}
          <button onClick={handleClose}
            className="absolute top-3 right-3 z-20 w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-150"
            style={{ background: "rgba(255,255,255,0.08)", color: "rgba(148,163,184,0.8)" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,80,80,0.18)"; (e.currentTarget as HTMLElement).style.color = "#fca5a5"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)"; (e.currentTarget as HTMLElement).style.color = "rgba(148,163,184,0.8)"; }}>
            <X size={15} />
          </button>

          {/* Left — banner with slide-in from left */}
          <div className="sm:w-[42%] shrink-0 min-h-55 sm:min-h-0 relative overflow-hidden"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(-20px)",
              transition: `opacity 0.4s ease 0.1s, transform 0.4s ${spring} 0.1s`,
            }}>
            <div className="absolute inset-0 z-10"
              style={{ background: "linear-gradient(to right,transparent 60%,#0d1525 100%)" }} />
            <ServiceBanner name={service.name} icon={service.icon} category={service.category} />

            {service.badge && (
              <span className="absolute top-4 left-4 z-20 text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider"
                style={{ background: "linear-gradient(135deg,#2563eb,#4f46e5)", boxShadow: "0 2px 12px rgba(37,99,235,0.5)" }}>
                {service.badge}
              </span>
            )}
          </div>

          {/* Right — details with staggered fade-in */}
          <div className="flex-1 p-6 sm:p-7 overflow-y-auto flex flex-col gap-4">

            {/* Category */}
            <span className="inline-flex self-start text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
              style={{
                background: "rgba(37,99,235,0.15)", color: "#60a5fa",
                border: "1px solid rgba(37,99,235,0.25)",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(8px)",
                transition: `opacity 0.3s ease 0.18s, transform 0.3s ${spring} 0.18s`,
              }}>
              {service.category}
            </span>

            {/* Name */}
            <h2 className="text-2xl font-extrabold leading-tight"
              style={{
                background: "linear-gradient(135deg,#fff 50%,#93c5fd)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(10px)",
                transition: `opacity 0.3s ease 0.23s, transform 0.35s ${spring} 0.23s`,
              }}>
              {service.name}
            </h2>

            {/* Price */}
            <div className="text-2xl font-extrabold"
              style={{
                background: "linear-gradient(135deg,#60a5fa,#a78bfa)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(10px)",
                transition: `opacity 0.3s ease 0.28s, transform 0.35s ${spring} 0.28s`,
              }}>
              {service.priceLabel}
            </div>

            {/* Description */}
            <p className="text-sm leading-relaxed"
              style={{
                color: "rgba(148,163,184,0.75)",
                opacity: visible ? 1 : 0,
                transition: `opacity 0.3s ease 0.33s`,
              }}>
              {service.description}
            </p>

            {/* Divider */}
            <div className="h-px" style={{ background: "rgba(255,255,255,0.07)" }} />

            {/* Includes — each item staggers in */}
            <ul className="space-y-2">
              {service.details.map((d, i) => (
                <li key={d} className="flex items-start gap-2.5 text-sm"
                  style={{
                    color: "rgba(203,213,225,0.8)",
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateX(0)" : "translateX(-8px)",
                    transition: `opacity 0.3s ease ${0.38 + i * 0.06}s, transform 0.3s ${spring} ${0.38 + i * 0.06}s`,
                  }}>
                  <CheckCircle2 size={14} className="shrink-0 mt-0.5" style={{ color: "#60a5fa" }} />
                  {d}
                </li>
              ))}
            </ul>

            {/* Qty + Add */}
            <div className="flex items-center gap-3 flex-wrap mt-auto pt-2"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(12px)",
                transition: `opacity 0.35s ease 0.52s, transform 0.35s ${spring} 0.52s`,
              }}>
              {/* Qty */}
              <div className="flex items-center rounded-xl overflow-hidden"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
                <button onClick={() => setQty(q => Math.max(1, q - 1))}
                  className="w-9 h-10 flex items-center justify-center transition-colors"
                  style={{ color: "rgba(148,163,184,0.7)" }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#fff"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "rgba(148,163,184,0.7)"}>
                  <Minus size={13} />
                </button>
                <span className="w-9 text-center font-bold text-sm text-white">{qty}</span>
                <button onClick={() => setQty(q => q + 1)}
                  className="w-9 h-10 flex items-center justify-center transition-colors"
                  style={{ color: "rgba(148,163,184,0.7)" }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#fff"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "rgba(148,163,184,0.7)"}>
                  <Plus size={13} />
                </button>
              </div>

              {/* Add to cart */}
              <button onClick={handleAdd}
                className="flex items-center gap-2 flex-1 justify-center font-bold py-2.5 px-5 rounded-xl transition-all duration-200 text-sm text-white hover:scale-[1.03] active:scale-[0.97]"
                style={added
                  ? { background: "#22c55e", boxShadow: "0 4px 20px rgba(34,197,94,0.45)" }
                  : { background: "linear-gradient(135deg,#2563eb,#4f46e5)", boxShadow: "0 4px 20px rgba(37,99,235,0.5)" }}>
                {added ? <Check size={15} /> : <ShoppingCart size={15} />}
                {added ? "Added to Cart!" : "Add to Cart"}
              </button>
            </div>

            {/* Full details link */}
            <Link href={`/shop/${service.slug}`} onClick={handleClose}
              className="flex items-center gap-1.5 text-sm font-medium transition-colors"
              style={{
                color: "rgba(100,116,139,0.7)",
                opacity: visible ? 1 : 0,
                transition: `opacity 0.3s ease 0.58s`,
              }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#60a5fa"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "rgba(100,116,139,0.7)"}>
              View full details <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
