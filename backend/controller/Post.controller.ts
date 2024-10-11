import Post from "../models/Post.js";
import cloudinary from "../config/cloudinary";
import User from "../models/User.js";
import { Request, Response } from "express";
import { io } from "../server.js";

const CreateNewPost = async (req: Request, res: Response) =>{
    
    const {content, file} = req.body;

    if(!content){
        res.status(500).json({error: "Content Field Required"})
        return;
    }

    try{
        let result = ' ';
        
        if(file != ' '){
            const upload = await cloudinary.uploader.upload(file,{
                folder: "/xclone",
            });
            result = upload.secure_url;
        }
        
        const newPost = await Post.create({
            content: content,
            content_image: result,
            author: req.user?._id,
            date_created: new Date(),
        });

        const posts = await Post.find(newPost._id)
            .populate({
                path: 'author',
                select: 'username profile_pic followers'
            })
        
        
        res.status(200).json({success: true, data: posts})
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: (err as Error).message})
    }

}

const FetchAllPost = async (req: Request, res: Response) =>{

    try{
        const posts = await Post.find()
            .sort({ date_created: "desc" })
            .populate({
                path: 'author',
                select: 'username profile_pic followers'
            })
            .populate({
                path: 'comments',
                options: { sort: { date_commented: -1 } },
                select: 'content date_commented likes',
                populate: {
                    path: 'author',
                    select: '_id',
                }
            })

        res.status(200).json({posts});
        return;
    }catch(err){
        res.status(500).json({error: (err as Error).message})
        return;
    }
    
}

const FetchViewedPost = async (req: Request, res: Response) =>{

    try{

        const postId = req.params.postID;

        const posts = await Post.findById(postId)
            .populate({
                path: 'author',
                select: 'username profile_pic bio'
            })
            .populate({
                path: 'comments',
                options: { sort: { date_commented: -1 } },
                select: 'content date_commented likes',
                populate: {
                    path: 'author',
                    select: 'username profile_pic bio'
                }
            });

        if (!posts) {
            res.status(404).json({ message: 'Post not found' });
            return;
        }

        console.log(posts)
        res.status(200).json({posts});
        
    }catch(err){
        res.status(500).json({error: (err as Error).message})
    }

}


const FetchUserPagePost = async(req: Request, res: Response) =>{
    
    try{
        const username = req.params.username;

        const user = await User.findOne({ username: username })
        .populate({
            path: 'following',
            select: 'username profile_pic bio'
        })
        .populate({
            path: 'followers',
            select: 'username profile_pic bio'
        });


        if (!user) {
            res.status(404).json({ message: "User doesnt Exists" });
            return;
        }

        const posts = await Post.find({
            $or: [
                { author: user._id },
                { reposted_by: user._id }
            ]
        })
        .sort({ date_created: "desc" })
        .populate({
            path: 'author',
            select: '_id username profile_pic'
        })
        .populate({
            path: 'reposted_by',
            select: '_id username'
        });

        res.status(200).json({posts, user});
    }catch(err){
        res.status(500).json({error: (err as Error).message})
    }
}


const FetchUserPostLiked = async(req: Request, res: Response) =>{

    const username = req.params.username;

    console.log(username);
    try{

        const user = await User.findOne({username: username});
        
        if (!user) {
            res.status(404).json({ message: "User doesnt Exists" });
            return;
        }

        console.log(user);

        const usersPostLiked = await Post.find({likes: user._id})
            .sort({ date_created: "desc" })
            .populate({
                path: 'author',
                select: '_id username profile_pic'
            })

        res.status(200).json({data: usersPostLiked});

    }catch(err){
        res.status(500).json({error: (err as Error).message});
    }

}


const LikePost = async(req: Request, res: Response) =>{

    const { _id } = req.body;

    try{
        
        const findPost = await Post.findById(_id);

        const userID = req.user?._id;

        if(userID === undefined){
            res.status(404).json({ message: "User Not Found "});
            return;
        }

        findPost?.likes?.push(userID);

        await findPost?.save();

        io.emit('postLiked', { data: findPost });

        res.status(200).json({data: findPost});

    }catch(err){
        res.status(500).json({error: (err as Error).message});
    }

}

const UnLikePost = async(req: Request, res: Response) =>{

    const { _id } = req.body;

    try{
        
        const findPost = await Post.findById(_id);

        const userID = req.user?._id;
        
        if(userID === undefined ){
            res.status(404).json({ message: "User Not Found "});
            return;
        }

        if(findPost === null ){
            res.status(404).json({ message: "User Doesn't have Liked Posts"});
            return;
        }

        findPost.likes = findPost.likes?.filter(id => id.toString() !== userID.toString());

        await findPost?.save();

        io.emit('postUnliked', {data: findPost});

        res.status(200).json({data: findPost});

    }catch(err){
        res.status(500).json({error: (err as Error).message});
    }

}

const RepostAPost = async (req: Request, res: Response) =>{

    const { _id } = req.body;

    try{

        const userID = req.user?._id;

        const findPost = await Post.findById(_id);

        if(userID === undefined ){
            res.status(404).json({ message: "User Not Found "});
            return;
        }

        findPost?.reposted_by?.push(userID);

        await findPost?.save();

        io.emit('postReposted', { data: findPost });

        res.status(200).json({data: findPost});
    
    }catch(err){

        res.status(500).json({error: (err as Error).message});
    
    }

}

const UndoRepostAPost = async (req: Request, res: Response) =>{
    
    const { _id } = req.body;

    try{

        const userID = req.user?._id;

        const findPost = await Post.findById(_id);

        if(userID === undefined ){
            res.status(404).json({ message: "User Not Found "});
            return;
        }

        if(findPost === null ){
            res.status(404).json({ message: "User Doesn't have Liked Posts"});
            return;
        }

        findPost.reposted_by = findPost.reposted_by?.filter(
            id => id.toString() !== userID.toString()
        );

        await findPost.save();

        io.emit('postUndoRepost', { data: findPost });

        res.status(200).json({data: findPost});

    }catch(err){
        res.status(500).json({error: (err as Error).message});
    }

}

const FetchUserFollowing = async(req: Request, res: Response) =>{

    const { _id } = req.body;

    try{

        const user = await User.findById(_id);

        if(!user){
            res.status(404).json({error: "User not found"});
            return;
        }

        const following = user.following?.map(follow => follow.toString());

        //include urself :))
        following?.push(user._id.toString());

        const filteredPosts = await Post.find({ author: { $in: following } })
        .sort({ date_created: "desc" })
            .populate({
                path: 'author',
                select: 'username profile_pic'
            })
            .populate({
                path: 'comments',
                options: { sort: { date_commented: -1 } },
                select: 'content date_commented likes',
                populate: {
                    path: 'author',
                    select: '_id',
                }
            });

        res.status(200).json({data: filteredPosts});
    }catch(err){
        res.status(500).json({error: (err as Error).message});
    }

}

const DeleteYourPost = async (req: Request, res: Response) =>{

    const { id } = req.params;

    try{

        const findPost = await Post.findByIdAndDelete(id);

        if(!findPost){
            res.status(404).json({error: "Post Not Found"});
            return;
        }

        res.status(200).json({success: "Post Deleted Successful"})

    }catch(err){
        res.status(500).json({error: (err as Error).message});
    }

}


export { 
    CreateNewPost, FetchAllPost, FetchViewedPost, FetchUserPagePost, 
    FetchUserPostLiked, LikePost, UnLikePost, UndoRepostAPost, RepostAPost, 
    FetchUserFollowing, DeleteYourPost 
};