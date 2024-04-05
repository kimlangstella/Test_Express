import { UserRepo } from "../database/repoteries/userRepostery";
import { TokenRepo } from "../database/repoteries/tokenRepo";
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
