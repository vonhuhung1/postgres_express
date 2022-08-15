import { Router } from "express";
import authController from "../controllers/auth.controller";
// import { authValidation } from "../validations/auth.validation";
const router = Router();

router
  .post("/login", authController.login)

export default router;
