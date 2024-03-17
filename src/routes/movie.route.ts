import express from "express";
import { movieController } from "../controllers/movie.controller";
import validator from "../middlewares/validator";

export const movieRouter = express.Router();

movieRouter.get('/', movieController.getAll);
movieRouter.post('/', movieController.create);
movieRouter.get('/:movieId',validator, movieController.getById);
movieRouter.put('/:movieId',validator, movieController.updateById);
movieRouter.delete('/:movieId',validator, movieController.deleteById);
