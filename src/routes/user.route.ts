import express from "express";
import { userController } from "../controllers/user.controller";
import { Options } from "./types/userRoute";
import { userValidator } from "../middlewares/userValidator";
import validator from "../middlewares/validatormovieinput";
import { BaseCustomError } from "../util/const/statuscode";
import userSchema from "../schemas/user.schema";
import Uservalidator from "../middlewares/validatoruserinput";
export const userRouter = express.Router();
const userControllers = new userController();
// movieRouter.get("/", movieController.getAll);
userRouter.post("/", userValidator(userSchema), async (req, res, next) => {
  try {
    const requestBody = req.body;
    const newMovie: typeof userSchema = await userControllers.createUser(
      requestBody
    ); // Correctly use typeof UserModel
    res
      .status(201)
      .json({ status: "success", message: "User created!!!", data: newMovie });
  } catch (error) {
    next(error);
  }
});
userRouter.get("/", async (req, res, next) => {
  try {
    const { page = 1, limit = 5 } = req.query;
    const options: Options = {
      page: parseInt(page as string, 10),
      limit: parseInt(limit as string, 10),
    };
    const users = await userControllers.getAll(options);
    res.status(200).json({
      message: "Movies list found!!",
      users: users.users,
      paginations: users.paginations,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});
userRouter.get("/:userId", Uservalidator, async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const users: (typeof userSchema)[] = await userControllers.getById(userId);
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
userRouter.put(
  "/:userId",
  Uservalidator,
  userValidator(userSchema),
  async (req, res, next) => {
    try {
      const userId = req.params.userId;
      const updatedUser: typeof userSchema | null =
        await userControllers.updateUser(userId, req.body); // Correctly use typeof UserModel
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
userRouter.delete("/:userId", Uservalidator, async (req, res, next) => {
  try {
    const userId = req.params.userId;
    await userControllers.deleteById(userId);
    res
      .status(204)
      .json({ status: "success", message: "User deleted successfully!" });
  } catch (error) {
    next(error);
  }
});
