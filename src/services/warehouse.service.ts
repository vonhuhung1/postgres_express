import { warehouse } from "../models/warehouse.model";
import AppDataSource from "../config/config";
import { organization } from "../models/organization.model";
import { Request } from "express";

const warehouseReponsitory = AppDataSource.getRepository(warehouse);

export const saveWarehouse = async (warehouse: Object) => {
  return await warehouseReponsitory.save(warehouse);
};
export const createWarehouse = async (
  warehouse: Object,
  organization: organization
) => {
  return await saveWarehouse(
    warehouseReponsitory.create({ ...warehouse, organization })
  );
};
export const getWarehouse = async (warehouseId: any) => {
  return await warehouseReponsitory.findOne({
    where: {
      id: warehouseId,
    },
    relations: {
      organization: true,
    },
  });
};
export const deleteWarehouse = async (warehouseId: any) => {
  return await warehouseReponsitory.delete({ id: warehouseId });
};
export const getWarehouses = async (req: Request) => {
  const builder = warehouseReponsitory.createQueryBuilder("warehouses");
  if (req.query.s) {
    builder.where("warehouses.name LIKE :s", { s: `%${req.query.s}%` });
  }
  const page: number = parseInt(req.query.page as any) || 1;
  const limit = 10;
  builder.offset((page - 1) * limit).limit(limit);
  return builder.getMany();
};
