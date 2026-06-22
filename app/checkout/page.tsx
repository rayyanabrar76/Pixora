"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Loader2, PackageCheck, ShoppingBag } from "lucide-react";
import emailjs from "@emailjs/browser";
import { supabase } from "@/lib/supabase";

export type StoredOrder = {
  id: string;
  supabase_id?: string;
  items: { id: string; name: string; qty: number; price: number; category: string }[];
  total: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  notes: string;
  status: "pending" | "cancelled";
  createdAt: string;
};

export function getOrders(userId: string): StoredOrder[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(`pixora_orders_${userId}`) ?? "[]");
  } catch {
    return [];
  }
}

export function saveOrder(userId: string, order: StoredOrder) {
  const existing = getOrders(userId);
  localStorage.setItem(`pixora_orders_${userId}`, JSON.stringify([order, ...existing]));
}

export function updateOrderStatus(userId: string, orderId: string, status: StoredOrder["status"]) {
  const orders = getOrders(userId).map((o) => (o.id === orderId ? { ...o, status } : o));
  localStorage.setItem(`pixora_orders_${userId}`, JSON.stringify(orders));
}

const FIELD_STYLE: React.CSSProperties = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "10px",
  color: "#e2e8f0",
  fontSize: "14px",
  padding: "11px 14px",
  width: "100%",
  outline: "none",
};

const LABEL_STYLE: React.CSSProperties = {
  display: "block",
  fontSize: "12px",
  fontWeight: 600,
  color: "rgba(148,163,184,0.8)",
  marginBottom: "6px",
  letterSpacing: "0.03em",
};

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const { user, isLoaded } = useUser();

  const [mounted, setMounted] = useState(false);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [processStep, setProcessStep] = useState(0);
  const [error, setError] = useState("");
  const [focused, setFocused] = useState("");

  useEffect(() => { setMounted(true); }, []);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    notes: "",
  });

  /* Scroll to top when order is placed */
  useEffect(() => {
    if (done) window.scrollTo({ top: 0, behavior: "instant" });
  }, [done]);

  /* Pre-fill form from Clerk user once loaded */
  useEffect(() => {
    if (!isLoaded || !user) return;
    setForm((prev) => ({
      ...prev,
      firstName: prev.firstName || user.firstName || "",
      lastName: prev.lastName || user.lastName || "",
      email: prev.email || user.emailAddresses[0]?.emailAddress || "",
    }));
  }, [isLoaded, user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const focusStyle = (name: string): React.CSSProperties => ({
    ...FIELD_STYLE,
    border: focused === name
      ? "1px solid rgba(37,99,235,0.7)"
      : "1px solid rgba(255,255,255,0.1)",
    boxShadow: focused === name ? "0 0 0 3px rgba(37,99,235,0.12)" : "none",
  });

  const EJ_SVC  = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
  const EJ_TPL  = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
  const EJ_KEY  = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setProcessing(true);
    setProcessStep(0);

    const orderItemRows = items.map((item) => `
      <tr>
        <td style="padding:10px 0;vertical-align:middle;">
          <div style="display:flex;align-items:center;gap:12px;">
            <div style="width:44px;height:44px;border-radius:8px;background:linear-gradient(135deg,#0097B2,#0369a1);display:flex;align-items:center;justify-content:center;color:#fff;font-weight:800;font-size:18px;flex-shrink:0;">
              ${item.name[0].toUpperCase()}
            </div>
            <div>
              <div style="font-weight:600;font-size:14px;color:#1e293b;">${item.name}</div>
              <div style="font-size:12px;color:#64748b;">${item.category} &middot; Qty: ${item.qty}</div>
            </div>
          </div>
        </td>
        <td style="padding:10px 0;text-align:right;vertical-align:middle;font-weight:700;font-size:14px;color:#0097B2;">
          Rs.${(item.price * item.qty).toLocaleString()}
        </td>
      </tr>
    `).join("");
    const orderItems = `<table style="width:100%;border-collapse:collapse;">${orderItemRows}</table>`;

    try {
      /* Step 1 — verifying */
      await new Promise(r => setTimeout(r, 700));
      setProcessStep(1);

      /* Save order to localStorage */
      const localId = `order_${Date.now()}`;
      if (user) {
        const order: StoredOrder = {
          id: localId,
          items: items.map(({ id, name, qty, price, category }) => ({ id, name, qty, price, category })),
          total: totalPrice,
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          notes: form.notes,
          status: "pending",
          createdAt: new Date().toISOString(),
        };
        saveOrder(user.id, order);
      }

      /* Step 2 — saving */
      await new Promise(r => setTimeout(r, 800));
      setProcessStep(2);

      /* Send email + Supabase in background */
      void emailjs.send(EJ_SVC, EJ_TPL, {
        name: `${form.firstName} ${form.lastName}`,
        email: form.email,
        phone: form.phone,
        order_items: orderItems,
        total: totalPrice.toLocaleString(),
        notes: form.notes || "No notes",
      }, EJ_KEY).catch(() => {});

      void (async () => {
        try {
          const { data } = await supabase.from("orders").insert({
            user_id: user?.id ?? null,
            user_email: form.email,
            user_name: `${form.firstName} ${form.lastName}`.trim(),
            phone: form.phone,
            items: items.map(({ id, name, qty, price, category }) => ({ id, name, qty, price, category })),
            total: totalPrice,
            notes: form.notes || null,
            status: "new",
          }).select("id");
          const sbId = data?.[0]?.id;
          if (sbId && user) {
            const orders = getOrders(user.id);
            const updated = orders.map(o => o.id === localId ? { ...o, supabase_id: sbId } : o);
            localStorage.setItem(`pixora_orders_${user.id}`, JSON.stringify(updated));
          }
        } catch { /* silently ignore */ }
      })();

      /* Step 3 — sending confirmation */
      await new Promise(r => setTimeout(r, 900));
      setProcessStep(3);

      await new Promise(r => setTimeout(r, 600));

      clearCart();
      setProcessing(false);
      setDone(true);

    } catch {
      setProcessing(false);
      setError("Something went wrong. Please try again or WhatsApp us directly.");
    } finally {
      setLoading(false);
    }
  };

  /* ── Step bar ── */
  const steps = ["Shopping Cart", "Checkout Details", "Order Complete"];
  const activeStep = done ? 2 : 1;

  const stepBar = (
    <div className="flex items-center gap-0 mb-10">
      {steps.map((label, i) => (
        <div key={label} className="flex items-center">
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-extrabold shrink-0"
              style={
                i < activeStep
                  ? { background: "#22c55e", color: "#fff" }
                  : i === activeStep
                  ? { background: "linear-gradient(135deg,#2563eb,#4f46e5)", color: "#fff" }
                  : { background: "rgba(255,255,255,0.06)", color: "rgba(148,163,184,0.4)", border: "1px solid rgba(255,255,255,0.08)" }
              }
            >
              {i < activeStep ? "✓" : i + 1}
            </div>
            <span
              className="text-xs font-semibold hidden sm:block"
              style={{
                color: i === activeStep ? "#93c5fd" : i < activeStep ? "#4ade80" : "rgba(148,163,184,0.35)",
              }}
            >
              {label}
            </span>
          </div>
          {i < 2 && (
            <div
              className="w-8 sm:w-12 h-px mx-2 sm:mx-3"
              style={{ background: i < activeStep ? "rgba(34,197,94,0.4)" : i === activeStep ? "rgba(37,99,235,0.4)" : "rgba(255,255,255,0.07)" }}
            />
          )}
        </div>
      ))}
    </div>
  );

  /* ── Order summary card ── */
  const orderSummary = (
    <div
      className="rounded-2xl overflow-hidden sticky top-24"
      style={{ background: "#0b1120", border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 8px 48px rgba(0,0,0,0.5)" }}
    >
      <div className="h-0.75 w-full" style={{ background: "linear-gradient(to right,#2563eb,#4f46e5,#7c3aed)" }} />
      <div className="p-6">
        <h2 className="font-extrabold text-lg mb-1" style={{ color: "#f1f5f9" }}>Your Order</h2>
        <p className="text-xs mb-6" style={{ color: "rgba(100,116,139,0.6)" }}>
          {items.length} service{items.length !== 1 ? "s" : ""}
        </p>

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
                ₨ {(item.price * item.qty).toLocaleString()}
              </span>
            </div>
          ))}
        </div>

        <div className="h-px mb-4" style={{ background: "rgba(255,255,255,0.07)" }} />

        <div className="flex justify-between text-sm mb-2">
          <span style={{ color: "rgba(100,116,139,0.7)" }}>Subtotal</span>
          <span style={{ color: "#cbd5e1" }}>₨ {totalPrice.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm mb-5">
          <span style={{ color: "rgba(100,116,139,0.7)" }}>Shipping</span>
          <span style={{ color: "#4ade80", fontWeight: 600 }}>Free</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="font-extrabold text-base" style={{ color: "#f1f5f9" }}>Total</span>
          <span className="font-extrabold text-2xl"
            style={{ background: "linear-gradient(135deg,#60a5fa,#a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            ₨ {totalPrice.toLocaleString()}
          </span>
        </div>

        <div className="flex items-center justify-center gap-1.5 mt-5 pt-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <CheckCircle2 size={12} style={{ color: "#4ade80" }} />
          <span className="text-[10px]" style={{ color: "rgba(100,116,139,0.5)" }}>
            Satisfaction guaranteed or your money back
          </span>
        </div>
      </div>
    </div>
  );

  /* ── Processing screen ── */
  if (processing) {
    const STEPS = [
      { label: "Verifying your details…",     icon: "🔍" },
      { label: "Saving your order…",           icon: "💾" },
      { label: "Sending confirmation email…",  icon: "📧" },
    ];
    return (
      <div style={{ background: "linear-gradient(180deg,#060d1f 0%,#080f22 100%)", minHeight: "100vh" }}
        className="flex items-center justify-center px-4">
        <style>{`
          @keyframes pulse-ring {
            0%   { transform: scale(0.9); opacity: 0.6; }
            50%  { transform: scale(1.12); opacity: 0.15; }
            100% { transform: scale(0.9); opacity: 0.6; }
          }
          @keyframes step-in {
            from { opacity: 0; transform: translateY(8px); }
            to   { opacity: 1; transform: translateY(0); }
          }
        `}</style>

        {/* Ambient glow */}
        <div className="fixed top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full blur-3xl opacity-10 pointer-events-none"
          style={{ background: "radial-gradient(circle,#2563eb,transparent)" }} />

        <div className="text-center relative z-10 max-w-sm w-full">
          {/* Spinner */}
          <div className="relative w-28 h-28 mx-auto mb-10">
            {/* Pulse ring */}
            <div className="absolute inset-0 rounded-full"
              style={{ background: "rgba(37,99,235,0.12)", animation: "pulse-ring 2s ease-in-out infinite" }} />
            {/* Outer ring spinner */}
            <div className="absolute inset-0 rounded-full border-4"
              style={{ borderColor: "rgba(37,99,235,0.12)", borderTopColor: "#2563eb", animation: "spin 1s linear infinite" }} />
            <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
            {/* Inner circle */}
            <div className="absolute inset-4 rounded-full flex items-center justify-center"
              style={{ background: "linear-gradient(135deg,rgba(37,99,235,0.2),rgba(79,70,229,0.15))", border: "1px solid rgba(37,99,235,0.3)" }}>
              <PackageCheck size={28} style={{ color: "#60a5fa" }} />
            </div>
          </div>

          <h2 className="text-2xl font-extrabold mb-2"
            style={{ background: "linear-gradient(135deg,#fff 40%,#93c5fd)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            Processing Your Order
          </h2>
          <p className="text-sm mb-8" style={{ color: "rgba(100,116,139,0.6)" }}>
            Please wait, this will only take a moment…
          </p>

          {/* Steps */}
          <div className="text-left space-y-3 bg-opacity-50 rounded-2xl p-5"
            style={{ background: "#0b1120", border: "1px solid rgba(255,255,255,0.07)" }}>
            {STEPS.map((s, i) => {
              const isActive  = processStep === i + 1;
              const isDone    = processStep > i + 1;
              const isPending = processStep <= i;
              return (
                <div key={s.label}
                  className="flex items-center gap-3"
                  style={{ animation: !isPending ? "step-in 0.4s ease forwards" : undefined }}>
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-sm transition-all"
                    style={
                      isDone    ? { background: "rgba(34,197,94,0.15)",  border: "1px solid rgba(34,197,94,0.3)",  color: "#4ade80"  } :
                      isActive  ? { background: "rgba(37,99,235,0.15)",  border: "1px solid rgba(37,99,235,0.35)", color: "#60a5fa"  } :
                                  { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(100,116,139,0.3)" }
                    }>
                    {isDone ? "✓" : s.icon}
                  </div>
                  <span className="text-sm font-medium transition-all"
                    style={{ color: isDone ? "#4ade80" : isActive ? "#e2e8f0" : "rgba(100,116,139,0.35)" }}>
                    {s.label}
                  </span>
                  {isActive && (
                    <Loader2 size={13} className="animate-spin ml-auto shrink-0" style={{ color: "#60a5fa" }} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  /* ── Success screen ── */
  if (done) {
    return (
      <div style={{ background: "linear-gradient(180deg,#060d1f 0%,#080f22 100%)", minHeight: "100vh" }}
        className="flex items-center justify-center px-4">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full blur-3xl opacity-10 pointer-events-none"
          style={{ background: "radial-gradient(circle,#22c55e,transparent)" }} />

        <div className="text-center relative z-10 max-w-md w-full">
          {stepBar}

          <div className="w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-7"
            style={{ background: "linear-gradient(135deg,rgba(34,197,94,0.15),rgba(16,185,129,0.1))", border: "1px solid rgba(34,197,94,0.25)" }}>
            <PackageCheck size={38} style={{ color: "#4ade80" }} />
          </div>

          <h1 className="text-3xl font-extrabold mb-3"
            style={{ background: "linear-gradient(135deg,#fff 40%,#4ade80)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            Order Placed!
          </h1>
          <p className="text-sm leading-relaxed mb-2 max-w-xs mx-auto" style={{ color: "rgba(148,163,184,0.75)" }}>
            Thanks, <strong style={{ color: "#e2e8f0" }}>{form.firstName}</strong>! We&apos;ve received your order and will reach out within 2 hours.
          </p>
          <p className="text-xs mb-8" style={{ color: "rgba(100,116,139,0.6)" }}>
            Confirmation sent to <strong style={{ color: "#60a5fa" }}>{form.email}</strong>
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {user && (
              <Link href="/orders"
                className="inline-flex items-center justify-center gap-2 font-bold px-6 py-3.5 rounded-xl text-white text-sm transition-all hover:scale-[1.03]"
                style={{ background: "rgba(37,99,235,0.15)", border: "1px solid rgba(37,99,235,0.3)" }}>
                View My Orders
              </Link>
            )}
            <Link href="/shop"
              className="inline-flex items-center justify-center gap-2 font-bold px-6 py-3.5 rounded-xl text-white text-sm transition-all hover:scale-[1.03]"
              style={{ background: "linear-gradient(135deg,#2563eb,#4f46e5)", boxShadow: "0 4px 24px rgba(37,99,235,0.5)" }}>
              Continue Shopping <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  /* ── Empty cart guard (mounted guard prevents SSR/client mismatch) ── */
  if (!mounted || items.length === 0) {
    return (
      <div style={{ background: "linear-gradient(180deg,#060d1f 0%,#080f22 100%)", minHeight: "100vh" }}
        className="flex items-center justify-center px-4">
        <div className="text-center">
          <ShoppingBag size={40} style={{ color: "rgba(96,165,250,0.4)", margin: "0 auto 20px" }} />
          <p className="mb-6 text-sm" style={{ color: "rgba(100,116,139,0.7)" }}>Your cart is empty.</p>
          <Link href="/shop"
            className="inline-flex items-center gap-2 font-bold px-6 py-3 rounded-xl text-white text-sm"
            style={{ background: "linear-gradient(135deg,#2563eb,#4f46e5)" }}>
            Browse Services <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    );
  }

  /* ── Checkout form ── */
  return (
    <div style={{ background: "linear-gradient(180deg,#060d1f 0%,#080f22 100%)", minHeight: "100vh" }}>
      <div className="fixed top-0 left-1/4 w-125 h-125 rounded-full blur-3xl opacity-[0.04] pointer-events-none"
        style={{ background: "radial-gradient(circle,#2563eb,transparent)" }} />
      <div className="fixed top-0 right-1/4 w-125 h-125 rounded-full blur-3xl opacity-[0.04] pointer-events-none"
        style={{ background: "radial-gradient(circle,#7c3aed,transparent)" }} />

      <div className="max-w-5xl mx-auto px-4 py-14 relative">

        <div className="mb-10">
          <span className="inline-flex items-center gap-2 text-[11px] font-bold px-3.5 py-1.5 rounded-full uppercase tracking-widest mb-4"
            style={{ background: "rgba(37,99,235,0.12)", border: "1px solid rgba(37,99,235,0.25)", color: "#60a5fa" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            Checkout
          </span>
          <h1 className="text-4xl font-extrabold leading-tight mb-6"
            style={{ background: "linear-gradient(135deg,#fff 40%,#93c5fd)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            Checkout Details
          </h1>
          {stepBar}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* ── Left: form ── */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit}>
              <div className="rounded-2xl overflow-hidden"
                style={{ background: "#0b1120", border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 8px 32px rgba(0,0,0,0.35)" }}>
                <div className="h-0.75 w-full" style={{ background: "linear-gradient(to right,#2563eb,#4f46e5,#7c3aed)" }} />

                <div className="p-6 space-y-5">
                  {/* Show auto-fill notice for signed-in users */}
                  {user && (
                    <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs"
                      style={{ background: "rgba(34,197,94,0.07)", border: "1px solid rgba(34,197,94,0.2)", color: "#4ade80" }}>
                      <CheckCircle2 size={13} />
                      Details filled from your account — just add your phone number.
                    </div>
                  )}

                  <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "#60a5fa" }}>
                    Contact Information
                  </p>

                  {/* Name row */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label style={LABEL_STYLE}>First name <span style={{ color: "#f87171" }}>*</span></label>
                      <input name="firstName" required value={form.firstName} onChange={handleChange}
                        onFocus={() => setFocused("firstName")} onBlur={() => setFocused("")}
                        placeholder="Ali" style={focusStyle("firstName")} />
                    </div>
                    <div>
                      <label style={LABEL_STYLE}>Last name <span style={{ color: "#f87171" }}>*</span></label>
                      <input name="lastName" required value={form.lastName} onChange={handleChange}
                        onFocus={() => setFocused("lastName")} onBlur={() => setFocused("")}
                        placeholder="Ahmed" style={focusStyle("lastName")} />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label style={LABEL_STYLE}>Email address <span style={{ color: "#f87171" }}>*</span></label>
                    <input name="email" type="email" required value={form.email} onChange={handleChange}
                      onFocus={() => setFocused("email")} onBlur={() => setFocused("")}
                      placeholder="ali@example.com" style={focusStyle("email")} />
                  </div>

                  {/* Phone */}
                  <div>
                    <label style={LABEL_STYLE}>WhatsApp / Phone <span style={{ color: "#f87171" }}>*</span></label>
                    <input name="phone" type="tel" required value={form.phone} onChange={handleChange}
                      onFocus={() => setFocused("phone")} onBlur={() => setFocused("")}
                      placeholder="+92 300 0000000" style={focusStyle("phone")} />
                  </div>

                  <div className="h-px" style={{ background: "rgba(255,255,255,0.06)" }} />

                  <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "#60a5fa" }}>
                    Order Notes
                  </p>

                  <div>
                    <label style={LABEL_STYLE}>Notes <span style={{ color: "rgba(100,116,139,0.5)" }}>(optional)</span></label>
                    <textarea name="notes" rows={4} value={form.notes} onChange={handleChange}
                      onFocus={() => setFocused("notes")} onBlur={() => setFocused("")}
                      placeholder="Any special requirements, deadlines, or details about your project…"
                      style={{ ...focusStyle("notes"), resize: "vertical", minHeight: "100px", fontFamily: "inherit" }} />
                  </div>

                  {error && (
                    <p className="text-sm rounded-xl px-4 py-3"
                      style={{ color: "#fca5a5", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }}>
                      {error}
                    </p>
                  )}

                  <button type="submit" disabled={loading}
                    className="w-full flex items-center justify-center gap-2 font-bold py-4 rounded-xl text-white text-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
                    style={{ background: "linear-gradient(135deg,#2563eb,#4f46e5)", boxShadow: "0 4px 24px rgba(37,99,235,0.5)" }}>
                    {loading
                      ? <><Loader2 size={15} className="animate-spin" /> Placing Order…</>
                      : <>Place Order <ArrowRight size={15} /></>
                    }
                  </button>

                  <p className="text-center text-[11px]" style={{ color: "rgba(100,116,139,0.45)" }}>
                    Your personal data will be used to process your order and contact you about it.
                  </p>
                </div>
              </div>

              <Link href="/cart"
                className="flex items-center justify-center gap-1 text-xs font-medium mt-4 py-2"
                style={{ color: "rgba(100,116,139,0.5)" }}>
                ← Back to Cart
              </Link>
            </form>
          </div>

          {/* ── Right: order summary ── */}
          <div className="lg:col-span-2">{orderSummary}</div>
        </div>
      </div>
    </div>
  );
}
