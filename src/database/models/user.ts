import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        require:true
    },
    email:{
        type:String,
        trim:true,
        require:true
    },
    password:{
        type:String,
        trim:true,
        require:true
    },
    isVerified: { type: Boolean, default: false }
})
export const userModel= mongoose.model("User",userSchema)