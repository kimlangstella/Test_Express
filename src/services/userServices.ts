import { UserRepo } from "../database/repoteries/userRepostery";
import { Options } from "../routes/types/userRoute";
import  {userType}  from "../schemas/@types/user";
import bcrypt from 'bcrypt'
export class userServices{
    private UserRepo:UserRepo;
    constructor(){
        this.UserRepo=new UserRepo();
    }
    async createUser(user: userType | null) {
      try {
          if (!user) {
              throw new Error('User data is missing');
          }
  
          const { name, email, password } = user as userType;
  
          // Generate a salt
          const saltRounds = 10;
          const salt = await bcrypt.genSalt(saltRounds);
  
          // Hash the password using the generated salt
          const hashedPassword = await bcrypt.hash(password, salt);
  
          // Store hashed password along with other user data
          const userWithHashedPassword = {
              name,
              email,
              password: hashedPassword, // Store the hashed password
          };
  
          // Call the repository method to create the user
          return await this.UserRepo.createUser(userWithHashedPassword);
      } catch (error) {
          throw error;
      }
  }
    async getUserById(id:string){
        return await this.UserRepo.getUserById(id);
    }
    async getUser(options:Options) {
        return await this.UserRepo.getUser(options);
      }
      async updateUserById(id: string, user: object) {
        return await this.UserRepo.updateUserById(id, user);
      }
      async deleteUserById(id: string) {
        return await this.UserRepo.deleteUserById(id);
      }
}