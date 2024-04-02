import mongoose, { Schema } from "mongoose";
import { BaseCustomError } from "../../util/const/statuscode";

export interface Token extends mongoose.Document{
    id :string,
    token:string
}
const tokenSchema = new Schema({
    id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    token: {
      type: String,
      required: true,
      validate: (value: string): boolean => {
        if (!value || value.length !== 64) {
          throw new BaseCustomError(
            "Invalid email verification token",
            404
          );
        }
        return true;
      },
    },
  });
  
  export default mongoose.model<Token>("Token", tokenSchema);