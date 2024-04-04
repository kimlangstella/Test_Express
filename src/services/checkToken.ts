import { BaseCustomError } from "../util/const/statuscode";
import { UserRepo } from "../database/repoteries/userRepostery";
import { TokenRepo } from "../database/repoteries/tokenRepo";
import { validatePassword } from "../jwt";

class CheckToken {
  repo: UserRepo;
  tokenRepo: TokenRepo;
  constructor() {
    this.repo = new UserRepo();
    this.tokenRepo = new TokenRepo();
  }

  async VerifyUser(token: string) {
    try {
      const isToken = await this.tokenRepo.findToken(token);

      if (!isToken) {
        throw new BaseCustomError("Verification token is invalid", 404);
      }

      // Find the user associated with this token
      const user = await this.repo.getUserById(isToken.id);
      if (!user) {
        throw new BaseCustomError("User does not exist.", 404);
      }
      // Mark the user's email as verified
      user.isVerified = true;
      await user.save();

      // Remove the verification token
      await this.tokenRepo.deleteToken(token);
      return user;
    } catch (error: unknown) {
      throw error;
    }
  }

  async login(email: string, password: string) {
    
    try {
      const user = await this.repo.getUserByEmail(email);
      console.log(user)
      if (!user || typeof user.password !== "string") {
        throw new BaseCustomError("Invalid email or password", 404);
      }
      const isValidPassword = await validatePassword(password, user.password);
      if (!isValidPassword) {
        throw new BaseCustomError("Invalid email or password", 401);
      }
      return user;      
    } catch (error: any) {
      throw new BaseCustomError(error.message,404);
    }
  }
}

export default CheckToken;
