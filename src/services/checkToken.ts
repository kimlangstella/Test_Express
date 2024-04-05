import { BaseCustomError } from "../util/const/statuscode";
import { UserRepo } from "../database/repoteries/userRepostery";
import { TokenRepo } from "../database/repoteries/tokenRepo";
import { validatePassword } from "../jwt";
import { generateTokenjwt } from "../util/jwtToken";
import { generateToken } from "../util/generatetoken";
import { nodemailer } from "../util/sendverifycation";
class CheckToken {
  repo: UserRepo;
  tokenRepo: TokenRepo;
  constructor() {
    this.repo = new UserRepo();
    this.tokenRepo = new TokenRepo();
  }
  async SendverifyEmail(email: string, id: string) {
    try {
      const token = generateToken();
      nodemailer(email, token);
      const currentTime = new Date();
      currentTime.setMinutes(currentTime.getMinutes() + 1);
      await this.tokenRepo.createTokenId( id, token,currentTime);
    } catch (error) {
      error;
    }
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
      if (new Date() > isToken.expiresAt) {
        // Token has expired, delete it and send a new one
        const newToken = await generateToken();
        nodemailer(user.email || '',newToken)
        const newTime= new Date();
        newTime.setMinutes(newTime.getMinutes()+1);
        isToken.expiresAt= newTime;
        isToken.token=newToken;
        await isToken.save();
        throw new BaseCustomError("your email was expired",403)
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
      if (!user || typeof user.password !== "string") {
        throw new BaseCustomError("Invalid email or password", 404);
      }
      if (!user.isVerified) {
        throw new BaseCustomError("please verify your email first", 403);
      }
      const isValidPassword = await validatePassword(password, user.password);
      if (!isValidPassword) {
        throw new BaseCustomError("Invalid email or password", 401);
      }
      return user;
    } catch (error: any) {
      throw new BaseCustomError(error.message, 404);
    }
  }
}

export default CheckToken;
