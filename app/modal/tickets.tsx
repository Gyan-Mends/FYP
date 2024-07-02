import { Schema } from "mongoose";
import mongoose from "~/mongoose.server";
import { TicketInterface } from "~/interfaces/interface";

const TicketSchema = new mongoose.Schema({
    subject: {
        require: true,
        type: String,
    },
    description: {
        require: true,
        type: String,
    },
    category: {
        require: true,
        type: String,
    },
    priority: {
        require: true,
        type: String,
    },
    attachment: {
        require: true,
        type: String,
    },
    status: {
        type: String,
        require: true,
        enum: ['Pending','Assigned', 'Completed'], 
        default: 'Pending', 
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"registration",
        require:true,
    },
    stuff:{
        type:Schema.Types.ObjectId,
        ref:"staffRegistration",
        require:true,
    },
    admin:{
        type:Schema.Types.ObjectId,
        ref:"adminRegistration",
        require:true,
    },
    location:{
        type:String,
        require:true,
    },
    
})

let Ticket: mongoose.Model<TicketInterface>

try {
    Ticket = mongoose.model<TicketInterface>("ticket")
} catch (error) {
    Ticket = mongoose.model<TicketInterface>("ticket", TicketSchema)

}

export default Ticket