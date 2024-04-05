import mongoose, { Schema } from "mongoose";
import { BaseCustomError } from "../../util/const/statuscode";

export interface IToken extends mongoose.Document {
  id: string;
  token: string;
  expiresAt: Date;
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
        throw new BaseCustomError("Invalid email verification token", 404);
      }
      return true;
    },
  },
  expiresAt: {
    type: Date,
    required: true,
    default: function () {
      // Set expiresAt to current time plus 1 minute
      return new Date(Date.now() + 60000); // 60000 milliseconds = 1 minute
    },
  },
});
export default mongoose.model<IToken>("Token", tokenSchema);
