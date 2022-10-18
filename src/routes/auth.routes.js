import { Router } from "express";
import { methods as AuthController } from "../controllers/auth.controller";
const router = Router();

router.post("/login", AuthController.loginUser);
router.post("/register", AuthController.registerUser);
router.get("/users", AuthController.getAllUsers);
router.get("/user/:id", AuthController.getOneUser);
export default router;