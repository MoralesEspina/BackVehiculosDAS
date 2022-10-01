import { Router } from "express";
import { methods as VehiclesController } from "../controllers/vehicles.controller";
const router = Router();

router.get("/", VehiclesController.getVehicles);
router.get("/:id", VehiclesController.getVehicle);
router.post("/", VehiclesController.createVehicle);
router.put("/:id", VehiclesController.updateVehicle);
router.delete("/:id", VehiclesController.deleteVehicle);

export default router;