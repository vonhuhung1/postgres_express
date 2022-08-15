import { profile } from "../models/profile.model";
import { Request } from "express";
import AppDataSource from "../config/config";
const profileReponsitory = AppDataSource.getRepository(profile);

export const saveProfile = async (profile: object) => {
  return await profileReponsitory.save(profile);
};
export const createProfile = async (profile: object, drawer: object) => {
  return await saveProfile(profileReponsitory.create({ ...profile, drawer }));
};
export const getProfile = async (ProfileId: any) => {
  return await profileReponsitory.findOne({
    where: {
      id: ProfileId,
    },
    relations: {
      drawer: true,
    },
  });
};
export const deleteProfile = async (profileId: any) => {
  return await profileReponsitory.delete({ id: profileId });
};

export const getProfiles = async (req: Request) => {
  const builder = profileReponsitory.createQueryBuilder("organizations");
  if (req.query.s) {
    builder.where("departments.name LIKE :s", { s: `%${req.query.s}%` });
  }
  const page: number = parseInt(req.query.page as any) || 1;
  const limit = 10;
  builder.offset((page - 1) * limit).limit(limit);
  return builder.getMany();
};
