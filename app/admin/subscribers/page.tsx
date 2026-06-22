"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Mail, Trash2, Users } from "lucide-react";

type Subscriber = {
  id: string;
  email: string;
  created_at: string;
};

export default function SubscribersPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);

  useEffect(() => {
    supabase
      .from("newsletter_subscribers")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        if (data) setSubscribers(data as Subscriber[]);
        setLoading(false);
      });
  }, []);

  async function handleDelete(id: string) {
    if (confirmId !== id) { setConfirmId(id); return; }
    setDeleting(id);
    setConfirmId(null);
    await supabase.from("newsletter_subscribers").delete().eq("id", id);
    setSubscribers(prev => prev.filter(s => s.id !== id));
    setDeleting(null);
  }

  return (
    <div className="max-w-4xl mx-auto px-5 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold leading-tight"
          style={{ background: "linear-gradient(135deg,#fff 40%,#fde68a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
          Newsletter Subscribers
        </h1>
        <p className="text-sm mt-1.5" style={{ color: "rgba(100,116,139,0.7)" }}>
          {loading ? "Loading..." : `${subscribers.length} subscriber${subscribers.length !== 1 ? "s" : ""}`}
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-24">
          <div className="w-8 h-8 rounded-full border-2 animate-spin"
            style={{ borderColor: "rgba(251,191,36,0.2)", borderTopColor: "#fbbf24" }} />
        </div>
      ) : subscribers.length === 0 ? (
        <div className="rounded-2xl p-12 text-center"
          style={{ background: "#0b1120", border: "1px solid rgba(255,255,255,0.07)" }}>
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4"
            style={{ background: "rgba(96,165,250,0.1)", border: "1px solid rgba(96,165,250,0.2)" }}>
            <Users size={20} style={{ color: "#60a5fa" }} />
          </div>
          <p className="font-bold text-sm mb-1" style={{ color: "#e2e8f0" }}>No subscribers yet</p>
          <p className="text-xs" style={{ color: "rgba(100,116,139,0.6)" }}>Emails collected from the footer newsletter form will appear here.</p>
        </div>
      ) : (
        <div className="rounded-2xl overflow-hidden"
          style={{ background: "#0b1120", border: "1px solid rgba(255,255,255,0.07)" }}>
          {subscribers.map((s, idx) => (
            <div key={s.id}
              className="flex items-center gap-4 px-5 py-4"
              style={{ borderBottom: idx < subscribers.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: "rgba(96,165,250,0.1)", border: "1px solid rgba(96,165,250,0.2)" }}>
                <Mail size={14} style={{ color: "#60a5fa" }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate" style={{ color: "#e2e8f0" }}>{s.email}</p>
                <p className="text-xs mt-0.5" style={{ color: "rgba(100,116,139,0.5)" }}>
                  {new Date(s.created_at).toLocaleDateString("en-PK", { day: "numeric", month: "short", year: "numeric" })}
                </p>
              </div>
              {confirmId === s.id ? (
                <div className="flex items-center gap-2">
                  <span className="text-xs" style={{ color: "#f87171" }}>Sure?</span>
                  <button
                    onClick={() => handleDelete(s.id)}
                    disabled={deleting === s.id}
                    className="px-2.5 py-1 rounded-lg text-xs font-bold transition-colors disabled:opacity-40"
                    style={{ background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.3)", color: "#f87171" }}>
                    Delete
                  </button>
                  <button
                    onClick={() => setConfirmId(null)}
                    className="px-2.5 py-1 rounded-lg text-xs font-bold transition-colors"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(148,163,184,0.7)" }}>
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => handleDelete(s.id)}
                  disabled={deleting === s.id}
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors disabled:opacity-40"
                  style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.15)", color: "#f87171" }}
                  title="Remove subscriber">
                  <Trash2 size={13} />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
