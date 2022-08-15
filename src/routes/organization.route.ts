import { Router } from "express";
import organizationController from "../controllers/organization.controller";
import { auth } from "../middleware/auth";
const router = Router();

router
  .post("/",auth, organizationController.createOrganization)
  .get("/:id",auth, organizationController.getOrganization)
  .get("/",auth, organizationController.getOrganizations)
  .put("/:id",auth, organizationController.updateOrganization)
  .delete("/:id",auth, organizationController.deleteOrganization);

export default router;
