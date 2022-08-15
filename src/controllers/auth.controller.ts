import {loginStaffWithEmailAndPassword} from "../services/staff.service";
import { Request, Response } from "express"; 
import { accessToken } from "../middleware/auth";

  
  const authController = {
    login: async (req: Request, res: Response) => {
        const token =   await accessToken(req,res);
        const { email, password } = req.body;
        const staff = await loginStaffWithEmailAndPassword(email, password)      
        if(staff === false){
           return  res.status(404).json({msg:"Incorrect Email or Password "});
        }
       return  res.status(200).send({msg:"Login successfully ", data: staff,access_token: token});
    }
}
    export default authController;
  