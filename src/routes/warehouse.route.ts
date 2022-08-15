import { Router } from "express";
import warehouseController from "../controllers/warehouse.controller";
import { auth } from "../middleware/auth";
const router = Router();

router
  .post("/",auth, warehouseController.createWarehouse)
  .put("/:id",auth, warehouseController.updateWarehouse)
  .get("/:id",auth, warehouseController.getWarehouse)
  .get("/",auth, warehouseController.getWarehouses)
  .delete("/:id",auth, warehouseController.deleteWarehouse);

export default router;
