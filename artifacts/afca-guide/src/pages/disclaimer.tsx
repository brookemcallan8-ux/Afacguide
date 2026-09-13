import React from "react";
import { BackButton } from "@/components/back-button";
import { AlertTriangle, ExternalLink } from "lucide-react";

export default function Disclaimer() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-3xl px-4 pt-4">
        <BackButton />
      </div>

      <div className="bg-primary text-primary-foreground py-14 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-center gap-3 mb-3">
            <AlertTriangle className="h-8 w-8 text-accent" />
            <h1 className="text-4xl md:text-5xl font-bold">Disclaimer</h1>
          </div>
          <p className="text-primary-foreground/80 text-lg">Read before relying on any information from this site.</p>
        </div>
      </div>

      <div className="container mx-auto max-w-3xl px-4 py-12 space-y-8">

        <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
          <p className="font-bold text-red-900 text-lg mb-2">⚠ This is NOT the AFCA website</p>
          <p className="text-red-800 text-sm leading-relaxed">
            AFCA Guide for Citizens is an <strong>independent, community-produced educational resource</strong>. It has <strong>no connection</strong> to the Australian Financial Complaints Authority, ASIC, APRA, or any government body. The official AFCA website is <a href="https://www.afca.org.au" target="_blank" rel="noopener noreferrer" className="underline font-semibold">www.afca.org.au</a>.
          </p>
        </div>

        {[
          {
            title: "Not Legal Advice",
            body: "Nothing on this website is legal advice. All information — including articles, guides, letter templates, case studies, FAQs, forum posts, and AI-generated outputs — is provided for general informational and educational purposes only. Your situation is unique. Before making decisions about your complaint, legal rights, or financial position, you should speak to a qualified lawyer or financial counsellor. Free services are available Australia-wide.",
          },
          {
            title: "No Warranty of Accuracy",
            body: "We take reasonable care to ensure information is accurate and current, but AFCA's rules, processes, monetary limits, and applicable laws change over time. We make no warranty as to the accuracy, completeness, or currency of any information on this Site. Always verify information against official sources.",
          },
          {
            title: "AI-Generated Content",
            body: "This website uses AI (artificial intelligence) to generate complaint letter drafts and chat responses. AI outputs can contain errors, hallucinations, or outdated information. All AI-generated content must be reviewed and verified by you before use. Do not submit AI-generated letters without reading them carefully and confirming every factual statement is true.",
          },
          {
            title: "Letter Templates",
            body: "Letter templates on this Site are starting points only. They are designed for general situations and may not reflect the specific facts of your case. Sending an inaccurate or misleading letter to a bank or AFCA can damage your credibility. Always customise templates to reflect your true situation and seek professional review for complex matters.",
          },
          {
            title: "External Links",
            body: "This Site contains links to external websites. We do not control those sites and are not responsible for their content, availability, or accuracy. The inclusion of a link is not an endorsement.",
          },
          {
            title: "No Guarantee of Outcome",
            body: "Using this Site does not guarantee a successful complaint outcome. Financial dispute resolution depends on the specific facts, evidence, applicable law, and AFCA's assessment. We make no representation about the likely outcome of any complaint.",
          },
          {
            title: "Free Legal Help in Australia",
            body: null,
            list: [
              { label: "Financial Rights Legal Centre", value: "1800 007 007 | financialrights.org.au" },
              { label: "Consumer Action Law Centre", value: "1800 466 477 | consumeraction.org.au" },
              { label: "National Debt Helpline", value: "1800 007 007 | ndh.org.au" },
              { label: "National Legal Aid", value: "nationallegalaid.org" },
              { label: "MoneySmart", value: "moneysmart.gov.au" },
            ],
          },
        ].map((item, i) => (
          <div key={i} className="bg-card border rounded-xl p-6">
            <h2 className="font-bold text-lg text-primary mb-3">{item.title}</h2>
            {item.body && <p className="text-sm text-muted-foreground leading-relaxed">{item.body}</p>}
            {item.list && (
              <ul className="space-y-2 mt-2">
                {item.list.map((l) => (
                  <li key={l.label} className="text-sm flex gap-2">
                    <span className="font-semibold text-foreground shrink-0">{l.label}:</span>
                    <span className="text-muted-foreground">{l.value}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}

        <div className="text-center pt-4">
          <a href="https://www.afca.org.au" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-semibold hover:bg-primary/90 transition-colors">
            Go to the Official AFCA Website <ExternalLink className="h-4 w-4" />
          </a>
        </div>

      </div>
    </div>
  );
}
