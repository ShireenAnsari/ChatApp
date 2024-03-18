import express from 'express'
import { LoginUser,LogoutUser, Signup } from '../controllers/user.controller.js';
import  {upload}  from "../middlewares/multer.middleware.js";
import { VerifyJwt } from '../middlewares/auth.middleware.js';
import { getSidebarusers } from '../controllers/sidebarusers.controller.js';
const Userrouter=express.Router();
Userrouter.route('/signUp').post(
    upload.single('profilePic'),Signup)
Userrouter.route('/login').post(LoginUser)
Userrouter.route('/Logout').post(VerifyJwt,LogoutUser)
Userrouter.route('/getsidebarusers').get(VerifyJwt,getSidebarusers)
export {Userrouter}