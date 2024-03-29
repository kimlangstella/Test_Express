import { Request,Response,NextFunction } from "express"
import mongoose from "mongoose";
import { BaseCustomError } from "../util/const/statuscode";
const validator=(req:Request,res:Response,next:NextFunction)=>{
    const {movieId}=req.params;
    if(!mongoose.isValidObjectId(movieId)){
        const movieError=new BaseCustomError('id validate',404);
        console.log(movieError.statusCode)
        next(movieError);
    }
    next();
}
export default validator;