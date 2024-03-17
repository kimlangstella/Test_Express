import { Request,Response,NextFunction } from "express"
import mongoose from "mongoose";
//validator syntax
const validator=(req:Request,res:Response,next:NextFunction)=>{
    const {movieId}=req.params;
    if(!mongoose.isValidObjectId(movieId)){
        next(new Error("error syntax"))
    }
    next();
}
export default validator;