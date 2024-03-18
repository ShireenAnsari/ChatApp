import { APIError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asynchandler.js";
import { Conservation } from "../models/conversation.model.js";
import { Message } from "../models/message.model.js";
import { ApiResponse } from "../utils/Apiresponse.js";
const SendMessage=asyncHandler(async(req,res)=>{
  const {message}=req.body;
  const {id:recieverId}=req.params;
  const senderId=req.user?._id;
  if(!message || message==='')
  {
    throw new APIError(400,"Can not send empty message");
  }
let conversation= await Conservation.findOne({
    participents:{
        $all:[senderId,recieverId]
    }
  })
  if(!conversation)
  {
 conversation=await Conservation.create({
    participents:[senderId,recieverId]
   })
  }
  const newMessage=new Message({
    senderId,
    recieverId,
    message
  })
  if(newMessage)
  {
    conversation.messages.push(newMessage._id)
  }
  //this will run in parallel
  await Promise.all([conversation.save(),newMessage.save()]);
return res.status(201).json(new ApiResponse(200,newMessage,"message created"))
  
})
const getMessage=asyncHandler(async(req,res)=>{
const {id:userTochatId}=req.params;
const senderId=req.user?._id;
const conversation=await Conservation.findOne({
    participents:{$all:[senderId,userTochatId]}
}).populate('messages')
const messages=conversation.messages
if(!messages)
{
    return res.status(200).json(new ApiResponse(200,{}))
}
return res.status(200).json(new ApiResponse(200,messages))

})
export {SendMessage,getMessage}