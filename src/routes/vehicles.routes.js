import { Router } from "express";
import { methods as VehiclesController } from "../controllers/vehicles.controller";
const {validateCreateVehicle} = require('../validators/vehicles.validator')
const router = Router();

router.get("/", VehiclesController.getAllVehicles);
router.get("/:id", VehiclesController.getOneVehicle);
router.post("/", validateCreateVehicle, VehiclesController.createNewVehicle);
router.put("/:id", validateCreateVehicle, VehiclesController.updateOneVehicle);
router.delete("/:id", VehiclesController.deleteOneVehicle);

export default router;