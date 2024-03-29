import { userModel } from "../models/user";
import { Options } from "../../routes/types/userRoute";
import { BaseCustomError } from "../../util/const/statuscode";
interface User{
    name:string,
    email:string,
    password:string
}
export class UserRepo{
    async createUser(user:User){
        try{
            const exisingEmail = await userModel.findOne({email:user.email});
            if(exisingEmail){
                throw new BaseCustomError("This Email aleady used",409);
            }
            const newUser= new userModel(user);
            const result = await newUser.save();
            return result;
        }
        catch(error){
            console.error(error)
            throw error;
        }
    }
    async getUserById(id:string){
        return await userModel.findById(id);
    }
    async getUser(options:Options){
        const {page,limit}=options;
        const skip:number=(page-1)*limit
        const userdata=await userModel.find().skip(skip).limit(limit)
        const totalDocuments:number=await userModel.countDocuments();
        const totalPages:number=Math.ceil(totalDocuments/limit);
        const pagination={
            page:page,
            totalPages:totalPages,
            totalDocuments:totalDocuments,
        }
        return {users:userdata,pagination:pagination}
    }
    async updateUserById(id: string, User: {}) {
        // need 2 paramer
        return await userModel.findById(id, User, { new: true });
      }
      async deleteUserById(id: string) {
        //_id that generated in database
        return await userModel.deleteOne({ _id: id });
      }
}