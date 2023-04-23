import { Router } from "express";
import { methods as RequestController } from "../controllers/exteriorRequest.controller";
//const { validateCreateRequest } = require('../validators/person.validator')
const router = Router();

router.get("/", RequestController.getAllRequests);
router.get("/onhold/", RequestController.getRequestsOnHold);
router.get("/:id", RequestController.getOneRequest);
router.get("/complete/:id", RequestController.getOneRequestComplete);
router.post("/", /*validateCreateRequest,*/ RequestController.createNewRequest);
router.put("/edit/:id", RequestController.updateOneRequest);

export default router;