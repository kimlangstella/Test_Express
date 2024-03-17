import { Request, Response, NextFunction } from 'express';
function errorHandler(err: Error, req: Request, res: Response, next: NextFunction){
    const statusCode =  req.statusCode;

    //res to client 
    res.json({
      statusCode: statusCode,
      message: err.message,
    });
    next()
}
export default errorHandler;