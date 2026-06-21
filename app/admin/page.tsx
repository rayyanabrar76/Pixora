"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { SERVICES } from "@/lib/services";
import {
  ShieldCheck, Mail, Package, TrendingUp, Users, ExternalLink,
  ArrowRight, AlertTriangle, BarChart2, Settings, Layers,
} from "lucide-react";

const ADMIN_EMAILS = (process.env.NEXT_PUBLIC_ADMIN_EMAILS || "fahadwaseem461@gmail.com")
  .split(",").map(e => e.trim());

export default function AdminPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!isLoaded) return;
    const email = user?.emailAddresses[0]?.emailAddress ?? "";
    if (!user || !ADMIN_EMAILS.includes(email)) router.replace("/");
  }, [isLoaded, user, router]);

  if (!isLoaded || !mounted) {
    return (
      <div style={{ background: "linear-gradient(180deg,#060d1f 0%,#080f22 100%)", minHeight: "100vh" }}
        className="flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: "rgba(251,191,36,0.3)", borderTopColor: "#fbbf24" }} />
      </div>
    );
  }

  const userEmail = user?.emailAddresses[0]?.emailAddress ?? "";
  if (!ADMIN_EMAILS.includes(userEmail)) return null;

  const categories = [...new Set(SERVICES.map(s => s.category))];

  const QUICK_STATS = [
    { label: "Total Services",  value: SERVICES.length,    icon: Package,    color: "#60a5fa" },
    { label: "Categories",      value: categories.length,  icon: Layers,     color: "#a78bfa" },
    { label: "Active Platform", value: "Live",             icon: TrendingUp, color: "#4ade80" },
    { label: "Support",         value: "24/7",             icon: Users,      color: "#fb923c" },
  ];

  const QUICK_LINKS = [
    { label: "View All Orders (Gmail)",   href: "https://mail.google.com",              icon: Mail,        note: "Orders arrive here",     color: "#60a5fa",  external: true  },
    { label: "EmailJS Dashboard",         href: "https://dashboard.emailjs.com",        icon: Settings,    note: "Manage templates",       color: "#a78bfa",  external: true  },
    { label: "Vercel Dashboard",          href: "https://vercel.com/dashboard",         icon: BarChart2,   note: "Deployments & logs",     color: "#4ade80",  external: true  },
    { label: "Browse Shop (as customer)", href: "/shop",                                icon: ShoppingIcon, note: "See what users see",   color: "#fb923c",  external: false },
  ];

  return (
    <div style={{ background: "linear-gradient(180deg,#060d1f 0%,#080f22 100%)", minHeight: "100vh" }}>
      <div className="fixed top-0 left-1/4 w-125 h-125 rounded-full blur-3xl opacity-[0.05] pointer-events-none"
        style={{ background: "radial-gradient(circle,#fbbf24,transparent)" }} />

      <div className="max-w-5xl mx-auto px-4 py-14 relative">

        {/* Header */}
        <div className="mb-10 flex items-start justify-between gap-4 flex-wrap">
          <div>
            <span className="inline-flex items-center gap-2 text-[11px] font-bold px-3.5 py-1.5 rounded-full uppercase tracking-widest mb-4"
              style={{ background: "rgba(234,179,8,0.1)", border: "1px solid rgba(234,179,8,0.3)", color: "#fbbf24" }}>
              <ShieldCheck size={11} />
              Admin Access
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
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Site is Live
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
              Every order placed on the site is emailed to <strong style={{ color: "#fbbf24" }}>fahadwaseem461@gmail.com</strong> via EmailJS.
              Cancelled orders also trigger a notification. Check Gmail to see all incoming orders.
            </p>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mb-10">
          <h2 className="text-sm font-bold uppercase tracking-widest mb-5" style={{ color: "rgba(100,116,139,0.6)" }}>
            Quick Links
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {QUICK_LINKS.map(({ label, href, icon: Icon, note, color, external }) => (
              external ? (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-2xl transition-all group"
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
                  <ExternalLink size={13} style={{ color: "rgba(100,116,139,0.4)", flexShrink: 0 }} />
                </a>
              ) : (
                <Link key={label} href={href}
                  className="flex items-center gap-4 p-4 rounded-2xl transition-all group"
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
                  <ArrowRight size={13} style={{ color: "rgba(100,116,139,0.4)", flexShrink: 0 }} />
                </Link>
              )
            ))}
          </div>
        </div>

        {/* Services by category */}
        <div>
          <h2 className="text-sm font-bold uppercase tracking-widest mb-5" style={{ color: "rgba(100,116,139,0.6)" }}>
            Services Overview
          </h2>
          <div className="rounded-2xl overflow-hidden" style={{ background: "#0b1120", border: "1px solid rgba(255,255,255,0.07)" }}>
            <div className="h-0.75" style={{ background: "linear-gradient(to right,#fbbf24,#f59e0b)" }} />
            {categories.map((cat, i) => {
              const catServices = SERVICES.filter(s => s.category === cat);
              return (
                <div key={cat}
                  style={{ borderBottom: i < categories.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}
                  className="flex items-center justify-between px-5 py-4">
                  <div>
                    <p className="text-sm font-bold" style={{ color: "#e2e8f0" }}>{cat}</p>
                    <p className="text-xs mt-0.5" style={{ color: "rgba(100,116,139,0.6)" }}>
                      {catServices.length} service{catServices.length !== 1 ? "s" : ""}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full"
                      style={{ background: "rgba(96,165,250,0.1)", color: "#60a5fa", border: "1px solid rgba(96,165,250,0.2)" }}>
                      Rs. {Math.min(...catServices.map(s => s.price)).toLocaleString()}+
                    </span>
                    <Link href={`/shop?category=${encodeURIComponent(cat)}`}
                      className="text-xs px-3 py-1.5 rounded-xl font-bold transition-all"
                      style={{ background: "rgba(255,255,255,0.05)", color: "rgba(203,213,225,0.7)" }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#fff"}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "rgba(203,213,225,0.7)"}>
                      View →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}

function ShoppingIcon({ size, style }: { size: number; style?: React.CSSProperties }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
    </svg>
  );
}
