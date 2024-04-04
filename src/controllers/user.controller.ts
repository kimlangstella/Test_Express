import {
  Post,
  Route,
  Body,
  Get,
  Put,
  Delete,
  Query,
  Queries,
  Controller,
  Tags,
} from "tsoa";
import { userServices } from "../services/userServices";
import { generateToken } from "../util/generatetoken";
import { nodemailer } from "../util/sendverifycation";
import { generatePassword } from "../jwt";
import tokenModel from "../database/models/token.Model";
import CheckToken from "../services/CheckToken"
import { UserRepo } from "../database/repoteries/userRepostery";

export interface RequestBody {
  name: string;
  email: string;
  password: string;
}
@Route("/user")
export class userController {
  private userService=new userServices();
  @Post("/register")
  public async createUser(@Body() requestBody: RequestBody): Promise<any> {
    const { name, email, password } = requestBody;
    const hashPassword = await generatePassword(password);
    const user = await this.userService.createUser({
      name,
      email,
      password: hashPassword,
    });
    const token = generateToken();
    await tokenModel.create({id:user.id,token:token})
    nodemailer(email, token);
    return user;
  }
  @Get("/verify")
  public async verifyEmail(@Query() token: string): Promise<any> {
    try {
      // Verify the email token
      const tokenClass = new CheckToken();
      const user = await tokenClass.VerifyUser(token);

      return user;
    } catch (error) {
      throw error;
    }
  }
  @Post("/login")
  public async login(@Body() requestBody: { password: string; email: string }) {
    try {
      const { email, password } = requestBody;
      const tokenClass = new CheckToken();
      await tokenClass.login(email,password)
    } catch (error) {
      throw error;
    }
  }

}
