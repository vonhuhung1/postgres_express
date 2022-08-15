import { Router } from "express";
import profileController from "../controllers/profile.controller";
import { auth } from "../middleware/auth";

const router = Router();

router
  .post("/",auth, profileController.createProfile)
  .put("/:id",auth, profileController.updateProfile)
  .get("/:id",auth, profileController.getProfile)
  .get("/",auth, profileController.getProfiles)
  .delete("/:id",auth, profileController.deleteProfile);

export default router;
