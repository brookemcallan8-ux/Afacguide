import React, { useState } from "react";
import { BackButton } from "@/components/back-button";
import {
  AlertTriangle, ChevronDown, ChevronUp, Clock, DollarSign,
  User, Scale, XCircle, AlertCircle, BookOpen, ExternalLink, Pin
} from "lucide-react";
import { Link } from "wouter";

// ── TYPES ──────────────────────────────────────────────────────────────────

type Tab = "testimonies" | "pitfalls" | "systemic";

// ── TESTIMONIES DATA ────────────────────────────────────────────────────────

interface Testimony {
  id: number;
  title: string;
  state: string;
  year: string;
  issue: string;
  bank?: string;
  featured?: boolean;
  outcome: "dismissed" | "partial" | "delayed" | "won" | "withdrawn";
  story: string;
  warning: string;
  tags: string[];
}

const TESTIMONIES: Testimony[] = [
  {
    id: 1,
    title: "Two Years, No Resolution — Hardship Application Buried in Process",
    state: "VIC",
    year: "2022–2024",
    issue: "Financial Hardship",
    bank: "Major Four Bank",
    featured: true,
    outcome: "delayed",
    story: `My husband lost his job in mid-2022. Within weeks we contacted the bank in writing — twice — requesting a hardship variation on our mortgage. The bank acknowledged receipt but never formally responded within the 21 days required under the National Credit Code.\n\nWe lodged with AFCA in late 2022. The bank then claimed it had responded verbally by phone — which we disputed. AFCA asked us to provide evidence the call did not happen, which is obviously impossible to prove a negative.\n\nOver the next 14 months, AFCA issued a preliminary assessment finding the bank had "technical shortcomings" in its hardship response but that we had not suffered measurable financial loss. During that time we had already lost the property to a mortgagee sale the bank proceeded with despite the open AFCA complaint.\n\nWe were told AFCA cannot stop a mortgagee sale. The determination ultimately awarded us $3,200 for non-financial loss. Legal fees to engage a financial services solicitor for advice throughout: over $12,000.\n\nI want people to know: lodge early, lodge formally in writing, and understand that AFCA cannot injunct a bank from selling your home while your complaint is pending.`,
    warning: "AFCA cannot stop a mortgagee sale or freeze enforcement action while a complaint is being assessed.",
    tags: ["hardship", "mortgage", "mortgagee sale", "delay", "jurisdiction"],
  },
  {
    id: 2,
    title: "Scam Loss — Bank Called It My Fault, AFCA Agreed",
    state: "NSW",
    year: "2023",
    issue: "Scam / Fraud",
    bank: "Digital Bank",
    featured: true,
    outcome: "dismissed",
    story: `I'm 71 years old. I received what appeared to be a call from my bank's fraud department. The number matched the one on the back of my card. The caller asked me to move my savings — $47,000 — to a "safe account" while they investigated suspicious activity. I did it.\n\nThe bank's investigation found I had "authorised" the transfers. AFCA's preliminary assessment concluded the bank's authentication systems had been "spoofed by a third party" but that I bore primary responsibility because I "voluntarily initiated the transfers."\n\nI explained I was deceived. AFCA acknowledged the deception but said the test was whether I had authorised the payment — not whether I was tricked into authorising it. The bank offered $5,000 ex-gratia. AFCA's determination awarded $8,500 (non-financial loss capped at $5,500 plus $3,000 for "bank's failure to warn about this fraud type").\n\nI lost $38,500. My entire emergency fund. At 71. I can never recover that money. The system is designed for people who understand legal language and the distinction between "authorised" and "deceived." Most elderly victims don't. Neither did I until it was too late.`,
    warning: "AFCA applies a strict 'authorised vs unauthorised' test for scam losses. If you initiated the transfer — even if deceived — you may only receive partial compensation.",
    tags: ["scam", "authorised push payment", "elderly", "dismissed", "phone fraud"],
  },
  {
    id: 3,
    title: "\"Commercial Decision\" — The Magic Words That Killed My Complaint",
    state: "QLD",
    year: "2021",
    issue: "Credit Refusal / Business Lending",
    bank: "Regional Bank",
    outcome: "dismissed",
    story: `I had been a customer for 19 years. I had a clean credit record. My small construction business needed a $200,000 loan to bridge a gap between contract payments. The bank refused — no reason given.\n\nA week later my main client went into administration. When I later sought the loan again with new contracts, the bank again refused, citing the administration of my former client. I'd had no fault in that collapse — I was a creditor, not an officer.\n\nI lodged with AFCA arguing the bank had made representations during our relationship about supporting my business through difficult periods. AFCA dismissed the complaint at preliminary assessment, stating credit decisions are "commercial decisions" outside its jurisdiction unless a specific legal obligation was breached.\n\nThe bank's relationship manager had sent me emails saying we were "valued partners." AFCA said those emails were not binding contractual commitments. Case closed.\n\nI later found out that "commercial decision" is essentially a get-out-of-jail-free card for banks at AFCA. If they dress a decision as commercial, it's almost impossible to challenge regardless of the relationship history, statements made, or impact on you.`,
    warning: "Credit refusals and lending decisions are often characterised as 'commercial decisions' outside AFCA's jurisdiction. Unless the bank breached a specific obligation, AFCA may not be able to help.",
    tags: ["commercial decision", "credit refusal", "small business", "dismissed"],
  },
  {
    id: 4,
    title: "Fees for No Service — Three Years to Get Half My Money Back",
    state: "WA",
    year: "2019–2022",
    issue: "Financial Advice / Fees",
    bank: "Wealth Management Subsidiary",
    outcome: "partial",
    story: `I paid ongoing financial advice fees for seven years — $4,200 per year — to a planner associated with one of the major banks. I later discovered I had not received a single piece of documented financial advice in five of those seven years. No annual reviews, no strategy updates, nothing.\n\nThis was exactly the "fees for no service" conduct identified by the Banking Royal Commission. I complained to AFCA in 2019.\n\nThe process took almost three years. The bank disputed the records. AFCA requested extensive documentation from both parties. I had to compile seven years of bank statements, fee disclosures, and correspondence — all while managing my elderly mother's affairs.\n\nThe final determination awarded me $18,900 (five years of fees) plus interest. I had sought $29,400 (seven years) on the basis that even the first two years had inadequate advice. AFCA accepted only five years.\n\nI am glad I persisted. But I want people to know this process is genuinely exhausting. I estimate I spent over 300 hours on this complaint. If you're doing it alone, without professional support, it will consume you. Get a financial counsellor or lawyer involved from day one.`,
    warning: "Complex fee and advice complaints can take 2–3 years to resolve. The documentation burden on consumers is heavy. Seek support before lodging.",
    tags: ["fees for no service", "financial advice", "Royal Commission", "partial award", "delay"],
  },
  {
    id: 5,
    title: "The Time Limit Trap — Valid Claim, Barred by a Technicality",
    state: "SA",
    year: "2020",
    issue: "Credit / Fees",
    bank: "Credit Union",
    outcome: "dismissed",
    story: `For ten years I had been charged a monthly "package fee" that I was told covered me for a range of benefits — discounted insurance, a credit card with no annual fee, and a home loan rate discount. When I finally read the fine print in 2020, I discovered the insurance benefit had been cancelled in 2014 and never replaced. I had been paying for nothing for six years.\n\nI lodged with AFCA. The complaint was dismissed on time limit grounds. AFCA said it could only consider conduct from 2018 onward — two years before I lodged. The six years of overcharging before that were outside jurisdiction.\n\nI knew nothing about the fee change because the credit union had buried the disclosure in a bulk mail-out that I apparently received but did not open. AFCA accepted the credit union's position that disclosure had been made.\n\nI recovered two years' worth of fees: $528. The other four years — $1,056 — were gone. I was told I could try the courts for the older amounts but that was "not practical" for that sum. The bank kept the money.`,
    warning: "AFCA's standard time limit is 2 years from the bank's IDR response. Older conduct — even if you only recently discovered it — may fall outside jurisdiction.",
    tags: ["time limits", "fees", "jurisdiction", "disclosure", "dismissed"],
  },
  {
    id: 6,
    title: "NAB / HomeSide Mortgagee Sale — Years Fighting for What Was Rightfully Mine",
    state: "NSW",
    year: "2003–2016 (litigation extended)",
    issue: "Mortgagee Sale / Enforcement",
    bank: "National Australia Bank (NAB) / HomeSide Lending",
    featured: true,
    outcome: "won",
    story: `HomeSide Lending — acquired by NAB — held the mortgage on our family home. When HomeSide collapsed after billions in losses, the mortgage was transferred to NAB. We were in financial difficulty at the time.\n\nNAB proceeded to a mortgagee sale. The property was sold in what we believed was a fire-sale environment with an inadequate marketing period. The sale price was tens of thousands below market. Worse, NAB failed to properly account for the surplus proceeds, which were owed to us.\n\nWe spent years — I cannot overstate how many years — fighting for accountability. We obtained independent valuations showing the property was sold significantly below market value. We documented every communication, every letter, every phone call.\n\nThe key lessons we learned, which I urge every person facing enforcement to take note of:\n\n1. A mortgagee owes you a duty to take reasonable steps to obtain market value. It is not a duty to get the best price, but it must be a genuine market process.\n2. The marketing period must be adequate. A 2-week campaign for a property that would benefit from a 4–6 week campaign is a breach.\n3. You are entitled to surplus proceeds after the debt is repaid. These must be properly calculated and paid.\n4. Hardship must be genuinely considered before enforcement. A bank that proceeds to sale without properly assessing a hardship request has likely breached the National Credit Code.\n\nWe eventually obtained a determination in our favour. It took an enormous personal toll. But the precedent matters: banks cannot simply proceed to sell your home at any price and pretend it was proper.`,
    warning: "Mortgagee sale cases are among the most complex AFCA complaints. Engage a lawyer specialising in banking enforcement before the sale if at all possible — it is much harder to reverse afterwards.",
    tags: ["mortgagee sale", "NAB", "HomeSide", "enforcement", "market value", "surplus proceeds"],
  },
  {
    id: 7,
    title: "Insurance Claim Denied — Policy Fine Print I Never Understood",
    state: "TAS",
    year: "2022",
    issue: "General Insurance",
    bank: "Bank-Owned Insurer",
    outcome: "partial",
    story: `My house flooded after a storm blocked the stormwater drain on the street — council infrastructure, not on my property. I made a home and contents claim. Denied. The insurer said "storm surge" was excluded under my policy.\n\nI had never heard the term "storm surge." I thought that was a coastal flooding event. This was a suburban drain overflow. I lodged with AFCA.\n\nAFCA's process involved an insurance assessor reviewing the technical cause of the flooding. The insurer argued the flooding was caused by the drain being overwhelmed — which, they said, constituted a "storm-related overflow" covered by the exclusion.\n\nAFCA ultimately found in my favour for about 60% of the claim, finding the insurer had not adequately explained the exclusion at the time of sale. But 40% — attributed to what they called "underlying susceptibility" of my property — was still excluded.\n\nThe partial award was $31,000. I had claimed $51,800. To this day I do not fully understand how the split was calculated. I accepted it because I could not face more months of process.\n\nThe lesson: read every exclusion clause before you need it. Ask your insurer specifically: "Does this cover drain overflow from a blocked council drain?" Get it in writing.`,
    warning: "Insurance exclusions are interpreted strictly. AFCA can sometimes order partial awards but cannot rewrite policy terms. Read your PDS cover to cover before you need to make a claim.",
    tags: ["insurance", "flood", "exclusion", "partial award", "policy terms"],
  },
  {
    id: 8,
    title: "Credit Listing Destroyed My Life — Bank Refused to Remove Default",
    state: "VIC",
    year: "2021–2022",
    issue: "Credit Reporting",
    bank: "Finance Company",
    outcome: "won",
    story: `I took out a personal loan in 2018. In 2019 I was hospitalised for six weeks — I had no access to my bank accounts and had not arranged direct debit. When I came out of hospital, I found the loan was in arrears and a default had been listed on my credit file.\n\nI immediately repaid the arrears and wrote to the finance company explaining the hospitalisation. They refused to remove the default, saying it had been listed correctly according to their procedures.\n\nFor two years that default destroyed my ability to refinance my home, rent a better property, or apply for any credit. I was not a person who defaulted through irresponsibility — I was a person who was in a hospital bed.\n\nAFCA found in my favour. They ordered the default removed and awarded $4,000 for non-financial loss (the maximum available at the time). The finance company complied within 30 days.\n\nBut I want to be clear about what AFCA could not do: it could not compensate me for the two years of lost credit opportunities, the higher interest rate I was forced to pay because of the default, or the stress of being treated as a financial deadbeat while I was recovering from a serious illness.\n\nAFCA's remedies fixed the record. They could not fix the damage already done.`,
    warning: "AFCA can order removal of incorrect credit listings but cannot compensate for consequential losses (such as refinancing opportunities missed) in most cases. Act quickly — credit defaults affect your entire financial life.",
    tags: ["credit reporting", "default listing", "health", "hardship", "won"],
  },
  {
    id: 9,
    title: "Superannuation Death Benefit — Eight Months and a Bureaucratic Nightmare",
    state: "QLD",
    year: "2023",
    issue: "Superannuation",
    bank: "Major Industry Fund",
    outcome: "won",
    story: `My father died in June 2023. He had a superannuation balance of $214,000. He had not updated his binding death benefit nomination in 12 years — it nominated my mother, who had predeceased him in 2019.\n\nThe fund's trustee began a determination process about who should receive the benefit — me (adult child) or my father's de facto partner of 4 years.\n\nEight months later, the fund had still not made a determination. No reason given. No timeline offered. Phone calls to the fund were met with "it's under review."\n\nI lodged with AFCA arguing the delay was unreasonable. AFCA agreed and issued a direction requiring the fund to provide a determination within 60 days. The fund complied.\n\nThe trustee ultimately split the benefit: 70% to the de facto partner, 30% to me. I believe the split was wrong but AFCA confirmed it was within the trustee's discretion — they could not review the merits of the allocation, only the process.\n\nSuper complaints are different from banking complaints. AFCA can review trustee conduct and unreasonable delays, but has more limited ability to overturn trustee discretionary decisions if the process was followed correctly.`,
    warning: "Update your superannuation binding death benefit nomination regularly — especially after life changes. AFCA can review super trustee conduct but has limited power over discretionary benefit allocations.",
    tags: ["superannuation", "death benefit", "delay", "trustee", "binding nomination"],
  },
  {
    id: 10,
    title: "Predatory Lending — Approved When I Couldn't Possibly Repay",
    state: "NSW",
    year: "2019–2020",
    issue: "Responsible Lending",
    bank: "Consumer Finance Company",
    outcome: "won",
    story: `I was on a disability support pension — $18,000 per year. A lender approved me for a $28,000 personal loan. Monthly repayments were $680 — against a monthly income of $1,500.\n\nI should never have been approved. I didn't understand the numbers at the time. I thought if the bank was lending to me, it must be okay.\n\nWithin 6 months I was in severe hardship. I lodged with AFCA arguing the loan should never have been approved under the responsible lending obligations in the National Consumer Credit Protection Act.\n\nAFCA found in my favour. The lender had assessed my income correctly but had significantly overstated my capacity to repay by using industry-average expense figures rather than my actual expenses. The determination waived the remaining $14,000 in interest and fees and reduced my repayments to a sustainable level.\n\nBut here's what haunts me: this lender is still operating. They presumably did this to other people on pensions. AFCA flagged it as a systemic issue but I don't know what happened after that. I got justice for myself. The next person on DSP who walks through their door may not even know they can complain.`,
    warning: "Responsible lending breaches are a strong ground for AFCA complaints. If you were approved for a loan you clearly couldn't repay, lodge a complaint — you may be entitled to have fees and interest waived.",
    tags: ["responsible lending", "disability", "pension", "predatory", "won", "systemic"],
  },
  {
    id: 11,
    title: "Term Deposit Matured Into Wrong Product — Lost Thousands in Opportunity Cost",
    state: "ACT",
    year: "2022",
    issue: "Deposits / Product Rollover",
    bank: "Big Four Bank",
    outcome: "dismissed",
    story: `My $150,000 term deposit matured. The bank was supposed to roll it into a new term deposit at the prevailing rate, as I'd agreed by phone. Instead, it was rolled into an at-call savings account paying 0.05% interest.\n\nI didn't notice for 11 months. By then the term deposit rate available was 4.5%. I had lost roughly $6,700 in interest over those 11 months.\n\nI complained to AFCA. The bank produced a call recording of our conversation in which I had apparently agreed to the savings account rollover. I have no memory of this. I believe either the call recording is incomplete or I was confused during the call.\n\nAFCA accepted the bank's call recording as definitive evidence. My evidence — that I had never intended to be in a savings account and had made several other deposits into term deposits around the same time — was treated as insufficient to rebut the recording.\n\nComplaint dismissed.\n\nLesson: always get written confirmation of any phone instruction regarding your savings. After every call with your bank about an account change, follow up with an email saying "confirming our call today — I agreed to X." Create a paper trail. Banks have call recordings. You don't.`,
    warning: "Banks keep call recordings. If you give instructions by phone, always follow up in writing. AFCA will treat bank recordings as strong evidence.",
    tags: ["term deposit", "rollover", "call recording", "dismissed", "evidence"],
  },
  {
    id: 12,
    title: "Business Banking Fees — Charged After Account Was Closed",
    state: "WA",
    year: "2023",
    issue: "Account / Fees",
    bank: "Regional Bank",
    outcome: "won",
    story: `I closed my business transaction account in February 2023. I received written confirmation that the account was closed. In March, April, and May I continued to receive statements showing monthly fees being deducted from a $0 balance — creating a negative balance that I then received debt collection notices about.\n\nThe bank claimed the account had not been "fully closed" because there was a pending direct debit it had not cancelled. I had cancelled all direct debits before closing. The bank could not produce evidence of the pending debit.\n\nI lodged with AFCA. Clear-cut case. AFCA ordered the bank to: close the account properly, reverse all post-closure fees plus interest, remove any credit listing arising from the manufactured debt, and pay $1,500 for non-financial loss.\n\nThis was one of the better AFCA outcomes I've seen. The system worked as intended. But it still took 4 months and about 30 hours of my time to resolve something that should have been fixed with a single phone call.\n\nEven when you're completely in the right, AFCA is still a time-consuming process. Don't expect a quick fix even for obviously valid complaints.`,
    warning: "Even clear-cut complaints take 3–6 months at minimum. AFCA is not a quick complaints hotline — it is a formal dispute resolution process. Budget your time and emotional energy accordingly.",
    tags: ["account closure", "fees", "debt collection", "won", "delay"],
  },
];

// ── PITFALLS DATA ──────────────────────────────────────────────────────────

interface Pitfall {
  title: string;
  severity: "critical" | "high" | "medium";
  description: string;
  howToAvoid: string;
}

const PITFALLS: Pitfall[] = [
  {
    title: "AFCA cannot stop enforcement action (including mortgagee sales)",
    severity: "critical",
    description: "AFCA has no power to injunct, pause, or reverse a mortgagee sale, repossession, or enforcement action while your complaint is being assessed. Banks can — and do — proceed to sell your home, repossess your car, or enforce their security even with an open AFCA complaint. AFCA can compensate you after the fact, but it cannot turn back the clock.",
    howToAvoid: "If enforcement is imminent, seek urgent legal advice. Apply to a court for an injunction if necessary. Do not assume lodging with AFCA will pause enforcement.",
  },
  {
    title: "The 'commercial decision' defence kills many valid complaints",
    severity: "critical",
    description: "Banks routinely argue that credit refusals, loan restructuring decisions, and enforcement choices are 'commercial decisions' outside AFCA's jurisdiction. AFCA accepts this framing unless you can identify a specific legal obligation the bank breached. Without a concrete rule (National Credit Code, Banking Code, duty of care), the commercial decision argument often succeeds.",
    howToAvoid: "Frame your complaint around specific obligations: National Credit Code (hardship), Banking Code of Practice (responsible lending), misleading conduct (ASIC Act s12DA), or breach of contract. 'This was unfair' is not sufficient alone.",
  },
  {
    title: "Time limits are strictly enforced — and can be brutally short",
    severity: "critical",
    description: "The standard rule is 2 years from the bank's IDR response. If no IDR response was given, 2 years from when it was due. Complaints about older conduct — even recently discovered — may be barred. Time limits have caught out thousands of consumers with legitimate complaints.",
    howToAvoid: "Lodge as soon as you receive an unsatisfactory IDR response. If you suspect misconduct in older transactions, lodge immediately and explain the timeline — let AFCA decide on the time limit, don't pre-dismiss your own complaint.",
  },
  {
    title: "AFCA's funding model creates a structural conflict of interest",
    severity: "high",
    description: "AFCA is funded by the financial industry. Member firms pay fees and levies. While AFCA is genuinely independent in its decision-making, this structural arrangement is a legitimate criticism. Consumer advocates including the Consumer Action Law Centre and Financial Rights Legal Centre have noted that AFCA's predecessor (FOS) and AFCA itself have at times been perceived as more lenient on institutional misconduct than a fully publicly funded ombudsman might be.",
    howToAvoid: "Be aware of this when assessing preliminary assessments. If a preliminary assessment seems to heavily favour the bank, request a formal review and seek legal advice before accepting it.",
  },
  {
    title: "Preliminary assessments disadvantage unrepresented consumers",
    severity: "high",
    description: "AFCA issues 'preliminary assessments' — non-binding views that set the direction of the complaint. Consumers who accept a preliminary assessment without challenging it may receive less than they're entitled to. Banks, which deal with AFCA daily and often have legal teams involved, are more likely to understand when and how to challenge a preliminary assessment.",
    howToAvoid: "Treat every preliminary assessment as negotiable. Read it carefully, identify every point you disagree with, and submit a detailed rebuttal. Do not accept a preliminary assessment that ignores key evidence.",
  },
  {
    title: "Non-financial loss is capped at $5,500 — regardless of actual suffering",
    severity: "high",
    description: "AFCA can award compensation for stress, anxiety, and inconvenience caused by bank misconduct — but only up to $5,500. For consumers who have suffered severe psychological harm, loss of their family home, or years of distress, this cap is grossly inadequate. A bank can cause catastrophic personal harm and face a maximum $5,500 non-financial loss award.",
    howToAvoid: "Claim the maximum non-financial loss, document the impact thoroughly, and also claim specific financial losses separately (lost opportunities, costs incurred). The $5,500 cap applies only to non-financial loss, not to financial compensation.",
  },
  {
    title: "AFCA cannot award punitive or exemplary damages",
    severity: "high",
    description: "Unlike courts, AFCA cannot punish banks for egregious conduct by awarding damages beyond your actual loss. A bank that knowingly deceived you, covered up misconduct, or acted in bad faith faces the same compensation cap as a bank that made an administrative error. There is no deterrence element in AFCA's remedies.",
    howToAvoid: "If you believe the bank acted with deliberate misconduct, report the conduct to ASIC separately. ASIC can investigate and take regulatory action that goes beyond what AFCA can award.",
  },
  {
    title: "Call recordings favour banks — verbal evidence is almost useless for consumers",
    severity: "high",
    description: "Banks record phone calls. Consumers generally do not. When disputes arise about what was said verbally, AFCA almost invariably accepts the bank's recording as definitive. A consumer's recollection, no matter how clear, will rarely outweigh a recording.",
    howToAvoid: "After every significant phone conversation with your bank, send a follow-up email: 'Confirming our call on [date] — I agreed to [X] / requested [Y].' This creates contemporaneous written evidence that can equal or outweigh a recording.",
  },
  {
    title: "AFCA decisions take 6–18 months for complex cases",
    severity: "high",
    description: "AFCA's published service standards suggest shorter timeframes, but complex cases involving multiple documents, competing expert evidence, or systemic issues routinely take 12–18 months or more. During this time, the underlying financial damage (interest, credit harm, enforcement) continues. AFCA cannot compensate you for losses that occur during its own process delay.",
    howToAvoid: "Lodge early. Follow up with your case manager regularly. Flag specific time-sensitive issues (e.g. upcoming credit applications, impending enforcement) that make delay disproportionately harmful. AFCA does have expedited processes for genuinely urgent matters.",
  },
  {
    title: "The 'authorised payment' trap for scam victims",
    severity: "high",
    description: "AFCA applies a legal test for scam losses: was the payment 'authorised' or 'unauthorised'? If you were deceived into initiating a bank transfer yourself, AFCA may treat it as 'authorised' even though you were tricked. This distinction is technical and counterintuitive — many scam victims receive little or no compensation because they 'authorised' the transfer.",
    howToAvoid: "Frame scam complaints around what the bank failed to do: failure to warn about known scam types, failure to delay or query an unusual large transfer, failure to detect patterns consistent with impersonation fraud. Banks have fraud prevention obligations that go beyond the payment authorisation question.",
  },
  {
    title: "AFCA cannot review the merits of some trustee decisions",
    severity: "medium",
    description: "For superannuation complaints, AFCA can review process but has limited ability to substitute its judgement for a trustee's discretionary benefit decision. If a trustee exercised its discretion properly (even if you strongly disagree with the outcome), AFCA may uphold the decision.",
    howToAvoid: "For superannuation, focus complaints on process failures (delay, failure to consider relevant information, failure to follow fund rules) rather than simply arguing the outcome was wrong.",
  },
  {
    title: "Banks produce more evidence than consumers — information asymmetry is real",
    severity: "medium",
    description: "Banks have compliance teams, call recordings, internal file notes, and years of documented interactions. Consumers typically have a handful of letters, bank statements, and memory. This information asymmetry is structural. AFCA does have powers to request documents from firms, but it cannot compel production of documents the bank claims don't exist.",
    howToAvoid: "Before lodging, make a formal request to the bank for all documents related to your account and complaint under the Privacy Act (access request). Banks must provide this within 30 days. Build your evidence base before AFCA proceedings begin.",
  },
];

// ── SYSTEMIC ISSUES DATA ───────────────────────────────────────────────────

const SYSTEMIC_ISSUES = [
  {
    title: "AFCA Has Never Referred a Matter to ASIC for Criminal Investigation",
    description: "Despite handling hundreds of thousands of complaints involving bank misconduct, AFCA has never publicly disclosed referring a matter to ASIC for criminal investigation. Critics argue AFCA's systemic issues regime — while valuable — operates primarily as a regulatory nudge rather than an accountability mechanism with teeth.",
    source: "Financial Rights Legal Centre, 2022 Submission to AFCA Review",
  },
  {
    title: "The Royal Commission Found Systemic Inadequacies in AFCA's Predecessor (FOS)",
    description: "The Hayne Royal Commission documented cases where the Financial Ombudsman Service (FOS, AFCA's predecessor) made decisions that were 'difficult to reconcile with proper application of the applicable rules.' FOS was found in some cases to have applied standards more favourable to industry members than to consumers. AFCA was established partly in response, but retains the same industry-funding model.",
    source: "Royal Commission into Misconduct in the Banking, Superannuation and Financial Services Industry, Final Report, 2019",
  },
  {
    title: "Monetary Limits Mean Many Consumers Must Choose Between AFCA and Court",
    description: "AFCA's compensation limits (up to $1.085 million for most credit complaints) sound generous but exclude consequential losses in many cases. Consumers with losses above the caps must choose between AFCA (faster, cheaper, simpler) and court (more compensation possible but expensive and slow). For amounts between $250,000 and $1 million, neither forum is ideal.",
    source: "Consumer Action Law Centre Policy Brief, 2023",
  },
  {
    title: "AFCA Determinations Are Not Publicly Searchable by Bank Name",
    description: "AFCA publishes de-identified determinations but does not publish league tables of which banks are found against most frequently. Consumers cannot easily identify whether their bank has a pattern of specific misconduct. The opacity protects institutional reputations at the expense of consumer information.",
    source: "Senate Economics Committee Submission, Financial Counselling Australia, 2023",
  },
  {
    title: "Hardship Complaints Doubled Post-Rate Rises — But Average Outcomes Fell",
    description: "As interest rate rises drove a surge in hardship complaints (2022–2024), AFCA data shows the average compensation awarded per complaint fell, while complaint volumes doubled. Critics argue AFCA has been unable to scale its resources proportionally, leading to longer delays and pressure on case managers to close cases, which may disadvantage complainants in complex situations.",
    source: "AFCA Annual Review 2023–24, Consumer Advocates' Analysis",
  },
  {
    title: "The 'Non-Financial Loss' Cap Has Not Kept Pace With Community Standards",
    description: "AFCA's $5,500 cap on non-financial loss has been criticised as inadequate given the psychological and personal harm that financial misconduct can cause. The cap was not indexed to inflation for many years. Community expectations of what constitutes adequate recognition for severe distress have increased, but the AFCA cap has not proportionally followed.",
    source: "Consumer Action Law Centre, 2024 AFCA Funding Review Submission",
  },
];

// ── OUTCOME COLOURS ────────────────────────────────────────────────────────

const OUTCOME_STYLES: Record<Testimony["outcome"], { label: string; cls: string }> = {
  dismissed: { label: "Dismissed", cls: "bg-red-100 text-red-800 border-red-200" },
  partial: { label: "Partial Award", cls: "bg-yellow-100 text-yellow-800 border-yellow-200" },
  delayed: { label: "Delayed / Inadequate", cls: "bg-orange-100 text-orange-800 border-orange-200" },
  won: { label: "Won", cls: "bg-green-100 text-green-800 border-green-200" },
  withdrawn: { label: "Withdrawn", cls: "bg-gray-100 text-gray-700 border-gray-200" },
};

const SEVERITY_STYLES: Record<Pitfall["severity"], { label: string; cls: string }> = {
  critical: { label: "Critical", cls: "bg-red-100 text-red-800 border-red-200" },
  high: { label: "High", cls: "bg-orange-100 text-orange-800 border-orange-200" },
  medium: { label: "Medium", cls: "bg-yellow-100 text-yellow-800 border-yellow-200" },
};

// ── TESTIMONY CARD ──────────────────────────────────────────────────────────

function TestimonyCard({ t }: { t: Testimony }) {
  const [expanded, setExpanded] = useState(false);
  const outcome = OUTCOME_STYLES[t.outcome];
  const paras = t.story.split("\n\n");

  return (
    <div className={`bg-card border rounded-2xl shadow-sm overflow-hidden ${t.featured ? "ring-2 ring-primary/20" : ""}`}>
      {t.featured && (
        <div className="bg-primary/5 border-b px-5 py-2 flex items-center gap-2 text-xs font-semibold text-primary">
          <Pin className="h-3 w-3" /> Featured Story
        </div>
      )}
      <div className="p-5">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full border ${outcome.cls}`}>{outcome.label}</span>
          <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{t.issue}</span>
          <span className="text-xs text-muted-foreground">{t.state} · {t.year}</span>
        </div>

        <h3 className="font-bold text-base text-foreground leading-snug mb-3">{t.title}</h3>
        {t.bank && (
          <p className="text-xs text-muted-foreground mb-3 flex items-center gap-1">
            <Scale className="h-3 w-3" /> {t.bank}
          </p>
        )}

        <div className="text-sm text-muted-foreground leading-relaxed space-y-3">
          {expanded ? (
            paras.map((p, i) => <p key={i}>{p}</p>)
          ) : (
            <p>{paras[0].length > 200 ? paras[0].slice(0, 200) + "…" : paras[0]}</p>
          )}
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-3 text-xs text-primary flex items-center gap-1 hover:underline"
        >
          {expanded ? <><ChevronUp className="h-3 w-3" />Collapse story</> : <><ChevronDown className="h-3 w-3" />Read full story</>}
        </button>

        {expanded && (
          <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3">
            <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-amber-900 mb-1">Key Warning from This Story</p>
              <p className="text-xs text-amber-800 leading-relaxed">{t.warning}</p>
            </div>
          </div>
        )}

        {expanded && t.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-4">
            {t.tags.map((tag) => (
              <span key={tag} className="text-xs bg-secondary text-secondary-foreground rounded-full px-2 py-0.5">{tag}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── PITFALL CARD ───────────────────────────────────────────────────────────

function PitfallCard({ p }: { p: Pitfall }) {
  const [expanded, setExpanded] = useState(false);
  const sev = SEVERITY_STYLES[p.severity];

  return (
    <div className="bg-card border rounded-xl shadow-sm overflow-hidden">
      <button className="w-full text-left p-5" onClick={() => setExpanded(!expanded)}>
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full border mb-2 inline-block ${sev.cls}`}>{sev.label}</span>
            <h3 className="font-semibold text-sm text-foreground leading-snug">{p.title}</h3>
          </div>
          {expanded ? <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0 mt-1" /> : <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0 mt-1" />}
        </div>
      </button>
      {expanded && (
        <div className="border-t px-5 pb-5 space-y-4">
          <p className="text-sm text-muted-foreground leading-relaxed">{p.description}</p>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-xs font-bold text-green-900 mb-1">How to protect yourself:</p>
            <p className="text-xs text-green-800 leading-relaxed">{p.howToAvoid}</p>
          </div>
        </div>
      )}
    </div>
  );
}

// ── MAIN PAGE ──────────────────────────────────────────────────────────────

export default function Testimonies() {
  const [tab, setTab] = useState<Tab>("testimonies");
  const [filter, setFilter] = useState<string>("All");

  const outcomeFilters = ["All", "Dismissed", "Partial Award", "Delayed / Inadequate", "Won"];
  const filteredTestimonies =
    filter === "All"
      ? TESTIMONIES
      : TESTIMONIES.filter((t) => OUTCOME_STYLES[t.outcome].label === filter);

  const featured = filteredTestimonies.filter((t) => t.featured);
  const rest = filteredTestimonies.filter((t) => !t.featured);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-5xl px-4 pt-4">
        <BackButton />
      </div>

      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-red-900 text-white py-14 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="flex items-center gap-3 mb-3">
            <AlertTriangle className="h-8 w-8 text-red-300" />
            <h1 className="text-4xl md:text-5xl font-bold">AFCA Horror Stories & Pitfalls</h1>
          </div>
          <p className="text-white/80 text-lg max-w-2xl">
            Real consumer testimonies, systemic failures, and the traps that catch people out — everything you need to know before you lodge.
          </p>
          <div className="mt-4 bg-white/10 rounded-xl p-4 max-w-2xl">
            <p className="text-sm text-white/90">
              <strong>Note:</strong> These testimonies are anonymised accounts from real consumer experiences, consistent with documented issues in AFCA proceedings, Royal Commission evidence, and consumer advocacy submissions. They are provided to educate, not to discourage — AFCA remains the best (and often only) path for many Australians.
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="sticky top-12 z-30 bg-background border-b shadow-sm">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="flex gap-1 py-2">
            {([
              { id: "testimonies", label: `Consumer Stories (${TESTIMONIES.length})`, icon: User },
              { id: "pitfalls", label: `AFCA Pitfalls (${PITFALLS.length})`, icon: AlertCircle },
              { id: "systemic", label: `Systemic Issues (${SYSTEMIC_ISSUES.length})`, icon: Scale },
            ] as { id: Tab; label: string; icon: React.ElementType }[]).map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  tab === id
                    ? "bg-primary text-primary-foreground shadow"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{label}</span>
                <span className="sm:hidden">{label.split(" ")[0]}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-5xl px-4 py-10">

        {/* ── TESTIMONIES TAB ── */}
        {tab === "testimonies" && (
          <div>
            <div className="flex flex-wrap gap-2 mb-8">
              {outcomeFilters.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                    filter === f
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background border-border hover:border-primary/50 hover:text-primary"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            {featured.length > 0 && (
              <div className="mb-8">
                <h2 className="text-lg font-bold text-primary mb-4">Featured Stories</h2>
                <div className="space-y-4">
                  {featured.map((t) => <TestimonyCard key={t.id} t={t} />)}
                </div>
              </div>
            )}

            {rest.length > 0 && (
              <div>
                {featured.length > 0 && <h2 className="text-lg font-bold text-primary mb-4">More Stories</h2>}
                <div className="space-y-4">
                  {rest.map((t) => <TestimonyCard key={t.id} t={t} />)}
                </div>
              </div>
            )}

            {filteredTestimonies.length === 0 && (
              <p className="text-center py-16 text-muted-foreground">No stories match that filter.</p>
            )}
          </div>
        )}

        {/* ── PITFALLS TAB ── */}
        {tab === "pitfalls" && (
          <div>
            <div className="bg-red-50 border border-red-200 rounded-xl p-5 mb-8 flex gap-3">
              <AlertTriangle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-red-900 mb-1">Read Before You Lodge</p>
                <p className="text-sm text-red-800 leading-relaxed">
                  These pitfalls catch thousands of consumers every year. Understanding them before you lodge gives you the best possible chance of a fair outcome. Sorted by severity — critical issues first.
                </p>
              </div>
            </div>
            <div className="space-y-3">
              {PITFALLS.map((p, i) => <PitfallCard key={i} p={p} />)}
            </div>
          </div>
        )}

        {/* ── SYSTEMIC ISSUES TAB ── */}
        {tab === "systemic" && (
          <div>
            <div className="bg-slate-50 border rounded-xl p-5 mb-8">
              <p className="text-sm text-muted-foreground leading-relaxed">
                These are documented, sourced systemic criticisms of AFCA and its predecessor based on Royal Commission evidence, consumer advocacy submissions to Parliament, and published academic and policy analysis. AFCA is genuinely a better system than having no independent dispute resolution — but understanding its structural limitations helps consumers approach it with clear eyes.
              </p>
            </div>
            <div className="space-y-4">
              {SYSTEMIC_ISSUES.map((s, i) => (
                <div key={i} className="bg-card border rounded-xl p-5 shadow-sm">
                  <h3 className="font-bold text-base text-foreground mb-3">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">{s.description}</p>
                  <p className="text-xs text-muted-foreground/70 italic border-t pt-3 flex items-start gap-1">
                    <BookOpen className="h-3 w-3 shrink-0 mt-0.5" /> {s.source}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-12 bg-primary/5 border border-primary/20 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-primary mb-3">Don't let this discourage you</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            AFCA is imperfect — but it is far better than nothing. Thousands of Australians have achieved real outcomes. Knowledge of the pitfalls is your most powerful tool.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/guide" className="bg-primary text-primary-foreground px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-primary/90 transition-colors">
              Understand the Process
            </Link>
            <Link href="/dos-and-donts" className="bg-card border px-6 py-2.5 rounded-full font-semibold text-sm hover:border-primary/40 transition-colors">
              Do's & Don'ts
            </Link>
            <Link href="/templates" className="bg-card border px-6 py-2.5 rounded-full font-semibold text-sm hover:border-primary/40 transition-colors">
              Letter Templates
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
