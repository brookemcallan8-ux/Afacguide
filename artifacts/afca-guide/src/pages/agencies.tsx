import React, { useState, useMemo } from "react";
import { BackButton } from "@/components/back-button";
import { ExternalLink, Search, Phone, Globe, MapPin, ChevronDown, ChevronUp } from "lucide-react";
import { Input } from "@/components/ui/input";

// ── TYPES ──────────────────────────────────────────────────────────────────

interface Agency {
  name: string;
  description: string;
  url: string;
  phone?: string;
  state?: string;
  tags: string[];
  featured?: boolean;
}

interface AgencyGroup {
  category: string;
  emoji: string;
  color: string;
  agencies: Agency[];
}

// ── DATA ───────────────────────────────────────────────────────────────────

const GROUPS: AgencyGroup[] = [
  {
    category: "AFCA & Core Dispute Resolution",
    emoji: "⚖️",
    color: "border-primary bg-primary/5",
    agencies: [
      {
        name: "AFCA — Australian Financial Complaints Authority",
        description: "Free, independent dispute resolution for banking, insurance, super and financial advice complaints. The primary path for consumers.",
        url: "https://www.afca.org.au",
        phone: "1800 931 678",
        tags: ["afca", "complaints", "dispute resolution", "banking", "insurance", "superannuation"],
        featured: true,
      },
      {
        name: "AFCA — Lodge a Complaint Online",
        description: "Direct link to lodge your complaint online via AFCA's portal. Have your IDR response and supporting documents ready.",
        url: "https://www.afca.org.au/make-a-complaint",
        tags: ["afca", "lodge", "complaint", "online"],
        featured: true,
      },
      {
        name: "AFCA — Check Eligibility",
        description: "Use AFCA's online tool to check whether your complaint falls within their jurisdiction before lodging.",
        url: "https://www.afca.org.au/make-a-complaint/check-if-we-can-help",
        tags: ["afca", "eligibility", "jurisdiction", "check"],
      },
      {
        name: "AFCA — Published Determinations",
        description: "Browse de-identified case determinations to understand how AFCA has decided similar complaints.",
        url: "https://www.afca.org.au/about-afca/our-determinations",
        tags: ["afca", "determinations", "precedent", "decisions"],
      },
      {
        name: "AFCA — Rules and Operational Guidelines",
        description: "The binding AFCA Complaint Resolution Procedures and Rules that govern how your complaint will be handled.",
        url: "https://www.afca.org.au/about-afca/rules-and-guidelines",
        tags: ["afca", "rules", "procedure", "guidelines"],
      },
      {
        name: "AussieLegal.com.au",
        description: "Australia's premier independent legal resource centre — free legal guides, document templates, lawyer directory, and plain-English explanations of Australian law across every area.",
        url: "https://www.aussielegal.com.au",
        tags: ["legal", "templates", "guides", "lawyer", "directory", "free"],
        featured: true,
      },
    ],
  },
  {
    category: "Federal Government Regulators",
    emoji: "🏛️",
    color: "border-blue-500 bg-blue-50",
    agencies: [
      {
        name: "ASIC — Australian Securities and Investments Commission",
        description: "Regulates financial services, financial markets, and consumer credit. Report misconduct, check licensee details, and access investor resources.",
        url: "https://www.asic.gov.au",
        phone: "1300 300 630",
        tags: ["asic", "regulator", "financial services", "misconduct", "credit"],
      },
      {
        name: "ASIC — MoneySmart",
        description: "Australia's free, authoritative financial guidance website run by ASIC. Calculators, guides and tools for every financial decision.",
        url: "https://www.moneysmart.gov.au",
        tags: ["moneysmart", "asic", "financial guidance", "calculators", "budget"],
        featured: true,
      },
      {
        name: "ASIC — Report Misconduct",
        description: "Formally report misconduct by a financial firm or adviser to ASIC. Can trigger regulatory investigation beyond what AFCA can do.",
        url: "https://www.asic.gov.au/about-asic/contact-us/how-to-complain/report-misconduct-to-us/",
        tags: ["asic", "report", "misconduct", "fraud", "scam"],
      },
      {
        name: "APRA — Australian Prudential Regulation Authority",
        description: "Prudential regulator of banks, insurers and superannuation funds. Check an institution's status and report concerns about financial stability.",
        url: "https://www.apra.gov.au",
        phone: "1300 558 849",
        tags: ["apra", "banking", "prudential", "superannuation", "insurance"],
      },
      {
        name: "ACCC — Australian Competition and Consumer Commission",
        description: "Enforces the Australian Consumer Law and Competition and Consumer Act. Report anti-competitive conduct, scams, and unconscionable behaviour.",
        url: "https://www.accc.gov.au",
        phone: "1300 302 502",
        tags: ["accc", "competition", "consumer law", "scams", "unconscionable"],
      },
      {
        name: "ACCC — Scamwatch",
        description: "Report scams to the ACCC and access warnings about current scam types targeting Australians.",
        url: "https://www.scamwatch.gov.au",
        phone: "1300 795 995",
        tags: ["scamwatch", "accc", "scam", "fraud", "report"],
        featured: true,
      },
      {
        name: "OAIC — Office of the Australian Information Commissioner",
        description: "Federal privacy regulator. Lodge complaints about privacy breaches by banks, insurers and financial firms under the Privacy Act 1988.",
        url: "https://www.oaic.gov.au",
        phone: "1300 363 992",
        tags: ["privacy", "oaic", "privacy act", "data breach", "personal information"],
      },
      {
        name: "ATO — Australian Taxation Office",
        description: "For superannuation disputes, lost super, and financial hardship related to tax debts. Also manages the Superannuation Complaints.",
        url: "https://www.ato.gov.au",
        phone: "13 28 61",
        tags: ["ato", "tax", "superannuation", "lost super", "hardship"],
      },
      {
        name: "AUSTRAC — Financial Intelligence Agency",
        description: "Australia's financial intelligence and anti-money laundering regulator. Report suspicious financial transactions and money laundering.",
        url: "https://www.austrac.gov.au",
        tags: ["austrac", "aml", "money laundering", "suspicious transactions"],
      },
      {
        name: "Commonwealth Ombudsman",
        description: "Investigates complaints about Australian Government agencies. Covers Centrelink, ATO, and federally regulated financial firms.",
        url: "https://www.ombudsman.gov.au",
        phone: "1300 362 072",
        tags: ["ombudsman", "commonwealth", "centrelink", "government agencies"],
      },
      {
        name: "Services Australia (Centrelink) — Financial Hardship",
        description: "Access financial hardship payments, crisis payments, and emergency relief through Services Australia.",
        url: "https://www.servicesaustralia.gov.au/hardship",
        phone: "132 850",
        tags: ["centrelink", "services australia", "hardship", "emergency", "crisis payment"],
      },
      {
        name: "Parliament of Australia — Banking Code of Practice",
        description: "The binding Banking Code of Practice sets minimum standards banks must meet. Essential reading for understanding your rights.",
        url: "https://www.ausbanking.org.au/initiatives/banking-code/",
        tags: ["banking code", "aba", "rights", "standards", "obligations"],
      },
    ],
  },
  {
    category: "State & Territory Consumer Affairs",
    emoji: "🗺️",
    color: "border-emerald-500 bg-emerald-50",
    agencies: [
      {
        name: "Consumer Affairs Victoria",
        description: "Regulates consumer transactions, tenancy disputes, and business conduct in Victoria. Handles complaints about unfair contract terms.",
        url: "https://www.consumer.vic.gov.au",
        phone: "1300 558 181",
        state: "VIC",
        tags: ["consumer affairs", "victoria", "vic", "unfair contracts", "tenancy"],
      },
      {
        name: "NSW Fair Trading",
        description: "Consumer protection in New South Wales. Handles complaints about businesses, tenancy, and trades.",
        url: "https://www.fairtrading.nsw.gov.au",
        phone: "13 32 20",
        state: "NSW",
        tags: ["fair trading", "nsw", "consumer protection", "businesses"],
      },
      {
        name: "QLD Office of Fair Trading",
        description: "Consumer protection and dispute resolution for Queenslanders. Handles business conduct complaints.",
        url: "https://www.qld.gov.au/law/fair-trading",
        phone: "13 74 68",
        state: "QLD",
        tags: ["fair trading", "queensland", "qld", "consumer protection"],
      },
      {
        name: "WA Consumer Protection",
        description: "Western Australia's consumer protection agency under the Department of Energy, Mines, Industry Regulation and Safety.",
        url: "https://www.commerce.wa.gov.au/consumer-protection",
        phone: "1300 304 054",
        state: "WA",
        tags: ["consumer protection", "western australia", "wa", "commerce"],
      },
      {
        name: "SA Consumer and Business Services",
        description: "Protects South Australian consumers and regulates businesses, occupational licences, and tenancy.",
        url: "https://www.cbs.sa.gov.au",
        phone: "131 882",
        state: "SA",
        tags: ["consumer", "south australia", "sa", "cbs"],
      },
      {
        name: "Tasmania — Consumer, Building and Occupational Services",
        description: "Handles consumer complaints and fair trading matters in Tasmania.",
        url: "https://www.cbos.tas.gov.au",
        phone: "1300 654 499",
        state: "TAS",
        tags: ["tasmania", "tas", "consumer", "cbos"],
      },
      {
        name: "NT Consumer Affairs",
        description: "Consumer protection services for Northern Territory residents.",
        url: "https://consumeraffairs.nt.gov.au",
        phone: "1800 019 319",
        state: "NT",
        tags: ["northern territory", "nt", "consumer affairs"],
      },
      {
        name: "ACT Access Canberra — Fair Trading",
        description: "Consumer protection and fair trading for ACT residents.",
        url: "https://www.accesscanberra.act.gov.au/consumer-protection-and-fair-trading",
        phone: "13 22 81",
        state: "ACT",
        tags: ["act", "canberra", "access canberra", "fair trading"],
      },
    ],
  },
  {
    category: "Legal Aid Services",
    emoji: "⚖️",
    color: "border-violet-500 bg-violet-50",
    agencies: [
      {
        name: "Legal Aid NSW",
        description: "Free and low-cost legal help for eligible NSW residents. Duty lawyer services, advice, and representation in banking and consumer matters.",
        url: "https://www.legalaid.nsw.gov.au",
        phone: "1300 888 529",
        state: "NSW",
        tags: ["legal aid", "nsw", "free legal", "advice", "representation"],
        featured: true,
      },
      {
        name: "Victoria Legal Aid",
        description: "Free legal help for Victorians. Provides information, advice, and representation. Includes financial rights resources.",
        url: "https://www.legalaid.vic.gov.au",
        phone: "1300 792 387",
        state: "VIC",
        tags: ["legal aid", "victoria", "vic", "free legal", "advice"],
        featured: true,
      },
      {
        name: "Legal Aid QLD",
        description: "Free legal assistance for Queensland residents including advice on financial disputes, credit and debt matters.",
        url: "https://www.legalaid.qld.gov.au",
        phone: "1300 65 11 88",
        state: "QLD",
        tags: ["legal aid", "queensland", "qld", "free legal"],
      },
      {
        name: "Legal Aid WA",
        description: "Free legal information, advice and representation for Western Australians who meet eligibility criteria.",
        url: "https://www.legalaid.wa.gov.au",
        phone: "1300 650 579",
        state: "WA",
        tags: ["legal aid", "western australia", "wa", "free legal"],
      },
      {
        name: "Legal Services Commission SA",
        description: "South Australia's legal aid body. Free legal information, advice clinics, and duty lawyer services.",
        url: "https://www.lsc.sa.gov.au",
        phone: "1300 366 424",
        state: "SA",
        tags: ["legal aid", "south australia", "sa", "legal services commission"],
      },
      {
        name: "Legal Aid ACT",
        description: "Free legal assistance for ACT residents and people in ACT courts.",
        url: "https://www.legalaidact.org.au",
        phone: "02 6243 8158",
        state: "ACT",
        tags: ["legal aid", "act", "canberra", "free legal"],
      },
      {
        name: "Northern Territory Legal Aid Commission",
        description: "Legal assistance for NT residents including remote and Indigenous communities.",
        url: "https://www.ntlac.com.au",
        phone: "1800 019 343",
        state: "NT",
        tags: ["legal aid", "northern territory", "nt", "indigenous"],
      },
      {
        name: "Legal Aid Tasmania",
        description: "Legal assistance, advice and information services for Tasmanians.",
        url: "https://www.legalaid.tas.gov.au",
        phone: "1300 366 611",
        state: "TAS",
        tags: ["legal aid", "tasmania", "tas", "free legal"],
      },
    ],
  },
  {
    category: "Financial Counselling & Rights",
    emoji: "💰",
    color: "border-amber-500 bg-amber-50",
    agencies: [
      {
        name: "National Debt Helpline",
        description: "Free, confidential financial counselling by phone. Speak to a professional financial counsellor about debt, hardship, and negotiating with creditors.",
        url: "https://ndh.org.au",
        phone: "1800 007 007",
        tags: ["debt", "financial counselling", "hardship", "free", "phone"],
        featured: true,
      },
      {
        name: "Financial Rights Legal Centre",
        description: "Specialises in consumer credit, banking and insurance law. Free legal advice and casework for Australians with financial disputes.",
        url: "https://financialrights.org.au",
        phone: "1800 007 007",
        tags: ["financial rights", "credit", "banking", "insurance", "legal advice", "casework"],
        featured: true,
      },
      {
        name: "Consumer Action Law Centre",
        description: "Melbourne-based consumer advocacy. Free legal advice, policy work, and casework on financial hardship, credit, debt and banking issues.",
        url: "https://consumeraction.org.au",
        phone: "1800 466 477",
        tags: ["consumer action", "consumer rights", "credit", "debt", "advocacy", "melbourne"],
        featured: true,
      },
      {
        name: "Financial Counselling Australia",
        description: "Peak body for financial counsellors. Find a financial counsellor near you using their online directory.",
        url: "https://www.financialcounsellingaustralia.org.au",
        tags: ["financial counselling", "directory", "counsellor", "find help"],
      },
      {
        name: "MoneyHelp Victoria",
        description: "Free financial counselling service for Victorians facing financial difficulty.",
        url: "https://www.moneyhelp.org.au",
        phone: "1800 007 007",
        state: "VIC",
        tags: ["moneyhelp", "victoria", "financial counselling", "hardship"],
      },
      {
        name: "WA Financial Counsellors Association",
        description: "Find a financial counsellor in Western Australia for free face-to-face or phone support.",
        url: "https://wafca.asn.au",
        state: "WA",
        tags: ["western australia", "wa", "financial counselling"],
      },
      {
        name: "Mob Strong Debt Help",
        description: "Free financial counselling and debt help specifically for Aboriginal and Torres Strait Islander peoples.",
        url: "https://ndh.org.au/mob-strong-debt-help/",
        phone: "1800 808 488",
        tags: ["indigenous", "aboriginal", "torres strait islander", "debt", "financial counselling"],
      },
      {
        name: "Salvation Army Moneycare",
        description: "Free, confidential financial counselling and emergency relief from the Salvation Army across Australia.",
        url: "https://www.salvationarmy.org.au/need-help/financial-assistance/moneycare/",
        phone: "1300 371 288",
        tags: ["salvation army", "moneycare", "emergency relief", "financial counselling"],
      },
      {
        name: "St Vincent de Paul Society",
        description: "Emergency relief, food, financial assistance, and support for Australians in crisis.",
        url: "https://www.vinnies.org.au",
        phone: "13 18 12",
        tags: ["st vincent de paul", "vinnies", "emergency relief", "crisis", "hardship"],
      },
      {
        name: "CHOICE — Consumer Advocacy",
        description: "Australia's leading independent consumer advocacy organisation. Product reviews, campaign work, and consumer rights guides.",
        url: "https://www.choice.com.au",
        tags: ["choice", "consumer advocacy", "product reviews", "consumer rights"],
      },
    ],
  },
  {
    category: "Community Legal Centres",
    emoji: "🏘️",
    color: "border-teal-500 bg-teal-50",
    agencies: [
      {
        name: "Community Legal Centres Australia",
        description: "Peak body for community legal centres. Use their directory to find your nearest free community legal centre.",
        url: "https://clcs.org.au",
        tags: ["community legal centre", "clc", "free legal", "directory"],
        featured: true,
      },
      {
        name: "Law Access NSW",
        description: "NSW free legal information and referral service. Call for help finding the right legal assistance.",
        url: "https://www.lawaccess.nsw.gov.au",
        phone: "1300 888 529",
        state: "NSW",
        tags: ["law access", "nsw", "free legal", "referral"],
      },
      {
        name: "Victoria Law Foundation — Law Help",
        description: "Legal information and referral for Victorians. Plain-English guides to Victorian law.",
        url: "https://www.vlf.org.au",
        state: "VIC",
        tags: ["victoria", "legal information", "community legal"],
      },
      {
        name: "Community Legal Centres QLD",
        description: "Network of 28 community legal centres across Queensland providing free legal help.",
        url: "https://www.clcq.org.au",
        state: "QLD",
        tags: ["queensland", "clc", "community legal", "free legal"],
      },
      {
        name: "Law Society Referral Services (all states)",
        description: "Each state Law Society provides lawyer referral services. Many offer a free first consultation of 30 minutes.",
        url: "https://www.lawcouncil.asn.au/about-us/find-a-lawyer",
        tags: ["law society", "lawyer referral", "find a lawyer", "free consultation"],
      },
      {
        name: "Seniors Rights Service NSW",
        description: "Free legal advice and casework for older people in NSW, including elder financial abuse.",
        url: "https://seniorsrightsservice.org.au",
        phone: "1800 424 079",
        state: "NSW",
        tags: ["seniors", "elderly", "elder abuse", "financial abuse", "nsw"],
      },
      {
        name: "Elder Rights Advocacy (VIC)",
        description: "Victorian service for older people facing elder abuse, including financial exploitation by banks or family members.",
        url: "https://www.era.asn.au",
        phone: "1800 700 600",
        state: "VIC",
        tags: ["elderly", "elder abuse", "financial abuse", "victoria"],
      },
      {
        name: "Tenants' Union (state offices)",
        description: "Tenancy and housing dispute support — relevant when bank enforcement affects your tenancy or housing.",
        url: "https://www.tenants.org.au",
        tags: ["tenancy", "housing", "rental", "enforcement"],
      },
    ],
  },
  {
    category: "Domestic Violence & Financial Abuse",
    emoji: "🛡️",
    color: "border-rose-500 bg-rose-50",
    agencies: [
      {
        name: "1800RESPECT — National Helpline",
        description: "24/7 national sexual assault, domestic and family violence counselling. Includes financial abuse support and safety planning.",
        url: "https://www.1800respect.org.au",
        phone: "1800 737 732",
        tags: ["domestic violence", "financial abuse", "dv", "counselling", "24/7"],
        featured: true,
      },
      {
        name: "Good Shepherd — Financial Independence Hub",
        description: "Specialist financial support for women and those experiencing financial abuse. Includes bank account safety, no-interest loans (NILS), and financial counselling.",
        url: "https://goodshep.org.au/services/financial-independence-hub/",
        tags: ["financial abuse", "women", "nils", "no interest loan", "good shepherd"],
        featured: true,
      },
      {
        name: "WIRE — Women's Information and Referral Exchange",
        description: "Victorian service providing information, support, and referral for women including those facing financial abuse and banking issues.",
        url: "https://www.wire.org.au",
        phone: "1300 134 130",
        state: "VIC",
        tags: ["women", "victoria", "financial abuse", "information", "referral"],
      },
      {
        name: "Commonwealth Bank Next Chapter",
        description: "CBA's dedicated financial support for those escaping domestic violence — fee waivers, urgent account transfers, and financial safety planning.",
        url: "https://www.commbank.com.au/support/next-chapter.html",
        tags: ["commonwealth bank", "cba", "domestic violence", "financial safety"],
      },
      {
        name: "ANZ Money Minded",
        description: "ANZ's domestic violence and financial resilience support resources for customers.",
        url: "https://www.anz.com.au/about-us/esg/financial-wellbeing/",
        tags: ["anz", "domestic violence", "financial resilience"],
      },
      {
        name: "No Interest Loan Scheme (NILS)",
        description: "Interest-free loans up to $2,000 for essential household items for low-income Australians. Run by Good Shepherd in partnership with NAB.",
        url: "https://www.nils.com.au",
        tags: ["nils", "no interest loan", "low income", "good shepherd", "nab"],
      },
    ],
  },
  {
    category: "Courts & Tribunals",
    emoji: "🏛️",
    color: "border-slate-500 bg-slate-50",
    agencies: [
      {
        name: "Federal Court of Australia",
        description: "Jurisdiction over financial services law, corporations, consumer protection, and appeals from ASIC decisions.",
        url: "https://www.fedcourt.gov.au",
        phone: "1300 720 980",
        tags: ["federal court", "financial services", "corporations", "appeal"],
      },
      {
        name: "Federal Circuit and Family Court of Australia",
        description: "Handles lower-value federal civil matters including consumer credit disputes and small business issues.",
        url: "https://www.fcfcoa.gov.au",
        phone: "1300 352 000",
        tags: ["federal circuit court", "credit", "consumer", "civil"],
      },
      {
        name: "NCAT — NSW Civil and Administrative Tribunal",
        description: "NSW tribunal for consumer disputes, credit matters, and small civil claims. More accessible than court.",
        url: "https://www.ncat.nsw.gov.au",
        phone: "1300 006 228",
        state: "NSW",
        tags: ["ncat", "nsw", "tribunal", "consumer", "civil claims"],
      },
      {
        name: "VCAT — Victorian Civil and Administrative Tribunal",
        description: "Victorian tribunal for civil claims including credit, consumer, and residential tenancy matters.",
        url: "https://www.vcat.vic.gov.au",
        phone: "1300 018 228",
        state: "VIC",
        tags: ["vcat", "victoria", "tribunal", "civil claims", "consumer"],
      },
      {
        name: "QCAT — Queensland Civil and Administrative Tribunal",
        description: "Queensland tribunal for civil disputes, minor debt and consumer matters.",
        url: "https://www.qcat.qld.gov.au",
        phone: "1300 753 228",
        state: "QLD",
        tags: ["qcat", "queensland", "tribunal", "civil", "debt"],
      },
      {
        name: "SAT — State Administrative Tribunal (WA)",
        description: "Western Australian tribunal for civil, consumer, and regulatory matters.",
        url: "https://www.sat.justice.wa.gov.au",
        phone: "08 9219 3111",
        state: "WA",
        tags: ["sat", "western australia", "tribunal", "civil"],
      },
      {
        name: "SACAT — SA Civil and Administrative Tribunal",
        description: "South Australian tribunal for tenancy, consumer, and minor civil disputes.",
        url: "https://www.sacat.sa.gov.au",
        phone: "1800 723 767",
        state: "SA",
        tags: ["sacat", "south australia", "tribunal", "consumer"],
      },
      {
        name: "ACT Civil and Administrative Tribunal (ACAT)",
        description: "Resolves disputes in the ACT including consumer, credit, and civil claims.",
        url: "https://www.acat.act.gov.au",
        phone: "02 6207 1740",
        state: "ACT",
        tags: ["acat", "act", "canberra", "tribunal", "civil"],
      },
    ],
  },
  {
    category: "Industry Bodies & Codes",
    emoji: "🏦",
    color: "border-indigo-500 bg-indigo-50",
    agencies: [
      {
        name: "Australian Banking Association (ABA)",
        description: "Industry body for Australian banks. Oversees the Banking Code of Practice and runs the Banking Code Compliance Committee.",
        url: "https://www.ausbanking.org.au",
        tags: ["aba", "banking code", "industry body", "banks"],
      },
      {
        name: "Banking Code Compliance Committee (BCCC)",
        description: "Monitors banks' compliance with the Banking Code of Practice. Report breaches and access compliance data.",
        url: "https://bankingcode.org.au",
        tags: ["bccc", "banking code", "compliance", "breach reporting"],
        featured: true,
      },
      {
        name: "Customer Owned Banking Association (COBA)",
        description: "Industry body for credit unions, mutual banks and building societies. Access complaints data and member commitments.",
        url: "https://www.customerownedbanking.asn.au",
        tags: ["coba", "credit union", "mutual bank", "building society"],
      },
      {
        name: "Insurance Council of Australia",
        description: "Industry body for general insurers. Access industry statistics and the General Insurance Code of Practice.",
        url: "https://insurancecouncil.com.au",
        tags: ["insurance", "general insurance", "code of practice", "industry"],
      },
      {
        name: "Financial Services Council (FSC)",
        description: "Peak body for the Australian financial services industry including super, insurance and advice. Access industry codes.",
        url: "https://www.fsc.org.au",
        tags: ["fsc", "financial services", "superannuation", "life insurance", "code"],
      },
      {
        name: "Mortgage & Finance Association of Australia (MFAA)",
        description: "Industry body for mortgage brokers. Handles complaints about broker conduct and enforces the Broker Code of Practice.",
        url: "https://www.mfaa.com.au",
        tags: ["mfaa", "mortgage broker", "broker code", "complaint"],
      },
      {
        name: "Finance Brokers Association of Australia (FBAA)",
        description: "Alternative industry association for finance brokers. Maintains a broker complaints process.",
        url: "https://fbaa.com.au",
        tags: ["fbaa", "finance broker", "complaint"],
      },
    ],
  },
  {
    category: "Bank Complaint Pages (Direct)",
    emoji: "🏧",
    color: "border-cyan-500 bg-cyan-50",
    agencies: [
      {
        name: "Commonwealth Bank — Make a Complaint",
        description: "CBA's official complaints page. Lodge a complaint with Australia's largest bank before escalating to AFCA.",
        url: "https://www.commbank.com.au/support/feedback-and-complaints.html",
        phone: "13 2221",
        tags: ["commonwealth bank", "cba", "complaint", "idr"],
      },
      {
        name: "ANZ — Complaints and Feedback",
        description: "ANZ's official complaints process. Request an Internal Dispute Resolution response in writing.",
        url: "https://www.anz.com.au/about-us/contact-us/complaints-feedback/",
        phone: "13 13 14",
        tags: ["anz", "complaint", "idr", "feedback"],
      },
      {
        name: "NAB — Complaints",
        description: "NAB's official complaints process. You must receive their IDR response before lodging with AFCA.",
        url: "https://www.nab.com.au/about-us/contact-us/complaints",
        phone: "13 22 65",
        tags: ["nab", "national australia bank", "complaint", "idr"],
      },
      {
        name: "Westpac — Complaints",
        description: "Westpac's complaints and feedback portal. Covers Westpac, St George, Bank of Melbourne and BankSA.",
        url: "https://www.westpac.com.au/personal-banking/contact-us/complaints/",
        phone: "132 032",
        tags: ["westpac", "st george", "bank of melbourne", "complaint", "idr"],
      },
      {
        name: "Bendigo Bank — Complaints",
        description: "Bendigo and Adelaide Bank complaints process for customers and community bank members.",
        url: "https://www.bendigobank.com.au/support/",
        phone: "1300 236 344",
        tags: ["bendigo bank", "adelaide bank", "community bank", "complaint"],
      },
      {
        name: "Bank of Queensland — Complaints",
        description: "BOQ complaints process including for ME Bank and Virgin Money Australia.",
        url: "https://www.boq.com.au/support/complaints",
        phone: "1300 55 72 72",
        tags: ["boq", "bank of queensland", "me bank", "virgin money", "complaint"],
      },
      {
        name: "Suncorp Bank — Complaints",
        description: "Suncorp Bank and Insurance complaints process.",
        url: "https://www.suncorp.com.au/help-contact/complaints.html",
        phone: "13 11 55",
        tags: ["suncorp", "complaint", "idr", "insurance"],
      },
      {
        name: "ING Australia — Complaints",
        description: "ING Australia complaints page for banking customers.",
        url: "https://www.ing.com.au/help/feedback-complaints.html",
        phone: "133 464",
        tags: ["ing", "orange everyday", "complaint"],
      },
    ],
  },
  {
    category: "Key Legislation",
    emoji: "📜",
    color: "border-purple-500 bg-purple-50",
    agencies: [
      {
        name: "National Consumer Credit Protection Act 2009",
        description: "The primary legislation governing consumer credit in Australia — responsible lending obligations, hardship provisions, and credit contracts.",
        url: "https://www.legislation.gov.au/Details/C2020C00205",
        tags: ["nccpa", "credit law", "responsible lending", "hardship", "legislation"],
        featured: true,
      },
      {
        name: "Australian Consumer Law (Schedule 2, Competition and Consumer Act 2010)",
        description: "Prohibits misleading and deceptive conduct, unconscionable conduct, and unfair contract terms by financial firms.",
        url: "https://www.legislation.gov.au/Details/C2011A00103",
        tags: ["australian consumer law", "acl", "misleading conduct", "unfair contracts", "legislation"],
      },
      {
        name: "Banking Act 1959 (Cth)",
        description: "Governs the authorisation and prudential regulation of banks by APRA. Key for understanding what obligations banks have.",
        url: "https://www.legislation.gov.au/Details/C2020C00375",
        tags: ["banking act", "apra", "prudential", "legislation"],
      },
      {
        name: "Privacy Act 1988 (Cth)",
        description: "Governs how banks and financial firms must handle personal information. Basis for accessing your own documents and complaining about data misuse.",
        url: "https://www.legislation.gov.au/Details/C2021C00452",
        tags: ["privacy act", "personal information", "access", "data", "legislation"],
      },
      {
        name: "Insurance Contracts Act 1984 (Cth)",
        description: "Core legislation for general and life insurance contracts. Includes duty of utmost good faith and disclosure obligations.",
        url: "https://www.legislation.gov.au/Details/C2015C00175",
        tags: ["insurance contracts act", "insurance", "good faith", "disclosure", "legislation"],
      },
      {
        name: "Corporations Act 2001 (Cth)",
        description: "Governs financial services and financial product licensing (Ch 7). Underpins the obligations of financial advisers.",
        url: "https://www.legislation.gov.au/Details/C2021C00515",
        tags: ["corporations act", "financial services", "advice", "licence", "legislation"],
      },
      {
        name: "Superannuation Industry (Supervision) Act 1993",
        description: "Governs superannuation funds' obligations, trustee duties, and member rights.",
        url: "https://www.legislation.gov.au/Details/C2021C00520",
        tags: ["sisa", "superannuation", "trustee", "member rights", "legislation"],
      },
      {
        name: "ASIC Act 2001 — Section 12DA (Misleading Conduct)",
        description: "Key provision prohibiting misleading or deceptive conduct in trade or commerce in financial services. Often the strongest basis for a complaint.",
        url: "https://www.legislation.gov.au/Details/C2021C00517",
        tags: ["asic act", "misleading conduct", "deceptive", "s12da", "legislation"],
      },
    ],
  },
  {
    category: "Mental Health & Crisis Support",
    emoji: "💚",
    color: "border-green-500 bg-green-50",
    agencies: [
      {
        name: "Beyond Blue — Financial Stress Support",
        description: "Mental health support for Australians experiencing financial stress. 24/7 phone and online counselling.",
        url: "https://www.beyondblue.org.au/the-facts/anxiety/financial-stress",
        phone: "1300 22 4636",
        tags: ["mental health", "financial stress", "anxiety", "depression", "support"],
        featured: true,
      },
      {
        name: "Lifeline Australia",
        description: "24/7 crisis support and suicide prevention for Australians. Financial distress can be overwhelming — reach out.",
        url: "https://www.lifeline.org.au",
        phone: "13 11 14",
        tags: ["lifeline", "crisis", "mental health", "24/7", "suicide prevention"],
        featured: true,
      },
      {
        name: "MindSpot — Financial Anxiety Clinic",
        description: "Free online and telephone-delivered mental health service including support for anxiety related to debt and financial stress.",
        url: "https://www.mindspot.org.au",
        phone: "1800 614 434",
        tags: ["mindspot", "anxiety", "financial anxiety", "online therapy"],
      },
      {
        name: "Headspace — Young Adults",
        description: "Mental health support for young Australians including those dealing with debt, student loans, and first-home stress.",
        url: "https://headspace.org.au",
        phone: "1800 650 890",
        tags: ["headspace", "youth", "young adults", "mental health", "debt stress"],
      },
    ],
  },
];

// ── COMPONENT ──────────────────────────────────────────────────────────────

function AgencyCard({ a }: { a: Agency }) {
  return (
    <a
      href={a.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group flex flex-col gap-2 bg-white border rounded-xl p-4 shadow-sm hover:shadow-md hover:border-primary/30 transition-all ${a.featured ? "ring-2 ring-primary/20" : ""}`}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors leading-snug flex-1">
          {a.name}
        </h3>
        <ExternalLink className="h-3.5 w-3.5 text-muted-foreground/50 group-hover:text-primary transition-colors shrink-0 mt-0.5" />
      </div>
      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">{a.description}</p>
      <div className="flex flex-wrap items-center gap-2 mt-auto pt-1">
        {a.phone && (
          <a
            href={`tel:${a.phone.replace(/\s/g, "")}`}
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1 text-xs font-medium text-primary hover:underline"
          >
            <Phone className="h-3 w-3" />
            {a.phone}
          </a>
        )}
        {a.state && (
          <span className="flex items-center gap-1 text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
            <MapPin className="h-2.5 w-2.5" /> {a.state}
          </span>
        )}
      </div>
    </a>
  );
}

function CategorySection({ group }: { group: AgencyGroup }) {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div id={group.category} className={`border-l-4 ${group.color} rounded-r-xl mb-8`}>
      <button
        className="w-full flex items-center justify-between px-5 py-4 text-left"
        onClick={() => setCollapsed(!collapsed)}
      >
        <div className="flex items-center gap-2">
          <span className="text-xl">{group.emoji}</span>
          <h2 className="text-base font-bold text-foreground">{group.category}</h2>
          <span className="text-xs text-muted-foreground bg-muted rounded-full px-2 py-0.5">{group.agencies.length}</span>
        </div>
        {collapsed ? <ChevronDown className="h-4 w-4 text-muted-foreground" /> : <ChevronUp className="h-4 w-4 text-muted-foreground" />}
      </button>
      {!collapsed && (
        <div className="px-5 pb-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {group.agencies.map((a) => <AgencyCard key={a.url} a={a} />)}
        </div>
      )}
    </div>
  );
}

export default function Agencies() {
  const [search, setSearch] = useState("");

  const allAgencies = useMemo(() => GROUPS.flatMap((g) => g.agencies.map((a) => ({ ...a, category: g.category }))), []);

  const searchResults = useMemo(() => {
    if (!search.trim()) return null;
    const q = search.toLowerCase();
    return allAgencies.filter(
      (a) =>
        a.name.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q) ||
        a.tags.some((t) => t.includes(q)) ||
        (a.state && a.state.toLowerCase().includes(q)) ||
        (a as any).category.toLowerCase().includes(q)
    );
  }, [search, allAgencies]);

  const totalAgencies = allAgencies.length;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-6xl px-4 pt-4">
        <BackButton />
      </div>

      {/* Header */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white py-14 px-4">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-3">Every Agency. At Your Fingertips.</h1>
          <p className="text-white/75 text-lg max-w-2xl mb-6">
            {totalAgencies}+ Australian government agencies, legal aid services, financial counsellors, courts, industry bodies, and crisis lines — all in one place.
          </p>
          {/* Search */}
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by agency name, state, issue type…"
              className="pl-12 h-14 text-base bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-2xl focus-visible:ring-white/30"
            />
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {["VIC", "NSW", "QLD", "WA", "SA", "TAS", "ACT", "NT"].map((s) => (
              <button
                key={s}
                onClick={() => setSearch(s)}
                className="text-xs bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded-full transition-colors"
              >
                {s}
              </button>
            ))}
            {["hardship", "scam", "insurance", "legal aid", "super", "debt", "credit"].map((t) => (
              <button
                key={t}
                onClick={() => setSearch(t)}
                className="text-xs bg-accent/20 hover:bg-accent/30 text-white px-3 py-1 rounded-full transition-colors"
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 py-10">

        {/* Search results */}
        {searchResults !== null ? (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold">
                {searchResults.length} result{searchResults.length !== 1 ? "s" : ""} for "{search}"
              </h2>
              <button onClick={() => setSearch("")} className="text-sm text-primary hover:underline">Clear search</button>
            </div>
            {searchResults.length === 0 ? (
              <p className="text-center py-16 text-muted-foreground">No agencies found. Try a different term.</p>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {searchResults.map((a) => <AgencyCard key={a.url} a={a} />)}
              </div>
            )}
          </div>
        ) : (
          <>
            {/* Quick jump nav */}
            <div className="flex flex-wrap gap-2 mb-8 pb-6 border-b">
              {GROUPS.map((g) => (
                <a
                  key={g.category}
                  href={`#${g.category}`}
                  className="text-xs font-medium px-3 py-1.5 rounded-full bg-muted hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  {g.emoji} {g.category}
                </a>
              ))}
            </div>

            {GROUPS.map((g) => <CategorySection key={g.category} group={g} />)}
          </>
        )}

        <div className="mt-8 text-center text-xs text-muted-foreground">
          {totalAgencies}+ agencies listed · Links verified · Last reviewed June 2025
        </div>
      </div>
    </div>
  );
}
