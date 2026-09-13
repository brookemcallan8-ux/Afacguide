import React from "react";
import { BackButton } from "@/components/back-button";
import { Link } from "wouter";
import { ShieldCheck, MessageCircle, Clock, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Guide() {
  const steps = [
    {
      title: "Step 1: Contact your bank first",
      description: "AFCA cannot review a complaint unless you have already complained to your financial institution and given them a chance to resolve it.",
      details: [
        "Find the bank's internal dispute resolution (IDR) contact details.",
        "Submit a formal complaint (you can use our letter generator).",
        "Keep a record of all correspondence."
      ],
      icon: MessageCircle,
      timeline: "Wait up to 30 days for a response"
    },
    {
      title: "Step 2: Lodge with AFCA",
      description: "If the bank doesn't respond in time or you're not satisfied with their answer, you can lodge a complaint with AFCA online.",
      details: [
        "Gather your IDR response and evidence.",
        "Go to the AFCA website and fill out their online form.",
        "AFCA will notify the bank that a complaint has been lodged."
      ],
      icon: ShieldCheck,
      timeline: "Must be within 2 years of the bank's response"
    },
    {
      title: "Step 3: Registration and Referral",
      description: "AFCA will give the bank one final chance (usually 21 days) to resolve the matter directly with you before AFCA begins an investigation.",
      details: [
        "The bank may contact you with an offer.",
        "If an agreement is reached, the process ends.",
        "If not, it moves to the Case Management stage."
      ],
      icon: Clock,
      timeline: "Up to 21 days"
    },
    {
      title: "Step 4: Case Management & Decision",
      description: "An AFCA case worker will investigate. They may ask for more information or attempt conciliation. If unresolved, an ombudsman makes a formal determination.",
      details: [
        "You must respond to requests for information promptly.",
        "A determination is legally binding on the bank if you accept it.",
        "If you reject it, you retain your right to go to court."
      ],
      icon: Info,
      timeline: "Can take several months depending on complexity"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <BackButton />
      <div className="mb-12 text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 font-serif text-primary">The AFCA Process</h1>
        <p className="text-lg text-muted-foreground">
          Understanding the steps gives you confidence. Here is how the process works from start to finish.
        </p>
      </div>

      <div className="relative border-l-2 border-primary/20 ml-4 md:ml-8 pl-8 space-y-12 pb-12">
        {steps.map((step, i) => (
          <div key={i} className="relative">
            <div className="absolute -left-[43px] top-1 h-10 w-10 rounded-full bg-background border-2 border-primary flex items-center justify-center">
              <span className="font-bold text-primary">{i + 1}</span>
            </div>
            
            <div className="bg-card border rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <step.icon className="h-6 w-6 text-accent" />
                <h2 className="text-2xl font-semibold text-primary">{step.title}</h2>
              </div>
              
              <p className="text-lg text-foreground/90 mb-4 font-medium">
                {step.description}
              </p>
              
              <ul className="list-disc pl-5 mb-6 text-muted-foreground space-y-2">
                {step.details.map((detail, j) => (
                  <li key={j}>{detail}</li>
                ))}
              </ul>
              
              <div className="bg-muted px-4 py-3 rounded-lg flex items-start gap-3">
                <Clock className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block text-sm">Timeline expectation:</span>
                  <span className="text-sm text-muted-foreground">{step.timeline}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-accent/10 border border-accent/20 rounded-2xl p-8 text-center mt-8">
        <h3 className="text-2xl font-semibold mb-4 text-primary">First Step: Contact Your Bank</h3>
        <p className="mb-6 max-w-xl mx-auto text-muted-foreground">
          You must complain to your financial institution first. Need help writing the letter? Use our AI assistant to draft a professional complaint.
        </p>
        <Link href="/write-complaint">
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
            Draft your initial complaint
          </Button>
        </Link>
      </div>
    </div>
  );
}
