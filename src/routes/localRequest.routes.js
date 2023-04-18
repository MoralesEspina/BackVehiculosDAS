import { Router } from "express";
import { methods as RequestController } from "../controllers/localRequest.controller";
//const { validateCreateRequest } = require('../validators/person.validator')
const router = Router();

router.get("/", RequestController.getAllRequests);
router.get("/:id", RequestController.getOneRequest);
router.get("/complete/:id", RequestController.getOneRequestComplete);
router.post("/", /*validateCreateRequest,*/ RequestController.createNewRequest);
router.put("/:id", RequestController.updateOneRequest);

export default router;