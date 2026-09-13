import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "wouter";
import {
  Scale, BookOpen, FileText, HelpCircle, List, Send, BookMarked,
  Layers, Gavel, Info, ShieldAlert, CheckSquare, MessageCircle,
  Menu, X, ChevronDown, AlertTriangle, Users, ExternalLink,
  Shield, Phone, ChevronRight
} from "lucide-react";
import { ChatWidget } from "./chat-widget";

// ── NAV STRUCTURE ────────────────────────────────────────────────────────────

const PRIMARY_NAV = [
  { href: "/guide",           label: "The Process",    icon: BookOpen },
  { href: "/write-complaint", label: "Write Complaint", icon: FileText },
  { href: "/my-complaints",   label: "My Drafts",      icon: Send },
  { href: "/faq",             label: "FAQ",            icon: HelpCircle },
];

const MORE_SECTIONS = [
  {
    heading: "Resources & Research",
    items: [
      { href: "/agencies",        label: "All Agencies & Help",  icon: Users,         desc: "93+ regulators, legal aid, ombudsmen" },
      { href: "/resources",       label: "Resource Library",     icon: BookMarked,    desc: "505+ curated links by topic" },
      { href: "/templates",       label: "Letter Templates",     icon: Layers,        desc: "142+ complaint letter templates" },
      { href: "/case-studies",    label: "Case Studies",         icon: Gavel,         desc: "Real AFCA dispute outcomes" },
      { href: "/complaint-types", label: "Complaint Types",      icon: List,          desc: "Browse by issue category" },
    ],
  },
  {
    heading: "Learn & Understand",
    items: [
      { href: "/about-afca",      label: "About AFCA",           icon: Info,          desc: "How AFCA works" },
      { href: "/dos-and-donts",   label: "Do's & Don'ts",        icon: CheckSquare,   desc: "Mistakes to avoid" },
      { href: "/testimonies",     label: "Horror Stories",       icon: AlertTriangle, desc: "Real consumer experiences" },
      { href: "/bank-sanctions",  label: "Bank Sanctions",       icon: ShieldAlert,   desc: "Regulatory actions against banks" },
      { href: "/forum",           label: "Community Forum",      icon: MessageCircle, desc: "Peer support and discussion" },
    ],
  },
];

const ALL_NAV_FLAT = [...PRIMARY_NAV, ...MORE_SECTIONS.flatMap((s) => s.items)];

// ── LAYOUT ───────────────────────────────────────────────────────────────────

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen]     = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  const isMoreActive = MORE_SECTIONS.flatMap((s) => s.items).some((i) => i.href === location);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) setMoreOpen(false);
    }
    if (moreOpen) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [moreOpen]);

  useEffect(() => { setMobileOpen(false); setMoreOpen(false); }, [location]);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#ffffff" }}>

      {/* ── HERO BANNER ─────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden text-white" style={{ background: "linear-gradient(135deg, #040d1a 0%, #081f3f 35%, #0c2d58 65%, #040d1a 100%)" }}>

        {/* Ambient glow orbs */}
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full opacity-15 pointer-events-none" style={{ background: "radial-gradient(circle, #f59e0b, transparent 70%)" }} />
        <div className="absolute -bottom-12 right-8 w-72 h-72 rounded-full opacity-12 pointer-events-none" style={{ background: "radial-gradient(circle, #3b82f6, transparent 70%)" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full opacity-4 pointer-events-none" style={{ background: "radial-gradient(circle, #ffffff, transparent 60%)" }} />

        {/* Fine grid texture */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)", backgroundSize: "48px 48px" }} />

        {/* Gold top accent */}
        <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, transparent 0%, #f59e0b 25%, #fbbf24 50%, #f59e0b 75%, transparent 100%)" }} />

        <div className="container mx-auto px-4 py-14 md:py-18 text-center relative z-10" style={{ paddingTop: "3.5rem", paddingBottom: "3.5rem" }}>

          {/* Glowing icon */}
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 rounded-2xl blur-2xl opacity-50" style={{ background: "radial-gradient(circle, #f59e0b, transparent 60%)" }} />
              <div className="relative h-18 w-18 rounded-2xl flex items-center justify-center border border-white/15 shadow-2xl"
                style={{ background: "linear-gradient(135deg, rgba(245,158,11,0.25) 0%, rgba(245,158,11,0.08) 100%)", width: "72px", height: "72px" }}>
                <Scale className="h-9 w-9 text-amber-400 drop-shadow-lg" />
              </div>
            </div>
          </div>

          {/* Site name */}
          <h1 className="font-black leading-none mb-2 drop-shadow-2xl"
            style={{ fontSize: "clamp(3rem, 9vw, 6rem)", letterSpacing: "-0.05em", background: "linear-gradient(135deg, #ffffff 0%, #fde68a 40%, #f59e0b 70%, #fb923c 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            AFCA Guide™
          </h1>

          <p className="text-2xl md:text-3xl font-bold tracking-wide mb-1 text-white/80">for Citizens</p>
          <p className="text-xs font-semibold tracking-[0.22em] uppercase mb-7 text-white/35">Australian Financial Complaints Authority</p>

          {/* Pill badges */}
          <div className="flex items-center justify-center flex-wrap gap-2 mb-4">
            {["Independent", "Free for Consumers", "Banking · Insurance · Super", "Australia-Wide"].map((badge) => (
              <span key={badge} className="text-xs font-bold px-4 py-1.5 rounded-full border"
                style={{ borderColor: "rgba(245,158,11,0.35)", background: "rgba(245,158,11,0.10)", color: "rgba(255,255,255,0.85)", letterSpacing: "0.02em" }}>
                {badge}
              </span>
            ))}
          </div>

          {/* Designed by credit */}
          <p className="text-xs text-white/25 mt-2" style={{ letterSpacing: "0.05em" }}>Designed and built by <strong className="text-white/40 font-semibold">Brooke McAllan™</strong></p>
        </div>

        {/* Gold bottom accent */}
        <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent 0%, rgba(245,158,11,0.6) 50%, transparent 100%)" }} />
      </div>

      {/* ── STICKY NAV ──────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 w-full border-b shadow-md" style={{ background: "rgba(255,255,255,0.97)", backdropFilter: "blur(12px)", borderBottomColor: "#e5e7eb" }}>
        <div className="container mx-auto px-4 h-13 flex items-center gap-1" style={{ height: "52px" }}>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-black text-sm shrink-0 mr-3 hover:opacity-80 transition-opacity" style={{ color: "#081f3f" }}>
            <Scale className="h-4 w-4 text-amber-500" />
            <span className="hidden sm:inline">AFCA Guide™</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-0.5 flex-1">
            {PRIMARY_NAV.map((item) => (
              <Link key={item.href} href={item.href}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  location === item.href
                    ? "text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
                style={location === item.href ? { background: "#081f3f" } : {}}>
                <item.icon className="h-3 w-3 shrink-0" />
                {item.label}
              </Link>
            ))}

            {/* More mega-menu */}
            <div className="relative" ref={moreRef}>
              <button onClick={() => setMoreOpen(!moreOpen)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  isMoreActive || moreOpen ? "text-white shadow-sm" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
                style={isMoreActive || moreOpen ? { background: "#081f3f" } : {}}>
                More
                <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${moreOpen ? "rotate-180" : ""}`} />
              </button>

              {moreOpen && (
                <div className="absolute top-full left-0 mt-2 w-[580px] rounded-2xl shadow-2xl py-5 z-50 border border-slate-100"
                  style={{ background: "#ffffff", boxShadow: "0 20px 60px rgba(8,31,63,0.15)" }}>
                  <div className="grid grid-cols-2 gap-0 divide-x divide-slate-100">
                    {MORE_SECTIONS.map((section) => (
                      <div key={section.heading} className="px-5">
                        <p className="text-xs font-black uppercase tracking-widest mb-3 px-2" style={{ color: "#f59e0b", letterSpacing: "0.12em" }}>{section.heading}</p>
                        <div className="space-y-0.5">
                          {section.items.map((item) => (
                            <Link key={item.href} href={item.href} onClick={() => setMoreOpen(false)}
                              className={`flex items-start gap-3 px-2 py-2.5 rounded-xl text-sm transition-all group ${
                                location === item.href ? "text-white" : "text-slate-700 hover:text-slate-900"
                              }`}
                              style={location === item.href ? { background: "#081f3f" } : {}}>
                              <div className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-colors ${location === item.href ? "bg-white/15" : "bg-slate-100 group-hover:bg-amber-50"}`}>
                                <item.icon className={`h-3.5 w-3.5 transition-colors ${location === item.href ? "text-amber-400" : "text-slate-500 group-hover:text-amber-600"}`} />
                              </div>
                              <div className="min-w-0">
                                <p className="font-semibold text-[13px] leading-tight">{item.label}</p>
                                <p className={`text-xs leading-tight mt-0.5 ${location === item.href ? "text-white/60" : "text-slate-400"}`}>{item.desc}</p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mx-5 mt-4 pt-3 border-t border-slate-100 flex gap-4">
                    {[
                      { href: "/terms-of-use", label: "Terms of Use" },
                      { href: "/privacy-policy", label: "Privacy Policy" },
                      { href: "/disclaimer", label: "Disclaimer" },
                    ].map((l) => (
                      <Link key={l.href} href={l.href} onClick={() => setMoreOpen(false)} className="text-xs text-slate-400 hover:text-slate-700 transition-colors">{l.label}</Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Right CTA */}
          <div className="hidden lg:flex items-center gap-2 ml-auto">
            <a href="tel:1800931678" className="flex items-center gap-1.5 text-xs font-semibold border rounded-lg px-3 py-1.5 transition-all hover:shadow-sm" style={{ color: "#065f46", borderColor: "#d1fae5", background: "#f0fdf4" }}>
              <Phone className="h-3 w-3" />
              AFCA 1800 931 678
            </a>
            <Link href="/write-complaint" className="flex items-center gap-1.5 text-xs font-bold px-4 py-1.5 rounded-lg text-white transition-all hover:opacity-90 hover:shadow-md" style={{ background: "linear-gradient(135deg, #f59e0b, #ea580c)" }}>
              <FileText className="h-3 w-3" />
              Write Complaint
            </Link>
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden ml-auto">
            <button className="p-2 rounded-lg transition-colors hover:bg-slate-100" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
              {mobileOpen ? <X className="h-5 w-5 text-slate-700" /> : <Menu className="h-5 w-5 text-slate-700" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t bg-white">
            <div className="px-4 pt-3 pb-4">
              <p className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: "#f59e0b" }}>Main</p>
              <div className="grid grid-cols-2 gap-1.5 mb-4">
                {PRIMARY_NAV.map((item) => (
                  <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${location === item.href ? "text-white" : "text-slate-700 hover:bg-slate-100"}`}
                    style={location === item.href ? { background: "#081f3f" } : {}}>
                    <item.icon className="h-4 w-4 shrink-0" />
                    {item.label}
                  </Link>
                ))}
              </div>
              {MORE_SECTIONS.map((section) => (
                <div key={section.heading} className="mb-4">
                  <p className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: "#f59e0b" }}>{section.heading}</p>
                  <div className="grid grid-cols-2 gap-1.5">
                    {section.items.map((item) => (
                      <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)}
                        className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${location === item.href ? "text-white" : "text-slate-700 hover:bg-slate-100"}`}
                        style={location === item.href ? { background: "#081f3f" } : {}}>
                        <item.icon className="h-4 w-4 shrink-0" />
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
              {/* Emergency strip */}
              <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-100">
                <a href="tel:1800931678" className="flex items-center gap-1.5 text-xs font-bold rounded-xl px-3 py-2.5" style={{ background: "#f0fdf4", color: "#065f46", border: "1px solid #d1fae5" }}>
                  <Phone className="h-3.5 w-3.5" /> AFCA 1800 931 678
                </a>
                <a href="tel:1800007007" className="flex items-center gap-1.5 text-xs font-bold rounded-xl px-3 py-2.5" style={{ background: "#eff6ff", color: "#1e3a5f", border: "1px solid #bfdbfe" }}>
                  <Phone className="h-3.5 w-3.5" /> Debt 1800 007 007
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* ── AUSSIELEGAL BANNER ───────────────────────────────────────────────── */}
      <div style={{ background: "linear-gradient(90deg, #2e1065, #3730a3, #1e1b4b)", borderBottom: "1px solid rgba(139,92,246,0.3)" }}>
        <div className="container mx-auto px-4 py-2.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <Gavel className="h-4 w-4 shrink-0" style={{ color: "#a78bfa" }} />
            <div className="flex items-center gap-2 flex-wrap">
              <a href="https://www.aussielegal.com.au" target="_blank" rel="noopener noreferrer"
                className="font-bold text-sm text-white hover:text-violet-200 transition-colors whitespace-nowrap">
                AussieLegal.com.au
              </a>
              <span className="hidden sm:inline text-violet-400/60">—</span>
              <span className="hidden sm:inline text-xs text-violet-200/70">Australia's free independent legal guides, document templates &amp; lawyer directory</span>
            </div>
          </div>
          <a href="https://www.aussielegal.com.au" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-bold px-4 py-1.5 rounded-full whitespace-nowrap shrink-0 transition-all hover:bg-white/25 border border-white/20 text-white"
            style={{ background: "rgba(255,255,255,0.12)" }}>
            Visit Free <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>

      {/* ── PAGE CONTENT ─────────────────────────────────────────────────────── */}
      <main className="flex-1">{children}</main>

      {/* ── LEGAL COMPLIANCE NOTICE ─────────────────────────────────────────── */}
      <div style={{ background: "#fef3c7", borderTop: "2px solid #f59e0b" }}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-6">
            <div className="flex items-center gap-2 shrink-0">
              <Shield className="h-4 w-4 text-amber-700" />
              <span className="text-xs font-black uppercase tracking-widest text-amber-800">Legal Notice</span>
            </div>
            <p className="text-xs text-amber-900 leading-relaxed font-medium flex-1">
              <strong>NOT LEGAL ADVICE.</strong> This site provides general information only. It is not a substitute for professional legal, financial, or accounting advice.
              Always verify information at{" "}
              <a href="https://www.afca.org.au" target="_blank" rel="noopener noreferrer" className="underline font-bold">afca.org.au</a>.
              This site is not affiliated with the Australian Financial Complaints Authority, ASIC, or any government body.
            </p>
            <div className="flex items-center gap-3 shrink-0">
              <Link href="/terms-of-use" className="text-xs font-semibold text-amber-800 underline hover:text-amber-900 whitespace-nowrap">Terms of Use</Link>
              <span className="text-amber-600">·</span>
              <Link href="/privacy-policy" className="text-xs font-semibold text-amber-800 underline hover:text-amber-900 whitespace-nowrap">Privacy Policy</Link>
              <span className="text-amber-600">·</span>
              <Link href="/disclaimer" className="text-xs font-semibold text-amber-800 underline hover:text-amber-900 whitespace-nowrap">Disclaimer</Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── FOOTER ───────────────────────────────────────────────────────────── */}
      <footer style={{ background: "#040d1a", borderTop: "none" }}>
        <div className="container mx-auto px-4 py-14">
          <div className="grid md:grid-cols-4 gap-10 mb-10">

            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-2.5 mb-4">
                <Scale className="h-6 w-6 text-amber-400" />
                <span className="font-black text-white text-base" style={{ letterSpacing: "-0.02em" }}>AFCA Guide™</span>
              </div>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.5)" }}>
                An independent, community-built educational resource for Australians navigating banking, insurance, and superannuation disputes. Not affiliated with AFCA or any government body.
              </p>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
                Official AFCA:{" "}
                <a href="https://www.afca.org.au" target="_blank" rel="noopener noreferrer" className="text-amber-400 underline hover:text-amber-300">afca.org.au</a>
                {" "}· <a href="tel:1800931678" className="text-amber-400 hover:text-amber-300">1800 931 678</a>
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <p className="font-bold text-white text-sm mb-4 uppercase tracking-widest" style={{ fontSize: "11px", color: "#f59e0b" }}>Quick Links</p>
              <ul className="space-y-2.5">
                {[
                  { href: "/guide",           label: "The Process" },
                  { href: "/write-complaint", label: "Write a Complaint" },
                  { href: "/templates",       label: "Letter Templates" },
                  { href: "/resources",       label: "Resource Library" },
                  { href: "/agencies",        label: "All Agencies" },
                  { href: "/case-studies",    label: "Case Studies" },
                ].map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm font-medium transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.5)" }}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Learn */}
            <div>
              <p className="font-bold text-white text-sm mb-4 uppercase tracking-widest" style={{ fontSize: "11px", color: "#f59e0b" }}>Learn & Research</p>
              <ul className="space-y-2.5">
                {[
                  { href: "/complaint-types", label: "Complaint Categories" },
                  { href: "/testimonies",     label: "Horror Stories" },
                  { href: "/bank-sanctions",  label: "Bank Sanctions" },
                  { href: "/about-afca",      label: "About AFCA" },
                  { href: "/dos-and-donts",   label: "Do's & Don'ts" },
                  { href: "/forum",           label: "Community Forum" },
                ].map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm font-medium transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.5)" }}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal & Help */}
            <div>
              <p className="font-bold text-white text-sm mb-4 uppercase tracking-widest" style={{ fontSize: "11px", color: "#f59e0b" }}>Legal & Compliance</p>
              <ul className="space-y-2.5 mb-6">
                {[
                  { href: "/terms-of-use",   label: "Terms & Conditions" },
                  { href: "/privacy-policy", label: "Privacy Policy (Privacy Act 1988)" },
                  { href: "/disclaimer",     label: "Disclaimer & Legal Notices" },
                  { href: "/faq",            label: "FAQ" },
                ].map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm font-medium transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.5)" }}>{l.label}</Link>
                  </li>
                ))}
              </ul>
              <div className="pt-4 border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                <p className="text-xs font-bold mb-3 uppercase tracking-widest" style={{ color: "#f59e0b", fontSize: "10px" }}>Free Helplines</p>
                <div className="space-y-1.5">
                  {[
                    { name: "National Debt Help", num: "1800 007 007" },
                    { name: "Financial Rights",   num: "1800 007 007" },
                    { name: "Consumer Action",    num: "1800 466 477" },
                    { name: "Beyond Blue",        num: "1300 22 4636" },
                    { name: "Lifeline",           num: "13 11 14" },
                    { name: "1800RESPECT",        num: "1800 737 732" },
                  ].map((h) => (
                    <p key={h.name} className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
                      {h.name}: <a href={`tel:${h.num.replace(/\s/g,"")}`} className="font-bold text-amber-400 hover:text-amber-300">{h.num}</a>
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-8 border-t space-y-3" style={{ borderColor: "rgba(255,255,255,0.08)" }}>

            {/* Legal compliance statement */}
            <div className="text-center">
              <p className="text-xs leading-relaxed max-w-3xl mx-auto" style={{ color: "rgba(255,255,255,0.3)" }}>
                <strong style={{ color: "rgba(255,255,255,0.5)" }}>GENERAL INFORMATION ONLY — NOT LEGAL ADVICE.</strong>{" "}
                This website does not provide legal, financial, or professional advice. All content is for educational purposes only under Australian law.
                Privacy Act 1988 (Cth) compliant. Australian Consumer Law applies. Users should seek independent advice for their specific circumstances.
              </p>
            </div>

            {/* Legal links row */}
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
              {[
                { href: "/terms-of-use",   label: "Terms & Conditions" },
                { href: "/privacy-policy", label: "Privacy Policy" },
                { href: "/disclaimer",     label: "Disclaimer" },
                { href: "/about-afca",     label: "About AFCA" },
              ].map((l, i) => (
                <React.Fragment key={l.href}>
                  {i > 0 && <span style={{ color: "rgba(255,255,255,0.15)" }}>·</span>}
                  <Link href={l.href} className="text-xs transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.35)" }}>{l.label}</Link>
                </React.Fragment>
              ))}
            </div>

            {/* Copyright */}
            <div className="text-center space-y-1">
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>
                © {new Date().getFullYear()} AFCA Guide for Citizens™. All rights reserved. Independent. Not affiliated with AFCA, ASIC, or any government body.
              </p>
              <p className="text-xs font-semibold" style={{ color: "rgba(255,255,255,0.35)" }}>
                Designed and built by <span style={{ color: "rgba(255,255,255,0.55)" }}>Brooke McAllan™</span>
              </p>
            </div>
          </div>
        </div>
      </footer>

      <ChatWidget />
    </div>
  );
}
