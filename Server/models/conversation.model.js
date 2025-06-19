import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
    members:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    ]
},{timestamps:true})

const Conversation = mongoose.models.Conversation || mongoose.model('Conversation', conversationSchema)
export default Conversation


// List of users participating in the conversation