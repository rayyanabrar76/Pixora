"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, CheckCircle2, Shield, Clock, Star, Zap } from "lucide-react";
import ServiceBanner from "@/components/ServiceBanner";

const TRUST = [
  { icon: Shield,  label: "Secure Order",       sub: "100% safe & private"      },
  { icon: Clock,   label: "Fast Delivery",       sub: "24–48h turnaround"        },
  { icon: Star,    label: "5-Star Rated",        sub: "100% satisfaction"        },
  { icon: Zap,     label: "Instant Confirmation",sub: "We reply within 2 hours"  },
];

export default function CartPage() {
  const { items, removeFromCart, updateQty, totalPrice, clearCart } = useCart();

  /* ── Empty state ── */
  if (items.length === 0) {
    return (
      <div style={{ background: "linear-gradient(180deg,#060d1f 0%,#080f22 100%)", minHeight: "100vh" }}
        className="flex items-center justify-center px-4">

        {/* ambient glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full blur-3xl opacity-10 pointer-events-none"
          style={{ background: "radial-gradient(circle,#2563eb,transparent)" }} />

        <div className="text-center relative z-10">
          <div className="w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-7"
            style={{ background: "linear-gradient(135deg,rgba(37,99,235,0.15),rgba(79,70,229,0.1))", border: "1px solid rgba(37,99,235,0.2)" }}>
            <ShoppingBag size={36} style={{ color: "rgba(96,165,250,0.6)" }} />
          </div>
          <h2 className="text-3xl font-extrabold mb-3"
            style={{ background: "linear-gradient(135deg,#fff 40%,#93c5fd)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            Your cart is empty
          </h2>
          <p className="text-sm mb-10 max-w-xs mx-auto leading-relaxed" style={{ color: "rgba(100,116,139,0.8)" }}>
            Browse our services and add what your business needs.
          </p>
          <Link href="/shop"
            className="inline-flex items-center gap-2 font-bold px-8 py-3.5 rounded-xl text-white text-sm transition-all duration-200 hover:scale-[1.03] active:scale-[0.97]"
            style={{ background: "linear-gradient(135deg,#2563eb,#4f46e5)", boxShadow: "0 4px 24px rgba(37,99,235,0.5)" }}>
            Browse Services <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: "linear-gradient(180deg,#060d1f 0%,#080f22 100%)", minHeight: "100vh" }}>

      {/* Ambient glows */}
      <div className="fixed top-0 left-1/4 w-125 h-125 rounded-full blur-3xl opacity-[0.04] pointer-events-none"
        style={{ background: "radial-gradient(circle,#2563eb,transparent)" }} />
      <div className="fixed top-0 right-1/4 w-125 h-125 rounded-full blur-3xl opacity-[0.04] pointer-events-none"
        style={{ background: "radial-gradient(circle,#7c3aed,transparent)" }} />

      <div className="max-w-5xl mx-auto px-4 py-14 relative">

        {/* ── Page header ── */}
        <div className="mb-12">
          <span className="inline-flex items-center gap-2 text-[11px] font-bold px-3.5 py-1.5 rounded-full uppercase tracking-widest mb-4"
            style={{ background: "rgba(37,99,235,0.12)", border: "1px solid rgba(37,99,235,0.25)", color: "#60a5fa" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            Checkout
          </span>
          <div className="flex items-end justify-between gap-4">
            <h1 className="text-4xl font-extrabold leading-tight"
              style={{ background: "linear-gradient(135deg,#fff 40%,#93c5fd)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Your Order
            </h1>
            <button onClick={clearCart}
              className="text-xs font-semibold px-3.5 py-1.5 rounded-lg transition-all duration-200 mb-1"
              style={{ color: "rgba(248,113,113,0.7)", background: "rgba(239,68,68,0.07)", border: "1px solid rgba(239,68,68,0.15)" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(239,68,68,0.15)"; (e.currentTarget as HTMLElement).style.color = "#fca5a5"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(239,68,68,0.07)"; (e.currentTarget as HTMLElement).style.color = "rgba(248,113,113,0.7)"; }}>
              Clear all
            </button>
          </div>

          {/* Step bar */}
          <div className="flex items-center gap-0 mt-6">
            {["Cart", "Review", "Confirm"].map((step, i) => (
              <div key={step} className="flex items-center">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-extrabold"
                    style={i === 0
                      ? { background: "linear-gradient(135deg,#2563eb,#4f46e5)", color: "#fff" }
                      : { background: "rgba(255,255,255,0.06)", color: "rgba(148,163,184,0.4)", border: "1px solid rgba(255,255,255,0.08)" }}>
                    {i + 1}
                  </div>
                  <span className="text-xs font-semibold"
                    style={{ color: i === 0 ? "#93c5fd" : "rgba(148,163,184,0.35)" }}>
                    {step}
                  </span>
                </div>
                {i < 2 && (
                  <div className="w-10 h-px mx-3"
                    style={{ background: i === 0 ? "rgba(37,99,235,0.4)" : "rgba(255,255,255,0.07)" }} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* ── Left: cart items ── */}
          <div className="lg:col-span-3 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="relative rounded-2xl overflow-hidden transition-all duration-200 group"
                style={{ background: "#0b1120", border: "1px solid rgba(255,255,255,0.07)", boxShadow: "0 8px 32px rgba(0,0,0,0.35)" }}>

                {/* top glow line */}
                <div className="absolute top-0 left-0 right-0 h-px"
                  style={{ background: "linear-gradient(to right,transparent,rgba(37,99,235,0.5),rgba(79,70,229,0.3),transparent)" }} />

                <div className="flex gap-0">
                  {/* Thumbnail */}
                  <div className="w-28 shrink-0 relative overflow-hidden" style={{ minHeight: "100px" }}>
                    <div className="absolute inset-0">
                      <ServiceBanner name={item.name} icon={item.icon} category={item.category} />
                    </div>
                    <div className="absolute inset-0"
                      style={{ background: "linear-gradient(to right,transparent 60%,#0b1120 100%)" }} />
                    {item.badge && (
                      <span className="absolute top-2 left-2 text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider text-white z-10"
                        style={{ background: "linear-gradient(135deg,#2563eb,#4f46e5)" }}>
                        {item.badge}
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-4 flex flex-col justify-between min-w-0">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "#60a5fa" }}>
                        {item.category}
                      </span>
                      <h3 className="font-extrabold text-base mt-0.5 leading-snug" style={{ color: "#e2e8f0" }}>
                        {item.name}
                      </h3>
                      <p className="text-xs mt-1 line-clamp-1" style={{ color: "rgba(100,116,139,0.7)" }}>
                        {item.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      {/* Qty control */}
                      <div className="flex items-center rounded-lg overflow-hidden"
                        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)" }}>
                        <button onClick={() => updateQty(item.id, item.qty - 1)}
                          className="w-8 h-8 flex items-center justify-center transition-all"
                          style={{ color: "rgba(148,163,184,0.5)" }}
                          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#fff"; (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)"; }}
                          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(148,163,184,0.5)"; (e.currentTarget as HTMLElement).style.background = "transparent"; }}>
                          <Minus size={11} />
                        </button>
                        <span className="w-8 text-center text-sm font-bold" style={{ color: "#e2e8f0" }}>{item.qty}</span>
                        <button onClick={() => updateQty(item.id, item.qty + 1)}
                          className="w-8 h-8 flex items-center justify-center transition-all"
                          style={{ color: "rgba(148,163,184,0.5)" }}
                          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#fff"; (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)"; }}
                          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(148,163,184,0.5)"; (e.currentTarget as HTMLElement).style.background = "transparent"; }}>
                          <Plus size={11} />
                        </button>
                      </div>

                      {/* Price + delete */}
                      <div className="flex items-center gap-3">
                        <span className="font-extrabold text-base"
                          style={{ background: "linear-gradient(135deg,#60a5fa,#a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                          Rs. {(item.price * item.qty).toLocaleString()}
                        </span>
                        <button onClick={() => removeFromCart(item.id)}
                          className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-150"
                          style={{ color: "rgba(148,163,184,0.4)" }}
                          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(239,68,68,0.12)"; (e.currentTarget as HTMLElement).style.color = "#fca5a5"; }}
                          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "rgba(148,163,184,0.4)"; }}>
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Trust badges row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {TRUST.map(({ icon: Icon, label, sub }) => (
                <div key={label} className="rounded-xl p-3 flex flex-col items-center text-center gap-1.5"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <Icon size={16} style={{ color: "#60a5fa" }} />
                  <span className="text-[11px] font-bold" style={{ color: "#cbd5e1" }}>{label}</span>
                  <span className="text-[10px]" style={{ color: "rgba(100,116,139,0.6)" }}>{sub}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: order summary ── */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl overflow-hidden sticky top-24"
              style={{ background: "#0b1120", border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 8px 48px rgba(0,0,0,0.5)" }}>

              {/* gradient top bar */}
              <div className="h-0.75 w-full"
                style={{ background: "linear-gradient(to right,#2563eb,#4f46e5,#7c3aed)" }} />

              <div className="p-6">
                <h2 className="font-extrabold text-lg mb-1" style={{ color: "#f1f5f9" }}>Order Summary</h2>
                <p className="text-xs mb-6" style={{ color: "rgba(100,116,139,0.6)" }}>
                  {items.length} service{items.length !== 1 ? "s" : ""} selected
                </p>

                {/* Line items */}
                <div className="space-y-3 mb-5">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between items-start gap-2 text-sm">
                      <span className="leading-snug flex-1" style={{ color: "rgba(148,163,184,0.75)" }}>
                        {item.name}
                        {item.qty > 1 && (
                          <span className="ml-1 text-[10px] px-1.5 py-0.5 rounded-full align-middle font-bold"
                            style={{ background: "rgba(37,99,235,0.15)", color: "#60a5fa" }}>
                            ×{item.qty}
                          </span>
                        )}
                      </span>
                      <span className="font-semibold shrink-0" style={{ color: "#cbd5e1" }}>
                        Rs. {(item.price * item.qty).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Divider */}
                <div className="h-px mb-5" style={{ background: "rgba(255,255,255,0.07)" }} />

                {/* Total */}
                <div className="flex justify-between items-center mb-6">
                  <span className="font-extrabold text-base" style={{ color: "#f1f5f9" }}>Total</span>
                  <span className="font-extrabold text-2xl"
                    style={{ background: "linear-gradient(135deg,#60a5fa,#a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                    Rs. {totalPrice.toLocaleString()}
                  </span>
                </div>

                {/* What happens next */}
                <div className="rounded-xl p-3.5 mb-6 space-y-2.5"
                  style={{ background: "rgba(37,99,235,0.07)", border: "1px solid rgba(37,99,235,0.18)" }}>
                  <p className="text-[11px] font-bold uppercase tracking-widest mb-1" style={{ color: "#60a5fa" }}>What happens next</p>
                  {[
                    "Submit your order via the contact form",
                    "We review & confirm within 2 hours",
                    "Work begins — delivered on schedule",
                  ].map((step, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <div className="w-4 h-4 rounded-full shrink-0 flex items-center justify-center text-[9px] font-extrabold mt-0.5"
                        style={{ background: "rgba(37,99,235,0.3)", color: "#93c5fd" }}>
                        {i + 1}
                      </div>
                      <p className="text-xs leading-relaxed" style={{ color: "rgba(148,163,184,0.75)" }}>{step}</p>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <Link href="/contact"
                  className="w-full flex items-center justify-center gap-2 font-bold py-4 rounded-xl text-white text-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                  style={{ background: "linear-gradient(135deg,#2563eb,#4f46e5)", boxShadow: "0 4px 24px rgba(37,99,235,0.5)" }}>
                  Proceed to Checkout
                  <ArrowRight size={15} />
                </Link>

                <Link href="/shop"
                  className="w-full flex items-center justify-center gap-1.5 text-xs font-medium mt-4 py-2 transition-colors"
                  style={{ color: "rgba(100,116,139,0.6)" }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#60a5fa"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "rgba(100,116,139,0.6)"}>
                  ← Continue Shopping
                </Link>

                {/* Guarantee note */}
                <div className="flex items-center justify-center gap-1.5 mt-4 pt-4"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                  <CheckCircle2 size={12} style={{ color: "#4ade80" }} />
                  <span className="text-[10px]" style={{ color: "rgba(100,116,139,0.5)" }}>
                    Satisfaction guaranteed or your money back
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
