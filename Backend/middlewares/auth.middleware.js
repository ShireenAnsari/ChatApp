import { User } from "../models/User.model.js";
import { APIError } from "../utils/ApiError.js";
import jwt from 'jsonwebtoken'
import { asyncHandler } from "../utils/asynchandler.js";
export const VerifyJwt=asyncHandler(async (req,_,next)=>{
   try {
    const token= req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer","");
 
    if(!token)
    {
     throw new APIError(401,"Unauthorized request");
    }
  const decodedToken=  jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
  const user=await User.findById(decodedToken?._id).select('-password -refreshToken')
  if(!user)
  {
     //
     throw new APIError (401,"Invalid  Access Token")
  }
  req.user=user;
  next()
   } catch (error) {
    throw new APIError (401,error?.message || "Invalid access token")
   }
})
