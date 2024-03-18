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
    const { fullname, username, password, gender } = req.body;

    // Check if required fields are missing
    if ([fullname, username, password, gender].some((field) => !field?.trim())) {
        throw new APIError(400, "All fields are required");
    }
  if(password.length<=6)
  {
    throw new APIError(401,'Password must be greater then 6 digits')
  }
    // Check if password and confirm password match
    // if (password !== confirmpassword) {
    //     throw new APIError(402, "Password and confirm password must be the same");
    // }

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      throw  new APIError(409, "User with this username already exists")
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
        fullName: fullname,
        username,
        profilePic: profile?.url || "", // Store the file path in the database
        password,
        gender
    });

    const createdUser = await User.findById(user._id).select('-password -refreshToken');
    if (!createdUser) {
        throw new APIError(500, "Error creating user");
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
      throw new APIError(400, "username  is required");
    }
    const user = await User.findOne({username});
    if (!user) {
      throw new APIError(404, "User does not exist");
    }
    const isPasswordvalid = await user.isPasswordCorrect(password);
    if (!isPasswordvalid) {
      throw new APIError(401, "Invalid user credentials");
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
export {LoginUser,Signup,LogoutUser}