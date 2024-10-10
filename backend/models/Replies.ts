import mongoose, { Schema, Document, Types }  from "mongoose";
import { ReplyType } from "../types/modelTypes";

export type ReplyModelType = ReplyType & Document;

const ReplySchema: Schema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    content: {
        type: String,
        required: true,
        maxLength: 100,
    },
    date_commented: {
        type: Date,
        required: true,
    },
    likes: {
        type: Number,
        required: true,
    }
});

export default mongoose.model<ReplyModelType>(
    "Reply", 
    ReplySchema
);