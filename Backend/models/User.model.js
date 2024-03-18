import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from 'bcryptjs'
const Userschema=new Schema({
    fullName:{
        type:String,
        required:true
    },
    username:{
        type:String,
        unique:true
    },
    password:{
        type:String,
        required:true,
    minlength:6    },
    gender:{
        type:String,
        required:true,
        enum:["male","female"]
    },
    profilePic:{
        type:String,
        default:""
    },
    refreshToken:{
        type:String
    }

   
},{timestamps:true})
Userschema.pre('save',async function (next){
    if(!this.isModified('password'))
    {
   return next();
    }
    this.password=await bcrypt.hash(this.password,10)
    next()
})
Userschema.methods.isPasswordCorrect=async function(password){
 return   await bcrypt.compare(password,this.password)
}

Userschema.methods.generateAccessToken=function(){
  return  jwt.sign(
    {
        _id:this._id,
        email:this.email,
        username:this.username,
        fullname:this.fullname
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }
    )
}
Userschema.methods.generaterefreshToken=function(){
    return  jwt.sign(
        {
            _id:this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
        ) 
}
export const User=mongoose.model('User',Userschema)