"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Service } from "@/lib/services";
import { ShoppingCart, Check, Eye } from "lucide-react";
import ServiceBanner from "@/components/ServiceBanner";
import QuickViewModal from "@/components/QuickViewModal";

export default function ProductCard({ service }: { service: Service }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const [quickView, setQuickView] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleAdd = () => {
    addToCart(service);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <>
    {/* Gradient border wrapper */}
    <div
      className="relative rounded-2xl p-px transition-all duration-400 group"
      style={{
        background: hovered
          ? "linear-gradient(135deg,#2563eb,#4f46e5,#7c3aed)"
          : "linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.04))",
        boxShadow: hovered
          ? "0 0 0 1px transparent, 0 20px 60px rgba(37,99,235,0.22), 0 4px 16px rgba(0,0,0,0.3)"
          : "0 4px 24px rgba(0,0,0,0.12)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>

      {/* Card body */}
      <div className="relative rounded-2xl overflow-hidden flex flex-col" style={{ background: "linear-gradient(160deg,#0f172a 0%,#0c1525 100%)" }}>

        {/* Full-card link */}
        <Link href={`/shop/${service.slug}`} className="absolute inset-0 z-0" aria-label={service.name} />

        {/* Badge */}
        {service.badge && (
          <span className="absolute top-4 left-4 z-10 text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider"
            style={{ background: "linear-gradient(135deg,#2563eb,#4f46e5)", boxShadow: "0 2px 12px rgba(37,99,235,0.5)" }}>
            {service.badge}
          </span>
        )}

        {/* Banner */}
        <div className="h-52 overflow-hidden relative shrink-0">
          <div className="absolute inset-0 z-10" style={{ background: "linear-gradient(to bottom,transparent 40%,#0c1525 100%)" }} />
          <ServiceBanner name={service.name} icon={service.icon} category={service.category} />

          {/* Quick View button — desktop hover only, hidden on mobile to prevent tap interference */}
          <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 pointer-events-none sm:pointer-events-auto">
            <button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); setQuickView(true); }}
              className="relative z-10 flex items-center gap-2 font-bold text-xs px-5 py-2.5 rounded-full transition-all hover:scale-105 text-white"
              style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.2)", boxShadow: "0 4px 20px rgba(0,0,0,0.3)" }}>
              <Eye size={13} /> Quick View
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="px-6 pb-6 pt-3 flex flex-col flex-1">
          {/* Category */}
          <span className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: "#60a5fa" }}>
            {service.category}
          </span>

          <h3 className="font-extrabold text-white text-lg leading-snug mb-2">
            {service.name}
          </h3>

          <p className="text-sm leading-relaxed mb-5 flex-1" style={{ color: "rgba(148,163,184,0.75)" }}>
            {service.description}
          </p>

          {/* Divider */}
          <div className="h-px mb-5" style={{ background: "rgba(255,255,255,0.06)" }} />

          {/* Bottom row */}
          <div className="flex items-center justify-between relative z-10">
            <div>
              <p className="text-[10px] uppercase tracking-widest mb-0.5" style={{ color: "rgba(100,116,139,0.8)" }}>Starting at</p>
              <span className="text-xl font-extrabold"
                style={{ background: "linear-gradient(135deg,#60a5fa,#a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                {service.priceLabel}
              </span>
            </div>

            <button
              onClick={handleAdd}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl transition-all hover:scale-105 ${
                added ? "text-white" : "text-white"
              }`}
              style={
                added
                  ? { background: "#22c55e", boxShadow: "0 4px 16px rgba(34,197,94,0.4)" }
                  : { background: "linear-gradient(135deg,#2563eb,#4f46e5)", boxShadow: "0 4px 16px rgba(37,99,235,0.4)" }
              }>
              {added ? <Check size={13} /> : <ShoppingCart size={13} />}
              {added ? "Added!" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </div>

    {quickView && <QuickViewModal service={service} onClose={() => setQuickView(false)} />}
    </>
  );
}
