import { BaseCustomError } from "../util/const/statuscode";
import { Response,Request,NextFunction } from "express";
const userValidator=(schema:any)=>{
    return (req:Request,res:Response,next:NextFunction) =>{
        try {
            schema.parse(req.body)
            next();
        } catch (error) {
            const customError = new BaseCustomError('please Enter Stronger password', 404);
            console.log(customError.statusCode)
            next(customError);
        }
    }
   
}
export {userValidator}