import { User } from "../models/User.model.js";
import { ApiResponse } from "../utils/Apiresponse.js";
import { asyncHandler } from "../utils/asynchandler.js";

const getSidebarusers=asyncHandler(async(req,res)=>{
    const Loggedinuser=req.user._id;
    const filtereduser=await User.find({_id:{$ne:Loggedinuser}}).select('-password -refreshToken -username -gender');
    res.status(200).json(new ApiResponse(201,filtereduser))
})
export {getSidebarusers}