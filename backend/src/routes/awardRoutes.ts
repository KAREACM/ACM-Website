import { Router } from "express";
import { getAwards, createAward } from "../controllers/awardController";

const router = Router();

router.get("/", getAwards);
router.post("/", createAward);

export default router;
