"use client";

import { useParams } from "next/navigation";
import { SERVICES } from "@/lib/services";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import Link from "next/link";
import { ShoppingCart, Check, ArrowLeft, CheckCircle2 } from "lucide-react";
import ServiceBanner from "@/components/ServiceBanner";
import ProductCard from "@/components/ProductCard";

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const service = SERVICES.find((s) => s.slug === slug);
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  if (!service) {
    return (
      <div style={{ background: "#060d1f", minHeight: "100vh" }}
        className="flex flex-col items-center justify-center text-center px-4">
        <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <span className="text-3xl">😕</span>
        </div>
        <h2 className="text-xl font-bold mb-3 text-white">Service not found</h2>
        <Link href="/shop" className="text-sm transition-colors" style={{ color: "#60a5fa" }}>← Back to Shop</Link>
      </div>
    );
  }

  const related = SERVICES.filter((s) => s.category === service.category && s.id !== service.id).slice(0, 3);

  const handleAdd = () => {
    addToCart(service);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div style={{ background: "linear-gradient(180deg,#060d1f 0%,#080f22 100%)", minHeight: "100vh" }}>

      {/* Glow orbs */}
      <div className="fixed top-0 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-[0.07] pointer-events-none"
        style={{ background: "radial-gradient(circle,#2563eb,transparent)" }} />
      <div className="fixed top-0 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-[0.07] pointer-events-none"
        style={{ background: "radial-gradient(circle,#7c3aed,transparent)" }} />

      <div className="max-w-6xl mx-auto px-4 py-12 relative">

        {/* Back link */}
        <Link href="/shop"
          className="inline-flex items-center gap-2 text-sm font-medium mb-10 transition-colors group"
          style={{ color: "rgba(148,163,184,0.7)" }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#60a5fa"}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "rgba(148,163,184,0.7)"}>
          <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform" />
          Back to Shop
        </Link>

        {/* Main grid */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-6 mb-20">

          {/* Banner — takes 3/5 width, short on mobile */}
          <div className="sm:col-span-3 rounded-2xl overflow-hidden relative p-px"
            style={{ height: "clamp(180px, 45vw, 420px)", background: "linear-gradient(135deg,rgba(37,99,235,0.4),rgba(79,70,229,0.2),rgba(255,255,255,0.05))" }}>
            <div className="rounded-2xl overflow-hidden h-full">
              <ServiceBanner name={service.name} icon={service.icon} category={service.category} />
            </div>
            {service.badge && (
              <span className="absolute top-4 left-4 text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider"
                style={{ background: "linear-gradient(135deg,#2563eb,#4f46e5)", boxShadow: "0 2px 12px rgba(37,99,235,0.5)" }}>
                {service.badge}
              </span>
            )}
          </div>

          {/* Details panel — takes 2/5 width */}
          <div className="sm:col-span-2 rounded-2xl p-5 sm:p-8 flex flex-col"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>

            {/* Category + badge */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
                style={{ background: "rgba(37,99,235,0.15)", color: "#60a5fa", border: "1px solid rgba(37,99,235,0.25)" }}>
                {service.category}
              </span>
            </div>

            <h1 className="text-3xl font-extrabold mb-3 leading-tight"
              style={{ background: "linear-gradient(135deg,#fff 50%,#93c5fd)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              {service.name}
            </h1>

            <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(148,163,184,0.8)" }}>
              {service.description}
            </p>

            {/* Divider */}
            <div className="h-px mb-6" style={{ background: "rgba(255,255,255,0.07)" }} />

            {/* What's included */}
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "rgba(100,116,139,0.8)" }}>
              What&apos;s included
            </p>
            <ul className="space-y-2.5 mb-8">
              {service.details.map((d) => (
                <li key={d} className="flex items-start gap-3 text-sm" style={{ color: "rgba(203,213,225,0.85)" }}>
                  <CheckCircle2 size={16} className="shrink-0 mt-0.5" style={{ color: "#60a5fa" }} />
                  {d}
                </li>
              ))}
            </ul>

            {/* Price + CTA */}
            <div className="mt-auto pt-6 border-t flex items-center justify-between gap-4"
              style={{ borderColor: "rgba(255,255,255,0.07)" }}>
              <div>
                <p className="text-[10px] uppercase tracking-widest mb-1" style={{ color: "rgba(100,116,139,0.7)" }}>Starting at</p>
                <span className="text-3xl font-extrabold"
                  style={{ background: "linear-gradient(135deg,#60a5fa,#a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  {service.priceLabel}
                </span>
              </div>
              <button onClick={handleAdd}
                className="flex items-center gap-2.5 px-6 py-3 rounded-xl font-bold text-sm text-white transition-all hover:scale-105"
                style={added
                  ? { background: "#22c55e", boxShadow: "0 4px 20px rgba(34,197,94,0.4)" }
                  : { background: "linear-gradient(135deg,#2563eb,#4f46e5)", boxShadow: "0 4px 20px rgba(37,99,235,0.45)" }}>
                {added ? <Check size={16} /> : <ShoppingCart size={16} />}
                {added ? "Added to Cart!" : "Add to Cart"}
              </button>
            </div>
          </div>
        </div>

        {/* Related services */}
        {related.length > 0 && (
          <div>
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-xl font-extrabold text-white">Related Services</h2>
              <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {related.map((s) => <ProductCard key={s.id} service={s} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
