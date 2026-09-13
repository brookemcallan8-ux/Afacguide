import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, complaintsTable } from "@workspace/db";
import { openai } from "@workspace/integrations-openai-ai-server";
import {
  ListComplaintsResponse,
  GetComplaintResponse,
  GetComplaintParams,
  DeleteComplaintParams,
  CreateComplaintBody,
  GenerateComplaintLetterBody,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/complaints", async (_req, res): Promise<void> => {
  const complaints = await db
    .select()
    .from(complaintsTable)
    .orderBy(complaintsTable.createdAt);
  res.json(ListComplaintsResponse.parse(complaints));
});

router.post("/complaints", async (req, res): Promise<void> => {
  const parsed = CreateComplaintBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [complaint] = await db
    .insert(complaintsTable)
    .values({
      issueType: parsed.data.issueType,
      financialInstitution: parsed.data.financialInstitution,
      summary: parsed.data.summary,
      generatedLetter: parsed.data.generatedLetter ?? null,
      status: parsed.data.status ?? "draft",
    })
    .returning();

  res.status(201).json(GetComplaintResponse.parse(complaint));
});

router.get("/complaints/:id", async (req, res): Promise<void> => {
  const params = GetComplaintParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [complaint] = await db
    .select()
    .from(complaintsTable)
    .where(eq(complaintsTable.id, params.data.id));

  if (!complaint) {
    res.status(404).json({ error: "Complaint not found" });
    return;
  }

  res.json(GetComplaintResponse.parse(complaint));
});

router.delete("/complaints/:id", async (req, res): Promise<void> => {
  const params = DeleteComplaintParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [deleted] = await db
    .delete(complaintsTable)
    .where(eq(complaintsTable.id, params.data.id))
    .returning();

  if (!deleted) {
    res.status(404).json({ error: "Complaint not found" });
    return;
  }

  res.sendStatus(204);
});

router.post("/complaints/generate", async (req, res): Promise<void> => {
  const parsed = GenerateComplaintLetterBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const {
    issueType,
    financialInstitution,
    accountNumber,
    incidentDate,
    description,
    desiredOutcome,
    complainantName,
    complainantAddress,
  } = parsed.data;

  const today = new Date().toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const systemPrompt = `You are an expert in Australian consumer rights and financial complaints. 
You help Australians write professional, effective complaint letters to the Australian Financial Complaints Authority (AFCA).
Write formal, clear, polite complaint letters in Australian English.
The letter should be addressed to the financial institution first (as required by AFCA — you must complain to your bank first).
Follow the standard format: date, recipient, subject, body paragraphs, closing.
Be factual, concise, and firm. Do not be aggressive or emotional in tone.
Include all relevant details provided. Reference relevant consumer rights where appropriate.`;

  const userPrompt = `Please write a formal complaint letter for the following situation:

Complainant Name: ${complainantName}
${complainantAddress ? `Complainant Address: ${complainantAddress}` : ""}
Date: ${today}

Financial Institution: ${financialInstitution}
Issue Type: ${issueType}
${accountNumber ? `Account Number: ${accountNumber}` : ""}
${incidentDate ? `Date of Incident: ${incidentDate}` : ""}

Description of the Issue:
${description}

Desired Outcome:
${desiredOutcome}

Please write a complete, professional complaint letter that:
1. Is addressed to the complaints department of ${financialInstitution}
2. Clearly states the issue and all relevant facts
3. References the complainant's rights under Australian law where appropriate
4. States the specific outcome sought
5. Notes that if the issue is not resolved, the complainant will escalate to AFCA
6. Is appropriately formal and firm but not aggressive`;

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const stream = await openai.chat.completions.create({
    model: "gpt-5.1",
    max_completion_tokens: 2048,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    stream: true,
  });

  for await (const chunk of stream) {
    const content = chunk.choices[0]?.delta?.content;
    if (content) {
      res.write(`data: ${JSON.stringify({ content })}\n\n`);
    }
  }

  res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
  res.end();
});

export default router;
