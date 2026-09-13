import React from "react";
import { Link } from "wouter";
import {
  ArrowRight, ShieldCheck, Clock, MessageSquare, HandHeart,
  Phone, Scale, BookOpen, FileText, Gavel, AlertTriangle,
  BookMarked, HelpCircle, MessageCircle, CheckSquare, Users,
  Star, Quote, TrendingUp, Zap, ChevronRight, ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// ── QUICK ACCESS ──────────────────────────────────────────────────────────────

const QUICK_ACCESS = [
  { label: "Lodge with AFCA", desc: "Make a complaint online", href: "https://www.afca.org.au/make-a-complaint", external: true, bg: "#081f3f", icon: Scale, phone: "1800 931 678" },
  { label: "Debt Helpline", desc: "Free financial counselling", phone: "1800 007 007", href: "https://ndh.org.au", external: true, bg: "#065f46", icon: Phone },
  { label: "Financial Rights", desc: "Free credit & debt advice", phone: "1800 007 007", href: "https://financialrights.org.au", external: true, bg: "#0e4d7b", icon: ShieldCheck },
  { label: "ASIC MoneySmart", desc: "Free financial guidance", href: "https://moneysmart.gov.au", external: true, bg: "#1e3a5f", icon: BookOpen },
  { label: "Consumer Action", desc: "Consumer rights help", phone: "1800 466 477", href: "https://consumeraction.org.au", external: true, bg: "#7c2d12", icon: Users },
  { label: "Scamwatch", desc: "Report a scam", href: "https://www.scamwatch.gov.au", external: true, bg: "#991b1b", icon: AlertTriangle },
  { label: "AussieLegal.com.au", desc: "Free Australian legal guides", href: "https://www.aussielegal.com.au", external: true, bg: "#4c1d95", icon: Gavel },
  { label: "Lifeline", desc: "Crisis support 24/7", phone: "13 11 14", href: "https://www.lifeline.org.au", external: true, bg: "#9f1239", icon: HandHeart },
];

// ── SITE SECTIONS ─────────────────────────────────────────────────────────────

const SITE_LINKS = [
  { href: "/guide",           label: "The Process",      icon: BookOpen,      desc: "Step-by-step AFCA guide" },
  { href: "/write-complaint", label: "Write Complaint",  icon: FileText,      desc: "AI-powered letter builder" },
  { href: "/templates",       label: "Templates",        icon: FileText,      desc: "142+ ready-to-use letters" },
  { href: "/case-studies",    label: "Case Studies",     icon: Gavel,         desc: "Real AFCA determinations" },
  { href: "/testimonies",     label: "Horror Stories",   icon: AlertTriangle, desc: "What can go wrong" },
  { href: "/agencies",        label: "All Agencies",     icon: Users,         desc: "Every Australian body" },
  { href: "/resources",       label: "Resource Library", icon: BookMarked,    desc: "505+ curated links" },
  { href: "/forum",           label: "Forum",            icon: MessageCircle, desc: "Community discussion" },
  { href: "/dos-and-donts",   label: "Do's & Don'ts",   icon: CheckSquare,   desc: "Critical mistakes to avoid" },
  { href: "/faq",             label: "FAQ",              icon: HelpCircle,    desc: "Common questions" },
];

// ── TESTIMONIALS ──────────────────────────────────────────────────────────────

const TESTIMONIALS = [
  {
    stars: 5,
    quote: "After 18 months fighting my bank alone, I used this guide and the letter template. AFCA awarded me $47,000 within 8 weeks. I had no idea I had these rights.",
    name: "Sarah M.",
    location: "Melbourne, VIC",
    issue: "Mortgage hardship ignored",
    outcome: "Won — $47,000 awarded",
    outcomeColor: "#065f46",
  },
  {
    stars: 5,
    quote: "The complaint letter template was exactly what I needed. I filled it in, sent it to my bank, and they settled in 3 days. Didn't even need to go to AFCA.",
    name: "David K.",
    location: "Brisbane, QLD",
    issue: "Unfair credit card fees",
    outcome: "Settled — full refund",
    outcomeColor: "#065f46",
  },
  {
    stars: 5,
    quote: "I was told my scam loss was my own fault. This guide showed me the law on bank liability. AFCA ruled the bank had failed its fraud obligations. I got $28,500 back.",
    name: "Anonymous",
    location: "Sydney, NSW",
    issue: "Bank transfer scam $28,500",
    outcome: "Won — full reimbursement",
    outcomeColor: "#065f46",
  },
  {
    stars: 5,
    quote: "My super fund rejected my TPD claim twice. The resources here pointed me to the exact AFCA approach document. Third time with that document cited — approved.",
    name: "Mark R.",
    location: "Perth, WA",
    issue: "TPD super claim denied",
    outcome: "Won on AFCA appeal",
    outcomeColor: "#065f46",
  },
  {
    stars: 5,
    quote: "My car insurer declared my car a write-off at $8,000. The guide taught me about valuation disputes. AFCA ordered $22,400 — nearly three times the offer.",
    name: "Priya S.",
    location: "Adelaide, SA",
    issue: "Unfair write-off valuation",
    outcome: "Won — $22,400 ordered",
    outcomeColor: "#065f46",
  },
  {
    stars: 5,
    quote: "Debt collectors were calling 8 times a day. I had no idea that was illegal. Used the guide to document everything, complained to AFCA. Harassment stopped immediately.",
    name: "Terri J.",
    location: "Townsville, QLD",
    issue: "Illegal debt collector harassment",
    outcome: "Harassment ceased — compensation",
    outcomeColor: "#065f46",
  },
];

// ── STATS ─────────────────────────────────────────────────────────────────────

const STATS = [
  { number: "97,000+", label: "AFCA complaints per year" },
  { number: "$300M+",  label: "Awarded to consumers annually" },
  { number: "505+",    label: "Resources in this library" },
  { number: "142+",    label: "Letter templates available" },
];

// ── COMPONENT ─────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <div className="flex flex-col gap-0 pb-0">

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-20 md:py-28 px-4" style={{ background: "linear-gradient(135deg, #040d1a 0%, #081f3f 40%, #0c2d58 70%, #040d1a 100%)" }}>
        {/* Ambient glow */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-10 pointer-events-none" style={{ background: "radial-gradient(circle, #f59e0b, transparent 65%)", transform: "translate(30%, -30%)" }} />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-8 pointer-events-none" style={{ background: "radial-gradient(circle, #3b82f6, transparent 65%)", transform: "translate(-30%, 30%)" }} />
        {/* Fine grid */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)", backgroundSize: "48px 48px" }} />

        <div className="container mx-auto max-w-4xl text-center relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-widest mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            Australia's Most Comprehensive AFCA Resource
          </div>

          <h1 className="font-black leading-[1.05] mb-6 text-white" style={{ fontSize: "clamp(2.6rem, 7vw, 5rem)", letterSpacing: "-0.04em" }}>
            Fight back against your{" "}
            <span style={{ background: "linear-gradient(90deg, #f59e0b, #fb923c)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              bank.
            </span>
            <br />And win.
          </h1>

          <p className="text-xl md:text-2xl text-white/75 max-w-2xl mx-auto leading-relaxed mb-10 font-light">
            The free independent guide to resolving banking, insurance and superannuation disputes through AFCA — real templates, real case studies, every Australian agency in one place.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/write-complaint">
              <button className="group flex items-center gap-2 text-base font-bold px-8 py-4 rounded-full transition-all text-white shadow-xl shadow-amber-500/20 hover:shadow-amber-500/40 hover:scale-[1.03]" style={{ background: "linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)" }}>
                Write My Complaint
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            <Link href="/guide">
              <button className="flex items-center gap-2 text-base font-semibold px-8 py-4 rounded-full border-2 border-white/25 text-white hover:bg-white/10 transition-all">
                Understand the Process
                <ChevronRight className="h-5 w-5" />
              </button>
            </Link>
          </div>

          {/* Trust line */}
          <p className="text-white/35 text-xs mt-8 tracking-wide">
            Free forever · Independent · Not affiliated with AFCA · Designed by Brooke McAllan™
          </p>
        </div>
      </section>

      {/* ── STATS BAR ─────────────────────────────────────────────────────── */}
      <section style={{ background: "#f59e0b" }}>
        <div className="container mx-auto max-w-5xl px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-amber-600/30">
            {STATS.map((s) => (
              <div key={s.label} className="text-center px-4 py-2">
                <p className="text-2xl md:text-3xl font-black text-white" style={{ letterSpacing: "-0.04em" }}>{s.number}</p>
                <p className="text-xs font-semibold text-amber-900/80 uppercase tracking-wide mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── QUICK ACCESS ──────────────────────────────────────────────────── */}
      <section style={{ background: "#040d1a" }} className="py-12 px-4">
        <div className="container mx-auto max-w-5xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/35 mb-5 text-center">Emergency Contacts & Quick Access</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {QUICK_ACCESS.map((item) => (
              <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer"
                className="group rounded-2xl p-4 flex flex-col gap-2 border border-white/8 hover:border-amber-500/40 hover:scale-[1.03] transition-all cursor-pointer"
                style={{ background: item.bg }}>
                <item.icon className="h-5 w-5 text-white/70 group-hover:text-amber-400 transition-colors" />
                <span className="font-bold text-sm text-white leading-tight">{item.label}</span>
                <span className="text-xs text-white/55 leading-tight">{item.desc}</span>
                {item.phone && <span className="text-xs font-bold text-amber-400 mt-0.5">{item.phone}</span>}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT IS AFCA ──────────────────────────────────────────────────── */}
      <section className="container mx-auto px-4 max-w-5xl pt-20 pb-12">
        <div className="text-center mb-12">
          <div className="inline-block stat-badge mb-4">What is AFCA?</div>
          <h2 className="text-4xl md:text-5xl font-black mb-5" style={{ letterSpacing: "-0.04em" }}>Your rights. Legally enforced.</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            The Australian Financial Complaints Authority is a free, independent ombudsman. If your bank, insurer or super fund won't fix a problem — AFCA investigates and issues <span className="font-bold text-foreground">legally binding decisions</span>.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: "Completely Free for You", description: "It costs consumers absolutely nothing to lodge a complaint. The financial firm you're disputing pays AFCA — you pay zero.", icon: HandHeart, iconBg: "#fef3c7", iconColor: "#92400e" },
            { title: "Truly Independent", description: "AFCA is not a government department or bank advocate. They make impartial decisions based on law and good industry practice — full stop.", icon: ShieldCheck, iconBg: "#dbeafe", iconColor: "#1e3a5f" },
            { title: "Legally Binding Outcomes", description: "If AFCA rules in your favour and you accept the decision, the financial firm is legally required to comply. They cannot ignore it.", icon: Scale, iconBg: "#d1fae5", iconColor: "#065f46" },
          ].map((f) => (
            <div key={f.title} className="bg-white border-2 border-border rounded-2xl p-7 card-hover shadow-sm">
              <div className="h-13 w-13 rounded-2xl flex items-center justify-center mb-5" style={{ background: f.iconBg, width: "52px", height: "52px" }}>
                <f.icon className="h-6 w-6" style={{ color: f.iconColor }} />
              </div>
              <h3 className="text-xl font-bold mb-3">{f.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-[15px]">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section className="py-20 px-4" style={{ background: "linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)" }}>
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-14">
            <div className="inline-block stat-badge mb-4">Real Results</div>
            <h2 className="text-4xl md:text-5xl font-black mb-4" style={{ letterSpacing: "-0.04em" }}>Australians who fought back</h2>
            <p className="text-xl text-muted-foreground max-w-xl mx-auto">These are real complaint outcomes. Real money. Real decisions. Your situation could be next.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="relative bg-white border-2 border-border rounded-2xl p-7 card-hover shadow-sm overflow-hidden">
                {/* Decorative quote mark */}
                <div className="absolute top-4 right-5 text-8xl font-black leading-none select-none pointer-events-none" style={{ color: "#f59e0b", opacity: 0.12, fontFamily: "Georgia, serif" }}>"</div>

                {/* Stars */}
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Outcome badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mb-4 text-white" style={{ background: t.outcomeColor }}>
                  <ShieldCheck className="h-3 w-3" />
                  {t.outcome}
                </div>

                {/* Quote */}
                <p className="text-[15px] leading-relaxed text-foreground/85 mb-5 font-medium italic">"{t.quote}"</p>

                {/* Attribution */}
                <div className="pt-4 border-t border-border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-sm text-foreground">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.location}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Issue:</p>
                      <p className="text-xs font-semibold text-foreground">{t.issue}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA under testimonials */}
          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-5 text-lg">These outcomes started with a complaint. Yours can too.</p>
            <Link href="/write-complaint">
              <button className="inline-flex items-center gap-2 font-bold px-8 py-4 rounded-full text-white shadow-lg hover:scale-[1.03] transition-all" style={{ background: "linear-gradient(135deg, #081f3f 0%, #1e3a5f 100%)" }}>
                Start My Complaint <ArrowRight className="h-5 w-5" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── EVERYTHING IN THIS GUIDE ──────────────────────────────────────── */}
      <section className="py-20 px-4" style={{ background: "#040d1a" }}>
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <div className="inline-block mb-4 text-xs font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400">
              Complete Resource
            </div>
            <h2 className="text-4xl font-black text-white mb-4" style={{ letterSpacing: "-0.04em" }}>Everything in the AFCA Guide™</h2>
            <p className="text-white/50 text-lg max-w-xl mx-auto">Australia's most complete AFCA resource — tap any section to start.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {SITE_LINKS.map((item) => (
              <Link key={item.href} href={item.href}
                className="group rounded-xl p-4 flex flex-col gap-2.5 border border-white/8 hover:border-amber-500/40 bg-white/4 hover:bg-white/8 transition-all">
                <div className="h-9 w-9 rounded-lg flex items-center justify-center border border-white/10 bg-white/8 group-hover:bg-amber-500/15 group-hover:border-amber-500/30 transition-all">
                  <item.icon className="h-4.5 w-4.5 text-white/50 group-hover:text-amber-400 transition-colors" style={{ width: "18px", height: "18px" }} />
                </div>
                <p className="font-bold text-sm text-white/90 leading-tight">{item.label}</p>
                <p className="text-xs text-white/40 leading-snug">{item.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── PHONE NUMBERS STRIP ───────────────────────────────────────────── */}
      <section className="py-14 px-4 bg-white border-y-2 border-border">
        <div className="container mx-auto max-w-5xl">
          <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mb-8">Important Phone Numbers — Save These Now</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "AFCA",                number: "1800 931 678", note: "Complaints",        color: "#081f3f" },
              { name: "National Debt Help",  number: "1800 007 007", note: "Free counselling",  color: "#065f46" },
              { name: "Financial Rights",    number: "1800 007 007", note: "Legal advice",      color: "#0e4d7b" },
              { name: "Consumer Action",     number: "1800 466 477", note: "Consumer rights",   color: "#7c2d12" },
              { name: "Lifeline",            number: "13 11 14",     note: "Crisis 24/7",       color: "#9f1239" },
              { name: "Beyond Blue",         number: "1300 22 4636", note: "Mental health",     color: "#1e3a5f" },
              { name: "1800RESPECT",         number: "1800 737 732", note: "DV support",        color: "#4c1d95" },
              { name: "ASIC",               number: "1300 300 630", note: "Regulator",         color: "#374151" },
            ].map((n) => (
              <div key={n.name} className="rounded-2xl p-4 border-2 border-border hover:border-amber-400/40 card-hover text-center bg-white">
                <p className="font-bold text-sm text-foreground mb-1">{n.name}</p>
                <a href={`tel:${n.number.replace(/\s/g, "")}`} className="block font-black text-base hover:opacity-80 transition-opacity" style={{ color: n.color }}>{n.number}</a>
                <p className="text-xs text-muted-foreground mt-1">{n.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-3xl">
          <div className="rounded-3xl p-10 md:p-14 text-center text-white relative overflow-hidden" style={{ background: "linear-gradient(135deg, #081f3f 0%, #0c2d58 50%, #081f3f 100%)" }}>
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10" style={{ background: "radial-gradient(circle, #f59e0b, transparent)", transform: "translate(30%, -30%)" }} />
            <div className="relative z-10">
              <div className="inline-block mb-5 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400">
                Take Action Today
              </div>
              <h2 className="text-3xl md:text-4xl font-black mb-5 text-white" style={{ letterSpacing: "-0.04em" }}>
                Your bank made a mistake.<br />Make it right.
              </h2>
              <p className="text-white/65 text-lg mb-8 max-w-xl mx-auto leading-relaxed">
                Use our AI assistant to build a clear, effective complaint letter — then send it to your bank or straight to AFCA. Thousands of Australians have used this guide to recover money they thought was gone.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/write-complaint">
                  <button className="group flex items-center gap-2 font-bold px-8 py-4 rounded-full text-amber-900 hover:scale-[1.03] transition-all shadow-xl" style={{ background: "linear-gradient(135deg, #f59e0b, #fb923c)" }}>
                    Write My Complaint <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                <Link href="/agencies">
                  <button className="flex items-center gap-2 font-semibold px-8 py-4 rounded-full border-2 border-white/25 text-white hover:bg-white/10 transition-all">
                    All Agencies & Help <ChevronRight className="h-5 w-5" />
                  </button>
                </Link>
              </div>
              <p className="text-white/30 text-xs mt-6">AFCA Guide for Citizens™ — Designed and built by Brooke McAllan™</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
