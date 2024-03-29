import { BaseCustomError } from "../util/const/statuscode";
import { Response,Request,NextFunction } from "express";
const movieValidator=(schema:any)=>{
    return (req:Request,res:Response,next:NextFunction) =>{
        try {
            schema.parse(req.body)
            next();
        } catch (error) {
            const customError = new BaseCustomError('Wrong Schema', 404);
            console.log(customError.statusCode)
            next(customError);
        }
    }
   
}
export default movieValidator