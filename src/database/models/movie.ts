import mongoose from "mongoose";
const MovieSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  releash_on: {
    type:String,
    trim:true,
    require:true
  },
});
export const movieModel = mongoose.model("Movie", MovieSchema);
