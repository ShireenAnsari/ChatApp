import mongoose from "mongoose";
const conversationSchema=new mongoose.Schema({
    participents:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        },
    ],
    messages:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Message",
        default:[]
    }],
},{timestamps:true})
export const Conservation=mongoose.model('Conversation',conversationSchema)