import React from "react";
import { BackButton } from "@/components/back-button";
import { Scale, Shield, Users, Phone, Globe, FileText, CheckCircle, Building2, Star, AlertCircle } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function AboutAfca() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-5xl px-4 pt-4">
        <BackButton />
      </div>
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-16 px-4">
        <div className="container mx-auto max-w-5xl text-center">
          <div className="h-16 w-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Scale className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About AFCA</h1>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
            The Australian Financial Complaints Authority — who they are, how they work, and what they can do for you.
          </p>
        </div>
      </div>

      <div className="container mx-auto max-w-4xl px-4 py-12 space-y-16">
        {/* What is AFCA */}
        <section>
          <h2 className="text-3xl font-bold mb-6 text-primary">What is AFCA?</h2>
          <div className="prose prose-lg max-w-none text-foreground">
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              The Australian Financial Complaints Authority (AFCA) is an independent, not-for-profit organisation that provides free dispute resolution for consumers and small businesses with unresolved complaints against financial firms — including banks, insurers, superannuation funds, financial advisers, and debt collectors.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              AFCA was established on 1 November 2018, replacing three former schemes: the Financial Ombudsman Service (FOS), the Credit and Investments Ombudsman (CIO), and the Superannuation Complaints Tribunal (SCT).
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              AFCA is authorised by the Australian Government under the Corporations Act 2001, ASIC Act 2001, and the Superannuation (Resolution of Complaints) Act 1993. All Australian Financial Services Licensees (AFSLs) and Australian Credit Licensees (ACLs) are required to be AFCA members.
            </p>
          </div>
        </section>

        {/* Key Facts */}
        <section>
          <h2 className="text-3xl font-bold mb-6 text-primary">Key Facts</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: Shield, title: "Free for Consumers", desc: "AFCA charges no fee to consumers or small businesses. Financial firms pay for the service." },
              { icon: Scale, title: "Independent", desc: "AFCA is not part of the government, not run by banks, and not an advocate for either side." },
              { icon: CheckCircle, title: "Binding Decisions", desc: "AFCA determinations accepted by the consumer are legally binding on the financial firm." },
              { icon: Globe, title: "National Reach", desc: "Available to any Australian consumer regardless of state or territory." },
              { icon: Users, title: "Interpreter Services", desc: "Free interpreting services available for complainants who need assistance in another language." },
              { icon: Phone, title: "Contact: 1800 931 678", desc: "AFCA's free national phone line operates Monday–Friday, 9am–5pm AEDT." },
            ].map((item, i) => (
              <div key={i} className="bg-card border rounded-xl p-5 flex gap-4">
                <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* What AFCA can help with */}
        <section>
          <h2 className="text-3xl font-bold mb-6 text-primary">What AFCA Can Help With</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              "Banking — mortgages, loans, credit cards, accounts, fees",
              "Financial Hardship — disputes about hardship handling",
              "Credit Reporting — incorrect default listings",
              "Debt Collection — unfair or harassing conduct",
              "Insurance — home, car, life, travel, health",
              "Superannuation — fund conduct, death benefits, insurance",
              "Financial Advice — unsuitable advice, losses",
              "Investments — managed funds, securities",
              "Mortgage Broking — unsuitable recommendations",
              "Small Business — disputes under monetary limits",
              "Scams & Fraud — bank liability for losses",
              "Buy Now Pay Later — provider misconduct",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 bg-card border rounded-lg px-4 py-3">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Monetary Limits */}
        <section>
          <h2 className="text-3xl font-bold mb-6 text-primary">Monetary & Time Limits</h2>
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 shrink-0" />
              <p className="text-sm text-amber-800">
                These limits apply to AFCA's jurisdiction and are subject to change. Always check AFCA's current rules at <strong>afca.org.au</strong> for the most up-to-date figures.
              </p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-muted">
                  <th className="text-left px-4 py-3 text-sm font-semibold border-b">Complaint Type</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold border-b">Maximum Compensation</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold border-b">Claim Limit</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {[
                  ["Banking & Credit", "$500,000", "$1,000,000 (claim)"],
                  ["Small Business Credit", "$1,000,000 (compensation)", "$5,000,000 (claim)"],
                  ["Insurance", "$500,000", "No limit on claim"],
                  ["Superannuation", "No limit", "No limit"],
                  ["Financial Advice", "$500,000", "No limit on claim"],
                  ["Non-Financial Loss", "$5,500", "—"],
                ].map(([type, comp, claim], i) => (
                  <tr key={i} className="hover:bg-muted/40 transition-colors">
                    <td className="px-4 py-3 text-sm font-medium">{type}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{comp}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{claim}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* The Process */}
        <section>
          <h2 className="text-3xl font-bold mb-6 text-primary">How AFCA Resolves Disputes</h2>
          <div className="space-y-4">
            {[
              {
                step: "1",
                title: "Complaint to Your Bank First",
                desc: "You must give the bank an opportunity to resolve through their Internal Dispute Resolution (IDR) process. Banks must respond within 30 days (45 for super/credit).",
              },
              {
                step: "2",
                title: "Lodge with AFCA",
                desc: "If you're unsatisfied or the bank doesn't respond in time, lodge your complaint at afca.org.au or call 1800 931 678.",
              },
              {
                step: "3",
                title: "Registration & Assessment",
                desc: "AFCA registers your complaint and assesses whether it's within jurisdiction. Both parties are contacted.",
              },
              {
                step: "4",
                title: "Negotiation / Conciliation",
                desc: "AFCA facilitates negotiation. Many complaints are resolved at this stage without a formal determination.",
              },
              {
                step: "5",
                title: "Case Review",
                desc: "If unresolved, an AFCA case worker reviews all evidence and may issue a preliminary assessment.",
              },
              {
                step: "6",
                title: "Determination",
                desc: "If still unresolved, AFCA issues a binding determination. You choose whether to accept — if you do, the bank must comply.",
              },
            ].map((s) => (
              <div key={s.step} className="flex gap-4 bg-card border rounded-xl p-5">
                <div className="h-10 w-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg shrink-0">
                  {s.step}
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{s.title}</h3>
                  <p className="text-sm text-muted-foreground">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Governance */}
        <section>
          <h2 className="text-3xl font-bold mb-6 text-primary">Governance & Independence</h2>
          <div className="bg-card border rounded-2xl p-6 space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              AFCA is governed by an independent Board comprising consumer and industry representatives, as well as independent directors. The Board is accountable to both the financial sector and consumer community.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              AFCA's Chief Ombudsman and CEO is appointed by the Board. AFCA publishes annual reports, approach documents, and statistical data to maintain transparency about its operations and outcomes.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              An Independent Assessor handles complaints about AFCA's own processes — this is separate from complaint outcomes and is a further accountability mechanism.
            </p>
            <div className="grid sm:grid-cols-3 gap-4 pt-4">
              {[
                { label: "Complaints in 2022–23", value: "96,987" },
                { label: "Member Firms", value: "6,000+" },
                { label: "Compensation Ordered", value: "$253M+" },
              ].map((stat) => (
                <div key={stat.label} className="text-center bg-muted rounded-xl p-4">
                  <div className="text-2xl font-bold text-primary mb-1">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-primary text-primary-foreground rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-3">Ready to Make a Complaint?</h3>
          <p className="text-primary-foreground/80 mb-6 max-w-xl mx-auto">
            Start with your bank first, then escalate to AFCA. Use our guide, templates, and AI generator to build the strongest possible complaint.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/guide">
              <Button className="bg-white text-primary hover:bg-white/90">Step-by-Step Guide</Button>
            </Link>
            <Link href="/templates">
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">Letter Templates</Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
