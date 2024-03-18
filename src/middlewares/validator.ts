import { Request,Response,NextFunction } from "express"
import mongoose from "mongoose";
export class BaseCustomError extends Error {
    [x: string]: any;
    constructor(message: string | undefined, statusCode: number) {
      super(message); // Call the super constructor (Error class)
      this.statusCode = statusCode; // Custom property to hold status code
      this.name = this.constructor.name; // Set the name of the error to the class name
      Error.captureStackTrace(this, this.constructor); // Capture stack trace
    }
}
//validator syntax
const validator=(req:Request,res:Response,next:NextFunction)=>{
    const {movieId}=req.params;
    if(!mongoose.isValidObjectId(movieId)){
        const userError=new BaseCustomError('id validate',404);
        console.log(userError.statusCode)
        next(userError);
    }
    next();
}
export default validator;