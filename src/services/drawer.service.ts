import { drawer } from "../models/drawer.model";
import AppDataSource from "../config/config";
import { shelf } from "../models/shelf.model";
import { Request } from "express";

const drawerReponsitory = AppDataSource.getRepository(drawer);

export const saveDrawer = async (drawer: Object) => {
  return await drawerReponsitory.save(drawer);
};
export const createDrawer = async (drawer: Object, shelf: shelf) => {
  return await saveDrawer(drawerReponsitory.create({ ...drawer, shelf }));
};
export const getDrawer = async (drawerId: any) => {
  return await drawerReponsitory.findOne({
    where: {
      id: drawerId,
    },
    relations: {
      shelf: true,
    },
  });
};
export const deleteDrawer = async (drawerId: any) => {
  return await drawerReponsitory.delete({ id: drawerId });
};
export const getDrawers = async (req: Request) => {
  const builder = drawerReponsitory.createQueryBuilder("drawers");
  if (req.query.s) {
    builder.where("drawers.name LIKE :s", { s: `%${req.query.s}%` });
  }
  const page: number = parseInt(req.query.page as any) || 1;
  const limit = 10;
  builder.offset((page - 1) * limit).limit(limit);
  return builder.getMany();
};
