"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import Link from "next/link";
import { SERVICES } from "@/lib/services";
import { supabase, type DbService } from "@/lib/supabase";
import {
  ShieldCheck, Mail, Package, TrendingUp, Users,
  ExternalLink, ArrowRight, AlertTriangle, BarChart2, Settings, Layers,
} from "lucide-react";

export default function AdminDashboard() {
  const { user } = useUser();
  const [dbServices, setDbServices] = useState<DbService[]>([]);

  const userEmail = user?.emailAddresses[0]?.emailAddress ?? "";

  useEffect(() => {
    supabase.from("services").select("*")
      .then(({ data }) => { if (data) setDbServices(data as DbService[]); });
  }, []);

  const STATS = [
    { label: "Static Services",  value: SERVICES.length,                    icon: Package,    color: "#60a5fa" },
    { label: "Added by Admin",   value: dbServices.filter(d => !SERVICES.find(s => s.slug === d.slug)).length, icon: Layers, color: "#a78bfa" },
    { label: "Total Services",   value: dbServices.length || SERVICES.length, icon: TrendingUp, color: "#4ade80" },
    { label: "Support",          value: "24/7",                              icon: Users,      color: "#fb923c" },
  ];

  const QUICK_LINKS = [
    { label: "View Orders (Gmail)",  href: "https://mail.google.com",       icon: Mail,     note: "Orders arrive here",  color: "#60a5fa", external: true  },
    { label: "EmailJS Dashboard",    href: "https://dashboard.emailjs.com", icon: Settings, note: "Manage templates",    color: "#a78bfa", external: true  },
    { label: "Vercel Dashboard",     href: "https://vercel.com/dashboard",  icon: BarChart2,note: "Deployments & logs",  color: "#4ade80", external: true  },
    { label: "Browse Shop",          href: "/shop",                          icon: ShopIcon, note: "See what users see", color: "#fb923c", external: false },
  ];

  return (
    <div className="max-w-4xl mx-auto px-5 py-10">

      {/* Header */}
      <div className="mb-8">
        <span className="inline-flex items-center gap-2 text-[11px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest mb-3"
          style={{ background: "rgba(234,179,8,0.1)", border: "1px solid rgba(234,179,8,0.3)", color: "#fbbf24" }}>
          <ShieldCheck size={11} /> Admin Access
        </span>
        <h1 className="text-3xl font-extrabold leading-tight"
          style={{ background: "linear-gradient(135deg,#fff 40%,#fde68a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
          Dashboard
        </h1>
        <p className="text-sm mt-1.5" style={{ color: "rgba(100,116,139,0.7)" }}>
          Signed in as <span style={{ color: "#fbbf24" }}>{userEmail}</span>
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {STATS.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="rounded-2xl p-5"
            style={{ background: "#0b1120", border: "1px solid rgba(255,255,255,0.07)" }}>
            <Icon size={17} style={{ color, marginBottom: 10 }} />
            <div className="text-2xl font-extrabold mb-1" style={{ color: "#f1f5f9" }}>{value}</div>
            <div className="text-xs" style={{ color: "rgba(100,116,139,0.6)" }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Order notice */}
      <div className="rounded-2xl p-5 mb-8 flex items-start gap-4"
        style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.2)" }}>
        <AlertTriangle size={17} style={{ color: "#fbbf24", flexShrink: 0, marginTop: 2 }} />
        <div>
          <p className="font-bold text-sm mb-1" style={{ color: "#fde68a" }}>How orders reach you</p>
          <p className="text-xs leading-relaxed" style={{ color: "rgba(148,163,184,0.7)" }}>
            Every order is emailed to <strong style={{ color: "#fbbf24" }}>{userEmail}</strong> via EmailJS.
            Cancelled orders also notify you. Check Gmail for all orders.
          </p>
        </div>
      </div>

      {/* Manage services shortcut */}
      <Link href="/admin/services"
        className="flex items-center gap-4 p-5 rounded-2xl mb-8 transition-all group"
        style={{ background: "rgba(37,99,235,0.07)", border: "1px solid rgba(37,99,235,0.2)", textDecoration: "none" }}
        onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = "rgba(37,99,235,0.4)"}
        onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = "rgba(37,99,235,0.2)"}>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: "rgba(96,165,250,0.12)", border: "1px solid rgba(96,165,250,0.25)" }}>
          <Package size={18} style={{ color: "#60a5fa" }} />
        </div>
        <div className="flex-1">
          <p className="font-bold text-sm mb-0.5" style={{ color: "#e2e8f0" }}>Manage Services</p>
          <p className="text-xs" style={{ color: "rgba(100,116,139,0.6)" }}>Add, edit or delete services on the shop</p>
        </div>
        <ArrowRight size={16} style={{ color: "rgba(96,165,250,0.5)" }} className="group-hover:translate-x-0.5 transition-transform" />
      </Link>

      {/* Quick links */}
      <h2 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "rgba(100,116,139,0.5)" }}>
        Quick Links
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {QUICK_LINKS.map(({ label, href, icon: Icon, note, color, external }) =>
          external ? (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 rounded-2xl transition-all"
              style={{ background: "#0b1120", border: "1px solid rgba(255,255,255,0.07)", textDecoration: "none" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.15)"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)"}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: `${color}18`, border: `1px solid ${color}30` }}>
                <Icon size={15} style={{ color }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold truncate" style={{ color: "#e2e8f0" }}>{label}</p>
                <p className="text-xs mt-0.5" style={{ color: "rgba(100,116,139,0.6)" }}>{note}</p>
              </div>
              <ExternalLink size={12} style={{ color: "rgba(100,116,139,0.35)" }} />
            </a>
          ) : (
            <Link key={label} href={href}
              className="flex items-center gap-3 p-4 rounded-2xl transition-all"
              style={{ background: "#0b1120", border: "1px solid rgba(255,255,255,0.07)", textDecoration: "none" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.15)"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)"}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: `${color}18`, border: `1px solid ${color}30` }}>
                <Icon size={15} style={{ color }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold truncate" style={{ color: "#e2e8f0" }}>{label}</p>
                <p className="text-xs mt-0.5" style={{ color: "rgba(100,116,139,0.6)" }}>{note}</p>
              </div>
              <ArrowRight size={12} style={{ color: "rgba(100,116,139,0.35)" }} />
            </Link>
          )
        )}
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
