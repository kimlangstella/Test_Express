// for get data from model we need to get data from it
import { ObjectId } from "mongoose";
import { movieModel } from "../models/movie";

class UserRepo {
  async createUser(user: object) {
    try {
      const newUser = new movieModel(user);
      const result = await newUser.save();
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async getUserById(id: string) {
    return await movieModel.findById(id);
  }
  async getUser() {
    return await movieModel.find();
  }
  async updateUserById(id: string, user: {}) {
    // need 2 paramer
    return await movieModel.findById(id, user, { new: true });
  }
  async deleteUserById(id: string) {
    //_id that generated in database
    return await movieModel.deleteOne({ _id: id });
  }
}
export { UserRepo };
