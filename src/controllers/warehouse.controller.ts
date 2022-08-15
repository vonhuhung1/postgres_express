import { Request, Response, NextFunction } from "express";
import {
  createWarehouse,
  saveWarehouse,
  getWarehouse,
  getWarehouses,
} from "../services/warehouse.service";
import { getOrganization } from "../services/organization.service";

const warehouseController = {
  createWarehouse: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, infor, organizationId } = req.body;
      const organization = await getOrganization(organizationId);
      if (!organization) {
        const error = new Error("organization not found");
        return res.status(404).json(error);
      }
      const result = await createWarehouse({ name, infor }, organization);
      return res.status(200).json({ msg: "create successfully", data: result });
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
  updateWarehouse: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const warehouse = await getWarehouse(req.params.id);
      if (!warehouse) {
        const error = new Error("warehouse not found");
        return res.status(404).json(error);
      }
      req.body.organization = await getOrganization(req.body.organizationid);
      Object.assign(warehouse, req.body);
      const updatewarehouse = await saveWarehouse(warehouse);
      return res
        .status(200)
        .json({ msg: "update successfully", data: updatewarehouse });
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
  getWarehouse: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await getWarehouse(req.params.id);
      return res.status(200).json({ msg: "get successfully", data: result });
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
  getWarehouses: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await getWarehouses(req);
      res.status(200).json({ msg: "get successfully", data: result });
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
  deleteWarehouse: async (req: Request, res: Response) => {
    try {
      const warehouse = await getWarehouse(req.params.id);
      if (!warehouse) {
        return res.status(404).json("Not Found");
      }
      await warehouse.remove();
      return res.status(200).json({ msg: "Delete successfully" });
    } catch (err) {
      console.log(err);
    }
  },
};
export default warehouseController;
