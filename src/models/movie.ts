import mongoose from "mongoose";
import { date } from "zod";
const MovieSchema = new mongoose.Schema({
  movieId: {
    type: String,
  },
  name: {
    type: String,
    trim: true,
    required: true,
  },
  // email:{
  //   type:String,
  //   require:true
  // },
  released_on: {
    // type: Date,
    // default: Date.now,
    type:String,
    trim:true,
    require:true
  },
});
export const movieModel = mongoose.model("Movie", MovieSchema);
