import { TokenRepo } from "../database/repoteries/tokenRepo";
import { UserRepo } from "../database/repoteries/userRepostery";
import { Options } from "../routes/types/userRoute";
import { userType } from "../schemas/@types/user";
import { BaseCustomError } from "../util/const/statuscode";
import { generateToken } from "../util/generatetoken";
import { nodemailer } from "../util/sendverifycation";
export class TokenServices {
  private TokenRepo: TokenRepo
  private UserRepo:UserRepo;
  constructor() {
    this.TokenRepo = new TokenRepo();
    this.UserRepo= new UserRepo();
  }
  async SendVerifyEmail(email: string, id: string) {
    try {
      const token = generateToken();
      nodemailer(email, token);

      await this.TokenRepo.createTokenId(id,token);
    } catch (error) {
      throw error;
    }
  }

  async VerifyUser(token: string) {
    const isToken = await this.TokenRepo.findToken(token);

    if (!isToken) {
      throw new BaseCustomError(
        "Verification token is invalid",
        500
      );
    }

    // Find the user associated with this token
    const user = await this.UserRepo.getUserById(isToken.id.toString());
    if (!user) {
      throw new BaseCustomError("User does not exist.", 404);
    }

    // Mark the user's email as verified
    user.isVerified = true;
    await user.save();

    // Remove the verification token
    await this.TokenRepo.deleteToken(token);
    return user;
  }
  
}
