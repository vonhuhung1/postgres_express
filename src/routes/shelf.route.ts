import { Router } from "express";
import shelfController from "../controllers/shelf.controller";
import { auth } from "../middleware/auth";

const router = Router();

router
  .post("/", auth,shelfController.createShelf)
  .get("/:id", auth,shelfController.getShelf)
  .get("/", auth,shelfController.getShelfs)
  .put("/:id", auth,shelfController.updateShelf)
  .delete("/:id", auth,shelfController.deleteShelf);

export default router;
