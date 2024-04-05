// import tokenModel from "../models/token.Model";
import tokenModel from "../models/token.Model";
export class TokenRepo {
  async createTokenId(id: string, token: string,expired:Date) {
    try {
      return tokenModel.create({id, token,expiresAt:expired});
    } catch (error) {
      throw error;
    }
  }

  async findToken(token: string) {
    try {
      return await tokenModel.findOne({ token: token });
    } catch (error) {
      throw error;
    }
  }

  async deleteToken(token: string) {
    try {
      return await tokenModel.deleteOne({ token: token });
    } catch (error) {
      throw error;
    }
  }
}