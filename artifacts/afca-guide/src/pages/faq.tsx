import React from "react";
import { BackButton } from "@/components/back-button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

export default function Faq() {
  const faqs = [
    {
      q: "Does it cost money to use AFCA?",
      a: "No. AFCA is a completely free service for consumers and small businesses. The financial firms pay for the service.",
    },
    {
      q: "Can I go straight to AFCA without contacting my bank?",
      a: "No. You must first give the financial firm the opportunity to resolve the complaint through their Internal Dispute Resolution (IDR) process. You can only lodge with AFCA if they don't respond within their required timeframe (usually 30 days) or if you are dissatisfied with their response.",
    },
    {
      q: "Are AFCA's decisions legally binding?",
      a: "If AFCA makes a determination and you accept it, the decision becomes legally binding on the financial firm. If you reject the decision, it is not binding on either party, and you retain your right to pursue the matter in court.",
    },
    {
      q: "What types of complaints does AFCA NOT cover?",
      a: "AFCA generally cannot consider complaints about the level of a fee or charge (unless it was incorrectly applied), the firm's commercial judgment (like a decision not to lend to you), or complaints that have already been dealt with by a court or tribunal.",
    },
    {
      q: "Is there a time limit for complaining to AFCA?",
      a: "Yes. Generally, you must complain to AFCA within 2 years of getting a final response from the firm's internal dispute resolution process, or within 6 years of when you first became aware (or should reasonably have become aware) of the problem.",
    },
    {
      q: "Do I need a lawyer to use AFCA?",
      a: "No. AFCA is designed to be accessible without legal representation. However, you can choose to have a lawyer, financial counsellor, or other representative act on your behalf if you wish.",
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <BackButton />
      <div className="text-center mb-12">
        <div className="h-16 w-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <HelpCircle className="h-8 w-8 text-accent" />
        </div>
        <h1 className="text-4xl font-bold mb-4 font-serif text-primary">Frequently Asked Questions</h1>
        <p className="text-lg text-muted-foreground">
          Clear answers to the most common questions about the AFCA process.
        </p>
      </div>

      <Accordion type="single" collapsible className="w-full space-y-4">
        {faqs.map((faq, i) => (
          <AccordionItem key={i} value={`item-${i}`} className="bg-card border rounded-lg px-6">
            <AccordionTrigger className="text-left font-semibold text-lg py-4 hover:no-underline hover:text-accent">
              {faq.q}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed text-base pb-6">
              {faq.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
