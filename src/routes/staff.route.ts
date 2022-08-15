import { Router } from "express";
import staffController from "../controllers/staff.controller";
import { auth } from "../middleware/auth";

const router = Router();

router
  .post("/", auth,staffController.createStaff)
  .get("/:id", auth,staffController.getStaff)
  .get("/", auth,staffController.getStaffs)
  .put("/:id", auth,staffController.updateStaff)
  .delete("/:id", auth,staffController.deleteStaff)

export default router;
