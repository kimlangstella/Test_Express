import { error } from "console";
import { movieModel } from "../models/movie";
import { NextFunction, Request, Response } from "express";
// import v1  from 'uuid';
export const movieController = {
  getById: async function (req: Request, res: Response,next: NextFunction) {
    try{
      console.log(req.body);
      const m = await movieModel.findById(req.params.movieId);
      if(m){
        res.json({ status: "success", message: "Movie found!!!", data: m });
      }else{
        next( Error("wrong id"))
      }
      
    }catch(error){
      res.status(500).json({
        message: "can't get",
      });
    }
  },
  getAll: async function (req: Request, res: Response) {
    try{
      const movies = await movieModel.find({});
      res.json({
      status: "success",
      message: "Movies list found!!!",
      data: movies,
    });
    }catch(error){
      res.status(500).json({
        message: "can't get",
      });
    }
  },

  updateById: async function (req: Request, res: Response) {
    try{
      const m = await movieModel.findByIdAndUpdate(req.params.movieId, {
        name: req.body.name,
      });
      res.json({
        status: "success",
        message: "Movie updated successfully!!!",
        data: m,
      });
    }catch(error){
      res.status(500).json({
        message: "something went wrong",
      });
    }
  },
  deleteById: async function (req: Request, res: Response) {
    try{
      await movieModel.deleteOne({ _id: req.params.movieId });
      res.json({
      status: "success",
      message: "Movie deleted successfully!!!",
      data: null,
    });
    }catch(error){
      res.status(500).json({
        message: "something went wrong",
      });
    }
  },

  create: async function (req: Request, res: Response) {
    try{
      console.log(req.body);
      const Id = "v1";
      const m = await new movieModel({
        movieId: Id,
        name: req.body.name,
        released_on: req.body.released_on,
      }).save();
      res.json({
        status: "success",
        message: "Movie added successfully!!!",
        data: m,
      });
    }catch(error){
      res.status(500).json({
        message: "something went wrong",
      });
    }
  },
};
