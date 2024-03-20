import { NextFunction, Request, Response } from "express";
import { BaseCustomError } from "../util/const/statuscode";
import {  userServices } from "../services/userServices";
export const movieController = {
  create: async function (req: Request, res: Response) {
    const userService = new userServices();
    try {

      const user = {
        name: req.body.name,
        released_on:req.body.released_on,
      }
      
      const users = await userService.createUser(user)
      console.log(users)
      if(!users){
        throw new Error('user could be not created!')
      }
      res.json({
        status: 200,
        message: "Movie create successfully!!!f",
        data: users,
      });
    } catch (error) {
      res.status(500).json({
        message: "something went wrong",
      });
    }
  },
  getById: async function (req: Request, res: Response, next: NextFunction) {
    const userService= new userServices();
    try {
      console.log(req.body);
      const getUserByid= await userService.getUserById(req.params.movieId);
      if (!getUserByid) {
        const customError = new BaseCustomError("id Not found", 404);
        next(customError);
      }
      res.json({ status: "success", message: "Movie found!!!", data: getUserByid });
    } catch {
      const customError = new BaseCustomError("Server Error", 500);
      next(customError);
    }

  },
  getAll: async function (req: Request, res: Response, next: NextFunction) {
    const userService = new userServices();
    try {
      const movies = await userService.getUser();
      res.json({
        status: "success",
        message: "Movies list found!!!",
        data: movies,
      });
    } catch (error) {
      res.status(500).json({
        message: "can't get",
      });
    }
  },

  updateById: async function (req: Request, res: Response, next: NextFunction) {
    try {
      const userService = new userServices(); 
      const { movieId } = req.params;
      const m= await userService.updateUserById(movieId, {
        name: req.body.name,
        released_on:req.body.released_on,
        // email:req.body.email
      });
      if (!m) {
        const customError = new BaseCustomError("id Not found", 404);
        next(customError);
      }
      res.json({
        status: "success",
        message: "Movie updated successfully!!!",
        data: m,
      });
    } catch {
      const customError = new BaseCustomError("Server Error", 500);
      next(customError);
    }
  },
  deleteById: async function (req: Request, res: Response, next: NextFunction) {
    const userService = new userServices(); 
    try {
      const { movieId } = req.params;

      const deleted = await userService.deleteUserById(movieId)
      if (deleted.deletedCount===0) {
        
          const customError = new BaseCustomError("id Not found", 404);
          next(customError);
        }
        res.json({
          status: "success",
          message: "Movie deleted successfully!!!",
          data: null,
        })
    } catch {
      const customError = new BaseCustomError("Server Error", 500);
      next(customError);
    }
  },
};
