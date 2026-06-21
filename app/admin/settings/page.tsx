"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Loader2, Trash2, ShoppingBag, Users, CheckCircle2, AlertTriangle } from "lucide-react";

type Action = {
  key: string;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  confirm: string;
  run: () => Promise<void>;
};

export default function AdminSettingsPage() {
  const [confirming, setConfirming] = useState<string | null>(null);
  const [loading, setLoading] = useState<string | null>(null);
  const [done, setDone] = useState<string | null>(null);

  const runAction = async (key: string, fn: () => Promise<void>) => {
    setLoading(key);
    await fn();
    setLoading(null);
    setConfirming(null);
    setDone(key);
    setTimeout(() => setDone(null), 3000);
  };

  const ACTIONS: Action[] = [
    {
      key: "clear_customers",
      title: "Clear Customer History",
      description: "Delete all non-admin Clerk accounts AND all orders from the database. The Customers page and Orders page will show 0. Admin accounts are kept.",
      icon: Users,
      color: "#f87171",
      confirm: "Delete all customer accounts and orders permanently?",
      run: async () => {
        await fetch("/api/admin/clear-customers", { method: "DELETE" });
        await supabase.from("orders").delete().gte("created_at", "1970-01-01T00:00:00.000Z");
      },
    },
    {
      key: "clear_all_orders",
      title: "Clear All Orders",
      description: "Permanently delete every order from the database AND remove all non-admin customer accounts. Both the Orders and Customers pages will show 0.",
      icon: ShoppingBag,
      color: "#f87171",
      confirm: "Delete all orders and customer accounts permanently?",
      run: async () => {
        await fetch("/api/admin/clear-customers", { method: "DELETE" });
        await supabase.from("orders").delete().gte("created_at", "1970-01-01T00:00:00.000Z");
      },
    },
    {
      key: "clear_guest_orders",
      title: "Clear Guest Orders",
      description: "Delete all orders placed by guests (no account). Registered customers keep their order history.",
      icon: Users,
      color: "#fbbf24",
      confirm: "Delete all guest orders permanently?",
      run: async () => {
        await supabase.from("orders").delete().is("user_id", null);
      },
    },
    {
      key: "clear_cancelled",
      title: "Clear Cancelled Orders",
      description: "Remove all cancelled orders from the database to keep the orders list clean.",
      icon: Trash2,
      color: "#f87171",
      confirm: "Delete all cancelled orders permanently?",
      run: async () => {
        await supabase.from("orders").delete().eq("status", "cancelled");
      },
    },
  ];

  return (
    <div className="p-6" style={{ minHeight: "100vh", background: "#060d1f" }}>
      <div className="mb-8">
        <h1 className="text-xl font-extrabold" style={{ color: "#e2e8f0" }}>Settings</h1>
        <p className="text-xs mt-0.5" style={{ color: "rgba(100,116,139,0.6)" }}>Manage data and history</p>
      </div>

      {/* Danger Zone */}
      <div className="rounded-2xl overflow-hidden mb-6"
        style={{ background: "#0b1120", border: "1px solid rgba(239,68,68,0.2)" }}>
        <div className="h-0.75" style={{ background: "linear-gradient(to right,#ef4444,#b91c1c)" }} />
        <div className="px-5 py-4 flex items-center gap-2" style={{ borderBottom: "1px solid rgba(239,68,68,0.1)" }}>
          <AlertTriangle size={14} style={{ color: "#f87171" }} />
          <span className="text-sm font-bold" style={{ color: "#f87171" }}>Danger Zone</span>
          <span className="text-xs ml-1" style={{ color: "rgba(100,116,139,0.5)" }}>— these actions are permanent and cannot be undone</span>
        </div>

        {ACTIONS.map((action, i) => {
          const isConfirming = confirming === action.key;
          const isLoading = loading === action.key;
          const isDone = done === action.key;
          const Icon = action.icon;

          return (
            <div key={action.key}
              className="flex items-start justify-between gap-4 px-5 py-5 flex-wrap gap-y-3"
              style={{ borderBottom: i < ACTIONS.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>

              {/* Info */}
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                  style={{ background: `rgba(${action.color === "#f87171" ? "239,68,68" : "251,191,36"},0.1)`, border: `1px solid rgba(${action.color === "#f87171" ? "239,68,68" : "251,191,36"},0.2)` }}>
                  <Icon size={14} style={{ color: action.color }} />
                </div>
                <div>
                  <p className="text-sm font-bold mb-0.5" style={{ color: "#e2e8f0" }}>{action.title}</p>
                  <p className="text-xs leading-relaxed" style={{ color: "rgba(100,116,139,0.6)" }}>{action.description}</p>
                </div>
              </div>

              {/* Action */}
              <div className="flex items-center gap-2 flex-wrap shrink-0">
                {isDone ? (
                  <div className="flex items-center gap-1.5 text-xs font-semibold" style={{ color: "#4ade80" }}>
                    <CheckCircle2 size={13} /> Done
                  </div>
                ) : isConfirming ? (
                  <>
                    <span className="text-xs font-semibold" style={{ color: "#f87171" }}>{action.confirm}</span>
                    <button onClick={() => runAction(action.key, action.run)} disabled={isLoading}
                      className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg disabled:opacity-60"
                      style={{ background: "rgba(239,68,68,0.15)", color: "#f87171", border: "1px solid rgba(239,68,68,0.3)" }}>
                      {isLoading ? <><Loader2 size={11} className="animate-spin" /> Deleting…</> : "Yes, delete"}
                    </button>
                    <button onClick={() => setConfirming(null)}
                      className="text-xs font-bold px-3 py-1.5 rounded-lg"
                      style={{ background: "rgba(255,255,255,0.05)", color: "rgba(148,163,184,0.7)", border: "1px solid rgba(255,255,255,0.1)" }}>
                      Cancel
                    </button>
                  </>
                ) : (
                  <button onClick={() => setConfirming(action.key)}
                    className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg transition-all"
                    style={{ background: "rgba(239,68,68,0.08)", color: "#f87171", border: "1px solid rgba(239,68,68,0.2)" }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "rgba(239,68,68,0.18)"}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "rgba(239,68,68,0.08)"}>
                    <Trash2 size={11} /> {action.title}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
