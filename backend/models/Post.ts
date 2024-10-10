import mongoose, { Schema, Document, Types }  from "mongoose";
import { PostType } from "../types/modelTypes";

export type PostModelType = PostType & Document;

const PostSchema: Schema = new mongoose.Schema({
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    content: {
        type: String,
        required: true,
        maxLength: 100,
    },
    content_image: {
        type: String
    },
    date_created: {
        type: Date,
        required: true,
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment',

        }
    ],
    reposted_by: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
    ],
    reposted_quote: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
});

export default mongoose.model<PostModelType>(
    "Post", 
    PostSchema
);