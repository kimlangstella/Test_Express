// for get data from model we need to get data from it
import { movieModel } from "../models/movie";
class UserRepo{
    async createUser(user: {}){
        return await new movieModel(user).save();
    }
    async getUserById(id:string){
        return await movieModel.findById(id);
    }
    async getUser(){
        return await movieModel.find();
    }
    async updateUserById(id:string,user:{}){
        // need 2 paramer
        return await movieModel.findById(id,user)
    }
    async deleteUserById(id:string){
        //_id that generated in database
        return await movieModel.deleteOne({_id: id})
    }
}
export {UserRepo};