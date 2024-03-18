import express from "express";
import { movieController } from "../controllers/movie.controller";
import validator from "../middlewares/validator";
import userValidator from "../middlewares/userValidator";
import userSchema from "../schemas/userSchema";

export const movieRouter = express.Router();

movieRouter.get('/' ,movieController.getAll);
movieRouter.post('/',userValidator(userSchema), movieController.create);
movieRouter.get('/:movieId',validator, movieController.getById);
movieRouter.put('/:movieId',validator,userValidator(userSchema), movieController.updateById);
movieRouter.delete('/:movieId',validator, movieController.deleteById);
