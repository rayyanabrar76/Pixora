"use client";

import { useEffect, useState, useMemo } from "react";
import { supabase, type DbOrder } from "@/lib/supabase";
import {
  Users, Loader2, ShoppingBag, UserCheck, UserX, ChevronDown, ChevronUp,
  Clock, Mail, Package,
} from "lucide-react";

type ClerkUser = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  imageUrl: string;
  createdAt: number;
  lastSignInAt: number | null;
};

type Customer = {
  key: string;
  name: string;
  email: string;
  imageUrl?: string;
  type: "registered" | "guest";
  clerkId?: string;
  joinedAt?: number;
  lastSignInAt?: number | null;
  orders: DbOrder[];
};

const FILTER_TABS = [
  { key: "all",        label: "All" },
  { key: "registered", label: "Registered" },
  { key: "ordered",    label: "Ordered" },
  { key: "guest",      label: "Guest" },
] as const;
type FilterKey = typeof FILTER_TABS[number]["key"];

function Avatar({ name, imageUrl, size = 36 }: { name: string; imageUrl?: string; size?: number }) {
  const initials = name.trim().split(" ").map(p => p[0]).slice(0, 2).join("").toUpperCase() || "?";
  if (imageUrl && !imageUrl.includes("gravatar")) {
    return <img src={imageUrl} alt={name} width={size} height={size}
      style={{ borderRadius: "50%", objectFit: "cover", width: size, height: size, flexShrink: 0 }} />;
  }
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%", flexShrink: 0,
      background: "linear-gradient(135deg,#2563eb,#7c3aed)",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: size * 0.35, fontWeight: 800, color: "#fff",
    }}>
      {initials}
    </div>
  );
}

export default function AdminCustomersPage() {
  const [clerkUsers, setClerkUsers] = useState<ClerkUser[]>([]);
  const [orders, setOrders] = useState<DbOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterKey>("all");
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/customers").then(r => r.json()),
      supabase.from("orders").select("*").order("created_at", { ascending: false }).then(({ data }) => data ?? []),
    ]).then(([users, dbOrders]) => {
      setClerkUsers(Array.isArray(users) ? users : []);
      setOrders(dbOrders as DbOrder[]);
      setLoading(false);
    });
  }, []);

  const customers = useMemo<Customer[]>(() => {
    const map = new Map<string, Customer>();

    const adminEmails = (process.env.NEXT_PUBLIC_ADMIN_EMAILS || "").split(",").map(e => e.trim()).filter(Boolean);

    // Registered Clerk users (exclude admins)
    for (const u of clerkUsers.filter(u => !adminEmails.includes(u.email))) {
      const name = [u.firstName, u.lastName].filter(Boolean).join(" ") || u.email;
      map.set(u.id, {
        key: u.id,
        name,
        email: u.email,
        imageUrl: u.imageUrl,
        type: "registered",
        clerkId: u.id,
        joinedAt: u.createdAt,
        lastSignInAt: u.lastSignInAt,
        orders: [],
      });
    }

    // Attach orders to registered users, collect guest orders
    for (const o of orders) {
      if (o.user_id && map.has(o.user_id)) {
        map.get(o.user_id)!.orders.push(o);
      } else if (!o.user_id && !adminEmails.includes(o.user_email)) {
        // Guest — group by email (skip admin emails)
        const key = `guest_${o.user_email}`;
        if (!map.has(key)) {
          map.set(key, {
            key,
            name: o.user_name || o.user_email,
            email: o.user_email,
            type: "guest",
            orders: [],
          });
        }
        map.get(key)!.orders.push(o);
      }
    }

    return Array.from(map.values()).sort((a, b) => {
      const aLast = a.orders[0]?.created_at ?? (a.joinedAt ? new Date(a.joinedAt).toISOString() : "");
      const bLast = b.orders[0]?.created_at ?? (b.joinedAt ? new Date(b.joinedAt).toISOString() : "");
      return bLast.localeCompare(aLast);
    });
  }, [clerkUsers, orders]);

  const filtered = useMemo(() => {
    if (filter === "all") return customers;
    if (filter === "registered") return customers.filter(c => c.type === "registered");
    if (filter === "guest") return customers.filter(c => c.type === "guest");
    if (filter === "ordered") return customers.filter(c => c.orders.length > 0);
    return customers;
  }, [customers, filter]);

  const stats = {
    total: customers.length,
    registered: customers.filter(c => c.type === "registered").length,
    ordered: customers.filter(c => c.orders.length > 0).length,
    guests: customers.filter(c => c.type === "guest").length,
  };

  return (
    <div className="p-6" style={{ minHeight: "100vh", background: "#060d1f" }}>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-extrabold" style={{ color: "#e2e8f0" }}>Customers</h1>
        <p className="text-xs mt-0.5" style={{ color: "rgba(100,116,139,0.6)" }}>
          {stats.total} total · {stats.registered} registered · {stats.guests} guest · {stats.ordered} ordered
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Total", value: stats.total,      icon: Users,      color: "#60a5fa" },
          { label: "Registered", value: stats.registered, icon: UserCheck, color: "#a78bfa" },
          { label: "Ordered",    value: stats.ordered,    icon: ShoppingBag, color: "#4ade80" },
          { label: "Guest",      value: stats.guests,     icon: UserX,    color: "#fbbf24" },
        ].map(s => (
          <div key={s.label} className="rounded-xl p-4"
            style={{ background: "#0b1120", border: "1px solid rgba(255,255,255,0.06)" }}>
            <s.icon size={15} style={{ color: s.color, marginBottom: 8 }} />
            <p className="text-2xl font-extrabold" style={{ color: "#e2e8f0" }}>{s.value}</p>
            <p className="text-xs mt-0.5" style={{ color: "rgba(100,116,139,0.55)" }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div className="flex rounded-xl overflow-hidden mb-4 w-fit" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
        {FILTER_TABS.map(tab => (
          <button key={tab.key} onClick={() => setFilter(tab.key)}
            className="px-4 py-1.5 text-xs font-bold transition-all"
            style={filter === tab.key
              ? { background: "rgba(37,99,235,0.18)", color: "#60a5fa" }
              : { background: "transparent", color: "rgba(100,116,139,0.6)" }}>
            {tab.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 size={24} className="animate-spin" style={{ color: "#60a5fa" }} />
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl p-16 text-center"
          style={{ background: "#0b1120", border: "1px solid rgba(255,255,255,0.06)" }}>
          <Users size={28} className="mx-auto mb-3" style={{ color: "rgba(100,116,139,0.25)" }} />
          <p className="font-bold mb-1" style={{ color: "#e2e8f0" }}>No customers yet</p>
          <p className="text-sm" style={{ color: "rgba(100,116,139,0.5)" }}>Customers will appear here once someone signs in or places an order.</p>
        </div>
      ) : (
        <div className="rounded-2xl overflow-hidden"
          style={{ background: "#0b1120", border: "1px solid rgba(255,255,255,0.07)" }}>
          <div className="h-0.75" style={{ background: "linear-gradient(to right,#2563eb,#7c3aed)" }} />

          {filtered.map((c, i) => {
            const isOpen = expanded === c.key;
            const totalSpent = c.orders.reduce((s, o) => s + o.total, 0);
            const lastOrder = c.orders[0];
            const isGuest = c.type === "guest";

            return (
              <div key={c.key}
                style={{ borderBottom: i < filtered.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>

                {/* Row */}
                <button
                  className="w-full flex items-center gap-4 px-5 py-4 text-left transition-all flex-wrap"
                  style={{ background: isOpen ? "rgba(37,99,235,0.04)" : "transparent" }}
                  onClick={() => setExpanded(isOpen ? null : c.key)}>

                  <Avatar name={c.name} imageUrl={c.imageUrl} size={36} />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-bold" style={{ color: "#e2e8f0" }}>{c.name}</span>
                      {/* Type badge */}
                      <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded-md uppercase tracking-wider"
                        style={isGuest
                          ? { background: "rgba(251,191,36,0.12)", color: "#fbbf24", border: "1px solid rgba(251,191,36,0.2)" }
                          : { background: "rgba(167,139,250,0.12)", color: "#a78bfa", border: "1px solid rgba(167,139,250,0.2)" }}>
                        {isGuest ? "Guest" : "Registered"}
                      </span>
                      {c.orders.length > 0 && (
                        <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded-md uppercase tracking-wider"
                          style={{ background: "rgba(34,197,94,0.1)", color: "#4ade80", border: "1px solid rgba(34,197,94,0.2)" }}>
                          {c.orders.length} order{c.orders.length !== 1 ? "s" : ""}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <Mail size={10} style={{ color: "rgba(100,116,139,0.5)", flexShrink: 0 }} />
                      <p className="text-xs truncate" style={{ color: "rgba(100,116,139,0.6)" }}>{c.email}</p>
                    </div>
                  </div>

                  {/* Right side */}
                  <div className="shrink-0 text-right hidden sm:block">
                    {totalSpent > 0 ? (
                      <>
                        <span className="text-sm font-extrabold"
                          style={{ background: "linear-gradient(135deg,#60a5fa,#a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                          Rs. {totalSpent.toLocaleString()}
                        </span>
                        <p className="text-[10px] mt-0.5" style={{ color: "rgba(100,116,139,0.5)" }}>total spent</p>
                      </>
                    ) : (
                      <p className="text-xs" style={{ color: "rgba(100,116,139,0.35)" }}>No orders</p>
                    )}
                  </div>

                  {/* Date */}
                  <div className="shrink-0 text-right hidden md:block">
                    {lastOrder ? (
                      <>
                        <p className="text-[10px]" style={{ color: "rgba(100,116,139,0.5)" }}>last order</p>
                        <p className="text-[10px] font-semibold" style={{ color: "rgba(148,163,184,0.6)" }}>
                          {new Date(lastOrder.created_at).toLocaleDateString("en-PK", { day: "numeric", month: "short" })}
                        </p>
                      </>
                    ) : c.joinedAt ? (
                      <>
                        <p className="text-[10px]" style={{ color: "rgba(100,116,139,0.5)" }}>joined</p>
                        <p className="text-[10px] font-semibold" style={{ color: "rgba(148,163,184,0.6)" }}>
                          {new Date(c.joinedAt).toLocaleDateString("en-PK", { day: "numeric", month: "short", year: "numeric" })}
                        </p>
                      </>
                    ) : null}
                  </div>

                  <div className="shrink-0" style={{ color: "rgba(100,116,139,0.4)" }}>
                    {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </div>
                </button>

                {/* Expanded */}
                {isOpen && (
                  <div className="px-5 pb-5 grid grid-cols-1 sm:grid-cols-2 gap-4"
                    style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>

                    {/* Info card */}
                    <div className="rounded-xl p-4"
                      style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                      <p className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: "rgba(100,116,139,0.5)" }}>
                        {isGuest ? "Guest Info" : "Account Info"}
                      </p>
                      <div className="flex flex-col gap-2 text-xs">
                        <div className="flex items-center gap-2" style={{ color: "#cbd5e1" }}>
                          <Mail size={11} style={{ color: "#60a5fa", flexShrink: 0 }} />
                          {c.email}
                        </div>
                        {c.joinedAt && (
                          <div className="flex items-center gap-2" style={{ color: "#cbd5e1" }}>
                            <Clock size={11} style={{ color: "#60a5fa", flexShrink: 0 }} />
                            Joined {new Date(c.joinedAt).toLocaleDateString("en-PK", { dateStyle: "long" })}
                          </div>
                        )}
                        {c.lastSignInAt && (
                          <div className="flex items-center gap-2" style={{ color: "#cbd5e1" }}>
                            <UserCheck size={11} style={{ color: "#4ade80", flexShrink: 0 }} />
                            Last sign-in {new Date(c.lastSignInAt).toLocaleDateString("en-PK", { dateStyle: "medium" })}
                          </div>
                        )}
                        {isGuest && (
                          <div className="text-[10px] px-2 py-1.5 rounded-lg mt-1"
                            style={{ background: "rgba(251,191,36,0.07)", border: "1px solid rgba(251,191,36,0.15)", color: "rgba(251,191,36,0.7)" }}>
                            Checked out without creating an account
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Orders card */}
                    <div className="rounded-xl p-4"
                      style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                      <p className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: "rgba(100,116,139,0.5)" }}>
                        {c.orders.length > 0 ? `Orders (${c.orders.length})` : "No Orders"}
                      </p>
                      {c.orders.length === 0 ? (
                        <div className="flex items-center gap-2 text-xs" style={{ color: "rgba(100,116,139,0.4)" }}>
                          <Package size={12} />
                          This customer hasn&apos;t placed any orders yet.
                        </div>
                      ) : (
                        <ul className="flex flex-col gap-2.5">
                          {c.orders.map(o => (
                            <li key={o.id} className="flex items-center justify-between gap-2 text-xs">
                              <div className="min-w-0">
                                <p className="truncate" style={{ color: "#cbd5e1" }}>
                                  {o.items.map(it => it.name).join(", ")}
                                </p>
                                <p className="text-[10px] mt-0.5" style={{ color: "rgba(100,116,139,0.5)" }}>
                                  {new Date(o.created_at).toLocaleDateString("en-PK", { day: "numeric", month: "short", year: "numeric" })}
                                  {" · "}
                                  <span style={{
                                    color: o.status === "approved" ? "#4ade80" : o.status === "cancelled" ? "#f87171" : "#fbbf24"
                                  }}>
                                    {o.status.charAt(0).toUpperCase() + o.status.slice(1)}
                                  </span>
                                </p>
                              </div>
                              <span className="shrink-0 font-semibold" style={{ color: "#94a3b8" }}>
                                Rs. {o.total.toLocaleString()}
                              </span>
                            </li>
                          ))}
                        </ul>
                      )}
                      {totalSpent > 0 && (
                        <div className="flex items-center justify-between mt-3 pt-3"
                          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                          <span className="text-xs font-bold" style={{ color: "rgba(100,116,139,0.6)" }}>Total spent</span>
                          <span className="text-sm font-extrabold"
                            style={{ background: "linear-gradient(135deg,#60a5fa,#a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                            Rs. {totalSpent.toLocaleString()}
                          </span>
                        </div>
                      )}
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
