import organizationRouter from "./organization.route";
import departmentRouter from "./department.route";
import express from "express";
import warehouseRouter from "./warehouse.route";
import shelfRouter from "./shelf.route";
import drawerRouter from "./drawer.route";
import profileRouter from "./profile.route";
import staffRouter from "./staff.route";
import authRouter from "./auth.route"

const router = express.Router();

router.use("/organization", organizationRouter);
router.use("/department", departmentRouter);
router.use("/warehouse", warehouseRouter);
router.use("/shelf", shelfRouter);
router.use("/drawer", drawerRouter);
router.use("/profile", profileRouter);
router.use("/staff",staffRouter)
router.use("/auth",authRouter)

export default router;
