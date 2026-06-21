"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { SERVICES } from "@/lib/services";
import { supabase, type DbService } from "@/lib/supabase";
import {
  Plus, Trash2, Pencil, X, Loader2, CheckCircle2, Eye, Layers, ChevronDown,
} from "lucide-react";

const ICON_OPTIONS = ["star","image","laptop-code","share-alt","camera","envelope","trending-up","settings","monitor","message-circle","users","search","store","mobile","building","id-card","map-marker-alt","file-text"];
const CATEGORY_OPTIONS = ["Design","Web Development","Marketing","Photography","Google My Business"];

const FIELD: React.CSSProperties = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: 10,
  color: "#e2e8f0",
  fontSize: 13,
  padding: "9px 12px",
  width: "100%",
  outline: "none",
};

const EMPTY_FORM = { name: "", category: "Design", description: "", price: "", badge: "", icon: "star", details: [""] };

function CustomSelect({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: string[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button type="button" onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between gap-2 text-left"
        style={{ ...FIELD, cursor: "pointer" }}>
        <span>{value}</span>
        <ChevronDown size={13} style={{ color: "rgba(100,116,139,0.6)", flexShrink: 0, transform: open ? "rotate(180deg)" : "none", transition: "transform 0.15s" }} />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute left-0 right-0 top-full mt-1 z-20 rounded-xl overflow-y-auto"
            style={{ background: "#0d1525", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 8px 32px rgba(0,0,0,0.4)", maxHeight: 220 }}>
            {options.map(opt => (
              <button key={opt} type="button"
                onClick={() => { onChange(opt); setOpen(false); }}
                className="w-full text-left px-3 py-2.5 text-sm transition-all"
                style={{
                  color: opt === value ? "#d97706" : "#e2e8f0",
                  background: opt === value ? "rgba(180,83,9,0.12)" : "transparent",
                }}
                onMouseEnter={e => { if (opt !== value) (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)"; }}
                onMouseLeave={e => { if (opt !== value) (e.currentTarget as HTMLElement).style.background = "transparent"; }}>
                {opt}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function ServicesContent() {
  const searchParams = useSearchParams();
  const [dbServices, setDbServices] = useState<DbService[]>([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [seeding, setSeeding] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [toast, setToast] = useState("");

  const loadServices = async () => {
    const { data } = await supabase.from("services").select("*").is("deleted_at", null).order("created_at", { ascending: false });
    if (data) setDbServices(data as DbService[]);
  };

  useEffect(() => { loadServices(); }, []);

  // Auto-open edit form when ?edit=slug is in the URL
  useEffect(() => {
    const editSlug = searchParams.get("edit");
    if (!editSlug || dbServices.length === 0) return;
    const s = dbServices.find(d => d.slug === editSlug);
    if (s) {
      handleEdit(s);
    }
  }, [searchParams, dbServices]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  const slugify = (str: string) =>
    str.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  const handleSave = async () => {
    const e = {
      name: !form.name,
      description: !form.description,
      price: !form.price,
    };
    setErrors(e);
    if (e.name || e.description || e.price) return;
    setSaving(true);
    const payload = {
      name: form.name,
      category: form.category,
      description: form.description,
      price: parseInt(form.price),
      price_label: `Rs. ${parseInt(form.price).toLocaleString()}`,
      badge: form.badge || null,
      icon: form.icon,
      slug: editingId ? slugify(form.name) : slugify(form.name),
      details: form.details.filter(d => d.trim() !== ""),
    };
    if (editingId) {
      await supabase.from("services").update(payload).eq("id", editingId);
      showToast("Service updated!");
    } else {
      await supabase.from("services").insert(payload);
      showToast("Service added!");
    }
    setSaving(false);
    setShowForm(false);
    setForm(EMPTY_FORM);
    setEditingId(null);
    setErrors({});
    loadServices();
  };

  const handleEdit = (s: DbService) => {
    setForm({
      name: s.name, category: s.category, description: s.description,
      price: String(s.price), badge: s.badge || "", icon: s.icon,
      details: s.details?.length ? s.details : [""],
    });
    setEditingId(s.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    setConfirmDeleteId(null);
    await supabase.from("services").update({ deleted_at: new Date().toISOString() }).eq("id", id);
    setDeletingId(null);
    showToast("Moved to trash.");
    loadServices();
  };

  const handleSeedStatic = async () => {
    setSeeding(true);
    for (const s of SERVICES) {
      await supabase.from("services").upsert({
        name: s.name, category: s.category, description: s.description,
        price: s.price, price_label: s.priceLabel, badge: s.badge || null,
        icon: s.icon, slug: s.slug, details: s.details,
      }, { onConflict: "slug" });
    }
    setSeeding(false);
    showToast(`${SERVICES.length} services migrated!`);
    loadServices();
  };

  const unmigrated = SERVICES.filter(s => !dbServices.find(d => d.slug === s.slug));

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
      <div className="flex items-start justify-between gap-4 flex-wrap mb-8">
        <div>
          <h1 className="text-3xl font-extrabold leading-tight mb-1"
            style={{ background: "linear-gradient(135deg,#fff 40%,#fde68a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            Services
          </h1>
          <p className="text-sm" style={{ color: "rgba(100,116,139,0.6)" }}>
            {dbServices.length} in database · {SERVICES.length} static
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {unmigrated.length > 0 && (
            <button onClick={handleSeedStatic} disabled={seeding}
              className="flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-xl transition-all disabled:opacity-60"
              style={{ background: "rgba(251,191,36,0.1)", color: "#fbbf24", border: "1px solid rgba(251,191,36,0.3)" }}>
              {seeding
                ? <><Loader2 size={12} className="animate-spin" /> Migrating…</>
                : <><Layers size={12} /> Migrate Static ({unmigrated.length})</>}
            </button>
          )}
          <button onClick={() => { setForm(EMPTY_FORM); setEditingId(null); setShowForm(v => !v); }}
            className="flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-xl transition-all"
            style={showForm
              ? { background: "rgba(239,68,68,0.1)", color: "#fca5a5", border: "1px solid rgba(239,68,68,0.2)" }
              : { background: "rgba(37,99,235,0.15)", color: "#60a5fa", border: "1px solid rgba(37,99,235,0.3)" }}>
            {showForm ? <><X size={12} /> Cancel</> : <><Plus size={12} /> Add Service</>}
          </button>
        </div>
      </div>

      {/* Add / Edit form */}
      {showForm && (
        <div className="rounded-2xl overflow-hidden mb-6"
          style={{ background: "#0b1120", border: "1px solid rgba(37,99,235,0.25)" }}>
          <div className="h-0.75" style={{ background: "linear-gradient(to right,#fbbf24,#f59e0b)" }} />
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">

            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: errors.name ? "#f87171" : "rgba(148,163,184,0.7)" }}>Service Name *{errors.name && " — required"}</label>
              <input style={{ ...FIELD, borderColor: errors.name ? "rgba(239,68,68,0.5)" : "rgba(255,255,255,0.1)" }} placeholder="e.g. Logo Design" value={form.name}
                onChange={e => { setForm(f => ({ ...f, name: e.target.value })); setErrors(er => ({ ...er, name: false })); }} />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: "rgba(148,163,184,0.7)" }}>Category *</label>
              <CustomSelect value={form.category} options={CATEGORY_OPTIONS}
                onChange={v => setForm(f => ({ ...f, category: v }))} />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold mb-1.5" style={{ color: errors.description ? "#f87171" : "rgba(148,163,184,0.7)" }}>Description *{errors.description && " — required"}</label>
              <textarea style={{ ...FIELD, resize: "vertical", minHeight: 80, fontFamily: "inherit", borderColor: errors.description ? "rgba(239,68,68,0.5)" : "rgba(255,255,255,0.1)" }}
                placeholder="Short description shown on the card"
                value={form.description}
                onChange={e => { setForm(f => ({ ...f, description: e.target.value })); setErrors(er => ({ ...er, description: false })); }} />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: errors.price ? "#f87171" : "rgba(148,163,184,0.7)" }}>Price (Rs.) *{errors.price && " — required"}</label>
              <input style={{ ...FIELD, borderColor: errors.price ? "rgba(239,68,68,0.5)" : "rgba(255,255,255,0.1)" }} type="number" placeholder="e.g. 5000" value={form.price}
                onChange={e => { setForm(f => ({ ...f, price: e.target.value })); setErrors(er => ({ ...er, price: false })); }} />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: "rgba(148,163,184,0.7)" }}>
                Badge <span style={{ color: "rgba(100,116,139,0.5)" }}>(optional)</span>
              </label>
              <input style={FIELD} placeholder='e.g. "Popular" or "New"' value={form.badge}
                onChange={e => setForm(f => ({ ...f, badge: e.target.value }))} />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: "rgba(148,163,184,0.7)" }}>Icon</label>
              <CustomSelect value={form.icon} options={ICON_OPTIONS}
                onChange={v => setForm(f => ({ ...f, icon: v }))} />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold mb-2" style={{ color: "rgba(148,163,184,0.7)" }}>
                What&apos;s Included <span style={{ color: "rgba(100,116,139,0.5)" }}>(bullet points)</span>
              </label>
              <div className="flex flex-col gap-2">
                {form.details.map((d, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <input style={{ ...FIELD, flex: 1 }} placeholder="e.g. 3 logo concepts" value={d}
                      onChange={e => setForm(f => {
                        const details = [...f.details];
                        details[i] = e.target.value;
                        return { ...f, details };
                      })} />
                    {form.details.length > 1 && (
                      <button type="button"
                        onClick={() => setForm(f => ({ ...f, details: f.details.filter((_, j) => j !== i) }))}
                        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                        style={{ background: "rgba(239,68,68,0.08)", color: "#f87171", border: "1px solid rgba(239,68,68,0.2)" }}>
                        <X size={12} />
                      </button>
                    )}
                  </div>
                ))}
                <button type="button"
                  onClick={() => setForm(f => ({ ...f, details: [...f.details, ""] }))}
                  className="self-start flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg"
                  style={{ background: "rgba(96,165,250,0.08)", color: "#60a5fa", border: "1px solid rgba(96,165,250,0.2)" }}>
                  <Plus size={11} /> Add bullet
                </button>
              </div>
            </div>

            <div className="sm:col-span-2">
              <button onClick={handleSave} disabled={saving}
                className="flex items-center gap-2 font-bold px-6 py-3 rounded-xl text-white text-sm disabled:opacity-60"
                style={{ background: "linear-gradient(135deg,#d97706,#b45309)" }}>
                {saving
                  ? <><Loader2 size={14} className="animate-spin" /> Saving…</>
                  : <><CheckCircle2 size={14} /> {editingId ? "Update Service" : "Add Service"}</>}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Services list */}
      {dbServices.length === 0 ? (
        <div className="rounded-2xl p-12 text-center"
          style={{ background: "#0b1120", border: "1px solid rgba(255,255,255,0.06)" }}>
          <Layers size={28} className="mx-auto mb-3" style={{ color: "rgba(100,116,139,0.25)" }} />
          <p className="font-bold mb-1" style={{ color: "#e2e8f0" }}>No services in database yet</p>
          <p className="text-sm" style={{ color: "rgba(100,116,139,0.5)" }}>
            Click <span style={{ color: "#fbbf24" }}>Migrate Static</span> to import all existing services, or <span style={{ color: "#60a5fa" }}>Add Service</span> to create one.
          </p>
        </div>
      ) : (
        <div className="rounded-2xl overflow-hidden"
          style={{ background: "#0b1120", border: "1px solid rgba(255,255,255,0.07)" }}>
          <div className="h-0.75" style={{ background: "linear-gradient(to right,#fbbf24,#f59e0b)" }} />
          {dbServices.map((s, i) => (
            <div key={s.id}
              style={{ borderBottom: i < dbServices.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}
              className="flex items-center justify-between gap-4 px-5 py-4">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                  <p className="text-sm font-bold" style={{ color: "#e2e8f0" }}>{s.name}</p>
                  {s.badge && (
                    <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded-md uppercase tracking-wider shrink-0"
                      style={{ background: "rgba(251,191,36,0.12)", color: "#fbbf24", border: "1px solid rgba(251,191,36,0.25)" }}>
                      {s.badge}
                    </span>
                  )}
                </div>
                <p className="text-xs" style={{ color: "rgba(100,116,139,0.55)" }}>
                  {s.category} · {s.price_label}
                  {s.details?.length > 0 && <span style={{ color: "rgba(100,116,139,0.35)" }}> · {s.details.length} bullet{s.details.length !== 1 ? "s" : ""}</span>}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Link href={`/shop/${s.slug}`} target="_blank"
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
                  style={{ background: "rgba(34,197,94,0.08)", color: "#4ade80", border: "1px solid rgba(34,197,94,0.2)" }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "rgba(34,197,94,0.18)"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "rgba(34,197,94,0.08)"}>
                  <Eye size={13} />
                </Link>
                <button onClick={() => handleEdit(s)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
                  style={{ background: "rgba(96,165,250,0.08)", color: "#60a5fa", border: "1px solid rgba(96,165,250,0.2)" }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "rgba(96,165,250,0.18)"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "rgba(96,165,250,0.08)"}>
                  <Pencil size={13} />
                </button>
                {confirmDeleteId === s.id ? (
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-semibold" style={{ color: "#f87171" }}>Sure?</span>
                    <button onClick={() => handleDelete(s.id)} disabled={deletingId === s.id}
                      className="flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-lg disabled:opacity-50"
                      style={{ background: "rgba(239,68,68,0.15)", color: "#f87171", border: "1px solid rgba(239,68,68,0.3)" }}>
                      {deletingId === s.id ? <Loader2 size={11} className="animate-spin" /> : "Delete"}
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
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function AdminServicesPage() {
  return (
    <Suspense>
      <ServicesContent />
    </Suspense>
  );
}
