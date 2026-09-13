import React from "react";
import { BackButton } from "@/components/back-button";
import { Scale, AlertTriangle, FileText, Globe, Mail } from "lucide-react";

const LAST_UPDATED = "17 June 2026";

export default function TermsOfUse() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-3xl px-4 pt-4">
        <BackButton />
      </div>

      <div className="bg-primary text-primary-foreground py-14 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-center gap-3 mb-3">
            <FileText className="h-8 w-8 text-accent" />
            <h1 className="text-4xl md:text-5xl font-bold">Terms of Use</h1>
          </div>
          <p className="text-primary-foreground/80 text-lg">Last updated: {LAST_UPDATED}</p>
        </div>
      </div>

      <div className="container mx-auto max-w-3xl px-4 py-12 prose prose-slate max-w-none">

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-10 flex gap-3">
          <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-amber-900 mb-1">Important Notice</p>
            <p className="text-sm text-amber-800 leading-relaxed">
              This website (<strong>AFCA Guide for Citizens</strong>) is an independent, community-produced educational resource. It is <strong>not</strong> affiliated with, endorsed by, or connected to the Australian Financial Complaints Authority (AFCA), ASIC, APRA, or any government body. Nothing on this site constitutes legal advice.
            </p>
          </div>
        </div>

        <Section title="1. Acceptance of Terms">
          <p>By accessing or using the AFCA Guide for Citizens website ("the Site"), you agree to be bound by these Terms of Use. If you do not agree, please do not use the Site.</p>
          <p>These Terms apply to all visitors, users, and others who access or use the Site.</p>
        </Section>

        <Section title="2. Nature of This Website">
          <p>The AFCA Guide for Citizens is an <strong>independent educational resource</strong> created to help Australians understand the Australian Financial Complaints Authority process. The Site:</p>
          <ul>
            <li>Is <strong>not affiliated with</strong> the Australian Financial Complaints Authority</li>
            <li>Is <strong>not a government service</strong> or government-endorsed</li>
            <li>Does <strong>not provide legal advice</strong></li>
            <li>Does <strong>not represent</strong> any bank, financial institution, or regulated entity</li>
            <li>Is provided as a <strong>free informational resource</strong> only</li>
          </ul>
          <p>For official AFCA information, visit <a href="https://www.afca.org.au" target="_blank" rel="noopener noreferrer" className="text-primary underline">www.afca.org.au</a>.</p>
        </Section>

        <Section title="3. No Legal Advice">
          <p>The information on this Site — including all articles, letter templates, case studies, guides, FAQs, forum content, and AI-generated outputs — is provided for <strong>general informational and educational purposes only</strong>. It does not constitute legal, financial, or professional advice of any kind.</p>
          <p>You should <strong>not rely</strong> on information from this Site as a substitute for obtaining advice from a qualified lawyer, financial counsellor, or other professional. If your matter is complex, time-sensitive, or involves significant sums, please seek professional advice before acting.</p>
          <p>Free legal help is available in Australia from:</p>
          <ul>
            <li><strong>Financial Rights Legal Centre:</strong> 1800 007 007</li>
            <li><strong>Consumer Action Law Centre:</strong> 1800 466 477</li>
            <li><strong>National Legal Aid:</strong> nationallegalaid.org</li>
          </ul>
        </Section>

        <Section title="4. Accuracy of Information">
          <p>We endeavour to keep information on this Site accurate and up to date. However, AFCA's rules, processes, monetary limits, and applicable legislation change over time. We make <strong>no warranty</strong> as to the accuracy, completeness, currency, or reliability of any information on this Site.</p>
          <p>You should always verify information against official sources, including <a href="https://www.afca.org.au" target="_blank" rel="noopener noreferrer" className="text-primary underline">AFCA's website</a> and the relevant legislation accessible at <a href="https://www.legislation.gov.au" target="_blank" rel="noopener noreferrer" className="text-primary underline">legislation.gov.au</a>.</p>
        </Section>

        <Section title="5. Letter Templates and AI-Generated Content">
          <p>Letter templates and AI-generated complaint letters on this Site are provided as <strong>starting points only</strong>. They may not be appropriate for your specific situation. Before sending any letter to a bank, AFCA, or court, you should:</p>
          <ul>
            <li>Review the letter carefully for accuracy</li>
            <li>Ensure all facts stated are correct</li>
            <li>Seek legal advice if the matter involves significant amounts or legal complexity</li>
            <li>Not make false or misleading statements</li>
          </ul>
          <p>We accept no responsibility for the outcome of any communication sent using templates or AI-generated content from this Site.</p>
        </Section>

        <Section title="6. External Links">
          <p>This Site contains links to external websites operated by third parties, including AFCA, government agencies, legal aid services, and consumer organisations. These links are provided for your convenience and reference only.</p>
          <p>We do not control, endorse, or accept responsibility for the content of external sites. The inclusion of a link does not imply endorsement or affiliation.</p>
        </Section>

        <Section title="7. Intellectual Property">
          <p>The original content on this Site (including text, organisation, design, and code) is the intellectual property of the Site's operators. You may use information on this Site for personal, non-commercial purposes.</p>
          <p>You may not reproduce, redistribute, republish, or commercially exploit the Site's content without prior written permission.</p>
        </Section>

        <Section title="8. Limitation of Liability">
          <p>To the fullest extent permitted by Australian law, the operators of this Site disclaim all liability for:</p>
          <ul>
            <li>Any loss or damage (direct, indirect, or consequential) arising from your use of or reliance on information on this Site</li>
            <li>Any errors or omissions in the content</li>
            <li>Any outcome of a complaint, legal proceeding, or dispute in which information from this Site was used</li>
            <li>Any interruption or unavailability of the Site</li>
          </ul>
          <p>Nothing in these Terms limits any right you may have under the Australian Consumer Law or other non-excludable laws.</p>
        </Section>

        <Section title="9. User Conduct">
          <p>When using the Site's interactive features (including the AI assistant and forum), you agree not to:</p>
          <ul>
            <li>Submit false, defamatory, or misleading information</li>
            <li>Harass, threaten, or abuse any person or entity</li>
            <li>Use the Site for any unlawful purpose</li>
            <li>Attempt to interfere with or disrupt the Site's operation</li>
            <li>Submit content that violates any third party's intellectual property or privacy rights</li>
          </ul>
        </Section>

        <Section title="10. Privacy">
          <p>We are committed to protecting your privacy. Please refer to our <a href="/privacy-policy" className="text-primary underline">Privacy Policy</a> for details on how we collect, use, and protect your personal information.</p>
        </Section>

        <Section title="11. Governing Law">
          <p>These Terms are governed by the laws of New South Wales, Australia. Any dispute arising in connection with these Terms shall be subject to the jurisdiction of the courts of New South Wales.</p>
        </Section>

        <Section title="12. Changes to These Terms">
          <p>We may update these Terms of Use from time to time. The date of the most recent update is shown at the top of this page. Your continued use of the Site after any changes constitutes your acceptance of the updated Terms.</p>
        </Section>

        <Section title="13. Contact">
          <p>If you have questions about these Terms, please use the contact information available on the Site. For official AFCA complaints or enquiries, contact AFCA directly at <a href="https://www.afca.org.au/contact-us" target="_blank" rel="noopener noreferrer" className="text-primary underline">afca.org.au/contact-us</a> or on <strong>1800 931 678</strong>.</p>
        </Section>

      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold text-primary mb-3 border-b pb-2">{title}</h2>
      <div className="space-y-3 text-sm text-foreground/80 leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_a]:text-primary [&_a]:underline">
        {children}
      </div>
    </div>
  );
}
