import express from "express";
import { MovieController } from "../controllers/user.controller";
import validator from "../middlewares/validatoruserinput";
import userValidator from "../middlewares/userValidator";
import userSchema from "../schemas/userSchema";
import { BaseCustomError } from "../util/const/statuscode";
import movieSchema from "../schemas/userSchema";
import { Options } from "./types/userRoute";
export const movieRouter = express.Router();
const movieControllers = new MovieController();
// movieRouter.get("/", movieController.getAll);
movieRouter.post("/", userValidator(userSchema), async (req, res, next) => {
  try {
    const requestBody = req.body;
    const newUser: typeof userSchema = await movieControllers.createUser(
      requestBody
    ); // Correctly use typeof UserModel
    res
      .status(201)
      .json({ status: "success", message: "User created!!!", data: newUser });
  } catch (error) {
    next(error);
  }
});
movieRouter.get("/", async (req, res, next) => {
  try {
    const { page = 1, limit = 5 } = req.query;
    const options: Options = {
      page: parseInt(page as string, 10),
      limit: parseInt(limit as string, 10),
    };
    const movie = await movieControllers.getAll(options);
    res.status(200).json({
      message: "Movies list found!!",
      movies: movie.movies,
      paginations: movie.paginations,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});
movieRouter.get("/:movieId", validator, async (req, res, next) => {
  try {
    const movieID = req.params.movieId;
    const users: (typeof userSchema)[] = await movieControllers.getById(
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
  userValidator(userSchema),
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
