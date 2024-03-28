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
import { Route, Post, Controller,Body ,Request,Get,Put,Delete, Queries} from "tsoa";
import { userServices } from "../services/userServices";
import { Options } from "../routes/types/userRoute";
interface RequestBodys{
  name:string,
  email:string
}
@Route("/movie")

export class MovieController extends Controller {
  private userService: userServices;
  constructor() {
    super();
    this.userService = new userServices();
  }
  @Post('/')
  public async createUser(@Body() requestBody:RequestBodys): Promise<any> {
    const { name,email } = requestBody
    return await this.userService.createUser({ name,email});
  }
  @Get('/')
  public async getAll(@Queries() options:Options): Promise<any> {
    return await this.userService.getUser(options);
  }
  @Get("/:movieId")
  public async getById(movieId: string): Promise<any> {
    return await this.userService.getUserById(movieId);
  }
  @Put("/:movieId")
  public async updateUser(movieId: string, @Body() requestBody:RequestBodys): Promise<any> {
    const { name,email} = requestBody;
    return await this.userService.updateUserById(movieId, { name,email });
  }
  @Delete("/:movieId")
  public async deleteById(movieId: string): Promise<void> {
    await this.userService.deleteUserById(movieId);
  }
}
