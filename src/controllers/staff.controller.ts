import {
    createStaff,
    saveStaff,
    getStaff,
    getStaffs,
    loginStaffWithEmailAndPassword,
  } from "../services/staff.service";
  import { Request, Response, NextFunction } from "express";
  import { getDepartment } from "../services/department.service";
  
  const staffController = {
    createStaff: async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { name, email, password, isAdmin:boolean , deppartId } = req.body;
        const department = await getDepartment(deppartId);
        if (!department) {
          const error = new Error("department not found");
          return res.status(404).json(error);
        }
        const result = await createStaff(
          { name, email, password, isAdmin:boolean },
          department
        );
        return res.status(200).json({ msg: "create successfully", data: result });
      } catch (error) {
        console.error(error);
        next(error);
      }
    },
    updateStaff: async (req: Request, res: Response, next: NextFunction) => {
      try {
        const staff = await getStaff(req.params.id);
        if (!staff) {
          const error = new Error("staff not found");
          return res.status(404).json({ error });
        }
        req.body.department = await getDepartment(req.body.departmentId);
        Object.assign(staff, req.body);
        const updateStaff = await saveStaff(staff);
        return res
          .status(200)
          .json({ msg: "update successfully", data: updateStaff });
      } catch (error) {
        console.error(error);
        next(error);
      }
    },
    getStaff: async (req: Request, res: Response, next: NextFunction) => {
      try {
        const result = await getStaff(req.params.id);
        return res.status(200).json({ msg: "get successfully", data: result });
      } catch (error) {
        console.error(error);
        next(error);
      }
    },
    getStaffs: async (req: Request, res: Response, next: NextFunction) => {
      try {
        const result = await getStaffs(req);
        res.status(200).json({ msg: "get successfully", data: result });
      } catch (error) {
        console.error(error);
        next(error);
      }
    },
    deleteStaff: async (req: Request, res: Response) => {
      try {
        const staff = await getStaff(req.params.id);
        if (!staff) {
          return res.status(404).json("Not Found");
        }
        await staff.remove();
        return res.status(200).json({ msg: "Delete successfully" });
      } catch (err) {
        console.log(err);
      }
    },
    login: async (req: Request, res: Response ) => {
        const { email, password } = req.body;
        const staff = await loginStaffWithEmailAndPassword(email, password);
        if(staff === false){
           return  res.status(404).json({msg:"Incorrect Email or Password "});
        }
       return res.status(200).json({msg:"Login successfully ", data: staff});
    }
}
    export default staffController;
  