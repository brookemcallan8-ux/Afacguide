import React from "react";
import { BackButton } from "@/components/back-button";
import { Shield, AlertTriangle } from "lucide-react";

const LAST_UPDATED = "17 June 2026";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-3xl px-4 pt-4">
        <BackButton />
      </div>

      <div className="bg-primary text-primary-foreground py-14 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-center gap-3 mb-3">
            <Shield className="h-8 w-8 text-accent" />
            <h1 className="text-4xl md:text-5xl font-bold">Privacy Policy</h1>
          </div>
          <p className="text-primary-foreground/80 text-lg">Last updated: {LAST_UPDATED}</p>
        </div>
      </div>

      <div className="container mx-auto max-w-3xl px-4 py-12">

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-10 flex gap-3">
          <Shield className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-blue-900 mb-1">Our Commitment</p>
            <p className="text-sm text-blue-800 leading-relaxed">
              AFCA Guide for Citizens is committed to protecting your privacy. This policy explains what personal information we collect, how we use it, and how you can exercise your rights. We comply with the <strong>Privacy Act 1988 (Cth)</strong> and the Australian Privacy Principles (APPs).
            </p>
          </div>
        </div>

        <Section title="1. About This Policy">
          <p>This Privacy Policy applies to the AFCA Guide for Citizens website ("the Site"). It does not apply to the Australian Financial Complaints Authority (AFCA) itself — for AFCA's privacy policy, visit <a href="https://www.afca.org.au/privacy" target="_blank" rel="noopener noreferrer">afca.org.au/privacy</a>.</p>
          <p>By using the Site, you consent to the collection and use of your information as described in this Policy.</p>
        </Section>

        <Section title="2. What Information We Collect">
          <p><strong>Information you provide directly:</strong></p>
          <ul>
            <li><strong>Complaint drafts:</strong> Information you enter when using the Write Complaint feature (your name, institution name, account details, description of your dispute, desired outcome). This is stored to allow you to retrieve your draft.</li>
            <li><strong>AI assistant interactions:</strong> Queries you submit to the AI chat assistant. These are processed to generate responses and are not permanently stored beyond your session.</li>
          </ul>
          <p><strong>Information collected automatically:</strong></p>
          <ul>
            <li><strong>Usage data:</strong> Pages visited, time spent, browser type, and general location data (country/state level, not precise location). Collected anonymously for improving the Site.</li>
            <li><strong>Cookies and local storage:</strong> We use minimal session-based storage to maintain your complaint drafts between visits. We do not use advertising cookies or cross-site tracking.</li>
          </ul>
          <p><strong>Information we do NOT collect:</strong></p>
          <ul>
            <li>We do not collect or store your full bank account numbers</li>
            <li>We do not collect government identifiers (Tax File Numbers, Medicare numbers)</li>
            <li>We do not collect payment information</li>
            <li>We do not require registration or account creation</li>
          </ul>
        </Section>

        <Section title="3. How We Use Your Information">
          <p>We use the information we collect to:</p>
          <ul>
            <li>Provide and improve the Site's features, including saving and retrieving your complaint drafts</li>
            <li>Generate AI-assisted complaint letter drafts based on your inputs</li>
            <li>Analyse usage patterns to improve the Site's content and usability</li>
            <li>Ensure the security and integrity of the Site</li>
          </ul>
          <p>We do <strong>not</strong> use your information to:</p>
          <ul>
            <li>Send unsolicited marketing communications</li>
            <li>Sell or share your personal information with third parties for commercial purposes</li>
            <li>Profile you for advertising purposes</li>
            <li>Contact financial institutions on your behalf (you must do this yourself)</li>
          </ul>
        </Section>

        <Section title="4. Complaint Draft Data — Important Notice">
          <p>When you use the Write Complaint feature, the text of your complaint draft — including details about your financial dispute, your name, and your institution — is stored in our database. Please be aware:</p>
          <ul>
            <li>This data is used only to allow you to retrieve your draft later</li>
            <li>You can delete your drafts at any time from the "My Drafts" page</li>
            <li>Do not include highly sensitive information beyond what is necessary for your complaint (e.g., avoid full account numbers where a partial reference suffices)</li>
            <li>AI-generated complaint text is produced using a third-party AI provider (OpenAI). Inputs you submit are sent to OpenAI's API for processing under OpenAI's privacy terms</li>
          </ul>
        </Section>

        <Section title="5. AI Chat Assistant">
          <p>The AI chat assistant on this Site uses OpenAI's API to generate responses. When you submit a query:</p>
          <ul>
            <li>Your query text is sent to OpenAI's servers for processing</li>
            <li>OpenAI processes your query under its own privacy policy and terms</li>
            <li>We do not permanently log individual chat queries beyond what is necessary for the AI response</li>
            <li>Do not enter sensitive personal identifiers (TFN, passport numbers, full account numbers) into the chat assistant</li>
          </ul>
          <p>We recommend reviewing <a href="https://openai.com/privacy" target="_blank" rel="noopener noreferrer">OpenAI's Privacy Policy</a> for information on how they handle data submitted through their API.</p>
        </Section>

        <Section title="6. Disclosure to Third Parties">
          <p>We do not sell your personal information. We may disclose information to third parties only in the following circumstances:</p>
          <ul>
            <li><strong>Service providers:</strong> Third-party technology providers (such as hosting and AI services) who assist in operating the Site, under confidentiality obligations</li>
            <li><strong>Legal requirements:</strong> If required by law, court order, or to protect the rights, property, or safety of the Site, its operators, or the public</li>
            <li><strong>With your consent:</strong> In any other circumstance, only with your explicit consent</li>
          </ul>
        </Section>

        <Section title="7. Data Security">
          <p>We implement reasonable technical and organisational measures to protect your information against unauthorised access, loss, or misuse. These include:</p>
          <ul>
            <li>Encrypted HTTPS connections for all Site traffic</li>
            <li>Secure database storage for complaint drafts</li>
            <li>No storage of payment or government identifier data</li>
          </ul>
          <p>No internet transmission is completely secure. We cannot guarantee the absolute security of your information.</p>
        </Section>

        <Section title="8. Your Rights Under Australian Privacy Law">
          <p>Under the Privacy Act 1988 (Cth) and the Australian Privacy Principles, you have the right to:</p>
          <ul>
            <li><strong>Access</strong> personal information we hold about you</li>
            <li><strong>Correct</strong> inaccurate or outdated information</li>
            <li><strong>Delete</strong> your complaint drafts (available directly from the "My Drafts" page)</li>
            <li><strong>Complain</strong> about a privacy breach (see Section 10)</li>
          </ul>
        </Section>

        <Section title="9. Retention of Data">
          <p>Complaint drafts are retained until you delete them from the "My Drafts" page. If you do not delete them, they are retained for up to 12 months from the date of creation, after which they may be automatically purged.</p>
          <p>Anonymised usage analytics may be retained indefinitely for Site improvement purposes.</p>
        </Section>

        <Section title="10. Privacy Complaints">
          <p>If you believe we have breached your privacy, you may:</p>
          <ol className="list-decimal pl-5 space-y-1">
            <li>Contact us directly via the Site to raise your concern</li>
            <li>If not resolved, lodge a complaint with the <a href="https://www.oaic.gov.au/privacy/privacy-complaints" target="_blank" rel="noopener noreferrer">Office of the Australian Information Commissioner (OAIC)</a> at oaic.gov.au or on 1300 363 992</li>
          </ol>
        </Section>

        <Section title="11. Children's Privacy">
          <p>This Site is not directed at children under 18. We do not knowingly collect personal information from minors. If you are under 18, please seek parental or guardian assistance before using this Site.</p>
        </Section>

        <Section title="12. Changes to This Policy">
          <p>We may update this Privacy Policy from time to time. The date of the most recent update appears at the top of this page. We encourage you to review this Policy periodically.</p>
        </Section>

        <Section title="13. Relevant Legislation">
          <ul>
            <li><a href="https://www.legislation.gov.au/Details/C2014C00076" target="_blank" rel="noopener noreferrer">Privacy Act 1988 (Cth)</a></li>
            <li>Australian Privacy Principles (Schedule 1 to the Privacy Act)</li>
            <li><a href="https://www.oaic.gov.au" target="_blank" rel="noopener noreferrer">Office of the Australian Information Commissioner</a></li>
          </ul>
        </Section>

      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold text-primary mb-3 border-b pb-2">{title}</h2>
      <div className="space-y-3 text-sm text-foreground/80 leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_ol]:pl-5 [&_ol]:space-y-1 [&_a]:text-primary [&_a]:underline">
        {children}
      </div>
    </div>
  );
}
