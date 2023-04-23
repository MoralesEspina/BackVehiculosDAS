import { Router } from "express";
import { methods as TripController } from "../controllers/trips.controller";
//const {validateCreateTrip} = require('../validators/Trip.validator')
const router = Router();

router.get("/exteriorRequest", TripController.getAllTripsFromExteriorRequest);
router.get("/exteriorRequest/onhold/", TripController.getTripsOnHoldFromExteriorRequest);
router.get("/localRequest", TripController.getAllTripsFromLocalRequest);
router.get("/localRequest/onhold/", TripController.getTripsOnHoldFromLocalRequest);
router.get("/:id", TripController.getOneTrip);
router.post("/", /*validateCreateTrip,*/ TripController.createNewTrip);
router.put("/:id", /*validateCreateTrip,*/ TripController.updateOneTrip);

export default router;