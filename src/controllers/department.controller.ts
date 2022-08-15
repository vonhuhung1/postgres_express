import { Request, Response, NextFunction } from "express";
import {
  createDepartment,
  saveDepartment,
  getDepartment,
  getDepartments,
} from "../services/department.service";
import { getOrganization } from "../services/organization.service";

const departmentController = {
  createDepartment: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, address, organizationId } = req.body;
      const organization = await getOrganization(organizationId);
      if (!organization) {
        const error = new Error("organization not found");
        return res.json(error);
      }
      const result = await createDepartment({ name, address }, organization);
      return res.status(200).json({ msg: "create successfully", data: result });
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
  updateDepartment: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const department = await getDepartment(req.params.id);
      if (!department) {
        const error = new Error("Department not found");
        return res.status(403).json(error);
      }
      req.body.organization = await getOrganization(req.body.organizationId);
      Object.assign(department, req.body);
      const updateDepartment = await saveDepartment(department);
      return res
        .status(200)
        .json({ msg: "update successfully", data: updateDepartment });
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
  getDepartment: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await getDepartment(req.params.id);
      return res.status(200).json({ msg: "get successfully", data: result });
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
  getDepartments: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await getDepartments(req);
      res.status(200).json({ msg: "get successfully", data: result });
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
  deleteDepartment: async (req: Request, res: Response) => {
    try {
      const department = await getDepartment(req.params.id);
      if (!department) {
        return res.status(404).json("Not Found");
      }
      await department.remove();
      return res.status(200).json({ msg: "Delete successfully" });
    } catch (err) {
      console.log(err);
    }
  },
};
export default departmentController;
