import Post from "../models/Post.js"
import Comment from "../models/Comment.js"
import User from "../models/User.js";
import { Request, Response } from "express";

const PostAComment = async (req: Request, res: Response) => {
    const { content, file } = req.body;

    if (!content) {
        res.status(400).json({ error: "Content Field Required" });
        return;
    }

    try {

        if(req.user === null){
            res.status(404).json({error: "User not Found"});
            return;
        }

        const user = await User.findById(req.user._id);

        const newComment = await Comment.create({
            author: user?._id,
            content: content,
            content_image: file, 
            date_commented: new Date(),
            likes: 0,
        });

        const postCommented = await Post.findById(req.params.postID);

        if (!postCommented) {
            res.status(404).json({ error: "Post not found" });
            return;
        }

        postCommented.comments?.push(newComment._id);
        await postCommented.save();

        res.status(200).json({ newComment, user });

    } catch (err) {
        res.status(500).json({ error: (err as Error).message });
        console.log(err);
    }
};

const FetchUsersComments = async (req: Request, res: Response) => {

    const username = req.params.username;

    try {
        
        const user = await User.findOne({ username: username });

        if (!user) {
            res.status(404).json({ error: "User Doesn't Exist" });
            return;
        }

        const commentsPost = await Post.find({ comments: { $exists: true, $ne: [] } })
            .sort({ date_created: "desc" })
            .populate({
                path: 'author',
                select: 'username profile_pic'
            })
            .populate({
                path: 'comments',
                match: { author: user._id }, 
                select: 'content date_commented likes',
                populate: {
                    path: 'author',
                    select: 'username profile_pic likes'
                }
            })
            .exec();

        // const filteredPosts = commentsPost.filter(
        //     post => post.comments.length > 0
        // );

        res.status(200).json(commentsPost);

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};



const DeleteComment = async(req: Request, res: Response) =>{

}

export { PostAComment, DeleteComment, FetchUsersComments }; 