import express, { Express,NextFunction,Request,Response } from "express";
import path from "path";
import { studentRouter } from "./routes/student.route";
import { userRouter } from "./routes/user.route";
import { movieRouter } from "./routes/movie.route";
import connectToDatabase from "./util/dbConnection";
import bodyParser from "body-parser";
import { swaggerDocument } from "./util/swagger";
import swaggerUi from  'swagger-ui-express'
const port=5000;
const app:Express = express();
app.get("/",(req:Request,res:Response)=>{
    res.send("Hello from express!!!");
})
app.get("/hi",(req:Request,res:Response)=>{
    res.send("hi");
})
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(bodyParser.urlencoded({ extended: true , limit: "30mb"}));
app.use(bodyParser.json());

app.set("view engine","ejs");
app.set("views",path.join(__dirname,'views'))

app.use((req, res, next) => {
    res.on("finish", () => {
      const timeString = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
      console.log('Response sent at:', timeString);
    });
    next();
});
//globel rount and sub route
app.use("/student",studentRouter);
app.use("user",userRouter);
app.use("/movie", movieRouter);
//global error handler
app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
    res.status(500).json({
      message: err.message,
    });
  });
  
connectToDatabase().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
});
