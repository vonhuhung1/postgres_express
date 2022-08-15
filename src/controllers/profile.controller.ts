import {
  createProfile,
  saveProfile,
  getProfile,
  getProfiles,
} from "../services/profile.service";
import { Request, Response, NextFunction } from "express";
import { getDrawer } from "../services/drawer.service";

const profileController = {
  createProfile: async (req: Request, res: Response, next: NextFunction) => {
    console.log(req);
    try {
      const { infor, status, createAt, updateAt, drawerId } = req.body;
      const warehouse = await getDrawer(drawerId);
      if (!warehouse) {
        const error = new Error("warehouse not found");
        return res.status(404).json(error);
      }
      const result = await createProfile(
        { infor, status, createAt, updateAt },
        warehouse
      );
      return res.status(200).json({ msg: "create successfully", data: result });
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
  updateProfile: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const profile = await getProfile(req.params.id);
      if (!profile) {
        const error = new Error("profile not found");
        return res.status(404).json({ error });
      }
      req.body.warehouse = await getDrawer(req.body.drawerId);
      Object.assign(profile, req.body);
      const updateProfile = await saveProfile(profile);
      return res
        .status(200)
        .json({ msg: "update successfully", data: updateProfile });
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
  getProfile: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await getProfile(req.params.id);
      return res.status(200).json({ msg: "get successfully", data: result });
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
  getProfiles: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await getProfiles(req);
      res.status(200).json({ msg: "get successfully", data: result });
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
  deleteProfile: async (req: Request, res: Response) => {
    try {
      const profile = await getProfile(req.params.id);
      if (!profile) {
        return res.status(404).json("Not Found");
      }
      await profile.remove();
      return res.status(200).json({ msg: "Delete successfully" });
    } catch (err) {
      console.log(err);
    }
  },
};
export default profileController;
