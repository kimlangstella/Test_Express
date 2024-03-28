// for get data from model we need to get data from it
import { ObjectId } from "mongoose";
import { movieModel } from "../models/movie";
import PaginationType from "mongoose"
import { Options } from "../../routes/types/userRoute";
class MovieRepo {
  async createMovie(user: object) {
    try {
      const newUser = new movieModel(user);
      const result = await newUser.save();
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async getMovieById(id: string) {
    return await movieModel.findById(id);
  }
  async getMovie(options:Options) {
    // const skip = (page - 1) * limit;
    // return await movieModel.find().skip(skip).limit(limit);
    const {page,limit}=options;
    const skip:number= (page-1)*limit
    const moviesdate = await movieModel.find().skip(skip).limit(limit);
    const totalDocuments: number=await movieModel.countDocuments();
    const totalPages:number=Math.ceil(totalDocuments/limit);
    const pagination={
      page:page,
      totalPages:totalPages,
      totalDocuments:totalDocuments,
    }
    return {movies:moviesdate,pagination:pagination}
  }
  async updateMovieById(id: string, Movie: {}) {
    // need 2 paramer
    return await movieModel.findById(id, Movie, { new: true });
  }
  async deleteMovieById(id: string) {
    //_id that generated in database
    return await movieModel.deleteOne({ _id: id });
  }
}
export { MovieRepo };
