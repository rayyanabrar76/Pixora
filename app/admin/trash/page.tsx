"use client";

import { useEffect, useState } from "react";
import { supabase, type DbService } from "@/lib/supabase";
import { SERVICES } from "@/lib/services";
import { Trash2, RotateCcw, Loader2, CheckCircle2, PackageX } from "lucide-react";

export default function AdminTrashPage() {
  const [trashed, setTrashed] = useState<DbService[]>([]);
  const [restoringId, setRestoringId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [toast, setToast] = useState("");

  const loadTrashed = async () => {
    const { data } = await supabase
      .from("services").select("*")
      .not("deleted_at", "is", null)
      .order("deleted_at", { ascending: false });
    if (data) setTrashed(data as DbService[]);
  };

  useEffect(() => { loadTrashed(); }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  const handleRestore = async (id: string) => {
    setRestoringId(id);
    await supabase.from("services").update({ deleted_at: null }).eq("id", id);
    setRestoringId(null);
    showToast("Service restored!");
    loadTrashed();
  };

  const handlePermanentDelete = async (id: string) => {
    setDeletingId(id);
    setConfirmDeleteId(null);
    await supabase.from("services").delete().eq("id", id);
    setDeletingId(null);
    showToast("Permanently deleted.");
    loadTrashed();
  };

  return (
    <div className="max-w-4xl mx-auto px-5 py-10">

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold shadow-2xl"
          style={{ background: "#0d1525", border: "1px solid rgba(34,197,94,0.3)", color: "#4ade80" }}>
          <CheckCircle2 size={14} /> {toast}
        </div>
      )}

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold leading-tight mb-1"
          style={{ background: "linear-gradient(135deg,#fff 40%,#fde68a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
          Trash
        </h1>
        <p className="text-sm" style={{ color: "rgba(100,116,139,0.6)" }}>
          {trashed.length} deleted service{trashed.length !== 1 ? "s" : ""} — restore or permanently delete
        </p>
      </div>

      {trashed.length === 0 ? (
        <div className="rounded-2xl p-14 text-center"
          style={{ background: "#0b1120", border: "1px solid rgba(255,255,255,0.06)" }}>
          <PackageX size={30} className="mx-auto mb-3" style={{ color: "rgba(100,116,139,0.25)" }} />
          <p className="font-bold mb-1" style={{ color: "#e2e8f0" }}>Trash is empty</p>
          <p className="text-sm" style={{ color: "rgba(100,116,139,0.5)" }}>Deleted services will appear here</p>
        </div>
      ) : (
        <div className="rounded-2xl overflow-hidden"
          style={{ background: "#0b1120", border: "1px solid rgba(255,255,255,0.07)" }}>
          <div className="h-0.75" style={{ background: "linear-gradient(to right,#ef4444,#dc2626)" }} />
          {trashed.map((s, i) => {
            const isStatic = SERVICES.some(st => st.slug === s.slug);
            return (
            <div key={s.id}
              style={{ borderBottom: i < trashed.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}
              className="flex flex-col gap-3 px-5 py-4">
              {isStatic && (
                <div className="flex items-center gap-2 text-xs px-3 py-2 rounded-lg"
                  style={{ background: "rgba(34,197,94,0.06)", border: "1px solid rgba(34,197,94,0.18)", color: "rgba(74,222,128,0.8)" }}>
                  <CheckCircle2 size={12} />
                  Hidden from shop. This is a built-in service and cannot be permanently deleted — keeping it here is enough.
                </div>
              )}
              <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                  <p className="text-sm font-bold" style={{ color: "rgba(226,232,240,0.5)" }}>{s.name}</p>
                  {s.badge && (
                    <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded-md uppercase tracking-wider shrink-0"
                      style={{ background: "rgba(251,191,36,0.08)", color: "rgba(251,191,36,0.5)", border: "1px solid rgba(251,191,36,0.15)" }}>
                      {s.badge}
                    </span>
                  )}
                  {isStatic && (
                    <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded-md uppercase tracking-wider shrink-0"
                      style={{ background: "rgba(96,165,250,0.08)", color: "rgba(96,165,250,0.6)", border: "1px solid rgba(96,165,250,0.2)" }}>
                      Static
                    </span>
                  )}
                </div>
                <p className="text-xs" style={{ color: "rgba(100,116,139,0.45)" }}>
                  {s.category} · {s.price_label}
                  {s.deleted_at && (
                    <span> · deleted {new Date(s.deleted_at).toLocaleDateString()}</span>
                  )}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0 flex-wrap">
                {/* Restore */}
                <button onClick={() => handleRestore(s.id)} disabled={restoringId === s.id}
                  className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg disabled:opacity-50 transition-all"
                  style={{ background: "rgba(34,197,94,0.08)", color: "#4ade80", border: "1px solid rgba(34,197,94,0.2)" }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "rgba(34,197,94,0.18)"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "rgba(34,197,94,0.08)"}>
                  {restoringId === s.id
                    ? <><Loader2 size={11} className="animate-spin" /> Restoring…</>
                    : <><RotateCcw size={11} /> Restore</>}
                </button>

                {/* Permanent delete — only for non-static services */}
                {!isStatic && (
                  confirmDeleteId === s.id ? (
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-semibold" style={{ color: "#f87171" }}>Sure?</span>
                      <button onClick={() => handlePermanentDelete(s.id)} disabled={deletingId === s.id}
                        className="flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-lg disabled:opacity-50"
                        style={{ background: "rgba(239,68,68,0.15)", color: "#f87171", border: "1px solid rgba(239,68,68,0.3)" }}>
                        {deletingId === s.id ? <Loader2 size={11} className="animate-spin" /> : "Delete forever"}
                      </button>
                      <button onClick={() => setConfirmDeleteId(null)}
                        className="text-xs font-bold px-2.5 py-1 rounded-lg"
                        style={{ background: "rgba(255,255,255,0.05)", color: "rgba(148,163,184,0.7)", border: "1px solid rgba(255,255,255,0.1)" }}>
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button onClick={() => setConfirmDeleteId(s.id)}
                      className="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
                      style={{ background: "rgba(239,68,68,0.08)", color: "#f87171", border: "1px solid rgba(239,68,68,0.2)" }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "rgba(239,68,68,0.18)"}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "rgba(239,68,68,0.08)"}>
                      <Trash2 size={13} />
                    </button>
                  )
                )}
              </div>
              </div>
            </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
