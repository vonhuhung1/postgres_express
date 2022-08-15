import { Request, Response } from "express";
import {
  createOrganization,
  getOrganization,
  getOrganizations,
  saveOrganization,
} from "../services/organization.service";

const organizationController = {
  createOrganization: async (req: Request, res: Response) => {
    try {
      const { name, address } = req.body;
      const result = await createOrganization({ name, address });

      return res
        .status(200)
        .json({ Message: "Create successfully", data: result });
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  getOrganization: async (req: Request, res: Response) => {
    try {
      const organizationid = req.params.id;
      const result = await getOrganization(organizationid);
      return res
        .status(200)
        .json({ Message: "Get organization successfully", data: result });
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  getOrganizations: async (req: Request, res: Response) => {
    try {
      const result = await getOrganizations(req);
      return res
        .status(200)
        .json({ Message: "Get organization successfully", data: result });
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  updateOrganization: async (req: Request, res: Response) => {
    try {
      const organization = await getOrganization(req.params.id);
      if (!organization) {
        return res.status(404).json("Not Found");
      }
      Object.assign(organization, req.body);
      const updateOrganization = await saveOrganization(organization);
      return res
        .status(200)
        .json({ msg: "update successfully", data: updateOrganization });
    } catch (error) {
      console.log(error);
    }
  },
  deleteOrganization: async (req: Request, res: Response) => {
    try {
      const organization = await getOrganization(req.params.id);
      if (!organization) {
        return res.status(404).json("Not Found");
      }
      await organization.remove();
      return res.status(200).json({ msg: "Delete successfully" });
    } catch (err) {
      console.log(err);
    }
  },
};

export default organizationController;
