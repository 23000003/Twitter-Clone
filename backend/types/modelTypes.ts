import { Types }  from "mongoose";

export type CommentType = {
    _id: Types.ObjectId;
    author: Types.ObjectId;
    content: string;
    content_image?: string;
    date_commented: Date;
    likes: number;
    replies?: Types.ObjectId[];
};

export type NotificationType = {
    _id: Types.ObjectId;
    notifiedTo: Types.ObjectId;
    notifiedFrom: string;
    date_notified: Date;
    type: string;
    link?: string;
};

export type PostType = {
    _id: Types.ObjectId;
    author: Types.ObjectId;
    content: string;
    content_image?: string;
    date_created: Date;
    likes?: Types.ObjectId[];
    comments?: Types.ObjectId[];
    reposted_by?: Types.ObjectId[];
    reposted_quote?: Types.ObjectId[];
}

export type ReplyType = {
    _id: Types.ObjectId;
    author: Types.ObjectId;
    content: string;
    date_commented: Date;
    likes: number;
}

export type UserType = {
    _id: Types.ObjectId;
    username: string;
    password: string;
    registered_at: Date;
    profile_pic: string;
    background_pic?: string;
    bio?: string;
    pinned: Types.ObjectId;
    followers?: Types.ObjectId[];
    following?: Types.ObjectId[];
    bookmarks?: Types.ObjectId[];
}