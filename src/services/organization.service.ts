import { organization } from "../models/organization.model";
import { Request } from "express";
import AppDataSource from "../config/config";
const organizationReponsitory = AppDataSource.getRepository(organization);

export const saveOrganization = async (organization: object) => {
  return await organizationReponsitory.save(organization);
};

export const createOrganization = async (organization: Object) => {
  return await saveOrganization(organizationReponsitory.create(organization));
};

export const getOrganization = async (organizationid: any) => {
  return await organizationReponsitory.findOne({
    where: {
      id: organizationid,
    },
  });
};

export const getOrganizations = async (req: Request) => {
  const builder = organizationReponsitory.createQueryBuilder("organizations");
  const sort: any = req.query.sort;
  if (req.query.s) {
    builder.where("departments.name LIKE :s", { s: `%${req.query.s}%` });
  }
  const page: number = parseInt(req.query.page as any) || 1;
  const limit = 10;
  builder.offset((page - 1) * limit).limit(limit);
  return builder.getMany();
};
