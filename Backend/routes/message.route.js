// Messageroutes
import express from 'express'
import { SendMessage, getMessage } from '../controllers/message.controller.js';
import { VerifyJwt } from '../middlewares/auth.middleware.js';
const Messageroutes=express.Router();
Messageroutes.route('/send/:id').post(VerifyJwt,SendMessage)
Messageroutes.route('/:id').get(VerifyJwt,getMessage)

export {Messageroutes}