import { department } from "../models/department.model";
import { Request } from "express";
import AppDataSource from "../config/config";
import { organization } from "../models/organization.model";
const departmentReponsitory = AppDataSource.getRepository(department);

export const saveDepartment = async (department: Object) => {
  return await departmentReponsitory.save(department);
};
export const createDepartment = async (
  department: Object,
  organization: organization
) => {
  return await saveDepartment(
    departmentReponsitory.create({ ...department, organization })
  );
};
export const getDepartment = async (departmentId: any) => {
  return await departmentReponsitory.findOne({
    where: {
      id: departmentId,
    },
    relations: {
      organization: true,
    },
  });
};
export const deleteDepartment = async (departmentId: any) => {
  return await departmentReponsitory.delete({ id: departmentId });
};
export const getDepartments = async (req: Request) => {
  const builder = departmentReponsitory.createQueryBuilder("departments");
  if (req.query.s) {
    builder.where("departments.name LIKE :s", { s: `%${req.query.s}%` });
  }
  const page: number = parseInt(req.query.page as any) || 1;
  const limit = 10;
  builder.offset((page - 1) * limit).limit(limit);
  return builder.getMany();
};
