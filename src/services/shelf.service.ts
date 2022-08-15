import { shelf } from "../models/shelf.model";
import { Request } from "express";
import AppDataSource from "../config/config";
const shelfReponsitory = AppDataSource.getRepository(shelf);

export const saveShelf = async (shelf: object) => {
  return await shelfReponsitory.save(shelf);
};
export const createShelf = async (shelf: object, warehouse: object) => {
  return await saveShelf(shelfReponsitory.create({ ...shelf, warehouse }));
};
export const getShelf = async (shelfId: any) => {
  return await shelfReponsitory.findOne({
    where: {
      id: shelfId,
    },
    relations: {
      warehouse: true,
    },
  });
};
export const deleteShelf = async (shelfId: any) => {
  return await shelfReponsitory.delete({ id: shelfId });
};

export const getShelfs = async (req: Request) => {
  const builder = shelfReponsitory.createQueryBuilder("organizations");
  if (req.query.s) {
    builder.where("departments.name LIKE :s", { s: `%${req.query.s}%` });
  }
  const page: number = parseInt(req.query.page as any) || 1;
  const limit = 10;
  builder.offset((page - 1) * limit).limit(limit);
  return builder.getMany();
};
