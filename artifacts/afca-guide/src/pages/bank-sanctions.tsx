import React from "react";
import { BackButton } from "@/components/back-button";
import { AlertTriangle, ExternalLink, Building2, Calendar, DollarSign, Gavel } from "lucide-react";

interface Sanction {
  bank: string;
  year: string;
  regulator: string;
  matter: string;
  penalty: string;
  outcome: string;
  sourceUrl: string;
}

const SANCTIONS: Sanction[] = [
  {
    bank: "Westpac Banking Corporation",
    year: "2020",
    regulator: "AUSTRAC",
    matter: "23 million breaches of anti-money laundering and counter-terrorism financing laws, including failures that facilitated child exploitation payments.",
    penalty: "$1.3 billion",
    outcome: "Record civil penalty — the largest in Australian corporate history at the time. Westpac agreed to a statement of facts and a court-enforceable undertaking to improve its AML/CTF systems.",
    sourceUrl: "https://www.austrac.gov.au",
  },
  {
    bank: "Commonwealth Bank of Australia (CBA)",
    year: "2018",
    regulator: "AUSTRAC",
    matter: "53,750+ contraventions of the Anti-Money Laundering and Counter-Terrorism Financing Act 2006 via CBA's intelligent deposit machines.",
    penalty: "$700 million",
    outcome: "At the time, the largest civil penalty in Australian corporate history. CBA agreed to the penalty without admission of additional wrongdoing beyond those already acknowledged.",
    sourceUrl: "https://www.austrac.gov.au",
  },
  {
    bank: "National Australia Bank (NAB)",
    year: "2019–2021",
    regulator: "ASIC / Royal Commission",
    matter: "Fees for no service — charging ongoing service fees to customers who received no financial advice. Also identified for conduct breaches including charging deceased customers.",
    penalty: "Part of $400M+ industry-wide remediation",
    outcome: "NAB required to implement a customer remediation program, refund fees with interest, and improve compliance systems. ASIC accepted a court enforceable undertaking.",
    sourceUrl: "https://www.asic.gov.au",
  },
  {
    bank: "NAB / HomeSide Lending",
    year: "2001",
    regulator: "Market / Write-downs",
    matter: "HomeSide International mortgage servicing losses — $4.1 billion write-down. Raised questions about NAB's oversight of US mortgage operations and risk management frameworks.",
    penalty: "$4.1 billion write-down",
    outcome: "NAB divested HomeSide International. Multiple senior executives departed. Lessons about mortgage operational risk informed later regulatory changes.",
    sourceUrl: "https://www.nab.com.au",
  },
  {
    bank: "AMP Limited",
    year: "2018–2019",
    regulator: "ASIC / Royal Commission",
    matter: "Charging fees for no service, making false or misleading statements to ASIC, and misconduct by financial advisers.",
    penalty: "$35M+ remediation + regulatory action",
    outcome: "AMP's CEO and Chair resigned following Royal Commission hearings. Multiple criminal referrals made. AMP required to remediate customers and improve governance.",
    sourceUrl: "https://www.asic.gov.au",
  },
  {
    bank: "ANZ Banking Group",
    year: "2016–2018",
    regulator: "ASIC",
    matter: "Interest rate rigging — ANZ traders attempted to manipulate the bank bill swap rate (BBSW).",
    penalty: "$10 million",
    outcome: "Civil penalty imposed. ANZ also agreed to a compliance program and did not admit liability. Multiple bank traders were separately investigated.",
    sourceUrl: "https://www.asic.gov.au",
  },
  {
    bank: "Commonwealth Bank of Australia",
    year: "2017",
    regulator: "APRA",
    matter: "APRA's Prudential Inquiry found complacency, reactiveness, and a sense of invincibility in CBA's culture and risk management. Triggered by the AUSTRAC matter.",
    penalty: "$1 billion additional capital + remediation",
    outcome: "CBA required to hold an additional $1 billion in capital until APRA satisfied with remedial action. A governance remediation plan was overseen by APRA.",
    sourceUrl: "https://www.apra.gov.au",
  },
  {
    bank: "Westpac / BT Financial Group",
    year: "2019–2020",
    regulator: "ASIC",
    matter: "Fees for no service, conflicted remuneration, and failure to provide financial services efficiently, honestly, and fairly.",
    penalty: "$40M+ remediation",
    outcome: "Customer remediation program implemented. ASIC obtained undertakings and commenced additional civil proceedings against Westpac entities.",
    sourceUrl: "https://www.asic.gov.au",
  },
  {
    bank: "NAB (National Australia Bank)",
    year: "2022",
    regulator: "ASIC",
    matter: "Charged fees for overdrawn accounts that customers did not consent to and could not avoid — 'honour fees' charged to customers with little to no balance.",
    penalty: "$49.5 million",
    outcome: "Federal Court ordered NAB to pay $49.5 million in penalties for unconscionable conduct. NAB acknowledged 255,000+ customers were harmed. Largest ASIC penalty of its kind.",
    sourceUrl: "https://www.asic.gov.au",
  },
  {
    bank: "Macquarie Bank",
    year: "2024",
    regulator: "ASIC",
    matter: "Failures in online trading platform security and systems that allowed scammers to access customer accounts.",
    penalty: "Under investigation",
    outcome: "ASIC investigation ongoing. Macquarie required to remediate affected customers and improve security systems.",
    sourceUrl: "https://www.asic.gov.au",
  },
  {
    bank: "CBA, NAB, Westpac, ANZ, AMP (collectively)",
    year: "2018–2023",
    regulator: "Royal Commission / ASIC",
    matter: "Royal Commission into Misconduct in the Banking, Superannuation and Financial Services Industry — widespread findings of misconduct, fees for no service, and misleading regulators.",
    penalty: "$3.5+ billion industry-wide remediation",
    outcome: "76 referrals for criminal or civil action. Substantial regulatory reforms. Banks and super funds returned over $3.5 billion to customers. Multiple criminal prosecutions.",
    sourceUrl: "https://www.royalcommission.gov.au/banking",
  },
  {
    bank: "Westpac Banking Corporation",
    year: "2019",
    regulator: "ASIC",
    matter: "Failing to assess whether interest-only home loans were suitable for customers, and extending interest-only periods without proper checks.",
    penalty: "$35 million",
    outcome: "Civil penalty. ASIC found over 10,500 home loan customers were affected. Westpac required to remediate customers and improve assessment processes.",
    sourceUrl: "https://www.asic.gov.au",
  },
];

const REGULATOR_COLOURS: Record<string, string> = {
  AUSTRAC: "bg-red-100 text-red-800 border-red-200",
  ASIC: "bg-blue-100 text-blue-800 border-blue-200",
  APRA: "bg-purple-100 text-purple-800 border-purple-200",
  "Royal Commission / ASIC": "bg-orange-100 text-orange-800 border-orange-200",
  "ASIC / Royal Commission": "bg-orange-100 text-orange-800 border-orange-200",
  "Market / Write-downs": "bg-gray-100 text-gray-700 border-gray-200",
};

export default function BankSanctions() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-5xl px-4 pt-4">
        <BackButton />
      </div>
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-16 px-4">
        <div className="container mx-auto max-w-5xl text-center">
          <div className="h-16 w-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Gavel className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Bank Sanctions & Penalties</h1>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
            Major regulatory actions, penalties, and enforcement against Australian banks. Knowing this history helps you understand your rights and the seriousness of banking misconduct.
          </p>
        </div>
      </div>

      <div className="container mx-auto max-w-5xl px-4 py-10">
        {/* Context Banner */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-10 flex gap-4">
          <AlertTriangle className="h-6 w-6 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-amber-900 mb-1">Why does this matter for your complaint?</p>
            <p className="text-sm text-amber-800 leading-relaxed">
              A history of regulatory action against a bank can support your AFCA complaint by demonstrating systemic patterns of conduct. Prior ASIC enforcement actions, Royal Commission findings, and AFCA determinations can all be referenced as relevant context when you make your complaint. AFCA's approach documents take systemic conduct into account.
            </p>
          </div>
        </div>

        {/* Sanctions List */}
        <div className="space-y-6">
          {SANCTIONS.map((s, i) => (
            <div key={i} className="bg-card border rounded-2xl shadow-sm overflow-hidden">
              <div className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                    <Building2 className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap gap-2 mb-2">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${REGULATOR_COLOURS[s.regulator] ?? "bg-gray-100 text-gray-700 border-gray-200"}`}>
                        {s.regulator}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" /> {s.year}
                      </span>
                    </div>
                    <h3 className="font-bold text-lg text-foreground leading-tight">{s.bank}</h3>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Matter</p>
                    <p className="text-sm text-foreground leading-relaxed">{s.matter}</p>
                  </div>

                  <div className="flex items-start gap-6 flex-wrap">
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Penalty / Impact</p>
                      <div className="flex items-center gap-1.5">
                        <DollarSign className="h-4 w-4 text-red-500" />
                        <span className="font-semibold text-red-700">{s.penalty}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-muted/50 rounded-xl p-4">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Outcome</p>
                    <p className="text-sm text-foreground leading-relaxed">{s.outcome}</p>
                  </div>

                  <div className="flex justify-end">
                    <a
                      href={s.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      View regulator source
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="mt-10 p-6 bg-muted rounded-2xl text-sm text-muted-foreground leading-relaxed">
          <p className="font-semibold text-foreground mb-2">Important Note</p>
          <p>
            This page summarises publicly available information about regulatory actions against Australian banks. Details may be simplified for clarity. Always refer to the regulator's official website for complete and authoritative information. This is not legal advice.
          </p>
        </div>
      </div>
    </div>
  );
}
