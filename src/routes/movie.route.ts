import express from "express";
import { MovieController } from "../controllers/movie.controller";
import validator from "../middlewares/validatormovieinput";
import movieValidator from "../middlewares/movieValidator";
import { BaseCustomError } from "../util/const/statuscode";
import movieSchema from "../schemas/movieSchema";
import { Options } from "./types/userRoute";
export const movieRouter = express.Router();
const movieControllers = new MovieController();
// movieRouter.get("/", movieController.getAll);
movieRouter.post("/", movieValidator(movieSchema), async (req, res, next) => {
  try {
    const requestBody = req.body;
    const newMovie: typeof movieSchema = await movieControllers.createMovie(
      requestBody
    ); // Correctly use typeof UserModel
    res
      .status(201)
      .json({ status: "success", message: "User created!!!", data: newMovie });
  } catch (error) {
    next(error);
  }
});
movieRouter.get("/", async (req, res, next) => {
  try {
    // const { page = 1, limit = 5 } = req.query;
    // const options: Options = {
    //   page: parseInt(page as string, 10),
    //   limit: parseInt(limit as string, 10),
    // };
    const movie = await movieControllers.getAll();
    res.status(200).json({
      message: "Movies list found!!",
      movies: movie.movies,
      data:movie
      // paginations: movie.paginations,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});
movieRouter.get("/:movieId", validator, async (req, res, next) => {
  try {
    const movieID = req.params.movieId;
    const users: (typeof movieSchema)[] = await movieControllers.getById(
      movieID
    );
    if (users) {
      res.status(200).json({
        status: "success",
        message: "Users list found!!!",
        data: users,
      });
    } else {
      throw new BaseCustomError("Users list not found!!!", 404);
    }
  } catch (error) {
    next(error);
  }
});
movieRouter.put(
  "/:movieId",
  validator,
  movieValidator(movieSchema),
  async (req, res, next) => {
    try {
      const movieId = req.params.movieId;
      const updatedUser: typeof movieSchema | null =
        await movieControllers.updateUser(movieId, req.body); // Correctly use typeof UserModel
      if (updatedUser) {
        res.status(200).json({
          status: "success",
          message: "User updated!!!",
          data: updatedUser,
        });
      } else {
        throw new BaseCustomError("User not found!!!", 404);
      }
    } catch (error) {
      next(error);
    }
  }
);
movieRouter.delete("/:movieId", validator, async (req, res, next) => {
  try {
    const movieId = req.params.movieId;
    await movieControllers.deleteById(movieId);
    res
      .status(204)
      .json({ status: "success", message: "User deleted successfully!" });
  } catch (error) {
    next(error);
  }
});

// );
// movieRouter.get("/:movieId", validator, movieController.getById);
// movieRouter.put(
//   "/:movieId",
//   validator,
//   userValidator(userSchema),
//   movieController.updateById
// );
// movieRouter.delete("/:movieId", validator, movieController.deleteById);
