"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Loader2, Trash2, ShoppingBag, Users, CheckCircle2, AlertTriangle, UserPlus, X, Mail } from "lucide-react";

type SubAdmin = { id: string; email: string; invited_by: string; created_at: string };

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

  const [subAdmins, setSubAdmins] = useState<SubAdmin[]>([]);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviting, setInviting] = useState(false);
  const [inviteError, setInviteError] = useState("");
  const [removingEmail, setRemovingEmail] = useState<string | null>(null);

  const loadSubAdmins = () =>
    fetch("/api/admin/sub-admins").then(r => r.json()).then(d => Array.isArray(d) && setSubAdmins(d));

  useEffect(() => { loadSubAdmins(); }, []);

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    setInviting(true); setInviteError("");
    const res = await fetch("/api/admin/sub-admins", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ inviteEmail }),
    });
    const data = await res.json();
    if (!res.ok) { setInviteError(data.error ?? "Failed"); setInviting(false); return; }
    setInviteEmail("");
    setInviting(false);
    loadSubAdmins();
  };

  const handleRemove = async (email: string) => {
    setRemovingEmail(email);
    await fetch("/api/admin/sub-admins", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ inviteEmail: email }),
    });
    setRemovingEmail(null);
    loadSubAdmins();
  };

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
  ];

  return (
    <div className="p-6" style={{ minHeight: "100vh", background: "#060d1f" }}>
      <div className="mb-8">
        <h1 className="text-xl font-extrabold" style={{ color: "#e2e8f0" }}>Settings</h1>
        <p className="text-xs mt-0.5" style={{ color: "rgba(100,116,139,0.6)" }}>Manage data and history</p>
      </div>

      {/* Team Access */}
      <div className="rounded-2xl overflow-hidden mb-6"
        style={{ background: "#0b1120", border: "1px solid rgba(0,151,178,0.2)" }}>
        <div className="h-0.75" style={{ background: "linear-gradient(to right,#0097B2,#0891b2)" }} />
        <div className="px-5 py-4 flex items-center gap-2" style={{ borderBottom: "1px solid rgba(0,151,178,0.1)" }}>
          <UserPlus size={14} style={{ color: "#0097B2" }} />
          <span className="text-sm font-bold" style={{ color: "#0097B2" }}>Team Access</span>
          <span className="text-xs ml-1" style={{ color: "rgba(100,116,139,0.5)" }}>— sub-admins can access everything except Settings</span>
        </div>

        {/* Invite form */}
        <div className="px-5 py-5" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          <p className="text-xs font-semibold mb-3" style={{ color: "rgba(148,163,184,0.7)" }}>Add admin access by email</p>
          <form onSubmit={handleInvite} className="flex gap-2">
            <div className="flex-1 relative">
              <Mail size={13} className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "rgba(100,116,139,0.5)" }} />
              <input
                type="email" required value={inviteEmail}
                onChange={e => { setInviteEmail(e.target.value); setInviteError(""); }}
                placeholder="colleague@email.com"
                className="w-full pl-8 pr-3 py-2.5 text-xs rounded-xl outline-none"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#e2e8f0" }} />
            </div>
            <button type="submit" disabled={inviting}
              className="flex items-center gap-1.5 text-xs font-bold px-4 py-2.5 rounded-xl disabled:opacity-60"
              style={{ background: "rgba(0,151,178,0.15)", color: "#0097B2", border: "1px solid rgba(0,151,178,0.3)" }}>
              {inviting ? <Loader2 size={11} className="animate-spin" /> : <UserPlus size={11} />}
              Add
            </button>
          </form>
          {inviteError && <p className="text-xs mt-2" style={{ color: "#f87171" }}>{inviteError}</p>}
        </div>

        {/* Sub-admins list */}
        {subAdmins.length === 0 ? (
          <div className="px-5 py-6 text-center">
            <p className="text-xs" style={{ color: "rgba(100,116,139,0.4)" }}>No sub-admins added yet</p>
          </div>
        ) : (
          subAdmins.map((sa, i) => (
            <div key={sa.id} className="flex items-center justify-between gap-3 px-5 py-3"
              style={{ borderBottom: i < subAdmins.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
              <div className="min-w-0">
                <p className="text-sm font-semibold truncate" style={{ color: "#e2e8f0" }}>{sa.email}</p>
                <p className="text-[10px]" style={{ color: "rgba(100,116,139,0.5)" }}>
                  Added by {sa.invited_by} · {new Date(sa.created_at).toLocaleDateString()}
                </p>
              </div>
              <button onClick={() => handleRemove(sa.email)} disabled={removingEmail === sa.email}
                className="flex items-center gap-1 text-xs font-bold px-2.5 py-1.5 rounded-lg shrink-0 disabled:opacity-50"
                style={{ background: "rgba(239,68,68,0.08)", color: "#f87171", border: "1px solid rgba(239,68,68,0.2)" }}>
                {removingEmail === sa.email ? <Loader2 size={10} className="animate-spin" /> : <X size={10} />}
                Remove
              </button>
            </div>
          ))
        )}
      </div>

      {/* Danger Zone */}
      <div className="rounded-2xl overflow-hidden mb-6"
        style={{ background: "#0b1120", border: "1px solid rgba(239,68,68,0.2)" }}>
        <div className="h-0.75" style={{ background: "linear-gradient(to right,#ef4444,#b91c1c)" }} />
        <div className="px-5 py-4 flex items-start gap-2 flex-wrap" style={{ borderBottom: "1px solid rgba(239,68,68,0.1)" }}>
          <AlertTriangle size={14} style={{ color: "#f87171", flexShrink: 0, marginTop: 2 }} />
          <span className="text-sm font-bold" style={{ color: "#f87171" }}>Danger Zone</span>
          <span className="text-xs" style={{ color: "rgba(100,116,139,0.5)" }}>— permanent, cannot be undone</span>
        </div>

        {ACTIONS.map((action, i) => {
          const isConfirming = confirming === action.key;
          const isLoading = loading === action.key;
          const isDone = done === action.key;
          const Icon = action.icon;

          return (
            <div key={action.key}
              className="flex flex-col gap-4 px-5 py-5"
              style={{ borderBottom: i < ACTIONS.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>

              {/* Info */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                  style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}>
                  <Icon size={14} style={{ color: action.color }} />
                </div>
                <div>
                  <p className="text-sm font-bold mb-0.5" style={{ color: "#e2e8f0" }}>{action.title}</p>
                  <p className="text-xs leading-relaxed" style={{ color: "rgba(100,116,139,0.6)" }}>{action.description}</p>
                </div>
              </div>

              {/* Action */}
              <div className="flex flex-col gap-2">
                {isDone ? (
                  <div className="flex items-center gap-1.5 text-xs font-semibold" style={{ color: "#4ade80" }}>
                    <CheckCircle2 size={13} /> Done
                  </div>
                ) : isConfirming ? (
                  <>
                    <p className="text-xs font-semibold" style={{ color: "#f87171" }}>{action.confirm}</p>
                    <div className="flex gap-2">
                      <button onClick={() => runAction(action.key, action.run)} disabled={isLoading}
                        className="flex-1 flex items-center justify-center gap-1.5 text-xs font-bold px-3 py-2 rounded-lg disabled:opacity-60"
                        style={{ background: "rgba(239,68,68,0.15)", color: "#f87171", border: "1px solid rgba(239,68,68,0.3)" }}>
                        {isLoading ? <><Loader2 size={11} className="animate-spin" /> Deleting…</> : "Yes, delete"}
                      </button>
                      <button onClick={() => setConfirming(null)}
                        className="flex-1 text-xs font-bold px-3 py-2 rounded-lg"
                        style={{ background: "rgba(255,255,255,0.05)", color: "rgba(148,163,184,0.7)", border: "1px solid rgba(255,255,255,0.1)" }}>
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <button onClick={() => setConfirming(action.key)}
                    className="w-full flex items-center justify-center gap-1.5 text-xs font-bold px-3 py-2.5 rounded-lg transition-all"
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
