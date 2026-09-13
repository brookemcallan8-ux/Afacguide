import React, { useState } from "react";
import { BackButton } from "@/components/back-button";
import {
  Newspaper, Star, User, Gavel, AlertCircle, BookOpen, MessageCircle,
  ChevronDown, ChevronUp, ExternalLink, ThumbsUp, ThumbsDown, Clock, Pin
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Section =
  | "news"
  | "reviews"
  | "your-case"
  | "rules-officers"
  | "jurisdiction"
  | "determination"
  | "advice";

const SECTIONS: { id: Section; label: string; icon: React.ElementType; color: string }[] = [
  { id: "news",          label: "AFCA News",              icon: Newspaper,     color: "bg-blue-50 border-blue-200 text-blue-800" },
  { id: "reviews",       label: "AFCA Reviews",           icon: Star,          color: "bg-yellow-50 border-yellow-200 text-yellow-800" },
  { id: "your-case",     label: "Your Case",              icon: User,          color: "bg-green-50 border-green-200 text-green-800" },
  { id: "rules-officers",label: "Rules & Officers",       icon: BookOpen,      color: "bg-purple-50 border-purple-200 text-purple-800" },
  { id: "jurisdiction",  label: "Jurisdiction Issues",    icon: AlertCircle,   color: "bg-orange-50 border-orange-200 text-orange-800" },
  { id: "determination", label: "AFCA Determination",     icon: Gavel,         color: "bg-red-50 border-red-200 text-red-800" },
  { id: "advice",        label: "AFCA Advice",            icon: MessageCircle, color: "bg-teal-50 border-teal-200 text-teal-800" },
];

interface Post {
  title: string;
  excerpt: string;
  date: string;
  author?: string;
  pinned?: boolean;
  rating?: number;
  tags?: string[];
  url?: string;
}

const CONTENT: Record<Section, { intro: string; posts: Post[] }> = {
  news: {
    intro: "The latest updates, announcements and developments from AFCA and the financial complaints landscape.",
    posts: [
      {
        title: "AFCA Annual Review 2023–24 Released",
        excerpt: "AFCA received 102,790 complaints in the 2023–24 financial year — the highest on record. Banking and finance accounted for the largest share. Key issues include financial hardship, credit and home loans. AFCA secured $318.5 million in compensation and refunds for consumers.",
        date: "November 2024",
        pinned: true,
        tags: ["Annual Review", "Statistics"],
        url: "https://www.afca.org.au/about-afca/publications/annual-review",
      },
      {
        title: "New Scam Complaint Category Launched",
        excerpt: "AFCA has introduced a dedicated scam complaint pathway following a surge in authorised push payment fraud reports. Banks are now required to demonstrate active fraud prevention measures or face adverse determinations.",
        date: "October 2024",
        tags: ["Scams", "Policy"],
      },
      {
        title: "Financial Hardship Complaints Double Post-Rate Rises",
        excerpt: "Since the RBA's rate-hiking cycle began in May 2022, hardship complaints to AFCA have doubled. AFCA has issued guidance reminding lenders of their obligations under the National Credit Code to respond to hardship requests within 21 days.",
        date: "September 2024",
        tags: ["Hardship", "Interest Rates"],
      },
      {
        title: "AFCA Systemic Issues Register — 2024 Update",
        excerpt: "AFCA publishes updates to its systemic issues register when a firm's conduct appears to affect multiple consumers. Recent additions include mortgage discharge delays, overcharged fees on fixed-rate break costs, and late disclosure of credit limit changes.",
        date: "August 2024",
        tags: ["Systemic Issues", "Register"],
        url: "https://www.afca.org.au/about-afca/systemic-issues",
      },
      {
        title: "AFCA Rules Amendment — Small Business Thresholds Lifted",
        excerpt: "From 1 July 2024, AFCA's small business jurisdiction expanded. The credit facility limit increased to $5 million and the compensation cap for small business credit complaints rose to $1.085 million, bringing more disputes within AFCA's reach.",
        date: "July 2024",
        tags: ["Rules", "Small Business"],
      },
      {
        title: "APRA Issues Banking Supervision Update on IDR Compliance",
        excerpt: "APRA and ASIC jointly found that a significant proportion of financial firms are not meeting their Internal Dispute Resolution (IDR) obligations under RG 271. Firms have been put on notice to improve response timeframes and documentation before AFCA referrals.",
        date: "June 2024",
        tags: ["APRA", "IDR", "Regulation"],
      },
    ],
  },
  reviews: {
    intro: "Consumer experiences with AFCA — the good, the frustrating, and what to realistically expect from the process.",
    posts: [
      {
        title: "★★★★★ Finally got justice after 2 years",
        excerpt: "After my bank refused to acknowledge a systematic overcharge on my home loan for 18 months, AFCA stepped in and ordered a full refund plus interest. The case officer was professional and listened carefully. The process took 7 months but the outcome was fair. Worth every moment of perseverance.",
        date: "March 2025",
        author: "HomeOwner_Vic",
        rating: 5,
        tags: ["Home Loan", "Resolved"],
      },
      {
        title: "★★★☆☆ Process is slow but ultimately helpful",
        excerpt: "My scam complaint took 9 months to resolve. AFCA staff were courteous but the waiting game is real. I was awarded 50% of my loss which felt like a compromise, but the bank had initially offered zero. If you have a legitimate case, push through — AFCA does hold banks accountable.",
        date: "February 2025",
        author: "ScamVictim_QLD",
        rating: 3,
        tags: ["Scam", "Partial Award"],
      },
      {
        title: "★★★★☆ Clear communication, fair outcome",
        excerpt: "Disputed an unlawful early termination fee on my fixed mortgage. The AFCA case manager explained each step clearly, asked targeted questions, and the bank folded within weeks once AFCA got involved. The fee was fully refunded. Wish I'd come to AFCA sooner.",
        date: "January 2025",
        author: "Mortgage_Disputed_NSW",
        rating: 4,
        tags: ["Mortgage Fees", "Resolved"],
      },
      {
        title: "★★☆☆☆ Felt like the bank had more weight",
        excerpt: "My complaint about misleading financial advice was dismissed at preliminary assessment. AFCA said it fell outside their jurisdiction because of when the advice was given. I felt the rules favoured the institution. Make sure your complaint is within AFCA's time limits before lodging.",
        date: "December 2024",
        author: "Anonymous",
        rating: 2,
        tags: ["Financial Advice", "Dismissed"],
      },
      {
        title: "★★★★★ NAB/HomeSide mortgage nightmare — AFCA sided with me",
        excerpt: "After NAB/HomeSide conducted a mortgagee sale on my property at a severe undervalue and refused to account for the surplus proceeds, I lodged with AFCA. Despite the complexity, the determination found the bank had failed its duty of care and ordered compensation. This case matters — see Case Studies.",
        date: "November 2024",
        author: "HomeSide_Survivor",
        rating: 5,
        tags: ["NAB", "Mortgagee Sale", "Featured"],
        pinned: true,
      },
      {
        title: "★★★☆☆ Good for simple disputes, complex cases need lawyers",
        excerpt: "AFCA resolved my credit card fee dispute easily. But when I tried to use AFCA for a complex margin call dispute involving multiple documents, I felt out of my depth. For anything technical, get at least a free consult with a financial services lawyer before lodging.",
        date: "October 2024",
        author: "Investor_WA",
        rating: 3,
        tags: ["Credit Card", "Advice"],
      },
    ],
  },
  "your-case": {
    intro: "Understand how to frame, present and document your individual case for the best chance of success at AFCA.",
    posts: [
      {
        title: "How to Structure Your AFCA Complaint for Maximum Impact",
        excerpt: "The most successful complaints share four things: (1) a clear chronological timeline of events, (2) specific references to what the bank did wrong (the rule or obligation they breached), (3) evidence attached and indexed, and (4) a precise remedy requested. Vague or emotional narratives are less effective than fact-based submissions.",
        date: "2025",
        pinned: true,
        tags: ["Tips", "Strategy"],
      },
      {
        title: "What Evidence Should I Gather Before Lodging?",
        excerpt: "Gather: all written correspondence with your bank (emails, letters, chat logs); loan documents, statements, and contracts; your bank's Internal Dispute Resolution (IDR) response letter; any expert reports or valuations; records of phone calls (date, time, who you spoke to, what was said). The more documented your case, the stronger your position.",
        date: "2025",
        tags: ["Evidence", "Preparation"],
      },
      {
        title: "Mortgagee Sale Cases — Special Considerations",
        excerpt: "If your bank conducted a mortgagee sale, key issues include: (a) whether the bank obtained market value; (b) whether proper notice was given; (c) whether hardship assistance was properly considered first; (d) whether surplus proceeds were properly accounted for. These cases are complex — use the NAB/HomeSide case study as a reference point.",
        date: "2025",
        pinned: true,
        tags: ["Mortgagee Sale", "NAB", "Property"],
      },
      {
        title: "Time Limits — Don't Miss Your Window",
        excerpt: "AFCA has strict time limits. Generally: you must lodge within 2 years of your bank's IDR response, or within 6 years of when you first became aware of the loss. Some older matters may still be accepted under AFCA's legacy terms. If in doubt, lodge now and explain the timeline — don't wait.",
        date: "2025",
        tags: ["Time Limits", "Eligibility"],
      },
      {
        title: "What Happens if My Complaint is Dismissed at the First Stage?",
        excerpt: "A preliminary assessment dismissal is not final. You can request AFCA reconsider if new information comes to light or if you believe they misapplied the rules. You can also seek external legal advice or, in limited circumstances, apply to a court. Detailed reasons for dismissal are your right — always request them in writing.",
        date: "2025",
        tags: ["Dismissal", "Next Steps"],
      },
      {
        title: "Writing Your Personal Statement — Do's and Don'ts",
        excerpt: "DO: stick to facts, dates and amounts. DO: explain the impact on your life calmly and clearly. DO: refer to specific documents by exhibit number. DON'T: use abusive or aggressive language — it weakens your case. DON'T: include irrelevant history. DON'T: exaggerate — inconsistencies damage credibility.",
        date: "2025",
        tags: ["Writing", "Tips"],
      },
    ],
  },
  "rules-officers": {
    intro: "AFCA's governing rules, key personnel, and the regulatory framework that shapes how your complaint is handled.",
    posts: [
      {
        title: "AFCA's Governing Rules — The Foundation",
        excerpt: "AFCA operates under its Complaint Resolution Scheme Rules, approved by ASIC. These rules define who can complain, what complaints AFCA can consider, the process from lodgement to determination, and the remedies AFCA can order. The current rules were last amended in July 2024. You can download the full rules at afca.org.au.",
        date: "2025",
        pinned: true,
        tags: ["Rules", "Governance"],
        url: "https://www.afca.org.au/about-afca/rules-and-guidelines/afca-rules",
      },
      {
        title: "AFCA's Chief Ombudsman & CEO",
        excerpt: "David Locke is AFCA's Chief Ombudsman and CEO. He has held the role since AFCA's establishment in 2018. He previously served as an Assistant Commissioner at the Charity Commission for England and Wales. The Ombudsman oversees AFCA's operations, regulatory relationships, and public accountability.",
        date: "2025",
        tags: ["Leadership", "Officers"],
      },
      {
        title: "AFCA's Board of Directors",
        excerpt: "AFCA's Board includes independent directors as well as consumer and industry representatives. The Chair is The Hon John Pascoe AO CVO. Board composition is designed to balance consumer, small business and financial industry interests. Board minutes are available on the AFCA website.",
        date: "2025",
        tags: ["Board", "Governance"],
        url: "https://www.afca.org.au/about-afca/who-we-are/board-and-committees",
      },
      {
        title: "The Ombudsman Panel — Specialist Decision Makers",
        excerpt: "Complex or high-value cases may be referred to AFCA's Ombudsman Panel, a group of senior decision-makers with specialist expertise in banking, insurance, investments and superannuation. Panel decisions carry significant weight and are the last step before a formal Determination.",
        date: "2025",
        tags: ["Panel", "Process"],
      },
      {
        title: "ASIC Oversight of AFCA",
        excerpt: "AFCA is approved by the Australian Securities and Investments Commission (ASIC) under the Corporations Act 2001. ASIC can review and revoke AFCA's approval if it fails to meet legislative benchmarks. This regulatory accountability means AFCA cannot simply ignore its obligations — it is itself subject to oversight.",
        date: "2025",
        tags: ["ASIC", "Regulation"],
      },
      {
        title: "AFCA's Code Compliance & Monitoring",
        excerpt: "Financial firms that are members of the Australian Banking Association (ABA) are also subject to the Banking Code of Practice. AFCA can apply the Code as a standard when assessing complaints. Code breaches can significantly strengthen a consumer complaint.",
        date: "2025",
        tags: ["Banking Code", "ABA"],
      },
    ],
  },
  jurisdiction: {
    intro: "Understanding the limits of AFCA's reach — what it can and cannot investigate, and how to navigate the edges.",
    posts: [
      {
        title: "What Complaints Can AFCA Consider?",
        excerpt: "AFCA can consider complaints about: credit and finance products; deposit accounts; payment systems; general and life insurance; investments and financial advice; superannuation; and managed investments. The complaint must be about a financial firm that is an AFCA member — virtually all licensed Australian financial institutions are members.",
        date: "2025",
        pinned: true,
        tags: ["Eligibility", "Overview"],
      },
      {
        title: "Monetary Limits — What's the Maximum AFCA Can Award?",
        excerpt: "The compensation limits vary by complaint type. For credit complaints: up to $1.085 million (as of 2024). For general insurance: $1.085 million. For investments/advice: $1.085 million. For superannuation: unlimited. For non-financial loss (e.g. stress, inconvenience): capped at $5,500. These limits are reviewed annually.",
        date: "2025",
        tags: ["Compensation", "Limits"],
      },
      {
        title: "When AFCA Cannot Help — Common Exclusions",
        excerpt: "AFCA cannot consider: complaints primarily about commercial decisions (e.g. a bank choosing not to lend); matters before a court or tribunal; complaints already decided by AFCA; complaints about a firm that is not an AFCA member; or matters that fall outside AFCA's time limits. These exclusions are strictly applied.",
        date: "2025",
        tags: ["Exclusions", "Limits"],
      },
      {
        title: "The 'Commercial Decision' Trap",
        excerpt: "Banks frequently argue that credit refusals, loan restructuring decisions or security enforcement are 'commercial decisions' outside AFCA's jurisdiction. However, if the bank breached a legal obligation (such as a duty to consider hardship, or a misleading representation) in the course of making that decision, AFCA can still investigate the conduct.",
        date: "2025",
        pinned: true,
        tags: ["Commercial Decision", "Strategy"],
      },
      {
        title: "Time Limits in Detail",
        excerpt: "Standard rule: lodge within 2 years of the bank's IDR response. If no IDR response was given: within 2 years of when the response was due. Legacy complaints: AFCA can accept complaints about conduct from as far back as 1 January 2008 under certain conditions. If your complaint is borderline, lodge first and let AFCA assess the time limit issue.",
        date: "2025",
        tags: ["Time Limits", "Detail"],
      },
      {
        title: "Systemic Issues and Class-Style Complaints",
        excerpt: "If your issue affects multiple people (e.g. a bank that overcharged thousands of customers), AFCA has powers to investigate systemic issues separately. You can flag your complaint as potentially systemic. AFCA can then escalate the matter to ASIC or require the firm to remediate affected customers beyond just your case.",
        date: "2025",
        tags: ["Systemic", "Class Action"],
      },
    ],
  },
  determination: {
    intro: "How AFCA makes binding decisions — the determination process, what it covers, and what happens next.",
    posts: [
      {
        title: "What is an AFCA Determination?",
        excerpt: "An AFCA Determination is a formal, written decision that resolves a complaint. It is legally binding on the financial firm if accepted by the complainant. Determinations can order remedies including compensation, refunds, changes to contracts, apologies, or other corrective actions. They are published (de-identified) on AFCA's website.",
        date: "2025",
        pinned: true,
        tags: ["Determination", "Overview"],
        url: "https://www.afca.org.au/make-a-complaint/our-process/determinations",
      },
      {
        title: "The Process Leading to a Determination",
        excerpt: "A Determination only issues after earlier resolution stages fail: (1) Registration & Referral — the bank gets a chance to resolve directly; (2) Case Management — an AFCA case manager tries to facilitate agreement; (3) Preliminary Assessment — AFCA provides a non-binding view; (4) Review — parties can seek review of the preliminary view; (5) Determination — a final, binding decision is made.",
        date: "2025",
        tags: ["Process", "Stages"],
      },
      {
        title: "What Remedies Can a Determination Order?",
        excerpt: "Determinations can award: monetary compensation (up to the applicable limit); interest on compensation from the date loss was suffered; repayment of fees or charges; changes to credit listings (including removing adverse credit entries); apologies; and directions for the firm to undertake specific actions. Non-financial loss is separately capped.",
        date: "2025",
        tags: ["Remedies", "Compensation"],
      },
      {
        title: "Accepting or Rejecting a Determination",
        excerpt: "You have 30 days to accept or reject a Determination. If you accept it, the firm is bound to comply. If you reject it, the complaint is closed and you may pursue other avenues (e.g. court). A firm cannot appeal a Determination — once you accept it, the firm must comply within the timeframe specified, typically 30 days.",
        date: "2025",
        tags: ["Acceptance", "Timeline"],
      },
      {
        title: "Published Determinations — A Valuable Resource",
        excerpt: "AFCA publishes de-identified Determinations on its website. These are invaluable for understanding how AFCA has ruled on similar situations. Search the determination database by complaint type, product or issue to find precedents that support your case. Reference relevant determinations in your own submissions.",
        date: "2025",
        tags: ["Research", "Precedents"],
        url: "https://www.afca.org.au/make-a-complaint/our-process/determinations/determination-search",
      },
      {
        title: "What if the Firm Doesn't Comply?",
        excerpt: "If a firm accepts a Determination and then fails to comply, AFCA will report the non-compliance to ASIC. ASIC has powers to take regulatory action against the firm, including licence conditions or cancellation. In practice, non-compliance is rare — the reputational and regulatory consequences are severe.",
        date: "2025",
        tags: ["Enforcement", "Compliance"],
      },
    ],
  },
  advice: {
    intro: "Practical guidance, tips and strategies from experienced AFCA complainants and consumer advocates.",
    posts: [
      {
        title: "Top 10 Tips for a Successful AFCA Complaint",
        excerpt: "1. Lodge before time limits expire. 2. Have a clear, fact-based narrative. 3. Attach and index all evidence. 4. State the specific remedy you want. 5. Be responsive — reply to AFCA promptly. 6. Read the bank's response carefully and rebut each point. 7. Reference AFCA's published Determinations. 8. Keep communication professional. 9. Flag systemic issues if relevant. 10. Don't give up at preliminary assessment — seek review.",
        date: "2025",
        pinned: true,
        tags: ["Tips", "Strategy"],
      },
      {
        title: "Free Legal Help Available to You",
        excerpt: "You don't have to face this alone. Free or low-cost help is available from: Financial Rights Legal Centre (1800 007 007); Consumer Action Law Centre (1800 466 477); Legal Aid offices in your state; Community legal centres; Financial Counselling Australia (1800 007 007). These services can help draft submissions and advise on strategy.",
        date: "2025",
        tags: ["Legal Help", "Resources"],
      },
      {
        title: "How to Respond Effectively to the Bank's Submission",
        excerpt: "When AFCA shares the bank's response: read it carefully; list every factual claim you disagree with; provide documentary evidence for each disagreement; point out internal inconsistencies in the bank's account; reference any AFCA Determination or banking code provision they've ignored. A focused rebuttal is more powerful than a lengthy emotional response.",
        date: "2025",
        tags: ["Rebuttal", "Strategy"],
      },
      {
        title: "Dealing with Delays — Your Rights",
        excerpt: "AFCA has service standards for complaint handling timeframes. If your complaint is taking too long, you can: contact your case manager directly; request a supervisor review; raise a service complaint with AFCA's internal team. Unexplained delays should be documented — they can be relevant if you later need to escalate.",
        date: "2025",
        tags: ["Delays", "Process"],
      },
      {
        title: "Understanding Non-Financial Loss",
        excerpt: "AFCA can award compensation for non-financial loss — stress, anxiety, inconvenience and disruption caused by a firm's misconduct. The cap is currently $5,500, but it can make a meaningful difference. Document the personal impact of the bank's conduct with dates, GP records if relevant, and a personal statement about how it affected your life.",
        date: "2025",
        tags: ["Non-Financial Loss", "Compensation"],
      },
      {
        title: "NAB/HomeSide Mortgagee Sale — Lessons for All Complainants",
        excerpt: "The NAB/HomeSide mortgagee sale case is the most significant housing dispute in recent AFCA history. Key lessons: (1) banks must obtain market value in mortgagee sales; (2) hardship must be genuinely considered before sale; (3) surplus proceeds must be accounted for; (4) compensation for the loss of a family home goes beyond the financial — non-financial loss should be claimed. See the full case study.",
        date: "2025",
        pinned: true,
        tags: ["NAB", "Mortgagee Sale", "Case Study"],
      },
    ],
  },
};

function PostCard({ post, section }: { post: Post; section: Section }) {
  const [expanded, setExpanded] = useState(false);
  const preview = post.excerpt.length > 180 && !expanded
    ? post.excerpt.slice(0, 180) + "…"
    : post.excerpt;

  return (
    <div className={`rounded-xl border bg-card shadow-sm p-5 flex flex-col gap-3 relative ${post.pinned ? "ring-2 ring-primary/20" : ""}`}>
      {post.pinned && (
        <span className="absolute top-3 right-3 flex items-center gap-1 text-xs text-primary font-semibold">
          <Pin className="h-3 w-3" /> Pinned
        </span>
      )}
      <div className="flex items-start justify-between gap-2 pr-12">
        <h3 className="font-semibold text-base leading-snug">{post.title}</h3>
      </div>
      {post.tags && (
        <div className="flex flex-wrap gap-1.5">
          {post.tags.map((t) => (
            <span key={t} className="text-xs bg-secondary text-secondary-foreground rounded-full px-2 py-0.5">{t}</span>
          ))}
        </div>
      )}
      <p className="text-sm text-muted-foreground leading-relaxed">{preview}</p>
      {post.excerpt.length > 180 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-xs text-primary flex items-center gap-1 w-fit hover:underline"
        >
          {expanded ? <><ChevronUp className="h-3 w-3" />Show less</> : <><ChevronDown className="h-3 w-3" />Read more</>}
        </button>
      )}
      <div className="flex items-center justify-between mt-1">
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{post.date}</span>
          {post.author && <span className="flex items-center gap-1"><User className="h-3 w-3" />{post.author}</span>}
        </div>
        {post.url && (
          <a href={post.url} target="_blank" rel="noopener noreferrer">
            <Button size="sm" variant="outline" className="h-7 text-xs gap-1">
              Source <ExternalLink className="h-3 w-3" />
            </Button>
          </a>
        )}
      </div>
    </div>
  );
}

export default function Forum() {
  const [active, setActive] = useState<Section>("news");
  const section = CONTENT[active];
  const meta = SECTIONS.find((s) => s.id === active)!;

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary text-primary-foreground py-14 px-4">
        <div className="container mx-auto max-w-5xl">
          <BackButton label="Home" />
          <div className="flex items-center gap-3 mb-3">
            <MessageCircle className="h-8 w-8 text-accent" />
            <h1 className="text-4xl md:text-5xl font-bold">Community Forum</h1>
          </div>
          <p className="text-lg text-primary-foreground/80 max-w-2xl">
            News, reviews, case guidance, rules, jurisdiction questions, determinations and advice — everything the AFCA community needs in one place.
          </p>
        </div>
      </div>

      <div className="sticky top-0 z-30 bg-background border-b shadow-sm">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="flex gap-1 overflow-x-auto py-2 scrollbar-hide">
            {SECTIONS.map((s) => {
              const Icon = s.icon;
              return (
                <button
                  key={s.id}
                  onClick={() => setActive(s.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap border transition-all ${
                    active === s.id
                      ? "bg-primary text-primary-foreground border-primary shadow"
                      : "bg-muted border-transparent text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {s.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-5xl px-4 py-10">
        <div className="mb-8">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm font-medium mb-3 ${meta.color}`}>
            <meta.icon className="h-4 w-4" />
            {meta.label}
          </div>
          <p className="text-muted-foreground max-w-2xl">{section.intro}</p>
        </div>

        <div className="grid gap-4">
          {section.posts
            .slice()
            .sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0))
            .map((post, i) => (
              <PostCard key={i} post={post} section={active} />
            ))}
        </div>
      </div>
    </div>
  );
}
