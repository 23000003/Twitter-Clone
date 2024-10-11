import User from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const createToken = (_id: string) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "10d" });
};

const RegisterUser = async (req : Request, res : Response) => {

  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ error: "All fields are required." });
    return;
  }

  const exist = await User.findOne({ username });

  if (exist) {
    res.status(400).json({ error: "Username is already taken" });
    return;
  }

  const salt = await bcrypt.genSalt();
  const hashed = await bcrypt.hash(password, salt);
  const registered_at = new Date();
  const profile_pic = 'https://res.cloudinary.com/domvrvasq/image/upload/default_czji94.jpg';
  const bio = ' ';
  const background_pic = ' ';

  try {
    const user = await User.create({ 
      username, 
      password: hashed, 
      registered_at,
      profile_pic,
      bio,
      background_pic,
    });

    const token = createToken(user._id.toString())

    res.status(200).json({ username, token });

  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

const LoginUser = async (req : Request, res : Response) => {
    
    const { username, password } = req.body;
  
    if (!username || !password) {
      res.status(400).json({ error: "All fields are required." });
      return;
    }
  
    const user = await User.findOne({ username });
    if (!user) {
      res.status(400).json({ error: "Incorrect email." });
      return;
    }
  
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      res.status(400).json({ error: "Incorrect password." });
      return;
    }
  
    try {
      const token = createToken(user._id.toString())
      res.status(200).json({ user, token });

    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }

};

const FetchWhoToFollow = async (req : Request, res : Response) => {
  try {

    const id = req.user?._id;

    const user = await User.findById(id);

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const allUsers = await User.find();

    const notFollowedbyUser = allUsers.filter(
      (u) => u._id.toString() !== user._id.toString() && !user.following?.includes(u._id)
    );

    res.status(200).json(notFollowedbyUser);
  } catch (error) {
    res.status(500).json({ 
      message: (error as Error).message 
    });
  }
};

const FetchUser = async(req : Request, res : Response) => {

  try{

    const { id } = req.params;

    console.log(id)

    const data = await User.findById(id)
    .populate({
      path: 'following',
      select: 'username profile_pic bio'
    })
    .populate({
      path: 'followers',
      select: 'username profile_pic bio'
    })
    .populate({
      path: 'bookmarks',
      populate: {
        path: 'author',
        select: 'username profile_pic bio'
      }
    })

    console.log(data);

    if(!data){
      res.status(404).json({message: "User does not exist"})
      return;
    }

    res.status(200).json({data})

  }catch(err){
    res.status(500).json({
      message: (err as Error).message
    })
  }

}

const FollowAUser = async(req : Request, res : Response) =>{

  const { _id } = req.body;

  try{

    const FollowedUser = await User.findById(_id);

    if(!FollowedUser){
      res.status(404).json({message: "User does not exist"});
      return;
    }

    const UpdateFollowing = await User.findById(req.user?._id);

    UpdateFollowing?.following?.push(_id);

    await UpdateFollowing?.save();

    res.status(200).json({data: _id});
    return;
  }catch(err){
    res.status(500).json({error: (err as Error).message});
    return;
  }

}

const UnFollowAUser = async(req : Request, res : Response) =>{

  const { id } : any = req.params;

  try{

    const user = await User.findById(req.user?._id); //ur account

    if (!user?.following?.includes(id)) {
      res.status(404).json({ message: "Follower not found" });
      return;
    }

    user.following = user.following.filter(userid => userid.toString() !== id);

    await user.save();

    res.status(200).json({data: id});
    return;
  }catch(err){
    res.status(500).json({error: (err as Error).message});
    return;
  }

}

const AddToUserBookmarks = async (req : Request, res : Response) =>{
  
  const { _id } = req.body;

  try{

    const user = await User.findById(req.user?._id);

    if(!user){
      res.status(404).json({message: "User not Found"});
      return;
    }

    user.bookmarks?.push(_id);

    await user.save();

    const sendUser = await User.findById(req.user?._id)
      .populate({
        path: 'bookmarks',
        populate: {
          path: 'author',
          select: 'username profile_pic bio'
        }
      });

    res.status(200).json({data: sendUser, message: "Added to bookmarks"})
    return;
  }catch(err){
    res.status(500).json({error: (err as Error).message});
    return;
  }

}

const RemoveFromUserBookmarks = async (req : Request, res : Response) =>{

  const { id } = req.params;

  try{

    const user = await User.findById(req.user?._id); //ur account

    if(!user){
      res.status(404).json({message: "User not Found"});
      return;
    }

    user.bookmarks = user.bookmarks?.filter(bookmarkid => bookmarkid.toString() !== id);

    await user.save();

    const sendUser = await User.findById(req.user?._id)
      .populate({
        path: 'bookmarks',
        populate: {
          path: 'author',
          select: 'username profile_pic bio'
        }
      });

    res.status(200).json({data: sendUser, message: "Removed from bookmarks"});
    return;
  }catch(err){
    res.status(500).json({error: (err as Error).message});
    return;
  }

}

export {
  LoginUser, RegisterUser, FetchWhoToFollow, 
  FetchUser, FollowAUser, UnFollowAUser,
  AddToUserBookmarks, RemoveFromUserBookmarks
}