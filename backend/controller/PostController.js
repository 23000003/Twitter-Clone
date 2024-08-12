import Post from "../models/Post.js";
import cloudinary from '../config/cloudinary.js'
import User from "../models/User.js";
import { io } from '../config/socketio.js'

const CreateNewPost = async (req, res) =>{
    
    const {content, file} = req.body;

    if(!content){
        return res.status(500).json({error: "Content Field Required"})
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
            author: req.user._id,
            date_created: new Date(),
        });

        const posts = await Post.find(newPost._id)
            .populate({
                path: 'author',
                select: 'username profile_pic'
            })
        
        
        return res.status(200).json({success: true, data: posts})
    }
    catch(err){
        console.log(err)
        res.status(500).json({error: err.message})
    }

}

const FetchAllPost = async (req, res) =>{

    try{
        const posts = await Post.find()
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
            })

        return res.status(200).json({posts});

    }catch(err){
        return res.status(500).json({error: err.message})
    }
    
}

const FetchViewedPost = async (req, res) =>{

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
            return res.status(404).json({ message: 'Post not found' });
        }

        console.log(posts)
        return res.status(200).json({posts});
        
    }catch(err){

        return res.status(500).json({error: err.message})

    }

}


const FetchUserPagePost = async(req, res) =>{
    
    try{
        const username = req.params.username;

        const user = await User.findOne({ username: username });

        if (!user) {
            return res.status(404).json({ message: "User doesnt Exists" });
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

        return res.status(200).json({posts, user});

    }catch(err){
        return res.status(500).json({error: err.message})
    }
}


const FetchUserPostLiked = async(req, res) =>{

    const username = req.params.username;

    console.log(username);
    try{

        const user = await User.findOne({username: username});
        
        if (!user) {
            return res.status(404).json({ message: "User doesnt Exists" });
        }

        console.log(user);

        const usersPostLiked = await Post.find({likes: user._id})
            .sort({ date_created: "desc" })
            .populate({
                path: 'author',
                select: '_id username profile_pic'
            })

        return res.status(200).json({data: usersPostLiked});

    }catch(err){
        return res.status(500).json({error: err.message});
    }

}

const DeletePost = async(req, res) =>{

    res.send(401).json({error: "HEY"})

}

const LikePost = async(req, res) =>{

    const { _id } = req.body;

    try{
        
        const findPost = await Post.findById(_id);

        const userID = req.user._id;

        findPost.likes.push(userID);

        await findPost.save();

        io.emit('postLiked', { data: findPost });

        return res.status(200).json({data: findPost});

    }catch(err){
        return res.status(500).json({error: err.message});
    }

}

const UnLikePost = async(req, res) =>{

    const { _id } = req.body;

    try{
        
        const findPost = await Post.findById(_id);

        const userID = req.user._id;
        
        findPost.likes = findPost.likes.filter(id => id.toString() !== userID.toString());

        await findPost.save();

        io.emit('postUnliked', {data: findPost});

        return res.status(200).json({data: findPost});

    }catch(err){
        return res.status(500).json({error: err.message});
    }

}

const RepostAPost = async (req, res) =>{

    const { _id } = req.body;

    try{

        const userID = req.user._id;

        const findPost = await Post.findById(_id);

        findPost.reposted_by.push(userID);

        await findPost.save();

        io.emit('postReposted', { data: findPost });

        return res.status(200).json({data: findPost});
    
    }catch(err){

        return res.status(500).json({error: err.message});
    
    }

}

const UndoRepostAPost = async (req, res) =>{
    
    const { _id } = req.body;

    try{

        const userID = req.user._id;

        const findPost = await Post.findById(_id);

        findPost.reposted_by = findPost.reposted_by.filter(id => id.toString() !== userID.toString());

        await findPost.save();

        io.emit('postUndoRepost', { data: findPost });

        return res.status(200).json({data: findPost});

    }catch(err){

        return res.status(500).json({error: err.message});

    }

}

export { 
    CreateNewPost, DeletePost, FetchAllPost, 
    FetchViewedPost, FetchUserPagePost, FetchUserPostLiked,
    LikePost, UnLikePost, UndoRepostAPost, RepostAPost 
};