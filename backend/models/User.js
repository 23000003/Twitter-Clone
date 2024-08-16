import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    registered_at: {
        type: Date,
        required: true,
    },
    profile_pic: {
        type: String,
        required: true,
    },
    background_pic: {
        type: String,
    },
    bio: {
        type: String,
        maxLength: 30,
    },
    pinned:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
    },
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    following: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    bookmarks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post',
        }
    ]
});
  
  export default mongoose.model('User', UserSchema);