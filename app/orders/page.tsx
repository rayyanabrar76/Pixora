"use client";

import { useState, useEffect, useMemo } from "react";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { ArrowRight, PackageCheck, Clock, XCircle, ShoppingBag, Loader2, CheckCircle2, Trash2 } from "lucide-react";
import emailjs from "@emailjs/browser";
import { type StoredOrder, getOrders, updateOrderStatus } from "@/app/checkout/page";
import { supabase, type DbOrder } from "@/lib/supabase";

type DisplayOrder = {
  id: string;
  supabaseId?: string;
  items: { id: string; name: string; qty: number; price: number; category: string }[];
  total: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  notes: string;
  status: "pending" | "approved" | "cancelled";
  createdAt: string;
  isLegacy?: boolean;
};

export default function OrdersPage() {
  const { user, isLoaded } = useUser();
  const [sbOrders, setSbOrders] = useState<DbOrder[]>([]);
  const [localOrders, setLocalOrders] = useState<StoredOrder[]>([]);
  const [fetching, setFetching] = useState(true);
  const [cancelling, setCancelling] = useState<string | null>(null);
  const [cancelledId, setCancelledId] = useState<string | null>(null);
  const [confirmClear, setConfirmClear] = useState(false);
  const [clearing, setClearing] = useState(false);

  useEffect(() => {
    if (!isLoaded) return;
    if (!user) { setFetching(false); return; }
    supabase.from("orders").select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        if (data) setSbOrders(data as DbOrder[]);
        setFetching(false);
      });
    setLocalOrders(getOrders(user.id));
  }, [isLoaded, user]);

  const orders = useMemo<DisplayOrder[]>(() => {
    const fromSupabase: DisplayOrder[] = sbOrders.map(o => {
      const parts = (o.user_name || "").split(" ");
      return {
        id: o.id,
        supabaseId: o.id,
        items: o.items,
        total: o.total,
        firstName: parts[0] || "",
        lastName: parts.slice(1).join(" "),
        email: o.user_email,
        phone: o.phone || "",
        notes: o.notes || "",
        status: o.status === "approved" ? "approved" : o.status === "cancelled" ? "cancelled" : "pending",
        createdAt: o.created_at,
      };
    });

    const sbIds = new Set(sbOrders.map(o => o.id));
    const legacy: DisplayOrder[] = localOrders
      .filter(o => !o.supabase_id || !sbIds.has(o.supabase_id))
      .map(o => ({
        id: o.id,
        supabaseId: o.supabase_id,
        items: o.items,
        total: o.total,
        firstName: o.firstName,
        lastName: o.lastName,
        email: o.email,
        phone: o.phone,
        notes: o.notes,
        status: o.status as "pending" | "cancelled",
        createdAt: o.createdAt,
        isLegacy: true,
      }));

    return [...fromSupabase, ...legacy];
  }, [sbOrders, localOrders]);

  const handleCancel = async (order: DisplayOrder) => {
    if (!user) return;
    setCancelling(order.id);

    const EJ_SVC = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
    const EJ_TPL = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
    const EJ_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;

    const orderItems = order.items
      .map(it => `${it.name} x${it.qty} - Rs.${(it.price * it.qty).toLocaleString()}`)
      .join("\n");

    try {
      await emailjs.send(EJ_SVC, EJ_TPL, {
        name: `[CANCELLED] ${order.firstName} ${order.lastName}`,
        email: order.email,
        phone: order.phone,
        order_items: `*** CUSTOMER CANCELLED THIS ORDER ***\n\n${orderItems}`,
        total: order.total.toLocaleString(),
        notes: order.notes || "No notes",
      }, EJ_KEY);
    } catch { /* silently continue */ }

    if (order.supabaseId) {
      await supabase.from("orders").update({ status: "cancelled" }).eq("id", order.supabaseId);
      setSbOrders(prev => prev.map(o => o.id === order.supabaseId ? { ...o, status: "cancelled" } : o));
    }
    if (order.isLegacy) {
      updateOrderStatus(user.id, order.id, "cancelled");
      setLocalOrders(getOrders(user.id));
    }

    setCancelledId(order.id);
    setTimeout(() => setCancelledId(null), 3000);
    setCancelling(null);
  };

  const handleClearHistory = async () => {
    if (!user) return;
    setClearing(true);

    // Collect Supabase IDs being deleted so we can also remove their localStorage mirrors
    const deletedSbIds = new Set(
      sbOrders.filter(o => o.status === "approved" || o.status === "cancelled").map(o => o.id)
    );

    await supabase.from("orders").delete()
      .eq("user_id", user.id)
      .in("status", ["approved", "cancelled"]);

    setSbOrders(prev => prev.filter(o => o.status !== "approved" && o.status !== "cancelled"));

    // Keep only pending localStorage entries that are NOT linked to a deleted Supabase row
    const remaining = getOrders(user.id).filter(o =>
      o.status === "pending" && (!o.supabase_id || !deletedSbIds.has(o.supabase_id))
    );
    localStorage.setItem(`pixora_orders_${user.id}`, JSON.stringify(remaining));
    setLocalOrders(remaining);
    setConfirmClear(false);
    setClearing(false);
  };

  if (!isLoaded || fetching) {
    return (
      <div style={{ background: "linear-gradient(180deg,#060d1f 0%,#080f22 100%)", minHeight: "100vh" }}
        className="flex items-center justify-center">
        <Loader2 size={28} className="animate-spin" style={{ color: "#60a5fa" }} />
      </div>
    );
  }

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

  const statusStyle = (status: DisplayOrder["status"]) => {
    if (status === "approved") return { background: "rgba(34,197,94,0.12)", color: "#4ade80", border: "1px solid rgba(34,197,94,0.25)" };
    if (status === "cancelled") return { background: "rgba(239,68,68,0.12)", color: "#fca5a5", border: "1px solid rgba(239,68,68,0.25)" };
    return { background: "rgba(251,191,36,0.12)", color: "#fbbf24", border: "1px solid rgba(251,191,36,0.25)" };
  };

  const statusLabel = (status: DisplayOrder["status"]) =>
    status === "approved" ? "Approved" : status === "cancelled" ? "Cancelled" : "Pending";

  return (
    <div style={{ background: "linear-gradient(180deg,#060d1f 0%,#080f22 100%)", minHeight: "100vh" }}>
      <div className="fixed top-0 left-1/4 w-125 h-125 rounded-full blur-3xl opacity-[0.04] pointer-events-none"
        style={{ background: "radial-gradient(circle,#2563eb,transparent)" }} />

      <div className="max-w-3xl mx-auto px-4 py-14 relative">
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

        {orders.length === 0 && (
          <div className="rounded-2xl p-12 text-center"
            style={{ background: "#0b1120", border: "1px solid rgba(255,255,255,0.07)" }}>
            <ShoppingBag size={36} className="mx-auto mb-4" style={{ color: "rgba(96,165,250,0.3)" }} />
            <p className="font-bold text-base mb-1" style={{ color: "#e2e8f0" }}>No orders yet</p>
            <p className="text-sm mb-7" style={{ color: "rgba(100,116,139,0.6)" }}>Browse our services and place your first order.</p>
            <Link href="/shop"
              className="inline-flex items-center gap-2 font-bold px-6 py-3 rounded-xl text-white text-sm transition-all hover:scale-[1.02]"
              style={{ background: "linear-gradient(135deg,#2563eb,#4f46e5)", boxShadow: "0 4px 20px rgba(37,99,235,0.4)" }}>
              Browse Services <ArrowRight size={14} />
            </Link>
          </div>
        )}

        <div className="space-y-5">
          {orders.map((order) => {
            const isCancelled = order.status === "cancelled";
            const isApproved = order.status === "approved";
            const isCancellingThis = cancelling === order.id;
            const justCancelled = cancelledId === order.id;
            const date = new Date(order.createdAt);

            return (
              <div key={order.id} className="rounded-2xl overflow-hidden transition-all"
                style={{
                  background: "#0b1120",
                  border: isCancelled
                    ? "1px solid rgba(239,68,68,0.2)"
                    : isApproved
                      ? "1px solid rgba(34,197,94,0.2)"
                      : "1px solid rgba(255,255,255,0.08)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.35)",
                  opacity: isCancelled ? 0.75 : 1,
                }}>

                <div className="h-0.75 w-full"
                  style={{ background: isCancelled
                    ? "linear-gradient(to right,#ef4444,#b91c1c)"
                    : isApproved
                      ? "linear-gradient(to right,#22c55e,#16a34a)"
                      : "linear-gradient(to right,#2563eb,#4f46e5,#7c3aed)"
                  }} />

                <div className="p-5">
                  <div className="flex items-start justify-between gap-3 mb-4 flex-wrap">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "rgba(100,116,139,0.6)" }}>Order</span>
                        <span className="text-[10px] font-mono" style={{ color: "rgba(100,116,139,0.4)" }}>
                          #{order.id.includes("_") ? order.id.split("_")[1] : order.id.slice(0, 8)}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs" style={{ color: "rgba(100,116,139,0.6)" }}>
                        <Clock size={11} />
                        {date.toLocaleDateString("en-PK", { day: "numeric", month: "short", year: "numeric" })} at {date.toLocaleTimeString("en-PK", { hour: "2-digit", minute: "2-digit" })}
                      </div>
                    </div>

                    <span className="text-[11px] font-bold px-3 py-1 rounded-full shrink-0 flex items-center gap-1.5"
                      style={statusStyle(order.status)}>
                      {isApproved && <CheckCircle2 size={11} />}
                      {isCancelled && <XCircle size={11} />}
                      {!isApproved && !isCancelled && <Clock size={11} />}
                      {statusLabel(order.status)}
                    </span>
                  </div>

                  {isApproved && (
                    <div className="flex items-center gap-2 text-xs px-3 py-2 rounded-xl mb-4"
                      style={{ background: "rgba(34,197,94,0.06)", border: "1px solid rgba(34,197,94,0.15)", color: "rgba(74,222,128,0.8)" }}>
                      <CheckCircle2 size={12} />
                      Your order has been approved by Pixora! We&apos;ll be in touch shortly.
                    </div>
                  )}

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

                  <div className="h-px mb-4" style={{ background: "rgba(255,255,255,0.06)" }} />

                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <div className="flex items-center gap-2">
                      {isCancelled
                        ? <XCircle size={14} style={{ color: "#f87171" }} />
                        : isApproved
                          ? <CheckCircle2 size={14} style={{ color: "#4ade80" }} />
                          : <PackageCheck size={14} style={{ color: "#fbbf24" }} />
                      }
                      <span className="font-extrabold text-base"
                        style={{ background: "linear-gradient(135deg,#60a5fa,#a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                        ₨ {order.total.toLocaleString()}
                      </span>
                    </div>

                    {!isCancelled && !isApproved && (
                      <button onClick={() => handleCancel(order)} disabled={isCancellingThis}
                        className="flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-xl transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                        style={{ color: "rgba(248,113,113,0.8)", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }}
                        onMouseEnter={e => { if (!isCancellingThis) { (e.currentTarget as HTMLElement).style.background = "rgba(239,68,68,0.18)"; (e.currentTarget as HTMLElement).style.color = "#fca5a5"; } }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(239,68,68,0.08)"; (e.currentTarget as HTMLElement).style.color = "rgba(248,113,113,0.8)"; }}>
                        {isCancellingThis
                          ? <><Loader2 size={11} className="animate-spin" /> Cancelling…</>
                          : <><XCircle size={11} /> Cancel Order</>}
                      </button>
                    )}
                  </div>

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
          <div className="mt-8 flex items-center justify-between flex-wrap gap-4">
            <Link href="/shop"
              className="inline-flex items-center gap-2 text-sm font-medium"
              style={{ color: "rgba(100,116,139,0.5)" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#60a5fa"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "rgba(100,116,139,0.5)"}>
              ← Continue Shopping
            </Link>

            {/* Clear history */}
            {!confirmClear ? (
              <button onClick={() => setConfirmClear(true)}
                className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl transition-all"
                style={{ color: "rgba(248,113,113,0.6)", background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.15)" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(239,68,68,0.12)"; (e.currentTarget as HTMLElement).style.color = "#fca5a5"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(239,68,68,0.06)"; (e.currentTarget as HTMLElement).style.color = "rgba(248,113,113,0.6)"; }}>
                <Trash2 size={11} /> Clear History
              </button>
            ) : (
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-semibold" style={{ color: "#f87171" }}>Remove approved &amp; cancelled orders?</span>
                <button onClick={handleClearHistory} disabled={clearing}
                  className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl disabled:opacity-60"
                  style={{ background: "rgba(239,68,68,0.15)", color: "#f87171", border: "1px solid rgba(239,68,68,0.3)" }}>
                  {clearing ? <><Loader2 size={11} className="animate-spin" /> Clearing…</> : "Yes, clear all"}
                </button>
                <button onClick={() => setConfirmClear(false)}
                  className="text-xs font-bold px-3 py-1.5 rounded-xl"
                  style={{ background: "rgba(255,255,255,0.05)", color: "rgba(148,163,184,0.7)", border: "1px solid rgba(255,255,255,0.1)" }}>
                  Cancel
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
