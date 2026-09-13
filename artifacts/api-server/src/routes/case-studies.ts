import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, caseStudiesTable } from "@workspace/db";

const router: IRouter = Router();

router.get("/case-studies", async (_req, res): Promise<void> => {
  const studies = await db
    .select()
    .from(caseStudiesTable)
    .orderBy(caseStudiesTable.isFeatured, caseStudiesTable.year);

  res.json(studies);
});

router.get("/case-studies/:id", async (req, res): Promise<void> => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid ID" });
    return;
  }

  const [study] = await db
    .select()
    .from(caseStudiesTable)
    .where(eq(caseStudiesTable.id, id));

  if (!study) {
    res.status(404).json({ error: "Case study not found" });
    return;
  }

  res.json(study);
});

export default router;
