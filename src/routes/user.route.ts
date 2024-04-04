import express from "express";
import { NextFunction } from "express";
import { userController } from "../controllers/user.controller";
import { userValidator } from "../middlewares/userValidator";
import userSchema from "../schemas/user.schema";
import CheckToken from "../services/CheckToken";
export const userRouter = express.Router();
// movieRouter.get("/", movieController.getAll);
userRouter.post("/Register", userValidator(userSchema), async (req, res, next) => {
  const userControllers = new userController();
  try {
    const requestBody = req.body;
    const newUser: typeof userSchema = await userControllers.createUser(
      requestBody
    ); // Correctly use typeof UserModel
    res
      .status(201)
      .json({ status: "success", message: "User created!!!", data: newUser });
  } catch (error) {
    next(error);
  }
});
userRouter.get(
  "/verify",
  async (req, res ,next:NextFunction) => {
    try {
      const token = req.query.token as string;
      const userControllers = new userController();
      const user = await userControllers.verifyEmail(token)
      res.status(200).json({ user });
    } catch (error) {
      next(error);
    }
  }
);
userRouter.post(
  "/login",
  async (req, res, next) => {
    try {
      const userControllers = new userController();
      await userControllers.login(req.body);
      res.status(200).json({ message: "Login successful" });
    } catch (error) {
      next(error);
    }
  }
);
