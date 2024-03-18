import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { Userrouter } from '../routes/auth.route.js'
import { Messageroutes } from '../routes/message.route.js'
const app=express()
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:'16kb'}))
app.use(express.static('public'))
app.use(cookieParser())
app.use('/api/users',Userrouter)
app.use('/api/messages',Messageroutes)
export {app}