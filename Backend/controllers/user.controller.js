import { User } from "../models/User.model.js";
import { asyncHandler } from "../utils/asynchandler.js"
import {APIError} from './../utils/ApiError.js';
import {ApiResponse} from './../utils/Apiresponse.js'
import {uploadOnCloudinary} from './../utils/cloudnary.js'
const generateAccessAndrefreshTokens = async (userId) => {
    try {
      const user = await User.findById(userId);
      const accessToken = user.generateAccessToken();
      const refreshToken = user.generaterefreshToken();
      user.refreshToken = refreshToken;
      await user.save({ validateBeforeSave: false });
      return { accessToken, refreshToken };
    } catch (error) {
      throw new APIError(
        500,
        "Something went wrong while generating refresh and access token"
      );
    }
  };
  const Signup = asyncHandler(async (req, res) => {
    const { fullName, username, password, gender } = req.body;

    // Check if required fields are missing
    if ([fullName, username, password, gender].some((field) => !field?.trim())) {
      return res.status(400).json({message:'All fields are required'})
    }
  if(password.length<=6)
  {
    return res.status(401).json({message:'Password must be greater then 6 digits'})
    
  }
    // Check if password and confirm password match
    // if (password !== confirmpassword) {
    //     throw new APIError(402, "Password and confirm password must be the same");
    // }

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({message:'User with this username already exists'})
    }

    let profilePicLocalPath;
    if (req.file ) {
        profilePicLocalPath = req.file?.path;
    }
console.log(req.file);
console.log(profilePicLocalPath);
    // Now you can upload profilePicLocalPath to Cloudinary or save it to your server as needed
   let profile=await uploadOnCloudinary(profilePicLocalPath);
   console.log(profile)
    const user = await User.create({
        fullName: fullName,
        username,
        profilePic: profile?.url || "", // Store the file path in the database
        password,
        gender
    });

    const createdUser = await User.findById(user._id).select('-password -refreshToken');
    if (!createdUser) {
      return res.status(500).json({message:'Username can not be created'})
    }

    return res
        .status(201)
        .json(new ApiResponse(200, createdUser, "User registered successfully"));
});
const LoginUser = asyncHandler(
  asyncHandler(async (req, res) => {
    //req body->data
    //username or email
    //find user
    //password check
    //access and refresh token
    //send cookies
    const {  username, password } = req.body;
    if (!username) {
      return res.status(400).json({message:'username  is required'})
    }
    const user = await User.findOne({username});
    if (!user) {
      return res.status(409).json({message:'User does not exist'})
    }
    const isPasswordvalid = await user.isPasswordCorrect(password);
    if (!isPasswordvalid) {
      return res.status(401).json({message:'Invalid user credentials'})
    }
    const { accessToken, refreshToken } = await generateAccessAndrefreshTokens(
      user._id
    );
    const LoggedInuser = await User.findById(user._id).select(
      "-password -refreshToken"
    );
    const options = {
      httpOnly: true,
      secure: true,
    };
    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          200,
          {
            user: LoggedInuser,
            accessToken,
            refreshToken,
          },
          "User logged in Successfully"
        )
      );
  })
);
const getCurrentUser = asyncHandler(async (req, res) => {
  console.log('User is',req?.user)
  return res
    .status(200)
    .json(new ApiResponse(201,req?.user,'Current User fetched'));
});
const LogoutUser = asyncHandler(async (req, res) => {
  const _id = req.user._id;
const user=  await User.findByIdAndUpdate(
    _id,
    {
      $set: {
        refreshToken:'',
      },
    },
    {
      new: true,
    }
  );
  const options = {
    httpOnly: true,
    secure: true,
  };
  console.log(user)
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200,{}, "User Loggedout successfully"));
});
export {LoginUser,Signup,LogoutUser,getCurrentUser}