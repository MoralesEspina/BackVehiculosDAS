import { Router } from "express";
import { methods as AuthController } from "../controllers/auth.controller";
const router = Router();

router.post("/login", AuthController.loginUser);
router.post("/register", AuthController.registerUser);

export default router;