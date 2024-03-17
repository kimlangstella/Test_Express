import express, { Express,NextFunction,Request,Response } from "express";
import path from "path";
import { studentRouter } from "./routes/student.route";
import { userRouter } from "./routes/user.route";
import { movieRouter } from "./routes/movie.route";
import connectToDatabase from "./util/dbConnection";
import bodyParser from "body-parser";
import { swaggerDocument } from "./util/swagger";
import swaggerUi from  'swagger-ui-express';
import errorHandler from "./middlewares/errorHandler";
import requestime from "./middlewares/requestime";
const port=5000;
const app:Express = express();
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(bodyParser.urlencoded({ extended: true , limit: "30mb"}));
app.use(bodyParser.json());
// app.use(requestTime);
app.set("view engine","ejs");
app.set("views",path.join(__dirname,'views'))
//globel rount and sub route
app.use("/student",studentRouter);
app.use("user",userRouter);
app.use("/movie", movieRouter);
//global error handler
app.use(errorHandler)
app.use(requestime)
connectToDatabase().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
});
