import express from "express";
import User from "../models/User";
import { 
    LoginUser, 
    RegisterUser, 
    FetchWhoToFollow, 
    FetchUser, 
    FollowAUser, 
    UnFollowAUser, 
    RemoveFromUserBookmarks,
    AddToUserBookmarks
} from "../controller/User.controller";
import { authentication } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post('/login', LoginUser);
router.post('/createAccount', RegisterUser);

router.patch('/followUser', authentication, FollowAUser);
router.patch('/addToBookmarks', authentication, AddToUserBookmarks);

router.get('/WhoToFollow', authentication, FetchWhoToFollow);

//==dynamic==//

router.delete('/unfollowUser/:id', authentication, UnFollowAUser);
router.delete('/removeFromBookmarks/:id', authentication, RemoveFromUserBookmarks);

router.get('/:id', FetchUser)

export { router as userRouter };
