import { Router } from "express";
import departmentController from "../controllers/department.controller";
import { auth } from "../middleware/auth";
const router = Router();

router
  .post("/", auth,departmentController.createDepartment)
  .put("/:id", auth,departmentController.updateDepartment)
  .get("/:id",auth, departmentController.getDepartment)
  .get("/",auth, departmentController.getDepartments)
  .delete("/:id",auth, departmentController.deleteDepartment);

export default router;
