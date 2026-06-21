"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import {
  ShoppingCart, Menu, X, Search, User, ArrowRight, Trash2,
  CreditCard, Star, Image, Smartphone, Laptop, Building, Mail, Phone,
  ShoppingBag, Share2, Camera, MapPin, FileText, TrendingUp,
  Settings, Monitor, MessageCircle, Users, type LucideIcon,
} from "lucide-react";
import { SERVICES } from "@/lib/services";
import Logo from "@/components/Logo";
import ServiceBanner from "@/components/ServiceBanner";
import { Show, useUser, useClerk } from "@clerk/nextjs";
import AuthModal from "@/components/AuthModal";

const NAV = [
  { label: "Home",    href: "/" },
  { label: "Shop",    href: "/shop" },
  { label: "About",   href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const { items, totalItems, totalPrice, removeFromCart } = useCart();
  const router = useRouter();
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen,   setCartOpen]   = useState(false);
  const [authOpen,   setAuthOpen]   = useState(false);
  const [scrolled,   setScrolled]   = useState(false);
  const [query,      setQuery]      = useState("");
  const inputRef  = useRef<HTMLInputElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const results = query.trim().length > 0
    ? SERVICES.filter((s) =>
        s.name.toLowerCase().includes(query.toLowerCase()) ||
        s.category.toLowerCase().includes(query.toLowerCase()) ||
        s.description.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 6)
    : [];

  useEffect(() => {
    if (searchOpen) inputRef.current?.focus();
  }, [searchOpen]);


  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { closeSearch(); setCartOpen(false); }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeSearch = () => { setSearchOpen(false); setQuery(""); };
  const handleSelect = (slug: string) => { closeSearch(); router.push(`/shop/${slug}`); };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    closeSearch();
    router.push(`/shop?category=All&search=${encodeURIComponent(query.trim())}`);
  };
  const toggleCart   = () => { setCartOpen((v) => !v);   if (searchOpen) closeSearch(); };
  const toggleSearch = () => { setSearchOpen((v) => !v); if (cartOpen)   setCartOpen(false); };

  const [showBar, setShowBar] = useState(true);

  const MARQUEE_ITEMS = [
    "Empowering top brands with world-class digital solutions",
    "Trusted by 200+ growing businesses across Pakistan",
    "Logo Design with unlimited revisions — from Rs.1,500",
    "Most services delivered in 24–48 hours",
    "New: Reels & Short Video Editing — from Rs.2,500",
    "Premium brand identities that make you stand out",
    "Free consultation — get a custom quote today",
    "Landing pages built to convert — from Rs.8,000",
    "We build brands that people remember and trust",
    "From startups to enterprises — we scale with you",
    "5-star rated service — 100% client satisfaction guaranteed",
    "Google My Business setup — boost your local visibility",
  ];

  return (
    <div className="sticky top-0 z-50">
      {/* Announcement bar */}
      {showBar && (
        <div className="hidden sm:block overflow-hidden relative"
          style={{
            background: "linear-gradient(90deg,#0a0f1e,#0d1535,#0a0f1e)",
            borderBottom: "1px solid rgba(37,99,235,0.25)",
            height: 36,
          }}>
          <style>{`
            @keyframes marquee-scroll {
              from { transform: translateX(0); }
              to   { transform: translateX(-50%); }
            }
            .marquee-track {
              display: flex;
              width: max-content;
              animation: marquee-scroll 55s linear infinite;
              will-change: transform;
            }
            .marquee-track:hover { animation-play-state: paused; }
          `}</style>

          <div className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to right,#0a0f1e,transparent)" }} />
          <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to left,#0a0f1e 60%,transparent)" }} />

          <div className="flex items-center h-full overflow-hidden">
            <div className="marquee-track">
              {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((text, i) => (
                <span key={i} className="flex items-center gap-2 whitespace-nowrap px-8 text-[11px] font-medium"
                  style={{ color: "rgba(203,213,225,0.75)" }}>
                  <span style={{ color: "#60a5fa", fontSize: "8px" }}>✦</span>
                  {text}
                  <span style={{ color: "rgba(96,165,250,0.3)", marginLeft: "8px" }}>◆</span>
                </span>
              ))}
            </div>
          </div>

          <button onClick={() => setShowBar(false)}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-5 h-5 rounded-full flex items-center justify-center transition-all"
            style={{ background: "rgba(255,255,255,0.07)", color: "rgba(148,163,184,0.6)" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.15)"; (e.currentTarget as HTMLElement).style.color = "#fff"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.07)"; (e.currentTarget as HTMLElement).style.color = "rgba(148,163,184,0.6)"; }}>
            <X size={11} />
          </button>
        </div>
      )}

      {/* Main header */}
      <header className="transition-all duration-300"
        style={{
          background: scrolled ? "rgba(7,12,24,0.92)" : "rgba(7,12,24,0.85)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          boxShadow: scrolled ? "0 8px 40px rgba(0,0,0,0.4)" : "none",
        }}>
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-18 gap-4" style={{ height: "72px" }}>

          {/* Logo */}
          <Logo dark />

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href}
                className="relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 group"
                style={{ color: "rgba(203,213,225,0.8)" }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.color = "#fff";
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.07)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.color = "rgba(203,213,225,0.8)";
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                }}>
                {n.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1">

            {/* Search */}
            <div ref={searchRef} className="relative">
              <button onClick={toggleSearch}
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200"
                style={{
                  color: searchOpen ? "#60a5fa" : "rgba(148,163,184,0.8)",
                  background: searchOpen ? "rgba(37,99,235,0.15)" : "transparent",
                  border: searchOpen ? "1px solid rgba(37,99,235,0.3)" : "1px solid transparent",
                }}
                onMouseEnter={e => { if (!searchOpen) { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)"; (e.currentTarget as HTMLElement).style.color = "#fff"; }}}
                onMouseLeave={e => { if (!searchOpen) { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "rgba(148,163,184,0.8)"; }}}>
                <Search size={17} />
              </button>

              {searchOpen && typeof document !== "undefined" && createPortal(
                <>
                  {/* Backdrop */}
                  <div onClick={closeSearch}
                    style={{ position: "fixed", inset: 0, zIndex: 9998, background: "rgba(2,6,18,0.7)", backdropFilter: "blur(6px)" }} />

                  {/* Search panel — top-anchored full width */}
                  <div style={{
                    position: "fixed", top: 0, left: 0, right: 0, zIndex: 9999,
                    background: "#080f20",
                    borderBottom: "1px solid rgba(255,255,255,0.09)",
                    boxShadow: "0 16px 48px rgba(0,0,0,0.6)",
                    animation: "slideDown 0.22s cubic-bezier(0.16,1,0.3,1)",
                  }}>
                    <style>{`@keyframes slideDown{from{transform:translateY(-100%);opacity:0}to{transform:translateY(0);opacity:1}}`}</style>

                    {/* Gradient top bar */}
                    <div className="h-0.75" style={{ background: "linear-gradient(to right,#2563eb,#4f46e5,#7c3aed)" }} />

                    {/* Input row */}
                    <form onSubmit={handleSubmit}
                      className="flex items-center gap-3 px-4 py-3 max-w-2xl mx-auto">
                      <Search size={18} style={{ color: "#60a5fa", flexShrink: 0 }} />
                      <input
                        ref={inputRef}
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        placeholder="Search services..."
                        className="flex-1 text-base outline-none bg-transparent"
                        style={{ color: "#e2e8f0", caretColor: "#60a5fa" }}
                      />
                      {query && (
                        <button type="button" onClick={() => setQuery("")}
                          className="w-7 h-7 rounded-lg flex items-center justify-center transition-all shrink-0"
                          style={{ color: "rgba(100,116,139,0.6)", background: "rgba(255,255,255,0.06)" }}>
                          <X size={14} />
                        </button>
                      )}
                      <button type="button" onClick={closeSearch}
                        className="w-8 h-8 rounded-xl flex items-center justify-center transition-all shrink-0 font-bold text-xs"
                        style={{ color: "rgba(148,163,184,0.6)", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
                        onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#fff"}
                        onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "rgba(148,163,184,0.6)"}>
                        Esc
                      </button>
                    </form>

                    {/* Divider */}
                    <div className="h-px mx-4" style={{ background: "rgba(255,255,255,0.07)" }} />

                    {/* Results */}
                    <div className="max-w-2xl mx-auto">
                      {results.length > 0 ? (
                        <ul className="max-h-72 overflow-y-auto">
                          {results.map((s) => (
                            <li key={s.id}>
                              <button onClick={() => handleSelect(s.slug)}
                                className="w-full flex items-start gap-3 px-4 py-3.5 text-left transition-colors"
                                style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
                                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)"}
                                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "transparent"}>
                                <span className="mt-0.5 shrink-0" style={{ color: "#60a5fa" }}>{getServiceIcon(s.icon)}</span>
                                <div className="min-w-0">
                                  <div className="text-sm font-semibold truncate" style={{ color: "#e2e8f0" }}>{s.name}</div>
                                  <div className="text-xs mt-0.5" style={{ color: "#60a5fa" }}>{s.category} · {s.priceLabel}</div>
                                </div>
                              </button>
                            </li>
                          ))}
                        </ul>
                      ) : query.trim().length > 0 ? (
                        <div className="px-4 py-8 text-center text-sm" style={{ color: "rgba(100,116,139,0.7)" }}>
                          No services found for &quot;{query}&quot;
                        </div>
                      ) : (
                        <div className="px-4 py-3 pb-4">
                          <p className="text-xs mb-3" style={{ color: "rgba(100,116,139,0.6)" }}>Popular searches</p>
                          <div className="flex flex-wrap gap-2">
                            {["Logo Design", "Landing Page", "SEO", "Social Media", "Video Editing", "Google Ads"].map((t) => (
                              <button key={t} type="button" onClick={() => setQuery(t)}
                                className="text-xs px-3 py-1.5 rounded-full transition-all"
                                style={{ background: "rgba(255,255,255,0.06)", color: "rgba(203,213,225,0.7)", border: "1px solid rgba(255,255,255,0.08)" }}
                                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(37,99,235,0.18)"; (e.currentTarget as HTMLElement).style.color = "#60a5fa"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(37,99,235,0.3)"; }}
                                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)"; (e.currentTarget as HTMLElement).style.color = "rgba(203,213,225,0.7)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)"; }}>
                                {t}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </>,
                document.body
              )}
            </div>

            {/* Auth */}
            <Show when="signed-out">
              <button onClick={() => setAuthOpen(true)}
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200"
                style={{ color: "rgba(148,163,184,0.8)", border: "1px solid transparent" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)"; (e.currentTarget as HTMLElement).style.color = "#fff"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "rgba(148,163,184,0.8)"; }}>
                <User size={17} />
              </button>
            </Show>
            <Show when="signed-in">
              <UserMenu />
            </Show>
            {authOpen && <AuthModal onClose={() => setAuthOpen(false)} />}

            {/* Cart */}
            <div className="relative">
              <button onClick={toggleCart}
                className="relative w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200"
                style={{
                  color: cartOpen ? "#60a5fa" : "rgba(148,163,184,0.8)",
                  background: cartOpen ? "rgba(37,99,235,0.15)" : "transparent",
                  border: cartOpen ? "1px solid rgba(37,99,235,0.3)" : "1px solid transparent",
                }}
                onMouseEnter={e => { if (!cartOpen) { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)"; (e.currentTarget as HTMLElement).style.color = "#fff"; }}}
                onMouseLeave={e => { if (!cartOpen) { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "rgba(148,163,184,0.8)"; }}}>
                <ShoppingCart size={17} />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 text-white text-[9px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg,#2563eb,#4f46e5)" }}>
                    {totalItems}
                  </span>
                )}
              </button>

              {cartOpen && typeof document !== "undefined" && createPortal(
                <>
                  {/* Backdrop */}
                  <div
                    onClick={() => setCartOpen(false)}
                    style={{
                      position: "fixed", inset: 0, zIndex: 9998,
                      background: "rgba(2,6,18,0.7)",
                      backdropFilter: "blur(4px)",
                    }}
                  />

                  {/* Panel — right-side sheet on all screens */}
                  <div style={{
                    position: "fixed", top: 0, right: 0, bottom: 0, zIndex: 9999,
                    width: "min(100vw, 400px)",
                    background: "#080f20",
                    borderLeft: "1px solid rgba(255,255,255,0.09)",
                    boxShadow: "-24px 0 72px rgba(0,0,0,0.65)",
                    display: "flex", flexDirection: "column",
                    animation: "slideInRight 0.28s cubic-bezier(0.16,1,0.3,1)",
                  }}>
                    <style>{`@keyframes slideInRight{from{transform:translateX(100%)}to{transform:translateX(0)}}`}</style>

                    {/* Gradient top bar */}
                    <div className="h-0.75 shrink-0" style={{ background: "linear-gradient(to right,#2563eb,#4f46e5,#7c3aed)" }} />

                    {/* Header */}
                    <div className="flex items-center justify-between px-5 py-4 shrink-0"
                      style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                      <div className="flex items-center gap-2.5">
                        <ShoppingCart size={15} style={{ color: "#60a5fa" }} />
                        <span className="font-extrabold text-sm" style={{ color: "#f1f5f9" }}>Your Cart</span>
                        {totalItems > 0 && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                            style={{ background: "rgba(37,99,235,0.2)", color: "#60a5fa", border: "1px solid rgba(37,99,235,0.3)" }}>
                            {totalItems} item{totalItems !== 1 ? "s" : ""}
                          </span>
                        )}
                      </div>
                      <button onClick={() => setCartOpen(false)}
                        className="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
                        style={{ color: "rgba(100,116,139,0.6)", background: "transparent" }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.07)"; (e.currentTarget as HTMLElement).style.color = "#e2e8f0"; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "rgba(100,116,139,0.6)"; }}>
                        <X size={16} />
                      </button>
                    </div>

                    {items.length === 0 ? (
                      <div className="flex-1 flex flex-col items-center justify-center px-5 text-center">
                        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
                          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                          <ShoppingCart size={24} style={{ color: "rgba(100,116,139,0.4)" }} />
                        </div>
                        <p className="font-bold text-sm mb-1" style={{ color: "#e2e8f0" }}>Cart is empty</p>
                        <p className="text-xs mb-6" style={{ color: "rgba(100,116,139,0.6)" }}>Add services to get started</p>
                        <Link href="/shop" onClick={() => setCartOpen(false)}
                          className="inline-flex items-center gap-1.5 text-sm font-bold px-5 py-2.5 rounded-xl text-white transition-all hover:scale-[1.03]"
                          style={{ background: "linear-gradient(135deg,#2563eb,#4f46e5)" }}>
                          Browse Services <ArrowRight size={14} />
                        </Link>
                      </div>
                    ) : (
                      <>
                        {/* Items list — scrollable */}
                        <ul className="flex-1 overflow-y-auto">
                          {items.map((item) => (
                            <li key={item.id} className="flex items-center gap-3 px-5 py-4 transition-colors"
                              style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
                              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.02)"}
                              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "transparent"}>
                              <Link href={`/shop/${item.slug}`} onClick={() => setCartOpen(false)}
                                className="w-12 h-12 rounded-xl overflow-hidden shrink-0 transition-opacity hover:opacity-80"
                                style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
                                <ServiceBanner name={item.name} icon={item.icon} category={item.category} />
                              </Link>
                              <div className="flex-1 min-w-0">
                                <span className="text-[9px] font-bold uppercase tracking-widest" style={{ color: "#60a5fa" }}>{item.category}</span>
                                <Link href={`/shop/${item.slug}`} onClick={() => setCartOpen(false)}
                                  className="block text-sm font-semibold truncate leading-snug"
                                  style={{ color: "#e2e8f0" }}>
                                  {item.name}
                                </Link>
                                <p className="text-xs mt-0.5" style={{ color: "rgba(100,116,139,0.6)" }}>
                                  {item.qty} × Rs. {item.price.toLocaleString()}
                                </p>
                              </div>
                              <div className="flex flex-col items-end gap-2 shrink-0">
                                <span className="text-sm font-extrabold"
                                  style={{ background: "linear-gradient(135deg,#60a5fa,#a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                                  Rs. {(item.price * item.qty).toLocaleString()}
                                </span>
                                <button type="button" onClick={(e) => { e.stopPropagation(); removeFromCart(item.id); }}
                                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all"
                                  style={{ color: "rgba(100,116,139,0.5)", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
                                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#fca5a5"; (e.currentTarget as HTMLElement).style.background = "rgba(239,68,68,0.12)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(239,68,68,0.2)"; }}
                                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(100,116,139,0.5)"; (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)"; }}>
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </li>
                          ))}
                        </ul>

                        {/* Footer — always pinned to bottom */}
                        <div className="shrink-0" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                          <div className="px-5 py-3.5 flex items-center justify-between"
                            style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "rgba(100,116,139,0.6)" }}>Subtotal</span>
                            <span className="font-extrabold text-lg"
                              style={{ background: "linear-gradient(135deg,#60a5fa,#a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                              Rs. {totalPrice.toLocaleString()}
                            </span>
                          </div>
                          <div className="px-5 py-4 flex flex-col gap-2.5">
                            <Link href="/cart" onClick={() => setCartOpen(false)}
                              className="flex items-center justify-center gap-2 font-bold py-3 rounded-xl text-sm transition-all"
                              style={{ background: "rgba(255,255,255,0.06)", color: "#e2e8f0", border: "1px solid rgba(255,255,255,0.1)" }}
                              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.1)"}
                              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)"}>
                              View Cart
                            </Link>
                            <Link href="/checkout" onClick={() => setCartOpen(false)}
                              className="flex items-center justify-center gap-2 font-bold py-3 rounded-xl text-sm text-white transition-all"
                              style={{ background: "linear-gradient(135deg,#2563eb,#4f46e5)", boxShadow: "0 4px 18px rgba(37,99,235,0.45)" }}>
                              Checkout <ArrowRight size={14} />
                            </Link>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </>,
                document.body
              )}
            </div>

            {/* Mobile menu toggle */}
            <button onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden w-9 h-9 rounded-xl flex items-center justify-center transition-all"
              style={{ color: "rgba(148,163,184,0.8)", background: menuOpen ? "rgba(255,255,255,0.08)" : "transparent" }}>
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

      </header>

      {/* Mobile nav — full-screen portal overlay */}
      {menuOpen && typeof document !== "undefined" && createPortal(
        <>
          {/* Backdrop */}
          <div onClick={() => setMenuOpen(false)}
            style={{ position: "fixed", inset: 0, zIndex: 9998, background: "rgba(2,6,18,0.75)", backdropFilter: "blur(6px)" }} />

          {/* Panel */}
          <div style={{
            position: "fixed", top: 0, left: 0, bottom: 0, zIndex: 9999,
            width: "min(100vw, 320px)",
            background: "#080f20",
            borderRight: "1px solid rgba(255,255,255,0.09)",
            boxShadow: "24px 0 72px rgba(0,0,0,0.65)",
            display: "flex", flexDirection: "column",
            animation: "slideInLeft 0.28s cubic-bezier(0.16,1,0.3,1)",
          }}>
            <style>{`@keyframes slideInLeft{from{transform:translateX(-100%)}to{transform:translateX(0)}}`}</style>

            {/* Gradient top bar */}
            <div className="h-0.75 shrink-0" style={{ background: "linear-gradient(to right,#2563eb,#4f46e5,#7c3aed)" }} />

            {/* Header row */}
            <div className="flex items-center justify-between px-5 py-4 shrink-0"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
              <Logo dark />
              <button onClick={() => setMenuOpen(false)}
                className="w-8 h-8 rounded-xl flex items-center justify-center transition-all"
                style={{ background: "rgba(255,255,255,0.06)", color: "rgba(148,163,184,0.7)", border: "1px solid rgba(255,255,255,0.08)" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.12)"; (e.currentTarget as HTMLElement).style.color = "#fff"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)"; (e.currentTarget as HTMLElement).style.color = "rgba(148,163,184,0.7)"; }}>
                <X size={16} />
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex-1 px-4 py-4 flex flex-col gap-1 overflow-y-auto">
              {NAV.map((n) => (
                <Link key={n.href} href={n.href} onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all"
                  style={{ color: "rgba(203,213,225,0.75)" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(37,99,235,0.1)"; (e.currentTarget as HTMLElement).style.color = "#fff"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "rgba(203,213,225,0.75)"; }}>
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "#3b82f6" }} />
                  {n.label}
                </Link>
              ))}

              <div className="h-px my-3" style={{ background: "rgba(255,255,255,0.06)" }} />

              <Link href="/cart" onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all"
                style={{ color: "rgba(203,213,225,0.75)" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(37,99,235,0.1)"; (e.currentTarget as HTMLElement).style.color = "#fff"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "rgba(203,213,225,0.75)"; }}>
                <ShoppingCart size={15} style={{ color: "#60a5fa" }} />
                Cart {totalItems > 0 && <span className="ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: "rgba(37,99,235,0.2)", color: "#60a5fa" }}>{totalItems}</span>}
              </Link>
            </nav>

            {/* Bottom — auth */}
            <div className="shrink-0 px-4 py-4" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
              <Show when="signed-out">
                <button onClick={() => { setMenuOpen(false); setAuthOpen(true); }}
                  className="w-full flex items-center justify-center gap-2 font-bold py-3 rounded-xl text-white text-sm transition-all"
                  style={{ background: "linear-gradient(135deg,#2563eb,#4f46e5)", boxShadow: "0 4px 18px rgba(37,99,235,0.4)" }}>
                  <User size={15} /> Sign In
                </button>
              </Show>
              <Show when="signed-in">
                <MobileUserRow onClose={() => setMenuOpen(false)} />
              </Show>
            </div>
          </div>
        </>,
        document.body
      )}
    </div>
  );
}

/* ─── Mobile user row (inside mobile menu) ───────────── */
function MobileUserRow({ onClose }: { onClose: () => void }) {
  const { user } = useUser();
  const { signOut } = useClerk();
  if (!user) return null;
  const name = [user.firstName, user.lastName].filter(Boolean).join(" ") || "User";
  const email = user.emailAddresses[0]?.emailAddress ?? "";
  return (
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 rounded-full overflow-hidden shrink-0"
        style={{ background: "linear-gradient(135deg,#1e3a8a,#4f46e5)", border: "2px solid rgba(96,165,250,0.4)" }}>
        {user.imageUrl
          ? <img src={user.imageUrl} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          : <span className="w-full h-full flex items-center justify-center text-white text-xs font-extrabold">{name[0]}</span>
        }
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold truncate" style={{ color: "#e2e8f0" }}>{name}</p>
        <p className="text-[11px] truncate" style={{ color: "rgba(100,116,139,0.7)" }}>{email}</p>
      </div>
      <button onClick={() => { signOut(); onClose(); }}
        className="w-8 h-8 rounded-lg flex items-center justify-center transition-all shrink-0"
        style={{ color: "rgba(248,113,113,0.7)", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.15)" }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(239,68,68,0.18)"; (e.currentTarget as HTMLElement).style.color = "#fca5a5"; }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(239,68,68,0.08)"; (e.currentTarget as HTMLElement).style.color = "rgba(248,113,113,0.7)"; }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
        </svg>
      </button>
    </div>
  );
}

/* ─── Custom User Menu ────────────────────────────────── */
function UserMenu() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const btnRef = useRef<HTMLButtonElement>(null);
  const dropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropRef.current && !dropRef.current.contains(e.target as Node) &&
        btnRef.current && !btnRef.current.contains(e.target as Node)
      ) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  if (!user) return null;

  const initials = ((user.firstName?.[0] ?? "") + (user.lastName?.[0] ?? "")).toUpperCase() || user.emailAddresses[0]?.emailAddress?.[0]?.toUpperCase() || "U";
  const name = [user.firstName, user.lastName].filter(Boolean).join(" ") || "User";
  const email = user.emailAddresses[0]?.emailAddress ?? "";
  const adminEmails = (process.env.NEXT_PUBLIC_ADMIN_EMAILS || "fahadwaseem461@gmail.com").split(",").map(e => e.trim());
  const isAdmin = adminEmails.includes(email);

  const handleToggle = () => {
    if (!open && btnRef.current) {
      const r = btnRef.current.getBoundingClientRect();
      const dropW = 288;
      const margin = 8;
      // align right edge of dropdown with right edge of button, then clamp
      const rawLeft = r.right - dropW;
      const left = Math.max(margin, Math.min(rawLeft, window.innerWidth - dropW - margin));
      setPos({ top: r.bottom + 8, left });
    }
    setOpen(v => !v);
  };

  return (
    <div>
      {/* Avatar button */}
      <button ref={btnRef} onClick={handleToggle}
        className="w-7 h-7 rounded-full overflow-hidden flex items-center justify-center transition-all duration-200"
        style={{ background: "linear-gradient(135deg,#1e3a8a,#4f46e5)", border: "2px solid rgba(96,165,250,0.4)" }}
        onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = "rgba(96,165,250,0.9)"}
        onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = "rgba(96,165,250,0.4)"}>
        {user.imageUrl
          ? <img src={user.imageUrl} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          : <span className="text-white text-xs font-extrabold">{initials}</span>
        }
      </button>

      {/* Dropdown — portal so it's never clipped by parent stacking contexts */}
      {open && typeof document !== "undefined" && createPortal(
        <>
          {/* Invisible backdrop to catch outside clicks */}
          <div onClick={() => setOpen(false)}
            style={{ position: "fixed", inset: 0, zIndex: 9998 }} />

          <div ref={dropRef}
            style={{
              position: "fixed",
              top: pos.top,
              left: pos.left,
              width: 288,
              zIndex: 9999,
              background: "#0d1525",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 16,
              overflow: "hidden",
              boxShadow: "0 24px 60px rgba(0,0,0,0.7)",
              animation: "ddFadeIn 0.18s cubic-bezier(0.16,1,0.3,1)",
            }}>
            <style>{`@keyframes ddFadeIn{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:translateY(0)}}`}</style>

            {/* Top accent */}
            <div style={{ height: 1, background: "linear-gradient(to right,transparent,rgba(37,99,235,0.6),transparent)" }} />

            {/* Profile row */}
            <div className="flex items-center gap-3 px-4 py-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
              <div className="w-11 h-11 rounded-xl overflow-hidden shrink-0"
                style={{ background: "linear-gradient(135deg,#1e3a8a,#4f46e5)", border: "2px solid rgba(96,165,250,0.3)" }}>
                {user.imageUrl
                  ? <img src={user.imageUrl} alt={name} className="w-full h-full object-cover" />
                  : <span className="w-full h-full flex items-center justify-center text-white font-extrabold text-sm">{initials}</span>
                }
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-bold text-sm truncate" style={{ color: "#e2e8f0" }}>{name}</p>
                  {isAdmin && (
                    <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded-md shrink-0 uppercase tracking-wider"
                      style={{ background: "rgba(234,179,8,0.15)", color: "#fbbf24", border: "1px solid rgba(234,179,8,0.3)" }}>
                      Admin
                    </span>
                  )}
                </div>
                <p className="text-xs truncate mt-0.5" style={{ color: "rgba(100,116,139,0.8)" }}>{email}</p>
              </div>
            </div>

            {/* Menu items */}
            <div className="py-2">
              {isAdmin && (
                <a href="/admin" onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm transition-colors"
                  style={{ color: "#fbbf24", textDecoration: "none" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(234,179,8,0.08)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "#fbbf24", flexShrink: 0 }}>
                    <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
                  </svg>
                  Admin Panel
                </a>
              )}
              <a href="/orders" onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 text-sm transition-colors"
                style={{ color: "rgba(203,213,225,0.8)", textDecoration: "none" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(37,99,235,0.1)"; (e.currentTarget as HTMLElement).style.color = "#93c5fd"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "rgba(203,213,225,0.8)"; }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "#60a5fa", flexShrink: 0 }}>
                  <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/><line x1="9" y1="12" x2="15" y2="12"/><line x1="9" y1="16" x2="13" y2="16"/>
                </svg>
                My Orders
              </a>
              <button onClick={() => { signOut(); setOpen(false); }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors text-left"
                style={{ color: "rgba(203,213,225,0.8)" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(239,68,68,0.08)"; (e.currentTarget as HTMLElement).style.color = "#fca5a5"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "rgba(203,213,225,0.8)"; }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "#f87171", flexShrink: 0 }}>
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
                </svg>
                Sign Out
              </button>
            </div>

            {/* Footer */}
            <div className="px-4 py-2.5 flex items-center gap-1.5" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
              <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
              <span className="text-[10px]" style={{ color: "rgba(100,116,139,0.6)" }}>Secured by Clerk</span>
            </div>
          </div>
        </>,
        document.body
      )}
    </div>
  );
}

const SERVICE_ICON_MAP: Record<string, LucideIcon> = {
  "id-card":        CreditCard,
  "star":           Star,
  "image":          Image,
  "mobile":         Smartphone,
  "laptop-code":    Laptop,
  "building":       Building,
  "store":          ShoppingBag,
  "search":         Search,
  "share-alt":      Share2,
  "envelope":       Mail,
  "camera":         Camera,
  "map-marker-alt": MapPin,
  "file-text":      FileText,
  "trending-up":    TrendingUp,
  "settings":       Settings,
  "monitor":        Monitor,
  "message-circle": MessageCircle,
  "users":          Users,
};

function getServiceIcon(icon: string) {
  const Icon = SERVICE_ICON_MAP[icon] ?? Star;
  return <Icon size={17} />;
}
