"use client";

import { useEffect, useState } from "react";
import { supabase, type DbOrder } from "@/lib/supabase";
import { ShoppingBag, Loader2, CheckCircle2, Clock, ChevronDown, ChevronUp, Mail, Phone, StickyNote } from "lucide-react";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<DbOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "new" | "seen">("all");

  const loadOrders = async () => {
    const { data } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setOrders(data as DbOrder[]);
    setLoading(false);
  };

  useEffect(() => { loadOrders(); }, []);

  const markSeen = async (id: string) => {
    await supabase.from("orders").update({ status: "seen" }).eq("id", id);
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: "seen" } : o));
  };

  const filtered = orders.filter(o => filter === "all" || o.status === filter);
  const newCount = orders.filter(o => o.status === "new").length;

  return (
    <div className="p-6" style={{ minHeight: "100vh", background: "#060d1f" }}>
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
        <div>
          <h1 className="text-xl font-extrabold" style={{ color: "#e2e8f0" }}>Orders</h1>
          <p className="text-xs mt-0.5" style={{ color: "rgba(100,116,139,0.6)" }}>
            {orders.length} total · {newCount} new
          </p>
        </div>
        {/* Filter tabs */}
        <div className="flex rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
          {(["all", "new", "seen"] as const).map(tab => (
            <button key={tab} onClick={() => setFilter(tab)}
              className="px-4 py-1.5 text-xs font-bold capitalize transition-all"
              style={filter === tab
                ? { background: "rgba(37,99,235,0.18)", color: "#60a5fa" }
                : { background: "transparent", color: "rgba(100,116,139,0.6)" }}>
              {tab}{tab === "new" && newCount > 0 ? ` (${newCount})` : ""}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 size={24} className="animate-spin" style={{ color: "#60a5fa" }} />
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl p-16 text-center"
          style={{ background: "#0b1120", border: "1px solid rgba(255,255,255,0.06)" }}>
          <ShoppingBag size={28} className="mx-auto mb-3" style={{ color: "rgba(100,116,139,0.25)" }} />
          <p className="font-bold mb-1" style={{ color: "#e2e8f0" }}>No orders yet</p>
          <p className="text-sm" style={{ color: "rgba(100,116,139,0.5)" }}>Orders will appear here once customers checkout.</p>
        </div>
      ) : (
        <div className="rounded-2xl overflow-hidden"
          style={{ background: "#0b1120", border: "1px solid rgba(255,255,255,0.07)" }}>
          <div className="h-0.75" style={{ background: "linear-gradient(to right,#2563eb,#7c3aed)" }} />
          {filtered.map((order, i) => {
            const isNew = order.status === "new";
            const isOpen = expanded === order.id;
            const date = new Date(order.created_at);

            return (
              <div key={order.id}
                style={{ borderBottom: i < filtered.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>

                {/* Row */}
                <button
                  className="w-full flex items-center gap-4 px-5 py-4 text-left transition-all flex-wrap"
                  style={{ background: isOpen ? "rgba(37,99,235,0.04)" : "transparent" }}
                  onClick={() => {
                    setExpanded(isOpen ? null : order.id);
                    if (isNew) markSeen(order.id);
                  }}>

                  {/* New dot */}
                  <div className="shrink-0 w-2 h-2 rounded-full"
                    style={{ background: isNew ? "#60a5fa" : "rgba(255,255,255,0.08)" }} />

                  {/* User info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-bold" style={{ color: "#e2e8f0" }}>{order.user_name || "Guest"}</span>
                      {isNew && (
                        <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded-md uppercase tracking-wider"
                          style={{ background: "rgba(37,99,235,0.15)", color: "#60a5fa", border: "1px solid rgba(37,99,235,0.25)" }}>
                          New
                        </span>
                      )}
                    </div>
                    <p className="text-xs mt-0.5" style={{ color: "rgba(100,116,139,0.6)" }}>{order.user_email}</p>
                  </div>

                  {/* Items summary */}
                  <div className="hidden sm:block text-xs shrink-0" style={{ color: "rgba(148,163,184,0.6)", maxWidth: 200 }}>
                    {order.items.map(it => it.name).join(", ")}
                  </div>

                  {/* Total */}
                  <div className="shrink-0 text-right">
                    <span className="text-sm font-extrabold"
                      style={{ background: "linear-gradient(135deg,#60a5fa,#a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                      Rs. {order.total.toLocaleString()}
                    </span>
                    <p className="text-[10px] mt-0.5" style={{ color: "rgba(100,116,139,0.5)" }}>
                      {date.toLocaleDateString("en-PK", { day: "numeric", month: "short", year: "numeric" })}
                    </p>
                  </div>

                  <div className="shrink-0" style={{ color: "rgba(100,116,139,0.4)" }}>
                    {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </div>
                </button>

                {/* Expanded detail */}
                {isOpen && (
                  <div className="px-5 pb-5 grid grid-cols-1 sm:grid-cols-2 gap-4"
                    style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>

                    {/* Contact */}
                    <div className="rounded-xl p-4"
                      style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                      <p className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: "rgba(100,116,139,0.5)" }}>Contact</p>
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-xs" style={{ color: "#cbd5e1" }}>
                          <Mail size={11} style={{ color: "#60a5fa", flexShrink: 0 }} />
                          {order.user_email}
                        </div>
                        {order.phone && (
                          <div className="flex items-center gap-2 text-xs" style={{ color: "#cbd5e1" }}>
                            <Phone size={11} style={{ color: "#60a5fa", flexShrink: 0 }} />
                            {order.phone}
                          </div>
                        )}
                        {order.notes && (
                          <div className="flex items-start gap-2 text-xs mt-1" style={{ color: "#cbd5e1" }}>
                            <StickyNote size={11} style={{ color: "#a78bfa", flexShrink: 0, marginTop: 1 }} />
                            <span style={{ color: "rgba(148,163,184,0.7)" }}>{order.notes}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Items */}
                    <div className="rounded-xl p-4"
                      style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                      <p className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: "rgba(100,116,139,0.5)" }}>Items Ordered</p>
                      <ul className="flex flex-col gap-2">
                        {order.items.map((it, j) => (
                          <li key={j} className="flex items-center justify-between gap-2 text-xs">
                            <div className="flex items-center gap-2 min-w-0">
                              <CheckCircle2 size={10} style={{ color: "#4ade80", flexShrink: 0 }} />
                              <span className="truncate" style={{ color: "#cbd5e1" }}>{it.name}</span>
                              {it.qty > 1 && <span style={{ color: "rgba(100,116,139,0.5)" }}>×{it.qty}</span>}
                            </div>
                            <span className="shrink-0 font-semibold" style={{ color: "#94a3b8" }}>
                              Rs. {(it.price * it.qty).toLocaleString()}
                            </span>
                          </li>
                        ))}
                      </ul>
                      <div className="flex items-center justify-between mt-3 pt-3"
                        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                        <span className="text-xs font-bold" style={{ color: "rgba(100,116,139,0.6)" }}>Total</span>
                        <span className="text-sm font-extrabold"
                          style={{ background: "linear-gradient(135deg,#60a5fa,#a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                          Rs. {order.total.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Timestamp */}
                    <div className="sm:col-span-2 flex items-center gap-2 text-xs" style={{ color: "rgba(100,116,139,0.4)" }}>
                      <Clock size={10} />
                      Placed on {date.toLocaleString("en-PK", { dateStyle: "long", timeStyle: "short" })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
