// import { NextFunction, Request, Response } from "express";
// import { BaseCustomError } from "../util/const/statuscode";
// import {  userServices } from "../services/movieServices";
// export const movieController = {
//   create: async function (req: Request, res: Response) {
//     const userService = new userServices();
//     try {

//       const user = {
//         name: req.body.name,
//         released_on:req.body.released_on,
//       }

//       const users = await userService.createUser(user)
//       console.log(users)
//       if(!users){
//         throw new Error('user could be not created!')
//       }
//       res.status(201).json({
//         status: 201,
//         message: "Movie create successfully!!!f",
//         data: users,
//       });
//     } catch (error) {
//       res.status(500).json({
//         message: "something went wrong",
//       });
//     }
//   },
//   getById: async function (req: Request, res: Response, next: NextFunction) {
//     const userService= new userServices();
//     try {
//       console.log(req.body);
//       const getUserByid= await userService.getUserById(req.params.movieId);
//       if (!getUserByid) {
//         const customError = new BaseCustomError("id Not found", 404);
//         next(customError);
//       }
//       res.status(200).json({ status: "success", message: "Movie found!!!", data: getUserByid });
//     } catch {
//       const customError = new BaseCustomError("Server Error", 500);
//       next(customError);
//     }

//   },
//   getAll: async function (req: Request, res: Response, next: NextFunction) {
//     const userService = new userServices();
//     try {
//       const movies = await userService.getUser();
//       res.status(200).json({
//         status: "success",
//         message: "Movies list found!!!",
//         data: movies,
//       });
//     } catch (error) {
//       res.status(500).json({
//         message: "can't get",
//       });
//     }
//   },

//   updateById: async function (req: Request, res: Response, next: NextFunction) {
//     try {
//       const userService = new userServices();
//       const { movieId } = req.params;
//       const m= await userService.updateUserById(movieId, {
//         name: req.body.name,
//         released_on:req.body.released_on,
//         // email:req.body.email
//       });
//       if (!m) {
//         const customError = new BaseCustomError("id Not found", 404);
//         next(customError);
//       }
//       res.status(201).json({
//         status: "success",
//         message: "Movie updated successfully!!!",
//         data: m,
//       });
//     } catch {
//       const customError = new BaseCustomError("Server Error", 500);
//       next(customError);
//     }
//   },
//   deleteById: async function (req: Request, res: Response, next: NextFunction) {
//     const userService = new userServices();
//     try {
//       const { movieId } = req.params;

//       const deleted = await userService.deleteUserById(movieId)
//       if (deleted.deletedCount===0) {

//           const customError = new BaseCustomError("id Not found", 404);
//           next(customError);
//         }
//         res.status(204).json({
//           status: "success",
//           message: "Movie deleted successfully!!!",
//           data: null,
//         })
//     } catch {
//       const customError = new BaseCustomError("Server Error", 500);
//       next(customError);
//     }
//   },
// };
import {
  Route,
  Post,
  Controller,
  Body,
  Request,
  Get,
  Put,
  Delete,
  Queries,
  Tags,
} from "tsoa";
import { MovieServices } from "../services/movieServices";
import { Options } from "../routes/types/userRoute";
interface RequestBodys {
  name: string;
  releash_on: string;
}

@Route("/movie")
@Tags("Movie")
export class MovieController extends Controller {
  private MovieService: MovieServices;
  constructor() {
    super();
    this.MovieService = new MovieServices();
  }
  @Post("/")
  public async createMovie(@Body() requestBody: RequestBodys): Promise<any> {
    const { name, releash_on } = requestBody;
    return await this.MovieService.createMovie({ name, releash_on });
  }
  @Get("/")
  public async getAll(): Promise<any> {
    return await this.MovieService.getMovie();
  }
  @Get("/:movieId")
  public async getById(movieId: string): Promise<any> {
    return await this.MovieService.getMovieById(movieId);
  }
  @Put("/:movieId")
  public async updateUser(
    movieId: string,
    @Body() requestBody: RequestBodys
  ): Promise<any> {
    const { name, releash_on } = requestBody;
    return await this.MovieService.updateMovieById(movieId, {
      name,
      releash_on,
    });
  }
  @Delete("/:movieId")
  public async deleteById(movieId: string): Promise<void> {
    await this.MovieService.deleteMovieById(movieId);
  }
}
