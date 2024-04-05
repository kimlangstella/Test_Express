import { userModel } from "../models/user.model";
import { Options } from "../../routes/types/userRoute";
import { BaseCustomError } from "../../util/const/statuscode";
import { RequestBody } from "../../controllers/user.controller";
interface User {
  name: string;
  email: string;
  password: string;
}
export class UserRepo {
  async createUser(user: RequestBody) {
    try {
      const exisingEmail = await userModel.findOne({ email: user.email });
      if (exisingEmail) {
        if (!exisingEmail.isVerified) {
          throw new BaseCustomError("Please verify your email before proceeding.", 403);
        }
        throw new BaseCustomError("Your email is already used", 409);
      }
      const newUser = new userModel(user);
      const result = await newUser.save();
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async getUserById(id: string) {
    return await userModel.findById(id);
  }
  async getUser() {
    // const {page,limit}=options;
    // const skip:number=(page-1)*limit
    const userdata = await userModel.find();
    // const totalDocuments:number=await userModel.countDocuments();
    // const totalPages:number=Math.ceil(totalDocuments/limit);
    // const pagination={
    //     page:page,
    //     totalPages:totalPages,
    //     totalDocuments:totalDocuments,
    // }
    return userdata;
  }
  async getUserByEmail(email:string){
    return await userModel.findOne({email})
  }
}