import { Router } from "express";
import { methods as InfoController } from "../controllers/info.controller";
const router = Router();

router.get("/jobs", InfoController.getAllJobs);
router.get("/status", InfoController.getAllStatus);
router.get("/types", InfoController.getAllTypes);
router.get("/roles", InfoController.getAllRoles);

export default router;