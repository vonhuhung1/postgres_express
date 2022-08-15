import {
  createShelf,
  saveShelf,
  getShelf,
  getShelfs,
} from "../services/shelf.service";
import { Request, Response, NextFunction } from "express";
import { getWarehouse } from "../services/warehouse.service";

const shelfController = {
  createShelf: async (req: Request, res: Response, next: NextFunction) => {
    console.log(req);
    try {
      const { name, warehouseId } = req.body;
      const warehouse = await getWarehouse(warehouseId);
      if (!warehouse) {
        const error = new Error("warehouse not found");
        return res.status(404).json(error);
      }
      const result = await createShelf({ name }, warehouse);
      return res.status(200).json({ msg: "create successfully", data: result });
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
  updateShelf: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const shelf = await getShelf(req.params.id);
      if (!shelf) {
        const error = new Error("shelf not found");
        return res.status(404).json({ error });
      }
      req.body.warehouse = await getWarehouse(req.body.warehouseid);
      Object.assign(shelf, req.body);
      const updateshelf = await saveShelf(shelf);
      return res
        .status(200)
        .json({ msg: "update successfully", data: updateshelf });
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
  getShelf: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await getShelf(req.params.id);
      return res.status(200).json({ msg: "get successfully", data: result });
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
  getShelfs: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await getShelfs(req);
      res.status(200).json({ msg: "get successfully", data: result });
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
  deleteShelf: async (req: Request, res: Response) => {
    try {
      const shelf = await getShelf(req.params.id);
      if (!shelf) {
        return res.status(404).json("Not Found");
      }
      await shelf.remove();
      return res.status(200).json({ msg: "Delete successfully" });
    } catch (err) {
      console.log(err);
    }
  },
};
export default shelfController;
