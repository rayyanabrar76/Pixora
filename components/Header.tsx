"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import {
  ShoppingCart, Menu, X, Search, User,
  CreditCard, Star, Image, Smartphone, Laptop, Building, Mail, Phone,
  ShoppingBag, Share2, Camera, MapPin, FileText, TrendingUp,
  Settings, Monitor, MessageCircle, Users, type LucideIcon,
} from "lucide-react";
import { SERVICES } from "@/lib/services";
import Logo from "@/components/Logo";
import ServiceBanner from "@/components/ServiceBanner";
import { Show, UserButton } from "@clerk/nextjs";
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
  const cartRef   = useRef<HTMLDivElement>(null);

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
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) closeSearch();
      if (cartRef.current   && !cartRef.current.contains(e.target as Node))   setCartOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

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
    { icon: "✦", text: "Empowering top brands with world-class digital solutions" },
    { icon: "👑", text: "Trusted by 200+ growing businesses across Pakistan" },
    { icon: "🎨", text: "Logo Design with unlimited revisions — from ₨1,500" },
    { icon: "⚡", text: "Most services delivered in 24–48 hours" },
    { icon: "✦", text: "New: Reels & Short Video Editing — from ₨2,500" },
    { icon: "🏆", text: "Premium brand identities that make you stand out" },
    { icon: "🎯", text: "Free consultation — get a custom quote today" },
    { icon: "🚀", text: "Landing pages built to convert — from ₨8,000" },
    { icon: "✦", text: "We build brands that people remember and trust" },
    { icon: "💼", text: "From startups to enterprises — we scale with you" },
    { icon: "🌟", text: "5★ rated service — 100% client satisfaction guaranteed" },
    { icon: "✦", text: "Google My Business setup — boost your local visibility" },
  ];

  return (
    <div className="sticky top-0 z-50">
      {/* Announcement bar */}
      {showBar && (
        <div className="overflow-hidden"
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

          {/* Left fade */}
          <div className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to right,#0a0f1e,transparent)" }} />
          {/* Right fade + close btn space */}
          <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to left,#0a0f1e 60%,transparent)" }} />

          {/* Scrolling track — two copies for seamless loop */}
          <div className="flex items-center h-full overflow-hidden">
            <div className="marquee-track">
              {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
                <span key={i} className="flex items-center gap-2 whitespace-nowrap px-8 text-[11px] font-medium"
                  style={{ color: "rgba(203,213,225,0.75)" }}>
                  <span className="text-blue-400 text-[10px]">{item.icon}</span>
                  {item.text}
                  <span className="text-blue-500/40 mx-2">◆</span>
                </span>
              ))}
            </div>
          </div>

          {/* Dismiss */}
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

              {searchOpen && (
                <div className="absolute right-0 top-12 w-80 rounded-2xl overflow-hidden"
                  style={{ background: "#0d1525", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}>
                  <form onSubmit={handleSubmit} className="flex items-center gap-2 px-4 py-3"
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                    <Search size={14} style={{ color: "rgba(100,116,139,0.8)" }} className="shrink-0" />
                    <input ref={inputRef} value={query} onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search services..."
                      className="flex-1 text-sm outline-none bg-transparent"
                      style={{ color: "#e2e8f0", caretColor: "#60a5fa" }} />
                    {query && (
                      <button type="button" onClick={() => setQuery("")} style={{ color: "rgba(100,116,139,0.8)" }}>
                        <X size={14} />
                      </button>
                    )}
                  </form>
                  {results.length > 0 ? (
                    <ul className="max-h-72 overflow-y-auto">
                      {results.map((s) => (
                        <li key={s.id}>
                          <button onClick={() => handleSelect(s.slug)}
                            className="w-full flex items-start gap-3 px-4 py-3 text-left transition-colors"
                            style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
                            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)"}
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
                    <div className="px-4 py-8 text-center text-sm" style={{ color: "rgba(100,116,139,0.8)" }}>No services found</div>
                  ) : (
                    <div className="px-4 py-3">
                      <p className="text-xs mb-2" style={{ color: "rgba(100,116,139,0.6)" }}>Popular</p>
                      <div className="flex flex-wrap gap-1.5">
                        {["Logo Design", "Landing Page", "SEO", "Social Media"].map((t) => (
                          <button key={t} onClick={() => setQuery(t)}
                            className="text-xs px-2.5 py-1 rounded-full transition-colors"
                            style={{ background: "rgba(255,255,255,0.07)", color: "rgba(203,213,225,0.7)", border: "1px solid rgba(255,255,255,0.08)" }}
                            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(37,99,235,0.2)"; (e.currentTarget as HTMLElement).style.color = "#60a5fa"; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.07)"; (e.currentTarget as HTMLElement).style.color = "rgba(203,213,225,0.7)"; }}>
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
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
              <div className="w-9 h-9 flex items-center justify-center">
                <UserButton />
              </div>
            </Show>
            {authOpen && <AuthModal onClose={() => setAuthOpen(false)} />}

            {/* Cart */}
            <div ref={cartRef} className="relative">
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

              {cartOpen && (
                <div className="absolute right-0 top-12 w-80 rounded-2xl overflow-hidden"
                  style={{ background: "#0d1525", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}>
                  <div className="flex items-center justify-between px-4 py-3.5"
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                    <span className="font-bold text-sm" style={{ color: "#e2e8f0" }}>
                      Cart
                      {totalItems > 0 && <span className="ml-2 text-xs font-normal" style={{ color: "#60a5fa" }}>₨ {totalPrice.toLocaleString()}</span>}
                    </span>
                    <button onClick={() => setCartOpen(false)} style={{ color: "rgba(100,116,139,0.8)" }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#e2e8f0"}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "rgba(100,116,139,0.8)"}>
                      <X size={16} />
                    </button>
                  </div>

                  {items.length === 0 ? (
                    <div className="px-4 py-12 text-center">
                      <ShoppingCart size={36} className="mx-auto mb-3" style={{ color: "rgba(255,255,255,0.07)" }} />
                      <p className="text-sm" style={{ color: "rgba(100,116,139,0.7)" }}>Your cart is empty</p>
                    </div>
                  ) : (
                    <>
                      <ul className="max-h-64 overflow-y-auto divide-y" style={{ borderColor: "rgba(255,255,255,0.04)" }}>
                        {items.map((item) => (
                          <li key={item.id} className="flex items-center gap-3 px-4 py-3">
                            <Link href={`/shop/${item.slug}`} onClick={() => setCartOpen(false)}
                              className="w-12 h-12 rounded-xl overflow-hidden shrink-0 hover:opacity-80 transition-opacity">
                              <ServiceBanner name={item.name} icon={item.icon} category={item.category} />
                            </Link>
                            <div className="flex-1 min-w-0">
                              <Link href={`/shop/${item.slug}`} onClick={() => setCartOpen(false)}
                                className="text-sm font-semibold truncate leading-tight block transition-colors"
                                style={{ color: "#e2e8f0" }}
                                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#60a5fa"}
                                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "#e2e8f0"}>
                                {item.name}
                              </Link>
                              <p className="text-xs mt-0.5" style={{ color: "rgba(100,116,139,0.7)" }}>{item.qty} × ₨ {item.price.toLocaleString()}</p>
                            </div>
                            <button onClick={() => removeFromCart(item.id)}
                              className="shrink-0 ml-1 transition-colors"
                              style={{ color: "rgba(100,116,139,0.5)" }}
                              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#f87171"}
                              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "rgba(100,116,139,0.5)"}>
                              <X size={15} />
                            </button>
                          </li>
                        ))}
                      </ul>

                      <div className="px-4 py-3 flex justify-between items-center"
                        style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                        <span className="text-sm" style={{ color: "rgba(148,163,184,0.7)" }}>Subtotal</span>
                        <span className="font-extrabold text-sm" style={{ color: "#e2e8f0" }}>₨ {totalPrice.toLocaleString()}</span>
                      </div>

                      <div className="px-4 pb-4 flex flex-col gap-2">
                        <Link href="/cart" onClick={() => setCartOpen(false)}
                          className="block text-center font-bold py-2.5 rounded-xl text-sm transition-all hover:scale-[1.02]"
                          style={{ background: "rgba(255,255,255,0.08)", color: "#e2e8f0", border: "1px solid rgba(255,255,255,0.1)" }}>
                          View Cart
                        </Link>
                        <Link href="/contact" onClick={() => setCartOpen(false)}
                          className="block text-center font-bold py-2.5 rounded-xl text-sm transition-all hover:scale-[1.02] text-white"
                          style={{ background: "linear-gradient(135deg,#2563eb,#4f46e5)", boxShadow: "0 4px 16px rgba(37,99,235,0.4)" }}>
                          Checkout
                        </Link>
                      </div>
                    </>
                  )}
                </div>
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

        {/* Mobile nav */}
        {menuOpen && (
          <div className="md:hidden px-4 pb-4" style={{ borderTop: "1px solid rgba(255,255,255,0.07)", background: "#07090f" }}>
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} onClick={() => setMenuOpen(false)}
                className="flex items-center py-3 text-sm font-medium transition-colors"
                style={{ color: "rgba(203,213,225,0.7)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#fff"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "rgba(203,213,225,0.7)"}>
                {n.label}
              </Link>
            ))}
          </div>
        )}
      </header>
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
