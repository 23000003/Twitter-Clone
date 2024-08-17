import express from "express";
import User from "../models/User.js";
import { 
    LoginUser, 
    RegisterUser, 
    FetchWhoToFollow, 
    FetchUser, 
    FollowAUser, 
    UnFollowAUser, 
    RemoveFromUserBookmarks,
    AddToUserBookmarks
} from "../controller/UserController.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

router.post('/login', LoginUser);
router.post('/createAccount', RegisterUser);

router.patch('/followUser', auth, FollowAUser);
router.patch('/addToBookmarks', auth, AddToUserBookmarks);

router.get('/WhoToFollow', auth, FetchWhoToFollow);

//==dynamic==//

router.delete('/unfollowUser/:id', auth, UnFollowAUser);
router.delete('/removeFromBookmarks/:id', auth, RemoveFromUserBookmarks);

router.get('/:id', auth, FetchUser)

export { router as userRouter };
