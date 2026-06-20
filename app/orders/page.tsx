"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { ArrowRight, PackageCheck, Clock, XCircle, ShoppingBag, Loader2 } from "lucide-react";
import emailjs from "@emailjs/browser";
import { type StoredOrder, getOrders, updateOrderStatus } from "@/app/checkout/page";

export default function OrdersPage() {
  const { user, isLoaded } = useUser();
  const [orders, setOrders] = useState<StoredOrder[]>([]);
  const [cancelling, setCancelling] = useState<string | null>(null);
  const [cancelledId, setCancelledId] = useState<string | null>(null);

  useEffect(() => {
    if (isLoaded && user) {
      setOrders(getOrders(user.id));
    }
  }, [isLoaded, user]);

  const EJ_SVC = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID  || "service_1mmyrpk";
  const EJ_TPL = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID  || "template_0uow21s";
  const EJ_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY   || "BUS00ZVP7fVGfsSdb";

  const handleCancel = async (order: StoredOrder) => {
    if (!user) return;
    setCancelling(order.id);

    const orderItems = order.items
      .map((item) => `${item.name} x${item.qty} - Rs.${(item.price * item.qty).toLocaleString()}`)
      .join("\n");

    try {
      await emailjs.send(
        EJ_SVC,
        EJ_TPL,
        {
          name: `[CANCELLED] ${order.firstName} ${order.lastName}`,
          email: order.email,
          phone: order.phone,
          order_items: `*** CUSTOMER CANCELLED THIS ORDER ***\n\n${orderItems}`,
          total: order.total.toLocaleString(),
          notes: order.notes || "No notes",
        },
        EJ_KEY
      );

      updateOrderStatus(user.id, order.id, "cancelled");
      setOrders(getOrders(user.id));
      setCancelledId(order.id);
      setTimeout(() => setCancelledId(null), 3000);
    } catch {
      /* silently fail — order still gets marked cancelled locally */
      updateOrderStatus(user.id, order.id, "cancelled");
      setOrders(getOrders(user.id));
    } finally {
      setCancelling(null);
    }
  };

  /* ── Loading ── */
  if (!isLoaded) {
    return (
      <div style={{ background: "linear-gradient(180deg,#060d1f 0%,#080f22 100%)", minHeight: "100vh" }}
        className="flex items-center justify-center">
        <Loader2 size={28} className="animate-spin" style={{ color: "#60a5fa" }} />
      </div>
    );
  }

  /* ── Not signed in ── */
  if (!user) {
    return (
      <div style={{ background: "linear-gradient(180deg,#060d1f 0%,#080f22 100%)", minHeight: "100vh" }}
        className="flex items-center justify-center px-4">
        <div className="text-center">
          <ShoppingBag size={40} style={{ color: "rgba(96,165,250,0.4)", margin: "0 auto 20px" }} />
          <h2 className="text-xl font-extrabold mb-2" style={{ color: "#e2e8f0" }}>Sign in to view your orders</h2>
          <p className="text-sm mb-8" style={{ color: "rgba(100,116,139,0.7)" }}>Your order history is tied to your account.</p>
          <Link href="/"
            className="inline-flex items-center gap-2 font-bold px-6 py-3 rounded-xl text-white text-sm"
            style={{ background: "linear-gradient(135deg,#2563eb,#4f46e5)" }}>
            Go Home <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    );
  }

  const name = [user.firstName, user.lastName].filter(Boolean).join(" ") || "there";

  return (
    <div style={{ background: "linear-gradient(180deg,#060d1f 0%,#080f22 100%)", minHeight: "100vh" }}>
      <div className="fixed top-0 left-1/4 w-125 h-125 rounded-full blur-3xl opacity-[0.04] pointer-events-none"
        style={{ background: "radial-gradient(circle,#2563eb,transparent)" }} />

      <div className="max-w-3xl mx-auto px-4 py-14 relative">

        {/* Header */}
        <div className="mb-10">
          <span className="inline-flex items-center gap-2 text-[11px] font-bold px-3.5 py-1.5 rounded-full uppercase tracking-widest mb-4"
            style={{ background: "rgba(37,99,235,0.12)", border: "1px solid rgba(37,99,235,0.25)", color: "#60a5fa" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            Account
          </span>
          <h1 className="text-4xl font-extrabold leading-tight"
            style={{ background: "linear-gradient(135deg,#fff 40%,#93c5fd)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            My Orders
          </h1>
          <p className="text-sm mt-2" style={{ color: "rgba(100,116,139,0.7)" }}>
            Hey {name} — here&apos;s everything you&apos;ve ordered.
          </p>
        </div>

        {/* Empty state */}
        {orders.length === 0 && (
          <div className="rounded-2xl p-12 text-center"
            style={{ background: "#0b1120", border: "1px solid rgba(255,255,255,0.07)" }}>
            <ShoppingBag size={36} className="mx-auto mb-4" style={{ color: "rgba(96,165,250,0.3)" }} />
            <p className="font-bold text-base mb-1" style={{ color: "#e2e8f0" }}>No orders yet</p>
            <p className="text-sm mb-7" style={{ color: "rgba(100,116,139,0.6)" }}>
              Browse our services and place your first order.
            </p>
            <Link href="/shop"
              className="inline-flex items-center gap-2 font-bold px-6 py-3 rounded-xl text-white text-sm transition-all hover:scale-[1.02]"
              style={{ background: "linear-gradient(135deg,#2563eb,#4f46e5)", boxShadow: "0 4px 20px rgba(37,99,235,0.4)" }}>
              Browse Services <ArrowRight size={14} />
            </Link>
          </div>
        )}

        {/* Order cards */}
        <div className="space-y-5">
          {orders.map((order) => {
            const isCancelled = order.status === "cancelled";
            const isCancellingThis = cancelling === order.id;
            const justCancelled = cancelledId === order.id;
            const date = new Date(order.createdAt);
            const dateStr = date.toLocaleDateString("en-PK", { day: "numeric", month: "short", year: "numeric" });
            const timeStr = date.toLocaleTimeString("en-PK", { hour: "2-digit", minute: "2-digit" });

            return (
              <div key={order.id} className="rounded-2xl overflow-hidden transition-all"
                style={{
                  background: "#0b1120",
                  border: isCancelled
                    ? "1px solid rgba(239,68,68,0.2)"
                    : "1px solid rgba(255,255,255,0.08)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.35)",
                  opacity: isCancelled ? 0.75 : 1,
                }}>

                {/* Top gradient bar */}
                <div className="h-0.75 w-full"
                  style={{ background: isCancelled
                    ? "linear-gradient(to right,#ef4444,#b91c1c)"
                    : "linear-gradient(to right,#2563eb,#4f46e5,#7c3aed)"
                  }} />

                <div className="p-5">
                  {/* Order meta row */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-widest"
                          style={{ color: "rgba(100,116,139,0.6)" }}>
                          Order
                        </span>
                        <span className="text-[10px] font-mono" style={{ color: "rgba(100,116,139,0.4)" }}>
                          #{order.id.split("_")[1]}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs" style={{ color: "rgba(100,116,139,0.6)" }}>
                        <Clock size={11} />
                        {dateStr} at {timeStr}
                      </div>
                    </div>

                    {/* Status badge */}
                    <span className="text-[11px] font-bold px-3 py-1 rounded-full shrink-0"
                      style={isCancelled
                        ? { background: "rgba(239,68,68,0.12)", color: "#fca5a5", border: "1px solid rgba(239,68,68,0.25)" }
                        : { background: "rgba(34,197,94,0.1)", color: "#4ade80", border: "1px solid rgba(34,197,94,0.25)" }
                      }>
                      {isCancelled ? "Cancelled" : "Pending"}
                    </span>
                  </div>

                  {/* Items */}
                  <div className="space-y-2 mb-4">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex justify-between items-center text-sm">
                        <span style={{ color: "rgba(148,163,184,0.8)" }}>
                          {item.name}
                          {item.qty > 1 && (
                            <span className="ml-1.5 text-[10px] px-1.5 py-0.5 rounded-full font-bold"
                              style={{ background: "rgba(37,99,235,0.15)", color: "#60a5fa" }}>
                              ×{item.qty}
                            </span>
                          )}
                        </span>
                        <span className="font-semibold" style={{ color: "#cbd5e1" }}>
                          ₨ {(item.price * item.qty).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Divider */}
                  <div className="h-px mb-4" style={{ background: "rgba(255,255,255,0.06)" }} />

                  {/* Footer row: total + cancel */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      {isCancelled
                        ? <XCircle size={14} style={{ color: "#f87171" }} />
                        : <PackageCheck size={14} style={{ color: "#4ade80" }} />
                      }
                      <span className="font-extrabold text-base"
                        style={{ background: "linear-gradient(135deg,#60a5fa,#a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                        ₨ {order.total.toLocaleString()}
                      </span>
                    </div>

                    {!isCancelled && (
                      <button
                        onClick={() => handleCancel(order)}
                        disabled={isCancellingThis}
                        className="flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-xl transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                        style={{ color: "rgba(248,113,113,0.8)", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }}
                        onMouseEnter={e => {
                          if (!isCancellingThis) {
                            (e.currentTarget as HTMLElement).style.background = "rgba(239,68,68,0.18)";
                            (e.currentTarget as HTMLElement).style.color = "#fca5a5";
                          }
                        }}
                        onMouseLeave={e => {
                          (e.currentTarget as HTMLElement).style.background = "rgba(239,68,68,0.08)";
                          (e.currentTarget as HTMLElement).style.color = "rgba(248,113,113,0.8)";
                        }}>
                        {isCancellingThis
                          ? <><Loader2 size={11} className="animate-spin" /> Cancelling…</>
                          : <><XCircle size={11} /> Cancel Order</>
                        }
                      </button>
                    )}
                  </div>

                  {/* Just-cancelled toast */}
                  {justCancelled && (
                    <p className="text-xs mt-3 px-3 py-2 rounded-xl"
                      style={{ color: "#fca5a5", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.15)" }}>
                      Order cancelled — Pixora has been notified.
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {orders.length > 0 && (
          <div className="mt-8 text-center">
            <Link href="/shop"
              className="inline-flex items-center gap-2 text-sm font-medium"
              style={{ color: "rgba(100,116,139,0.5)" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#60a5fa"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "rgba(100,116,139,0.5)"}>
              ← Continue Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
