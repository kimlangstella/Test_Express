import { error } from "console";
import { movieModel } from "../models/movie";
import { NextFunction, Request, Response } from "express";
// import v1  from 'uuid';
export const movieController = {
  create: async function (req: Request, res: Response) {
    try {
      console.log(req.body);
      // const Id = "v1";
      const m = await new movieModel({
        name: req.body.name,
        released_on:req.body.released_on,
        // athor:req.body.author,
        // email:req.body.email
      }).save();
      res.json({
        status: "success",
        message: "Movie added successfully!!!",
        data: m,
      });
    } catch (error) {
      res.status(500).json({
        message: "something went wrong",
      });
    }
  },
  getById: async function (req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.body);
      const m = await movieModel.findById(req.params.movieId);
      if (!m) {
        throw new Error("not found this id");
      }
      res.json({ status: "success", message: "Movie found!!!", data: m });
    } catch (error: { message: string } | any) {
      next(new Error(error.message));
    }
  },
  getAll: async function (req: Request, res: Response, next: NextFunction) {
    try {
      const movies = await movieModel.find({});
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
      const { movieId } = req.params;
      const m = await movieModel.findByIdAndUpdate(movieId, {
        name: req.body.name,
        released_on:req.body.released_on,
        // email:req.body.email
      });
      if (!m) {
        throw new Error("not found this id");
      }
      res.json({
        status: "success",
        message: "Movie updated successfully!!!",
        data: m,
      });
    } catch (error: { message: string } | any) {
      next(new Error(error.message));
    }
  },
  deleteById: async function (req: Request, res: Response, next: NextFunction) {
    try {
      const deleteID = await movieModel.deleteOne({ _id: req.params.movieId });
      if (!deleteID) {
        throw new Error("wrong id");
      }
      res.json({
        status: "success",
        message: "Movie deleted successfully!!!",
        data: null,
      });
    } catch (error: { message: string } | any) {
      next(new Error(error.message));
    }
  },
};
