import {
  Post,
  Route,
  Body,
  Get,
  Put,
  Delete,
 Query,Queries,
  Controller,
  Tags,
} from "tsoa";
import { userServices } from "../services/userServices";
import { Options } from "../routes/types/userRoute";
import { generatePassword } from "../jwt";
interface RequestBody {
  name: string;
  email: string;
  password: string;
}
@Route("/user")
@Tags("User")
export class userController extends Controller {
  private userService: userServices;
  constructor() {
    super();
    this.userService = new userServices();
  }
  @Post("/")
  public async createUser(@Body() requestBody: RequestBody): Promise<any> {
    const { name, email, password } = requestBody;
    const hashPassword = await generatePassword(password);
    const user=await this.userService.createUser({ name, email, password:hashPassword });// key value have name and email
    await this.userService.SendVerifyEmail(email,user.id)
    return user;
  } 
  // @Get("/verify")
  // public async verifyUser(@Query() token: string) {
  //   try {
  //     // Verify the email token
  //     await this.TokenService.VerifyUser(token);
  //   } catch (error) {
  //     throw error
  //   }
  // }
  @Get("/")
  public async getAll(@Queries() options: Options): Promise<any> {
    return await this.userService.getUser(options);
  }
  @Get("/:userId")
  public async getById(userId: string): Promise<any> {
    return await this.userService.getUserById(userId);
  }
  @Put("/:userId")
  public async updateUser(
    userId: string,
    @Body() requestBody: RequestBody
  ): Promise<any> {
    const { name, email, password } = requestBody;
    return await this.userService.updateUserById(userId, {
      name,
      email,
      password,
    });
  }
  @Delete("/:userId")
  public async deleteById(userId: string): Promise<void> {
    await this.userService.deleteUserById(userId);
  }
}
