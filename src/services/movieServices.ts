import { UserRepo } from "../database/repoteries/repostery";
export class userServices {
  private UserRepo: UserRepo;
  // for instand data from userrepo
  constructor() {
    this.UserRepo = new UserRepo();
  }
  async createUser(user: object) {
    return await this.UserRepo.createUser(user);
  }
  async getUserById(id: string) {
    return await this.UserRepo.getUserById(id);
  }
  async getUser() {
    return await this.UserRepo.getUser();
  }
  async updateUserById(id: string, user: object) {
    return await this.UserRepo.updateUserById(id, user);
  }
  async deleteUserById(id: string) {
    return await this.UserRepo.deleteUserById(id);
  }
}
