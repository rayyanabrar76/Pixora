"use client";

import { useState, useMemo, useEffect } from "react";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { SERVICES, CATEGORIES, type Service } from "@/lib/services";
import { supabase, type DbService } from "@/lib/supabase";

function dbToService(s: DbService): Service {
  return {
    id: `db_${s.id}`,
    slug: s.slug,
    name: s.name,
    category: s.category,
    price: s.price,
    priceLabel: s.price_label,
    description: s.description,
    details: s.details ?? [],
    badge: s.badge ?? undefined,
    icon: s.icon,
  };
}

function ShopContent() {
  const params = useSearchParams();
  const initialCat    = params.get("category") || "All";
  const initialSearch = params.get("search")   || "";
  const [activeCategory, setActiveCategory] = useState(initialCat);
  const [search, setSearch] = useState(initialSearch);
  const [dbServices, setDbServices] = useState<Service[]>([]);
  const [allDbSlugs, setAllDbSlugs] = useState<string[]>([]);

  useEffect(() => {
    // Fetch visible (non-deleted) services for display
    supabase.from("services").select("*").is("deleted_at", null).order("created_at", { ascending: false })
      .then(({ data }) => { if (data) setDbServices(data.map(dbToService)); });
    // Fetch ALL slugs (including deleted) so deleted static services stay hidden
    supabase.from("services").select("slug")
      .then(({ data }) => { if (data) setAllDbSlugs(data.map((d: { slug: string }) => d.slug)); });
  }, []);

  const allServices = useMemo(() => [
    ...SERVICES.filter(s => !allDbSlugs.includes(s.slug)),
    ...dbServices,
  ], [dbServices, allDbSlugs]);

  const allCategories = useMemo(() => {
    const extra = dbServices.map(s => s.category).filter(c => !CATEGORIES.includes(c));
    return [...CATEGORIES, ...new Set(extra)];
  }, [dbServices]);

  const filtered = useMemo(() =>
    allServices.filter((s) => {
      const matchesCat    = activeCategory === "All" || s.category === activeCategory;
      const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
                            s.description.toLowerCase().includes(search.toLowerCase());
      return matchesCat && matchesSearch;
    }),
  [allServices, activeCategory, search]);

  return (
    <div style={{ background: "linear-gradient(180deg,#060d1f 0%,#080f22 100%)", minHeight: "100vh" }}>

      {/* Page hero */}
      <div className="relative overflow-hidden pt-16 pb-12 px-4">
        <div className="absolute top-0 left-1/3 w-80 h-80 rounded-full blur-3xl opacity-10 pointer-events-none"
          style={{ background: "radial-gradient(circle,#2563eb,transparent)" }} />
        <div className="absolute top-0 right-1/3 w-80 h-80 rounded-full blur-3xl opacity-10 pointer-events-none"
          style={{ background: "radial-gradient(circle,#7c3aed,transparent)" }} />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-px"
          style={{ background: "linear-gradient(to right,transparent,rgba(37,99,235,0.3),transparent)" }} />

        <div className="max-w-6xl mx-auto relative">
          <span className="inline-flex items-center gap-2 text-[11px] font-bold px-3.5 py-1.5 rounded-full uppercase tracking-widest mb-5"
            style={{ background: "rgba(37,99,235,0.12)", border: "1px solid rgba(37,99,235,0.25)", color: "#60a5fa" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            Browse All
          </span>
          <h1 className="text-4xl font-extrabold mb-2 leading-tight"
            style={{ background: "linear-gradient(135deg,#fff 40%,#93c5fd)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            Our Services
          </h1>
          <p style={{ color: "rgba(148,163,184,0.7)" }} className="text-sm">
            {filtered.length} service{filtered.length !== 1 ? "s" : ""} available
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-20">

        {/* Search + filters row */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1 max-w-sm">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              style={{ color: "rgba(100,116,139,0.7)" }} />
            <input
              type="text"
              placeholder="Search services..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-9 py-2.5 text-sm rounded-xl outline-none"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#e2e8f0",
                caretColor: "#60a5fa",
              }}
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2"
                style={{ color: "rgba(100,116,139,0.7)" }}>
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Category pills */}
        <div className="flex gap-2 flex-wrap mb-10">
          {allCategories.map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className="px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200"
              style={activeCategory === cat ? {
                background: "linear-gradient(135deg,#2563eb,#4f46e5)",
                color: "#fff",
                boxShadow: "0 4px 14px rgba(37,99,235,0.4)",
                border: "1px solid transparent",
              } : {
                background: "rgba(255,255,255,0.05)",
                color: "rgba(203,213,225,0.7)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
              onMouseEnter={e => { if (activeCategory !== cat) { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.1)"; (e.currentTarget as HTMLElement).style.color = "#fff"; }}}
              onMouseLeave={e => { if (activeCategory !== cat) { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)"; (e.currentTarget as HTMLElement).style.color = "rgba(203,213,225,0.7)"; }}}>
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((s) => <ProductCard key={s.id} service={s} />)}
          </div>
        ) : (
          <div className="text-center py-28">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <Search size={24} style={{ color: "rgba(100,116,139,0.5)" }} />
            </div>
            <p className="font-bold text-lg mb-1" style={{ color: "#e2e8f0" }}>No services found</p>
            <p className="text-sm" style={{ color: "rgba(100,116,139,0.7)" }}>Try a different search or category</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense>
      <ShopContent />
    </Suspense>
  );
}
