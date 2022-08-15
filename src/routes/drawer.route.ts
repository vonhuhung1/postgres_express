import { Router } from "express";
import drawerController from "../controllers/drawer.controller";
import { auth } from "../middleware/auth";
const router = Router();

router
  .post("/",auth, drawerController.createDrawer)
  .put("/:id",auth, drawerController.updateDrawer)
  .get("/:id",auth, drawerController.getDrawer)
  .get("/",auth, drawerController.getDrawers)
  .delete("/:id",auth, drawerController.deleteDrawer);

export default router;
