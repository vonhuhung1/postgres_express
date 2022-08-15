import {
  createDrawer,
  saveDrawer,
  getDrawer,
  getDrawers,
} from "../services/drawer.service";
import { Request, Response, NextFunction } from "express";
import { getShelf } from "../services/shelf.service";

const drawerController = {
  createDrawer: async (req: Request, res: Response, next: NextFunction) => {
    console.log(req);
    try {
      const { name, shelfId } = req.body;
      const shelf = await getShelf(shelfId);
      if (!shelf) {
        const error = new Error("shelf not found");
        return res.status(404).json(error);
      }
      const result = await createDrawer({ name }, shelf);
      return res.status(200).json({ msg: "create successfully", data: result });
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
  updateDrawer: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const drawer = await getDrawer(req.params.id);
      if (!drawer) {
        const error = new Error("drawer not found");
        return res.status(404).json({ error });
      }
      req.body.shelf = await getShelf(req.body.shelfid);
      Object.assign(drawer, req.body);
      const updateDrawer = await saveDrawer(drawer);
      return res
        .status(200)
        .json({ msg: "update successfully", data: updateDrawer });
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
  getDrawer: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await getShelf(req.params.id);
      return res.status(200).json({ msg: "get successfully", data: result });
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
  getDrawers: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await getDrawers(req);
      res.status(200).json({ msg: "get successfully", data: result });
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
  deleteDrawer: async (req: Request, res: Response) => {
    try {
      const drawer = await getDrawer(req.params.id);
      if (!drawer) {
        return res.status(404).json("Not Found");
      }
      await drawer.remove();
      return res.status(200).json({ msg: "Delete successfully" });
    } catch (err) {
      console.log(err);
    }
  },
};
export default drawerController;
