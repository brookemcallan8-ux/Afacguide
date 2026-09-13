import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, letterTemplatesTable } from "@workspace/db";

const router: IRouter = Router();

router.get("/letter-templates", async (req, res): Promise<void> => {
  const { category, search } = req.query as {
    category?: string;
    search?: string;
  };

  let all = await db
    .select()
    .from(letterTemplatesTable)
    .orderBy(letterTemplatesTable.isFeatured, letterTemplatesTable.title);

  if (category) {
    all = all.filter((t) => t.category === category);
  }

  if (search) {
    const q = search.toLowerCase();
    all = all.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.situation.toLowerCase().includes(q),
    );
  }

  res.json(all);
});

router.get("/letter-templates/:id", async (req, res): Promise<void> => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid ID" });
    return;
  }

  const [template] = await db
    .select()
    .from(letterTemplatesTable)
    .where(eq(letterTemplatesTable.id, id));

  if (!template) {
    res.status(404).json({ error: "Template not found" });
    return;
  }

  res.json(template);
});

export default router;
