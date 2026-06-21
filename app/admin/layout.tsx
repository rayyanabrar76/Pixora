"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ShieldCheck, LayoutDashboard, Package, Trash2, ArrowLeft, Menu, X, ShoppingBag,
} from "lucide-react";

const ADMIN_EMAILS = (process.env.NEXT_PUBLIC_ADMIN_EMAILS || "")
  .split(",").map(e => e.trim()).filter(Boolean);

const NAV = [
  { label: "Dashboard", href: "/admin",          icon: LayoutDashboard },
  { label: "Services",  href: "/admin/services", icon: Package },
  { label: "Orders",    href: "/admin/orders",   icon: ShoppingBag },
  { label: "Trash",     href: "/admin/trash",    icon: Trash2 },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!isLoaded) return;
    const email = user?.emailAddresses[0]?.emailAddress ?? "";
    if (!user || !ADMIN_EMAILS.includes(email)) router.replace("/");
  }, [isLoaded, user, router]);

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center" style={{ minHeight: "100vh", background: "#060d1f" }}>
        <div className="w-8 h-8 rounded-full border-2 animate-spin"
          style={{ borderColor: "rgba(251,191,36,0.2)", borderTopColor: "#fbbf24" }} />
      </div>
    );
  }

  const email = user?.emailAddresses[0]?.emailAddress ?? "";
  if (!ADMIN_EMAILS.includes(email)) return null;

  return (
    <div className="flex" style={{ minHeight: "100vh", background: "#060d1f" }}>

      {/* Mobile backdrop */}
      {open && (
        <div className="fixed inset-0 z-40 lg:hidden" style={{ background: "rgba(0,0,0,0.55)" }}
          onClick={() => setOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full z-50 flex flex-col transition-transform duration-300 lg:sticky lg:top-0 lg:translate-x-0 lg:z-auto lg:h-screen lg:overflow-y-auto ${open ? "translate-x-0" : "-translate-x-full"}`}
        style={{ width: 220, background: "#080f22", borderRight: "1px solid rgba(255,255,255,0.06)", flexShrink: 0 }}>

        {/* Brand */}
        <div className="flex items-center justify-between px-4 py-4"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: "rgba(251,191,36,0.12)", border: "1px solid rgba(251,191,36,0.25)" }}>
              <ShieldCheck size={13} style={{ color: "#fbbf24" }} />
            </div>
            <span className="text-sm font-extrabold" style={{ color: "#fde68a" }}>Admin Panel</span>
          </div>
          <button className="lg:hidden" onClick={() => setOpen(false)}
            style={{ color: "rgba(100,116,139,0.6)" }}>
            <X size={17} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-2.5 flex flex-col gap-1">
          {NAV.map(({ label, href, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link key={href} href={href} onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all"
                style={active ? {
                  background: "rgba(251,191,36,0.1)",
                  color: "#fbbf24",
                  border: "1px solid rgba(251,191,36,0.2)",
                } : {
                  color: "rgba(148,163,184,0.65)",
                  border: "1px solid transparent",
                }}>
                <Icon size={15} />
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Footer nav */}
        <div className="p-2.5" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <Link href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all"
            style={{ color: "rgba(100,116,139,0.55)", border: "1px solid transparent" }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.color = "#e2e8f0"; el.style.background = "rgba(255,255,255,0.04)"; }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.color = "rgba(100,116,139,0.55)"; el.style.background = "transparent"; }}>
            <ArrowLeft size={15} />
            Back to Site
          </Link>
        </div>
      </aside>

      {/* Content area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile topbar */}
        <div className="lg:hidden flex items-center gap-3 px-4 py-3"
          style={{ background: "#080f22", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <button onClick={() => setOpen(true)} style={{ color: "#fbbf24" }}>
            <Menu size={20} />
          </button>
          <span className="text-sm font-bold" style={{ color: "#fde68a" }}>
            {NAV.find(n => n.href === pathname)?.label ?? "Admin"}
          </span>
        </div>

        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
