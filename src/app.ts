import express, {
  Application,
  Express,
  NextFunction,
  Request,
  Response,
} from "express";
import path from "path";
import { movieRouter } from "./routes/user.route";
import bodyParser from "body-parser";
const swaggerDocument = require("../public/swagger.json");
import swaggerUi from "swagger-ui-express";
import errorHandler from "./middlewares/errorHandler";
import requestime from "./middlewares/requestime";
const app: Application = express();
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(bodyParser.urlencoded({ extended: true, limit: "30mb" }));
app.use(bodyParser.json());
// app.use(requestTime);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
//globel rount and sub route
app.use("/movie", movieRouter);
//global error handler
app.use(errorHandler);
app.use(requestime);
export default app;
