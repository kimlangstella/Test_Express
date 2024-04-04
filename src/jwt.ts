import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { BaseCustomError } from "./util/const/statuscode";

const salt = 10;

export const generatePassword = async (password: string) => {
  try {
    return await bcrypt.hash(password, salt);
  } catch (error) {
    throw new BaseCustomError("Unable to generate password",404);
  }
};
export const validatePassword=async(enteredPassword:string,savedPassword:string)=>{
  return bcrypt.compare(enteredPassword,savedPassword);
}
export const generateSignature = async (payload: object): Promise<string> => {
  try {
    return await jwt.sign(payload, process.env.APP_SECRET as string, {
      expiresIn: "30d",
    });
  } catch (error) {
    throw new BaseCustomError("Unable to generate signature from jwt",404);
  }
};
