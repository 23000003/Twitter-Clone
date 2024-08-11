import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
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
    content_image: {
        type: String,
    },
    date_commented: {
        type: Date,
        required: true,
    },
    likes: {
        type: Number,
        required: true,
    },
    replies: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Reply',
            default: [],
        }
    ],
});

export default mongoose.model("Comment", CommentSchema);