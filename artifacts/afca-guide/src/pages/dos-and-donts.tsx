import React from "react";
import { BackButton } from "@/components/back-button";
import { CheckCircle, XCircle, AlertTriangle, Lightbulb, FileText, Phone, Clock } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

interface DoDont {
  category: string;
  dos: string[];
  donts: string[];
}

const SECTIONS: DoDont[] = [
  {
    category: "Before You Complain",
    dos: [
      "Gather all account statements, letters, and emails BEFORE contacting the bank — banks often restrict access after disputes begin.",
      "Request a copy of your credit file (free from Equifax, Experian, illion) to check for any incorrect listings.",
      "Read your original loan or credit contract — understand what fees and rates you agreed to.",
      "Make a written timeline of events in date order. This is the most useful document you will have.",
      "Note the name of every bank employee you speak with and the date and time of each call.",
      "Request all documents in writing — don't rely on verbal promises.",
    ],
    donts: [
      "Don't destroy or delete any documents, emails, text messages, or letters — even if you think they're unhelpful.",
      "Don't assume verbal promises from a bank employee are binding — always get it in writing.",
      "Don't wait. The longer you delay, the harder it becomes to access records and the closer you may get to time limits.",
      "Don't overlook the bank's internal complaint process — you MUST go to the bank first before AFCA.",
    ],
  },
  {
    category: "Communicating with Your Bank",
    dos: [
      "Always put formal complaints in writing — email is fine but registered post provides proof of delivery.",
      "Keep copies of every piece of correspondence — incoming and outgoing.",
      "Be factual and specific — state dates, amounts, and account numbers clearly.",
      "State clearly what outcome you are seeking — banks need to know what would resolve your complaint.",
      "Request written confirmation of any verbal arrangements or promises made by bank staff.",
      "Ask for the bank's internal complaint reference number when you lodge a complaint.",
      "Note the 30-day IDR response deadline in your correspondence — 'I expect a response within 30 days as required by ASIC RG 271.'",
    ],
    donts: [
      "Don't be abusive or threatening — it gives the bank grounds to disengage and won't help your case.",
      "Don't make claims you can't support with evidence — keep your complaint factual.",
      "Don't accept verbal resolutions — always get any settlement offer in writing before agreeing.",
      "Don't give up after the first refusal — escalate through the bank's complaint structure, then to AFCA.",
      "Don't discuss your complaint on social media in ways that could compromise your legal position.",
    ],
  },
  {
    category: "Hardship Requests",
    dos: [
      "Submit hardship requests in writing and keep proof of sending — the 21-day response clock starts on receipt.",
      "Provide supporting evidence with your hardship request — payslips, medical certificate, Centrelink statement.",
      "Be specific about what you are requesting — amount, duration, type of variation.",
      "Submit a statement of your income and expenses — this demonstrates your request is genuine.",
      "Follow up in writing if you receive no response after 21 days.",
      "Request that enforcement action be paused while your hardship request is being assessed.",
    ],
    donts: [
      "Don't wait until you are in default before requesting hardship — apply as soon as you anticipate difficulty.",
      "Don't accept a hardship refusal without asking for written reasons — you are entitled to them.",
      "Don't continue making payments you cannot afford without a formal hardship arrangement — this delays the resolution.",
      "Don't allow a default to be listed while a hardship request is outstanding — write to the bank immediately if they attempt this.",
    ],
  },
  {
    category: "AFCA Complaints",
    dos: [
      "Check that your complaint falls within AFCA's jurisdiction and monetary limits before lodging.",
      "Attach all supporting documents when you lodge — a complete submission speeds up the process.",
      "Include a clear chronology of events in your AFCA submission.",
      "Respond promptly to AFCA's requests for information — delays can disadvantage you.",
      "Request a formal determination if conciliation fails — don't just accept an inadequate offer.",
      "Read AFCA's approach documents relevant to your complaint type — they tell you exactly how AFCA will assess your case.",
      "Request urgent consideration if there is imminent enforcement — AFCA can contact the bank to pause action.",
    ],
    donts: [
      "Don't lodge with AFCA before completing the bank's internal dispute process — AFCA will refer you back.",
      "Don't miss AFCA time limits — generally 2 years from IDR response or 6 years from becoming aware of the problem.",
      "Don't accept an AFCA determination you are not satisfied with without understanding your options — you have a right to reject and go to court.",
      "Don't exaggerate your claim — stick to losses you can document and support with evidence.",
      "Don't contact AFCA and the bank's IDR team simultaneously on the same issue — choose one path at a time.",
    ],
  },
  {
    category: "Dealing with Debt Collectors",
    dos: [
      "Ask the debt collector to verify the debt in writing before making any payments.",
      "Check that the debt is not statute-barred (limitation period expired — generally 6 years from last acknowledgement).",
      "Request that all communication be in writing — debt collectors must comply.",
      "Keep a log of all contact attempts — dates, times, what was said.",
      "Lodge an AFCA complaint if a debt collector is harassing, threatening, or contacting you at unreasonable hours.",
    ],
    donts: [
      "Don't ignore debt collector contact entirely — this can lead to legal proceedings without your knowledge.",
      "Don't pay a debt you genuinely dispute without understanding the legal position.",
      "Don't make a partial payment on a statute-barred debt — it can restart the limitation period.",
      "Don't allow debt collectors to contact your employer or third parties about your debt.",
    ],
  },
  {
    category: "After a Mortgagee Sale",
    dos: [
      "Obtain an independent property valuation as soon as possible after the sale — this is critical evidence.",
      "Request all documentation relating to the sale from the bank — marketing materials, offers received, auction records.",
      "Compare the sale price against comparable sales in the area at the time.",
      "Request a full reconciliation statement showing how the post-sale shortfall was calculated.",
      "Dispute any shortfall that appears to include uncredited payments or excessive capitalised interest.",
      "Lodge an AFCA complaint within applicable time limits — don't assume the shortfall is correct.",
    ],
    donts: [
      "Don't assume the mortgagee sale price was fair — banks have a legal duty to achieve market value.",
      "Don't accept a shortfall demand without requesting a forensic accounting of all charges.",
      "Don't ignore shortfall demands — respond in writing disputing the amount claimed.",
      "Don't make any payments toward a disputed shortfall without getting advice first.",
    ],
  },
];

export default function DosAndDonts() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-5xl px-4 pt-4">
        <BackButton />
      </div>
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-16 px-4">
        <div className="container mx-auto max-w-5xl text-center">
          <div className="h-16 w-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lightbulb className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Do's & Don'ts</h1>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
            Practical guidance for navigating a banking dispute — the most common mistakes and how to avoid them.
          </p>
        </div>
      </div>

      <div className="container mx-auto max-w-4xl px-4 py-12 space-y-12">
        {/* Top tips box */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-blue-900 mb-2">The Three Golden Rules</p>
              <ol className="space-y-1 text-sm text-blue-800">
                <li><strong>1. Put everything in writing.</strong> Every complaint, every request, every agreement — in writing, with proof of sending.</li>
                <li><strong>2. Keep every document.</strong> Statements, letters, emails, SMS — do not delete or discard anything.</li>
                <li><strong>3. Act now.</strong> Time limits apply at every stage. Delay weakens your position.</li>
              </ol>
            </div>
          </div>
        </div>

        {SECTIONS.map((section, i) => (
          <div key={i}>
            <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
              <span className="h-8 w-8 bg-primary text-primary-foreground rounded-lg flex items-center justify-center text-sm font-bold">
                {i + 1}
              </span>
              {section.category}
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              {/* Do */}
              <div className="bg-green-50 border border-green-200 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <h3 className="font-bold text-green-900">DO</h3>
                </div>
                <ul className="space-y-3">
                  {section.dos.map((item, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-sm text-green-900">
                      <span className="h-4 w-4 bg-green-200 rounded-full flex items-center justify-center text-xs font-bold text-green-700 shrink-0 mt-0.5">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Don't */}
              <div className="bg-red-50 border border-red-200 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-4">
                  <XCircle className="h-5 w-5 text-red-600" />
                  <h3 className="font-bold text-red-900">DON'T</h3>
                </div>
                <ul className="space-y-3">
                  {section.donts.map((item, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-sm text-red-900">
                      <span className="h-4 w-4 bg-red-200 rounded-full flex items-center justify-center text-xs font-bold text-red-700 shrink-0 mt-0.5">✗</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}

        {/* Quick Reference */}
        <div className="bg-muted rounded-2xl p-8">
          <h2 className="text-xl font-bold mb-6 text-primary">Quick Reference: Key Deadlines</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: Clock, label: "Bank IDR response deadline", value: "30 days (45 days for credit/super)" },
              { icon: Clock, label: "Hardship decision deadline", value: "21 days from complete application" },
              { icon: Clock, label: "AFCA time limit (from IDR)", value: "2 years after bank's final response" },
              { icon: Clock, label: "AFCA time limit (discovery)", value: "6 years from when you became aware" },
              { icon: Phone, label: "AFCA phone", value: "1800 931 678" },
              { icon: Phone, label: "National Debt Helpline", value: "1800 007 007" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 bg-background border rounded-xl p-4">
                <item.icon className="h-5 w-5 text-primary shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="font-semibold text-sm">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h3 className="text-xl font-bold mb-3">Ready to take action?</h3>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            Use our letter templates, resources, and AI complaint generator to put these principles into practice.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/templates">
              <Button className="bg-primary text-primary-foreground">Browse Templates</Button>
            </Link>
            <Link href="/write-complaint">
              <Button variant="outline">AI Complaint Generator</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
