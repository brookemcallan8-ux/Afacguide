import { Router, type IRouter } from "express";
import { eq, ilike, or } from "drizzle-orm";
import { db, resourcesTable } from "@workspace/db";

const router: IRouter = Router();

router.get("/resources", async (req, res): Promise<void> => {
  const { category, search } = req.query as {
    category?: string;
    search?: string;
  };

  let query = db.select().from(resourcesTable).$dynamic();

  if (category && search) {
    query = query.where(
      eq(resourcesTable.category, category),
    );
  } else if (category) {
    query = query.where(eq(resourcesTable.category, category));
  }

  const all = await query.orderBy(resourcesTable.isFeatured, resourcesTable.title);

  const filtered = search
    ? all.filter(
        (r) =>
          r.title.toLowerCase().includes(search.toLowerCase()) ||
          r.description.toLowerCase().includes(search.toLowerCase()),
      )
    : all;

  res.json(filtered);
});

router.get("/resources/:id", async (req, res): Promise<void> => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid ID" });
    return;
  }

  const [resource] = await db
    .select()
    .from(resourcesTable)
    .where(eq(resourcesTable.id, id));

  if (!resource) {
    res.status(404).json({ error: "Resource not found" });
    return;
  }

  res.json(resource);
});

export default router;
