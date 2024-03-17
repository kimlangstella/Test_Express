import { Request,NextFunction,Response } from "express";
const requestime=((req: Request,res: Response, next: NextFunction)=>{
    res.on("finish", () => {
        const timeString = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
        console.log('Response sent at:', timeString);
      });
      next();
})
export default requestime;