import { Router, type IRouter } from "express";
import healthRouter from "./health";
import complaintsRouter from "./complaints";
import complaintTypesRouter from "./complaint-types";
import openaiRouter from "./openai/index";
import resourcesRouter from "./resources";
import letterTemplatesRouter from "./letter-templates";
import caseStudiesRouter from "./case-studies";

const router: IRouter = Router();

router.use(healthRouter);
router.use(complaintsRouter);
router.use(complaintTypesRouter);
router.use(openaiRouter);
router.use(resourcesRouter);
router.use(letterTemplatesRouter);
router.use(caseStudiesRouter);

export default router;
