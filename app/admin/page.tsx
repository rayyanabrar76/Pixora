"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { SERVICES } from "@/lib/services";
import { supabase, type DbService } from "@/lib/supabase";
import {
  ShieldCheck, Mail, Package, TrendingUp, Users, ExternalLink,
  ArrowRight, AlertTriangle, BarChart2, Settings, Layers,
  Plus, Trash2, Pencil, X, Loader2, CheckCircle2, Eye,
} from "lucide-react";

const ADMIN_EMAILS = (process.env.NEXT_PUBLIC_ADMIN_EMAILS || "")
  .split(",").map(e => e.trim()).filter(Boolean);

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

const EMPTY_FORM = { name: "", category: "Design", description: "", price: "", badge: "", icon: "star" };

export default function AdminPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [dbServices, setDbServices] = useState<DbService[]>([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [toast, setToast] = useState("");

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!isLoaded) return;
    const email = user?.emailAddresses[0]?.emailAddress ?? "";
    if (!user || !ADMIN_EMAILS.includes(email)) router.replace("/");
  }, [isLoaded, user, router]);

  const userEmail = user?.emailAddresses[0]?.emailAddress ?? "";

  const loadServices = async () => {
    const { data } = await supabase.from("services").select("*").order("created_at", { ascending: false });
    if (data) setDbServices(data as DbService[]);
  };

  useEffect(() => { if (mounted) loadServices(); }, [mounted]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  const slugify = (str: string) =>
    str.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  const handleSave = async () => {
    if (!form.name || !form.category || !form.description || !form.price) return;
    setSaving(true);
    const payload = {
      name: form.name,
      category: form.category,
      description: form.description,
      price: parseInt(form.price),
      price_label: `Rs. ${parseInt(form.price).toLocaleString()}`,
      badge: form.badge || null,
      icon: form.icon,
      slug: slugify(form.name),
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
    loadServices();
  };

  const handleEdit = (s: DbService) => {
    setForm({ name: s.name, category: s.category, description: s.description, price: String(s.price), badge: s.badge || "", icon: s.icon });
    setEditingId(s.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    await supabase.from("services").delete().eq("id", id);
    setDeletingId(null);
    showToast("Service deleted.");
    loadServices();
  };

  if (!isLoaded || !mounted) {
    return (
      <div style={{ background: "linear-gradient(180deg,#060d1f 0%,#080f22 100%)", minHeight: "100vh" }}
        className="flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
          style={{ borderColor: "rgba(251,191,36,0.3)", borderTopColor: "#fbbf24" }} />
      </div>
    );
  }

  if (!ADMIN_EMAILS.includes(userEmail)) return null;

  const QUICK_STATS = [
    { label: "Static Services",  value: SERVICES.length,    icon: Package,    color: "#60a5fa" },
    { label: "Added by Admin",   value: dbServices.length,  icon: Layers,     color: "#a78bfa" },
    { label: "Total Services",   value: SERVICES.length + dbServices.length, icon: TrendingUp, color: "#4ade80" },
    { label: "Support",          value: "24/7",             icon: Users,      color: "#fb923c" },
  ];

  const QUICK_LINKS = [
    { label: "View Orders (Gmail)",      href: "https://mail.google.com",       icon: Mail,     note: "Orders arrive here",   color: "#60a5fa", external: true  },
    { label: "EmailJS Dashboard",        href: "https://dashboard.emailjs.com", icon: Settings, note: "Manage templates",     color: "#a78bfa", external: true  },
    { label: "Vercel Dashboard",         href: "https://vercel.com/dashboard",  icon: BarChart2,note: "Deployments & logs",   color: "#4ade80", external: true  },
    { label: "Browse Shop",              href: "/shop",                          icon: ShopIcon, note: "See what users see",  color: "#fb923c", external: false },
  ];

  return (
    <div style={{ background: "linear-gradient(180deg,#060d1f 0%,#080f22 100%)", minHeight: "100vh" }}>
      <div className="fixed top-0 left-1/4 w-125 h-125 rounded-full blur-3xl opacity-[0.05] pointer-events-none"
        style={{ background: "radial-gradient(circle,#fbbf24,transparent)" }} />

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold shadow-2xl"
          style={{ background: "#0d1525", border: "1px solid rgba(34,197,94,0.3)", color: "#4ade80" }}>
          <CheckCircle2 size={15} /> {toast}
        </div>
      )}

      <div className="max-w-5xl mx-auto px-4 py-14 relative">

        {/* Header */}
        <div className="mb-10 flex items-start justify-between gap-4 flex-wrap">
          <div>
            <span className="inline-flex items-center gap-2 text-[11px] font-bold px-3.5 py-1.5 rounded-full uppercase tracking-widest mb-4"
              style={{ background: "rgba(234,179,8,0.1)", border: "1px solid rgba(234,179,8,0.3)", color: "#fbbf24" }}>
              <ShieldCheck size={11} /> Admin Access
            </span>
            <h1 className="text-4xl font-extrabold leading-tight"
              style={{ background: "linear-gradient(135deg,#fff 40%,#fde68a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Admin Panel
            </h1>
            <p className="text-sm mt-2" style={{ color: "rgba(100,116,139,0.7)" }}>
              Signed in as <span style={{ color: "#fbbf24" }}>{userEmail}</span>
            </p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold"
            style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)", color: "#4ade80" }}>
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" /> Site is Live
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {QUICK_STATS.map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="rounded-2xl p-5"
              style={{ background: "#0b1120", border: "1px solid rgba(255,255,255,0.07)" }}>
              <Icon size={18} style={{ color, marginBottom: 12 }} />
              <div className="text-2xl font-extrabold mb-1" style={{ color: "#f1f5f9" }}>{value}</div>
              <div className="text-xs" style={{ color: "rgba(100,116,139,0.65)" }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Order notice */}
        <div className="rounded-2xl p-5 mb-10 flex items-start gap-4"
          style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.2)" }}>
          <AlertTriangle size={18} style={{ color: "#fbbf24", flexShrink: 0, marginTop: 1 }} />
          <div>
            <p className="font-bold text-sm mb-1" style={{ color: "#fde68a" }}>How orders reach you</p>
            <p className="text-xs leading-relaxed" style={{ color: "rgba(148,163,184,0.7)" }}>
              Every order is emailed to <strong style={{ color: "#fbbf24" }}>fahadwaseem461@gmail.com</strong> via EmailJS. Cancelled orders also notify you. Check Gmail for all orders.
            </p>
          </div>
        </div>

        {/* ── Manage Services ── */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-sm font-bold uppercase tracking-widest" style={{ color: "rgba(100,116,139,0.6)" }}>
              Manage Services
            </h2>
            <button onClick={() => { setForm(EMPTY_FORM); setEditingId(null); setShowForm(v => !v); }}
              className="flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-xl transition-all"
              style={{ background: showForm ? "rgba(239,68,68,0.1)" : "rgba(37,99,235,0.15)", color: showForm ? "#fca5a5" : "#60a5fa", border: `1px solid ${showForm ? "rgba(239,68,68,0.2)" : "rgba(37,99,235,0.3)"}` }}>
              {showForm ? <><X size={13} /> Cancel</> : <><Plus size={13} /> Add Service</>}
            </button>
          </div>

          {/* Add / Edit form */}
          {showForm && (
            <div className="rounded-2xl overflow-hidden mb-6"
              style={{ background: "#0b1120", border: "1px solid rgba(37,99,235,0.25)" }}>
              <div className="h-0.75" style={{ background: "linear-gradient(to right,#fbbf24,#f59e0b)" }} />
              <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: "rgba(148,163,184,0.7)" }}>Service Name *</label>
                  <input style={FIELD} placeholder="e.g. Logo Design" value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: "rgba(148,163,184,0.7)" }}>Category *</label>
                  <select style={{ ...FIELD, cursor: "pointer" }} value={form.category}
                    onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                    {CATEGORY_OPTIONS.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: "rgba(148,163,184,0.7)" }}>Description *</label>
                  <textarea style={{ ...FIELD, resize: "vertical", minHeight: 80, fontFamily: "inherit" }}
                    placeholder="Short description shown on the card"
                    value={form.description}
                    onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: "rgba(148,163,184,0.7)" }}>Price (Rs.) *</label>
                  <input style={FIELD} type="number" placeholder="e.g. 5000" value={form.price}
                    onChange={e => setForm(f => ({ ...f, price: e.target.value }))} />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: "rgba(148,163,184,0.7)" }}>Badge <span style={{ color: "rgba(100,116,139,0.5)" }}>(optional)</span></label>
                  <input style={FIELD} placeholder='e.g. "Popular" or "New"' value={form.badge}
                    onChange={e => setForm(f => ({ ...f, badge: e.target.value }))} />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: "rgba(148,163,184,0.7)" }}>Icon</label>
                  <select style={{ ...FIELD, cursor: "pointer" }} value={form.icon}
                    onChange={e => setForm(f => ({ ...f, icon: e.target.value }))}>
                    {ICON_OPTIONS.map(i => <option key={i} value={i}>{i}</option>)}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <button onClick={handleSave} disabled={saving}
                    className="flex items-center gap-2 font-bold px-6 py-3 rounded-xl text-white text-sm transition-all disabled:opacity-60"
                    style={{ background: "linear-gradient(135deg,#fbbf24,#f59e0b)", boxShadow: "0 4px 20px rgba(251,191,36,0.3)" }}>
                    {saving ? <><Loader2 size={14} className="animate-spin" /> Saving…</> : <><CheckCircle2 size={14} /> {editingId ? "Update Service" : "Add Service"}</>}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Services list */}
          {dbServices.length === 0 ? (
            <div className="rounded-2xl p-10 text-center"
              style={{ background: "#0b1120", border: "1px solid rgba(255,255,255,0.06)" }}>
              <Package size={28} className="mx-auto mb-3" style={{ color: "rgba(100,116,139,0.3)" }} />
              <p className="text-sm font-bold mb-1" style={{ color: "#e2e8f0" }}>No custom services yet</p>
              <p className="text-xs" style={{ color: "rgba(100,116,139,0.5)" }}>Click "Add Service" to add your first one</p>
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
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="text-sm font-bold truncate" style={{ color: "#e2e8f0" }}>{s.name}</p>
                      {s.badge && (
                        <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded-md shrink-0 uppercase tracking-wider"
                          style={{ background: "rgba(251,191,36,0.12)", color: "#fbbf24", border: "1px solid rgba(251,191,36,0.25)" }}>
                          {s.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs" style={{ color: "rgba(100,116,139,0.6)" }}>{s.category} · Rs. {s.price.toLocaleString()}</p>
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
                    <button onClick={() => handleDelete(s.id)} disabled={deletingId === s.id}
                      className="w-8 h-8 rounded-lg flex items-center justify-center transition-all disabled:opacity-50"
                      style={{ background: "rgba(239,68,68,0.08)", color: "#f87171", border: "1px solid rgba(239,68,68,0.2)" }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "rgba(239,68,68,0.18)"}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "rgba(239,68,68,0.08)"}>
                      {deletingId === s.id ? <Loader2 size={13} className="animate-spin" /> : <Trash2 size={13} />}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Links */}
        <div className="mb-10">
          <h2 className="text-sm font-bold uppercase tracking-widest mb-5" style={{ color: "rgba(100,116,139,0.6)" }}>
            Quick Links
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {QUICK_LINKS.map(({ label, href, icon: Icon, note, color, external }) =>
              external ? (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-2xl transition-all"
                  style={{ background: "#0b1120", border: "1px solid rgba(255,255,255,0.07)", textDecoration: "none" }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.15)"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)"}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${color}18`, border: `1px solid ${color}30` }}>
                    <Icon size={16} style={{ color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold truncate" style={{ color: "#e2e8f0" }}>{label}</p>
                    <p className="text-xs mt-0.5" style={{ color: "rgba(100,116,139,0.6)" }}>{note}</p>
                  </div>
                  <ExternalLink size={13} style={{ color: "rgba(100,116,139,0.4)" }} />
                </a>
              ) : (
                <Link key={label} href={href}
                  className="flex items-center gap-4 p-4 rounded-2xl transition-all"
                  style={{ background: "#0b1120", border: "1px solid rgba(255,255,255,0.07)", textDecoration: "none" }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.15)"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)"}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${color}18`, border: `1px solid ${color}30` }}>
                    <Icon size={16} style={{ color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold truncate" style={{ color: "#e2e8f0" }}>{label}</p>
                    <p className="text-xs mt-0.5" style={{ color: "rgba(100,116,139,0.6)" }}>{note}</p>
                  </div>
                  <ArrowRight size={13} style={{ color: "rgba(100,116,139,0.4)" }} />
                </Link>
              )
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

function ShopIcon({ size, style }: { size: number; style?: React.CSSProperties }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
    </svg>
  );
}
