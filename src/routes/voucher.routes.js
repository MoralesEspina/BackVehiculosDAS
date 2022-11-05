import { Router } from "express";
import { methods as VouchersController } from "../controllers/voucher.controller";
import checkToken from "../middlewares/auth";
import checkRole from "../middlewares/roleAuth";
const router = Router();

router.get("/diesel/", VouchersController.getAllVouchersDiesel);
router.get("/regular/", VouchersController.getAllVouchersRegular);
router.get("/:id", VouchersController.getOneVoucher);
router.post("/", VouchersController.createNewVoucherDiesel);
router.post("/", VouchersController.createNewVoucherRegular);
router.put("/:id", VouchersController.updateOneVoucher);
router.delete("/:id", VouchersController.deleteOneVoucher);

export default router;