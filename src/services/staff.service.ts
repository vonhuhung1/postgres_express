import { staff } from "../models/staff.model";
import { Request,Response } from "express";
import AppDataSource from "../config/config";
const staffReponsitory = AppDataSource.getRepository(staff);

export const saveStaff = async (staff: object) => {
  return await staffReponsitory.save(staff);
};
export const createStaff = async (staff: object, department: object) => {
  return await saveStaff(staffReponsitory.create({ ...staff, department }));
};
export const getStaff = async (staffId: any) => {
  return await staffReponsitory.findOne({
    where: {
      id: staffId,
    },
    relations: {
      department: true,
    },
  });
};

export const getStaffByEmail = async (email: any) => {
    return await staffReponsitory.findOne({
      where: {
        email:email,
      },
      relations: {
        department: true,
      },
    });
  };
export const deleteStaff = async (staffId: any) => {
  return await staffReponsitory.delete({ id: staffId });
};

export const getStaffs = async (req: Request) => {
  const builder = staffReponsitory.createQueryBuilder("organizations");
  if (req.query.s) {
    builder.where("departments.name LIKE :s", { s: `%${req.query.s}%` });
  }
  const page: number = parseInt(req.query.page as any) || 1;
  const limit = 10;
  builder.offset((page - 1) * limit).limit(limit);
  return builder.getMany();
};

export const loginStaffWithEmailAndPassword = async (email:string, password:string) => {
    const staff = await getStaffByEmail(email);
    if(!staff || staff.password != password){
        return false;
    }
    return staff;
  };
