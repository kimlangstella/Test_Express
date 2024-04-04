import { UserRepo } from "../database/repoteries/userRepostery";
import { Options } from "../routes/types/userRoute";
import { userType } from "../schemas/@types/user";
import { TokenRepo } from "../database/repoteries/tokenRepo";
import { generateToken } from "../util/generatetoken";
import { nodemailer } from "../util/sendverifycation";
import tokenModel from "../database/models/token.Model";
import { RequestBody } from "../controllers/user.controller";
export class userServices {
  private TokenRepo: TokenRepo;
  private UserRepo: UserRepo;
  constructor() {
    this.TokenRepo = new TokenRepo();
    this.UserRepo = new UserRepo();
  }
  async createUser(user: RequestBody) {
    try {
      return await this.UserRepo.createUser(user);
    } catch (error) {
      throw error;
    }
  }
  async getUser() {
    return await this.UserRepo.getUser();
  }
}
