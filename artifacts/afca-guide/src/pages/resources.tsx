import React, { useState, useEffect, useMemo } from "react";
import { BackButton } from "@/components/back-button";
import {
  BookOpen, ExternalLink, Search, Star, Shield, Scale, Phone,
  FileText, Users, AlertTriangle, Home, TrendingUp, Heart,
  Calculator, Briefcase, Zap, ChevronDown, ChevronUp, Filter, X
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

// ── CATEGORY CONFIG ───────────────────────────────────────────────────────────

interface CatConfig {
  icon: React.ElementType;
  color: string;
  bg: string;
  border: string;
}

const CAT_CONFIG: Record<string, CatConfig> = {
  "AFCA Direct":              { icon: Scale,          color: "text-blue-700",   bg: "bg-blue-50",    border: "border-blue-200" },
  "Legal Aid":                { icon: Shield,         color: "text-violet-700", bg: "bg-violet-50",  border: "border-violet-200" },
  "Consumer Rights":          { icon: Users,          color: "text-green-700",  bg: "bg-green-50",   border: "border-green-200" },
  "Financial Counselling":    { icon: Heart,          color: "text-rose-700",   bg: "bg-rose-50",    border: "border-rose-200" },
  "Banking Regulation":       { icon: Shield,         color: "text-slate-700",  bg: "bg-slate-50",   border: "border-slate-200" },
  "Insurance":                { icon: Shield,         color: "text-amber-700",  bg: "bg-amber-50",   border: "border-amber-200" },
  "Superannuation":           { icon: TrendingUp,     color: "text-cyan-700",   bg: "bg-cyan-50",    border: "border-cyan-200" },
  "Scams & Fraud":            { icon: AlertTriangle,  color: "text-red-700",    bg: "bg-red-50",     border: "border-red-200" },
  "Credit & Debt":            { icon: FileText,       color: "text-orange-700", bg: "bg-orange-50",  border: "border-orange-200" },
  "Mortgage & Housing":       { icon: Home,           color: "text-teal-700",   bg: "bg-teal-50",    border: "border-teal-200" },
  "Bankruptcy & Insolvency":  { icon: AlertTriangle,  color: "text-red-900",    bg: "bg-red-50",     border: "border-red-300" },
  "Tax & ATO":                { icon: Briefcase,      color: "text-yellow-700", bg: "bg-yellow-50",  border: "border-yellow-200" },
  "Investment & Securities":  { icon: TrendingUp,     color: "text-indigo-700", bg: "bg-indigo-50",  border: "border-indigo-200" },
  "Government Services":      { icon: Shield,         color: "text-blue-900",   bg: "bg-blue-50",    border: "border-blue-300" },
  "Mental Health & Wellbeing":{ icon: Heart,          color: "text-pink-700",   bg: "bg-pink-50",    border: "border-pink-200" },
  "Tools & Calculators":      { icon: Calculator,     color: "text-purple-700", bg: "bg-purple-50",  border: "border-purple-200" },
  "Small Business Finance":   { icon: Briefcase,      color: "text-emerald-700",bg: "bg-emerald-50", border: "border-emerald-200" },
  "Energy & Utilities":       { icon: Zap,            color: "text-yellow-800", bg: "bg-yellow-50",  border: "border-yellow-300" },
  "Telecommunications":       { icon: Phone,          color: "text-sky-700",    bg: "bg-sky-50",     border: "border-sky-200" },
  "First Nations Resources":  { icon: Users,          color: "text-orange-800", bg: "bg-orange-50",  border: "border-orange-300" },
  "Disability & Accessibility":{ icon: Heart,         color: "text-fuchsia-700",bg: "bg-fuchsia-50", border: "border-fuchsia-200" },
  "Seniors & Elder Australians":{ icon: Heart,        color: "text-rose-800",   bg: "bg-rose-50",    border: "border-rose-300" },
  "Women & Financial Abuse":  { icon: Shield,         color: "text-purple-800", bg: "bg-purple-50",  border: "border-purple-300" },
  "Legislation":              { icon: Scale,          color: "text-slate-800",  bg: "bg-slate-50",   border: "border-slate-300" },
  "Court & Tribunals":        { icon: Scale,          color: "text-gray-700",   bg: "bg-gray-50",    border: "border-gray-200" },
  "Community Legal":          { icon: Users,          color: "text-lime-700",   bg: "bg-lime-50",    border: "border-lime-200" },
  "External Websites":        { icon: ExternalLink,   color: "text-blue-600",   bg: "bg-blue-50",    border: "border-blue-200" },
  "Veterans & Military":      { icon: Shield,         color: "text-green-900",  bg: "bg-green-50",   border: "border-green-300" },
  "Students & Young Adults":  { icon: BookOpen,       color: "text-violet-800", bg: "bg-violet-50",  border: "border-violet-300" },
  "Migration & Refugees":     { icon: Users,          color: "text-teal-800",   bg: "bg-teal-50",    border: "border-teal-300" },
  "Property & Real Estate":   { icon: Home,           color: "text-stone-700",  bg: "bg-stone-50",   border: "border-stone-200" },
  "Health & Medical Finance": { icon: Heart,          color: "text-red-600",    bg: "bg-red-50",     border: "border-red-200" },
  "Consumer Products":        { icon: Shield,         color: "text-indigo-600", bg: "bg-indigo-50",  border: "border-indigo-200" },
};

const DEFAULT_CONFIG: CatConfig = { icon: BookOpen, color: "text-gray-700", bg: "bg-gray-50", border: "border-gray-200" };

const RESOURCE_TYPE_LABELS: Record<string, string> = {
  link: "Website",
  document: "Document",
  contact: "Contact / Helpline",
  legislation: "Legislation",
};

const RESOURCE_TYPE_COLOURS: Record<string, string> = {
  link:        "bg-blue-100   text-blue-800   border-blue-200",
  document:    "bg-orange-100 text-orange-800 border-orange-200",
  contact:     "bg-green-100  text-green-800  border-green-200",
  legislation: "bg-purple-100 text-purple-800 border-purple-200",
};

// ── TYPES ─────────────────────────────────────────────────────────────────────

interface Resource {
  id: number;
  title: string;
  description: string;
  url: string;
  category: string;
  subcategory: string | null;
  resourceType: string;
  tags: string[];
  isFeatured: boolean;
}

// ── COMPONENT ─────────────────────────────────────────────────────────────────

export default function Resources() {
  const [search, setSearch]               = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [resources, setResources]         = useState<Resource[]>([]);
  const [loading, setLoading]             = useState(true);
  const [showFilters, setShowFilters]     = useState(false);
  const [expandedCats, setExpandedCats]   = useState<Set<string>>(new Set());

  useEffect(() => {
    fetch("/api/resources")
      .then((r) => r.json())
      .then((data) => { setResources(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  // Dynamic category list from real data
  const categories = useMemo(() => {
    const cats = Array.from(new Set(resources.map((r) => r.category))).sort();
    return ["All", ...cats];
  }, [resources]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return resources.filter((r) => {
      const matchCat = selectedCategory === "All" || r.category === selectedCategory;
      const matchSearch =
        !q ||
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.subcategory?.toLowerCase().includes(q) ||
        (r.tags || []).some((t) => t.toLowerCase().includes(q));
      return matchCat && matchSearch;
    });
  }, [resources, search, selectedCategory]);

  const featured = useMemo(() => filtered.filter((r) => r.isFeatured), [filtered]);
  const byCategory = useMemo(() => {
    const map: Record<string, Resource[]> = {};
    filtered.forEach((r) => {
      if (!map[r.category]) map[r.category] = [];
      map[r.category].push(r);
    });
    return map;
  }, [filtered]);

  const toggleCat = (cat: string) => {
    setExpandedCats((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat); else next.add(cat);
      return next;
    });
  };

  const clearSearch = () => { setSearch(""); setSelectedCategory("All"); };

  const totalCount = resources.length;
  const isFiltering = search || selectedCategory !== "All";

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-5xl px-4 pt-4">
        <BackButton />
      </div>

      {/* ── HERO ── */}
      <div className="relative overflow-hidden text-white" style={{ background: "linear-gradient(135deg,#0d2340 0%,#0f3460 50%,#1a1a2e 100%)" }}>
        <div className="absolute -top-10 -left-10 w-64 h-64 rounded-full opacity-10 pointer-events-none" style={{ background: "radial-gradient(circle,#f97316,transparent 70%)" }} />
        <div className="absolute -bottom-5 right-0 w-48 h-48 rounded-full opacity-10 pointer-events-none" style={{ background: "radial-gradient(circle,#3b82f6,transparent 70%)" }} />
        <div className="container mx-auto max-w-5xl px-4 py-12 relative z-10 text-center">
          <div className="h-16 w-16 rounded-2xl flex items-center justify-center mx-auto mb-5 border border-white/20" style={{ background: "rgba(249,115,22,0.2)" }}>
            <BookOpen className="h-8 w-8 text-amber-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-3" style={{ background: "linear-gradient(135deg,#fff 30%,#fde68a 70%,#f97316 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            Resource Library
          </h1>
          <p className="text-lg text-white/75 max-w-2xl mx-auto mb-4">
            {totalCount}+ curated resources covering banking, insurance, superannuation, scams, credit, legal aid, and every Australian government body — the most comprehensive collection available.
          </p>
          <div className="flex items-center justify-center flex-wrap gap-2">
            {["Banking", "Insurance", "Superannuation", "Scams & Fraud", "Credit & Debt", "Legal Aid", "Government Services"].map((t) => (
              <button key={t} onClick={() => { setSelectedCategory(t); setShowFilters(true); }}
                className="text-xs px-3 py-1 rounded-full border border-white/25 bg-white/10 hover:bg-white/20 transition-colors text-white/80 font-medium">
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 py-8">

        {/* ── SEARCH BAR ── */}
        <div className="flex gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search 1000+ resources — try 'mortgage hardship', 'scam loss', 'TPD', 'super fund'…"
              className="pl-9 pr-9 h-11"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 h-11 rounded-md border text-sm font-medium transition-colors ${showFilters ? "bg-primary text-primary-foreground border-primary" : "bg-background border-border hover:border-primary/50"}`}
          >
            <Filter className="h-4 w-4" />
            <span className="hidden sm:inline">Filter by Category</span>
            {selectedCategory !== "All" && <span className="bg-white/20 text-xs px-1.5 py-0.5 rounded-full">{selectedCategory}</span>}
          </button>
        </div>

        {/* ── CATEGORY FILTER PANEL ── */}
        {showFilters && (
          <div className="mb-6 p-4 border rounded-xl bg-muted/30">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-semibold">Filter by Category</p>
              {selectedCategory !== "All" && (
                <button onClick={() => setSelectedCategory("All")} className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">
                  <X className="h-3 w-3" /> Clear
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {categories.map((cat) => {
                const cfg = CAT_CONFIG[cat] ?? DEFAULT_CONFIG;
                const Icon = cfg.icon;
                const count = cat === "All" ? resources.length : resources.filter((r) => r.category === cat).length;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                      selectedCategory === cat
                        ? `${cfg.bg} ${cfg.color} ${cfg.border} shadow-sm`
                        : "bg-background border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
                    }`}
                  >
                    <Icon className="h-3 w-3 shrink-0" />
                    {cat}
                    <span className="opacity-60">({count})</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ── STATUS BAR ── */}
        <div className="flex items-center justify-between mb-6 text-sm text-muted-foreground">
          <span>
            Showing <span className="font-semibold text-foreground">{filtered.length}</span> of <span className="font-semibold text-foreground">{totalCount}</span> resources
            {selectedCategory !== "All" && <> in <span className="font-semibold text-primary">{selectedCategory}</span></>}
          </span>
          {isFiltering && (
            <button onClick={clearSearch} className="text-xs text-primary hover:underline flex items-center gap-1">
              <X className="h-3 w-3" /> Clear all
            </button>
          )}
        </div>

        {loading ? (
          <div className="text-center py-24 text-muted-foreground">
            <BookOpen className="h-10 w-10 mx-auto mb-3 opacity-30" />
            <p>Loading resources…</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24 text-muted-foreground">
            <Search className="h-10 w-10 mx-auto mb-3 opacity-30" />
            <p className="text-lg font-medium">No resources found</p>
            <p className="text-sm mt-1">Try a different search term or category</p>
            <button onClick={clearSearch} className="mt-4 text-sm text-primary hover:underline">Clear search</button>
          </div>
        ) : (
          <>
            {/* ── FEATURED (when not category-filtered) ── */}
            {selectedCategory === "All" && !search && featured.length > 0 && (
              <section className="mb-10">
                <div className="flex items-center gap-2 mb-4">
                  <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                  <h2 className="text-lg font-bold text-primary">Essential Resources — Start Here</h2>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {featured.slice(0, 12).map((r) => <ResourceCard key={r.id} resource={r} />)}
                </div>
              </section>
            )}

            {/* ── BY CATEGORY ── */}
            {selectedCategory === "All" && !search ? (
              <div className="space-y-8">
                {Object.entries(byCategory)
                  .sort(([a], [b]) => a.localeCompare(b))
                  .map(([cat, items]) => {
                    const cfg = CAT_CONFIG[cat] ?? DEFAULT_CONFIG;
                    const Icon = cfg.icon;
                    const showAll = expandedCats.has(cat);
                    const displayed = showAll ? items : items.slice(0, 6);
                    return (
                      <section key={cat} className={`rounded-2xl border p-6 ${cfg.bg} ${cfg.border}`}>
                        <div className="flex items-center justify-between mb-5">
                          <div className="flex items-center gap-2">
                            <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${cfg.bg} border ${cfg.border}`}>
                              <Icon className={`h-4 w-4 ${cfg.color}`} />
                            </div>
                            <h2 className={`text-base font-bold ${cfg.color}`}>{cat}</h2>
                            <span className="text-xs text-muted-foreground bg-white/70 px-2 py-0.5 rounded-full border">{items.length}</span>
                          </div>
                          {items.length > 6 && (
                            <button
                              onClick={() => toggleCat(cat)}
                              className={`flex items-center gap-1 text-xs font-medium ${cfg.color} hover:underline`}
                            >
                              {showAll ? (<><ChevronUp className="h-3.5 w-3.5" /> Show less</>) : (<><ChevronDown className="h-3.5 w-3.5" /> Show all {items.length}</>)}
                            </button>
                          )}
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                          {displayed.map((r) => <ResourceCard key={r.id} resource={r} compact />)}
                        </div>
                      </section>
                    );
                  })}
              </div>
            ) : (
              // Search / category filter — flat grid
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map((r) => <ResourceCard key={r.id} resource={r} />)}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// ── CARD ──────────────────────────────────────────────────────────────────────

function ResourceCard({ resource: r, compact = false }: { resource: Resource; compact?: boolean }) {
  const isValidUrl = r.url && r.url.startsWith("http");

  return (
    <a
      href={isValidUrl ? r.url : undefined}
      target="_blank"
      rel="noopener noreferrer"
      onClick={!isValidUrl ? (e) => e.preventDefault() : undefined}
      className={`group bg-white border rounded-xl ${compact ? "p-3" : "p-4"} shadow-sm hover:shadow-md hover:border-primary/30 transition-all flex flex-col gap-2 ${!isValidUrl ? "cursor-default opacity-60" : ""}`}
    >
      <div className="flex items-start justify-between gap-2">
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full border shrink-0 ${RESOURCE_TYPE_COLOURS[r.resourceType] ?? "bg-gray-100 text-gray-700 border-gray-200"}`}>
          {RESOURCE_TYPE_LABELS[r.resourceType] ?? r.resourceType}
        </span>
        <div className="flex items-center gap-1 shrink-0">
          {r.isFeatured && <Star className="h-3 w-3 text-amber-400 fill-amber-400" />}
          {isValidUrl && <ExternalLink className="h-3 w-3 text-muted-foreground group-hover:text-primary transition-colors" />}
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <h3 className={`font-semibold text-foreground group-hover:text-primary transition-colors leading-tight ${compact ? "text-sm" : "text-sm"} mb-1`}>
          {r.title}
        </h3>
        {!compact && (
          <p className="text-xs text-muted-foreground line-clamp-2">{r.description}</p>
        )}
      </div>
      <div className="flex items-center gap-1 flex-wrap">
        {r.subcategory && (
          <span className="text-xs text-muted-foreground/70 bg-muted px-1.5 py-0.5 rounded">{r.subcategory}</span>
        )}
      </div>
    </a>
  );
}
