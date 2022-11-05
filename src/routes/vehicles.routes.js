import { Router } from "express";
import { methods as VehiclesController } from "../controllers/vehicles.controller";
import checkToken from "../middlewares/auth";
import checkRole from "../middlewares/roleAuth";
const {validateCreateVehicle} = require('../validators/vehicles.validator')
const router = Router();

router.get("/", VehiclesController.getAllVehicles);
router.get("/active/", VehiclesController.getAllVehiclesActives);
router.get("/:id", VehiclesController.getOneVehicle);
router.get("/voucher/:id", VehiclesController.getOneVehicleForVoucher);
router.post("/", validateCreateVehicle, VehiclesController.createNewVehicle);
router.put("/:id", validateCreateVehicle, VehiclesController.updateOneVehicle);
router.delete("/:id", VehiclesController.deleteOneVehicle);

export default router;