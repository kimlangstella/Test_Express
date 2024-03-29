import { Request,Response,NextFunction } from "express"
import mongoose from "mongoose";
import { BaseCustomError } from "../util/const/statuscode";
const Uservalidator=(req:Request,res:Response,next:NextFunction)=>{
    const {userId}=req.params;
    if(!mongoose.isValidObjectId(userId)){
        const userError=new BaseCustomError('id validate',404);
        console.log(userError.statusCode)
        next(userError);
    }
    next();
}
export default Uservalidator;