import mongoose from "mongoose";


const authSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },  
    password:{
        type:String,
        required:true
}}
)

export const authModel=mongoose.model("auth",authSchema);